import React,{ useState, useEffect } from 'react'
import { BlurView } from 'expo-blur'
import { View, useWindowDimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import HoverableView from './elements/HoverableView'
import { Link } from 'react-router-dom'
import { normalize } from '../utils'
import { COLORS, FONTS, FONT_SIZES, SPACING, LARGE_SCREEN_THRESHOLD, HEADER_HEIGHT } from '../constants'
import { Image } from 'expo-image'
import withSearchParams from './hoc/withSearchParams'
import { connect } from 'react-redux'
import { Avatar } from 'react-native-paper'
import { useLocation } from 'react-router-dom'

import HoverableText from './elements/HoverableText'
import BurgerMenuIcon from './animated/BurgerMenuIcon'
import SlideHeaderMenu from './SlideHeaderMenu'

const LoginButton = ({ searchParams }) => {

    return (
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
                    //boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.05)',
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
    )
}

const SignUpButton = ({ searchParams, isSmallScreen }) => {

    return (
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
                    //boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.35)',
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
                    {isSmallScreen ? 'Registrace' : 'Registrace zdarma'}
                </Text>
            </HoverableView>
        </Link>
    )
}

const GoToAppButton = ({ searchParams, profileCompleted, usernameChar, isSmallScreen }) => {
    
    return (
        <Link
            style={{
                textDecoration: 'none',
            }}
            to={{ pathname: '/tickets/offers', search: new URLSearchParams(searchParams).toString() }}
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
                    paddingVertical: SPACING.xx_small
                }}
            >
                {
                    profileCompleted && !isSmallScreen && <Avatar.Text size={normalize(28)} label={usernameChar} style={{ backgroundColor: COLORS.accent }} labelStyle={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.large }} />
                    
                }
                <Text
                    style={{
                        color: COLORS.white,
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.large,
                        wordBreak: ''
                    }}
                >
                    {profileCompleted ? 'Do aplikace →' : 'Dokončit profil →'}
                </Text>
            </HoverableView>
        </Link>
    )
}

const AuthButtons = ({ searchParams }) => {

    return (
        <View
            style={{
                flexDirection: 'row',
                gap: SPACING.small,
                alignItems: 'center'
            }}
        >
            <LoginButton searchParams={searchParams} />
            <SignUpButton searchParams={searchParams} />
        </View>
    )
}

const NavBar = ({ searchParams }) => {

    return (
        <View
            style={{
                flexDirection: 'row',
                gap: SPACING.large
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
        </View>
    )    
}

const Header = ({ searchParams, currentAuthUser }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { width } = useWindowDimensions()

    const location = useLocation()

    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    const isSmallScreen = width < 900
    const isLargeScreen = width >= LARGE_SCREEN_THRESHOLD

    const renderLeftHeader = () => {

        return isSmallScreen ?(
            <>
                <Link
                    to={{ pathname: '/', search: new URLSearchParams(searchParams).toString() }}
                    style={{
                        //marginRight: SPACING.x_small,
                        width: '100%'
                    }}
                >
                    <Image
                        contentFit='contain'
                        source={require('../assets/logos/logo-header.png')}
                        style={{
                            maxWidth: '100%',
                            aspectRatio: 3.1875,
                            //height: normalize(32),
                            //width: normalize(102)
                        }}
                        tintColor={COLORS.accent}
                    />
                </Link>
            </>
        ) : (
            <>
                <Link
                    to={{ pathname: '/', search: new URLSearchParams(searchParams).toString() }}
                    style={{
                        marginRight: SPACING.x_small
                    }}
                >
                    <Image
                        contentFit='contain'
                        source={require('../assets/logos/logo-header.png')}
                        style={{
                            aspectRatio: 3.1875,
                            //height: normalize(32),
                            width: normalize(102)
                        }}
                        tintColor={COLORS.accent}
                    />
                </Link>
            </>
        )
    }

    const renderMiddleHeader = () => {
        return <NavBar searchParams={searchParams} />
    }

    const renderRightHeader = () => {

        if (isSmallScreen) {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        gap: SPACING.small,
                        alignItems: 'center'
                    }}
                >
                    {currentAuthUser.id ? <GoToAppButton isSmallScreen={true} searchParams={searchParams} profileCompleted={currentAuthUser.user_metadata?.profile_completed} usernameChar={currentAuthUser.user_metadata?.name[0]} />
                    : <SignUpButton searchParams={searchParams} isSmallScreen={true}/>}

                    <TouchableOpacity
                        onPress={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <BurgerMenuIcon color={COLORS.white} isActive={isMenuOpen} />
                    </TouchableOpacity>
                </View>
            )
        }

        return currentAuthUser.id ? (
            <GoToAppButton searchParams={searchParams} profileCompleted={currentAuthUser.user_metadata?.profile_completed} usernameChar={currentAuthUser.user_metadata?.name[0]} />
        ) : (
            <AuthButtons searchParams={searchParams} />
        )
    }

    return (
        <>
            <BlurView style={{ position: 'fixed', zIndex: 3, width: '100%', flexDirection: 'column' }}>
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

            <SlideHeaderMenu isActive={isMenuOpen} searchParams={searchParams}/>
        </>
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
        height: HEADER_HEIGHT,
        gap: SPACING.x_small
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
        flexDirection: 'row',
        flexShrink: 1,
        flexBasis: 100
    },
    headerRightSmall: {
        flexGrow: 1,
        flexShrink: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    headerLeftLarge: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    headerMiddle: {
        //flexGrow: 1,
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