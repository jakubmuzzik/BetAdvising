import React, { useState, useMemo } from 'react'
import { View, Text } from 'react-native'
import { FONT_SIZES, COLORS, FONTS, SPACING } from '../../constants'
import { normalize } from '../../utils'
import { Octicons } from '@expo/vector-icons'

import HoverableView from '../../components/elements/HoverableView'

const Notification = ({ notification }) => {
    const renderDate = () => {
        let diffInMilliSeconds = Math.abs(new Date(notification.created_date) - new Date()) / 1000
        const daysDiff = getDaysDiff(diffInMilliSeconds)

        if (daysDiff === 0) {
            const hoursDiff = getHoursDiff(diffInMilliSeconds)
            if (hoursDiff === 0) {
                const minutesDiff = getMinutesDiff(diffInMilliSeconds)
                return minutesDiff === 0 ? 'Just now' : `${minutesDiff} minute${minutesDiff < 2 ? '' : 's'} ago`
            } else {
                return `${hoursDiff} hour${hoursDiff === 1 ? '' : 's'} ago`
            }
        } else if (daysDiff < 8) {
            return `${daysDiff} day${daysDiff === 1 ? '' : 's'} ago`
        } else {
            return getEventDate(notification.created_date, true, true)
        }
    }

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

    return (
        <HoverableView
            style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center'
            }}
            backgroundColor={COLORS.secondary}
            hoveredBackgroundColor={COLORS.secondary2}
        >
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
                        notification.type === 'credit_returned' ? 'Dnes to nevyšlo, vracíme vám 100 kreditů za neúspešný tiket #1235.'
                            : notification.type === 'ticket_success' ? 'Gratulujeme, zakoupený tiket #1235 byl úspěšný.'
                                : ''
                    }
                </Text>
            </View>
        </HoverableView>
    )
}

/**
 * Vracene kredity
 * Odemceny tiket byl uspesny
 */
const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            read: false,
            id: 1,
            type: 'credit_returned',
            created_date: new Date()
        },
        {
            read: false,
            id: 4,
            type: 'credit_returned',
            created_date: new Date()
        },
        {
            read: true,
            id: 2,
            type: 'ticket_success',
            created_date: new Date()
        },
    ])

    const newNotifications = useMemo(() => notifications.filter(n => !n.read), [notifications])
    const oldNotifications = useMemo(() => notifications.filter(n => n.read), [notifications])

    return (
        <View
            style={{
                width: normalize(800),
                maxWidth: '100%',
                alignSelf: 'center',
                padding: SPACING.medium
            }}
        >
            <Text
                style={{
                    color: COLORS.white,
                    fontSize: FONT_SIZES.h2,
                    fontFamily: FONTS.medium,
                    marginTop: SPACING.large,
                }}
            >
                Notifikace
            </Text>

            {newNotifications.length > 0 && (
                <View
                    style={{
                        marginTop: SPACING.xx_large
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Octicons name="dot-fill" size={20} color={COLORS.accent} style={{ marginRight: SPACING.xx_small }} />
                        <Text
                            style={{
                                color: COLORS.white,
                                fontSize: FONT_SIZES.x_large,
                                fontFamily: FONTS.medium,
                                marginBottom: SPACING.small
                            }}
                        >
                            Nové
                        </Text>
                    </View>

                    <View style={{
                        borderRadius: 10,
                        backgroundColor: COLORS.secondary,
                        overflow: 'hidden'
                    }}>
                        {newNotifications.map(n => (
                            <Notification key={n.id} notification={n} />
                        ))}
                    </View>
                </View>
            )}

            {oldNotifications.length > 0 && (
                <View
                    style={{
                        marginTop: SPACING.xx_large
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.grey200,
                            fontSize: FONT_SIZES.x_large,
                            fontFamily: FONTS.medium,
                            marginBottom: SPACING.small
                        }}
                    >
                        Zobrazené
                    </Text>

                    <View style={{
                        borderRadius: 10,
                        backgroundColor: COLORS.secondary,
                        overflow: 'hidden'
                    }}>
                        {oldNotifications.map(n => (
                            <Notification key={n.id} notification={n} />
                        ))}
                    </View>
                </View>
            )}
        </View>
    )
}

export default Notifications