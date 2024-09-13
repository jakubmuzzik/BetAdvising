import { View } from 'react-native'
import { SPACING } from '../constants'
import { normalize } from '../utils'

import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
import Steps from '../components/Steps'
import Packages from '../components/Packages'
import ContactUs from '../components/ContactUs'

const Home = () => {

    return (
        <>
            <Hero />
            <AboutUs />
            <Steps />
            <Packages />
            <ContactUs />
        </>
    )
}

export default Home