import { Image } from "expo-image"
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native"
import { SPACING, FONTS, FONT_SIZES, COLORS } from "../constants"
import { normalize } from "../utils"
import HoverableView from "./elements/HoverableView"
import { Link } from "react-router-dom"

const FooterCTA = ({ searchParams }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < 800

    return (
        <>
            <Image
                source={require('../assets/images/ellipse_glow.svg')}
                style={{
                    width: isSmallScreen ? '100%' : '80%',
                    aspectRatio: 2908 / 804,
                    maxWidth: 1380,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    position: 'absolute',
                    margin: 'auto',
                }}
            />

            <View
                style={{
                    paddingHorizontal: SPACING.page_horizontal,
                    width: '100%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: normalize(190),
                    paddingBottom: isSmallScreen ? 80 : 150
                }}
            >
                <span
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.h1,
                        color: COLORS.white,
                        marginBottom: 10,
                        textAlign: 'center',
                        background: `linear-gradient(180deg, ${COLORS.white}, rgba(255, 255, 255, 0.7))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Zvyšte své šance na výhru
                </span>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.grey400,
                        textAlign: 'center'
                    }}
                >
                    Zaregistruje se a získejte přístup k našim exkluzivním sázkařským tipům ještě dnes.
                </Text>

                <Link
                    style={{
                        textDecoration: 'none',
                        marginTop: SPACING.large,
                        alignSelf: 'center'
                    }}
                    to={{ pathname: '/auth', search: new URLSearchParams(searchParams).toString() }}
                >
                    <HoverableView
                        hoveredBackgroundColor={COLORS.hoveredAccent}
                        backgroundColor={COLORS.accent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            width: 'fit-content',
                            boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.55)',
                            paddingHorizontal: SPACING.x_small,
                            paddingVertical: SPACING.xx_small,
                        }}
                        withCustomButtonHeight
                        withHoverableArrow
                    >
                        <Text
                            style={{
                                color: '#000',
                                fontFamily: FONTS.bold,
                                fontSize: FONT_SIZES.large
                            }}
                        >
                            Zaregistrovat se
                        </Text>
                    </HoverableView>
                </Link>
            </View>


        </>
    )
}

export default FooterCTA