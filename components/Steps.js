import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Touchable, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { SPACING, FONT_SIZES, FONTS, COLORS, CUSTOM_BUTTON_HEIGHT } from '../constants'
import { Image } from 'expo-image'
import { normalize } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'
import withSearchParams from './hoc/withSearchParams'
import VanillaTilt from 'vanilla-tilt'
import { isBrowser } from 'react-device-detect'
import HoverableLinkButton from './elements/HoverableLinkButton'
import { Feather, Entypo } from '@expo/vector-icons'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

const SEPARATOR_TOP_INSET = 20
const STEP_COUNT_MARKER_SIZE = 35
const STEP_SMALL_SCREEN_THRESHOLD = 1000

const LoginImage = ({ isSmallScreen }) => {
    return (
        <View
            style={{
                pointerEvents: 'none',
                width: isSmallScreen ? 'auto' : 450,
                maxWidth: '100%',
                margin: 'auto',
                marginVertical: 20,
                borderColor: COLORS.whiteBackground2,
                borderRadius: 10,
                zoom: 0.8
            }}
        >
            <LinearGradient
                style={{
                    padding: SPACING.xx_large,
                    borderRadius: 10,
                    flex: 1,
                    //width: '80%',
                    //marginTop: 50
                }}
                colors={[COLORS.secondary, COLORS.primary]}
                start={{ x: -0.7, y: 0 }}
            >
                <Text
                    style={{
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.white,
                        fontFamily: FONTS.medium
                    }}
                >
                    Registrace
                </Text>
                <Text
                    style={{
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey400,
                        fontFamily: FONTS.regular,
                        marginTop: SPACING.xx_small
                    }}
                >
                    Vyberte si způsob registrace
                </Text>

                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SPACING.large,
                        justifyContent: 'center',
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        height: CUSTOM_BUTTON_HEIGHT,
                        borderWidth: 1,
                        borderColor: COLORS.whiteBackground2,
                    }}
                >
                    <Image
                        source={require('../assets/logos/google.png')}
                        style={{ width: normalize(17), aspectRatio: 1 / 1, marginRight: SPACING.xx_small }}
                    />
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.medium,
                            verticalAlign: 'center',
                            includeFontPadding: false,
                            verticalAlign: 'center',
                            flexShrink: 1
                        }}
                    >
                        Přihlásit se pomocí Google
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.small, marginVertical: SPACING.large }}>
                    <View style={{ flexGrow: 1, borderBottomWidth: 1, borderColor: COLORS.grey400 }} />
                    <Text
                        style={{
                            color: COLORS.grey400,
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.medium,
                            textAlign: 'center'
                        }}
                    >
                        nebo
                    </Text>
                    <View style={{ flexGrow: 1, borderBottomWidth: 1, borderColor: COLORS.grey400 }} />
                </View>

                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: COLORS.secondary2,
                        borderRadius: 10,
                        height: CUSTOM_BUTTON_HEIGHT,
                        borderWidth: 1,
                        borderColor: COLORS.whiteBackground2,
                        paddingHorizontal: SPACING.medium,
                        paddingVertical: SPACING.small
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.medium,
                            verticalAlign: 'center',
                            includeFontPadding: false,
                            verticalAlign: 'center',
                            flexShrink: 1,
                            color: COLORS.grey300
                        }}
                    >
                        Email adresa
                    </Text>
                </View>

                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SPACING.x_small,
                        justifyContent: 'center',
                        backgroundColor: COLORS.accentSecondary,
                        borderRadius: 10,
                        height: CUSTOM_BUTTON_HEIGHT,
                        borderWidth: 1,
                        borderColor: COLORS.accentSecondaryBorder,
                    }}
                >
                    <Feather
                        style={{ marginRight: SPACING.xx_small }}
                        name="mail"
                        size={normalize(17)}
                        color={COLORS.accent}
                    />
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.medium,
                            verticalAlign: 'center',
                            includeFontPadding: false,
                            verticalAlign: 'center',
                            flexShrink: 1,
                            color: COLORS.accent
                        }}
                    >
                        Přihlásit se pomocí Emailu
                    </Text>
                </View>

                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey400,
                        marginTop: SPACING.large,
                        lineHeight: 20,
                    }}
                >
                    Registrací souhlasíte s našimi <Text style={{ textDecorationLine: 'underline', color: COLORS.grey400 }}>všeobecnými obchodními podmínkami</Text> a <Text style={{ textDecorationLine: 'underline', color: COLORS.grey400 }}>se zpracováním osobních údajů</Text>
                </Text>

                <LinearGradient
                    colors={['rgba(22,22,22,0)', COLORS.primary]}
                    //locations={[0, 0.9]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '50%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                />

            </LinearGradient>
        </View>
    )
}

