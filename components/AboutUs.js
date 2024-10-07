import React, { useRef, useEffect } from 'react'
import { View, useWindowDimensions, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../constants'
import { Image } from 'expo-image'
import { normalize } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'react-router-dom'
import CountInNumber from './animated/CountInNumber'
import HoverableView from './elements/HoverableView'

import withSearchParams from './hoc/withSearchParams'

const AboutUs = ({ searchParams }) => {
    const { width } = useWindowDimensions()

    //const numbersFontSize = width < 500 ? (width - SPACING.page_horizontal * 2) * 0.07 : (500 - SPACING.page_horizontal * 2) * 0.08

    const onContactUsPress = () => { }

    return (
        <View
            dataSet={{ id: 'about-us' }}
            style={{
                width: '100%',
                alignItems: 'center',
                zIndex: 2,
                marginTop: normalize(150)
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
                    top: -SPACING.x_large,
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
                    width: width > 1380 ? width * 0.3 : width - SPACING.page_horizontal * 2,
                    maxWidth: 500
                }}>
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
                            maxWidth: 500,
                            lineHeight: FONT_SIZES.large * 1.3
                        }}
                    >
                        Jsme tým profesionálních tipařů poskytujících přesné a spolehlivé tipy na sázení. S našimi radami můžete činit informovaná rozhodnutí a zvýšit své šance na výhru.
                        Jsme tým profesionálních tipařů poskytujících přesné a spolehlivé tipy na sázení. S našimi radami můžete činit informovaná rozhodnutí a zvýšit své šance na výhru.
                    </Text>

                    <Link
                        style={{
                            textDecoration: 'none',
                            width: 'fit-content'
                        }}
                        to={{ hash: '#contact', search: new URLSearchParams(searchParams).toString() }}
                    >
                        <HoverableView
                            hoveredOpacity={0.8}
                            //backgroundColor={COLORS.whiteBackground}
                            style={{
                                borderRadius: 10,
                                width: 'fit-content',
                                marginTop: 20,
                                borderWidth: 1,
                                borderColor: COLORS.accent,
                                paddingHorizontal: SPACING.x_small,
                                paddingVertical: SPACING.xx_small,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            withCustomButtonHeight
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontFamily: FONTS.regular,
                                    fontSize: FONT_SIZES.large
                                }}
                            >
                                Zobrazit více
                            </Text>
                        </HoverableView>
                    </Link>

                    {/* <View
                        style={{
                            flexDirection: 'row',
                            gap: SPACING.medium,
                            justifyContent: 'flex-start',
                            marginTop: 40,
                            flexWrap: 'wrap',
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                //alignItems: 'center'
                            }}
                        >
                            <CountInNumber
                                number={30}
                                textStyle={{
                                    fontFamily: FONTS.regular,
                                    fontSize: numbersFontSize,
                                    color: COLORS.accent
                                }}
                                trailingTextAfterFinish='+'
                                step={2}
                            />
                            <Text style={{
                                fontFamily: FONTS.light,
                                fontSize: FONT_SIZES.large,
                                color: COLORS.grey400,
                                marginTop: 5
                            }}>
                                Klientů
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                            }}
                        >
                            <CountInNumber
                                number={20}
                                textStyle={{
                                    fontFamily: FONTS.regular,
                                    fontSize: numbersFontSize,
                                    color: COLORS.accent
                                }}
                                trailingTextAfterFinish='+'
                                duration={150}
                            />
                            <Text style={{
                                fontFamily: FONTS.light,
                                fontSize: FONT_SIZES.large,
                                color: COLORS.grey400,
                                marginTop: 5
                            }}>
                                Tipů za měsíc
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <CountInNumber
                                number={10}
                                textStyle={{
                                    fontFamily: FONTS.regular,
                                    fontSize: numbersFontSize,
                                    color: COLORS.accent
                                }}
                                trailingText=' let'
                            />
                            <Text style={{
                                fontFamily: FONTS.light,
                                fontSize: FONT_SIZES.large,
                                color: COLORS.grey400,
                                marginTop: 5
                            }}>
                                Zkušeností
                            </Text>
                        </View>
                    </View> */}
                </View>
                <View style={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    zIndex: 2,
                    width: width > 1380 ? width * 0.3 : width - SPACING.page_horizontal * 2,
                    //alignItems: 'center'
                }}>
                    <Image
                        source={require('../assets/images/about_us.png')}
                        style={{
                            width: '100%',
                            maxWidth: 500,
                            aspectRatio: 748 / 574,
                            alignSelf: 'center',
                            zIndex: 2
                        }}
                        contentFit='cover'
                    />
                </View>
            </View>
        </View>
    )
}

export default withSearchParams(AboutUs, ['language'])