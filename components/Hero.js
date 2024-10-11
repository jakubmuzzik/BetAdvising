import React from 'react'
import { COLORS, FONT_SIZES, FONTS } from '../constants'
import { normalize } from '../utils'
import { StyleSheet, View, ImageBackground, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SPACING } from '../constants'
import HoverableView from './elements/HoverableView'
import { MotiText } from 'moti'
import { Link } from 'react-router-dom'
import withSearchParams from './hoc/withSearchParams'

const Hero = ({ searchParams }) => {
    return (
        <>
            <ImageBackground
                source={require('../assets/images/hero2.png')}
                style={{
                    width: '100%',
                    height: 580,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    overflow: 'hidden',
                }}
                imageStyle={{
                    opacity: 0.8
                }}
                resizeMode='cover'
            >
                <LinearGradient
                    colors={['rgba(22,22,22,0)', COLORS.primary]}
                    style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}
                />

                <View style={{ paddingHorizontal: SPACING.page_horizontal, paddingBottom: normalize(50) }}>
                    <MotiText
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.heroHeading,//FONT_SIZES.heroHeading,
                            //lineHeight: 68,
                            color: COLORS.white,
                            marginBottom: SPACING.xx_small,
                            textAlign: 'center'
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
                                withHoverableArrow
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
                                    borderWidth: 1,
                                    borderColor: COLORS.accentSecondaryBorder
                                }}
                                withCustomButtonHeight
                                hoveredBackgroundColor={COLORS.accentHoveredSecondary}
                                backgroundColor={COLORS.accentSecondary}
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
            </ImageBackground>
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