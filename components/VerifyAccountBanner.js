import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../constants'
import { normalize } from '../utils'
import { Ionicons } from '@expo/vector-icons'
import { MotiView } from 'moti'

import MobileVerificationModal from './modal/MobileVerificationModal'
import HoverableView from './elements/HoverableView'
import CustomButton from './elements/CustomButton'
import { connect } from 'react-redux'
import { HIDE_VERIFY_BANNER } from '../redux/actionTypes'

const VerifyAccountBanner = ({ containerStyle = {}, dispatch, verifyBannerHidden }) => {
    if (verifyBannerHidden) return null

    const [modalVisible, setModalVisible] = useState(false)

    const onVerifyPress = () => {
        setModalVisible(true)
    }

    const onHideBannerPress = () => {
        dispatch({ type: 'HIDE_VERIFY_BANNER' })
    }

    return (
        <>
            <MotiView
                from={{
                    opacity: 0,
                    transform: [{ translateY: -10 }],
                }}
                animate={{
                    opacity: 1,
                    transform: [{ translateY: 0 }],
                }}
                style={{
                    paddingHorizontal: SPACING.small,
                    paddingVertical: SPACING.x_small,
                    borderRadius: 10,
                    backgroundColor: COLORS.darkGrey,
                    borderWidth: 1,
                    borderColor: COLORS.accentSecondaryBorder,//COLORS.accent + '99',
                    backgroundColor: COLORS.accentSecondary, //COLORS.accent + '14',
                    ...containerStyle
                }}
            >
                <View style={{ flexDirection: 'row', gap: SPACING.xx_small }}>
                    <Ionicons name="information-circle-outline" size={20} color={COLORS.accent} />

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large, color: '#FFF' }}>
                            Získej 100 kreditů zdarma
                        </Text>
                        <Text style={{ fontFamily: FONTS.regular, fontSize: FONT_SIZES.medium, color: COLORS.grey300, marginTop: SPACING.xx_small }}>
                            Ověř svůj profil pomocí telefonního čísla a získej 100 kreditů na odemykání tiketů.
                        </Text>

                        <CustomButton
                            onPress={onVerifyPress}
                            additionalStyles={{ marginTop: SPACING.x_small, width: 'fit-content', borderWidth: 1, borderColor: COLORS.accentSecondaryBorder }}
                            textColor={COLORS.accent}
                            backgroundColors={COLORS.accentSecondary}
                            spinnerColor={COLORS.black}
                            buttonText='Ověřit profil'
                            textStyles={{ fontFamily: FONTS.medium }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={onHideBannerPress}
                    >
                        <HoverableView
                            style={{
                                width: 28,
                                height: 28,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 17.5
                            }}
                            hoveredBackgroundColor={COLORS.whiteBackground2}
                            backgroundColor={COLORS.whiteBackground}
                        >
                            <Ionicons name="close" size={17} color={COLORS.white} />
                        </HoverableView>
                    </TouchableOpacity>
                </View>
            </MotiView>

            <MobileVerificationModal visible={modalVisible} setVisible={setModalVisible} />
        </>
    )
}

const mapStateToProps = (store) => ({
    verifyBannerHidden: store.persistedState.verifyBannerHidden
})

export default connect(mapStateToProps)(VerifyAccountBanner)