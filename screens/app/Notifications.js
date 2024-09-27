import React, { useState, useMemo, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FONT_SIZES, COLORS, FONTS, SPACING } from '../../constants'
import { normalize } from '../../utils'
import { Octicons } from '@expo/vector-icons'
import Animated, { FlipInEasyX } from 'react-native-reanimated'

import HoverableView from '../../components/elements/HoverableView'
import { connect } from 'react-redux'
import { markNotificationsAsDisplayed } from '../../redux/actions/user'

import UnlockedTicketModal from '../../components/modal/UnlockedTicketModal'

const Notification = ({ notification }) => {
    const [ticketModalVisible, setTicketModalVisible] = useState(false)

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

    const onNotificationPress = () => {
        setTicketModalVisible(true)
    }

    return (
        <>
            <HoverableView
                style={{
                }}
                backgroundColor={COLORS.secondary}
                hoveredBackgroundColor={COLORS.secondary2}
            >
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1
                    }}

                    onPress={onNotificationPress}
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
                </TouchableOpacity>
            </HoverableView>

            <UnlockedTicketModal
                visible={ticketModalVisible}
                ticketId={notification.ticket.id}
                onCancel={() => setTicketModalVisible(false)}
            />
        </>
    )
}

/**
 * Vracene kredity
 * Odemceny tiket byl uspesny
 */
const Notifications = ({ notifications, markNotificationsAsDisplayed }) => {
    const newNotifications = useMemo(() => notifications == null ? [] : notifications.filter(n => !n.displayed), [notifications])
    const oldNotifications = useMemo(() => notifications == null ? [] : notifications.filter(n => n.displayed), [notifications])

    useEffect(() => {
        return () => {
            if (newNotifications.length > 0) {
                markNotificationsAsDisplayed(newNotifications.map(n => n.id))
            }
        }
    }, [newNotifications])

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

            {newNotifications.length === 0 && oldNotifications.length === 0 && (
                <Animated.Text
                    entering={FlipInEasyX}
                    style={{
                        color: COLORS.grey400,
                        fontSize: FONT_SIZES.x_large,
                        fontFamily: FONTS.medium,
                        marginTop: SPACING.large
                    }}
                >
                    Nemáte žádné notifikace
                </Animated.Text>
            )}
        </View>
    )
}

const mapStateToProps = (store) => ({
    notifications: store.userState.notifications
})

export default connect(mapStateToProps, { markNotificationsAsDisplayed })(Notifications)