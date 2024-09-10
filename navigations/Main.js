import React from 'react'
import { View } from 'react-native'
import { COLORS, SPACING } from '../constants'
import { normalize } from '../utils'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import Home from '../screens/Home'
import Header from '../components/Header'
import Footer from '../components/Footer'

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

    return (
        <View style={{ flexGrow: 1 }}>
            <RouterProvider router={router} />
        </View>
    )
}

export default Main