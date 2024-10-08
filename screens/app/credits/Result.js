import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { SPACING, FONTS, FONT_SIZES, COLORS } from "../../../constants"
import LottieView from 'lottie-react-native'
import { useNavigate, createSearchParams } from "react-router-dom"
import { ActivityIndicator } from "react-native-paper"
import { Image } from "expo-image"

import withSearchParams from "../../../components/hoc/withSearchParams"
import CustomButton from "../../../components/elements/CustomButton"
import { stripEmptyParams } from "../../../utils"
import { connect } from "react-redux"

const Success = () => {

    return (
        <>
            <LottieView
                style={{ height: 130, alignSelf: 'center', width: 'fit-content', }}
                autoPlay
                loop={false}
                source={require('../../../assets/animations/success.json')}
            />
            <Text
                style={{
                    fontFamily: FONTS.bold,
                    fontSize: FONT_SIZES.x_large,
                    color: COLORS.white,
                    marginTop: SPACING.medium,
                    marginBottom: SPACING.xx_small
                }}
            >
                Objednávka byla úspěšně dokončena  🎉
            </Text>

            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey300,
                    textAlign: 'center',
                    marginBottom: SPACING.xx_large
                }}
            >
                Děkujeme za Vaši objednávku. Zakoupené kredity vám budou během chvíle připsány na účet.
            </Text>
        </>
    )
}

const Processing = () => {

    return null
}

const Failed = () => {

    return (
        <>
            <Image
                source={require('../../../assets/images/ErrorIcon.png')}
                style={{ width: 50, height: 50, alignSelf: 'center' }}
            />
            <Text
                style={{
                    fontFamily: FONTS.bold,
                    fontSize: FONT_SIZES.x_large,
                    color: COLORS.white,
                    marginTop: SPACING.medium,
                    marginBottom: SPACING.xx_small
                }}
            >
                Platba byla neúspěšná 😔
            </Text>

            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey300,
                    textAlign: 'center',
                    marginBottom: SPACING.xx_large
                }}
            >
                Platbu se nepodařilo dokončit. Zkuste to prosím znovu.
            </Text>
        </>
    )
}

const Result = ({ searchParams, toastRef }) => {
    const [loading, setLoading] = useState(searchParams.redirect_status === 'succeeded' && searchParams.payment_intent_client_secret)
    const [orderStatus, setOrderStatus] = useState(searchParams.status)

    const navigate = useNavigate()

    useEffect(() => {
        if (searchParams.redirect_status === 'succeeded' && searchParams.payment_intent_client_secret) {
            console.log('fetching order data')
            fetchOrderData()
        }  
    }, [searchParams])

    const fetchOrderData = async () => {
        try {
            setTimeout(() => setLoading(false), 2000)
        } catch(e) {
            console.error('Error fetching order data', e)
            toastRef?.show({
                type: 'error',
                text: 'Stav objednávky se nepodařilo načíst.'
            })
        } finally {
            setLoading(false)
        }
    }

    const onFinishPress = () => {
        navigate({
            pathname: '/credits',
            search: new URLSearchParams(stripEmptyParams({ language: searchParams.language })).toString(),
        }, {
            replace: true
        })

        //TODO - call supabase to get the latest order data
    }
    
    //non-redirect case and unknown status
    if (!searchParams.status && !searchParams.redirect_status) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: SPACING.large
                }}
            >
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.error
                    }}
                >
                    Neznámý stav objednávky
                </Text>
            </View>
        )
    }

    //redirect case and unknown status
    if (searchParams.redirect_status === 'succeeded' && !searchParams.payment_intent_client_secret) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: SPACING.large
                }}
            >
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.error
                    }}
                >
                    Neznámý stav objednávky
                </Text>
            </View>
        )
    }

    //redirect case and status could not be fetched
    if (searchParams.redirect_status && !loading && !orderStatus) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: SPACING.large
                }}
            >
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.error
                    }}
                >
                    Neznámý stav objednávky
                </Text>
            </View>
        )
    }

    //redirect case and payment failed
    if (searchParams.redirect_status && searchParams.redirect_status !== 'succeeded') {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: SPACING.large
                }}
            >
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.error
                    }}
                >
                    Platba byla zamítnuta
                </Text>
            </View>
        )
    }

    if (loading) {
        return (
            <View
                style={{
                    padding: SPACING.medium,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size='small' color={COLORS.white} />
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {
                orderStatus === 'succeeded' ? <Success />
                    : orderStatus === 'processing' ? <Processing /> : <Failed />
            }
            <CustomButton
                onPress={onFinishPress}
                textColor={COLORS.black}
                backgroundColors={COLORS.accent}
                buttonText='Dokončit'
                additionalStyles={{ width: '100%' }}
                textStyles={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large }}
            />
        </View>
    )
}


const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef
})

export default connect(mapStateToProps)(withSearchParams(Result, ['language', 'status', 'redirect_status', 'payment_intent_client_secret']))