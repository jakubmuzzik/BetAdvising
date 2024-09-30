import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../constants'
import { normalize } from '../utils'
import { Ionicons } from '@expo/vector-icons'
import { MotiView } from 'moti'

import MobileVerificationModal from './modal/MobileVerificationModal'
import HoverableView from './elements/HoverableView'
import CustomButton from './elements/CustomButton'

const VerifyAccountBanner = () => {
    const [modalVisible, setModalVisible] = useState(false)

    const onVerifyPress = () => {
        setModalVisible(true)
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
                    marginHorizontal: SPACING.medium,
                    paddingHorizontal: SPACING.small,
                    paddingVertical: SPACING.x_small,
                    borderRadius: 10,
                    backgroundColor: COLORS.darkGrey,
                    borderWidth: 1,
                    borderColor: COLORS.accent,
                    marginTop: SPACING.x_small,
                    marginBottom: SPACING.medium,
                    backgroundColor: COLORS.accent + '10'
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="information-circle-outline" size={20} color={COLORS.accent} style={{ marginRight: SPACING.xx_small }} />

                    <View style={{ flexShrink: 1 }}>
                        <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large, color: '#FFF' }}>
                            Získej 100 kreditů zdarma
                        </Text>
                        <Text style={{ fontFamily: FONTS.regular, fontSize: FONT_SIZES.medium, color: COLORS.grey300, marginTop: SPACING.xx_small }}>
                            Ověř svůj profil pomocí telefonního čísla a získej 100 kreditů na odemykání tiketů.
                        </Text>

                        <CustomButton
                            onPress={onVerifyPress}
                            additionalStyles={{ borderWidth: 0, borderColor: COLORS.whiteBackground2, marginTop: SPACING.x_small, width: 'fit-content' }}
                            textColor={COLORS.black}
                            backgroundColors={COLORS.white}
                            spinnerColor={COLORS.black}
                            buttonText='Ověřit profil'
                            textStyles={{ fontFamily: FONTS.medium }}
                        />
                    </View>
                </View>
            </MotiView>

            <MobileVerificationModal visible={modalVisible} setVisible={setModalVisible} />
        </>
    )
}

export default VerifyAccountBanner