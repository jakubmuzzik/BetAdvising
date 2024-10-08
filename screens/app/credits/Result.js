import { View, Text } from "react-native"
import { SPACING, FONTS, FONT_SIZES, COLORS } from "../../../constants"
import LottieView from 'lottie-react-native'
import { useNavigate, createSearchParams } from "react-router-dom"

import withSearchParams from "../../../components/hoc/withSearchParams"
import CustomButton from "../../../components/elements/CustomButton"
import { stripEmptyParams } from "../../../utils"

const Result = ({ searchParams }) => {
    const navigate = useNavigate()

    const onFinishPress = () => {
        navigate({
            pathname: '/credits',
            search: new URLSearchParams(stripEmptyParams({language: searchParams.language})).toString(),
        }, {
            replace: true
        })

        //TODO - call supabase to get the latest order data
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
                    marginVertical: SPACING.medium
                }}
            >
                Objednávka byla úspěšně dokončena  🎉
            </Text>

            <CustomButton
                onPress={onFinishPress}
                textColor={COLORS.black}
                backgroundColors={COLORS.accent}
                buttonText='Dokončit'
                additionalStyles={{ marginTop: SPACING.large, width: '100%' }}
                textStyles={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large }}
            />
        </View>
    )
}

export default withSearchParams(Result, ['language', 'status'])