import { StyleSheet, Text, Touchable, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { SPACING, FONT_SIZES, FONTS, COLORS } from '../constants'
import { Image } from 'expo-image'
import { normalize } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'
import HoverableView from './elements/HoverableView'
import { Link } from 'react-router-dom'
import withSearchParams from './hoc/withSearchParams'

const STEPS = [
    {
        id: 1,
        content: (searchParams) => (
            <>
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
            </>
        ),
        image: (width) => <Image
                    source={require('../assets/images/mobile_mock.png')}
                    style={{
                        width,
                        maxWidth: 500,
                        aspectRatio: 457 / 344,
                        alignSelf: 'center'
                    }}
                    contentFit='cover'
                />
    },
    {
        id: 2,
        content: (searchParams) => (
            <>
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
                        hoveredBackgroundColor={COLORS.accentHoveredSecondary}
                        backgroundColor={COLORS.accentSecondary}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            width: 'fit-content',
                            //boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.35)',
                            paddingHorizontal: SPACING.x_small,
                            paddingVertical: SPACING.xx_small,
                            borderWidth: 1,
                            borderColor: COLORS.accentSecondaryBorder
                        }}
                        withCustomButtonHeight
                        withHoverableArrow
                        arrowColor={COLORS.accent}
                    >
                        <Text
                            style={{
                                color: COLORS.accent,
                                fontFamily: FONTS.medium,
                                fontSize: FONT_SIZES.large
                            }}
                        >
                            Zaregistrovat se
                        </Text>
                    </HoverableView>
                </Link>
            </>
        ),
        image: (width) => <Image
                    source={require('../assets/images/mobile_mock.png')}
                    style={{
                        width,
                        maxWidth: 500,
                        aspectRatio: 457 / 344,
                        alignSelf: 'center'
                    }}
                    contentFit='cover'
                />
    },
    {
        id: 3,
        content: (searchParams) => (
            <>
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
                        paddingHorizontal: SPACING.x_small,
                        gap: SPACING.xx_small,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: COLORS.accent
                    }}
                >
                    <Image
                        source={require('../assets/images/guarantee.png')}
                        style={{
                            width: normalize(70),
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
            </>
        ),
        image: (width) => <Image
                    source={require('../assets/images/mobile_mock.png')}
                    style={{
                        width,
                        maxWidth: 500,
                        aspectRatio: 457 / 344,
                        alignSelf: 'center'
                    }}
                    contentFit='cover'
                />
    },
    {
        id: 4,
        content: (searchParams) => (
            <>
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
                                borderColor: COLORS.accentSecondaryBorder
                            }}
                            withCustomButtonHeight
                            withHoverableArrow
                            arrowColor={COLORS.accent}
                            backgroundColor={COLORS.accentSecondary}
                            hoveredBackgroundColor={COLORS.accentHoveredSecondary}
                        >
                            <Text
                                style={{
                                    color: COLORS.accent,
                                    fontFamily: FONTS.regular,
                                    fontSize: FONT_SIZES.large
                                }}
                            >
                                Zobrazit balíčky
                            </Text>
                        </HoverableView>
                    </Link>
                </View>
            </>
        ),
        image: (width) => <Image
                    source={require('../assets/images/mobile_mock.png')}
                    style={{
                        width,
                        maxWidth: 500,
                        aspectRatio: 457 / 344,
                        alignSelf: 'center'
                    }}
                    contentFit='cover'
                />
    }
]

const StepCountMarker = ({ stepCount }) => (
    <>
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
                {stepCount}
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
    </>
)

const Step = ({ isSmallScreen, index, isEven, step, searchParams, imageWidth }) => {

    return isSmallScreen ? (
        <View style={{
            flexDirection: 'row',
            gap: SPACING.large,
            //alignSelf: 'flex-start'
        }}>
            <View
                style={{
                    flexGrow: 0,
                    flexShrink: 1
                }}
            >
                <StepCountMarker stepCount={index + 1} />
            </View>

            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                {step.content(searchParams)}
            </View>
        </View>
    ) : (
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
                {isEven ? step.content(searchParams) : step.image(imageWidth)}
            </View>
            <View
                style={{
                    flexGrow: 0
                }}
            >
                <StepCountMarker stepCount={index + 1} />
            </View>
            <View
                style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    paddingBottom: normalize(100)
                }}
            >
                {!isEven ? step.content(searchParams) : step.image(imageWidth)}
            </View>
        </View>
    )
}

const Steps = ({ searchParams }) => {
    const { width } = useWindowDimensions()

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
                    {STEPS.map((step, index) => (
                        <Step
                            key={index}
                            index={index}
                            step={step}
                            searchParams={searchParams}
                            isSmallScreen={width < 1000}
                            isEven={index % 2 === 0}
                            imageWidth={width * 0.2}
                        />
                    ))}
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