import React, { useState, useCallback, useRef, useMemo, memo, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { SPACING, FONTS, FONT_SIZES, COLORS, SMALL_SCREEN_THRESHOLD } from '../../../constants'
import { Button } from 'react-native-paper'
import { MaterialCommunityIcons, FontAwesome5, EvilIcons } from '@expo/vector-icons'

import { connect } from 'react-redux'

const PersonalInformation = ({ setTabHeight, toastRef, userData={}, currentAuthUser }) => {
    const { width } = useWindowDimensions()
    const isSmallScreen = width <= SMALL_SCREEN_THRESHOLD

    const contactInformation = useMemo(() => ({
        phone: userData.phone,
        name: userData.name,
        viber: userData.viber,
        whatsapp: userData.whatsapp,
        telegram: userData.telegram,
        website: userData.website
    }), [userData.phone, userData.name, userData.viber, userData.whatsapp, userData.telegram, userData.website])

    const onContactInformationEditPress = () => {
        setContactInformationEditorVisible(true)
    }

    const renderContactInformation = () => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text numberOfLines={1} style={styles.sectionHeaderText}>
                    Contact information
                </Text>
                <Button
                    labelStyle={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.medium, color: '#FFF' }}
                    mode="outlined"
                    icon="pencil-outline"
                    onPress={onContactInformationEditPress}
                    rippleColor={COLORS.whiteBackground}
                >
                    Edit
                </Button>
            </View>

            <View style={[styles.row, { borderTopWidth: 1, borderColor: COLORS.whiteBackground2 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="badge-account-outline" size={FONT_SIZES.medium} color="white" style={{ marginRight: SPACING.xxx_small }} />
                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: '#FFF', marginRight: SPACING.x_small }}>
                        Name
                    </Text>
                </View>
                <Text numberOfLines={1} style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.medium, color: userData.name ? COLORS.white : COLORS.error }}>
                    {userData.name ? userData.name : 'Enter your name'}
                </Text>
            </View>
            <View style={styles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="phone-outline" size={FONT_SIZES.medium} color="white" style={{ marginRight: SPACING.xxx_small }} />
                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: '#FFF', marginRight: SPACING.x_small }}>
                        Phone
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 1 }}>
                    <Text numberOfLines={1} style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.medium, color: COLORS.white }}>
                        {userData.phone ? userData.phone : ''}
                    </Text>
                    {userData.phone && userData.whatsapp && <View style={{ padding: 5, width: 28, height: 28, backgroundColor: '#108a0c', borderRadius: '50%', marginLeft: SPACING.xxx_small, alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5 name="whatsapp" size={18} color="white" />
                    </View>}
                    {userData.phone && userData.viber && <View style={{ padding: 5, width: 28, height: 28, backgroundColor: '#7d3daf', borderRadius: '50%', marginLeft: SPACING.xxx_small, alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5 name="viber" size={18} color="white" />
                    </View>}
                    {userData.phone && userData.telegram && <View style={{ padding: 5, width: 28, height: 28, backgroundColor: '#38a5e4', borderRadius: 30, marginLeft: SPACING.xxx_small, alignItems: 'center', justifyContent: 'center' }}>
                        <EvilIcons name="sc-telegram" size={22} color="white" />
                    </View>}
                </View>
            </View>
        </View>
    )

    return (
        <View onLayout={(event) => setTabHeight(event.nativeEvent.layout.height)}>
            {renderContactInformation()}

            {/* <ContactInformationEditor visible={contactInformationEditorVisible} setVisible={setContactInformationEditorVisible} contactInformation={contactInformation} toastRef={toastRef} userId={userData.id} currentUserId={currentAuthUser.id} updateRedux={getUpdateReduxFunction()} user_type={user_type} /> */}
        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef,
    currentAuthUser: store.userState.currentAuthUser
})

export default connect(mapStateToProps)(memo(PersonalInformation))

const styles = StyleSheet.create({
    section: {
        marginTop: SPACING.large,
        padding: SPACING.small,
        borderRadius: 10,
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: COLORS.whiteBackground2
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.small
    },
    sectionHeaderText: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
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