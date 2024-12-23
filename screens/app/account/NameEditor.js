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

import { supabase } from '../../../supabase/config'

const NameEditor = ({ visible, setVisible, name, toastRef, userId, updateCurrentUserInRedux }) => {
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [changedName, setChangedName] = useState(name)

    const modalRef = useRef()

    useEffect(() => {
        if (visible) {
            setChangedName(name)
        }
    }, [visible])

    const onSavePress = async () => {
        if (!changedName) {
            setShowErrorMessage(true)
            return
        }

        setShowErrorMessage(false)

        await supabase
            .from('users')
            .update({
                name: changedName
            })
            .eq('id', userId)
            .throwOnError()

        modalRef.current?.closeModal()

        toastRef.show({
            type: 'success',
            text: 'Jméno bylo úspěšně změněno.'
        })

        updateCurrentUserInRedux({ name: changedName })
    }

    return (
        <CustomModal
            ref={modalRef}
            visible={visible}
            setVisible={setVisible}
            handleSave={onSavePress}
            headerLabel='Upravit jméno'
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
                Upravit jméno
            </Text>

            <View style={{ marginHorizontal: SPACING.small }}>
                <CustomInput
                    placeholder='Jakub Novák'
                    label='Jméno'
                    value={changedName}
                    onChangeText={setChangedName}
                    errorMessage={showErrorMessage && !changedName ? 'Zadejte své jméno' : undefined}
                    onSubmitEditing={onSavePress}
                />
            </View>
        </CustomModal>
    )
}

export default NameEditor