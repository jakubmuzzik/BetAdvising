import React, { useMemo, useState, useRef, useEffect, memo } from 'react'
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View, Text, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native'
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    FadeInDown,
    FadeOut,
    FadeOutDown
} from 'react-native-reanimated'
import { Ionicons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import HoverableView from '../elements/HoverableView'
import { normalize } from '../../utils'
import {
    COLORS,
    FONTS,
    FONT_SIZES,
    SPACING
} from '../../constants'
import { TouchableRipple, Button, HelperText } from 'react-native-paper'
import { TabView } from 'react-native-tab-view'
import { BlurView } from 'expo-blur'
import CustomInput from '../elements/CustomInput'
import CustomButton from '../elements/CustomButton'
import { useAnimatedShake } from '../hooks/useAnimatedShake'
import Toast from '../Toast'
import { supabase } from '../../supabase/config'
import { Image } from 'expo-image'
import LottieView from 'lottie-react-native'
import { connect } from 'react-redux'

const window = Dimensions.get('window')

const PhoneInputPrefix = () => (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }}
    >
        <Image
            contentFit='contain'
            source={require('../../assets/flags/cz.png')}
            style={{
                width: 18,
                aspectRatio: 2560 / 1707
            }}
        />
        <Text
            style={{
                fontFamily: FONTS.medium,
                fontSize: FONT_SIZES.medium,
                color: COLORS.white
            }}
        >
            +420
        </Text>
    </View>
)


