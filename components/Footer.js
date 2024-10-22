import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { COLORS, SPACING, FONTS, FONT_SIZES } from '../constants'
import { LinearGradient } from 'expo-linear-gradient'
import HoverableText from './elements/HoverableText'
import withSearchParams from './hoc/withSearchParams'
import { Link } from 'react-router-dom'
import HoverableView from './elements/HoverableView'
import { AntDesign } from '@expo/vector-icons'

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
            }}
        >
            <View
                style={{
                    width: '100%',
                    gap: SPACING.medium,
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexWrap: 'wrap', 
                    flexDirection: 'row'
                }}
            >
                <Item text="Obchodní podmínky" pathname="/terms-of-service" searchParams={searchParams} />
                <Item text="Zpracování osobních údajů" pathname="/privacy-policy" searchParams={searchParams} />
            </View>
            {/* <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: SPACING.small
                }}
            >
                <HoverableView
                    backgroundColor={COLORS.whiteBackground2}
                    hoveredBackgroundColor={COLORS.whiteBackground3}
                    style={{
                        borderRadius: 10
                    }}
                >
                    <TouchableOpacity
                        onPress={() => window.open('https://www.facebook.com/TipStrike-102105045384073')}
                        style={{
                            padding: SPACING.xxx_small,
                            borderRadius: 10
                        }}
                    >
                        <AntDesign
                            name="instagram"
                            size={20}
                            color={COLORS.grey300}
                        />
                    </TouchableOpacity>
                </HoverableView>
            </View> */}
            <View
                style={{
                    width: '100%',
                }}
            >
                <Text
                    style={styles.addressText}
                >
                    TipStrike s.r.o. Kurzova 2222/16, Stodůlky, 155 00 Praha 5
                </Text>
            </View>
        </LinearGradient>
    )
}

export default withSearchParams(Footer, ['language'])

const styles = StyleSheet.create({
    itemText: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.medium,
        color: COLORS.grey400
    },
    addressText: {
        fontFamily: FONTS.regular,
        fontSize: FONT_SIZES.medium,
        color: COLORS.grey500,
        textAlign: 'center',
    }
})