import { useRef, useState } from 'react'
import { Text, View } from "react-native"
import { COLORS, FONT_SIZES, FONTS, SPACING } from "../../constants"
import { supabase } from '../../supabase/config'
import CustomButton from "../../components/elements/CustomButton"
import { normalize, isValidEmail } from '../../utils'
import { Image } from 'expo-image'
import { Feather, AntDesign } from '@expo/vector-icons'
import CustomInput from '../../components/elements/CustomInput'
import Animated, { LinearTransition, BounceIn, FadeInDown } from 'react-native-reanimated'
import { Link } from 'react-router-native'
import { LinearGradient } from 'expo-linear-gradient'
import withSearchParams from '../../components/hoc/withSearchParams'
import { fetchUser } from '../../redux/actions/user'
import { connect } from 'react-redux'
import { useNavigate, useLocation, useSearchParams, Navigate } from 'react-router-dom'
import * as Linking from 'expo-linking'

const Login = ({ searchParams, toastRef, fetchUser }) => {
    const googleSignInButtonRef = useRef()
    const emailSignupButton = useRef()

    const [email, setEmail] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const location = useLocation()
    const [urlSearchParams] = useSearchParams()

    //urlSearchParams contains from when redirected from google sign in
    if (urlSearchParams.get('from')) {
        let to = urlSearchParams.get('from')

        if (searchParams.language) {
            to += '?language=' + searchParams.language
        }

        return <Navigate to={to} replace />
    }

    let from = location.state?.from?.pathname || "/tickets"

    const onGoogleSignupPress = async () => {
        googleSignInButtonRef.current.setIsLoading(true)
        try {
            let redirectTo = Linking.createURL("/auth?from=" + from)

            if (searchParams.language) {
                redirectTo += '&language=' + searchParams.language
            }

            const { error: signInError, data: sessionData } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo
                }
            })

            if (signInError) {
                throw signInError
            }
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
        <>
            <View style={{
                height: normalize(65),
                width: '100%',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: SPACING.page_horizontal,
            }}>
                <Link
                    style={{ width: normalize(80) }}
                    to={{ pathname: '/', search: new URLSearchParams(searchParams).toString() }}
                >
                    <Image
                        contentFit='contain'
                        source={require('../../assets/logos/logo-header.png')}
                        style={{
                            width: normalize(80),
                            aspectRatio: 773 / 320
                        }}
                        tintColor={COLORS.accent}
                    />
                </Link>
            </View>

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
                            borderRadius: 10,
                            flex: 1
                        }}
                        colors={[COLORS.secondary, COLORS.primary]}
                        start={{ x: -0.7, y: 0 }}
                    >
                        {/* <Link 
                        style={{ width: normalize(80) }} 
                        to={{ pathname: '/', search: new URLSearchParams(searchParams).toString() }}
                    >
                        <Image
                            contentFit='contain'
                            source={require('../../assets/logos/logo-header.png')}
                            style={{
                                width: normalize(80),
                                aspectRatio: 773 / 320
                            }}
                            tintColor={COLORS.accent}
                        />
                    </Link> */}
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
                            additionalStyles={{ borderWidth: 1, borderColor: COLORS.whiteBackground2, width: '100%', marginTop: SPACING.large }}
                            textColor={COLORS.white}
                            backgroundColors={COLORS.secondary2}
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

                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: FONT_SIZES.medium,
                                color: COLORS.grey400,
                                marginTop: SPACING.large,
                                lineHeight: 20,
                            }}
                        >
                            By signing up, you agree to our <Link to={{ to: '/', search: new URLSearchParams(searchParams).toString() }} style={{ textDecorationLine: 'underline' }}><Text>Terms of Service</Text></Link> and <Link to={{ to: '/', search: new URLSearchParams(searchParams).toString() }} style={{ textDecorationLine: 'underline' }}><Text>Privacy Policy</Text></Link>
                        </Text>
                    </LinearGradient>
                </Animated.View>
            </View>
        </>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef
})

export default connect(mapStateToProps, { fetchUser })(withSearchParams(Login, ['language']))