import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { View, Text, useWindowDimensions, Dimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../constants'
import { normalize } from '../utils'
import { MotiText, AnimatePresence, MotiView } from 'moti'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { connect } from 'react-redux'

import { TabView } from 'react-native-tab-view'

const { height: initialHeight } = Dimensions.get('window')

import withSearchParams from '../components/hoc/withSearchParams'
import CustomButton from '../components/elements/CustomButton'

import Home from '../screens/app/credits/Home'

const Credits = ({ searchParams }) => {
    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState([
        { key: 'home', title: 'Credits Home', pathname: '/credits', navigationPaths: [], height: '100%',  },
        { key: 'buy-credits', title: 'Dokoupit', pathname: '/credits/order/*', navigationPaths: ['Dokoupit'], height: '100%',  },
    ]
    .map((route, index) => ({ ...route, index })))

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const foundRoute = routes.find(route => route.pathname.includes('*') ? location.pathname.includes(route.pathname.replace('/*', '')) : location.pathname === route.pathname)
        
        setIndex(foundRoute ? foundRoute.index : 0)
    }, [location])

    const getURLPaths = () => {
        return routes[index].pathname.replace('/', '').replace('/*', '').split('/')
    }

    const onNavigationPathPress = (navigationPathIndex) => {
        if (routes[index].navigationPaths.length === 1 || navigationPathIndex === 0) {
            navigate({
                pathname: '/credits',
                search: new URLSearchParams(searchParams).toString()
            })
        } else {
            navigate({
                pathname: routes.find(route => route.key === getURLPaths()[navigationPathIndex])?.pathname ?? '/credits',
                search: new URLSearchParams(searchParams).toString()
            })
        }
    }

    const setTabHeight = (height, index) => {
        setRoutes(r => {
            r[index].height = height
            return [...r]
        })
    }

    const renderPagesScene = ({ route }) => {
        if (Math.abs(index - routes.indexOf(route)) > 0) {
            return <View />
        }

        switch (route.key) {
            case 'home':
                return (
                    <View style={{ height: routes[index].height, width: normalize(800), maxWidth: '100%', alignSelf: 'center' }}>
                        <Home setTabHeight={(height) => setTabHeight(height, route.index)}/>
                    </View>
                )
            case 'buy-credits':
                return (
                    <View style={{ paddingHorizontal: SPACING.medium, height: routes[index].height, width: normalize(800), maxWidth: '100%', alignSelf: 'center'}}>
                        {/* <NewTicket setTabHeight={(height) => setTabHeight(height, route.index)} offsetX={windowWidth * route.index}/> */}
                    </View>
                )
            default:
                return null
        }
    }

    return (
        <View style={{ backgroundColor: COLORS.lightBlack, height: routes[index].key === 'add_lady' ? initialHeight - normalize(70) : '100%' }}>
            <View style={{
                width: normalize(800),
                maxWidth: '100%',
                alignSelf: 'center',
                marginTop: SPACING.large + SPACING.medium,
                paddingHorizontal: SPACING.medium,
                marginBottom: SPACING.xx_large
            }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        onPress={index !== 0 ? () => onNavigationPathPress(0) : undefined}
                        style={{ 
                            fontFamily: FONTS.bold, 
                            fontSize: FONT_SIZES.h2, 
                            color: '#FFF', 
                            textDecorationLine: index !== 0 ? 'underline' : 'none'
                        }}
                    >
                        Kredity
                    </Text>

                    <AnimatePresence>
                        {routes[index].navigationPaths.map((navigationPath, pathIndex, navigationPaths) => (
                            <MotiText 
                                key={navigationPath}
                                style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZES.h2, color: '#FFF' }}
                                from={{
                                    opacity: 0,
                                    transform: [{ translatex: 100 }],
                                }}
                                animate={{
                                    opacity: 1,
                                    transform: [{ translatex: 0 }],
                                }}
                                exit={{
                                    opacity: 0,
                                    transform: [{ translatex: 100 }],
                                }}
                                transition={{
                                    type: 'timing'
                                }}
                            >
                                {` > `}
                                <Text
                                    onPress={navigationPaths.length > pathIndex + 1 ? () => onNavigationPathPress(pathIndex + 1) : undefined}
                                    style={{ textDecorationLine: navigationPaths.length > pathIndex + 1 ? 'underline' : 'none' }}
                                >
                                    {navigationPath}
                                </Text>
                            </MotiText>
                        ))}
                    </AnimatePresence>
                </View>
            </View>

            <TabView
                renderTabBar={props => null}
                swipeEnabled={false}
                navigationState={{ index, routes }}
                renderScene={renderPagesScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                sceneContainerStyle={{ paddingBottom: SPACING.medium }}
            />
        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef
})

export default connect(mapStateToProps, {  })(withSearchParams(Credits, ['language']))