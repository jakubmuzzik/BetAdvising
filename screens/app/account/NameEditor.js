import React, { useMemo, useState, useCallback, useRef, useEffect, memo } from 'react'
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native'
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import HoverableView from '../../../components/elements/HoverableView'
import { normalize } from '../../../utils'
import {
    COLORS,
    FONTS,
    FONT_SIZES,
    SPACING
} from '../../../constants'
import { BlurView } from 'expo-blur'
import CustomButton from '../../../components/elements/CustomButton'
import CustomInput from '../../../components/elements/CustomInput'

import Toast from '../../../components/Toast'

import { supabase } from '../../../supabase/config'

const window = Dimensions.get('window')

const NameEditor = ({ visible, setVisible, name, toastRef, userId, updateCurrentUserInRedux }) => {
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [changedName, setChangedName] = useState(name)

    const modalToastRef = useRef()
    const saveButtonRef = useRef()

    useEffect(() => {
        if (visible) {
            translateY.value = withTiming(0, {
                useNativeDriver: true
            })
            setChangedName(name)
        } else {
            translateY.value = withTiming(window.height, {
                useNativeDriver: true
            })
        }
    }, [visible])


    const scrollY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y
    })

    const translateY = useSharedValue(window.height)

    const modalHeaderTextStyles = useAnimatedStyle(() => {
        return {
            fontFamily: FONTS.medium,
            fontSize: FONT_SIZES.large,
            opacity: interpolate(scrollY.value, [0, 30, 50], [0, 0.8, 1], Extrapolation.CLAMP),
            color: COLORS.white
        }
    })

    const closeModal = () => {
        translateY.value = withTiming(window.height, {
            useNativeDriver: true
        })
        setVisible(false)
    }

    const onSavePress = async () => {
        if (
            !changedName
        ) {
            setShowErrorMessage(true)
            return
        }

        saveButtonRef.current?.setIsLoading(true)
        setShowErrorMessage(false)

        try {
            await supabase
                .from('users')
                .update({
                    name: changedName
                })
                .eq('id', userId)
                .throwOnError()

            closeModal()

            toastRef.show({
                type: 'success',
                text: 'Jméno bylo úspěšně změněno.'
            })

            updateCurrentUserInRedux({ name: changedName })
        } catch (e) {
            console.error(e)
            modalToastRef.current.show({
                type: 'error',
                text: "Failed to save the data. Please try again later."
            })
            saveButtonRef.current?.setIsLoading(false)
        }
    }

    const modalContainerStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: COLORS.secondary,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLORS.whiteBackground2,
            width: 450,
            maxWidth: '90%',
            height: 500,
            maxHeight: '80%',
            overflow: 'hidden',
            transform: [{ translateY: translateY.value }],
            boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.1)'
        }
    })

    return (
        <Modal transparent={true}
            visible={visible}
            animationType="fade"
        >
            <BlurView
                intensity={20}
                tint='dark'
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, cursor: 'default', backgroundColor: 'rgba(0, 0, 0, .2)' }}
                    activeOpacity={1}
                    onPressOut={closeModal}
                />
                <Animated.View style={modalContainerStyles}>
                    <View style={styles.modal__header}>
                        <View style={{ flexBasis: 50, flexGrow: 1, flexShrink: 0 }}></View>
                        <View style={{ flexShrink: 1, flexGrow: 0 }}>
                            <Animated.Text style={modalHeaderTextStyles}>Upravit jméno</Animated.Text>
                        </View>
                        <View style={{ flexBasis: 50, flexGrow: 1, flexShrink: 0, alignItems: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={closeModal}
                            >
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
                                    <Ionicons name="close" size={20} color={COLORS.white} />
                                </HoverableView>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Animated.View style={[styles.modal__shadowHeader, modalHeaderTextStyles]} />

                    <Animated.ScrollView scrollEventThrottle={1} onScroll={scrollHandler} style={{ flex: 1, zIndex: 1 }} contentContainerStyle={{ paddingBottom: SPACING.small }}>
                        <Text style={{
                            color: COLORS.white,
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.h2,
                            marginTop: SPACING.xxxxx_large,
                            marginHorizontal: SPACING.small,
                            marginBottom: SPACING.medium
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
                                containerStyle={{ width: '100%', marginTop: SPACING.xx_small }}
                                errorMessage={showErrorMessage && !changedName ? 'Zadejte své jméno' : undefined}
                                onSubmitEditing={onSavePress}
                            />
                        </View>
                    </Animated.ScrollView>

                    <View style={{ borderTopWidth: 1, borderTopColor: COLORS.whiteBackground2, paddingHorizontal: SPACING.small, paddingVertical: SPACING.x_small, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CustomButton
                            onPress={closeModal}
                            additionalStyles={{ borderWidth: 0, borderColor: COLORS.grey400 }}
                            textColor={COLORS.white}
                            backgroundColors={'rgba(255, 255, 255, 0.04)'}
                            spinnerColor={COLORS.black}
                            buttonText='Zrušit'
                            textStyles={{ fontFamily: FONTS.medium }}
                        />

                        <CustomButton
                            ref={saveButtonRef}
                            onPress={onSavePress}
                            additionalStyles={{ borderWidth: 1, borderColor: COLORS.accentSecondaryBorder }}
                            textColor={COLORS.accent}
                            backgroundColors={COLORS.accentSecondary}
                            spinnerColor={COLORS.white}
                            buttonText='Uložit'
                            textStyles={{ fontFamily: FONTS.medium }}
                        />
                    </View>
                </Animated.View>
            </BlurView>

            <Toast ref={modalToastRef} />
        </Modal>
    )
}

export default NameEditor

const styles = StyleSheet.create({
    modal__header: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: normalize(55),
        backgroundColor: COLORS.secondary,
        zIndex: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modal__shadowHeader: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: normalize(55),
        backgroundColor: '#FFF',
        zIndex: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5
    }
})