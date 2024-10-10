import React, { useEffect } from 'react'
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import { COLORS, FONTS, FONT_SIZES, SPACING, HEADER_HEIGHT } from '../constants'
import { BlurView } from 'expo-blur'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Link } from 'react-router-dom'

import HoverableText from './elements/HoverableText'

const SlideHeaderMenu = ({ isActive, duration=250, searchParams, isLoggedIn }) => {
    const { height } = useWindowDimensions()

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withTiming(isActive ? 0 : -height-HEADER_HEIGHT-10, { duration }) }]
        }
    }, [height, isActive])

    useEffect(() => {
        document.querySelector('body').style.overflowY = isActive ? 'hidden' : 'auto'
    }, [isActive])

    return (
        <Animated.View
            style={[
                {
                    position: 'fixed',
                    top: HEADER_HEIGHT- 1,
                    left: 0,
                    right: 0,
                    height: height,
                    zIndex: 2,
                    //backgroundColor: COLORS.white,
                    //shadowColor: COLORS.black,
                },
                animatedStyle
            ]}
        >
            <BlurView
                tint='dark'
                intensity={90}
                style={{
                    flex: 1,
                    gap: SPACING.large,
                    padding: SPACING.small,
                    paddingTop: SPACING.xx_large,
                    alignItems: 'center',
                }}
            >
                <Link
                    style={{
                        textDecoration: 'none',
                    }}
                    to={{ hash: '#about-us', search: new URLSearchParams(searchParams).toString() }}
                >
                    <HoverableText
                        text='O nás'
                        hoveredColor={COLORS.accent}
                        textStyle={styles.headerMenuText}
                    />
                </Link>
                <Link
                    style={{
                        textDecoration: 'none',
                    }}
                    to={{ hash: '#how-it-works', search: new URLSearchParams(searchParams).toString() }}
                >
                    <HoverableText
                        text='Jak to funguje'
                        hoveredColor={COLORS.accent}
                        textStyle={styles.headerMenuText}
                    />
                </Link>
                <Link
                    style={{
                        textDecoration: 'none',
                    }}
                    to={{ hash: '#packages', search: new URLSearchParams(searchParams).toString() }}
                >
                    <HoverableText
                        text='Balíčky'
                        hoveredColor={COLORS.accent}
                        textStyle={styles.headerMenuText}
                    />
                </Link>
                <Link
                    style={{
                        textDecoration: 'none',
                    }}
                    to={{ hash: '#contact', search: new URLSearchParams(searchParams).toString() }}
                >
                    <HoverableText
                        text='Kontakt'
                        hoveredColor={COLORS.accent}
                        textStyle={styles.headerMenuText}
                    />
                </Link>
                {!isLoggedIn && (
                    <Link
                        style={{
                            textDecoration: 'none',
                        }}
                        to={{ pathname: '/auth', search: new URLSearchParams(searchParams).toString() }}
                    >
                        <HoverableText
                            text='Přihlásit se'
                            hoveredColor={COLORS.hoveredAccent}
                            textStyle={{...styles.headerMenuText, color: COLORS.accent}}
                        />
                    </Link>
                )}
            </BlurView>
        </Animated.View>
    )
}

export default SlideHeaderMenu

const styles = StyleSheet.create({
    headerMenuText: {
        fontFamily: FONTS.regular,
        fontSize: FONT_SIZES.xx_large,
        color: COLORS.white
    }
})