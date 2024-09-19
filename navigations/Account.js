import React, { useState, useRef, useLayoutEffect, memo, useMemo } from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../constants'
import { ActivityIndicator } from 'react-native-paper'
import { normalize } from '../utils'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

import withSearchParams from '../components/hoc/withSearchParams'

import PersonalInformation from '../screens/app/account/PersonalInformation'
import { connect } from 'react-redux'

const Account = ({ currentUser, searchParams }) => {

    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState([
        { key: 'profile-information', title: 'Profile information', height: '100%', path: '/account/profile-information' },
        { key: 'settings', title: 'Settings', height: '100%', path: '/account/settings' },
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

    //todo - this is used only for photos tab - implement skeleton loading
    const renderLazyPlaceholder = () => (
        <View style={{ alignSelf: 'center', marginTop: SPACING.xx_large }}>
            <ActivityIndicator animating color={COLORS.red} size={30} />
        </View>
    )

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'profile-information':
                return (
                    <View style={{ paddingHorizontal: SPACING.medium, width: normalize(800), maxWidth: '100%', height: routes[index].height, alignSelf: 'center' }}>
                        <PersonalInformation userData={currentUser} setTabHeight={(height) => setTabHeight(height, route.index)} />
                    </View>
                )
            case 'settings':
                return (
                    <View style={{ paddingHorizontal: SPACING.medium, width: normalize(800), maxWidth: '100%', height: routes[index].height, alignSelf: 'center' }}>
                        {/* <Settings currentUser={currentUser} user_type={user_type} setTabHeight={(height) => setTabHeight(height, route.index)} /> */}
                    </View>
                )
            default:
                return null
        }
    }

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: COLORS.accent, left: SPACING.medium }}
            style={{ backgroundColor: 'transparent', width: normalize(800), maxWidth: '100%', alignSelf: 'center', paddingHorizontal: SPACING.medium }}
            tabStyle={{ width: 'auto' }}
            scrollEnabled={true}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large, color: focused ? '#FFF' : 'rgba(255,255,255,0.7)' }}>
                    {route.title}
                </Text>
            )}
            onTabPress={onTabPress}
        />
    )
    
    return (
        <>
            <View
                style={{
                    width: normalize(800),
                    maxWidth: '100%',
                    alignSelf: 'center',
                    paddingTop: SPACING.medium
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        fontSize: FONT_SIZES.h2,
                        fontFamily: FONTS.medium,
                        marginTop: SPACING.large,
                        paddingHorizontal: SPACING.medium,
                        marginBottom: SPACING.xx_large
                    }}
                >
                    Account
                </Text>
            </View>
            <TabView
                renderTabBar={renderTabBar}
                swipeEnabled={false}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                sceneContainerStyle={{
                    alignSelf: 'center'
                }}
                initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                lazy={({ route }) => route.key !== 'settings'}
                renderLazyPlaceholder={renderLazyPlaceholder}
            />
        </>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

export default connect(mapStateToProps)(withSearchParams(Account, ['language']))