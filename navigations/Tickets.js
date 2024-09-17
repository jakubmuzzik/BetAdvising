import React, { useState, useMemo, useLayoutEffect, useCallback } from 'react'
import { View, Text, useWindowDimensions, Dimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../constants'
import { normalize, stripEmptyParams, getParam } from '../utils'
import { MotiText, AnimatePresence, MotiView } from 'moti'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Image } from 'expo-image'
import { connect } from 'react-redux'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { supabase } from '../supabase/config'
import { ActivityIndicator } from 'react-native-paper'

import withSearchParams from '../components/hoc/withSearchParams'
import HoverableView from '../components/elements/HoverableView'

import Offers from '../screens/app/tickets/Offers'
import Unlocked from '../screens/app/tickets/Unlocked'

const Tickets = ({ searchParams }) => {
    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState([
        { key: 'offers', title: 'Nabídky', height: '100%', path: '/tickets/offers' },
        { key: 'unlocked', title: 'Odemčené', height: '100%', path: '/tickets/unlocked' }
    ]
    .map((route, index) => ({ ...route, index })))

    const navigate = useNavigate()
    const location = useLocation()

    useLayoutEffect(() => {
        const newIndex = routes.find(route => route.path === location.pathname)?.index
        setIndex(newIndex ?? 0)
    }, [location])

    const setTabHeight = (height, index) => {
        setRoutes(r => {
            r[index].height = height
            return [...r]
        })
    }

    const onTabPress = ({ route, preventDefault }) => {
        preventDefault()

        setIndex(routes.indexOf(route))

        navigate({
            pathname: route.path,
            search: new URLSearchParams(searchParams).toString()
        })
    }

    const renderLazyPlaceholder = () => (
        <View style={{ alignSelf: 'center', marginTop: SPACING.xx_large }}>
            <ActivityIndicator animating color={COLORS.red} size={30} />
        </View>
    )

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'offers':
                return (
                    <View style={{ width: normalize(800), maxWidth: '100%', height: routes[index].height, alignSelf: 'center' }}>
                        <Offers setTabHeight={(height) => setTabHeight(height, route.index)} />
                    </View>
                )
            case 'unlocked':
                return (
                    <View style={{ width: normalize(800), maxWidth: '100%', height: routes[index].height, alignSelf: 'center' }}>
                        <Unlocked setTabHeight={(height) => setTabHeight(height, route.index)} index={route.index} />
                    </View>
                )
            default:
                return null
        }
    }

    const renderTabBar = (props) => (
        <View
            style={{
                flexDirection: 'row',
                width: normalize(800),
                maxWidth: '100%',
                alignSelf: 'center',
                paddingHorizontal: SPACING.medium,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: SPACING.medium
            }}
        >
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: COLORS.accent, }}
                style={{ backgroundColor: 'transparent', }}
                tabStyle={{ width: 'auto' }}
                scrollEnabled={true}
                renderLabel={({ route, focused, color }) => (
                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large, color: focused ? '#FFF' : 'rgba(255,255,255,0.7)' }}>
                        {route.title}
                    </Text>
                )}
                onTabPress={onTabPress}
            />
        </View>
    )

    return (
        <View style={{ backgroundColor: COLORS.primary, paddingVertical: SPACING.large }}>
            {/* <View style={{ width: normalize(800), maxWidth: '100%', alignSelf: 'center', marginTop: SPACING.small, paddingHorizontal: SPACING.medium }}>
                <View style={{ flexDirection: 'row', marginBottom: SPACING.large }}>
                    <Text
                        style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.h1, color: '#FFF' }}
                    >
                        Tikety
                    </Text>
                </View>
            </View> */}

            <TabView
                renderTabBar={renderTabBar}
                swipeEnabled={false}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                sceneContainerStyle={{
                    width: normalize(800),
                    maxWidth: '100%',
                    alignSelf: 'center',
                    paddingHorizontal: SPACING.medium,
                }}
                initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                lazy={({ route }) => route.key !== 'settings'}
                renderLazyPlaceholder={renderLazyPlaceholder}
            />
        </View>
    )
}

export default withSearchParams(Tickets, ['language'])