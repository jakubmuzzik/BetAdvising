import { StyleSheet, Text, Touchable, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { SPACING, FONT_SIZES, FONTS, COLORS } from '../constants'
import { Image } from 'expo-image'
import { normalize } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'
import HoverableView from './HoverableView'

const Steps = () => {
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
                    Stáhnete si aplikaci Bet4You
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Stáhnětě si naší mobilní aplikaci dostupnou na App Store a Google Play
                </Text>
                <View style={{
                    marginTop: SPACING.large,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: SPACING.small
                }}>
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        <Image
                            source={require('../assets/images/app_store.png')}
                            style={{
                                height: 50,
                                aspectRatio: 201 / 70
                            }}
                            contentFit='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        <Image
                            source={require('../assets/images/google_play.png')}
                            style={{
                                height: 50,
                                aspectRatio: 236 / 70
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
                    colors={[COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
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
                    colors={[COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
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
                    Stáhnete si aplikaci Bet4You
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Stáhnětě si naší mobilní aplikaci dostupnou na App Store a Google Play
                </Text>
                <View style={{
                    marginTop: SPACING.large,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: SPACING.small
                }}>
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        <Image
                            source={require('../assets/images/app_store.png')}
                            style={{
                                height: 50,
                                aspectRatio: 201 / 70
                            }}
                            contentFit='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        <Image
                            source={require('../assets/images/google_play.png')}
                            style={{
                                height: 50,
                                aspectRatio: 236 / 70
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
                    colors={[COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
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
                    Vyberte si balíček
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Vyberte si z 5ti balíčků dle počtu kreditů, za které poté můžete odemykat profesionální tipy.
                </Text>
                <View style={{
                    marginTop: SPACING.large
                }}>
                    <HoverableView
                        hoveredOpacity={0.8}
                        backgroundColor={COLORS.whiteBackground}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            width: 'fit-content',
                            borderWidth: 1,
                            borderColor: COLORS.grey300,
                        }}
                    >
                        <TouchableOpacity
                            //onPress={onGetAppPress}
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
                                    color: COLORS.grey300,
                                    fontFamily: FONTS.regular,
                                    fontSize: FONT_SIZES.medium
                                }}
                            >
                                Zobrazit balíčky →
                            </Text>
                        </TouchableOpacity>
                    </HoverableView>
                </View>
            </View>
        </View>
    )

    const renderSecondStepSmall = () => (
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
                    colors={[COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
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
                    Vyberte si balíček
                </Text>
                <Text
                    style={styles.stepText}
                >
                    Vyberte si z 5ti balíčků dle počtu kreditů, za které poté můžete odemykat profesionální tipy.
                </Text>
                <View style={{
                    marginTop: SPACING.large
                }}>
                    <HoverableView
                        hoveredOpacity={0.8}
                        backgroundColor={COLORS.whiteBackground}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            width: 'fit-content',
                            borderWidth: 1,
                            borderColor: COLORS.grey300,
                        }}
                    >
                        <TouchableOpacity
                            //onPress={onGetAppPress}
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
                                    color: COLORS.grey300,
                                    fontFamily: FONTS.regular,
                                    fontSize: FONT_SIZES.medium
                                }}
                            >
                                Zobrazit balíčky →
                            </Text>
                        </TouchableOpacity>
                    </HoverableView>
                </View>
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
                    Odemknětě si naše tipy
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
                    colors={[COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
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
                    colors={[COLORS.accent, '#957308']}
                    style={{
                        borderRadius: 17.5,
                        width: 35,
                        height: 35,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
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
                    Odemknětě si naše tipy
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

    return (
        <View
            style={{
                paddingHorizontal: SPACING.page_horizontal,
                width: '100%',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    maxWidth: 1680,
                    flex: 1,
                    borderWidth: 1,
                    borderColor: COLORS.grey400,
                    backgroundColor: 'rgba(255,255,255,.05)',
                    borderRadius: 10
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
                        3 jednoduché kroky k získání těch nejlepší tipů
                    </Text>

                    <View>
                        {width > 1000 ? renderFirstStepLarge() : renderFirstStepSmall()}

                        {width > 1000 ? renderSecondStepLarge() : renderSecondStepSmall()}

                        {width > 1000 ? renderThirdStepLarge() : renderThirdStepSmall()}
                    </View>
                </View>
            </View>
            <LinearGradient
                colors={['rgba(22,22,22,0)', COLORS.primary]}
                style={{ position: 'absolute', bottom: -1,  height: 200, right: 0, left: 0 }}
                locations={[0, 0.75]}
            />
        </View>
    )
}

export default Steps

const styles = StyleSheet.create({
    stepHeaderText: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.h3,
        color: COLORS.white,
        marginBottom: 10
    },
    stepText: {
        fontFamily: FONTS.light,
        fontSize: FONT_SIZES.large,
        color: COLORS.grey400,
        lineHeight: FONT_SIZES.large * 1.5
    }
})