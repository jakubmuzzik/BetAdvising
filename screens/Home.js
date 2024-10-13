import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
import TicketsScroller from '../components/TicketsScroller'
import Steps from '../components/Steps'
import Packages from '../components/Packages'
import FAQ from '../components/FAQ'
import FooterCTA from '../components/FooterCTA'

const Home = () => {

    return (
        <>
            <Hero />
            {/* <AboutUs /> */}
            <TicketsScroller />
            <Steps />
            <Packages />
            <FAQ />
            <FooterCTA />
        </>
    )
}

export default Home