const BlurredEnvelope = ({ width, isSmallScreen }) => {
    const [isHovered, setIsHovered] = useState(false)

    const loginCardAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: withTiming(isHovered ? -30 : 0, { duration: 200 }) },
            ]
        }
    })

    return (
        <View
            style={{
                width: 450,
                maxWidth: 450,
                zoom: width < 300 ? 0.4 : width < 400 ? 0.5 : 0.65,
                alignSelf: 'center',
                marginVertical: isSmallScreen ? 64 : 0,
                marginBottom: isSmallScreen ? 64 : -60
            }}
            onMouseEnter={isBrowser ? () => setIsHovered(true) : undefined}
            onMouseLeave={isBrowser ? () => setIsHovered(false) : undefined}
        >
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: 270,
                    top: 30,
                    backgroundColor: COLORS.whiteBackground,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                }}
            />

            <View
                style={{
                    position: 'absolute',
                    top: -240,
                    width: '100%',
                    height: 300,
                    backgroundColor: COLORS.whiteBackground,
                    clipPath: 'polygon(0% 10%, 100% 10%, 50% 50%)',
                    transform: [{ rotate: '180deg' }],
                }}
            />

            <Animated.View
                style={[{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: 'auto',
                    alignSelf: 'center',
                }, loginCardAnimatedStyle]}
            >
                <LoginImage />
            </Animated.View>

            <View
                style={{
                    width: '100%',
                    height: 300,
                    //backgroundColor: COLORS.whiteBackground,
                    backgroundColor: 'rgba(24, 29, 37, .43)',
                    clipPath: 'polygon(0% 10%, 50% 50%, 100% 10%, 100% 100%, 0% 100%)',
                    borderRadius: '0 0 8px 8px',
                    backdropFilter: 'blur(10px)', // Apply the blur to content behind
                    WebkitBackdropFilter: 'blur(10px)', // For Safari
                    borderColor: COLORS.whiteBackground,
                    borderWidth: 1,
                    borderRadius: 8,
                }}
            >

            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 20,
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.accentSecondaryTransparent,
                        //backgroundColor: 'rgb(67 67 67 / 23%)',
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20
                    }}
                >
                    <Entypo
                        name="email"
                        size={27}
                        color={COLORS.accent}
                    />
                </View>
            </View>

        </View>
    )
}

const BulletPoint = ({ text }) => (
    <View
        style={{
            flexDirection: 'row',
        }}
    >
        <Text
            style={styles.stepText}
        >
            •
        </Text>
        <Text
            style={styles.stepText}
        >
            {text}
        </Text>
    </View>
)

const CreditsRefundGuarantee = () => (
    <LinearGradient
        colors={[COLORS.accent + '30', COLORS.accent + '30']}
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
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLORS.accent,
        }}
    >
        <Image
            source={require('../assets/images/guarantee.png')}
            style={{
                width: normalize(50),
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
                    fontFamily: FONTS.regular,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey300,
                    marginTop: 5
                }}
            >
                Pokud odemčený tiket nevyjde, vrátíme vám použité kredity.
            </Text>
        </View>
    </LinearGradient>
)

const STEPS = [
    {
        id: 1,
        content: (searchParams) => (
            <>
                <Text
                    style={styles.stepHeaderText}
                >
                    Zaregistrujte se a získejte 200 vstupních kreditů zdarma
                </Text>

                <BulletPoint text='Pro získání přístupu k našim tipům musíte se prvně zdarma zaregistrovat.' />
                <BulletPoint text='Každý nový a ověřený uživatel obdrží 200 vstupních kreditů zdarma.' />

                <HoverableLinkButton
                    searchParams={searchParams}
                    pathname='/auth'
                    linkStyles={{ marginTop: SPACING.large }}
                    buttonText='Zaregistrovat se'
                />
            </>
        ),
        image: (width, isSmallScreen) => (
            <BlurredEnvelope width={width} isSmallScreen={isSmallScreen}/>
        )
    },
    {
        id: 2,
        content: (searchParams) => (
            <>
                <Text
                    style={styles.stepHeaderText}
                >
                    Odemykejte naše tipy a nechte se inspirovat
                </Text>

                <BulletPoint text='Naše tipy můžete následně odemykat pomocí kreditů.' />
                <BulletPoint text='Před odemčením každého tipu vidíte jeho celkový kurz, náš vklad a zbývající čas do začátku prvního zápasu.' />
            </>
        ),
        image: (width) => (
            <View
                style={{
                    borderRadius: 10,
                    borderColor: COLORS.whiteBackground2,
                    //borderWidth: 1,
                    transform: [
                        { rotateX: '-20deg' },
                        { rotateY: '-20deg' },
                        { rotateZ: '-20deg' },
                        //{ scale: withTiming(isHovered ? 1.1 : 1, { duration: 200 }) }
                    ],
                    //width,
                    maxWidth: 500,
                    aspectRatio: 1811 / 2135,
                    alignSelf: 'center',
                    marginVertical: 20
                }}
            >
                {/* <Image
                    source={require('../assets/images/tickets_mock3.png')}
                    style={{
                        flex: 1
                    }}
                    contentFit='cover'
                    contentPosition='top center'
                /> */}
                <LinearGradient
                    colors={['rgba(22,22,22,0)', COLORS.primary]}
                    style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}
                />
            </View>
        )

    },
    {
        id: 3,
        content: (searchParams) => (
            <>
                <Text
                    style={styles.stepHeaderText}
                >
                    Kredity budou uplatněny pouze za úspěšné tipy
                </Text>
                <BulletPoint text='Pokud by některý z odemčených tiketů nevyšel, budou vám kredity vráceny.' />

                <CreditsRefundGuarantee />
            </>
        ),
        image: (width) => <View
            style={{

                //borderWidth: 1,
                transform: [
                    { rotateX: '20deg' },
                    { rotateY: '-20deg' },
                    { rotateZ: '20deg' },
                    //{ scale: withTiming(isHovered ? 1.1 : 1, { duration: 200 }) }
                ],
                //width: width - 20,
                maxWidth: 300,
                aspectRatio: 1811 / 2135,
                alignSelf: 'center',
                marginVertical: 20
            }}
        >
            {/* <Image
                source={require('../assets/images/tickets_mock3.png')}
                style={{
                    flex: 1
                }}
                contentFit='cover'
                contentPosition='top center'
            /> */}
            <LinearGradient
                colors={['rgba(22,22,22,0)', COLORS.primary]}
                style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}
            />
        </View>
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

