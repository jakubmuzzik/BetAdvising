import React, { useState, useEffect, useRef } from 'react'
import { View, Text, useWindowDimensions, FlatList, StyleSheet } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../../../constants'
import { normalize, calculateTimeDifference } from '../../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import ContentLoader, { Rect } from "react-content-loader/native"
import Animated, { FlipInEasyX, FadeInDown, useAnimatedStyle, useSharedValue, interpolate, withTiming, useAnimatedProps, BounceIn } from 'react-native-reanimated'
import { MAX_OFFER_ROWS_PER_QUERY } from '../../../redux/actions/user'

import withSearchParams from '../../../components/hoc/withSearchParams'

import UnlockedTicket from '../../../components/tickets/UnlockedTicket'
import LockedTicket from '../../../components/tickets/LockedTicket'
import { connect } from 'react-redux'
import { fetchOffers } from '../../../redux/actions/user'
import { ActivityIndicator } from 'react-native-paper'

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
            width={timeLeftWidth ?? 150}
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

const TimeLeft = ({ startDate, width, onTimeLeftLayout = () => { } }) => {
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
            style={width != null ? { width, alignItems: 'flex-end' } : { alignItems: 'flex-end' }}
        >
            <View
                onLayout={(event) => onTimeLeftLayout(event)}
                style={{
                    position: 'absolute',
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

const FlippableTicket = ({ isLast, offer, searchParams, isSmallScreen, onTimeLeftLayout, timeLeftWidth, index }) => {
    const previousOffer = useRef(offer)

    const [cardLayout, setCardLayout] = useState({ width: 0, height: 0 })

    const isFlipped = useSharedValue(!!offer.ticket_data)

    const isDirectionX = false
    const duration = 500

    useEffect(() => {
        if (previousOffer.current.ticket_data == null && offer.ticket_data != null) {
            isFlipped.value = withTiming(1, { duration: duration })
        }

        previousOffer.current = offer
    }, [offer])

    const regularCardAnimatedStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]) + 'deg'

        return {
            transform: [
                isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
            ],
        }
    })

    const flippedCardAnimatedStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]) + 'deg'

        return {
            transform: [
                isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
            ],
        }
    })

    const flippedCardAnimatedProps = useAnimatedProps(() => {
        return {
            pointerEvents: isFlipped.value ? 'auto' : 'none',
        }
    })

    return (
        <View
            key={offer.id}
            style={{
                flexDirection: 'row',
                gap: SPACING.small
            }}
        >
            {!isSmallScreen && <TimeLeft onTimeLeftLayout={(event) => onTimeLeftLayout(event, index)} width={timeLeftWidth} startDate={offer.start_date} />}


            {timeLeftWidth && (
                <>
                    <Divider isLast={isLast} isLocked={offer.ticket_data == null} />
                    <Animated.View
                        style={[
                            styles.regularCard,
                            //without this the locked ticket flickers when ticket is unlocked on render
                            { opacity: isFlipped.value ? 0 : 1 },
                            regularCardAnimatedStyle,
                        ]}>
                        <View
                            onLayout={(event) => setCardLayout({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height })}
                            style={{
                                borderRadius: 10,
                                backgroundColor: COLORS.secondary,
                                borderWidth: 1,
                                borderColor: COLORS.whiteBackground2,
                                flexGrow: 1
                            }}
                        >
                            <LockedTicket
                                searchParams={searchParams}
                                offer={offer}
                            />
                        </View>
                    </Animated.View>

                    <Animated.View
                        animatedProps={flippedCardAnimatedProps}
                        style={[
                            styles.flippedCard,
                            flippedCardAnimatedStyle,
                            {
                                width: cardLayout.width,
                                height: cardLayout.height,
                                right: 0,
                                bottom: 0
                            }
                        ]}>

                        {offer.ticket_data && <UnlockedTicket ticket={offer.ticket_data} />}
                    </Animated.View>
                </>
            )}
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
    }, [offers])

    const onEndReached = async () => {
        if (allTicketsLoaded.current || offers == null || refreshing || offers.length < MAX_OFFER_ROWS_PER_QUERY) {
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
                renderItem={({ item, index }) => offers == null ? <Skeleton key={index} timeLeftWidth={timeLeftWidth} isSmallScreen={isSmallScreen} /> : <FlippableTicket isLast={index === offers.length - 1} offer={item} searchParams={searchParams} isSmallScreen={isSmallScreen} onTimeLeftLayout={onTimeLeftLayout} timeLeftWidth={timeLeftWidth} index={index} />}//= ({ isLast, offer, searchParams, isSmallScreen, onTimeLeftLayout }) => {}
                ListEmptyComponent={() => !refreshing && (
                    <Animated.Text entering={FlipInEasyX} style={{ textAlign: 'center', fontFamily: FONTS.medium, color: COLORS.grey400, fontSize: FONT_SIZES.xx_large, }}>
                        No offers at the moment
                    </Animated.Text>
                )}
                showsVerticalScrollIndicator={false}
            />

            {refreshing && <ActivityIndicator color={COLORS.accent} />}
        </View>
    )
}

const mapStateToProps = (store) => ({
    offers: store.userState.offers
})

export default connect(mapStateToProps, { fetchOffers })(withSearchParams(Offers, ['language']))


const styles = StyleSheet.create({
    regularCard: {
        zIndex: 1,
        overflow: 'hidden',
        flexGrow: 1
    },
    flippedCard: {
        position: 'absolute',
        backfaceVisibility: 'hidden',
        zIndex: 2,
        overflow: 'hidden'
    },
})