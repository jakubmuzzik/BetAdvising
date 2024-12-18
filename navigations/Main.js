import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { View } from 'react-native'
import { COLORS, HEADER_HEIGHT, SPACING } from '../constants'
import { normalize } from '../utils'
import { Image } from 'expo-image'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../supabase/config'
import { fetchUser, updateCurrentAuthUser, fetchNotifications, clearReduxData } from '../redux/actions/user'
import { clearPersistedReduxData } from '../redux/actions/app'
import { connect } from 'react-redux'

import RequireAuth from './RequireAuth'
import Toast from '../components/Toast'

import Home from '../screens/Home'
import Footer from '../components/Footer'
import Login from '../screens/auth/Login'
import Tickets from './Tickets'
import Credits from './Credits'
import Support from '../screens/app/Support'
import Account from './Account'
import Notifications from '../screens/app/Notifications'
import Unsubscribe from '../screens/app/Unsubscribe'

import OTP from '../screens/auth/OTP'
import CompleteProfile from '../screens/auth/CompleteProfile'

import Header from '../components/Header'
import HeaderWithLogo from '../components/HeaderWithLogo'
import LegalHeader from '../components/LegalHeader'
import AppLayout from './AppLayout'

import PrivacyPolicy from '../screens/legal/PrivacyPolicy'
import TermsOfService from '../screens/legal/TermsOfService'

import Admin from './Admin'
import RequireAdminUser from './RequireAdminUser'

import ReactGA from 'react-ga'

const MarketingLayout = ({ children }) => (
    <>
        <Header />

        <View style={{ flex: 1, /*marginTop: normalize(65),*/ backgroundColor: COLORS.primary }}>
            {children}
        </View>

        <Footer />
    </>
)

const LayoutWithLogoAndFooter = ({ children }) => (
    <>
        <HeaderWithLogo />

        {children}

        <Footer />
    </>
)

const LegalLayout = ({ children }) => (
    <>
        <LegalHeader />

        <View style={{ flex: 1, marginTop: HEADER_HEIGHT }}>
            {children}
        </View>

        <Footer />
    </>
)

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route element={
            <MarketingLayout>
                <Outlet />
            </MarketingLayout>
        }>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Home />} />
        </Route>

        <Route element={
            <LayoutWithLogoAndFooter>
                <Outlet />
            </LayoutWithLogoAndFooter>
        }>
            <Route path='/unsubscribe' element={<Unsubscribe />} />

            <Route path='/auth' element={
                <Outlet />
            } >
                <Route index element={<Login />} />
                <Route path='otp' element={<OTP />} />
            </Route>
        </Route>

        <Route element={
            <LegalLayout>
                <Outlet />
            </LegalLayout>
        }>
            <Route path='/terms-of-service' element={<TermsOfService />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        </Route>

        <Route element={
            <RequireAuth>
                <AppLayout>
                    <Outlet />
                </AppLayout>
            </RequireAuth>
        } >
            <Route path='/account' element={<Account />} />

            {/* <Route element={<Outlet />} >
                <Route path='/account/profile-information' element={<Account />} />
                <Route path='/account/settings' element={<Account />} />
            </Route> */}

            <Route element={<Outlet />} >
                <Route path='/tickets/offers' element={<Tickets />} />
                <Route path='/tickets/unlocked' element={<Tickets />} />
            </Route>

            <Route path='/credits' element={<Credits />} >
                <Route path='order/select-package' element={<Credits />} />
                <Route path='order/checkout' element={<Credits />} />
                <Route path='order/result' element={<Credits />} />
            </Route>

            <Route path='/support' element={<Support />} />
            <Route path='/notifications' element={<Notifications />} />

            <Route path='/admin' element={
                <RequireAdminUser>
                    <Outlet />
                </RequireAdminUser>
            } >
                <Route index element={<Admin />} />
                <Route path='open-tickets' element={<Admin />} />
                <Route path='closed-tickets' element={<Admin />} />
                <Route path='new-ticket' element={<Admin />} />
                <Route path='users' element={<Admin />} />
            </Route>
        </Route>

        <Route path='/complete-profile' element={
            <RequireAuth>
                <CompleteProfile />
            </RequireAuth>
        } />
    </>
))

router.subscribe(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
    //window.scrollTo({ top: 0, left: 0, behavior: 'instant'}) 

    const hash = window.location.hash

    if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant'})
    }

    const hashValue = hash.replace('#', '')

    const element = document.querySelector(`[data-id="${hashValue}"]`)

    if (!element) return

    const rect = element.getBoundingClientRect()

    window.scrollTo({
        top: window.scrollY + rect.top - 100, // Adjust -100 for custom offset
        behavior: 'smooth'
    });
})

const Main = ({ fetchUser, updateCurrentAuthUser, fetchNotifications, clearReduxData, clearPersistedReduxData }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    const hasLoadedRef = useRef(false)
    const toastRef = useRef()

    useEffect(() => {
        const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            //console.log(_event)
            //console.log('session: ', session)

            if (_event === 'SIGNED_OUT') {
                toastRef.current?.show({
                    type: 'success',
                    text: "Byli jste odhlášeni."
                })
            }

            if (!session) {
                clearReduxData()
                clearPersistedReduxData()
                setIsLoggedIn(false)
            } else {
                if (_event === 'SIGNED_IN' || _event === 'INITIAL_SESSION' || _event === 'USER_UPDATED') {
                    updateCurrentAuthUser(session.user)

                    if (session.user.user_metadata?.profile_completed) {
                        fetchUser(session.user.id)
                        fetchNotifications()
                    }
                }

                setIsLoggedIn(true)
            }

            hasLoadedRef.current = true
        })

        return () => {
            subscription?.unsubscribe()
        }
    }, [])

    if (isLoggedIn == null) {
        return null
    }

    return (
        <>
            <View style={{ flexGrow: 1 }}>
                <RouterProvider router={router} />
            </View>

            <Toast ref={toastRef} root/>
        </>
    )
}

export default connect(null, { fetchUser, updateCurrentAuthUser, fetchNotifications, clearReduxData, clearPersistedReduxData })(Main)