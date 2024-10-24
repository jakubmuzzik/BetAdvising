import React from 'react'
import { View, Text } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../../constants'
import * as Linking from 'expo-linking'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInDown } from 'react-native-reanimated'

const Support = () => {

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: SPACING.page_horizontal,
            }}
        >
            <Animated.View
                entering={FadeInDown}
                style={{
                    borderColor: COLORS.whiteBackground2,
                    borderWidth: 1,
                    borderRadius: 10,
                    //width: 450,
                    maxWidth: '100%',
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
                    color: COLORS.white,
                    fontSize: FONT_SIZES.h3,
                    fontFamily: FONTS.regular,
                    textAlign: 'center'
                }}
            >
                Potřebujete pomoc?
            </Text>
            <Text
                style={{
                    color: COLORS.grey400,
                    fontSize: FONT_SIZES.large,
                    fontFamily: FONTS.regular,
                    textAlign: 'center',
                    marginTop: 20
                }}
            >
                Napište nám na kdykoliv na:
            </Text>
            <Text
                onPress={() => Linking.openURL('mailto:support@tipstrike.cz')}
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.accent,
                    marginTop: 4,
                    textAlign: 'center'
                }}
            >
                support@tipstrike.cz
            </Text>

            <Text
                style={{
                    color: COLORS.grey400,
                    fontSize: FONT_SIZES.large,
                    fontFamily: FONTS.regular,
                    textAlign: 'center',
                    marginTop: 20
                }}
            >
                Obvykle odpovídáme do 24 hodin.
            </Text>
            </LinearGradient>
            </Animated.View>
        </View>
    )
}

export default Support