const Step = ({ isSmallScreen, index, isEven, step, searchParams, width }) => {

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
                borderRadius: 20,
                //overflow: 'hidden',
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
                style={[
                    isEven ? {
                        paddingLeft: SPACING.xx_large,
                        paddingTop: STEP_COUNT_MARKER_SIZE + SEPARATOR_TOP_INSET + SPACING.large,
                        paddingBottom: 64,
                    } : {},
                    isSmallScreen ? { paddingHorizontal: SPACING.medium } : { flex: 1 },
                    {justifyContent: 'center'},
                    //!isEven && isSmallScreen ? { paddingBottom: 64 } : {}
                ]}
            >
                {isEven ? step.content(searchParams) : step.image(width, isSmallScreen)}
            </View>

            <StepCountMarker stepCount={index + 1} />

            <View
                style={[
                    !isEven ? {
                        paddingRight: SPACING.xx_large,
                        paddingTop: STEP_COUNT_MARKER_SIZE + SEPARATOR_TOP_INSET + SPACING.large,
                        paddingBottom: 64,
                    } : {},
                    isSmallScreen ? { paddingHorizontal: SPACING.medium } : { flex: 1 },
                    {justifyContent: 'center'},
                    //isEven && isSmallScreen ? { paddingBottom: 64 } : {}
                ]}
            >
                {isEven ? step.image(width, isSmallScreen) : step.content(searchParams)}
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
            //glare: true,
            "max-glare": 0.1,
            axis: 'x',
        })
    }, [])

    return (
        <View
            dataSet={{ id: 'how-it-works' }}
            style={{
                paddingHorizontal: SPACING.page_horizontal,
                width: '100%',
                alignItems: 'center',
                marginTop: 100
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
                    //paddingHorizontal: SPACING.medium,
                    paddingTop: SPACING.x_large,
                    paddingBottom: normalize(100)
                }}>
                    <View
                        style={{
                            paddingHorizontal: SPACING.x_small,
                            paddingVertical: SPACING.xxx_small,
                            borderWidth: 1,
                            borderColor: COLORS.accentSecondaryBorder,
                            borderRadius: 30,
                            backgroundColor: COLORS.accentSecondary,
                            width: 'fit-content',
                            alignSelf: 'center',
                            marginBottom: 16,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: FONT_SIZES.large,
                                color: COLORS.accent,
                                textAlign: 'center'
                            }}
                        >
                            Jak to funguje
                        </Text>
                    </View>
                    <span
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.h1,
                            color: COLORS.white,
                            textAlign: 'center',
                            maxWidth: 500,
                            background: `linear-gradient(180deg, ${COLORS.white}, rgba(255, 255, 255, 0.7))`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Připraveni vydělávat sázením?
                    </span>

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
                            <React.Fragment key={step.id}>
                                <Step
                                    index={index}
                                    step={step}
                                    searchParams={searchParams}
                                    isSmallScreen={width < STEP_SMALL_SCREEN_THRESHOLD}
                                    isEven={index % 2 === 0}
                                    width={width}
                                />
                                {index !== STEPS.length - 1 && <LinearGradient
                                    colors={['rgba(255,255,255,.0)', COLORS.accent]}
                                    locations={[0, 0.4]}
                                    style={{
                                        height: width < STEP_SMALL_SCREEN_THRESHOLD ? 150 : 100,
                                        width: 1,
                                        margin: 'auto',
                                        marginBottom: -SEPARATOR_TOP_INSET,
                                        zIndex: 2
                                        //marginTop: 32
                                    }}
                                />}
                            </React.Fragment>
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
        lineHeight: FONT_SIZES.large * 1.5,
        marginLeft: 4,
        marginBottom: 4
    }
})