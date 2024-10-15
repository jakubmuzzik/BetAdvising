import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { SPACING, FONTS, FONT_SIZES, COLORS } from '../../../constants'
import { Button } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import HoverableView from '../../../components/elements/HoverableView'

import NameEditor from './NameEditor'
import MobileVerificationModal from '../../../components/modal/MobileVerificationModal'

const PersonalInformation = ({ toastRef, currentUser, updateCurrentUserInRedux }) => {
    const [nameEditorVisible, setNameEditorVisible] = useState(false)
    const [mobileModalVisible, setMobileModalVisible] = useState(false)

    const onNameEditPress = () => {
        setNameEditorVisible(true)
    }

    const onPhoneEditPress = () => {
        setMobileModalVisible(true)
    }

    const renderContactInformation = () => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text numberOfLines={1} style={styles.sectionHeaderText}>
                    Kontaktní informace
                </Text>
            </View>

            <View style={[styles.row, { borderTopWidth: 1, borderColor: COLORS.whiteBackground2 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="badge-account-outline" size={FONT_SIZES.medium} color="white" style={{ marginRight: SPACING.xxx_small }} />
                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: '#FFF', marginRight: SPACING.x_small }}>
                        Jméno
                    </Text>
                </View>
                <HoverableView
                    style={{
                        flexShrink: 1
                    }}
                    hoveredOpacity={0.7}
                >
                    <TouchableOpacity
                        onPress={onNameEditPress}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: SPACING.xx_small,
                            flexShrink: 1
                        }}
                    >
                        <Text numberOfLines={1} style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.medium, color: currentUser.name ? COLORS.white : COLORS.error }}>
                            {currentUser.name}
                        </Text>
                        <MaterialCommunityIcons name="pencil" size={13} color={COLORS.accent} />
                    </TouchableOpacity>
                </HoverableView>
            </View>
            <View style={styles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="phone-outline" size={FONT_SIZES.medium} color="white" style={{ marginRight: SPACING.xxx_small }} />
                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: '#FFF', marginRight: SPACING.x_small }}>
                        Telefonní číslo
                    </Text>
                </View>
                <HoverableView
                    style={{
                        flexShrink: 1
                    }}
                    hoveredOpacity={0.7}
                >
                    <TouchableOpacity
                        onPress={onPhoneEditPress}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: SPACING.xx_small,
                            flexShrink: 1
                        }}
                    >
                        <Text numberOfLines={1} style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.medium, color: currentUser.name ? COLORS.white : COLORS.error }}>
                            {currentUser.phone ? '+' + currentUser.phone : ''}
                        </Text>
                        <MaterialCommunityIcons name="pencil" size={13} color={COLORS.accent} />
                    </TouchableOpacity>
                </HoverableView>
            </View>

            <View style={styles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="email-outline" size={FONT_SIZES.medium} color="white" style={{ marginRight: SPACING.xxx_small }} />
                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: '#FFF', marginRight: SPACING.x_small }}>
                        Email
                    </Text>
                </View>
                <Text numberOfLines={1} style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.medium, color: currentUser.name ? COLORS.white : COLORS.error }}>
                    {currentUser.email}
                </Text>
            </View>
        </View>
    )

    return (
        <View>
            {renderContactInformation()}

            <NameEditor visible={nameEditorVisible} setVisible={setNameEditorVisible} toastRef={toastRef} name={currentUser.name} userId={currentUser.id} updateCurrentUserInRedux={updateCurrentUserInRedux} />
            <MobileVerificationModal visible={mobileModalVisible} setVisible={setMobileModalVisible} headerLabel='Změnit telefonní číslo'/>
        </View>
    )
}

export default PersonalInformation

const styles = StyleSheet.create({
    section: {
        padding: SPACING.small,
        borderRadius: 10,
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: COLORS.whiteBackground2
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.large
    },
    sectionHeaderText: {
        color: COLORS.white,
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.h3
    },
    column: {
        padding: SPACING.xx_small
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.small,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.whiteBackground2
    }
})