import React from 'react'
import { View } from 'react-native'
import { COLORS } from '../constants'
import { normalize } from '../utils'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import Home from '../screens/Home'
import Header from '../components/Header'
import Footer from '../components/Footer'

const LayoutWithHeader = ({ children }) => (
    <>
        <Header />

        <View style={{ flex: 1, marginTop: normalize(70), backgroundColor: COLORS.lightBlack }}>
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

const Main = () => {

    return (
        <View style={{ flexGrow: 1 }}>
            <RouterProvider router={router} />
        </View>
    )
}

export default Main