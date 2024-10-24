import { useState, memo } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import { Text } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, CUSTOM_BUTTON_HEIGHT, COLORS } from '../../constants'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import Tooltip from '../elements/Tooltip'
import { getEventDate, getEventTime } from '../../utils'
import Animated, { useAnimatedStyle, withTiming, useAnimatedProps, interpolateColor } from 'react-native-reanimated'
import { STEP_SMALL_SCREEN_THRESHOLD } from '.'
import HoverableView from '../elements/HoverableView'

const getMinutesDiff = (diff) => {
    const minutes = Math.floor(diff / 60) % 60
    return minutes
}

const getHoursDiff = (diff) => {
    const hours = Math.floor(diff / 3600) % 24
    return hours
}

const getDaysDiff = (diff) => {
    const days = Math.floor(diff / 86400)
    return days
}

const renderDate = (createdDate) => {
    let diffInMilliSeconds = Math.abs(new Date(createdDate) - new Date()) / 1000
    const daysDiff = getDaysDiff(diffInMilliSeconds)

    if (daysDiff === 0) {
        const hoursDiff = getHoursDiff(diffInMilliSeconds)
        if (hoursDiff === 0) {
            const minutesDiff = getMinutesDiff(diffInMilliSeconds)
            return minutesDiff === 0 ? 'Právě teď' : `před ${minutesDiff} minut${minutesDiff < 2 ? 'ou' : 'ama'} `
        } else {
            return `před ${hoursDiff} hodin${hoursDiff === 1 ? 'ou' : 'ama'}`
        }
    } else if (daysDiff < 8) {
        return `před ${daysDiff} dn${daysDiff === 1 ? 'em' : 'ama'}`
    } else {
        return getEventDate(createdDate, true, true)
    }
}

// transform: [
//     { rotateX: '20deg' },
//     { rotateY: '-20deg' },
//     { rotateZ: '20deg' },
//     //{ scale: withTiming(isHovered ? 1.1 : 1, { duration: 200 }) }
// ],

// <LinearGradient
//                 colors={['rgba(22,22,22,0)', COLORS.primary]}
//                 style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}
//             />

const NOTIFICATIONS = [
    {
        type: 'ticket_success',
        //2 days ago
        created_date: new Date(new Date().getTime() - 0.1 * 24 * 60 * 60 * 1000).toISOString(),
        ticket: {
            name: '123',
            price: 50
        }
    },
    {
        type: 'ticket_success',
        //2 days ago
        created_date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(),
        ticket: {
            name: '124',
            price: 50
        }
    },
    {
        type: 'ticket_success',
        //2 days ago
        created_date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        ticket: {
            name: '125',
            price: 50
        }
    },
    {
        type: 'credit_returned',
        //one day ago
        created_date: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        ticket: {
            name: '126',
            price: 100
        }
    },
]

const Notification = ({ notification, index }) => {

    return (
        <HoverableView
            style={{
                borderWidth: notification.type === 'credit_returned' ? 1 : 0,
                borderColor: COLORS.whiteBackground2,
                borderTopLeftRadius: index === 0 || notification.type === 'credit_returned' ? 10 : 0,
                borderTopRightRadius: index === 0 || notification.type === 'credit_returned' ? 10 : 0,
                borderRadius: notification.type === 'credit_returned' || index === NOTIFICATIONS.length - 2 ? 10 : 0,
                transform: notification.type === 'credit_returned' ? [
                    {translateY: 15},
                    {translateX: -15},
                    {translateZ: -15},
                ] : [],
                //opacity: notification.type === 'credit_returned' ? 0.8 : 1
            }}
            backgroundColor={COLORS.secondary}
            hoveredBackgroundColor={COLORS.secondary2}
        >
            <View
                style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1
                }}
            >
                <>
                    <View
                        style={{
                            marginRight: 20
                        }}
                    >
                        {
                            notification.type === 'credit_returned' ? (
                                <Text style={{ fontSize: FONT_SIZES.xx_large }}>↩️</Text>
                            ) : notification.type === 'ticket_success' ? (
                                <Text style={{ fontSize: FONT_SIZES.xx_large }}>🎉</Text>
                            ) : null
                        }
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                color: COLORS.grey400,
                                fontFamily: FONTS.regular,
                                fontSize: FONT_SIZES.medium
                            }}
                        >
                            {renderDate(notification.created_date)}
                        </Text>

                        <Text
                            style={{
                                paddingTop: 8,
                                fontFamily: FONTS.medium,
                                fontSize: FONT_SIZES.large,
                                color: COLORS.grey100
                            }}
                        >
                            {
                                notification.type === 'credit_returned' ? 'Dnes to nevyšlo, vracíme vám ' + notification.ticket.price + ' kreditů za neúspešný tiket #' + notification.ticket.name + '.'
                                    : notification.type === 'ticket_success' ? 'Gratulujeme, zakoupený tiket #' + notification.ticket.name + ' byl úspěšný.'
                                        : ''
                            }
                        </Text>
                    </View>
                </>
            </View>
        </HoverableView>
    )
}

const Notifications = () => {
    const { width } = useWindowDimensions()
    const isSmallScreen = width < STEP_SMALL_SCREEN_THRESHOLD

    return (
        <View
            style={{
                perspective: 1000,
            }}
        >
        <View
            style={{
                width: 500,
                maxWidth: 500,
                //width: isSmallScreen ? '100%' : 500,
                zoom: width < 350 ? 0.4 : width < 450 ? 0.5 : 0.65,
                //perspective: 2000,
                alignSelf: 'center',
                marginBottom: isSmallScreen ? 140 : 0,
                borderRadius: 10,
                //overflow: 'hidden',
                perspective: 1000,
                transform: [
                         { rotateX: '6deg' },
                         { rotateY: '-6deg' },
                    { rotateZ: '6deg' },
                ],
                borderWidth: 1,
                borderColor: COLORS.whiteBackground2,
                shadowColor: COLORS.secondary,
                shadowOffset: {
                    width: 2,
                    height: 5,
                },
                shadowOpacity: 0.65,
                shadowRadius: 10.84,
                elevation: 5,
            }}
        >
            {
                NOTIFICATIONS.map((notification, index) => (
                    <Notification
                        key={notification.ticket.name}
                        notification={notification}
                        index={index}
                    />
                ))
            }
        </View>
        </View>
    )
}

export default Notifications