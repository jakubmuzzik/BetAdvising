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
import { Link } from 'react-router-dom'
import { LinearGradient } from 'expo-linear-gradient'
import withSearchParams from '../../components/hoc/withSearchParams'
import { fetchUser } from '../../redux/actions/user'
import { connect } from 'react-redux'
import { useNavigate, useLocation, useSearchParams, Navigate } from 'react-router-dom'
import * as Linking from 'expo-linking'
import { useAnimatedShake } from '../../components/hooks/useAnimatedShake'

const Login = ({ searchParams, toastRef, currentAuthUser }) => {
    const googleSignInButtonRef = useRef()
    const emailSignupButton = useRef()

    const [email, setEmail] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const location = useLocation()
    //params used to get url params when redirected from google sign in
    const [urlSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const { shake, rStyle } = useAnimatedShake()

    //urlSearchParams contains from when redirected from google sign in
    if (urlSearchParams.get('from')) {
        let to = urlSearchParams.get('from')

        const params = new URLSearchParams(urlSearchParams)
        params.delete('from')

        return <Navigate to={{pathname: to, search: new URLSearchParams(params).toString()}} replace />
    }

    if (currentAuthUser.id && currentAuthUser.user_metadata?.profile_completed) {
        let to = '/tickets/offers'

        return <Navigate to={{pathname: to, search: new URLSearchParams(searchParams).toString()}} replace />
    }

    let from = location.state?.from || "/tickets/offers"

    const onGoogleSignupPress = async () => {
        googleSignInButtonRef.current.setIsLoading(true)
        try {
            let redirectTo = `${window.location.origin}/auth?from=${from}`
            //let redirectTo = Linking.createURL("/auth?from=" + from)

            if (searchParams.language) {
                redirectTo += '&language=' + searchParams.language
            }

            if (searchParams.package) {
                redirectTo += '&package=' + searchParams.package
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
            shake()
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

            let to = '/auth/otp'

            navigate({
                pathname: to,
                search: new URLSearchParams(searchParams).toString(),
            },
                { state: { email, from } }
            )
        } catch (e) {
            console.error('Error signing in with OTP:', e.message ?? e)
            toastRef?.show({
                type: 'error',
                text: e.message ?? 'Something went wrong. Please try again later.'
            })
        } finally {
            emailSignupButton.current.setIsLoading(false)
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
                        borderRadius: 10,
                        flex: 1,
                    }}
                    colors={[COLORS.secondary, COLORS.primary]}
                    start={{ x: -0.7, y: 0 }}
                >
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
                        textColor={COLORS.black}
                        backgroundColors={COLORS.white}
                        buttonText='Přihlásit se pomocí Google'
                        spinnerColor={COLORS.black}
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
                        onSubmitEditing={onEmailSignupPress}
                        errorMessage={showErrorMessage ? (!email ? 'Enter your email address' : !isValidEmail(email) ? 'Invalid email address' : undefined) : undefined}
                    />

                    <Animated.View
                        style={rStyle}
                    >
                        <CustomButton ref={emailSignupButton}
                            onPress={onEmailSignupPress}
                            additionalStyles={{ borderWidth: 1, borderColor: COLORS.accentSecondaryBorder, marginTop: SPACING.x_small, width: '100%' }}
                            textColor={COLORS.accent}
                            backgroundColors={COLORS.accentSecondary}
                            spinnerColor={COLORS.white}
                            buttonText='Přihlásit se pomocí Emailu'
                            textStyles={{ fontFamily: FONTS.medium }}
                            icon={<Feather
                                style={{ marginRight: SPACING.xx_small }}
                                name="mail"
                                size={normalize(17)}
                                color={COLORS.accent}
                            />}
                        />
                    </Animated.View>

                    <Text
                        style={{
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.medium,
                            color: COLORS.grey400,
                            marginTop: SPACING.large,
                            lineHeight: 20,
                        }}
                    >
                        Registrací souhlasíte s našimi <Link to={{ pathname: '/terms-of-service', search: new URLSearchParams(searchParams).toString() }} style={{ textDecorationLine: 'underline', color: COLORS.grey400 }}><Text>všeobecnými obchodními podmínkami</Text></Link> a <Link to={{ pathname: '/privacy-policy', search: new URLSearchParams(searchParams).toString() }} style={{ textDecorationLine: 'underline', color: COLORS.grey400 }}><Text>se zpracováním osobních údajů</Text></Link>.
                    </Text>
                </LinearGradient>
            </Animated.View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef,
    currentAuthUser: store.userState.currentAuthUser,
})

export default connect(mapStateToProps, { fetchUser })(withSearchParams(Login, ['language', 'package']))