import React, { useState, useEffect, useRef, memo, useCallback } from 'react'
import { View, Text, useWindowDimensions, FlatList, StyleSheet } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../../../constants'
import { normalize, calculateTimeDifference } from '../../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withTiming, useAnimatedProps } from 'react-native-reanimated'

import UnlockedTicket from '../../../components/tickets/UnlockedTicket'
import LockedTicket from '../../../components/tickets/LockedTicket'

const GAP = normalize(60)

const TimeLeft = ({ startDate, width, isSmallScreen, onTimeLeftLayout = () => { } }) => {
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
            style={width != null ? { width, alignItems: isSmallScreen ? 'flex-start' : 'flex-end', marginBottom: isSmallScreen ? SPACING.medium : 0 } : { alignItems: isSmallScreen ? 'flex-start' : 'flex-end', marginBottom: isSmallScreen ? SPACING.medium : 0 }}
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
                {isLocked ? <MaterialCommunityIcons name="lock" size={18} color={COLORS.white} /> : <MaterialCommunityIcons name="lock-open-variant" size={18} color={COLORS.white} />}
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

    const [contentHeight, setContentHeight] = useState(0)
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

    /*const flippedCardAnimatedProps = useAnimatedProps(() => {
        return {
            pointerEvents: isFlipped.value ? 'auto' : 'none',
        }
    })*/

    return (
        <View
            key={offer.id}
            style={{
                flexDirection: 'row',
                gap: SPACING.small,
                //height: 500
            }}
        >
            {!isSmallScreen && <TimeLeft isSmallScreen={isSmallScreen} onTimeLeftLayout={(event) => onTimeLeftLayout(event, index)} width={timeLeftWidth} startDate={offer.start_date} />}


            {(timeLeftWidth || isSmallScreen) && (
                <>
                    <Divider isLast={isLast} isLocked={offer.ticket_data == null} />
                    <View style={{
                        flex: 1
                    }}>
                        {isSmallScreen && <TimeLeft isSmallScreen={isSmallScreen} onTimeLeftLayout={(event) => onTimeLeftLayout(event, index)} width={timeLeftWidth} startDate={offer.start_date} />}

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
                                    flex: 1,
                                }}
                            >
                                <LockedTicket
                                    searchParams={searchParams}
                                    offer={offer}
                                />
                            </View>
                        </Animated.View>

                        <Animated.View
                            //animatedProps={flippedCardAnimatedProps}
                            style={[
                                styles.flippedCard,
                                flippedCardAnimatedStyle,
                                {
                                    width: cardLayout.width,
                                    height: cardLayout.height,
                                    right: 0,
                                    bottom: 0,
                                    pointerEvents: isFlipped.value ? 'auto' : 'none',
                                }
                            ]}>

                            {offer.ticket_data && <UnlockedTicket ticket={offer.ticket_data} />}
                        </Animated.View>
                    </View>
                </>
            )}
        </View>
    )
}

export default memo(FlippableTicket)

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