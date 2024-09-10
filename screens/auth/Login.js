import { useRef, useState } from 'react'
import { Text, View } from "react-native"
import { COLORS, FONT_SIZES, FONTS, SPACING } from "../../constants"
import { supabase } from '../../supabase/config'
import CustomButton from "../../components/elements/CustomButton"
import { normalize, isValidEmail } from '../../utils'
import { Image } from 'expo-image'
import { Feather, AntDesign } from '@expo/vector-icons'
import CustomInput from '../../components/elements/CustomInput'
import Animated, { LinearTransition, BounceIn } from 'react-native-reanimated'

const Login = () => {
    const googleSignInButtonRef = useRef()
    const emailSignupButton = useRef()

    const [email, setEmail] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const onGoogleSignupPress = async () => {
        googleSignInButtonRef.current.setIsLoading(true)
        try {
            await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
        } catch (error) {
            console.error(error)
        } finally {
            googleSignInButtonRef.current.setIsLoading(false)
        }
    }

    const onEmailSignupPress = async () => {
        if (!email || !isValidEmail(email)) {
            setShowErrorMessage(true)
            return
        }

        emailSignupButton.current.setIsLoading(true)

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email
            })

            if (error) {
                throw error
            }

            //navigation.push('EmailConfirmation', { email })
        } catch (e) {
            console.error('Error signing in with OTP:', e.message ?? e)
            //Alert.alert(e.message ?? 'Something went wrong. Please try again later.')
        } finally {
            emailSignupButton.current.setIsLoading(false)
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Animated.View
                layout={LinearTransition}
                style={{
                    backgroundColor: COLORS.secondary,
                    padding: SPACING.large,
                    borderRadius: 10,
                    width: 450,
                    maxWidth: '90%'
                }}>
                <Text
                    style={{
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.white,
                        fontFamily: FONTS.medium
                    }}
                >
                    Login or Register
                </Text>
                <Text
                    style={{
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey400,
                        fontFamily: FONTS.regular,
                        marginTop: SPACING.xx_small
                    }}
                >
                    Choose an option below to continue
                </Text>

                <CustomButton
                    ref={googleSignInButtonRef}
                    onPress={onGoogleSignupPress}
                    additionalStyles={{ borderWidth: 1, borderColor: COLORS.whiteBackground2, width: '100%', marginTop: SPACING.medium }}
                    textColor={COLORS.white}
                    backgroundColors={COLORS.whiteBackground}
                    buttonText='Continue with Google'
                    spinnerColor={COLORS.darkBlue}
                    textStyles={{ fontFamily: FONTS.regular }}
                    icon={<Image
                        source={require('../../assets/logos/google.png')}
                        style={{ width: normalize(17), aspectRatio: 1 / 1, marginRight: SPACING.xx_small }}
                    />}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.small, marginVertical: SPACING.large }}>
                    <View style={{ flexGrow: 1, borderBottomWidth: 1, borderColor: COLORS.grey400 }} />
                    <Text
                        style={{
                            color: COLORS.grey400,
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.medium,
                            textAlign: 'center'
                        }}
                    >
                        or
                    </Text>
                    <View style={{ flexGrow: 1, borderBottomWidth: 1, borderColor: COLORS.grey400 }} />
                </View>

                <CustomInput
                    placeholder='your@email.com'
                    label='Email adresa'
                    value={email}
                    onChangeText={setEmail}
                    containerStyle={{ width: '100%' }}
                    rightIcon={email && isValidEmail(email) ?
                        <Animated.View
                            entering={BounceIn}
                        >
                            <AntDesign name="checkcircleo" size={normalize(19)} color="green" />
                        </Animated.View>
                        : null
                    }
                    errorMessage={showErrorMessage ? (!email ? 'Enter your email address' : !isValidEmail(email) ? 'Invalid email address' : undefined) : undefined}
                />

                <CustomButton ref={emailSignupButton}
                    onPress={onEmailSignupPress}
                    additionalStyles={{ borderWidth: 1, borderColor: COLORS.white, marginTop: SPACING.x_small, width: '100%' }}
                    textColor={COLORS.black}
                    backgroundColors={COLORS.white}
                    buttonText='Continue with Email'
                    textStyles={{ fontFamily: FONTS.medium }}
                    icon={<Feather
                        style={{ marginRight: SPACING.xx_small }}
                        name="mail"
                        size={normalize(17)}
                        color={COLORS.black}
                    />}
                />
            </Animated.View>
        </View>
    )
}

export default Login