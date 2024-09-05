import { View } from 'react-native'
import { SPACING } from '../constants'
import { normalize } from '../utils'

import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
import Steps from '../components/Steps'
import Packages from '../components/Packages'

const Home = () => {

    return (
        <View
            style={{
                gap: normalize(190),
                flexDirection: 'column',
            }}
        >
            <Hero />
            <AboutUs />
            <Steps />
            <Packages />
        </View>
    )
}

export default Home