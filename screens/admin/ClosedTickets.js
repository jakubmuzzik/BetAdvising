import React, { useState, useMemo, useEffect, useRef } from 'react'
import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../../constants'
import { normalize, calculateTimeDifference } from '../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { fetchClosedTickets } from '../../redux/actions/admin'
import { ActivityIndicator } from 'react-native-paper'
import Animated, { FlipInEasyX } from 'react-native-reanimated'
import { MAX_TICKETS_ROWS_PER_QUERY } from '../../redux/actions/admin'
import ContentLoader, { Rect } from "react-content-loader/native"
import { Image } from 'expo-image'

import UnlockedTicket from '../../components/tickets/UnlockedTicket'
import { connect } from 'react-redux'
import withSearchParams from '../../components/hoc/withSearchParams'

const GAP = normalize(60)

const Divider = ({ isLast, result }) => {
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
                {
                    result === 'pending' ? <MaterialIcons name="question-mark" size={FONT_SIZES.x_large} color={COLORS.white} />
                        : result === 'win' ? <Image
                            source={require('../../assets/images/SuccessIcon.png')}
                            style={{
                                width: 18,
                                height: 18
                            }}
                            contentFit="contain"
                        />
                            : result === 'lose' ? <Image
                                source={require('../../assets/images/ErrorIcon.png')}
                                style={{
                                    width: 18,
                                    height: 18
                                }}
                                contentFit="contain"
                            />
                                : <MaterialCommunityIcons name="cancel" size={18} color={COLORS.white} />
                }
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

const ClosedTickets = ({ fetchClosedTickets, setTabHeight, toastRef, closedTickets, searchParams }) => {
    const { width } = useWindowDimensions()

    const allTicketsLoaded = useRef(false)

    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (closedTickets == null) {
            fetchClosedTickets()
        }
    }, [
        closedTickets
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
    }, [closedTickets])

    const onEndReached = async () => {
        if (allTicketsLoaded.current || closedTickets == null || refreshing || closedTickets.length < MAX_TICKETS_ROWS_PER_QUERY) {
            return
        }

        setRefreshing(true)
        const newOpenTickets = await fetchClosedTickets()
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
            {/* {!isSmallScreen && <TimeLeft onTimeLeftLayout={(event) => onTimeLeftLayout(event, index)} width={timeLeftWidth} startDate={offer.start_date} />} */}
            <Divider
                isLast={index === closedTickets.length - 1}
                result={offer.result}
            />

            <View
                style={{
                    gap: SPACING.medium,
                    flex: 1
                }}
            >
                {/* {isSmallScreen && <TimeLeft startDate={offer.start_date} />} */}
                <UnlockedTicket
                    searchParams={searchParams}
                    ticket={offer}
                    isLast={index === closedTickets.length - 1}
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
                data={closedTickets == null ? new Array(10).fill(null, 0).map((_, index) => ({ id: index })) : closedTickets}
                renderItem={({ item, index }) => closedTickets == null ? <Skeleton /> : renderItem(item, index)}
                ListEmptyComponent={() => !refreshing && (
                    <Animated.Text entering={FlipInEasyX} style={{ textAlign: 'center', fontFamily: FONTS.medium, color: COLORS.grey400, fontSize: FONT_SIZES.xx_large, }}>
                        No closed tickets
                    </Animated.Text>
                )}
                showsVerticalScrollIndicator={false}
            />
            {refreshing && new Array(10).fill(null, 0).map((_, index) => <Skeleton />)}
        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef,
    closedTickets: store.adminState.closedTickets
})

export default connect(mapStateToProps, { fetchClosedTickets })( withSearchParams(ClosedTickets, ['language']))