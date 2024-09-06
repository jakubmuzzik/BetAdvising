import React from 'react'
import { View, useWindowDimensions, Text, ImageBackground } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../constants'
import { Image } from 'expo-image'
import { normalize } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'

const AboutUs = () => {
    const { width } = useWindowDimensions()

    return (
        <View style={{
            width: '100%',
            alignItems: 'center',
            zIndex: 2
        }}>
            <LinearGradient
                colors={[COLORS.primary, 'rgba(255,255,255,.05)', COLORS.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    position: 'absolute',
                    width: width - SPACING.page_horizontal * 1.5,
                    maxWidth: 1180,
                    height: 500,
                    top: -90,
                    //borderTopWidth: 1,
                    borderColor: COLORS.grey400,
                }}
            >
                <LinearGradient
                    colors={['rgba(255,255,255,0)', COLORS.grey400, 'rgba(255,255,255,.0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        height: 1
                    }}
                />
                <LinearGradient
                    colors={['rgba(255,255,255,0)', COLORS.primary]}
                    style={{ position: 'absolute', bottom: 0, height: 100, right: 0, left: 0 }}
                    locations={[0, 0.75]}
                />
            </LinearGradient>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: width > 1380 ? 'row' : 'column',
                    maxWidth: 1380,
                    paddingHorizontal: SPACING.page_horizontal,
                    //alignSelf: 'center',
                    gap: normalize(60),
                }}
            >
                <View style={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    zIndex: 2,
                    width: width > 1380 ? width * 0.3 : width - SPACING.page_horizontal * 2,
                    //alignItems: 'center'
                }}>
                    <Image
                        source={require('../assets/images/about_us2.png')}
                        style={{
                            width: '100%',// width > 1380 ? width * 0.3 : width * 0.5,
                            maxWidth: 500,
                            aspectRatio: 748 / 574,
                            alignSelf: 'center',
                            zIndex: 2
                        }}
                        contentFit='cover'
                    />
                </View>
                <View style={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    width: width > 1380 ? width * 0.3 : width - SPACING.page_horizontal * 2,
                    maxWidth: 500,
                    //alignItems: 'center'
                }}>
                    {/* <Image
                        source={require('../assets/images/blurred_glow_primary.png')}
                        style={{
                            width: width * 0.3,
                            height: width * 0.3,
                            position: 'absolute',
                            left: -60
                        }}
                        contentFit='contain'
                    /> */}
                    <Text
                        style={{
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.accent,
                            marginBottom: 5
                        }}
                    >
                        O nás
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.h1,
                            color: COLORS.white
                        }}
                    >
                        Nech se inspirovat
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.light,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.grey400,
                            marginTop: 10,
                            maxWidth: 500
                        }}
                    >
                        Jsme tým profesionálních tipařů poskytujících přesné a spolehlivé tipy na sázení. S našimi radami můžete činit informovaná rozhodnutí a zvýšit své šance na výhru.
                        Jsme tým profesionálních tipařů poskytujících přesné a spolehlivé tipy na sázení. S našimi radami můžete činit informovaná rozhodnutí a zvýšit své šance na výhru.
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default AboutUs