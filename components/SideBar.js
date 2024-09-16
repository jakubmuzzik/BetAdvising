import React, { useEffect, useRef } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useDerivedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated'
import { Image } from 'expo-image'
import { normalize } from '../utils'
import { connect } from 'react-redux'
import { SPACING, COLORS, FONTS, SMALL_SCREEN_THRESHOLD_APP_HEADER, HEADER_HEIGHT, SIDEBAR_WIDTH, FONT_SIZES, DEFAULT_LANGUAGE } from '../constants'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import withSearchParams from './hoc/withSearchParams'
import HoverableView from './elements/HoverableView'
import { Picker } from '@react-native-picker/picker'

const ROUTES = [
    {
        path: '/offers',
        title: 'Nabídky',
        icon: (focused) => <MaterialCommunityIcons style={{ marginRight: 10 }} name="ticket-confirmation-outline" size={17} color={focused ? COLORS.white : 'rgba(255,255,255,0.7)'} />
    },
    {
        path: '/unlocked',
        title: 'Odemčené',
        icon: (focused) => <MaterialCommunityIcons style={{ marginRight: 10 }} name="history" size={17} color={focused ? COLORS.white : 'rgba(255,255,255,0.7)'} />
    },
    {
        path: '/credits',
        title: 'Kredity',
        icon: (focused) => <MaterialCommunityIcons style={{ marginRight: 10 }} name="hand-coin-outline" size={17} color={focused ? COLORS.white : 'rgba(255,255,255,0.7)'} />
    }
]

const Drawer = ({ isOpen, toggleLeftDrawer, duration = 500, children }) => {
    const width = useSharedValue(0)
    const progress = useDerivedValue(() =>
        withTiming(isOpen.value ? 0 : -1, { duration })
    )

    const sheetStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: progress.value * 2 * width.value }],
    }))

    const backgroundColorSheetStyle = {
        backgroundColor: COLORS.secondary
    }

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: 1 - progress.value,
        zIndex: isOpen.value
            ? 2
            : withDelay(duration, withTiming(-1, { duration: 0 })),
    }))

    return (
        <>
            <Animated.View style={[styles.drawerBackdrop, backdropStyle]}>
                <TouchableOpacity style={{ flex: 1 }} onPress={toggleLeftDrawer} />
            </Animated.View>
            <Animated.View
                onLayout={(e) => {
                    width.value = e.nativeEvent.layout.width
                }}
                style={[styles.drawer, sheetStyle, backgroundColorSheetStyle]}
            >
                {children}
            </Animated.View>
        </>
    )
}

const SideBarWrapper = ({ children, isOpen, toggleLeftDrawer }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < SMALL_SCREEN_THRESHOLD_APP_HEADER

    if (isSmallScreen) {
        return (
            <Drawer isOpen={isOpen} toggleLeftDrawer={toggleLeftDrawer}>
                {children}
            </Drawer>
        )
    } else {
        return (
            <View
                style={{
                    position: 'fixed',
                    height: '100%',
                    //marginTop: HEADER_HEIGHT,
                    width: SIDEBAR_WIDTH,
                    padding: SPACING.xx_small,
                    paddingTop: 0,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.whiteBackground2,
                    backgroundColor: COLORS.primary,
                    zIndex: 2
                }}
            >
                {children}
            </View>
        )
    }
}

const SideBar = ({ toggleDrawer, searchParams }) => {
    const isOpen = useSharedValue(false)
    const hasRendered = useRef(false)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!hasRendered.current) {
            hasRendered.current = true
            return
        }

        toggleLeftDrawer()
    }, [toggleDrawer])

    const toggleLeftDrawer = () => {
        isOpen.value = !isOpen.value
    }

    const onItemPress = (pathname) => {
        navigate({
            pathname,
            search: new URLSearchParams(searchParams).toString() 
        })

        toggleLeftDrawer()
    }

    return (
        <SideBarWrapper isOpen={isOpen} toggleLeftDrawer={toggleLeftDrawer}>
            <View
                style={{
                    height: HEADER_HEIGHT,
                    justifyContent: 'center'
                }}
            >
                <Image
                    contentFit='contain'
                    source={require('../assets/logos/logo-header.png')}
                    style={{
                        height: normalize(32),
                        width: normalize(102)
                    }}
                    tintColor={COLORS.accent}
                />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    marginTop: 40
                }}
                contentContainerStyle={{
                    gap: 15
                }}
            >
                {ROUTES.map((route, index) => (
                    <HoverableView
                        key={route.title}
                        style={{
                            borderRadius: 5,
                        }}
                        backgroundColor={location.pathname === route.path ? COLORS.whiteBackground : 'transparent'}
                        hoveredBackgroundColor={'rgba(255,255,255,0.05)'}
                    >
                        <TouchableOpacity
                            onPress={() => onItemPress(route.path)}
                            key={route.title}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                            to={{ pathname: route.path, search: new URLSearchParams(searchParams).toString() }}
                        >
                            {route.icon(location.pathname === route.path)}
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontFamily: FONTS.regular
                                }}
                            >
                                {route.title}
                            </Text>
                        </TouchableOpacity>
                    </HoverableView>
                ))}
            </ScrollView>
            <View
                style={{
                    marginTop: SPACING.x_small,
                    //paddingHorizontal: SPACING.xx_small,
                    paddingVertical: SPACING.xxx_small,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center'
                    }}
                >
                    <MaterialIcons name="language" size={17} color={COLORS.grey300} />
                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.grey300 }}>
                        Language:
                    </Text>
                </View>
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
            </View>
        </SideBarWrapper>
    )
}

const mapStateToProps = (store) => ({
    toggleDrawer: store.appState.toggleDrawer
})

export default connect(mapStateToProps)(withSearchParams(SideBar, ['language']))

const styles = StyleSheet.create({
    drawer: {
        padding: 12,
        width: SIDEBAR_WIDTH,
        height: '100%',
        position: 'absolute',
        left: 0,
        zIndex: 2
    },
    drawerBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
})