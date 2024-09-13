import React, { useEffect, useRef } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useDerivedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated'
import { Image } from 'expo-image'
import { normalize } from '../utils'
import AppHeader from '../components/AppHeader'
import { connect } from 'react-redux'
import { SPACING, COLORS, FONTS, FONT_SIZES } from '../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import withSearchParams from '../components/hoc/withSearchParams'

function Drawer({ isOpen, toggleLeftDrawer, duration = 500, children }) {
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

const ROUTES = [
    {
        path: '/tickets',
        title: 'Tikety',
        icon: (focused) => <MaterialCommunityIcons style={{ marginRight: 10 }} name="ticket-confirmation-outline" size={20} color={focused ? COLORS.white : 'rgba(255,255,255,0.7)'} />
    },
    {
        path: '/history',
        title: 'Historie',
        icon: (focused) => <MaterialCommunityIcons style={{ marginRight: 10 }} name="history" size={20} color={focused ? COLORS.white : 'rgba(255,255,255,0.7)'} />
    },
    {
        path: '/credits',
        title: 'Kredity',
        icon: (focused) => <MaterialCommunityIcons style={{ marginRight: 10 }} name="hand-coin-outline" size={20} color={focused ? COLORS.white : 'rgba(255,255,255,0.7)'} />
    }
]

const AppLayout = ({ children, toggleDrawer, searchParams }) => {
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
        <>
            <AppHeader />

            <Drawer isOpen={isOpen} toggleLeftDrawer={toggleLeftDrawer}>
                <Image
                    contentFit='contain'
                    source={require('../assets/logos/logo-header.png')}
                    style={{
                        height: normalize(32),
                        width: normalize(102)
                    }}
                    tintColor={COLORS.accent}
                />

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
                        <TouchableOpacity
                            onPress={() => onItemPress(route.path)}
                            key={route.title}
                            style={{
                                borderRadius: 10,
                                backgroundColor: location.pathname === route.path ? COLORS.whiteBackground : 'transparent',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: SPACING.x_small,
                                paddingVertical: SPACING.xx_small,
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
                    ))}
                </ScrollView>
            </Drawer>

            {children}
        </>
    )
}

const mapStateToProps = (store) => ({
    toggleDrawer: store.appState.toggleDrawer
})

export default connect(mapStateToProps)(withSearchParams(AppLayout, ['language']))

const styles = StyleSheet.create({
    drawer: {
        padding: SPACING.small,
        minWidth: 180,
        height: '100%',
        width: 'auto',
        position: 'absolute',
        left: 0,
        zIndex: 2
    },
    drawerBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
})