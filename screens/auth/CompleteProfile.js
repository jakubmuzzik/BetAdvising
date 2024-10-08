import { useRef, useState } from 'react'
import { Text, View } from "react-native"
import { COLORS, FONT_SIZES, FONTS, SPACING } from "../../constants"
import { supabase } from '../../supabase/config'
import CustomButton from "../../components/elements/CustomButton"
import CustomInput from '../../components/elements/CustomInput'
import Animated, { LinearTransition, BounceIn, FadeInDown } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import HoverableText from '../../components/elements/HoverableText'
import withSearchParams from '../../components/hoc/withSearchParams'
import { connect } from 'react-redux'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { logOut } from '../../redux/actions/app'

const CompleteProfile = ({ toastRef, searchParams, currentAuthUser, logOut }) => {
    if (currentAuthUser?.user_metadata?.profile_completed) {
        let to = '/tickets/offers'

        return <Navigate to={{pathname: to, search: new URLSearchParams(searchParams).toString()}} replace />
    }

    const navigate = useNavigate()
    const location = useLocation()

    const completeProfileButtonRef = useRef()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [sendNotifications, setSendNotifications] = useState(true)

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    let from = location.state?.from || "/tickets/offers"

    const onCompleteProfilePress = async () => {
        if (!firstName || !lastName) {
            setShowErrorMessage(true)
            return
        }

        completeProfileButtonRef.current.setIsLoading(true)

        try {
            const { error: authUpdateError } = await supabase.auth.updateUser({
                data: {
                    name: firstName + ' ' + lastName,
                    profile_completed: true,
                    email_notifications_enabled: sendNotifications
                }
            })

            if (authUpdateError) {
                throw authUpdateError
            }

            from = from === '/complete-profile' ? '/tickets/offers' : from

            navigate({
                pathname: from,
                search: new URLSearchParams(searchParams).toString()
            }, {
                replace: true
            })

            toastRef?.show({
                text: 'Profile completed successfully',
                type: 'success'
            })
        } catch (error) {
            console.error(error)

            toastRef?.show({
                text: 'Failed to complete your profile. Please try again later.',
                type: 'error'
            })
        } finally {
           completeProfileButtonRef.current.setIsLoading(true)
        }
    }

    const onLogoutPress = async () => {
        try {
            await logOut()
        } catch(e) {
            toastRef?.show({
                type: 'error',
                text: 'Failed to log out.'
            })
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
                        Complete your profile
                    </Text>
                    <Text
                        style={{
                            fontSize: FONT_SIZES.medium,
                            color: COLORS.grey400,
                            fontFamily: FONTS.regular,
                            marginTop: SPACING.xx_small
                        }}
                    >
                        Complete your profile to continue
                    </Text>


                    <CustomInput
                        placeholder='Jakub'
                        label='Jméno'
                        value={firstName}
                        onChangeText={setFirstName}
                        containerStyle={{ width: '100%', marginTop: SPACING.large }}
                        errorMessage={showErrorMessage && !firstName ? 'Enter your first name' : undefined}
                        onSubmitEditing={onCompleteProfilePress}
                    />

                    <CustomInput
                        placeholder='Novák'
                        label='Příjmení'
                        value={lastName}
                        onChangeText={setLastName}
                        containerStyle={{ width: '100%', marginTop: SPACING.xx_small }}
                        errorMessage={showErrorMessage && !lastName ? 'Enter your last name' : undefined}
                        onSubmitEditing={onCompleteProfilePress}
                    />

                    <BouncyCheckbox
                        style={{ marginTop: SPACING.small }}
                        disableBuiltInState
                        isChecked={sendNotifications}
                        size={20}
                        fillColor={COLORS.accent}
                        unfillColor="#FFFFFF"
                        text="Send me notifications about new bet tickets via email"
                        iconStyle={{ borderRadius: 3 }}
                        innerIconStyle={{ borderWidth: 2, borderRadius: 3 }}
                        textStyle={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, textDecorationLine: "none", color: COLORS.grey300 }}
                        onPress={() => setSendNotifications((d) => (!d))}
                    />

                    <CustomButton ref={completeProfileButtonRef}
                        onPress={onCompleteProfilePress}
                        additionalStyles={{ borderWidth: 1, borderColor: COLORS.white, marginTop: SPACING.medium, width: '100%' }}
                        textColor={COLORS.black}
                        backgroundColors={COLORS.white}
                        buttonText='Complete profile'
                        textStyles={{ fontFamily: FONTS.medium }}
                    />

                    <HoverableText
                        textStyle={{
                            color: COLORS.grey400,
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.medium,
                            textAlign: 'center',
                            marginTop: SPACING.medium
                        }}
                        hoveredColor={COLORS.white}
                        hoveredBackgroundColor={COLORS.white}
                        text='Odhlásit se'
                        onPress={onLogoutPress}
                    />
                </LinearGradient>
            </Animated.View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef,
    currentAuthUser: store.userState.currentAuthUser
})

export default connect(mapStateToProps, { logOut })( withSearchParams(CompleteProfile, ['language']) )