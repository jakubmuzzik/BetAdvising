import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../../constants'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import  { createRandomString, getEventDate, getEventTime } from '../../utils'
import CustomButton from '../elements/CustomButton'
import { unlockTicket } from '../../redux/actions/user'

import ConfirmationModal from '../modal/ConfirmationModal'
import { connect } from 'react-redux'

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

const Match = ({data, width}) => (
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
                alignItems: 'center',
                flexShrink: 1,
                gap: 10
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SPACING.xx_small,
                    flexShrink: 1
                }}
            >
                <FontAwesome name="soccer-ball-o" size={18} color={COLORS.grey300} />
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: width < 420 ? FONT_SIZES.medium : FONT_SIZES.large,
                        color: COLORS.white,
                        flexShrink: 1,
                        wordBreak: 'break-word'
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
                gap: SPACING.small,
            }}
        >
            <View style={{ flexShrink: 1, }}>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 4,
                        flexShrink: 1,
                    }}
                >
                    {getEventDate(new Date(), false, true)}, {getEventTime(new Date())}
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 4,
                        flexShrink: 1,
                    }}
                >
                    {createRandomString(data.tip)}
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        flexShrink: 1,
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

const TicketBody = ({ offer, onUnlockPress }) => {
    const { width } = useWindowDimensions()

    return (
    <View style={{
        padding: SPACING.small,
        backgroundColor: COLORS.secondary2,
        borderTopWidth: 1,
        borderColor: COLORS.whiteBackground2,
        gap: SPACING.medium,
        flexGrow: 1
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

        {offer.data.map((match, index) => <Match key={index} data={match} width={width} />)}
    </View>
    )
}

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
    const [confirmUnlockVisible, setConfirmUnlockVisible] = useState(false)

    const onUnlockPress = () => {
        setConfirmUnlockVisible(true)
    }

    const unlock = async () => {
        try {
            await unlockTicket(offer.id, offer.ticket)

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
            } else if (message.includes('duplicate key value violates')) {
                toastRef?.show({
                    text: 'Tiket už byl odemčen. Aktualizujte prosím stránku.',
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
        <View
            style={{
                borderRadius: 10,
                backgroundColor: COLORS.secondary,
                borderWidth: 1,
                borderColor: COLORS.whiteBackground2,
                flexGrow: 1
            }}
        >
            <TicketHeader type={offer.data.length === 1 ? 'Single' : 'AKO'} name={offer.name} />
            <TicketBody offer={offer} onUnlockPress={onUnlockPress} />
            <TicketFooter odd={offer.odd} stake={offer.stake} />

            <ConfirmationModal
                visible={confirmUnlockVisible}
                headerText='Unlock ticket'
                text={'Are you sure you want to unlock this ticket with ' + offer.price + ' credits?'} 
                onCancel={() => setConfirmUnlockVisible(false)}
                onConfirm={unlock}
                headerErrorText='Error'
                errorText='Failed to unlock ticket.'
                confirmLabel='Unlock'
                confirmButtonColor={[COLORS.accent2, COLORS.accent, COLORS.accent, COLORS.accent2]}
                confirmButtonTextColor={COLORS.black}
            />
        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef
})

export default connect(mapStateToProps, { unlockTicket })(LockedTicket)