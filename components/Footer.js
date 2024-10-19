import { StyleSheet } from 'react-native'
import { COLORS, SPACING, FONTS, FONT_SIZES } from '../constants'
import { LinearGradient } from 'expo-linear-gradient'
import { normalize } from '../utils'
import HoverableText from './elements/HoverableText'
import withSearchParams from './hoc/withSearchParams'
import { Link } from 'react-router-dom'


const Item = ({ text, pathname, searchParams }) => (
    <Link
        style={{
            textDecoration: 'none',
        }}
        to={{ pathname, search: new URLSearchParams(searchParams).toString() }}
    >
        <HoverableText
            text={text}
            hoveredColor={COLORS.white}
            textStyle={styles.itemText}
        />
    </Link>
)

const Footer = ({ searchParams }) => {

    return (
        <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            style={{ 
                padding: SPACING.large,
                gap: SPACING.medium,
                alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row'
            }}
        >
            <Item text="Obchodní podmínky" pathname="/terms-of-service" searchParams={searchParams} />
            <Item text="Zpracování osobních údajů" pathname="/privacy-policy" searchParams={searchParams} />
        </LinearGradient>
    )
}

export default withSearchParams(Footer, ['language'])

const styles = StyleSheet.create({
    itemText: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.medium,
        color: COLORS.grey400
    }
})