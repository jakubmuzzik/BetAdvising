import React, { useState, useMemo, useEffect, useRef } from 'react'
import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../../constants'
import { normalize, calculateTimeDifference } from '../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { fetchOpenTickets } from '../../redux/actions/admin'
import { ActivityIndicator } from 'react-native-paper'
import Animated, { FlipInEasyX } from 'react-native-reanimated'
import { MAX_TICKETS_ROWS_PER_QUERY } from '../../redux/actions/admin'
import ContentLoader, { Rect } from "react-content-loader/native"

import UnlockedTicket from '../../components/tickets/UnlockedTicket'
import { connect } from 'react-redux'
import withSearchParams from '../../components/hoc/withSearchParams'

import { supabase } from '../../supabase/config'
import { closeOpenTicketInRedux, updateTicketEntryInRedux } from '../../redux/actions/admin'

import ConfirmationModal from '../../components/modal/ConfirmationModal'

const GAP = normalize(60)

const TimeLeft = ({ startDate, width, onTimeLeftLayout = () => { }, isSmallScreen }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeDifference(new Date(), startDate))

    useEffect(() => {
        // Update timeLeft every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeDifference(new Date(), startDate))
        }, 1000)

        // Cleanup interval on component unmount
        return () => clearInterval(timer)
    }, [startDate])

    return (
        <View
            style={width != null ? { width, alignItems: 'flex-end' } : { alignItems: isSmallScreen ? 'flex-start' : 'flex-end' }}
        >
            <View
                onLayout={(event) => onTimeLeftLayout(event)}
                style={{
                    position: isSmallScreen ? 'relative' : 'absolute',
                    flexDirection: 'column',
                    width: 'max-content'
                }}
            >
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey400
                    }}
                >
                    Zbývá:
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.white,
                        marginTop: 4
                    }}
                >
                    {timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}
                    {timeLeft.hours > 0 ? `${timeLeft.hours}h ` : ''}
                    {timeLeft.minutes > 0 || timeLeft.hours > 0 ? `${timeLeft.minutes}m ` : ''}
                    {`${timeLeft.seconds}s`}
                </Text>
            </View>
        </View>
    )
}

const Divider = ({ isLast }) => {
    const [contentHeight, setContentHeight] = useState(0)

    return (
        <View onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)} >
            <LinearGradient
                colors={[COLORS.secondary, COLORS.secondary2]}
                style={{
                    borderRadius: 17.5,
                    width: 35,
                    height: 35,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2
                }}
            >
                <MaterialIcons name="question-mark" size={FONT_SIZES.x_large} color={COLORS.white} />
            </LinearGradient>
            {!isLast && <LinearGradient
                colors={[COLORS.whiteBackground2, COLORS.whiteBackground2, COLORS.whiteBackground2]}
                style={{
                    width: 1,
                    position: 'absolute',
                    //top: -20,
                    left: 17.5,
                    height: contentHeight + GAP,
                }}
            />}
        </View>
    )
}

const Skeleton = () => (
    <ContentLoader
        speed={2}
        height={400}
        width={750}
        style={{ borderRadius: 10, alignSelf: 'center' }}
        backgroundColor={COLORS.secondary}
        foregroundColor={COLORS.secondary2}
    >
        <Rect x="0" y="0" rx="0" ry="0" width="100%" height={400} />
    </ContentLoader>
)

