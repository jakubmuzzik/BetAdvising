import React,{ useState, useEffect } from 'react'
import { BlurView } from 'expo-blur'
import { View, useWindowDimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-dom'
import { normalize } from '../utils'
import { COLORS, FONTS, FONT_SIZES, SPACING, LARGE_SCREEN_THRESHOLD, HEADER_HEIGHT } from '../constants'
import { Image } from 'expo-image'
import withSearchParams from './hoc/withSearchParams'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

import HoverableText from './elements/HoverableText'
import BurgerMenuIcon from './animated/BurgerMenuIcon'
import SlideHeaderMenu from './SlideHeaderMenu'

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
                to={{ pathname: '/terms-of-service', search: new URLSearchParams(searchParams).toString() }}
            >
                <HoverableText
                    text='Obchodní podmínky'
                    hoveredColor={COLORS.accent}
                    textStyle={styles.headerMenuText}
                />
            </Link>
            <Link
                style={{
                    textDecoration: 'none',
                }}
                to={{ pathname: '/privacy-policy', search: new URLSearchParams(searchParams).toString() }}
            >
                <HoverableText
                    text='Zpracování osobních údajů'
                    hoveredColor={COLORS.accent}
                    textStyle={styles.headerMenuText}
                />
            </Link>
        </View>
    )    
}

const LegalHeader = ({ searchParams, currentAuthUser }) => {
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
                        source={require('../assets/logos/TipStrike.svg')}
                        style={{
                            maxWidth: '100%',
                            aspectRatio:853.76/322.77,
                            //height: normalize(32),
                            //width: normalize(102)
                        }}
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
                        source={require('../assets/logos/TipStrike.svg')}
                        style={{
                            aspectRatio:853.76/322.77,
                            height: HEADER_HEIGHT / 1.6
                        }}
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
                    <TouchableOpacity
                        onPress={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <BurgerMenuIcon color={COLORS.white} isActive={isMenuOpen} />
                    </TouchableOpacity>
                </View>
            )
        }

        return null
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

export default connect(mapStateToProps)(withSearchParams(LegalHeader, ['language']))

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