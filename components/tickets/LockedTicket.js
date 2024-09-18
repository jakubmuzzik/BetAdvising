import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../../constants'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, interpolate, withTiming, useAnimatedProps, BounceIn } from 'react-native-reanimated'

import CustomButton from '../elements/CustomButton'
import withSearchParams from '../hoc/withSearchParams'

import ConfirmationModal from '../modal/ConfirmationModal'
import { connect } from 'react-redux'

import UnlockedTicket from './UnlockedTicket'

const TICKET = {
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
        },
        {
            id: 3,
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

const TicketHeader = ({ name, type }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: SPACING.x_small
        }}
    >
        <View
            style={{
                flexDirection: 'row',
                gap: SPACING.xx_small,
                alignItems: 'center',
            }}
        >
            <MaterialCommunityIcons name="ticket-confirmation" size={30} color={COLORS.grey200} />
            <View>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.small,
                        color: COLORS.grey400,
                        marginBottom: 2
                    }}
                >
                    {type}
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.white
                    }}
                >
                    Tiket {name}
                </Text>
            </View>
        </View>
    </View>
)

const Match = () => (
    <View
        style={{
            flex: 1
        }}
    >
        <View
            style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SPACING.xx_small,

                }}
            >
                <FontAwesome name="soccer-ball-o" size={18} color={COLORS.grey300} />
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.white,
                    }}
                >
                    FC Barcelona - Real Madrid
                </Text>
            </View>

            <View>
                <MaterialIcons name="question-mark" size={FONT_SIZES.x_large} color={COLORS.white} />
            </View>
        </View>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <View>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 4
                    }}
                >
                    12. 5. 2021 20:00
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 4
                    }}
                >
                    Výsledek zápasu: 1
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300
                    }}
                >
                    Fotbal / La Liga
                </Text>
            </View>

            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.white,
                    textAlign: 'right'
                }}
            >
                2.89
            </Text>
        </View>
    </View>
)

const TicketBody = ({ ticket, onUnlockPress }) => (
    <View style={{
        padding: SPACING.small,
        backgroundColor: COLORS.secondary2,
        borderTopWidth: 1,
        borderColor: COLORS.whiteBackground2,
        gap: SPACING.medium
    }}>
        <BlurView
            intensity={50}
            tint='dark'
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                borderRadius: 10,
                padding: SPACING.medium,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CustomButton
                onPress={onUnlockPress}
                additionalStyles={{ marginTop: SPACING.medium }}
                textColor={COLORS.black}
                backgroundColors={[COLORS.accent2, COLORS.accent, COLORS.accent, COLORS.accent2]}
                buttonText='Odemknout'
                textStyles={{ fontSize: FONT_SIZES.large, fontFamily: FONTS.bold }}
            />
        </BlurView>

        {
            new Array(ticket.match_count).fill(null, 0).map((_, index) => (<Match key={index} />))
        }
    </View>
)

const TicketFooter = ({ odd, stake }) => (
    <View
        style={{
            padding: SPACING.xx_small,
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderTopWidth: 1,
            borderColor: COLORS.whiteBackground2,
        }}
    >
        <View>
            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey400
                }}
            >
                Celkový kurz
            </Text>
            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.white,
                    marginTop: 4,
                    textAlign: 'center'
                }}
            >
                {odd}
            </Text>
        </View>
        <View>
            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey400
                }}
            >
                Kolik jsme vsadili
            </Text>
            <View
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.white,
                    marginTop: 4,
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.white,
                        textAlign: 'center'
                    }}
                >
                    {stake} Kč
                </Text>
            </View>
        </View>
    </View>
)

const LockedTicket = ({ ticket, searchParams, toastRef }) => {
    const [cardLayout, setCardLayout] = useState({ width: 0, height: 0 })
    const [confirmUnlockVisible, setConfirmUnlockVisible] = useState(false)

    const isFlipped = useSharedValue(false)

    const isDirectionX = true
    const duration = 500

    const regularCardAnimatedStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180])
        const rotateValue = withTiming(`${spinValue}deg`, { duration })

        return {
            transform: [
                isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
            ],
        }
    })

    const flippedCardAnimatedStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360])
        const rotateValue = withTiming(`${spinValue}deg`, { duration })

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

    const onUnlockPress = () => {
        setConfirmUnlockVisible(true)
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const unlock = async () => {
        try {
            await delay(1000)

            isFlipped.value = !isFlipped.value

            toastRef?.show({
                text: 'Ticket has been unlocked',
                type: 'success'
            })
        } catch(e) {
            toastRef?.show({
                text: 'Failed to unlock ticket',
                type: 'error'
            })
        }
    }

    return (
        <>
            <Animated.View
                style={[
                    styles.regularCard,
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
                    <TicketHeader type={ticket.type} name={ticket.name} />
                    <TicketBody ticket={ticket} onUnlockPress={onUnlockPress} />
                    <TicketFooter odd={ticket.odd} stake={ticket.stake} />
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

                <UnlockedTicket ticket={TICKET} />
            </Animated.View>


            <ConfirmationModal
                visible={confirmUnlockVisible}
                headerText='Unlock ticket'
                text={'Are you sure you want to unlock this ticket with ' + ticket.price + ' credits?'} 
                onCancel={() => setConfirmUnlockVisible(false)}
                onConfirm={unlock}
                headerErrorText='Error'
                errorText='Failed to unlock ticket.'
                confirmLabel='Unlock'
                confirmButtonColor={[COLORS.accent2, COLORS.accent, COLORS.accent, COLORS.accent2]}
                confirmButtonTextColor={COLORS.black}
            />
        </>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef
})

export default connect(mapStateToProps)(withSearchParams(LockedTicket, ['language']))

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