const OpenTickets = ({ fetchOpenTickets, setTabHeight, toastRef, openTickets, searchParams, offsetX, closeOpenTicketInRedux, updateTicketEntryInRedux }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < 700

    const currentWidestTimeLeft = useRef(0)
    const allTicketsLoaded = useRef(false)

    const [timeLeftWidth, setTimeLeftWidth] = useState()
    const [refreshing, setRefreshing] = useState(false)

    const [ticketToWin, setTicketToWin] = useState()
    const [ticketToLose, setTicketToLose] = useState()

    useEffect(() => {
        if (openTickets == null) {
            fetchOpenTickets()
        }
    }, [
        openTickets
    ])

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight

            if (scrollPosition >= document.body.scrollHeight) {
                onEndReached()
            }
        }

        document.addEventListener("scroll", handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [openTickets])

    const allTicketEntriesResulted = (ticketId) => {
        return openTickets.find(ticket => ticket.id === ticketId).ticket_entries.every(ticketEntry => ticketEntry.result != 'pending')
    }

    const updateTicketResult = async (ticketId, result) => {
        try {
            const { error } = await supabase
                .from('tickets')
                .update({ result })
                .eq('id', ticketId)

            if (error) throw error

            closeOpenTicketInRedux(ticketId, result)

            toastRef?.show({
                type: 'success',
                text: 'Ticket result updated to: ' + result + '.'
            })
        } catch (e) {
            console.error(e)
            toastRef?.show({
                type: 'error',
                text: 'Failed to update ticket.'
            })
        }
    }

    const updateTicketEntryResult = async (ticketId, ticketEntryId, result) => {
        try {
            const { error } = await supabase
                .from('ticket_entries')
                .update({ result })
                .eq('id', ticketEntryId)

            if (error) throw error

            updateTicketEntryInRedux(ticketId, ticketEntryId, result)

            toastRef?.show({
                type: 'success',
                text: 'Ticket entry updated.'
            })
        } catch (e) {
            console.error(e)
            toastRef?.show({
                type: 'error',
                text: 'Failed to update ticket entry.'
            })
        }
    }

    const wonTicketPress = (ticketId) => {
        if (!allTicketEntriesResulted(ticketId)) {
            toastRef?.show({
                type: 'error',
                text: 'Not all ticket entries have been resulted yet.'
            })
            return
        }

        setTicketToWin(ticketId)
    }

    const loseTicketPress = (ticketId) => {
        if (!allTicketEntriesResulted(ticketId)) {
            toastRef?.show({
                type: 'error',
                text: 'Not all ticket entries have been resulted yet.'
            })
            return
        }

        setTicketToLose(ticketId)
    }

    const wonTicketEntryPress = (ticketId, ticketEntryId) => {
        updateTicketEntryResult(ticketId, ticketEntryId, 'win')
    }

    const loseTicketEntryPress = (ticketId, ticketEntryId) => {
        updateTicketEntryResult(ticketId, ticketEntryId, 'lose')
    }

    const cancelTicketEntryPress = (ticketId, ticketEntryId) => {
        updateTicketEntryResult(ticketId, ticketEntryId, 'cancelled')
    }


    const ticketEntryActions = [
        {
            label: 'Won',
            onPress: wonTicketEntryPress,
            icon: <MaterialCommunityIcons name="check-circle" size={18} color="green" />
        },
        {
            label: 'Lost',
            onPress: loseTicketEntryPress,
            icon: <MaterialIcons name="cancel" size={18} color={COLORS.error} />
        },
        {
            label: 'Cancelled',
            onPress: cancelTicketEntryPress,
            icon: <MaterialCommunityIcons name="cancel" size={18} color="white" />
        }
    ]

    const ticketActions = [
        {
            label: 'Won',
            onPress: wonTicketPress,
            icon: <MaterialCommunityIcons name="check-circle" size={18} color="green" />
        },
        {
            label: 'Lost',
            onPress: loseTicketPress,
            icon: <MaterialIcons name="cancel" size={18} color={COLORS.error} />
        }
    ]

    const onTimeLeftLayout = (event, index) => {
        const { width } = event.nativeEvent.layout

        if (width > currentWidestTimeLeft.current) {
            currentWidestTimeLeft.current = width
        }

        if (index === openTickets.length - 1) {
            setTimeLeftWidth(currentWidestTimeLeft.current)
        }
    }

    const onEndReached = async () => {
        if (allTicketsLoaded.current || openTickets == null || refreshing || openTickets.length < MAX_TICKETS_ROWS_PER_QUERY) {
            return
        }

        setRefreshing(true)
        const newOpenTickets = await fetchOpenTickets()
        if (newOpenTickets == null || newOpenTickets?.length === 0) {
            allTicketsLoaded.current = true
        }
        setRefreshing(false)
    }

    const renderItem = (offer, index) => (
        <View
            key={offer.id}
            style={{
                flexDirection: 'row',
                gap: SPACING.small
            }}
        >
            {!isSmallScreen && <TimeLeft isSmallScreen={isSmallScreen} onTimeLeftLayout={(event) => onTimeLeftLayout(event, index)} width={timeLeftWidth} startDate={offer.start_date} />}
            <Divider isLast={index === openTickets.length - 1} />

            <View
                style={{
                    gap: SPACING.medium,
                    flex: 1
                }}
            >
                {isSmallScreen && <TimeLeft isSmallScreen={isSmallScreen} startDate={offer.start_date} />}
                <UnlockedTicket
                    offsetX={offsetX}
                    ticketEntryActions={ticketEntryActions}
                    ticketActions={ticketActions}
                    showEditButtons
                    searchParams={searchParams}
                    ticket={offer}
                    isLast={index === openTickets.length - 1}
                />
            </View>
        </View>
    )

    return (
        <View
            onLayout={(event) => setTabHeight(event.nativeEvent.layout.height)}
            style={{
                width: 850,
                maxWidth: '100%',
                alignSelf: 'center',
                //paddingHorizontal: SPACING.medium,
                paddingTop: SPACING.xx_large,
                backgroundColor: COLORS.primary,
                //alignItems: 'center',
            }}
        >
            <FlatList
                contentContainerStyle={{ gap: GAP }}
                keyExtractor={(item) => item.id}
                data={openTickets == null ? new Array(10).fill(null, 0).map((_, index) => ({ id: index })) : openTickets}
                renderItem={({ item, index }) => openTickets == null ? <Skeleton /> : renderItem(item, index)}
                ListEmptyComponent={() => !refreshing && (
                    <Animated.Text entering={FlipInEasyX} style={{ textAlign: 'center', fontFamily: FONTS.medium, color: COLORS.grey400, fontSize: FONT_SIZES.xx_large, }}>
                        No open tickets
                    </Animated.Text>
                )}
                showsVerticalScrollIndicator={false}
            />

            {refreshing && new Array(10).fill(null, 0).map((_, index) => <Skeleton />)}

            <ConfirmationModal
                visible={!!ticketToWin}
                headerText='Vyhrát ticket'
                text='Opravdu chcete vyhrát tento ticket?'
                onCancel={() => setTicketToWin(undefined)}
                onConfirm={() => updateTicketResult(ticketToWin, 'win')}
                headerErrorText='Error'
                confirmLabel='Vyhrát'
                confirmButtonColor={['green', 'green']}
                errorText='Failed to win ticket.'
            />

            <ConfirmationModal
                visible={!!ticketToLose}
                headerText='Prohrát ticket'
                text='Opravdu chcete prohrát tento ticket?'
                onCancel={() => setTicketToLose(undefined)}
                onConfirm={() => updateTicketResult(ticketToLose, 'lose')}
                headerErrorText='Error'
                confirmLabel='Prohrát'
                confirmButtonColor={[COLORS.error, COLORS.error]}
                errorText='Failed to lose ticket.'
            />
        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef,
    openTickets: store.adminState.openTickets
})

export default connect(mapStateToProps, { fetchOpenTickets, closeOpenTicketInRedux, updateTicketEntryInRedux })(withSearchParams(OpenTickets, ['language']))