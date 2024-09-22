import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../../../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import CustomInput from '../../../components/elements/CustomInput'
import CustomButton from '../../../components/elements/CustomButton'

const NewTicket = () => {
    const [ticketEntries, setTicketEntries] = useState([
        { sport: '', league: '', home: '', away: '', date: '', time: '', type: '', odds: '' }
    ])

    const onAddMatchPress = () => {
        setTicketEntries(entries => {
            return [...entries, { sport: '', league: '', home: '', away: '', date: '', time: '', type: '', odds: '' }]
        })
    }

    const onRowDeletePress = (index) => {
        setTicketEntries(d => {
            d.splice(index, 1)
            return [ ...d ]
        })
    }

    return (
        <View
            style={{
                width: '100%',
            }}
        >
            <View
                style={{
                    
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: COLORS.whiteBackground2,
                    backgroundColor: COLORS.secondary,
                    overflow: 'hidden',
                    overflow: 'scroll',
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View
                        style={[styles.th, styles.sportCol]}
                    >
                        <Text style={styles.thText}>Sport</Text>
                    </View>
                    <View
                        style={[styles.th, styles.leagueCol]}
                    >
                        <Text style={styles.thText}>Liga</Text>
                    </View>
                    <View
                        style={[styles.th, styles.homeCol]}
                    >
                        <Text style={styles.thText}>Domácí</Text>
                    </View>
                    <View
                        style={[styles.th, styles.awayCol]}
                    >
                        <Text style={styles.thText}>Hosté</Text>
                    </View>
                    <View
                        style={[styles.th, styles.dateCol]}
                    >
                        <Text style={styles.thText}>Datum</Text>
                    </View>
                    <View
                        style={[styles.th, styles.timeCol]}
                    >
                        <Text style={styles.thText}>Čas</Text>
                    </View>
                    <View
                        style={[styles.th, styles.typeCol]}
                    >
                        <Text style={styles.thText}>Typ</Text>
                    </View>
                    <View
                        style={[styles.th, styles.oddsCol]}
                    >
                        <Text style={styles.thText}>Kurz</Text>
                    </View>
                    <View
                        style={[styles.th, styles.actionsCol]}
                    >

                    </View>
                </View>

                {ticketEntries.map((entry, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.td, styles.sportCol]}>
                            <CustomInput
                                containerStyle={{}}
                                placeholder='Fotbal'
                                label='Sport'
                                value={entry.sport}
                                onChangeText={text => {
                                    setTicketEntries(entries => {
                                        entries[index].sport = text
                                        return [...entries]
                                    })
                                }}
                            />
                        </View>
                        <View style={[styles.td, styles.leagueCol]}>
                            <CustomInput
                                containerStyle={{}}
                                placeholder='Premier League'
                                label='Liga'
                                value={entry.league}
                                onChangeText={text => {
                                    setTicketEntries(entries => {
                                        entries[index].league = text
                                        return [...entries]
                                    })
                                }}
                            />
                        </View>
                        <View style={[styles.td, styles.homeCol]}>
                            <CustomInput
                                containerStyle={{}}
                                placeholder='Liverpool'
                                label='Domácí'
                                value={entry.home}
                                onChangeText={text => {
                                    setTicketEntries(entries => {
                                        entries[index].home = text
                                        return [...entries]
                                    })
                                }}
                            />
                        </View>
                        <View style={[styles.td, styles.awayCol]}>
                            <CustomInput
                                containerStyle={{}}
                                placeholder='Manchester United'
                                label='Hosté'
                                value={entry.away}
                                onChangeText={text => {
                                    setTicketEntries(entries => {
                                        entries[index].away = text
                                        return [...entries]
                                    })
                                }}
                            />
                        </View>
                        <View style={[styles.td, styles.dateCol]}>
                            <CustomInput
                                containerStyle={{}}
                                placeholder='2022-08-05'
                                label='Datum'
                                value={entry.date}
                                onChangeText={text => {
                                    setTicketEntries(entries => {
                                        entries[index].date = text
                                        return [...entries]
                                    })
                                }}
                            />
                        </View>
                        <View style={[styles.td, styles.timeCol]}>
                            <CustomInput
                                containerStyle={{}}
                                placeholder='15:00'
                                label='Čas'
                                value={entry.time}
                                onChangeText={text => {
                                    setTicketEntries(entries => {
                                        entries[index].time = text
                                        return [...entries]
                                    })
                                }}
                            />
                        </View>
                        <View style={[styles.td, styles.typeCol]}>
                            <CustomInput
                                containerStyle={{}}
                                placeholder='Výsledek zápasu: 1'
                                label='Typ'
                                value={entry.type}
                                onChangeText={text => {
                                    setTicketEntries(entries => {
                                        entries[index].type = text
                                        return [...entries]
                                    })
                                }}
                            />
                        </View>
                        <View style={[styles.td, styles.oddsCol]}>
                            <CustomInput
                                containerStyle={{}}
                                placeholder='1.5'
                                label='Kurz'
                                value={entry.odds}
                                onChangeText={text => {
                                    setTicketEntries(entries => {
                                        entries[index].odds = text
                                        return [...entries]
                                    })
                                }}
                            />
                        </View>
                        <View style={[styles.td, styles.actionsCol]}>
                            <TouchableOpacity
                                onPress={() => onRowDeletePress(index)}
                            >
                                <MaterialCommunityIcons name="delete-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <View
                    style={{
                        width: 'fit-content',
                        padding: SPACING.small,
                    }}
                >
                    <CustomButton
                        onPress={onAddMatchPress}
                        textColor={COLORS.white}
                        buttonText='Přidat zápas'
                        textStyles={{ fontSize: FONT_SIZES.large, fontFamily: FONTS.regular, }}
                        additionalStyles={{ borderWidth: 1, borderColor: COLORS.white, borderRadius: 10 }}
                    />
                </View>
            </View>

            <View
                style={{
                    marginTop: SPACING.medium
                }}
            >
                <CustomButton
                    onPress={onAddMatchPress}
                    textColor={COLORS.white}
                    buttonText='Uložit'
                    textStyles={{ fontSize: FONT_SIZES.large, fontFamily: FONTS.regular, }}
                    additionalStyles={{ borderWidth: 1, borderColor: COLORS.white, borderRadius: 10 }}
                />
            </View>
        </View>
    )
}

export default NewTicket

const styles = StyleSheet.create({
    th: {
        backgroundColor: COLORS.secondary,
        color: COLORS.white,
        fontSize: FONT_SIZES.large,
        fontFamily: FONTS.medium,
        padding: SPACING.small,
        backgroundColor: COLORS.secondary2,
    },
    thText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.large,
        fontFamily: FONTS.medium,
    },
    td: {
        padding: SPACING.small,
    },
    sportCol: {
        width: 200
    },
    leagueCol: {
        width: 250
    },
    homeCol: {
        width: 250
    },
    awayCol: {
        width: 250
    },
    dateCol: {
        width: 200
    },
    timeCol: {
        width: 200
    },
    typeCol: {
        width: 200
    },
    oddsCol: {
        width: 120
    },
    actionsCol: {
        width: 100
    }
})