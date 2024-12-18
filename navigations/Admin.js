import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { View, Text, useWindowDimensions, Dimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../constants'
import { normalize } from '../utils'
import { MotiText, AnimatePresence, MotiView } from 'moti'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Animated, { FadeInLeft, FadeInRight, FadeOutRight } from 'react-native-reanimated'

import { connect } from 'react-redux'

import { TabView } from 'react-native-tab-view'

const { height: initialHeight } = Dimensions.get('window')

import withSearchParams from '../components/hoc/withSearchParams'
import AdminDashboard from '../screens/admin/AdminDashboard'
import CustomButton from '../components/elements/CustomButton'

import NewTicket from '../screens/admin/NewTicket'
import OpenTickets from '../screens/admin/OpenTickets'
import ClosedTickets from '../screens/admin/ClosedTickets'
import Users from '../screens/admin/Users'

const Admin = ({ searchParams }) => {
    const { width: windowWidth } = useWindowDimensions()

    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState([
        { key: 'admin', title: 'Admin', pathname: '/admin', navigationPaths: [], height: '100%',  },
        { key: 'new-ticket', title: 'Nový tiket', pathname: '/admin/new-ticket', navigationPaths: ['Nový tiket'], height: '100%',  },
        { key: 'open-tickets', title: 'Otevřené tikety', pathname: '/admin/open-tickets', navigationPaths: ['Otevřené tikety'], height: '100%',  },
        { key: 'closed-tickets', title: 'Uzavřené tikety', pathname: '/admin/closed-tickets', navigationPaths: ['Uzavřené tikety'], height: '100%',  },
        { key: 'users', title: 'Uživatelé', pathname: '/admin/users', navigationPaths: ['Uživatelé'], height: '100%',  },
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
                pathname: '/admin',
                search: new URLSearchParams(searchParams).toString()
            })
        } else {
            navigate({
                pathname: routes.find(route => route.key === getURLPaths()[navigationPathIndex])?.pathname ?? '/admin',
                search: new URLSearchParams(searchParams).toString()
            })
        }
    }

    const onNewTicketPress = () => {
        navigate({
            pathname: '/admin/new-ticket',
            search: new URLSearchParams(searchParams).toString()
        })
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
            case 'admin':
                return (
                    <View style={{  marginTop: SPACING.large, height: routes[index].height, width: normalize(800), maxWidth: '100%', alignSelf: 'center' }}>
                        <AdminDashboard />
                    </View>
                )
            case 'new-ticket':
                return (
                    <View style={{ paddingHorizontal: SPACING.medium, height: routes[index].height, width: normalize(800), marginTop: SPACING.large, maxWidth: '100%', alignSelf: 'center'}}>
                        <NewTicket setTabHeight={(height) => setTabHeight(height, route.index)} offsetX={windowWidth * route.index}/>
                    </View>
                )
            case 'open-tickets':
                return (
                    <View style={{ paddingHorizontal: SPACING.medium, maxWidth: '100%', height: routes[index].height, alignSelf: 'center' }}>
                        <OpenTickets setTabHeight={(height) => setTabHeight(height, route.index)} offsetX={windowWidth * route.index}/>
                    </View>
                )
            case 'closed-tickets':
                return (
                    <View style={{ paddingHorizontal: SPACING.medium, maxWidth: '100%', height: routes[index].height, alignSelf: 'center' }}>
                        <ClosedTickets setTabHeight={(height) => setTabHeight(height, route.index)} offsetX={windowWidth * route.index}/>
                    </View>
                )
            case 'users':
                return (
                    <View style={{ paddingHorizontal: SPACING.medium, maxWidth: '100%', height: routes[index].height, alignSelf: 'center' }}>
                        <Users setTabHeight={(height) => setTabHeight(height, route.index)} offsetX={windowWidth * route.index}/>
                    </View>
                )
            default:
                return null
        }
    }

    return (
        <View style={{ backgroundColor: COLORS.lightBlack, height: routes[index].key === 'add_lady' ? initialHeight - normalize(70) : '100%' }}>
            <View 
                style={{
                    width: normalize(800),
                    maxWidth: '100%', 
                    alignSelf: 'center', 
                    marginTop: SPACING.large + SPACING.medium, 
                    paddingHorizontal: SPACING.medium, 
                    marginBottom: SPACING.large 
                }}
            >
                <View style={{ flexDirection: 'row', justifyContent: index === 0 ? 'space-between' : 'flex-start' }}>
                    <Text
                        onPress={index !== 0 ? () => onNavigationPathPress(0) : undefined}
                        style={{ 
                            fontFamily: FONTS.bold, 
                            fontSize: FONT_SIZES.h2, 
                            color: '#FFF', 
                            textDecorationLine: index !== 0 ? 'underline' : 'none'
                        }}
                    >
                        Admin
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
                    {index === 0 && <Animated.View
                        style={{marginLeft: SPACING.medium}}
                        entering={FadeInRight}
                        exiting={FadeOutRight}
                    >
                        <CustomButton
                            onPress={onNewTicketPress}
                            additionalStyles={{ alignSelf: 'flex-end' }}
                            textColor={COLORS.black}
                            backgroundColors={COLORS.accent}
                            buttonText='Nový tiket'
                            textStyles={{ fontSize: FONT_SIZES.large, fontFamily: FONTS.bold }}
                        />
                    </Animated.View>}
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

export default connect(mapStateToProps, {  })(withSearchParams(Admin, ['language']))