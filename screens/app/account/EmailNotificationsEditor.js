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

import { supabase } from '../../../supabase/config'

const EmailNotificationsEditor = ({ visible, setVisible, emailNotificationsEnabled, toastRef, userId, updateCurrentUserInRedux }) => {
    const [changedEmailNotificationsEnabled, setChangedEmailNotificationsEnabled] = useState(emailNotificationsEnabled)

    const modalRef = useRef()

    useEffect(() => {
        if (visible) {
            setChangedEmailNotificationsEnabled(emailNotificationsEnabled)
        }
    }, [visible])

    const onSavePress = async () => {
        await supabase
            .from('users')
            .update({
                email_notifications_enabled: changedEmailNotificationsEnabled
            })
            .eq('id', userId)
            .throwOnError()

        modalRef.current?.closeModal()

        toastRef.show({
            type: 'success',
            text: 'Nastavení notifikací bylo úspěšně změněno.'
        })

        updateCurrentUserInRedux({ email_notifications_enabled: changedEmailNotificationsEnabled })
    }

    return (
        <CustomModal
            ref={modalRef}
            visible={visible}
            setVisible={setVisible}
            handleSave={onSavePress}
            headerLabel='Upravit notifikace'
            errorText='Nepodařilo se uložit změny.'
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
                Upravit notifikace
            </Text>

            <View style={{ marginHorizontal: SPACING.small }}>
                <BouncyCheckbox
                    disableBuiltInState
                    isChecked={changedEmailNotificationsEnabled}
                    size={20}
                    fillColor={COLORS.accent}
                    unfillColor={COLORS.primary}
                    text="Notifikace o nových tipech"
                    iconStyle={{ borderRadius: 3 }}
                    innerIconStyle={{ borderWidth: 2, borderRadius: 3 }}
                    textStyle={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large, textDecorationLine: "none" }}
                    textContainerStyle={{ flexShrink: 1 }}
                    onPress={() => setChangedEmailNotificationsEnabled((d) => (!d))}
                />
            </View>
        </CustomModal>
    )
}

export default EmailNotificationsEditor