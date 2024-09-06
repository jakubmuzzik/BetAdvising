import React from 'react'
import { StyleSheet, View } from 'react-native'
import { COLORS, FONT_SIZES, FONTS } from '../constants'
import { normalize } from '../utils'
import { ImageBackground, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SPACING } from '../constants'
import { Image } from 'expo-image'
import HoverableView from './HoverableView'
import { MotiText } from 'moti'

const HeroBackground = () => (
    <ImageBackground
        source={require('../assets/images/hero.png')}
        style={{
            position: 'absolute',
            width: '100%',
            height: 500,
            opacity: 0.9
        }}
        resizeMode='cover'
    >
        <LinearGradient
            colors={['rgba(22,22,22,0)', COLORS.primary]}
            style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}
        />
    </ImageBackground>
)

const Hero = () => {
    const { width } = useWindowDimensions()

    const onGetAppPress = () => {

    }

    return (
        <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    gap: SPACING.medium,
                }}
            >
                <HeroBackground />

                <View style={{
                    paddingVertical: SPACING.xx_large,
                    paddingHorizontal: SPACING.page_horizontal,
                    flexDirection: width > 1380 ? 'row' : 'column',
                    maxWidth: 1380,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    gap: SPACING.large,
                    flexWrap: 'wrap'
                }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}
                    >
                        <MotiText
                            style={{
                                fontFamily: FONTS.medium,
                                fontSize: FONT_SIZES.heroHeading,//FONT_SIZES.heroHeading,
                                lineHeight: 68,
                                color: COLORS.white,
                                marginBottom: SPACING.xx_small,
                                textAlign: width > 1380 ? 'left' : 'center',
                                //whiteSpace: 'nowrap'
                            }}
                            from={{
                                opacity: 0,
                                transform: [{ translatex: 100 }],
                            }}
                            animate={{
                                opacity: 1,
                                transform: [{ translatex: 0 }],
                            }}
                            exit={{
                                opacity: 0,
                                transform: [{ translatex: 100 }],
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
                                textAlign: width > 1380 ? 'left' : 'center',
                            }}
                            from={{
                                opacity: 0,
                                transform: [{ translatex: 100 }],
                            }}
                            animate={{
                                opacity: 1,
                                transform: [{ translatex: 0 }],
                            }}
                            exit={{
                                opacity: 0,
                                transform: [{ translatex: 100 }],
                            }}
                            transition={{
                                type: 'timing',
                                delay: 100
                            }}
                        >
                            Odborné tipy na sázení doručované přímo do mobilní aplikace
                        </MotiText>

                        <HoverableView
                            hoveredBackgroundColor={COLORS.hoveredAccent}
                            backgroundColor={COLORS.accent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                                width: 'fit-content',
                                alignSelf: width > 1380 ? 'auto' : 'center'
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
                                    ZÍSKAT APLIKACI →
                                </Text>
                            </TouchableOpacity>
                        </HoverableView>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            //minWidth: 500
                        }}
                    >
                        <Image
                            contentFit='contain'
                            source={require('../assets/images/hero_mobile_app4.png')}
                            style={{
                                width:  width > 1380 ? width * 0.5 : width * 0.8,
                                maxWidth: 500,
                                aspectRatio: 837.86 / 672.9
                            }}
                        />
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        gap: normalize(120),
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        paddingHorizontal: SPACING.page_horizontal,
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={styles.heroStatsNumber}
                        >
                            30+
                        </Text>
                        <Text style={styles.heroStatsText}>
                            Aktivních klientů
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={styles.heroStatsNumber}
                        >
                            100+
                        </Text>
                        <Text style={styles.heroStatsText}>
                            Tipů každý měsíc
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={styles.heroStatsNumber}
                        >
                            10 let
                        </Text>
                        <Text style={styles.heroStatsText}>
                            Zkušeností v sázení
                        </Text>
                    </View>
                </View>
            </View>

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