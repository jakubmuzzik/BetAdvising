import React, { useState, useRef, useEffect } from 'react'
import { View, Text } from 'react-native'
import {
    COLORS,
    FONTS,
    FONT_SIZES,
    SPACING
} from '../../../constants'
import CustomInput from '../../../components/elements/CustomInput'
import CustomModal from '../../../components/modal/CustomModal'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated'

import { supabase } from '../../../supabase/config'

const DeleteAccount = ({ visible, setVisible, toastRef }) => {
    const [deleteChecked, setDeleteChecked] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const modalRef = useRef()

    useEffect(() => {
        if (visible) {
            setDeleteChecked(false)
            setShowErrorMessage(false)
        }
    }, [visible])

    const deleteAccount = async () => {
        if (!deleteChecked) {
            setShowErrorMessage(true)
            return
        }

        const { error } = await supabase.functions.invoke('delete-user', {})

        if (error) throw error

        await supabase.auth.refreshSession()

        toastRef?.show({
            type: 'success',
            text: 'Váš účet byl úspěšně smazán.'
        })

        modalRef.current?.closeModal()
    }

    return (
        <CustomModal
            ref={modalRef}
            visible={visible}
            setVisible={setVisible}
            handleSave={deleteAccount}
            headerLabel='Smazat účet'
            errorText='Nepodařilo se smazat účet.'
            saveLabel='Smazat'
        >
            <Text style={{
                color: COLORS.white,
                fontFamily: FONTS.medium,
                fontSize: FONT_SIZES.h2,
                marginTop: SPACING.xxxxx_large,
                marginHorizontal: SPACING.small,
                marginBottom: SPACING.large
            }}
            >
                Smazat účet
            </Text>

            <View style={{ marginHorizontal: SPACING.small }}>
                <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.grey300 }}>
                    •  Všechny vaše data včetně zakoupených kreditů budou smazány
                </Text>

                <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, marginTop: SPACING.x_small, color: COLORS.grey300 }}>
                    •  Tato akce je nevratná
                </Text>

                <BouncyCheckbox
                    style={{ marginTop: SPACING.medium }}
                    disableBuiltInState
                    isChecked={deleteChecked}
                    size={20}
                    fillColor={'red'}
                    unfillColor="#FFFFFF"
                    text="Rozumím a chci smazat svůj účet a všechna jeho data."
                    iconStyle={{ borderRadius: 3 }}
                    innerIconStyle={{ borderWidth: 2, borderRadius: 3 }}
                    textStyle={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, textDecorationLine: "none", color: COLORS.white }}
                    onPress={() => setDeleteChecked((d) => (!d))}
                />
                {showErrorMessage && !deleteChecked && <Animated.Text
                    entering={FadeInLeft}
                    exiting={FadeOutLeft}
                    style={{
                        marginTop: SPACING.x_small,
                        fontFamily: FONTS.medium,
                        color: COLORS.error,
                        fontSize: FONT_SIZES.x_small,
                        //paddingTop: SPACING.x_small,
                        alignSelf: 'flex-start'
                    }}
                >
                    Please check the box above to proceed.
                </Animated.Text>}
            </View>
        </CustomModal>
    )
}

export default DeleteAccount