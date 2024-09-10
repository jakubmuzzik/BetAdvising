import React from 'react'
import { COLORS, FONT_SIZES, FONTS } from '../constants'
import { normalize } from '../utils'
import { StyleSheet, View, ImageBackground, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SPACING } from '../constants'
import { Image } from 'expo-image'
import HoverableView from './HoverableView'
import { MotiText } from 'moti'
import CountInNumber from './animated/CountInNumber'
import { Link } from 'react-router-dom'
import { stripEmptyParams } from '../utils'

const Hero = () => {
    const { width } = useWindowDimensions()

    const onGetAppPress = () => {

    }

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
                    }}>
                        <HoverableView
                            hoveredBackgroundColor={COLORS.hoveredAccent}
                            backgroundColor={COLORS.accent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                width: 'fit-content'
                            }}
                        >
                            <TouchableOpacity
                                onPress={onGetAppPress}
                                style={{
                                    paddingHorizontal: SPACING.x_small,
                                    paddingVertical: SPACING.xx_small,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#000',
                                        fontFamily: FONTS.bold,
                                        fontSize: FONT_SIZES.large
                                    }}
                                >
                                    Získat tipy →
                                </Text>
                            </TouchableOpacity>
                        </HoverableView>

                        <HoverableView
                            hoveredBackgroundColor={'rgba(214, 214, 214, 0.37)'}
                            backgroundColor={'rgba(214, 214, 214, 0.27)'}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                width: 'fit-content'
                            }}
                        >
                            <TouchableOpacity
                                onPress={onGetAppPress}
                                style={{
                                    paddingHorizontal: SPACING.x_small,
                                    paddingVertical: SPACING.xx_small,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontFamily: FONTS.regular,
                                        fontSize: FONT_SIZES.large
                                    }}
                                >
                                    Jak to funguje
                                </Text>
                            </TouchableOpacity>
                        </HoverableView>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

export default Hero

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