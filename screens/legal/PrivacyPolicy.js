import React from 'react'
import withSearchParams from '../../components/hoc/withSearchParams'
import { View, Text } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../../constants'

const PrivacyPolicy = ({ searchParams }) => {

    return (
        <>
            <View
                style={{
                    paddingHorizontal: SPACING.page_horizontal,
                }}
            >
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.h1,
                        color: COLORS.white,
                        textAlign: 'center',
                        marginTop: 80
                    }}
                >
                    Zpracování osobních údajů
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.grey400,
                        textAlign: 'center',
                        marginTop: 20
                    }}
                >
                    Naposledy aktualizováno: 17. 10. 2024
                </Text>
                <View
                    style={{
                        maxWidth: 900,
                        paddingTop: 40,
                        margin: 'auto',
                    }}
                >
                    
                </View>
            </View>
        </>
    )
}

export default withSearchParams(PrivacyPolicy, ['language'])