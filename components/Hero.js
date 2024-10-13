import React, { useEffect } from 'react'
import { COLORS, FONT_SIZES, FONTS } from '../constants'
import { normalize } from '../utils'
import { StyleSheet, View, ImageBackground, Text, useWindowDimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SPACING } from '../constants'
import HoverableView from './elements/HoverableView'
import { MotiText } from 'moti'
import { Link } from 'react-router-dom'
import withSearchParams from './hoc/withSearchParams'
import { Image } from 'expo-image'
import { isBrowser } from 'react-device-detect'
import VanillaTilt from 'vanilla-tilt'
import { BlurView } from 'expo-blur'
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'

const KeyFeatues = ({ width }) => {

    const isSmallScreen = width < 700

    return (
        <View
            dataSet={{ id: 'key-features' }}
            style={{
                marginTop: 50,
                flexDirection: isSmallScreen ? 'column' : 'row',
                gap: SPACING.large,
                alignSelf: 'center',
                padding: SPACING.medium,
                flexWrap: 'wrap',
                backgroundColor: isSmallScreen ? 'transparent' : COLORS.secondary,
                borderRadius: 15,
                borderColor: COLORS.whiteBackground2,
                borderWidth: isSmallScreen ? 0 : 1,
                flexShrink: 1,
                marginHorizontal: SPACING.page_horizontal,
                width: isSmallScreen ? width - SPACING.page_horizontal *2 : 'auto',
            }}
        >
            <View
                style={{
                    alignItems: 'center',
                    flex: 1
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.accentSecondary,
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20
                    }}
                >
                    <MaterialCommunityIcons
                        name="lightning-bolt"
                        size={34}
                        color={COLORS.accent}
                    />
                </View>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        color: COLORS.white,
                        fontSize: FONT_SIZES.x_large,
                        textAlign: 'center'
                    }}
                >
                    Aktuální nabídky VIP tipů
                </Text>
            </View>

            <View
                style={{
                    height: isSmallScreen ? .5 : '100%',
                    width: isSmallScreen ? '100%' : 1,
                    backgroundColor: COLORS.whiteBackground2,
                }}
            />

            <View
                style={{
                    alignItems: 'center',
                    flex: 1
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.accentSecondary,
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20
                    }}
                >
                    <FontAwesome5
                        name="coins"
                        size={26}
                        color={COLORS.accent}
                    />
                </View>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        color: COLORS.white,
                        fontSize: FONT_SIZES.x_large,
                        textAlign: 'center'
                    }}
                >
                    Zdarma vstupních 200 kreditů
                </Text>
            </View>

            <View
                style={{
                    height: isSmallScreen ? .5 : '100%',
                    width: isSmallScreen ? '100%' : 1,
                    backgroundColor: COLORS.whiteBackground2,
                }}
            />

            <View
                style={{
                    alignItems: 'center',
                    flex: 1
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.accentSecondary,
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20
                    }}
                >
                    <Ionicons
                        name="trophy"
                        size={27}
                        color={COLORS.accent}
                    />
                </View>


                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        color: COLORS.white,
                        fontSize: FONT_SIZES.x_large,
                        textAlign: 'center'
                    }}
                >
                    Kredity uplatněny jen při výhře
                </Text>
            </View>
        </View>
    )
}

