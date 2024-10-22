import React, { useState, useCallback, useRef, useMemo, memo, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { SPACING, FONTS, FONT_SIZES, COLORS, SMALL_SCREEN_THRESHOLD } from '../../../constants'
import { Button } from 'react-native-paper'
import { MaterialCommunityIcons, Octicons, EvilIcons } from '@expo/vector-icons'

import { connect } from 'react-redux'
import CustomButton from '../../../components/elements/CustomButton'
import HoverableView from '../../../components/elements/HoverableView'

import DeleteAccount from './DeleteAccount'
import MobileVerificationModal from '../../../components/modal/MobileVerificationModal'

const AccountSettings = ({ toastRef, currentUser, isVerified, updateCurrentUserInRedux }) => {
    const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false)
    const [mobileModalVisible, setMobileModalVisible] = useState(false)

    const onEditPress = () => {
        if (isVerified) return
        
        setMobileModalVisible(true)
    }

    const onDeleteAccountPress = () => {
        setDeleteAccountModalVisible(true)
    }

    return (
        <View>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text numberOfLines={1} style={styles.sectionHeaderText}>
                        Účet
                    </Text>
                </View>

                <View style={[styles.row, { borderTopWidth: 1, borderColor: COLORS.whiteBackground2 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="account-check-outline" size={FONT_SIZES.medium} color="white" style={{ marginRight: SPACING.xxx_small }} />
                        <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: '#FFF', marginRight: SPACING.x_small }}>
                            Stav účtu
                        </Text>
                    </View>

                    <HoverableView
                        style={{
                            flexShrink: 1
                        }}
                        hoveredOpacity={isVerified ? 1 : 0.7}
                    >
                        <TouchableOpacity
                            activeOpacity={isVerified ? 1 : 0.7}
                            onPress={onEditPress}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: SPACING.xx_small,
                                flexShrink: 1,
                                alignItems: 'center',
                                cursor: isVerified ? 'default' : 'pointer'
                            }}
                        >
                            <Octicons name="dot-fill" size={20} color={!isVerified ? 'yellow' : 'green'} />
                            <Text style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.medium, color: '#FFF' }}>
                                {!isVerified ? 'Neověřený' : 'Ověřený'}
                            </Text>
                        </TouchableOpacity>
                    </HoverableView>
                </View>

                <View style={[styles.row, { borderTopWidth: 1, borderColor: COLORS.whiteBackground2 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="delete-outline" size={FONT_SIZES.medium} color="white" style={{ marginRight: SPACING.xxx_small }} />
                        <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: '#FFF', marginRight: SPACING.x_small }}>
                            Smazat účet
                        </Text>
                    </View>

                    <HoverableView
                        style={{
                            flexShrink: 1
                        }}
                        hoveredOpacity={0.7}
                    >
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={onDeleteAccountPress}
                            style={{
                                padding: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50,
                                backgroundColor: '#FF000020'
                            }}
                        >
                            <MaterialCommunityIcons name="delete-outline" size={15} color='red' />
                        </TouchableOpacity>
                    </HoverableView>
                </View>
            </View>

            <DeleteAccount visible={deleteAccountModalVisible} setVisible={setDeleteAccountModalVisible} toastRef={toastRef} />
            <MobileVerificationModal visible={mobileModalVisible} setVisible={setMobileModalVisible} />
        </View>
    )
}

export default AccountSettings

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
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.whiteBackground2
    }
})