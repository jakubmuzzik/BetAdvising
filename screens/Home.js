import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
import TicketsScroller from '../components/TicketsScroller'
import Steps from '../components/steps'
import Packages from '../components/Packages'
import FAQ from '../components/FAQ'
import FooterCTA from '../components/FooterCTA'

const Home = () => {

    return (
        <>
            <Hero />
            <AboutUs />
            <Steps />
            <Packages />
            <TicketsScroller />
            <FAQ />
            <FooterCTA />
        </>
    )
}

export default Home