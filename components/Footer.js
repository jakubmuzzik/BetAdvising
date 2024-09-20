import { View } from 'react-native'
import { COLORS, SPACING, FONTS, FONT_SIZES } from '../constants'
import { LinearGradient } from 'expo-linear-gradient'
import { normalize } from '../utils'
import HoverableText from './elements/HoverableText'

const Footer = () => {

    const onPress = () => {

    }

    return (
        <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            style={{ 
                padding: SPACING.large,
                //height: 200,
               // marginTop: normalize(100),
                alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row'
            }}
        >
            <HoverableText onPress={onPress} textStyle={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.grey400, marginHorizontal: SPACING.medium }} hoveredColor='#FFF' text="Contact Us" />
            <HoverableText onPress={onPress} textStyle={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.grey400, marginHorizontal: SPACING.medium }} hoveredColor='#FFF' text="FAQ" />
            <HoverableText onPress={onPress} textStyle={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.grey400, marginHorizontal: SPACING.medium }} hoveredColor='#FFF' text="Privacy Policy" />
            <HoverableText onPress={onPress} textStyle={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.grey400, marginHorizontal: SPACING.medium }} hoveredColor='#FFF' text="Terms of Service" />
        </LinearGradient>
    )
}

export default Footer