import { useEffect } from 'react'
import { StyleSheet, Text, Touchable, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { SPACING, FONT_SIZES, FONTS, COLORS } from '../constants'
import { Image } from 'expo-image'
import { normalize } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'
import HoverableView from './elements/HoverableView'
import { Link } from 'react-router-dom'
import withSearchParams from './hoc/withSearchParams'
import VanillaTilt from 'vanilla-tilt'
import {isBrowser } from 'react-device-detect'

const SEPARATOR_TOP_INSET = 20
const STEP_COUNT_MARKER_SIZE = 35

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
                        borderColor: COLORS.accent,
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
        image: (width) => (
            <View
                style={{
                    borderRadius: 10,
                    borderColor: COLORS.whiteBackground2,
                    //borderWidth: 1,
                    transform: [
                        { rotateX: '20deg' },
                        { rotateY: '-20deg' },
                        { rotateZ: '20deg' },
                        //{ scale: withTiming(isHovered ? 1.1 : 1, { duration: 200 }) }
                    ],
                    width,
                maxWidth: 500,
                aspectRatio: 1811 / 2135,
                        alignSelf: 'center',
                }}
            >
                <Image
                    source={require('../assets/images/tickets_mock3.png')}
                    style={{
                        flex: 1
                    }}
                    contentFit='cover'
                    contentPosition='top center'
                />
               <LinearGradient
                    colors={['rgba(22,22,22,0)', COLORS.primary]}
                    style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}
                />
            </View>
        )
        
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
    <View
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            //bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2
        }}
    >
        <LinearGradient
            colors={['#957308', COLORS.accent]}
            style={{
                borderRadius: 17.5,
                top: 20,
                width: STEP_COUNT_MARKER_SIZE,
                height: STEP_COUNT_MARKER_SIZE,
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
    </View>
)

const Step = ({ isSmallScreen, index, isEven, step, searchParams, imageWidth }) => {

    return (
        <LinearGradient
            dataSet={{ id: 'step' }}
            colors={isSmallScreen ? [COLORS.secondary, COLORS.secondary, COLORS.primary] : isEven ? [COLORS.secondary, COLORS.secondary, COLORS.primary] : [COLORS.primary, COLORS.secondary, COLORS.secondary]}
            locations={isSmallScreen ? [0, 0.9, 0.9] : isEven ? [0, 0.5, 0.6] : [0.4, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={isSmallScreen ? { x: 0, y: 1 } : { x: 1, y: 0 }}
            style={{
                flexDirection: isSmallScreen ? (isEven ? 'column' : 'column-reverse') : 'row',
                gap: isSmallScreen ? SPACING.xx_large : 150,
                paddingHorizontal: isSmallScreen ? SPACING.medium : SPACING.xx_large,
                paddingTop: STEP_COUNT_MARKER_SIZE + SEPARATOR_TOP_INSET + SPACING.large,
                paddingBottom: 64,
                borderRadius: 20,
                overflow: 'hidden',
                justifyContent: 'flex-start'
            }}
        >

            {!isSmallScreen && (
                <>
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            [!isEven ? 'right' : 'left']: 0,
                            width: '60%',
                            height: '100%',
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: COLORS.whiteBackground2
                        }}
                    />
                    <LinearGradient
                        colors={!isEven ? [COLORS.primary, 'rgba(255,255,255,0)'] : ['rgba(255,255,255,0)', COLORS.primary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            [!isEven ? 'right' : 'left']: 1,
                            width: '60%',
                            height: '100%'
                        }}
                    />
                </>
            )}

            {isSmallScreen && (
                <>
                    <View
                        style={{
                            position: 'absolute',
                            top: 1,
                            right: 0,
                            left: 0,
                            width: '100%',
                            height: '90%',
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: COLORS.whiteBackground2
                        }}
                    />
                    <LinearGradient
                        colors={['rgba(255,255,255,0)', COLORS.primary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{
                            position: 'absolute',
                            top: 2,
                            left: 0,
                            right: 0,
                            height: '90%',
                            width: '100%'
                        }}
                    />
                </>
            )}

            <View
                style={isSmallScreen ? {} : {
                    flex: 1
                }}
            >
                {isEven ? step.content(searchParams) : step.image(imageWidth)}
            </View>

            <StepCountMarker stepCount={index + 1} />

            <View
                style={isSmallScreen ? {} : {
                    flex: 1
                }}
            >
                {isEven ? step.image(imageWidth) : step.content(searchParams)}
            </View>
        </LinearGradient>
    )
}

const Steps = ({ searchParams }) => {
    const { width } = useWindowDimensions()

    useEffect(() => {
        if (!isBrowser) return

        VanillaTilt.init(document.querySelectorAll(`[data-id="step"]`), {
            max: 2,
            speed: 200,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            reverse: true,
            glare: true,
            "max-glare": 0.1,
        })
    }, [])

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
                    borderColor: COLORS.grey400,
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
                            maxWidth: 500
                        }}
                    >
                        Připraveni vydělávat sázením?
                    </Text>

                    <LinearGradient
                        colors={['rgba(255,255,255,.0)', COLORS.accent]}
                        locations={[0, 0.4]}
                        style={{
                            height: 120,
                            width: 1,
                            marginTop: 32,
                            marginBottom: -SEPARATOR_TOP_INSET,
                            zIndex: 2
                        }}
                    />

                    <View
                        style={{
                            //gap: 128
                        }}
                    >
                        {STEPS.map((step, index) => (
                            <>
                            <Step
                                key={index}
                                index={index}
                                step={step}
                                searchParams={searchParams}
                                isSmallScreen={width < 1000}
                                isEven={index % 2 === 0}
                                imageWidth={width * 0.2}
                                />
                                {index !== STEPS.length - 1 && <LinearGradient
                                    colors={['rgba(255,255,255,.0)', COLORS.accent]}
                                    locations={[0, 0.4]}
                                    style={{
                                        height: 100,
                                        width: 1,
                                        margin: 'auto',
                                        marginBottom: -SEPARATOR_TOP_INSET,
                                        zIndex: 2
                                        //marginTop: 32
                                    }}
                                />}
                            </>
                        ))}
                    </View>
                </View>
            </View>
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