import { View, useWindowDimensions } from 'react-native'
import { COLORS, HEADER_HEIGHT, SIDEBAR_WIDTH, SMALL_SCREEN_THRESHOLD_APP_HEADER, SPACING } from '../constants'

import AppHeader from '../components/AppHeader'
import SideBar from '../components/SideBar'

const AppLayout = ({ children }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < SMALL_SCREEN_THRESHOLD_APP_HEADER

    return (
        <>
            <AppHeader />

            {isSmallScreen && <SideBar />}

            <View style={{
                marginTop: HEADER_HEIGHT,
                backgroundColor: COLORS.primary,
                paddingBottom: SPACING.xxx_large,
                flex: 1
            }}>
                {children}
            </View>
        </>
    )
}

export default AppLayout