import React, { useState, useCallback, useRef, useMemo, memo, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { SPACING, FONTS, FONT_SIZES, COLORS, SMALL_SCREEN_THRESHOLD } from '../../../constants'
import { Button } from 'react-native-paper'
import { MaterialCommunityIcons, FontAwesome5, EvilIcons } from '@expo/vector-icons'

import { connect } from 'react-redux'
import CustomButton from '../../../components/elements/CustomButton'
import HoverableView from '../../../components/elements/HoverableView'

import NameEditor from './NameEditor'

const PersonalInformation = ({ toastRef, currentUser, updateCurrentUserInRedux }) => {
    const { width } = useWindowDimensions()
    const isSmallScreen = width <= SMALL_SCREEN_THRESHOLD

    const [nameEditorVisible, setNameEditorVisible] = useState(false)

    const onNameEditPress = () => {
        setNameEditorVisible(true)
    }

    const onPhoneEditPress = () => {
        console.log('edit phone')
    }

    const renderContactInformation = () => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text numberOfLines={1} style={styles.sectionHeaderText}>
                    Kontaktní informace
                </Text>

                {/* <TouchableOpacity
                        onPress={onContactInformationEditPress}
                    >
                        <HoverableView
                            style={{
                                alignItems: 'center',
                                borderRadius: 10,
                                flexDirection: 'row',
                                paddingHorizontal: SPACING.x_small,
                                borderWidth: 1,
                                borderColor: COLORS.whiteBackground3
                            }}
                            hoveredBackgroundColor={'rgba(255,255,255,0.03)'}
                            withCustomButtonHeight
                        >
                            <MaterialCommunityIcons style={{ marginRight: 4 }} name="pencil" size={14} color={COLORS.white} />
                            <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.white }}>
                                Upravit
                            </Text>
                        </HoverableView>
                    </TouchableOpacity> */}

                {/* <CustomButton
                    onPress={onContactInformationEditPress}
                    textColor={COLORS.white}
                    buttonText='Upravit'
                    textStyles={{ fontFamily: FONTS.medium }}
                    icon={<MaterialCommunityIcons style={{ marginRight: 10 }} name="pencil" size={14} color={COLORS.white} />}
                    additionalStyles={{ borderWidth: 1, borderColor: COLORS.whiteBackground3, paddingHorizontal: SPACING.x_small }}
                    hoveredBackgroundColor={COLORS.whiteBackground}
                /> */}

                {/* <Button
                    labelStyle={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.medium, color: '#FFF' }}
                    mode="outlined"
                    icon="pencil-outline"
                    onPress={onContactInformationEditPress}
                    rippleColor={COLORS.whiteBackground}
                >
                    Edit
                </Button> */}
            </View>

            <View style={[styles.row, { borderTopWidth: 1, borderColor: COLORS.whiteBackground2 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="badge-account-outline" size={FONT_SIZES.medium} color="white" style={{ marginRight: SPACING.xxx_small }} />
                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: '#FFF', marginRight: SPACING.x_small }}>
                        Jméno
                    </Text>
                </View>
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
                    <MaterialCommunityIcons name="pencil" size={13} color={COLORS.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="phone-outline" size={FONT_SIZES.medium} color="white" style={{ marginRight: SPACING.xxx_small }} />
                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: '#FFF', marginRight: SPACING.x_small }}>
                        Telefonní číslo
                    </Text>
                </View>
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
                        {currentUser.phone}
                    </Text>
                    <MaterialCommunityIcons name="pencil" size={13} color={COLORS.white} />
                </TouchableOpacity>
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