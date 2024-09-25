import React, { useState, useEffect, useRef } from 'react'
import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../../../constants'
import { normalize, calculateTimeDifference } from '../../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import ContentLoader, { Rect } from "react-content-loader/native"
import Animated, { FlipInEasyX } from 'react-native-reanimated'
import { MAX_TICKETS_ROWS_PER_QUERY } from '../../../redux/actions/admin'

import withSearchParams from '../../../components/hoc/withSearchParams'

import UnlockedTicket from '../../../components/tickets/UnlockedTicket'
import LockedTicket from '../../../components/tickets/LockedTicket'
import { connect } from 'react-redux'
import { fetchOffers } from '../../../redux/actions/user'

const GAP = normalize(60)

const Skeleton = ({ timeLeftWidth, isSmallScreen }) => (
    <View
        style={{
            flexDirection: 'row',
            gap: SPACING.small,
            width: 850,
                maxWidth: '100%',
                alignSelf: 'center',
        }}
    >
        {!isSmallScreen && <ContentLoader
            speed={2}
            height={50}
            width={timeLeftWidth}
            style={{ borderRadius: 10 }}
            backgroundColor={COLORS.secondary}
            foregroundColor={COLORS.secondary2}
        >
            <Rect x="0" y="0" rx="0" ry="0" width="100%" height={50} />
        </ContentLoader>}

        <View>
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
                <FontAwesome name="lock" size={18} color={COLORS.white} />
            </LinearGradient>
            <LinearGradient
                colors={[COLORS.whiteBackground2, COLORS.whiteBackground2, COLORS.whiteBackground2]}
                style={{
                    width: 1,
                    position: 'absolute',
                    //top: -20,
                    left: 17.5,
                    height: 400 + GAP,
                }}
            />
        </View>

        <ContentLoader
            speed={2}
            height={400}
            //width={750}
            style={{ borderRadius: 10, alignSelf: 'center', flexGrow: 1 }}
            backgroundColor={COLORS.secondary}
            foregroundColor={COLORS.secondary2}
        >
            <Rect x="0" y="0" rx="0" ry="0" width={850} height={400} />
        </ContentLoader>
    </View>
)

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

const Divider = ({ isLast, isLocked }) => {
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
                {isLocked ? <FontAwesome name="lock" size={18} color={COLORS.white} /> : <FontAwesome name="unlock" size={18} color={COLORS.white} />}
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

const Offers = ({ searchParams, setTabHeight, fetchOffers, offers }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < 700

    const currentWidestTimeLeft = useRef(0)
    const allTicketsLoaded = useRef(false)

    const [timeLeftWidth, setTimeLeftWidth] = useState()
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (offers == null) {
            fetchOffers()
        }
    }, [
        offers
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
    }, [])

    const onEndReached = async () => {
        if (allTicketsLoaded.current || offers == null || refreshing || offers.length < MAX_TICKETS_ROWS_PER_QUERY) {
            return
        }

        setRefreshing(true)
        const newOffers = await fetchOffers()
        if (newOffers == null || newOffers?.length === 0) {
            allTicketsLoaded.current = true
        }
        setRefreshing(false)
    }

    const onTimeLeftLayout = (event, index) => {
        const { width } = event.nativeEvent.layout
        
        if (width > currentWidestTimeLeft.current) {
            currentWidestTimeLeft.current = width
        }

        if (index === offers.length - 1) {
            setTimeLeftWidth(currentWidestTimeLeft.current)
        }
    }

    const renderItem = (offer, index) => (
        <View
            key={offer.id}
            style={{
                flexDirection: 'row',
                gap: SPACING.small
            }}
        >
            {!isSmallScreen && <TimeLeft onTimeLeftLayout={(event) => onTimeLeftLayout(event, index)} width={timeLeftWidth} startDate={offer.start_date} />}
            <Divider isLast={index === offers.length - 1} isLocked={offer.ticket_data == null} />

            {offer.ticket_data != null ? (
                <View
                    style={{
                        gap: SPACING.medium,
                        flex: 1
                    }}
                >
                    {isSmallScreen && <TimeLeft startDate={offer.start_date} />}
                    <UnlockedTicket
                        searchParams={searchParams}
                        ticket={offer.ticket_data}
                        isLast={index === offer.length - 1}
                    /> 
                </View>
            ) : (
                <View
                    style={{
                        gap: SPACING.medium,
                        flex: 1
                    }}
                >
                    {isSmallScreen && <TimeLeft startDate={offer.start_date} />}
                    <LockedTicket
                        searchParams={searchParams}
                        offer={offer}
                        isLast={index === offers.length - 1}
                    />
                </View>
            )}
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
                gap: GAP
                //alignItems: 'center',
            }}
        >
            <FlatList
                contentContainerStyle={{ gap: GAP }}
                keyExtractor={(item) => item.id}
                data={offers == null ? new Array(10).fill(null, 0).map((_, index) => ({ id: index })) : offers}
                renderItem={({ item, index }) => offers == null ? <Skeleton /> : renderItem(item, index)}
                ListEmptyComponent={() => !refreshing && (
                    <Animated.Text entering={FlipInEasyX} style={{ textAlign: 'center', fontFamily: FONTS.medium, color: COLORS.grey400, fontSize: FONT_SIZES.xx_large, }}>
                        No offers at the moment
                    </Animated.Text>
                )}
                showsVerticalScrollIndicator={false}
            />
            {refreshing && new Array(10).fill(null, 0).map((_, index) => <Skeleton key={index} timeLeftWidth={timeLeftWidth} isSmallScreen={isSmallScreen} />)}
        </View>
    )
}

const mapStateToProps = (store) => ({
    offers: store.userState.offers
})

export default connect(mapStateToProps, { fetchOffers })(withSearchParams(Offers, ['language']))