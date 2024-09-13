import React, { useEffect, useState, useRef } from 'react'
import { View } from 'react-native'
import { COLORS, SPACING } from '../constants'
import { normalize } from '../utils'
import { Image } from 'expo-image'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Redirect, Outlet } from 'react-router-dom'
import { supabase } from '../supabase/config'
import { fetchUser, updateCurrentAuthUser } from '../redux/actions/user'
import { connect } from 'react-redux'

import RequireAuth from './RequireAuth'
import Toast from '../components/Toast'

import Home from '../screens/Home'
import Footer from '../components/Footer'
import Login from '../screens/auth/Login'
import Tickets from '../screens/app/Tickets'
import History from '../screens/app/History'
import Credits from '../screens/app/Credits'
import Support from '../screens/app/Support'
import Account from '../screens/app/Account'

import OTP from '../screens/auth/OTP'
import CompleteProfile from '../screens/auth/CompleteProfile'

import Header from '../components/Header'
import AuthHeader from '../components/AuthHeader'
import AppLayout from './AppLayout'

const MarketingLayout = ({ children }) => (
    <>
        <Header />

        <View style={{ flex: 1, /*marginTop: normalize(65),*/ backgroundColor: COLORS.primary, marginBottom: SPACING.large }}>
            {children}
        </View>

        <Footer />
    </>
)

const AuthLayout = ({ children }) => (
    <>
        <AuthHeader />

        {children}
    </>
)

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path='/' element={
            <MarketingLayout>
                <Home />
            </MarketingLayout>
        } />

        <Route path='/auth' element={
            <AuthLayout>
                <Outlet />
            </AuthLayout>
        } >
            <Route index element={<Login />} />
            <Route path='otp' element={<OTP />} />
        </Route>

        <Route element={
            <RequireAuth>
                <AppLayout>
                    <Outlet />
                </AppLayout>
            </RequireAuth>
        } >
            <Route path='/tickets' element={<Tickets />} />
            <Route path='/history' element={<History />} />
            <Route path='/credits' element={<Credits />} />
            <Route path='/support' element={<Support />} />
            <Route path='/account' element={<Account />} />
        </Route>

        <Route path='/complete-profile' element={
            <RequireAuth>
                <CompleteProfile />
            </RequireAuth>
        } />


        <Route path='*' element={
            <MarketingLayout>
                <Home />
            </MarketingLayout>
        } />
    </>
))

router.subscribe(() => {
    //window.scrollTo({ top: 0, left: 0, behavior: 'instant'}) 

    const hash = window.location.hash

    if (!hash) return

    const hashValue = hash.replace('#', '')

    const element = document.querySelector(`[data-id="${hashValue}"]`)

    if (!element) return

    const rect = element.getBoundingClientRect()

    window.scrollTo({
        top: window.scrollY + rect.top - 100, // Adjust -100 for custom offset
        behavior: 'smooth'
    });
})

const Main = ({ fetchUser, updateCurrentAuthUser }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    const hasLoadedRef = useRef(false)
    const toastRef = useRef()

    useEffect(() => {
        const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log(_event)
            console.log('session: ', session)

            if (_event === 'SIGNED_OUT') {
                toastRef.current?.show({
                    type: 'success',
                    text: "You've been logged out."
                })
            }

            if (!session) {
                setIsLoggedIn(false)
            } else {
                updateCurrentAuthUser(session.user)

                fetchUser(session.user.id)

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

export default connect(null, { fetchUser, updateCurrentAuthUser })(Main)