const Hero = ({ searchParams }) => {
    const { width } = useWindowDimensions()
    const macbookWidth = (width > 1100 ? 950 : width)

    useEffect(() => {
        if (!isBrowser) return

        VanillaTilt.init(document.querySelector(`[data-id="macbook-screen"]`), {
            max: 2,
            speed: 200,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            reverse: true,
            glare: true,
            "max-glare": 0.08,
            axis: 'y',
            //startY: -100
        })
        VanillaTilt.init(document.querySelector(`[data-id="key-features"]`), {
            max: 2,
            speed: 200,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            reverse: true,
            glare: true,
            "max-glare": 0.08,
            axis: 'x',
            //startY: -100
        })
    }, [])

    return (
        <>
            <Image
                source={require('../assets/images/hero3.png')}
                style={{
                    width: width,
                    height: 880,
                    opacity: 0.6,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0
                }}
                contentFit='cover'
            />
            <LinearGradient
                colors={['rgba(22,22,22,0)', COLORS.primary]}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 440,
                    width: width,
                    height: 440,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            />

            <View style={{ paddingHorizontal: SPACING.page_horizontal, paddingBottom: normalize(50), marginTop: 330 }}>
                <MotiText
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.heroHeading,//FONT_SIZES.heroHeading,
                        //lineHeight: 68,
                        color: COLORS.white,
                        marginBottom: SPACING.xx_small,
                        textAlign: 'center',
                        alignSelf: 'center',
                    }}
                    from={{
                        opacity: 0,
                        transform: [{ translatey: 50 }],
                    }}
                    animate={{
                        opacity: 1,
                        transform: [{ translatey: 0 }],
                    }}
                    transition={{
                        type: 'timing'
                    }}
                >
                    Sázkové <Text style={{ color: COLORS.accent }}>tipy</Text>, které <Text style={{ color: COLORS.accent }}>vítězí!</Text>
                </MotiText>

                <MotiText
                    style={{
                        fontFamily: FONTS.light,
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.grey300,
                        marginBottom: SPACING.large,
                        textAlign: 'center',
                        lineHeight: FONT_SIZES.x_large * 1.5,
                        maxWidth: 600,
                        alignSelf: 'center'
                    }}
                    from={{
                        opacity: 0,
                        transform: [{ translatey: 30 }],
                    }}
                    animate={{
                        opacity: 1,
                        transform: [{ translatey: 0 }],
                    }}
                    transition={{
                        type: 'timing',
                        delay: 60
                    }}
                >
                    Získej přístup k nejlepším tipům na sázení od profesionálních tipařů. Začni s 200 kreditama zdarma.
                </MotiText>

                <View style={{
                    flexDirection: 'row',
                    gap: SPACING.medium,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                    <Link
                        style={{
                            textDecoration: 'none',
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
                                //boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.35)',
                                paddingHorizontal: SPACING.x_small,
                                paddingVertical: SPACING.xx_small,
                            }}
                            //hoveredBoxShadow='0px 0px 14px rgba(251, 193, 13, 0.25)'
                            withCustomButtonHeight
                        //withHoverableArrow
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: FONTS.bold,
                                    fontSize: FONT_SIZES.large
                                }}
                            >
                                Získat tipy
                            </Text>
                        </HoverableView>
                    </Link>

                    <Link
                        style={{
                            textDecoration: 'none',
                        }}
                        to={{ hash: '#how-it-works', search: new URLSearchParams(searchParams).toString() }}
                    >
                        <HoverableView
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                width: 'fit-content',
                                paddingHorizontal: SPACING.x_small,
                                paddingVertical: SPACING.xx_small,
                                flexDirection: 'row',
                                //boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.1)',
                                //boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.25)',
                                //borderWidth: 1,
                                borderColor: COLORS.accentSecondaryBorder
                            }}
                            withCustomButtonHeight
                            withHoverableArrow
                            arrowColor={COLORS.accent}
                            hoveredOpacity={0.9}
                        //hoveredBackgroundColor={COLORS.accentHoveredSecondary}
                        //backgroundColor={COLORS.accentSecondary}
                        >
                            <Text
                                style={{
                                    color: COLORS.accent,
                                    fontFamily: FONTS.medium,
                                    fontSize: FONT_SIZES.large
                                }}
                            >
                                Jak to funguje
                            </Text>
                        </HoverableView>
                    </Link>
                </View>
            </View>

            <View
                style={{
                    marginTop: 100,
                    width: '100%',
                }}
            >
                {/* <Image
                        source={require('../assets/images/blurred-glow.png')}
                        style={{
                            position: 'absolute',
                            top: -200,
                            right: 150,
                            height: 700,
                            width: 700
                        }}
                        contentFit='contain'
                    />
                    <Image
                        source={require('../assets/images/blurred-glow.png')}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            height: 700,
                            width: 700
                        }}
                        contentFit='contain'
                    /> */}

                <View
                    style={{
                        width: macbookWidth,
                        maxWidth: '80%',
                        alignSelf: 'center',
                    }}
                    dataSet={{ id: 'macbook-screen' }}
                >

                    <Image
                        source={require('../assets/images/macbook-screen.png')}
                        style={{
                            width: '100%',
                            aspectRatio: 2412 / 1603,
                        }}
                        contentFit='contain'
                    />
                </View>
                <Image
                    source={require('../assets/images/macbook-bottom.png')}
                    style={{
                        width: macbookWidth + 150,
                        maxWidth: '90%',
                        //maxWidth: '90%',
                        aspectRatio: 2988 / 96,
                        //height: 500,
                        alignSelf: 'center',
                    }}
                    contentFit='contain'
                />

                <KeyFeatues width={width} />
            </View>

        </>
    )
}

export default withSearchParams(Hero, ['language'])

const styles = StyleSheet.create({
    heroStatsNumber: {
        fontFamily: FONTS.regular,
        fontSize: normalize(40),
        color: COLORS.accent
    },
    heroStatsText: {
        fontFamily: FONTS.light,
        fontSize: FONT_SIZES.large,
        color: COLORS.grey400,
    }
})