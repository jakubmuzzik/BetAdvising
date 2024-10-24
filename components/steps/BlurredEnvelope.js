
import React, { useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { Entypo, Feather } from '@expo/vector-icons'
import { SPACING, FONT_SIZES, FONTS, CUSTOM_BUTTON_HEIGHT, COLORS } from '../../constants'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { STEP_SMALL_SCREEN_THRESHOLD }  from '.'
import { isBrowser } from 'react-device-detect'
import { ZoomableText } from '.'
import { normalize } from '../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'react-native'

const LoginImage = ({ isSmallScreen }) => {
    return (
        <View
            style={{
                pointerEvents: 'none',
                width: isSmallScreen ? 'auto' : 450,
                maxWidth: '100%',
                margin: 'auto',
                marginVertical: 20,
                borderColor: COLORS.whiteBackground2,
                borderRadius: 10,
                zoom: 0.8
                //transform: [{ scale: 0.8 }], // Use transform instead of zoom
                //transformOrigin: 'center'
            }}
        >
            <LinearGradient
                style={{
                    padding: SPACING.xx_large,
                    borderRadius: 10,
                    flex: 1,
                    //width: '80%',
                    //marginTop: 50
                }}
                colors={[COLORS.secondary, COLORS.primary]}
                start={{ x: -0.7, y: 0 }}
            >
                <ZoomableText
                    style={{
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.white,
                        fontFamily: FONTS.medium
                    }}
                >
                    Registrace
                </ZoomableText>
                <ZoomableText
                    style={{
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey400,
                        fontFamily: FONTS.regular,
                        marginTop: SPACING.xx_small
                    }}
                >
                    Vyberte si způsob registrace
                </ZoomableText>

                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SPACING.large,
                        justifyContent: 'center',
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        height: CUSTOM_BUTTON_HEIGHT,
                        borderWidth: 1,
                        borderColor: COLORS.whiteBackground2,
                    }}
                >
                    <Image
                        source={require('../../assets/logos/google.png')}
                        style={{ width: normalize(17), height: normalize(17), marginRight: SPACING.xx_small }}
                    />
                    <ZoomableText
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.medium,
                            verticalAlign: 'center',
                            flexShrink: 1
                        }}
                        transformOrigin='center'
                    >
                        Přihlásit se pomocí Google
                    </ZoomableText>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.small, marginVertical: SPACING.large }}>
                    <View style={{ flexGrow: 1, borderBottomWidth: 1, borderColor: COLORS.grey400 }} />
                    <ZoomableText
                        style={{
                            color: COLORS.grey400,
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.medium,
                            textAlign: 'center'
                        }}
                    >
                        nebo
                    </ZoomableText>
                    <View style={{ flexGrow: 1, borderBottomWidth: 1, borderColor: COLORS.grey400 }} />
                </View>

                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: COLORS.secondary2,
                        borderRadius: 10,
                        height: CUSTOM_BUTTON_HEIGHT,
                        borderWidth: 1,
                        borderColor: COLORS.whiteBackground2,
                        paddingHorizontal: SPACING.medium,
                        paddingVertical: SPACING.small
                    }}
                >
                    <ZoomableText
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.medium,
                            verticalAlign: 'center',
                            includeFontPadding: false,
                            verticalAlign: 'center',
                            flexShrink: 1,
                            color: COLORS.grey300
                        }}
                    >
                        Email adresa
                    </ZoomableText>
                </View>

                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SPACING.x_small,
                        justifyContent: 'center',
                        backgroundColor: COLORS.accentSecondary,
                        borderRadius: 10,
                        height: CUSTOM_BUTTON_HEIGHT,
                        borderWidth: 1,
                        borderColor: COLORS.accentSecondaryBorder,
                    }}
                >
                    <Feather
                        style={{ marginRight: SPACING.xx_small }}
                        name="mail"
                        size={normalize(17)}
                        color={COLORS.accent}
                    />
                    <ZoomableText
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.medium,
                            verticalAlign: 'center',
                            includeFontPadding: false,
                            verticalAlign: 'center',
                            flexShrink: 1,
                            color: COLORS.accent
                        }}
                    >
                        Přihlásit se pomocí Emailu
                    </ZoomableText>
                </View>

                <ZoomableText
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey400,
                        marginTop: SPACING.large,
                        lineHeight: 20,
                    }}
                >
                    Registrací souhlasíte s našimi <ZoomableText style={{ textDecorationLine: 'underline', color: COLORS.grey400 }}>všeobecnými obchodními podmínkami</ZoomableText> a <ZoomableText style={{ textDecorationLine: 'underline', color: COLORS.grey400 }}>se zpracováním osobních údajů</ZoomableText>
                </ZoomableText>

                <LinearGradient
                    colors={['rgba(22,22,22,0)', COLORS.primary]}
                    //locations={[0, 0.9]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '50%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                />

            </LinearGradient>
        </View>
    )
}

const BlurredEnvelope = () => {
    const { width } = useWindowDimensions()
    const isSmallScreen = width < STEP_SMALL_SCREEN_THRESHOLD

    const [isHovered, setIsHovered] = useState(false)

    const loginCardAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: withTiming(isHovered ? -30 : 0, { duration: 200 }) },
            ]
        }
    })

    return (
        <View
            style={{
                width: 450,
                maxWidth: 450,
                zoom: width < 300 ? 0.4 : width < 400 ? 0.5 : 0.65,
                //transform: [{ scale: width < 300 ? 0.4 : width < 400 ? 0.5 : 0.65 }],
                //transformOrigin: 'center',
                alignSelf: 'center',
                marginVertical: isSmallScreen ? 64 : 0,
                marginBottom: isSmallScreen ? 64 : -60,
                shadowColor: COLORS.secondary,
                shadowOffset: {
                    width: 2,
                    height: 5,
                },
                shadowOpacity: 0.65,
                shadowRadius: 10.84,
                elevation: 5,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: 270,
                    top: 30,
                    backgroundColor: COLORS.whiteBackground,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                }}
            />

            <View
                style={{
                    position: 'absolute',
                    top: -240,
                    width: '100%',
                    height: 300,
                    backgroundColor: COLORS.whiteBackground,
                    clipPath: 'polygon(0% 10%, 100% 10%, 50% 50%)',
                    transform: [{ rotate: '180deg' }],
                }}
            />

            <Animated.View
                style={[{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: 'auto',
                    alignSelf: 'center',
                }, loginCardAnimatedStyle]}
            >
                <LoginImage />
            </Animated.View>

            <View
                style={{
                    width: '100%',
                    height: 300,
                    //backgroundColor: COLORS.whiteBackground,
                    backgroundColor: 'rgba(24, 29, 37, .43)',
                    clipPath: 'polygon(0% 10%, 50% 50%, 100% 10%, 100% 100%, 0% 100%)',
                    borderRadius: '0 0 8px 8px',
                    backdropFilter: 'blur(10px)', // Apply the blur to content behind
                    WebkitBackdropFilter: 'blur(10px)', // For Safari
                    borderColor: COLORS.whiteBackground,
                    borderWidth: 1,
                    borderRadius: 8,
                }}
            >

            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 20,
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.accentSecondaryTransparent,
                        //backgroundColor: 'rgb(67 67 67 / 23%)',
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20
                    }}
                >
                    <Entypo
                        name="email"
                        size={27}
                        color={COLORS.accent}
                    />
                </View>
            </View>

        </View>
    )
}

export default BlurredEnvelope