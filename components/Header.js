import React, { useMemo } from 'react'
import { BlurView } from 'expo-blur'
import { View, TouchableOpacity, useWindowDimensions, StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import HoverableView from './HoverableView'
import { Link } from 'react-router-dom'
import { normalize, stripEmptyParams, getParam } from '../utils'
import { COLORS, FONTS, FONT_SIZES, SPACING, SMALL_SCREEN_THRESHOLD, LARGE_SCREEN_THRESHOLD, SUPPORTED_LANGUAGES } from '../constants'
import { useSearchParams } from 'react-router-dom'
import { Image } from 'expo-image'
import { useNavigate } from 'react-router-dom'

import HoverableText from './HoverableText'

const Header = () => {
    const [searchParams] = useSearchParams()
    const { width } = useWindowDimensions()

    const navigate = useNavigate()

    const isSmallScreen = width < 800
    const isLargeScreen = width >= LARGE_SCREEN_THRESHOLD

    const params = useMemo(() => ({
        language: getParam(SUPPORTED_LANGUAGES, searchParams.get('language'), ''),
    }), [searchParams])

    const onHomePress = () => {

    }

    const onGetAppPress = () => {

    }

    const renderLeftHeader = () => {

        return (
            <>
                <View
                    style={{ height: normalize(50), justifyContent: 'center', marginRight: SPACING.x_small }}
                >
                    <Link to={{ pathname: '/', search: new URLSearchParams(stripEmptyParams(params)).toString() }}>
                        <Image
                            contentFit='contain'
                            source={require('../assets/logos/logo-header.png')}
                            style={{
                                height: normalize(32),
                                width: normalize(102)
                            }}
                            tintColor={COLORS.accent}
                        />
                    </Link>
                </View>
            </>
        )
    }

    const renderMiddleHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    gap: SPACING.large
                }}
            >
                {/* <HoverableText
                    text='DOMŮ'
                    hoveredColor={COLORS.accent}
                    textStyle={styles.headerMenuText}
                    onPress={onHomePress}
                /> */}
                <Link
                    style={{
                        textDecoration: 'none',
                    }}
                    to="#about-us"
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
                    to="#how-it-works"
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
                    to="#packages"
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
                    to="#contact"
                >
                    <HoverableText
                        text='Kontakt'
                        hoveredColor={COLORS.accent}
                        textStyle={styles.headerMenuText}
                    />
                </Link>
            </View>
        )
    }

    const renderRightHeader = () => {

        return (
            <View
                style={{
                    flexDirection: 'row',
                    gap: SPACING.small
                }}
            >
                <HoverableView
                    hoveredBackgroundColor={'rgba(255, 255, 255, 0.2)'}
                    backgroundColor={COLORS.whiteBackground}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10
                    }}
                >
                    <TouchableOpacity
                        onPress={onGetAppPress}
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
                                color: COLORS.white,
                                fontFamily: FONTS.regular,
                                fontSize: FONT_SIZES.large
                            }}
                        >
                            Přihlásit se
                        </Text>
                    </TouchableOpacity>
                </HoverableView>
                <HoverableView
                    hoveredBackgroundColor={COLORS.hoveredAccent}
                    backgroundColor={COLORS.accent}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10
                    }}
                >
                    <TouchableOpacity
                        onPress={onGetAppPress}
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
                                color: '#000',
                                fontFamily: FONTS.bold,
                                fontSize: FONT_SIZES.large
                            }}
                        >
                            Registrace
                        </Text>
                    </TouchableOpacity>
                </HoverableView>
            </View>
        )
    }

    return (
        <BlurView style={{ position: 'fixed', zIndex: 1, width: '100%', flexDirection: 'column' }}>
            <View style={isSmallScreen ? styles.headerSmall : styles.headerLarge}>
                <View style={isSmallScreen ? styles.headerLeftSmall : styles.headerLeftLarge}>
                    {renderLeftHeader()}
                </View>
                {!isSmallScreen && <View style={styles.headerMiddle}>
                    {renderMiddleHeader()}
                </View>}
                <View style={isSmallScreen ? styles.headerRightSmall : styles.headerRightLarge}>
                    {renderRightHeader()}
                    {/* {rendeLanguageDropdown()}
                    {renderUserDropdown()} */}
                </View>
            </View>
        </BlurView>
    )
}

export default Header

const styles = StyleSheet.create({
    headerSmall: {
        //position: 'fixed',
        width: '100%',
        //height: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.page_horizontal,
        backgroundColor: '#020308a3',//'#1b0404bf',//'#1b0404a3',//COLORS.darkRedBackground,
        height: normalize(65)
    },
    headerLarge: {
        //position: 'fixed',
        width: '100%',
        //height: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.page_horizontal,
        paddingVertical: SPACING.x_small,
        backgroundColor: '#020308a3',//'#1b0404bf',//'#1b0404a3',// 'rgb(44 26 26 / 64%)',//'rgb(44 26 26 / 64%)',//COLORS.darkRedBackground,
        height: normalize(65)
    },
    headerLeftSmall: {
        flexGrow: 0,
        flexDirection: 'row'
    },
    headerRightSmall: {
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    headerLeftLarge: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    headerMiddle: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerRightLarge: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    headerMenuText: {
        fontFamily: FONTS.regular,
        fontSize: FONT_SIZES.large,
        color: COLORS.white
    }
})