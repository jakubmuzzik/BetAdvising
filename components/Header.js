import React from 'react'
import { BlurView } from 'expo-blur'
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native'
import HoverableView from './elements/HoverableView'
import { Link } from 'react-router-dom'
import { normalize } from '../utils'
import { COLORS, FONTS, FONT_SIZES, SPACING, LARGE_SCREEN_THRESHOLD, HEADER_HEIGHT } from '../constants'
import { Image } from 'expo-image'
import withSearchParams from './hoc/withSearchParams'
import { connect } from 'react-redux'
import { Avatar } from 'react-native-paper'

import HoverableText from './elements/HoverableText'

const Header = ({ searchParams, currentAuthUser }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < 800
    const isLargeScreen = width >= LARGE_SCREEN_THRESHOLD

    const renderLeftHeader = () => {

        return (
            <>
                <View
                    style={{ height: normalize(50), justifyContent: 'center', marginRight: SPACING.x_small }}
                >
                    <Link to={{ pathname: '/', search: new URLSearchParams(searchParams).toString() }}>
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
            </View>
        )
    }

    const renderRightHeader = () => {

        return currentAuthUser.id ? (
            <Link
                style={{
                    textDecoration: 'none',
                }}
                to={{ pathname: '/offers', search: new URLSearchParams(searchParams).toString() }}
            >
                <HoverableView
                    hoveredBackgroundColor={COLORS.whiteBackground2}
                    backgroundColor={COLORS.whiteBackground}
                    style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        gap: SPACING.xx_small,
                        alignItems: 'center',
                        borderRadius: 10,
                        width: 'fit-content',
                        //boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.35)',
                        paddingHorizontal: SPACING.x_small,
                        paddingVertical: SPACING.xx_small,
                    }}
                >
                    {
                        currentAuthUser.user_metadata?.profile_completed && <Avatar.Text size={normalize(28)} label={currentAuthUser.user_metadata.name[0]} style={{ backgroundColor: COLORS.accent }} labelStyle={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.large }} />
                        
                    }
                    <Text
                        style={{
                            color: COLORS.white,
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.large
                        }}
                    >
                        {currentAuthUser.user_metadata?.profile_completed ? 'Do aplikace →' : 'Dokončit profil →'}
                        
                    </Text>
                </HoverableView>
            </Link>
        ) : (
            <View
                style={{
                    flexDirection: 'row',
                    gap: SPACING.small
                }}
            >
                <Link
                    style={{
                        textDecoration: 'none',
                    }}
                    to={{ pathname: '/auth', search: new URLSearchParams(searchParams).toString() }}
                >
                    <HoverableView
                        hoveredBackgroundColor={'rgba(255, 255, 255, 0.2)'}
                        backgroundColor={COLORS.whiteBackground}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.05)',
                            paddingHorizontal: SPACING.x_small,
                            paddingVertical: SPACING.xx_small,
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
                    </HoverableView>
                </Link>
                <Link
                    style={{
                        textDecoration: 'none',
                    }}
                    to={{ pathname: '/auth', search: new URLSearchParams(searchParams).toString() }}
                >
                    <HoverableView
                        hoveredBackgroundColor={COLORS.hoveredAccent}
                        backgroundColor={COLORS.accent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.35)',
                            paddingHorizontal: SPACING.x_small,
                            paddingVertical: SPACING.xx_small,
                        }}
                    >
                        <Text
                            style={{
                                color: '#000',
                                fontFamily: FONTS.bold,
                                fontSize: FONT_SIZES.large
                            }}
                        >
                            Registrace zdarma
                        </Text>
                    </HoverableView>
                </Link>
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

const mapStateToProps = (store) => ({
    currentAuthUser: store.userState.currentAuthUser
})

export default connect(mapStateToProps)(withSearchParams(Header, ['language']))

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
        height: HEADER_HEIGHT
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
        height: HEADER_HEIGHT
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