import { StyleSheet, Text, Touchable, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { SPACING, FONT_SIZES, FONTS, COLORS } from '../constants'
import { Image } from 'expo-image'
import { normalize } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'
import HoverableView from './elements/HoverableView'
import { Link } from 'react-router-dom'
import withSearchParams from './hoc/withSearchParams'

const Steps = ({ searchParams }) => {
    const { width } = useWindowDimensions()

    const renderFirstStepLarge = () => (
        <View style={{
            flexDirection: 'row',
            gap: SPACING.large
        }}>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Text
                    style={styles.stepHeaderText}
                >
                    Otevřete si účet u sázkové kanceláře
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Pro použití tipů od našich expertů budete potřebovat aktivní účet u sázkové kanceláře. Pokud hledáte důvěryhodnou platformu, podívejte se na naše partnery a využijte exkluzivních nabídek a bonusů!
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.grey400,
                        marginTop: SPACING.large
                    }}
                >
                    Naše doporučené sázkové kanceláře:
                </Text>

                <View style={{
                    marginTop: SPACING.small,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: SPACING.small
                }}>
                    <TouchableOpacity
                        style={{
                            //borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: SPACING.xx_small,
                            borderRadius: 10,
                            borderColor: COLORS.grey400
                        }}
                        onPress={() => { }}
                    >
                        <Image
                            source={require('../assets/logos/tipsport.png')}
                            style={{
                                height: 25,
                                aspectRatio: 300 / 68
                            }}
                            contentFit='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            //borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: SPACING.xx_small,
                            borderRadius: 10,
                            borderColor: COLORS.grey400
                        }}
                        onPress={() => { }}
                    >
                        <Image
                            source={require('../assets/logos/chance.svg')}
                            style={{
                                height: 25,
                                aspectRatio: 300 / 68
                            }}
                            contentFit='contain'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flexGrow: 0
                }}
            >
                <LinearGradient
                    colors={['#957308', COLORS.accent]}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.15)'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.extraBold,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.primary,
                        }}
                    >
                        1
                    </Text>
                </LinearGradient>
                <LinearGradient
                    colors={['#957308', COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 1,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginVertical: SPACING.small
                    }}
                />
            </View>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Image
                    source={require('../assets/images/mobile_mock.png')}
                    style={{
                        width: width * 0.2,
                        maxWidth: 500,
                        aspectRatio: 457 / 344,
                        alignSelf: 'center'
                    }}
                    contentFit='cover'
                />
            </View>
        </View>
    )

    const renderFirstStepSmall = () => (
        <View style={{
            flexDirection: 'row',
            gap: SPACING.large,
            //alignSelf: 'flex-start'
        }}>
            <View
                style={{
                    flexGrow: 0
                }}
            >
                <LinearGradient
                    colors={['#957308', COLORS.accent]}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.15)'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.extraBold,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.primary,
                        }}
                    >
                        1
                    </Text>
                </LinearGradient>
                <LinearGradient
                    colors={['#957308', COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 1,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginVertical: SPACING.small
                    }}
                />
            </View>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Text
                    style={styles.stepHeaderText}
                >
                    Otevřete si účet u sázkové kanceláře
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Pro použití tipů od našich expertů budete potřebovat aktivní účet u sázkové kanceláře. Pokud hledáte důvěryhodnou platformu, podívejte se na naše partnery a využijte exkluzivních nabídek a bonusů!
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.grey400,
                        marginTop: SPACING.large
                    }}
                >
                    Naše doporučené sázkové kanceláře:
                </Text>

                <View style={{
                    marginTop: SPACING.small,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: SPACING.small
                }}>
                    <TouchableOpacity
                        style={{
                            //borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: SPACING.xx_small,
                            borderRadius: 10,
                            borderColor: COLORS.grey400
                        }}
                        onPress={() => { }}
                    >
                        <Image
                            source={require('../assets/logos/tipsport.png')}
                            style={{
                                height: 25,
                                aspectRatio: 300 / 68
                            }}
                            contentFit='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            //borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: SPACING.xx_small,
                            borderRadius: 10,
                            borderColor: COLORS.grey400
                        }}
                        onPress={() => { }}
                    >
                        <Image
                            source={require('../assets/logos/chance.svg')}
                            style={{
                                height: 25,
                                aspectRatio: 300 / 68
                            }}
                            contentFit='contain'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    const renderSecondStepLarge = () => (
        <View style={{
            flexDirection: 'row',
            gap: SPACING.large
        }}>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Image
                    source={require('../assets/images/mobile_mock.png')}
                    style={{
                        width: width * 0.2,
                        maxWidth: 500,
                        aspectRatio: 457 / 344,
                        alignSelf: 'center'
                    }}
                    contentFit='cover'
                />
            </View>
            <View
                style={{
                    flexGrow: 0
                }}
            >
                <LinearGradient
                    colors={['#957308', COLORS.accent]}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.15)'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.extraBold,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.primary,
                        }}
                    >
                        2
                    </Text>
                </LinearGradient>
                <LinearGradient
                    colors={['#957308', COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 1,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginVertical: SPACING.small
                    }}
                />
            </View>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Text
                    style={styles.stepHeaderText}
                >
                    Zaregistrujte se a získejte 200 kreditů zdarma
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Zaregistrujte se a získejte zdarma 200 kreditů, které můžete využít na odemykání tipů.
                </Text>
                <Link
                    style={{
                        textDecoration: 'none',
                        marginTop: SPACING.large,
                    }}
                    to={{ pathname: '/auth', search: new URLSearchParams(searchParams).toString() }}
                >
                    <HoverableView
                        hoveredOpacity={0.85}
                        backgroundColor={[COLORS.accent2, COLORS.accent, COLORS.accent, COLORS.accent2]}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            width: 'fit-content',
                            //boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.35)',
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
        </View>
    )

    const renderSecondStepSmall = () => (
        <View style={{
            flexDirection: 'row',
            gap: SPACING.large
            //alignSelf: 'flex-start'
        }}>
            <View
                style={{
                    flexGrow: 0,
                    flexShrink: 1
                }}
            >
                <LinearGradient
                    colors={['#957308', COLORS.accent]}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.15)'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.extraBold,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.primary,
                        }}
                    >
                        2
                    </Text>
                </LinearGradient>
                <LinearGradient
                    colors={['#957308', COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 1,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginVertical: SPACING.small
                    }}
                />
            </View>

            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Text
                    style={styles.stepHeaderText}
                >
                    Zaregistrujte se a získejte 200 kreditů zdarma
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Zaregistrujte se a získejte zdarma 200 kreditů, které můžete využít na odemykání tipů.
                </Text>
                <Link
                    style={{
                        textDecoration: 'none',
                        marginTop: SPACING.large,
                    }}
                    to={{ pathname: '/auth', search: new URLSearchParams(searchParams).toString() }}
                >
                    <HoverableView
                        hoveredOpacity={0.85}
                        backgroundColor={[COLORS.accent2, COLORS.accent, COLORS.accent, COLORS.accent2]}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            width: 'fit-content',
                            //boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.35)',
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
        </View>
    )

    const renderThirdStepLarge = () => (
        <View style={{
            flexDirection: 'row',
            gap: SPACING.large
        }}>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Text
                    style={styles.stepHeaderText}
                >
                    Odemykejte si naše tipy a začněte vydělávat
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Za nakoupené kredity odemykejte sázkařské tipy. Sázky na tyto tipy můžete umístit u vaší sázkové kanceláře. Pokud vybraný tiket nevyjde, vrátíme vám veškeré kredity.
                </Text>

                <LinearGradient
                    colors={['rgba(255, 204, 44, 0.38)', 'rgba(153, 122, 27, 0.38)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        marginTop: SPACING.large,
                        flexShrink: 1,
                        width: 'fit-content',
                        //flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingVertical: SPACING.xx_small,
                        paddingHorizontal: SPACING.small,
                        gap: SPACING.medium,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: COLORS.accent
                    }}
                >
                    <Image
                        source={require('../assets/images/guarantee.png')}
                        style={{
                            width: 80,
                            aspectRatio: 99 / 92,
                        }}
                        contentFit='contain'
                    />
                    <View
                        style={{
                            flexShrink: 1
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: FONT_SIZES.large,
                                color: COLORS.white
                            }}
                        >
                            Garance vrácení kreditů
                        </Text>
                        <Text
                            style={{
                                fontFamily: FONTS.light,
                                fontSize: FONT_SIZES.medium,
                                color: COLORS.grey400,
                                marginTop: 5
                            }}
                        >
                            Pokud vybraný tiket nevyjde, vrátíme vám veškeré kredity
                        </Text>
                    </View>
                </LinearGradient>
            </View>
            <View
                style={{
                    flexGrow: 0
                }}
            >
                <LinearGradient
                    colors={['#957308', COLORS.accent]}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.15)'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.extraBold,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.primary,
                        }}
                    >
                        3
                    </Text>
                </LinearGradient>
                <LinearGradient
                    colors={['#957308', COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 1,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginVertical: SPACING.small
                    }}
                />
            </View>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Image
                    source={require('../assets/images/mobile_mock.png')}
                    style={{
                        width: width * 0.2,
                        maxWidth: 500,
                        aspectRatio: 457 / 344,
                        alignSelf: 'center'
                    }}
                    contentFit='cover'
                />
            </View>
        </View>
    )

    const renderThirdStepSmall = () => (
        <View style={{
            flexDirection: 'row',
            gap: SPACING.large,
            //alignSelf: 'flex-start'
        }}>
            <View
                style={{
                    flexGrow: 0
                }}
            >
                <LinearGradient
                    colors={['#957308', COLORS.accent]}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.15)'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.extraBold,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.primary,
                        }}
                    >
                        3
                    </Text>
                </LinearGradient>
                <LinearGradient
                    colors={['#957308', COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 1,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginVertical: SPACING.small
                    }}
                />
            </View>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Text
                    style={styles.stepHeaderText}
                >
                    Odemykejte si naše tipy a začněte vydělávat
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Za nakoupené kredity následně v aplikaci odemykejte sázkařské tipy.
                </Text>

                <LinearGradient
                    colors={['rgba(255, 204, 44, 0.38)', 'rgba(153, 122, 27, 0.38)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        marginTop: SPACING.large,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingVertical: SPACING.xx_small,
                        paddingHorizontal: SPACING.small,
                        gap: SPACING.medium,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: COLORS.accent,
                        maxWidth: 500,
                    }}
                >
                    <Image
                        source={require('../assets/images/guarantee.png')}
                        style={{
                            flex: 1,
                            aspectRatio: 99 / 92,
                            flexShrink: 1,
                            minWidth: 50
                        }}
                        contentFit='contain'
                    />
                    <View
                        style={{
                            flexShrink: 1
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: FONT_SIZES.large,
                                color: COLORS.white
                            }}
                        >
                            Garance vrácení kreditů
                        </Text>
                        <Text
                            style={{
                                fontFamily: FONTS.light,
                                fontSize: FONT_SIZES.medium,
                                color: COLORS.grey400,
                                marginTop: 5
                            }}
                        >
                            Pokud vybraný tiket nevyjde, vrátíme vám veškeré kredity
                        </Text>
                    </View>
                </LinearGradient>
            </View>
        </View>
    )

    const renderFourthStepLarge = () => (
        <View style={{
            flexDirection: 'row',
            gap: SPACING.large
        }}>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Image
                    source={require('../assets/images/mobile_mock.png')}
                    style={{
                        width: width * 0.2,
                        maxWidth: 500,
                        aspectRatio: 457 / 344,
                        alignSelf: 'center'
                    }}
                    contentFit='cover'
                />
            </View>
            <View
                style={{
                    flexGrow: 0
                }}
            >
                <LinearGradient
                    colors={['#957308', COLORS.accent]}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.15)'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.extraBold,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.primary,
                        }}
                    >
                        4
                    </Text>
                </LinearGradient>

            </View>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Text
                    style={styles.stepHeaderText}
                >
                    Dokupte si kredity
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Pokud s námi budete chtít spokojení, můžete si dokoupit kredity. Čím více kreditů si zakoupíte, tím více tipů můžete odemykat.
                </Text>
                <View style={{
                    marginTop: SPACING.large
                }}>
                    <Link
                        style={{
                            textDecoration: 'none',
                        }}
                        to={{ hash: '#packages', search: new URLSearchParams(searchParams).toString() }}
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
                                borderColor: COLORS.accent
                            }}
                            withCustomButtonHeight
                            withHoverableArrow
                            arrowColor={COLORS.white}
                            hoveredOpacity={0.8}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontFamily: FONTS.regular,
                                    fontSize: FONT_SIZES.large
                                }}
                            >
                                Zobrazit balíčky
                            </Text>
                        </HoverableView>
                    </Link>
                </View>
            </View>
        </View>
    )

    const renderFourthStepSmall = () => (
        <View style={{
            flexDirection: 'row',
            gap: SPACING.large,
            //alignSelf: 'flex-start'
        }}>
            <View
                style={{
                    flexGrow: 0
                }}
            >
                <LinearGradient
                    colors={['#957308', COLORS.accent]}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.35)'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.extraBold,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.primary,
                        }}
                    >
                        4
                    </Text>
                </LinearGradient>
            </View>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                <Text
                    style={styles.stepHeaderText}
                >
                    Dokupte si kredity
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Zakupte si kredity, které můžete využít na odemykání tipů. Čím více kreditů si zakoupíte, tím více tipů můžete odemykat.
                </Text>
                <View style={{
                    marginTop: SPACING.large
                }}>
                    <Link
                        style={{
                            textDecoration: 'none',
                        }}
                        to={{ hash: '#packages', search: new URLSearchParams(searchParams).toString() }}
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
                                borderColor: COLORS.accent
                            }}
                            withCustomButtonHeight
                            withHoverableArrow
                            arrowColor={COLORS.white}
                            hoveredOpacity={0.8}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontFamily: FONTS.regular,
                                    fontSize: FONT_SIZES.large
                                }}
                            >
                                Zobrazit balíčky
                            </Text>
                        </HoverableView>
                    </Link>
                </View>
            </View>
        </View>
    )

    return (
        <View
            dataSet={{ id: 'how-it-works' }}
            style={{
                paddingHorizontal: SPACING.page_horizontal,
                width: '100%',
                alignItems: 'center',
                marginTop: normalize(200)
            }}
        >
            <View
                style={{
                    maxWidth: 1680,
                    flex: 1,
                    borderWidth: 1,
                    borderColor: COLORS.grey400,
                    backgroundColor: 'rgba(255,255,255,.05)',
                    borderRadius: 10,
                    //boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.15)'
                    boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.1)'
                }}
            >
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: SPACING.medium,
                    paddingTop: SPACING.x_large,
                    paddingBottom: normalize(100)
                }}>
                    <Text
                        style={{
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.accent,
                            marginBottom: 5,
                            textAlign: 'center'
                        }}
                    >
                        Jak to funguje
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.h1,
                            color: COLORS.white,
                            textAlign: 'center',
                            maxWidth: 500,
                            marginBottom: normalize(80),
                        }}
                    >
                        Připraveni vydělávat sázením?
                    </Text>

                    <View>
                        {width > 1000 ? renderFirstStepLarge() : renderFirstStepSmall()}

                        {width > 1000 ? renderSecondStepLarge() : renderSecondStepSmall()}

                        {width > 1000 ? renderThirdStepLarge() : renderThirdStepSmall()}

                        {width > 1000 ? renderFourthStepLarge() : renderFourthStepSmall()}
                    </View>
                </View>
            </View>
            <LinearGradient
                colors={['rgba(22,22,22,0)', COLORS.primary]}
                style={{ position: 'absolute', bottom: -10, height: 200, right: 0, left: 0 }}
                locations={[0, 0.75]}
            />
        </View>
    )
}

export default withSearchParams(Steps, ['language'])

const styles = StyleSheet.create({
    stepHeaderText: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.x_large,
        color: COLORS.white,
        marginBottom: 10,
        lineHeight: FONT_SIZES.x_large * 1.3
    },
    stepText: {
        fontFamily: FONTS.regular,
        fontSize: FONT_SIZES.large,
        color: COLORS.grey400,
        lineHeight: FONT_SIZES.large * 1.5
    }
})