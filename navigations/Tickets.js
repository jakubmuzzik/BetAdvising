import React, { useState, useMemo, useLayoutEffect, useCallback } from 'react'
import { View, Text, useWindowDimensions, Dimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../constants'
import { normalize, stripEmptyParams, getParam } from '../utils'
import { MotiText, AnimatePresence, MotiView } from 'moti'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Image } from 'expo-image'
import { connect } from 'react-redux'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { supabase } from '../supabase/config'
import { ActivityIndicator } from 'react-native-paper'

import withSearchParams from '../components/hoc/withSearchParams'
import HoverableView from '../components/elements/HoverableView'

import Offers from '../screens/app/tickets/Offers'
import Unlocked from '../screens/app/tickets/Unlocked'
import FilledTabView from '../components/animated/FilledTabView'

const Tickets = ({ searchParams }) => {
    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState([
        { 
            key: 'offers', 
            label: 'Nabídky', 
            height: '100%', 
            path: '/tickets/offers',
            icon: (active) => <MaterialCommunityIcons style={{ marginRight: 10 }} name="lightning-bolt" size={18} color={active ? COLORS.accent : 'rgba(255,255,255,0.7)'} />,
            ref: React.createRef()
        },
        { 
            key: 'unlocked', 
            label: 'Odemčené', 
            height: '100%', 
            path: '/tickets/unlocked',
            icon: (active) => <MaterialCommunityIcons style={{ marginRight: 10 }} name="lock-open-variant" size={18} color={active ? COLORS.accent : 'rgba(255,255,255,0.7)'} />,
            ref: React.createRef()
        }
    ]
    .map((route, index) => ({ 
        ...route, 
        index,
        onPress: () => onTabPress({index, path: route.path}),
    }))
)

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

    const onTabPress = (route) => {
        setIndex(route.index)

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
                    <View style={{ maxWidth: '100%', height: routes[index].height, alignSelf: 'center' }}>
                        <Offers setTabHeight={(height) => setTabHeight(height, route.index)} />
                    </View>
                )
            case 'unlocked':
                return (
                    <View style={{ maxWidth: '100%', height: routes[index].height, alignSelf: 'center' }}>
                        <Unlocked setTabHeight={(height) => setTabHeight(height, route.index)} />
                    </View>
                )
            default:
                return null
        }
    }

    const renderTabBar = (props) => (
        <View
            style={{
                paddingHorizontal: SPACING.medium
            }}
        >
            <FilledTabView
                containerStyle={{
                    maxWidth: '100%',
                    width: 400,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: SPACING.medium,
                }}
                tabs={routes}
                activeIndex={props.navigationState.index}
            />
        </View>
    )

    return (
        <View style={{ backgroundColor: COLORS.primary, paddingVertical: SPACING.large }}>
            <TabView
                renderTabBar={renderTabBar}
                swipeEnabled={false}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                sceneContainerStyle={{
                    width: normalize(1000),
                    maxWidth: '100%',
                    alignSelf: 'center',
                    paddingHorizontal: SPACING.medium,
                }}
                initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                //lazy={({ route }) => route.key !== 'settings'}
                lazy
                renderLazyPlaceholder={renderLazyPlaceholder}
            />
        </View>
    )
}

export default withSearchParams(Tickets, ['language'])