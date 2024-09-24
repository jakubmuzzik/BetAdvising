import React, { useState, useMemo, useEffect, useRef } from 'react'
import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../../constants'
import { normalize, calculateTimeDifference } from '../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { fetchOpenTickets } from '../../redux/actions/admin'
import { ActivityIndicator } from 'react-native-paper'
import Animated, { FlipInEasyX } from 'react-native-reanimated'
import { MAX_TICKETS_ROWS_PER_QUERY } from '../../redux/actions/admin'
import ContentLoader, { Rect } from "react-content-loader/native"

import UnlockedTicket from '../../components/tickets/UnlockedTicket'
import { connect } from 'react-redux'

const GAP = normalize(60)

const OFFERS = [
    {
        id: 2,
        type: 'AKO',
        name: '#34',
        odd: 2.5,
        stake: 2400,
        price: 100,
        //3 hours from now
        first_match_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
        tickets: [
            {
                type: 'AKO',
                name: '#34',
                odd: 3.0,
                stake: 100,
                result: 'win',
                //3 hours from now
                first_match_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
                ticket_entries: [
                    {
                        id: 1,
                        sport: 'Football',
                        start_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
                        team_home: 'Manchester United',
                        team_away: 'Chelsea',
                        tip: 'Výsledek zápasu: 1',
                        odd: 1.5,
                        league: 'Premier League',
                        // pending / win / lose / cancelled
                        result: 'win',
                    },
                    {
                        id: 2,
                        sport: 'Football',
                        start_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
                        team_home: 'Manchester United',
                        team_away: 'Chelsea',
                        tip: 'Výsledek zápasu: 1',
                        odd: 1.5,
                        league: 'Premier League',
                        // pending / win / lose / cancelled
                        result: 'win',
                    }
                ]
            }
        ]
    }
]

const TimeLeft = ({ startDate, width, onTimeLeftLayout=() => {}}) => {
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
            onLayout={(event) => onTimeLeftLayout(event)}
            style={width != null ? { width } : null}
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
                <FontAwesome name="unlock" size={18} color={COLORS.white} />
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

const OpenTickets = ({ fetchOpenTickets, setTabHeight, toastRef, openTickets }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < 700

    const currentWidestTimeLeft = useRef(0)
    const allTicketsLoaded = useRef(false)

    const [timeLeftWidth, setTimeLeftWidth] = useState()
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (openTickets == null) {
            fetchOpenTickets()
        }
    }, [
        openTickets
    ])

    const onTimeLeftLayout = (event, index) => {
        const { width } = event.nativeEvent.layout
        
        if (width > currentWidestTimeLeft.current) {
            currentWidestTimeLeft.current = width
        }

        if (index === OFFERS.length - 1) {
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
            {!isSmallScreen && <TimeLeft onTimeLeftLayout={(event) => onTimeLeftLayout(event, index)} width={timeLeftWidth} startDate={offer.first_match_date} />}
            <Divider isLast={index === OFFERS.length - 1} isLocked={offer.tickets.length === 0} />

            <View
                style={{
                    gap: SPACING.medium,
                    flex: 1
                }}
            >
                {isSmallScreen && <TimeLeft startDate={offer.first_match_date} />}
                <UnlockedTicket
                    ticket={offer.tickets[0]}
                    isLast={index === OFFERS.length - 1}
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
                data={openTickets == null ? new Array(10).fill(null, 0).map((_, index) => ({ id: index }))  : openTickets}
                renderItem={({ item, index }) => openTickets == null ? <Skeleton /> : renderItem(item, index)}
                onEndReached={onEndReached}
                ListFooterComponent={() => refreshing && (
                    <ActivityIndicator
                        size='small'
                        color={COLORS.darkBlue}
                        style={{ padding: SPACING.medium }}
                    />
                )}
                ListEmptyComponent={() => !refreshing && (
                    <Animated.Text entering={FlipInEasyX} style={{ textAlign: 'center', fontFamily: FONTS.medium, color: COLORS.grey400, fontSize: FONT_SIZES.xx_large, }}>
                        No open tickets
                    </Animated.Text>
                )}
                refreshing={refreshing}
            />

        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef,
    openTickets: store.adminState.openTickets
})

export default connect(mapStateToProps, { fetchOpenTickets })(OpenTickets)