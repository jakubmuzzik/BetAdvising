import React, { useEffect, useState, useRef } from 'react'
import { View } from 'react-native'
import { COLORS, SPACING } from '../constants'
import { normalize } from '../utils'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { supabase } from '../supabase/config'

import Home from '../screens/Home'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Login from '../screens/auth/Login'

const LayoutWithHeader = ({ children }) => (
    <>
        <Header />

        <View style={{ flex: 1, /*marginTop: normalize(65),*/ backgroundColor: COLORS.primary, marginBottom: SPACING.large }}>
            {children}
        </View>

        <Footer />
    </>
)

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path='/' element={
            <LayoutWithHeader>
                <Home />
            </LayoutWithHeader>
        } />

        <Route path='/auth' element={
            <Login />
        } />

        <Route path='*' element={
            <LayoutWithHeader>
                <Home />
            </LayoutWithHeader>
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

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    const hasLoadedRef = useRef(false)

    useEffect(() => {
        const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log(_event)
            console.log('session: ', session)

            if (_event === 'SIGNED_OUT') {
                /*toastRef.current?.show({
                    type: 'success',
                    text: "You've been logged out."
                })*/
            }

            if (!session) {
                setIsLoggedIn(false)
            } else {
                if (_event === 'USER_UPDATED') {
                   /* toastRef.current?.show({
                        type: 'success',
                        text: 'Your data has been successfully updated.'
                    }) */
                }

                //updateCurrentAuthUser(session.user)
                //fetch only on page reloads and when already signed in
                if (!hasLoadedRef.current && session.user.app_metadata.userrole !== 'ADMIN') {
                    //fetchUser(session.user.id, session.user.user_metadata.user_type)
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
        <View style={{ flexGrow: 1 }}>
            <RouterProvider router={router} />
        </View>
    )
}

export default Main