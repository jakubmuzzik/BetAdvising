import React, { useState, useCallback, useRef, useMemo, memo, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { SPACING, FONTS, FONT_SIZES, COLORS, SMALL_SCREEN_THRESHOLD } from '../../../constants'
import { Button } from 'react-native-paper'
import { MaterialCommunityIcons, FontAwesome5, EvilIcons } from '@expo/vector-icons'

import { connect } from 'react-redux'
import CustomButton from '../../../components/elements/CustomButton'
import HoverableView from '../../../components/elements/HoverableView'

import EmailNotificationsEditor from './EmailNotificationsEditor'

const EmailNotifications = ({ toastRef, currentUser, updateCurrentUserInRedux }) => {
    const [editorVisible, setEditorVisible] = useState(false)

    const onEditPress = () => {
        setEditorVisible(true)
    }

    return (
        <View>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text numberOfLines={1} style={styles.sectionHeaderText}>
                        Emailové notifikace
                    </Text>

                    {/* <TouchableOpacity
                        onPress={onEditPress}
                    >
                        <HoverableView
                            style={{
                                alignItems: 'center',
                                borderRadius: 10,
                                flexDirection: 'row',
                                paddingHorizontal: SPACING.x_small,
                                borderWidth: 1,
                                borderColor: COLORS.accentSecondaryBorder
                            }}
                            backgroundColor={COLORS.accentSecondary}
                            hoveredBackgroundColor={COLORS.accentHoveredSecondary}
                            withCustomButtonHeight
                        >
                            <MaterialCommunityIcons style={{ marginRight: 4 }} name="pencil" size={14} color={COLORS.accent} />
                            <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.accent }}>
                                Upravit
                            </Text>
                        </HoverableView>
                    </TouchableOpacity> */}
                </View>

                <View style={[styles.row, { borderTopWidth: 1, borderColor: COLORS.whiteBackground2 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="lightning-bolt" size={FONT_SIZES.medium} color="white" style={{ marginRight: SPACING.xxx_small }} />
                        <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: '#FFF', marginRight: SPACING.x_small }}>
                            Notifikace o nových tipech
                        </Text>
                    </View>

                    <HoverableView
                    style={{
                        flexShrink: 1
                    }}
                    hoveredOpacity={0.7}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: SPACING.xx_small,
                            flexShrink: 1
                        }}
                        onPress={onEditPress}
                    >
                    <MaterialCommunityIcons name={currentUser.email_notifications_enabled ? 'checkbox-marked' : 'checkbox-blank-outline'} size={20} color={COLORS.accent} />
                    <View
                            style={{
                                padding: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50,
                                backgroundColor: COLORS.accentSecondaryTransparent
                            }}
                        >
                            <MaterialCommunityIcons name="pencil" size={13} color={COLORS.accent} />
                        </View>
                    </TouchableOpacity>
                </HoverableView>
                </View>
            </View>

            <EmailNotificationsEditor visible={editorVisible} setVisible={setEditorVisible} toastRef={toastRef} emailNotificationsEnabled={currentUser.email_notifications_enabled} userId={currentUser.id} updateCurrentUserInRedux={updateCurrentUserInRedux} />
        </View>
    )
}

export default EmailNotifications

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