import React, { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react'
import { View, useWindowDimensions, StyleSheet, Text, Pressable, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native'
import { BlurView } from 'expo-blur'
import { COLORS, FONTS, FONT_SIZES, SPACING, SMALL_SCREEN_THRESHOLD_APP_HEADER } from '../constants'
import { normalize } from '../utils'
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import withSearchParams from './hoc/withSearchParams'
import { connect } from 'react-redux'
import { Image } from 'expo-image'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import HoverableView from './elements/HoverableView'
import { DEFAULT_LANGUAGE } from '../labels'
import { Avatar } from 'react-native-paper'
import { MotiView } from 'moti'
import { Picker } from '@react-native-picker/picker'
import { logOut, toggleDrawer } from '../redux/actions/app'

const AppHeader = ({ searchParams, currentAuthUser, logOut, toggleDrawer, currentUser }) => {
    const { width } = useWindowDimensions()

    let location = useLocation()
    const navigate = useNavigate()

    const userDropdownRef = useRef()
    const userDropdownModalRef = useRef()
    const languageDropdownRef = useRef()
    const languageDropdownModalRef = useRef()

    const isSmallScreen = width < SMALL_SCREEN_THRESHOLD_APP_HEADER
    const isLargeScreen = width > 1000

    const [userDropdownVisible, setUserDropdownVisible] = useState(false)
    const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false)
    const [dropdownTop, setDropdownTop] = useState(-1000)
    const [languageDropdownRight, setLanguageDropdownRight] = useState(-1000)

    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState([
        {
            path: '/tickets',
            title: 'Tikety',
            key: 'tickets',
            icon: (focused) => <MaterialCommunityIcons style={{ marginRight: 10 }} name="ticket-confirmation-outline" size={20} color={focused ? COLORS.white : 'rgba(255,255,255,0.7)'} />
        },
        {
            path: '/credits',
            title: 'Kredity',
            key: 'credits',
            icon: (focused) => <MaterialCommunityIcons style={{ marginRight: 10 }} name="hand-coin-outline" size={20} color={focused ? COLORS.white : 'rgba(255,255,255,0.7)'} />
        },
        {
            path: '/history',
            title: 'Historie',
            key: 'history',
            icon: (focused) => <MaterialCommunityIcons style={{ marginRight: 10 }} name="history" size={20} color={focused ? COLORS.white : 'rgba(255,255,255,0.7)'} />
        },
    ].map((route, index) => ({ ...route, index })))

    const renderIndicator = routes.some(route => location.pathname.includes(route.path))

    //close modals when changing language
    useEffect(() => {
        setLanguageDropdownVisible(false)
    }, [searchParams])

    useLayoutEffect(() => {
        const newIndex = routes.find(route => location.pathname.includes(route.path))?.index
        setIndex(newIndex ?? 0)
    }, [location])

    const onTabPress = ({ route, preventDefault }) => {
        preventDefault()

        setIndex(routes.indexOf(route))

        navigate({
            pathname: route.path,
            search: new URLSearchParams(searchParams).toString()
        })
    }

    const onAccountPress = () => {
        navigate({
            pathname: '/account',
            search: new URLSearchParams(searchParams).toString()
        })
    }

    const toggleUserDropdown = useCallback(() => {
        userDropdownVisible ? setUserDropdownVisible(false) : openUserDropdown()
    }, [userDropdownVisible])

    const toggleLanguageDropdown = () => {
        languageDropdownVisible ? setLanguageDropdownRight(false) : openLanguageDropdown()
    }

    const openLanguageDropdown = () => {
        languageDropdownRef.current.measureLayout(
            languageDropdownModalRef.current,
            (left, top, width, height) => {
                setDropdownTop(top + height + 20)
            },
        )

        if (userDropdownRef.current) {
            userDropdownRef.current.measure((_fx, _fy, _w, h, _px, py) => {
                setLanguageDropdownRight(_w + SPACING.page_horizontal + SPACING.xx_small)
            })
        } else {
            setLanguageDropdownRight(SPACING.page_horizontal)
        }

        setLanguageDropdownVisible(true)
    }

    const openUserDropdown = () => {
        userDropdownRef.current.measureLayout(
            userDropdownModalRef.current,
            (left, top, width, height) => {
                setDropdownTop(top + height + 20)
            },
        )
        setUserDropdownVisible(true)
    }

    const onLogoutPress = async () => {
        try {
            await logOut()
        } catch (e) {
            toastRef?.show({
                type: 'error',
                text: 'Failed to log out.'
            })
        }
    }

    const onGetSupportPress = () => {
        navigate({
            pathname: '/support',
            search: new URLSearchParams(searchParams).toString()
        })
    }

    const onBuyCreditsPress = () => {
        navigate({
            pathname: '/credits',
            search: new URLSearchParams(searchParams).toString()
        })
    }

    const onOpenDrawerPress = () => {
        toggleDrawer()
    }

    const renderLanguageModal = () => {
        return (
            <Modal ref={languageDropdownModalRef} visible={languageDropdownVisible} transparent animationType="none">
                <TouchableOpacity
                    style={styles.dropdownOverlay}
                    onPress={() => setLanguageDropdownVisible(false)}
                >
                    <TouchableWithoutFeedback>
                        <MotiView
                            from={{
                                opacity: 0,
                                transform: [{ scaleY: 0.8 }, { translateY: -10 }],
                            }}
                            animate={{
                                opacity: 1,
                                transform: [{ scaleY: 1 }, { translateY: 0 }],
                            }}
                            transition={{
                                type: 'timing',
                                duration: 100,
                            }}
                            style={[styles.dropdown, { top: dropdownTop, right: languageDropdownRight, marginRight: 0, overflow: 'hidden' }]}
                        >
                            <HoverableView hoveredBackgroundColor={COLORS.secondary}>
                                <Link style={{ textDecoration: 'none' }} to={{ pathname: location.pathname, search: new URLSearchParams({ ...searchParams, language: 'cs' }).toString() }}>
                                    <View style={{ padding: SPACING.xx_small, flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            contentFit='contain'
                                            source={require('../assets/flags/cz.png')}
                                            style={{
                                                width: SPACING.small,
                                                height: SPACING.x_small,
                                                marginRight: SPACING.xx_small,
                                            }}
                                        />
                                        <Text style={{ fontFamily: FONTS.regular, fontSize: FONT_SIZES.medium, color: COLORS.white }}>Čeština</Text>
                                    </View>
                                </Link>
                            </HoverableView>
                            <HoverableView hoveredBackgroundColor={COLORS.secondary}>
                                <Link style={{ textDecoration: 'none' }} to={{ pathname: location.pathname, search: new URLSearchParams({ ...searchParams, language: 'en' }).toString() }} >
                                    <View style={{ padding: SPACING.xx_small, flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            contentFit='contain'
                                            source={require('../assets/flags/us.png')}
                                            style={{
                                                width: SPACING.small,
                                                height: SPACING.x_small,
                                                marginRight: SPACING.xx_small,
                                            }}
                                        />
                                        <Text style={{ fontFamily: FONTS.regular, fontSize: FONT_SIZES.medium, color: COLORS.white }}>English</Text>
                                    </View>
                                </Link>
                            </HoverableView>
                        </MotiView>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }

    const renderUserModal = () => {
        return (
            <Modal visible={userDropdownVisible} transparent animationType="none">
                <TouchableOpacity
                    style={styles.dropdownOverlay}
                    onPress={() => setUserDropdownVisible(false)}
                >
                    <TouchableWithoutFeedback>
                        <MotiView
                            from={{
                                opacity: 0,
                                transform: [{ scaleY: 0.8 }, { translateY: -10 }],
                            }}
                            animate={{
                                opacity: 1,
                                transform: [{ scaleY: 1 }, { translateY: 0 }],
                            }}
                            transition={{
                                type: 'timing',
                                duration: 100,
                            }}
                            style={[styles.dropdown, { top: dropdownTop, }]}
                        >
                            <HoverableView hoveredBackgroundColor={COLORS.secondary} style={{ overflow: 'hidden' }}>
                                <TouchableOpacity onPress={onAccountPress} style={{ maxWidth: 250, paddingVertical: SPACING.xx_small, paddingHorizontal: SPACING.xx_small, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                                    activeOpacity={0.8}
                                >
                                    <Avatar.Text size={34} label={currentAuthUser.user_metadata.name[0]} style={{ backgroundColor: COLORS.accent }} labelStyle={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.large }} />
                                    <View style={{ flexDirection: 'column', marginHorizontal: SPACING.xxx_small, flexShrink: 1, }}>
                                        <Text numberOfLines={1} style={{ fontFamily: FONTS.regular, fontSize: FONT_SIZES.small, color: COLORS.grey400, marginBottom: 4 }}>
                                            Account
                                        </Text>
                                        <Text numberOfLines={1} style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.white }}>
                                            {currentAuthUser.user_metadata.name}
                                        </Text>
                                    </View>
                                    <MaterialIcons name="keyboard-arrow-right" size={20} color={COLORS.grey400} />
                                </TouchableOpacity>
                            </HoverableView>

                            <TouchableOpacity onPress={onGetSupportPress}>
                                <HoverableView style={{ gap: 5, flexDirection: 'row', paddingHorizontal: SPACING.xx_small, paddingVertical: SPACING.xx_small, alignItems: 'center' }} hoveredBackgroundColor={COLORS.secondary}>
                                    <MaterialIcons name="help-outline" size={17} color={COLORS.grey300} />
                                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.grey300 }}>
                                        Podpora
                                    </Text>
                                </HoverableView>
                            </TouchableOpacity>

                            <HoverableView style={{ gap: 5, flexDirection: 'row', paddingHorizontal: SPACING.xx_small, paddingVertical: SPACING.xx_small, alignItems: 'center' }} hoveredBackgroundColor={COLORS.secondary}>
                                <MaterialIcons name="language" size={17} color={COLORS.grey300} />
                                <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.grey300 }}>
                                    Language:
                                </Text>
                                <Picker
                                    selectedValue={searchParams.language?.length ? searchParams.language : DEFAULT_LANGUAGE}
                                    onValueChange={(itemValue, itemIndex) => navigate({
                                        pathname: location.pathname,
                                        search: new URLSearchParams({ ...searchParams, language: itemValue }).toString()
                                    })
                                    }
                                    fontFamily={FONTS.bold}
                                    style={{ color: COLORS.white, cursor: 'pointer', borderWidth: 0, fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, outlineStyle: 'none', backgroundColor: 'transparent' }}
                                >
                                    <Picker.Item label="Čeština" value="cs" />
                                    <Picker.Item label="English" value="en" />
                                </Picker>
                            </HoverableView>

                            <View style={{ height: 0.5, width: '100%', backgroundColor: COLORS.grey400, marginVertical: SPACING.xxx_small }} />

                            <HoverableView hoveredBackgroundColor={COLORS.secondary}>
                                <TouchableOpacity
                                    onPress={onLogoutPress}
                                    style={{ flexDirection: 'row', alignItems: 'center', gap: 5, padding: SPACING.xx_small }}
                                    activeOpacity={0.8}
                                >
                                    <MaterialIcons name="logout" size={17} color={COLORS.red} />
                                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.red }}>
                                        Log out
                                    </Text>
                                </TouchableOpacity>
                            </HoverableView>
                        </MotiView>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: !renderIndicator ? 'transparent' : COLORS.accent }}
            style={{ backgroundColor: 'transparent' }}
            tabStyle={{ width: 'auto' }}
            scrollEnabled={true}
            renderLabel={({ route, focused, color }) => (
                // <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large, color: focused ? '#FFF' : 'rgba(255,255,255,0.7)' }}>
                //     {route.title}
                // </Text>
                <Link style={{ textDecoration: 'none' }} to={{ pathname: route.path, search: new URLSearchParams(searchParams).toString() }}>
                    <View style={styles.categoryContainer}>
                        {route.icon(focused)}
                        <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large, color: (focused && renderIndicator) ? '#FFF' : 'rgba(255,255,255,0.7)' }}>
                            {route.title}
                        </Text>
                    </View>
                </Link>
            )}
            gap={10}
            onTabPress={onTabPress}
        />
    )

    const renderLeftHeader = () => (
        isSmallScreen ? (
            <>
                <TouchableOpacity onPress={onOpenDrawerPress}>
                    <MaterialIcons name="menu" size={27} color="white" />
                </TouchableOpacity>
            </>
        ) : (
            <>
                <View
                    style={{ height: normalize(50), justifyContent: 'center', marginRight: SPACING.x_small }}
                >
                    <Link to={{ pathname: '/tickets', search: new URLSearchParams(searchParams).toString() }}>
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
                <TabView
                    renderTabBar={renderTabBar}
                    swipeEnabled={false}
                    navigationState={{ index, routes }}
                    renderScene={() => undefined}
                    onIndexChange={setIndex}
                />
            </>
        )
    )

    const renderRightHeader = () => {

        return (
            <>
                {isLargeScreen && <View
                    style={{
                        flexDirection: 'row',
                        gap: 20,
                        alignItems: 'center',
                        marginRight: SPACING.small + SPACING.xx_small
                    }}
                >
                    <Image
                        source={require('../assets/images/coin.png')}
                        style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'contain'
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                fontFamily: FONTS.medium,
                                fontSize: FONT_SIZES.small,
                                color: COLORS.grey300,
                                marginBottom: 4
                            }}
                        >
                            Dostupné kredity
                        </Text>
                        <Text
                            style={{
                                fontFamily: FONTS.bold,
                                fontSize: FONT_SIZES.large,
                                color: COLORS.white,
                            }}
                        >
                            {currentUser?.credits ?? 0}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={onBuyCreditsPress}
                    >
                        <HoverableView
                            hoveredBackgroundColor={COLORS.secondary}
                            //backgroundColor={}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                width: 'fit-content',
                                paddingHorizontal: SPACING.x_small,
                                paddingVertical: SPACING.xx_small,
                                flexDirection: 'row',
                                boxShadow: '0px 0px 10px rgba(251, 193, 13, 0.15)',
                                borderWidth: 1,
                                borderColor: COLORS.accent
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontFamily: FONTS.regular,
                                    fontSize: FONT_SIZES.medium
                                }}
                            >
                                Dokoupit
                            </Text>
                        </HoverableView>
                    </TouchableOpacity>
                </View>}

                {/* <HoverableView
                    hoveredOpacity={0.8}
                    style={{ borderRadius: 20, justifyContent: 'center' }}
                >
                    <TouchableOpacity 
                        ref={languageDropdownRef} 
                        onPress={toggleLanguageDropdown} 
                        activeOpacity={0.8} 
                        style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            padding: SPACING.xxx_small, 
                            paddingRight: SPACING.xx_small 
                        }}
                    >
                        <MaterialIcons style={{ paddingRight: SPACING.xxx_small }} name="language" size={20} color="white" />
                        <Text 
                            style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.white }}
                        >
                                {searchParams.language ? searchParams.language.toUpperCase() : DEFAULT_LANGUAGE.toUpperCase()}
                        </Text>
                        <MaterialIcons style={{ paddingLeft: SPACING.xxx_small }} name="keyboard-arrow-down" size={20} color='#FFF' />
                    </TouchableOpacity>
                </HoverableView> */}

                <HoverableView
                    hoveredBackgroundColor={COLORS.whiteBackground2}
                    backgroundColor={COLORS.whiteBackground}
                    style={{ marginLeft: SPACING.small, borderRadius: 20, justifyContent: 'center' }}
                >
                    <TouchableOpacity
                        ref={userDropdownRef}
                        onPress={toggleUserDropdown}
                        activeOpacity={0.8}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: SPACING.xxx_small,
                            paddingHorizontal: SPACING.xx_small
                        }}
                    >
                        <Avatar.Text
                            size={28}
                            label={currentAuthUser.user_metadata.name[0]}
                            style={{ backgroundColor: COLORS.accent }}
                            labelStyle={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.large }}
                        />
                        {!isSmallScreen && <MaterialIcons style={{ paddingLeft: SPACING.xxx_small }} name="menu" size={20} color="white" />}
                    </TouchableOpacity>
                </HoverableView>
            </>
        )
    }

    return (
        <BlurView style={{ position: 'fixed', zIndex: 1, width: '100%', flexDirection: 'column' }}>
            <View style={isSmallScreen ? styles.headerSmall : styles.headerLarge}>
                <View style={{ 
                    flexDirection: 'row', 
                    display: 'contents' 
                }}>
                    {renderLeftHeader()}
                </View>

                <View style={{ flexDirection: 'row' }}>
                    {renderRightHeader()}
                    {renderUserModal()}
                    {renderLanguageModal()}
                </View>
            </View>
        </BlurView>
    )
}

const mapStateToProps = (store) => ({
    currentAuthUser: store.userState.currentAuthUser,
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, { logOut, toggleDrawer })(withSearchParams(AppHeader, ['language']))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        backgroundColor: 'rgb(0, 132, 255)',
        width: 48,
        height: 48,
        borderRadius: 24,
        margin: 6,
    },
    categoryContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 5
    },
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
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: SPACING.page_horizontal,
        paddingVertical: SPACING.x_small,
        backgroundColor: '#020308a3',//'#1b0404bf',//'#1b0404a3',// 'rgb(44 26 26 / 64%)',//'rgb(44 26 26 / 64%)',//COLORS.darkRedBackground,
        height: normalize(65)
    },
    dropdownOverlay: {
        width: '100%',
        height: '100%',
        cursor: 'default',
        alignItems: 'flex-end',
    },
    dropdown: {
        position: 'absolute',
        minWidth: normalize(100),
        backgroundColor: COLORS.secondary2,
        marginRight: SPACING.page_horizontal,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
        paddingVertical: SPACING.xxx_small,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10.62,
        elevation: 8,
        overflow: 'hidden'
    }
})