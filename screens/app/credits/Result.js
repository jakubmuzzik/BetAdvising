import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { SPACING, FONTS, FONT_SIZES, COLORS } from "../../../constants"
import LottieView from 'lottie-react-native'
import { useNavigate, createSearchParams } from "react-router-dom"
import { ActivityIndicator } from "react-native-paper"
import { Image } from "expo-image"
import { fetchLatestCreditTransaction } from "../../../redux/actions/user"

import withSearchParams from "../../../components/hoc/withSearchParams"
import CustomButton from "../../../components/elements/CustomButton"
import { stripEmptyParams } from "../../../utils"
import { connect } from "react-redux"

const Success = ({ searchParams, navigate, fetchLatestCreditTransaction }) => {
    const onFinishPress = async () => {
        navigate({
            pathname: '/credits',
            search: new URLSearchParams(stripEmptyParams({ language: searchParams.language })).toString(),
        }, {
            replace: true
        })

        await fetchLatestCreditTransaction()
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
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

const Processing = ({ searchParams, navigate }) => {
    const onFinishPress = () => {
        navigate({
            pathname: '/credits',
            search: new URLSearchParams(stripEmptyParams({ language: searchParams.language })).toString(),
        }, {
            replace: true
        })
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text
                style={{
                    fontFamily: FONTS.bold,
                    fontSize: FONT_SIZES.x_large,
                    color: COLORS.white,
                    marginTop: SPACING.medium,
                    marginBottom: SPACING.xx_small
                }}
            >
                Platba se zpracovává... 🔄
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
                Platba se zpracovává, prosím vyčkejte. Jakmile bude platba dokončena, dostanete potvrzovací email a zakoupené kredity budou připsány na Váš účet.
            </Text>
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

const Failed = ({ searchParams, navigate }) => {
    const onFinishPress = () => {
        navigate({
            pathname: '/credits',
            search: new URLSearchParams(stripEmptyParams({ language: searchParams.language })).toString(),
        }, {
            replace: true
        })
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
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

const Unknown = ({ searchParams, navigate }) => {
    const onFinishPress = () => {
        navigate({
            pathname: '/credits',
            search: new URLSearchParams(stripEmptyParams({ language: searchParams.language })).toString(),
        }, {
            replace: true
        })
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.error,
                    textAlign: 'center',
                    marginVertical: SPACING.large
                }}
            >
                Neznámý stav objednávky
            </Text>
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

//todo - fetch order data using payment_intent_client_secret
//do not using redirect payment methods for now anyway
const RedirectResult = ({ searchParams, navigate }) => {

    return (
        searchParams.redirect_status === 'succeeded' ? <Success searchParams={searchParams} navigate={navigate}/> : <Unknown searchParams={searchParams} navigate={navigate}/>
    )
}

const NonRedirectResult = ({ searchParams, navigate, fetchLatestCreditTransaction }) => {

    return (
        searchParams.status === 'succeeded' ? <Success searchParams={searchParams} navigate={navigate} fetchLatestCreditTransaction={fetchLatestCreditTransaction}/>
        : searchParams.status === 'processing' ? <Processing searchParams={searchParams} navigate={navigate}/> 
        : searchParams.status === 'requires_payment_method' ? <Failed searchParams={searchParams} navigate={navigate}/> : <Unknown searchParams={searchParams} navigate={navigate}/>
    )
}

const Result = ({ searchParams, fetchLatestCreditTransaction }) => { 
    const navigate = useNavigate()

    if (!searchParams.status && !searchParams.redirect_status && !searchParams.payment_intent_client_secret) {
        return null
    }

    if (searchParams.status) {
        return <NonRedirectResult searchParams={searchParams} navigate={navigate} fetchLatestCreditTransaction={fetchLatestCreditTransaction}/>
    } else if (searchParams.redirect_status) {
        return <RedirectResult searchParams={searchParams} navigate={navigate}/>
    } else {
        return <Unknown searchParams={searchParams} navigate={navigate}/>
    }
}


const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef
})

export default connect(mapStateToProps, { fetchLatestCreditTransaction })(withSearchParams(Result, ['language', 'status', 'redirect_status', 'payment_intent_client_secret']))