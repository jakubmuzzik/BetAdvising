import React from 'react'
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../constants'
import { normalize } from '../utils'
import * as Linking from 'expo-linking'

import Accordion from './animated/Accordion'

const FAQ = () => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < 1000

    return (
        <View
            dataSet={{ id: 'contact' }}
            style={{
                flexDirection: isSmallScreen ? 'column' : 'row',
                //flexWrap: 'wrap',
                paddingHorizontal: SPACING.page_horizontal,
                width: '100%',
                maxWidth: 1380,
                justifyContent: 'center',
                gap: isSmallScreen ? 50 : 100,
                alignSelf: 'center',
                marginTop: normalize(190)
            }}
        >
            <View>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.h1,
                        color: COLORS.white,
                        marginBottom: 4,
                        textAlign: isSmallScreen ? 'center' : 'left'
                    }}
                >
                    Máte otázky?
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.h1,
                        color: COLORS.white,
                        marginBottom: SPACING.medium,
                        textAlign: isSmallScreen ? 'center' : 'left'
                    }}
                >
                    Máme odpovědi!
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.light,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.grey300,
                        textAlign: isSmallScreen ? 'center' : 'left'
                    }}
                >
                    Chcete vědět více? Kontaktuje nás kdykoliv na
                </Text>
                <Text
                    onPress={() => Linking.openURL('mailto:support@bet4you.cz')}
                    style={{
                        fontFamily: FONTS.light,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.accent,
                        marginTop: 4,
                        textAlign: isSmallScreen ? 'center' : 'left'
                    }}
                >
                    support@bet4you.cz
                </Text>
            </View>
            <View
                style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    gap: SPACING.medium,
                }}
            >
                <Accordion 
                    headerText='Kolik stojí odemčení jednoho tipu?'
                    bodyText='Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.'
                    headerTextStyle={styles.accordionHeader}
                    bodyTextStyle={styles.accordionBody}
                    backgroundColor={COLORS.secondary}
                />
                <Accordion 
                    headerText='Jak si mohu vytvořit účet?'
                    bodyText='Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.'
                    headerTextStyle={styles.accordionHeader}
                    bodyTextStyle={styles.accordionBody}
                    backgroundColor={COLORS.secondary}
                />
                <Accordion 
                    headerText='Jak si mohu vytvořit účet?'
                    bodyText='Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.'
                    headerTextStyle={styles.accordionHeader}
                    bodyTextStyle={styles.accordionBody}
                    backgroundColor={COLORS.secondary}
                />
                <Accordion 
                    headerText='Jak si mohu vytvořit účet?'
                    bodyText='Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.'
                    headerTextStyle={styles.accordionHeader}
                    bodyTextStyle={styles.accordionBody}
                    backgroundColor={COLORS.secondary}
                />
                <Accordion 
                    headerText='Jak si mohu vytvořit účet?'
                    bodyText='Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu.'
                    headerTextStyle={styles.accordionHeader}
                    bodyTextStyle={styles.accordionBody}
                    backgroundColor={COLORS.secondary}
                />
            </View>
        </View>
    )
}

export default FAQ

const styles = StyleSheet.create({
    accordionHeader: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.large,
        color: COLORS.white
    },
    accordionBody: {
        fontFamily: FONTS.light,
        fontSize: FONT_SIZES.medium,
        color: COLORS.grey300,
        lineHeight: FONT_SIZES.medium * 1.5
    }
})