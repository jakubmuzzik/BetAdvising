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
                <div
                    style={{
                        background: `linear-gradient(180deg, ${COLORS.white}, rgba(255, 255, 255, 0.7))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: SPACING.medium,
                        textAlign: isSmallScreen ? 'center' : 'left'
                    }}
                >
                <span
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.h1,
                        color: COLORS.white,
                        marginBottom: 4,
                    }}
                >
                    Máte otázky? 
                </span>
                <br />
                <span
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.h1,
                        color: COLORS.white,
                    }}
                >
                    Máme odpovědi!
                </span>
                </div>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.grey400,
                        textAlign: isSmallScreen ? 'center' : 'left'
                    }}
                >
                    Chcete vědět více? Kontaktuje nás kdykoliv na
                </Text>
                <Text
                    onPress={() => Linking.openURL('mailto:support@tipstrike.cz')}
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.accent,
                        marginTop: 4,
                        textAlign: isSmallScreen ? 'center' : 'left'
                    }}
                >
                    support@tipstrike.cz
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
                    bodyText='Tipy se odemykají pomocí zakoupených kreditů. Cenově jsou rozděleny do dvou kategorií: Běžný a Exklusivní tip. Běžné tipy budou přidávány nejčastěji a stojí 50 kreditů. Exklusivní tipy jsou tipy s maximální důvěrou a zpravidla vyššími kurzy a jsou označeny ikonou zlatého diamantu. Cena exklusivního tipu je 100 kreditů. Exklusivní tipy jsou přidávány vyjímečně v závislosti na dostupných událostech.'
                    headerTextStyle={styles.accordionHeader}
                    bodyTextStyle={styles.accordionBody}
                    backgroundColor={COLORS.secondary}
                />
                <Accordion 
                    headerText='Co je to garance vrácení kreditů?'
                    bodyText='Garance vrácení kreditů znamená, že platíte jen za výherní tipy. Pokud odemčený tip nevyjde, vrátíme vám použité kredity zpět. Garance vrácení kreditů platí pro všechny naše tipy.'
                    headerTextStyle={styles.accordionHeader}
                    bodyTextStyle={styles.accordionBody}
                    backgroundColor={COLORS.secondary}
                />
                <Accordion 
                    headerText='Jak mohu získat 100 vstupních kreditů zdarma?'
                    bodyText='100 vstupních kreditů zdarma získáte po vytvoření účtu a jeho následném ověření. Ověření se provádí pomocí telefonního čísla. Po zadání telefonního čísla vám přijde SMS s ověřovacím kódem, který zadáte do aplikace. Po ověření obdržíte 100 kreditů zdarma. Jakmile bylo dané telefonní číslo ověřeno, nelze ho už použít pro ověření jiného účtu.'
                    headerTextStyle={styles.accordionHeader}
                    bodyTextStyle={styles.accordionBody}
                    backgroundColor={COLORS.secondary}
                />
                <Accordion 
                    headerText='Kolik tipů poskytujeme?'
                    bodyText='Tipy poskytujeme podle aktuálních sportovních událostí. Počet tipů se může lišit v závislosti na dostupných událostech a nalze tak určit přesný počet tipů, které budou poskytnuty.'
                    headerTextStyle={styles.accordionHeader}
                    bodyTextStyle={styles.accordionBody}
                    backgroundColor={COLORS.secondary}
                />
                <Accordion 
                    headerText='Čím se lišíme od konkurence?'
                    bodyText='Od konkurence se lišíme především členstvím, které není nijak časově omezeno. Kredity zůstávají na Vašem účtě dokud je nevyčerpáte a je jen na vás kdy je použijete. Dále poskytujeme tipy s garancí vrácení kreditů. Naše tipy jsou vytvářeny tipéry s dlouholetou zkušeností.'
                    headerTextStyle={styles.accordionHeader}
                    bodyTextStyle={styles.accordionBody}
                    backgroundColor={COLORS.secondary}
                />
                <Accordion 
                    headerText='Jak si mohu vytvořit účet?'
                    bodyText='Pro vytvoření účtu klikněte na tlačítko "Registrace" v pravém horním rohu. Bude potřeba vyplnit váš email a jméno. Po úspěšné registraci budete přesměrováni do aplikace a můžete začít s odemykáním tipů.'
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
        fontFamily: FONTS.regular,
        fontSize: FONT_SIZES.large,
        color: COLORS.grey300,
        lineHeight: FONT_SIZES.medium * 1.6
    }
})