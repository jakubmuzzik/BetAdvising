import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { SPACING, FONT_SIZES, FONTS, COLORS } from '../../constants'
import { Image } from 'expo-image'
import { normalize } from '../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import withSearchParams from '../hoc/withSearchParams'
import VanillaTilt from 'vanilla-tilt'
import { isBrowser } from 'react-device-detect'

import HoverableLinkButton from '../elements/HoverableLinkButton'

import BlurredEnvelope from './BlurredEnvelope'
import Tickets from './Tickets'
import Notifications from './Notifications'

const SEPARATOR_TOP_INSET = 20
const STEP_COUNT_MARKER_SIZE = 35

export const STEP_SMALL_SCREEN_THRESHOLD = 1000

export const ZoomableText = ({children, style, zoom=0.8}) => (
    <Text
        style={{
            ...style,
            //transform: [{ scale: isBrowser ? 1 : zoom }],
            zoom: isBrowser ? 1 : zoom
        }}
    >
        {children}
    </Text>
)

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
            source={require('../../assets/images/guarantee.png')}
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
                    Zaregistrujte se a získejte 100 vstupních kreditů zdarma
                </Text>

                <BulletPoint text='Zaregistruje se na našich stránkách' />
                <BulletPoint text='Ověřte svůj profil a získejte 100 kreditů zdarma' />

                <HoverableLinkButton
                    searchParams={searchParams}
                    pathname='/auth'
                    linkStyles={{ marginTop: SPACING.large }}
                    buttonText='Zaregistrovat se'
                />
            </>
        ),
        image: () => <BlurredEnvelope />
    },
    {
        id: 2,
        content: () => (
            <>
                <Text
                    style={styles.stepHeaderText}
                >
                    Odemykejte naše tipy a nechte se inspirovat
                </Text>

                <BulletPoint text='Odemykejte naše tipy pomocí kreditů' />
                <BulletPoint text='Běžný tip stojí 50 kreditů' />
                <BulletPoint text='Exklusivní tip stojí 100 kreditů' />
                <BulletPoint text='Před odemčením tipu vidíte jeho kurz, náš vklad a zbývající čas do prvního zápasu.' />
            </>
        ),
        image: () => <Tickets />

    },
    {
        id: 3,
        content: () => (
            <>
                <Text
                    style={styles.stepHeaderText}
                >
                    Kredity uplatněny pouze při výhře
                </Text>
                <BulletPoint text='Pokud by některý z odemčených tiketů nevyšel, budou vám kredity vráceny.' />

                <CreditsRefundGuarantee />
            </>
        ),
        image: () => <Notifications />
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
                        paddingBottom: isSmallScreen ? 42 : 64,
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
                        paddingBottom: isSmallScreen ? 32 : 64,
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

    /*useEffect(() => {
        if (!isBrowser) return

        VanillaTilt.init(document.querySelectorAll(`[data-id="step"]`), {
            max: 0,
            speed: 200,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            reverse: true,
            glare: true,
            "max-glare": 0.1,
            axis: 'x',
        })
    }, [])*/

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