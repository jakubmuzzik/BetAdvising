import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../../constants'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, interpolate, withTiming, useAnimatedProps, BounceIn } from 'react-native-reanimated'
import  { createRandomString, getEventDate, getEventTime } from '../../utils'
import CustomButton from '../elements/CustomButton'
import withSearchParams from '../hoc/withSearchParams'
import { unlockTicket } from '../../redux/actions/user'

import ConfirmationModal from '../modal/ConfirmationModal'
import { connect } from 'react-redux'

import UnlockedTicket from './UnlockedTicket'

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
                    Tiket #{name}
                </Text>
            </View>
        </View>
    </View>
)

const Match = ({data}) => (
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
                    {createRandomString(data.home)} - {createRandomString(data.away)}
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
                    {getEventDate(new Date(), false, true)}, {getEventTime(new Date())}
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 4
                    }}
                >
                    {createRandomString(data.tip)}
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300
                    }}
                >
                    {createRandomString(data.league)}
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
                {createRandomString(data.odd)}
            </Text>
        </View>
    </View>
)

const TicketBody = ({ offer, onUnlockPress }) => (
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

        {offer.data.map((match, index) => <Match key={index} data={match}/>)}
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

const LockedTicket = ({ offer, searchParams, toastRef, unlockTicket }) => {
    const [cardLayout, setCardLayout] = useState({ width: 0, height: 0 })
    const [confirmUnlockVisible, setConfirmUnlockVisible] = useState(false)

    //need to hold the data in state because of the reanimated interpolation when user unlocks the ticket
    //cant put it to redux because of the same reason
    const [offerData, setOfferData] = useState(JSON.parse(JSON.stringify(offer)))

    const isFlipped = useSharedValue(false)

    const isDirectionX = false
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

    const unlock = async () => {
        try {
            const newOfferData = await unlockTicket(offerData.id, offerData.ticket)

            setOfferData(newOfferData)

            //wait for the setOfferData to finish
            setTimeout(() => isFlipped.value = !isFlipped.value)

            toastRef?.show({
                text: 'Ticket has been unlocked',
                type: 'success'
            })
        } catch(e) {
            console.error(e)

            const message = e.message || 'Failed to unlock ticket'

            if (message.includes('User does not have enough credits')) {
                toastRef?.show({
                    text: 'Nemáte dostatek kreditů. Prosím dobijte si váš kreditový účet.',
                    type: 'warning'
                })
            } else {
                toastRef?.show({
                    text: 'Failed to unlock ticket',
                    type: 'error'
                })
            }
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
                    <TicketHeader type={offerData.data.length === 1 ? 'Single' : 'AKO'} name={offerData.name} />
                    <TicketBody offer={offerData} onUnlockPress={onUnlockPress} />
                    <TicketFooter odd={offerData.odd} stake={offerData.stake} />
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

                {offerData.ticket_data && <UnlockedTicket ticket={offerData.ticket_data} />}
            </Animated.View>


            <ConfirmationModal
                visible={confirmUnlockVisible}
                headerText='Unlock ticket'
                text={'Are you sure you want to unlock this ticket with ' + offerData.price + ' credits?'} 
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

export default connect(mapStateToProps, { unlockTicket })(LockedTicket)

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