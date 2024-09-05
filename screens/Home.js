import { View } from 'react-native'
import { SPACING } from '../constants'
import { normalize } from '../utils'

import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
import Steps from '../components/Steps'

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
        </View>
    )
}

export default Home