import React, { useState, useRef } from 'react'
import { View, Text } from 'react-native'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { COLORS, SPACING, FONTS, FONT_SIZES } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated'
import LottieView from 'lottie-react-native'
import CustomInput from '../../components/elements/CustomInput'
import CustomButton from '../../components/elements/CustomButton'
import { supabase } from '../../supabase/config'
import { connect } from 'react-redux'
import HoverableText from '../../components/elements/HoverableText'
import withSearchParams from '../../components/hoc/withSearchParams'

import { useAnimatedShake } from '../../components/hooks/useAnimatedShake'

const OTP = ({ toastRef, searchParams }) => {
    const location = useLocation()
    const navigate = useNavigate()

    let email = location.state?.email || ''
    let from = location.state?.from || '/tickets'

    const [otp, setOtp] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const continueButtonRef = useRef()
    const resendButtonRef = useRef()

    const { shake, rStyle } = useAnimatedShake()

    const onContinuePress = async () => {
        if (!otp || otp.length !== 6) {
            setShowErrorMessage(true)
            shake()
            return
        }

        continueButtonRef.current.setIsLoading(true)

        try {
            const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email'})

            if (error) {
                throw error
            }

            if (searchParams.language) {
                from += '?language=' + searchParams.language
            }

            navigate(from, {
                replace: true
            })
        } catch(error) {
            console.error(error)

            toastRef?.show({
                text: error.message ?? 'Could not validate the Login Code',
                type: 'error'
            })

            setOtp('')
            shake()
        } finally {
            continueButtonRef.current.setIsLoading(false)
        }
    }

    const onResendPress = async () => {
        try {
            resendButtonRef.current.setIsLoading(true)
            const { error } = await supabase.auth.signInWithOtp({
                email
            })

            if (error) {
                throw error
            }

            toastRef?.show({
                type: 'success',
                text: 'Confimation email has been re-sent.'
            })
        } catch (error) {
            console.error(error)
            toastRef?.show({
                type: 'error',
                text: error.message ?? 'Something went wrong. Please try again later.'
            })
        } finally {
            resendButtonRef.current.setIsLoading(false)
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: SPACING.page_horizontal,
        }}>
            <Animated.View
                entering={FadeInDown}
                layout={LinearTransition}
                style={{
                    //backgroundColor: COLORS.secondary,
                    //padding: SPACING.xx_large,
                    borderColor: COLORS.whiteBackground2,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: 450,
                    maxWidth: '100%',
                    //boxShadow: '0px 0px 10px rgba(251, 193, 13, 0.15)'
                    boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.1)'
                }}
            >
                <LinearGradient
                    style={{
                        padding: SPACING.xx_large,
                        paddingTop: 10,
                        borderRadius: 10,
                        flex: 1,
                        alignItems: 'center',
                    }}
                    colors={[COLORS.secondary, COLORS.primary]}
                    start={{ x: -0.7, y: 0 }}
                >
                    <LottieView
                        style={{ height: 80, width: 'fit-content', marginBottom: SPACING.large }}
                        autoPlay
                        loop
                        source={require('../../assets/animations/mail-verification.json')}
                    />

                    <Text
                        style={{
                            fontSize: FONT_SIZES.x_large,
                            color: COLORS.white,
                            fontFamily: FONTS.medium
                        }}
                    >
                        Check your email
                    </Text>
                    <Text
                        style={{
                            fontSize: FONT_SIZES.medium,
                            color: COLORS.grey400,
                            fontFamily: FONTS.regular,
                            marginTop: SPACING.xx_small
                        }}
                    >
                        We have sent a verification code to {email ? email : 'your email'}
                    </Text>

                    <CustomInput
                        placeholder='xxxxxx'
                        label='Verification code'
                        value={otp}
                        onChangeText={setOtp}
                        containerStyle={{ width: '100%', marginTop: SPACING.x_large }}
                        errorMessage={showErrorMessage  && !otp ? 'Enter the verification code' : undefined}
                        keyboardType='numeric'
                        onSubmitEditing={onContinuePress}
                    />

                    <Animated.View
                        style={[rStyle, { width: '100%' }]}
                    >
                        <CustomButton ref={continueButtonRef}
                            onPress={onContinuePress}
                            additionalStyles={{ borderWidth: 1, borderColor: COLORS.white, marginTop: SPACING.medium, width: '100%' }}
                            textColor={COLORS.black}
                            backgroundColors={COLORS.white}
                            buttonText='Continue'
                            textStyles={{ fontFamily: FONTS.medium }}
                            disabled={otp.length !== 6}
                        />
                    </Animated.View>
                    <CustomButton ref={resendButtonRef}
                        onPress={onResendPress}
                        additionalStyles={{ borderWidth: 1, borderColor: COLORS.whiteBackground2, marginTop: SPACING.xx_small, width: '100%' }}
                        textColor={COLORS.white}
                        backgroundColors={COLORS.secondary2}
                        buttonText='Send code again'
                        textStyles={{ fontFamily: FONTS.medium }}
                        spinnerColor={COLORS.white}
                    />

                    <Link
                        style={{ textDecoration: 'none', marginTop: SPACING.medium, width: 'fit-content' }}
                        to={{ pathname: '/auth', search: new URLSearchParams(searchParams).toString() }}
                    >
                        <HoverableText
                            textStyle={{
                                color: COLORS.grey400,
                                fontFamily: FONTS.medium,
                                fontSize: FONT_SIZES.medium,
                                textAlign: 'center'
                            }}
                            hoveredColor={COLORS.white}
                            hoveredBackgroundColor={COLORS.white}
                            text='Back to login'
                        />
                    </Link>
                </LinearGradient>
            </Animated.View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef
})

export default connect(mapStateToProps)( withSearchParams(OTP, ['language']) )