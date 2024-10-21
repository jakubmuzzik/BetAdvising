import React, { useRef, useEffect } from 'react'
import { View, useWindowDimensions, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../constants'
import { Image } from 'expo-image'
import { normalize } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'react-router-dom'
import CountInNumber from './animated/CountInNumber'
import HoverableView from './elements/HoverableView'
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'

import withSearchParams from './hoc/withSearchParams'

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
                width: isSmallScreen ? '100%' : 'auto',
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
                        backgroundColor: COLORS.accentSecondaryTransparent,
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
                        backgroundColor: COLORS.accentSecondaryTransparent,
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
                    Zdarma vstupních 100 kreditů
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
                        backgroundColor: COLORS.accentSecondaryTransparent,
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

const AboutUs = ({ searchParams }) => {
    const { width } = useWindowDimensions()

    //const numbersFontSize = width < 500 ? (width - SPACING.page_horizontal * 2) * 0.07 : (500 - SPACING.page_horizontal * 2) * 0.08

    const onContactUsPress = () => { }

    return (
        <View
            dataSet={{ id: 'about-us' }}
            style={{
                paddingHorizontal: SPACING.page_horizontal,
                marginTop: 50
            }}
        >
            <View style={{
                maxWidth: 800,
                alignItems: 'center',
                margin: 'auto',
                marginTop: 64
            }}>
                <span
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.h1,
                        color: COLORS.white,
                        textAlign: 'center',
                        maxWidth: 500,
                        marginBottom: 10,
                        //background: `linear-gradient(90deg, ${COLORS.white}, ${COLORS.grey400})`,
                        background: `linear-gradient(180deg, ${COLORS.white}, rgba(255, 255, 255, 0.7))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Nechte se inspirovat
                </span>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.grey400,
                        lineHeight: FONT_SIZES.large * 1.5,
                        textAlign: 'center',
                    }}
                >
                    Jsme tým profesionálních sázkařů s dlouholetými zkušenostmi. Jsme tu pro všechny, kteří chtějí sázet a vyhrávat.
                </Text>
            </View>

            <KeyFeatues width={width} />
        </View>
    )

    /*return (
        <View
            dataSet={{ id: 'about-us' }}
            style={{
                width: '100%',
                alignItems: 'center',
                zIndex: 2,
                marginTop: 950,
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
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.grey400,
                            marginTop: 10,
                            maxWidth: 500,
                            lineHeight: FONT_SIZES.large * 1.4
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
                            backgroundColor={COLORS.accentSecondary}
                            hoveredBackgroundColor={COLORS.accentHoveredSecondary}
                            style={{
                                borderRadius: 10,
                                width: 'fit-content',
                                marginTop: 20,
                                borderWidth: 1,
                                borderColor: COLORS.accentSecondaryBorder,
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
                                    color: COLORS.accent,
                                    fontFamily: FONTS.medium,
                                    fontSize: FONT_SIZES.large
                                }}
                            >
                                Zobrazit více
                            </Text>
                        </HoverableView>
                    </Link>

                    <View
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
                    </View>
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
    )*/
}

export default withSearchParams(AboutUs, ['language'])