import { View, useWindowDimensions } from 'react-native'
import { COLORS, HEADER_HEIGHT, SIDEBAR_WIDTH, SMALL_SCREEN_THRESHOLD_APP_HEADER } from '../constants'

import AppHeader from '../components/AppHeader'
import SideBar from '../components/SideBar'

const AppLayout = ({ children }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < SMALL_SCREEN_THRESHOLD_APP_HEADER

    return (
        <>
            <AppHeader />

            <SideBar />

            <View style={{
                marginTop: HEADER_HEIGHT,
                marginLeft: isSmallScreen ? 0 : SIDEBAR_WIDTH,
                backgroundColor: COLORS.primary,
            }}>
                {children}
            </View>
        </>
    )
}

export default AppLayout