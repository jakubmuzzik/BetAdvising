import React, { useState, memo, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal, Text } from 'react-native'
import {isBrowser } from 'react-device-detect'
import Toast from '../Toast'
import { BlurView } from 'expo-blur'
import { MotiView } from 'moti'
import { normalize } from '../../utils'
import { FONTS, FONT_SIZES, COLORS, SPACING } from '../../constants'
import HoverableView from '../elements/HoverableView'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import CustomButton from '../elements/CustomButton'

const ConfirmationModal = ({ 
    visible,
    icon, 
    headerText, 
    text, 
    confirmButtonColor,
    confirmButtonTextColor=COLORS.white,
    onCancel, 
    onConfirm,
    cancelLabel='Cancel',
    confirmLabel='Delete',
    width=normalize(500),
    errorText='There was an error.',
    headerErrorText='Error'
}) => {
    const modalToastRef = useRef()
    const confirmButtonRef = useRef()

    const closeModal = () => {
        onCancel()
        confirmButtonRef.current?.setIsLoading(false)
    }

    const onConfirmPress = async () => {
        confirmButtonRef.current.setIsLoading(true)

        try {
            await onConfirm()
            closeModal()
        } catch(error) {
            modalToastRef.current?.show({
                type: 'error',
                text: errorText,
                headerText: headerErrorText
            })
            console.error('confirm modal error: ', error)
            confirmButtonRef.current.setIsLoading(false)
        }
    }

    const Content = () => (
        <>
            <View style={styles.modal__header}>
                <View style={{ flexBasis: 50, flexGrow: 1, flexShrink: 0 }}></View>
                <View style={{ flexShrink: 1, flexGrow: 0 }}>
                    <Text style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.large, textAlign: 'center', color: COLORS.white }}>{headerText}</Text>
                </View>
                <View style={{ flexBasis: 50, flexGrow: 1, flexShrink: 0, alignItems: 'flex-end' }}>
                    <HoverableView
                        style={{
                            marginRight: SPACING.small,
                            width: SPACING.x_large,
                            height: SPACING.x_large,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 17.5
                        }}
                        hoveredBackgroundColor={COLORS.whiteBackground2}
                        backgroundColor={COLORS.whiteBackground}
                    >
                        <Ionicons onPress={closeModal} name="close" size={normalize(25)} color="white" />
                    </HoverableView>
                </View>
            </View>

            <View style={{ paddingHorizontal: SPACING.medium, paddingVertical: SPACING.small, alignItems: 'center', flex: 1 }}>
                <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large, textAlign: 'center', color: COLORS.grey200 }}>
                    {text}
                </Text>
            </View>

            <View style={{ borderTopWidth: .5, borderTopColor: 'grey', paddingHorizontal: SPACING.small, paddingVertical: SPACING.x_small, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <CustomButton
                    onPress={closeModal}
                    textColor={COLORS.white}
                    backgroundColors={COLORS.whiteBackground}
                    buttonText={cancelLabel}
                    textStyles={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.large }}
                />

                <CustomButton
                    ref={confirmButtonRef}
                    onPress={onConfirmPress}
                    textColor={confirmButtonTextColor}
                    backgroundColors={confirmButtonColor}
                    buttonText={confirmLabel}
                    textStyles={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.large }}
                />
            </View>
        </>
    )

    return (
        <Modal transparent visible={visible} animationType='none'>
            <BlurView intensity={20} style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', cursor: 'default' }}
                    activeOpacity={1}
                    onPressOut={closeModal}
                >
                    <MotiView
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', width: '100%' }}
                        from={{
                            opacity: 0,
                            //translateY: -100,
                            //transform: [{ scale: 0.7 }],
                        }}
                        animate={{
                            opacity: 1,
                            //translateY: 0,
                            //transform: [{ scale: 1 }],
                        }}
                        transition={{
                            type: 'timing',
                            duration: 150,
                        }}
                    >
                        <TouchableWithoutFeedback>
                            <View style={{
                                backgroundColor: COLORS.secondary,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: COLORS.whiteBackground2,
                                width,
                                maxWidth: '90%',
                                maxHeight: '80%',
                                overflow: 'hidden',
                            }}>
                                <Content />
                            </View>
                        </TouchableWithoutFeedback>
                    </MotiView>
                </TouchableOpacity>
            </BlurView>

            <Toast ref={modalToastRef} />
        </Modal>
    )
}

export default ConfirmationModal

const styles = StyleSheet.create({
    modal__header: {
        height: normalize(55),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})