const MobileVerificationModal = ({ visible, setVisible, toastRef, headerLabel='Ověření profilu' }) => {
    const [routes] = useState([
        { key: '1' },
        { key: '2' }
    ])

    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [showErrorMessages, setShowErrorMessages] = useState(false)
    const [index, setIndex] = useState(0)

    const continueButtonRef = useRef()
    const verifyButtonRef = useRef()
    const resendButtonRef = useRef()

    const modalToastRef = useRef()

    useEffect(() => {
        if (visible) {
            translateY.value = withTiming(0)
        } else {
            translateY.value = withTiming(window.height)
        }
    }, [visible])

    const { shake: shakeContinueButton, rStyle: rStyleContinueButton } = useAnimatedShake()
    const { shake: shakeVerifyButton, rStyle: verifyRStyle } = useAnimatedShake()

    const scrollY1 = useSharedValue(0)
    const scrollY2 = useSharedValue(0)

    const scrollHandler1 = useAnimatedScrollHandler((event) => {
        scrollY1.value = event.contentOffset.y
    })
    const scrollHandler2 = useAnimatedScrollHandler((event) => {
        scrollY2.value = event.contentOffset.y
    })

    const translateY = useSharedValue(window.height)

    const modalHeaderTextStyles1 = useAnimatedStyle(() => {
        return {
            fontFamily: FONTS.medium,
            fontSize: FONT_SIZES.large,
            opacity: interpolate(scrollY1.value, [0, 30, 50], [0, 0.8, 1], Extrapolation.CLAMP),
            color: COLORS.white
        }
    })
    const modalHeaderTextStyles2 = useAnimatedStyle(() => {
        return {
            fontFamily: FONTS.medium,
            fontSize: FONT_SIZES.large,
            opacity: interpolate(scrollY2.value, [0, 30, 50], [0, 0.8, 1], Extrapolation.CLAMP),
            color: COLORS.white
        }
    })

    const closeModal = () => {
        translateY.value = withTiming(window.height)
        setVisible(false)
        setShowErrorMessages(false)
        setIndex(0)
        setPhone('')
        setOtp('')
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

    const onContinuePress = async () => {
        if (!phone) {
            shakeContinueButton()
            setShowErrorMessages(true)
            return
        }

        setShowErrorMessages(false)

        continueButtonRef.current.setIsLoading(true)
        try {
            const { data: userCount, error: countError } = await supabase.rpc('count_users_by_phone', { p_phone: phone })

            if (countError) throw countError

            if (userCount > 0) {
                modalToastRef.current.show({
                    type: 'warning',
                    text: 'Toto telefonní číslo už bylo použito. Zadejte prosím jiné.'
                })
                shakeContinueButton()
                return
            }

            const { error } = await supabase.auth.updateUser({ phone: '+420' + phone })

            if (error) throw error

        } catch (e) {
            console.error(e)

            if (e.message?.includes('A user with this phone number has already been registered')) {
                modalToastRef.current.show({
                    type: 'warning',
                    text: 'Toto telefonní číslo už bylo použito. Zadejte prosím jiné.'
                })
            } else {
                modalToastRef.current.show({
                    type: 'error',
                    text: 'Nepodařilo se odeslat ověřovací kód. Zkuste to prosím znovu.'
                })
            }

            shakeContinueButton()
            return
        } finally {
            continueButtonRef.current.setIsLoading(false)
        }

        setIndex(1)
    }

    const onVerifyPress = async () => {
        if (!otp) {
            shakeVerifyButton()
            setShowErrorMessages(true)
            return
        }

        setShowErrorMessages(false)

        verifyButtonRef.current.setIsLoading(true)
        try {

            const { error } = await supabase.auth.verifyOtp({ phone: '+420' + phone, type: 'phone_change', token: otp })

            if (error) throw error

            toastRef?.show({
                type: 'success',
                text: 'Telefonní číslo bylo uloženo.'
            })

            closeModal()
        } catch (e) {
            console.error(e)
            modalToastRef.current.show({
                type: 'error',
                text: 'Nepodařilo se ověřit kód. Zkuste to prosím znovu.'
            })
            shakeVerifyButton()
            return
        } finally {
            verifyButtonRef.current.setIsLoading(false)
        }
    }

    const onResendPress = async () => {
        try {
            resendButtonRef.current.setIsLoading(true)
            
            const { error } = await supabase.auth.updateUser({ phone: '+420' + phone })

            if (error) {
                throw error
            }

            modalToastRef.current?.show({
                type: 'success',
                text: 'Ověřovací kód byl znovu odeslán.'
            })
        } catch (error) {
            console.error(error)
            modalToastRef.current?.show({
                type: 'error',
                text: error.message ?? 'Something went wrong. Please try again later.'
            })
        } finally {
            resendButtonRef.current.setIsLoading(false)
        }
    }

    const renderEnterPhoneNumber = () => {
        return (
            <>
                <View style={styles.modal__header}>
                    <View style={{ flexBasis: 50, flexGrow: 1, flexShrink: 0 }}></View>
                    <View style={{ flexShrink: 1, flexGrow: 0 }}>
                        <Animated.Text style={modalHeaderTextStyles1}>{headerLabel}</Animated.Text>
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
                <Animated.View style={[styles.modal__shadowHeader, modalHeaderTextStyles1]} />

                <Animated.ScrollView
                    scrollEventThrottle={1}
                    onScroll={scrollHandler1}
                    style={{
                        flex: 1,
                        zIndex: 1
                    }}
                    contentContainerStyle={{
                        paddingBottom: SPACING.small,
                        paddingHorizontal: SPACING.small
                    }}
                >
                    <Text style={{ color: COLORS.white, fontFamily: FONTS.medium, fontSize: FONT_SIZES.h2, marginTop: SPACING.xxxxx_large, }}>
                        {headerLabel}
                    </Text>

                    <Text style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.grey400,
                        paddingTop: SPACING.x_large,
                        marginBottom: SPACING.x_large / 2,

                    }}
                    >
                        Zadejte své telefonní číslo pro obdržení ověřovacího kódu.
                    </Text>

                    <CustomInput
                        prefix={<PhoneInputPrefix />}
                        placeholder='777666555'
                        label='Telefonní číslo'
                        keyboardType='numeric'
                        value={phone}
                        onChangeText={(val) => setPhone(val.replace(/[^0-9]/g, ''))}
                        containerStyle={{ width: '100%' }}
                        onSubmitEditing={onContinuePress}
                        errorMessage={(showErrorMessages && !phone) ? 'Zadejte telefonní číslo' : undefined}
                    />

                    <Animated.View
                        style={rStyleContinueButton}
                    >
                        <CustomButton
                            ref={continueButtonRef}
                            onPress={onContinuePress}
                            additionalStyles={{ borderWidth: 1, borderColor: COLORS.accentSecondaryBorder, marginTop: SPACING.x_small, width: '100%' }}
                            textColor={COLORS.accent}
                            backgroundColors={COLORS.accentSecondary}
                            hoveredBackgroundColor={COLORS.accentHoveredSecondary}
                            spinnerColor={COLORS.white}
                            buttonText='Získat kód'
                            textStyles={{ fontFamily: FONTS.medium }}
                            disabled={phone.length !== 9}
                        />
                    </Animated.View>

                </Animated.ScrollView>
            </>
        )
    }

    const renderVerifyOTP = () => {
        return (
            <>
                <View style={styles.modal__header}>
                    <View style={{ flexBasis: 50, flexGrow: 1, flexShrink: 0 }}>
                        <TouchableOpacity
                            onPress={() => setIndex(0)}
                        >
                            <HoverableView
                                style={{
                                    marginLeft: SPACING.small,
                                    width: SPACING.x_large,
                                    height: SPACING.x_large,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 17.5
                                }}
                                hoveredBackgroundColor={COLORS.whiteBackground2}
                                backgroundColor={COLORS.whiteBackground}
                            >
                                <Ionicons name="arrow-back" size={20} color={COLORS.white} />
                            </HoverableView>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexShrink: 1, flexGrow: 0 }}>
                        <Animated.Text style={modalHeaderTextStyles2}>Zadejte kód</Animated.Text>
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
                <Animated.View style={[styles.modal__shadowHeader, modalHeaderTextStyles2]} />

                <Animated.ScrollView
                    scrollEventThrottle={1}
                    onScroll={scrollHandler2}
                    style={{ flex: 1, zIndex: 1 }}
                    contentContainerStyle={{ justifyContent: 'center', paddingBottom: SPACING.small, paddingHorizontal: SPACING.small }}
                >
                    <Text style={{ color: COLORS.white, fontFamily: FONTS.medium, fontSize: FONT_SIZES.h2, marginTop: SPACING.xxxxx_large, textAlign: 'center' }}>
                        Zadejte ověřovací kód
                    </Text>

                    <LottieView
                        style={{ height: 130, alignSelf: 'center', width: 'fit-content', }}
                        autoPlay
                        loop
                        source={require('../../assets/animations/otp.json')}
                    />
                    <Text style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.grey400,
                        paddingTop: SPACING.x_large,
                        textAlign: 'center'
                    }}
                    >
                        Kód byl odeslán na telefonní číslo:
                    </Text>
                    <Text style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.white,
                        paddingTop: 8,
                        textAlign: 'center'
                    }}
                    >
                        +420 {phone.slice(0, 3)} {phone.slice(3, 6)} {phone.slice(6, 9)}
                    </Text>

                    <CustomInput
                        placeholder='xxxxxx'
                        label='Verification code'
                        value={otp}
                        onChangeText={setOtp}
                        containerStyle={{ width: '100%', marginTop: SPACING.large }}
                        errorMessage={showErrorMessages && !otp ? 'Enter the verification code' : undefined}
                        keyboardType='numeric'
                        onSubmitEditing={onVerifyPress}
                    />
                    <Animated.View
                        style={[verifyRStyle, { width: '100%' }]}
                    >
                        <CustomButton ref={verifyButtonRef}
                            onPress={onVerifyPress}
                            additionalStyles={{ borderWidth: 1, borderColor: COLORS.accentSecondaryBorder, marginTop: SPACING.medium, width: '100%' }}
                            textColor={COLORS.accent}
                            backgroundColors={COLORS.accentSecondary}
                            spinnerColor={COLORS.white}
                            buttonText='Ověřit'
                            textStyles={{ fontFamily: FONTS.medium }}
                            disabled={otp.length !== 6}
                        />
                    </Animated.View>

                    <CustomButton ref={resendButtonRef}
                        onPress={onResendPress}
                        additionalStyles={{ borderWidth: 1, borderColor: COLORS.whiteBackground2, marginTop: SPACING.xx_small, width: '100%' }}
                        textColor={COLORS.white}
                        backgroundColors={COLORS.secondary2}
                        buttonText='Odeslat kód znovu'
                        textStyles={{ fontFamily: FONTS.medium }}
                        spinnerColor={COLORS.white}
                    />
                </Animated.ScrollView>
            </>
        )
    }

    const renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return renderEnterPhoneNumber()
            case '2':
                return renderVerifyOTP()
        }
    }

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
                    <TabView
                        renderTabBar={props => null}
                        swipeEnabled={false}
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                    //initialLayout={{ width: contentWidth }}
                    />
                </Animated.View>
            </BlurView>

            <Toast ref={modalToastRef} />
        </Modal>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef
})

export default connect(mapStateToProps)(MobileVerificationModal)

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