import React, { useState, useRef } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING, SPORTS } from '../../../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import CustomInput from '../../../components/elements/CustomInput'
import CustomButton from '../../../components/elements/CustomButton'
import HoverableView from '../../../components/elements/HoverableView'
import DropdownSelect from '../../../components/elements/DropdownSelect'

const Match = ({ setTicketEntries, match, index, onRowDeletePress, offsetX }) => {
    const onDateChange = (val, attr) => {
        const strippedText = val.replaceAll('.', '').replaceAll(' ', '').replace(/[^0-9]/g, '')

        if (strippedText.length > 8) {
            return
        }

        setTicketEntries(entries => {
            entries[index][attr] = strippedText
            return [...entries]
        })
    }

    const onTimeChange = (val, attr) => {
        const strippedText = val.replaceAll(':', '').replaceAll(' ', '').replace(/[^0-9]/g, '')

        if (strippedText.length > 4) {
            return
        }

        setTicketEntries(entries => {
            entries[index][attr] = strippedText
            return [...entries]
        })
    }

    const getDateString = (str) => {
        if (!str) {
            return ''
        }

        switch (str.length) {
            case 0:
                return ''
            case 1:
                return str
            case 2:
                return str
            case 3:
                return str[0] + str[1] + '-' + str[2]
            case 4:
                return str[0] + str[1] + '-' + str[2] + str[3]
            case 5:
                return str[0] + str[1] + '-' + str[2] + str[3] + '-' + str[4]
            case 6:
                return str[0] + str[1] + '-' + str[2] + str[3] + '-' + str[4] + str[5]
            case 7:
                return str[0] + str[1] + '-' + str[2] + str[3] + '-' + str[4] + str[5] + str[6]
            case 8:
                return str[0] + str[1] + '-' + str[2] + str[3] + '-' + str[4] + str[5] + str[6] + str[7]
            default:
                return str[0] + str[1] + '-' + str[2] + str[3] + '-' + str[4] + str[5] + str[5] + str[7]
        }
    }

    const getTimeString = (str) => {
        if (!str) {
            return ''
        }

        switch (str.length) {
            case 0:
                return ''
            case 1:
                return str
            case 2:
                return str 
            case 3:
                return str[0] + str[1] + ':' + str[2]
            case 4:
                return str[0] + str[1] + ':' + str[2] + str[3]
            default:
                return str[0] + str[1] + ':' + str[2] + str[3]
        }
    }

    return (
        <View
            style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.whiteBackground2,
                backgroundColor: COLORS.secondary2,
                padding: SPACING.small,
                gap: SPACING.small
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: SPACING.small,
                    marginBottom: SPACING.small
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        fontSize: FONT_SIZES.xx_large,
                        fontFamily: FONTS.medium                        
                    }}
                >
                    Zápas č. {index + 1}
                </Text>

                <HoverableView
                    hoveredBackgroundColor={COLORS.hoveredSecondary}
                    style={{
                        borderRadius: '100%'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            padding: 8,
                        }}
                        onPress={() => onRowDeletePress(index)}
                    >
                        <MaterialCommunityIcons name="delete-outline" size={20} color="white" />
                    </TouchableOpacity>
                </HoverableView>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SPACING.small
                }}
            >
                <DropdownSelect
                    label='Sport'
                    placeholder='Fotbal'
                    containerStyle={{ flex: 1 }}
                    values={SPORTS}
                    text={match.sport}
                    errorMessage={match.sportErrorMessage}
                    setText={(text) => {
                        setTicketEntries(entries => {
                            entries[index].sport = text
                            return [...entries]
                        })
                    }}
                    rightIconName='chevron-down'
                    offsetX={offsetX}
                />

                <CustomInput
                    containerStyle={{ flex: 1 }}
                    placeholder='Premier League'
                    label='Liga'
                    value={match.league}
                    errorMessage={match.leagueErrorMessage}
                    onChangeText={text => {
                        setTicketEntries(entries => {
                            entries[index].league = text
                            return [...entries]
                        })
                    }}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SPACING.small
                }}
            >
                <CustomInput
                    containerStyle={{ flex: 1 }}
                    placeholder='Liverpool'
                    label='Domácí'
                    value={match.home}
                    errorMessage={match.homeErrorMessage}
                    onChangeText={text => {
                        setTicketEntries(entries => {
                            entries[index].home = text
                            return [...entries]
                        })
                    }}
                />
                <CustomInput
                    containerStyle={{ flex: 1 }}
                    placeholder='Manchester United'
                    label='Hosté'
                    value={match.away}
                    errorMessage={match.awayErrorMessage}
                    onChangeText={text => {
                        setTicketEntries(entries => {
                            entries[index].away = text
                            return [...entries]
                        })
                    }}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SPACING.small
                }}
            >
                <CustomInput
                    containerStyle={{ flex: 1 }}
                    placeholder='05-08-2024'
                    label='Datum'
                    value={getDateString(match.date)}
                    errorMessage={match.dateErrorMessage}
                    onChangeText={text => onDateChange(text, 'date')}
                />
                <CustomInput
                    containerStyle={{ flex: 1 }}
                    placeholder='15:00'
                    label='Čas'
                    value={getTimeString(match.time)}
                    errorMessage={match.timeErrorMessage}
                    onChangeText={text => onTimeChange(text, 'time')}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SPACING.small
                }}
            >
                <CustomInput
                    containerStyle={{ flex: 1 }}
                    placeholder='Výsledek zápasu: 1'
                    label='Typ'
                    value={match.type}
                    errorMessage={match.typeErrorMessage}
                    onChangeText={text => {
                        setTicketEntries(entries => {
                            entries[index].type = text
                            return [...entries]
                        })
                    }}
                />
                <CustomInput
                    containerStyle={{ flex: 1 }}
                    placeholder='1.5'
                    label='Kurz'
                    value={match.odds}
                    errorMessage={match.oddsErrorMessage}
                    onChangeText={text => {
                        setTicketEntries(entries => {
                            entries[index].odds = text
                            return [...entries]
                        })
                    }}
                />
            </View>
        </View>
    )
}

const NewTicket = ({ offsetX }) => {
    const [ticket, setTicket] = useState({
        price: '',
        priceErrorMessage: undefined
    })
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
            return [...d]
        })
    }

    const onSavePress = async () => {
        let updatedTicketEntries = {}
        let isValid = ticketEntries.reduce((out, current) => {
            if (!current.sport) {
                current.sportErrorMessage = 'Sport is required'
                out = false
            } else {
                current.sportErrorMessage = ''
            }

            if (!current.league) {
                current.leagueErrorMessage = 'League is required'
                out = false
            } else {
                current.leagueErrorMessage = '' 
            }

            if (!current.home) {
                current.homeErrorMessage = 'Home is required'
                out = false
            } else {
                current.homeErrorMessage = ''
            }
            
            if (!current.away) {
                current.awayErrorMessage = 'Away is required'
                out = false
            } else {
                current.awayErrorMessage = ''
            }

            if (!current.date || current.date.length !== 8) {
                current.dateErrorMessage = 'Date is required'
                out = false
            } else {
                current.dateErrorMessage = ''
            }

            if (!current.time || current.time.length !== 4) {
                current.timeErrorMessage = 'Time is required'
                out = false
            } else {
                current.timeErrorMessage = ''
            }

            if (!current.type) {
                current.typeErrorMessage = 'Type is required'
                out = false
            } else {
                current.typeErrorMessage = ''
            }

            if (!current.odds) {
                current.oddsErrorMessage = 'Odds is required'
                out = false
            } else {
                current.oddsErrorMessage = ''
            }

            updatedTicketEntries = {...updatedTicketEntries, ...current}

            return out
        }, true)
        
        if (!ticket.price) {
            isValid = false
            setTicket(t => {
                t.priceErrorMessage = 'Price is required'
                return {...t}
            })
        } else {
            setTicket(t => {
                t.priceErrorMessage = ''
                return {...t}
            })
        }

        if (!isValid) {
            setTicketEntries([...ticketEntries])
            return
        }
    }

    return (
        <View
            style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.whiteBackground2,
                backgroundColor: COLORS.secondary,
                padding: SPACING.small
            }}
        >
            <Text
                style={{
                    color: COLORS.white,
                    fontSize: FONT_SIZES.h3,
                    fontFamily: FONTS.medium,
                    marginBottom: SPACING.small
                }}
            >
                Informace o tiketu
            </Text>
            <View
                style={{
                    width: 'fit-content'
                }}
            >
                <CustomInput
                    placeholder='100'
                    label='Cena'
                    value={ticket.price}
                    errorMessage={ticket.priceErrorMessage}
                    onChangeText={text => {
                        setTicket((t) => {
                            t.price = text
                            return {...t}
                        })
                    }}
                    keyboardType='numeric'
                />
            </View>

            <View style={{ height: 1, backgroundColor: COLORS.whiteBackground2, width: '100%', marginVertical: SPACING.medium }} />

            <Text
                style={{
                    color: COLORS.white,
                    fontSize: FONT_SIZES.h3,
                    fontFamily: FONTS.medium,
                    marginBottom: SPACING.small
                }}
            >
                Zápasy
            </Text>

            <View
                style={{
                    gap: SPACING.medium,
                }}
            >
                {ticketEntries.map((entry, index) => (
                    <Match key={index} offsetX={offsetX} setTicketEntries={setTicketEntries} match={entry} index={index} onRowDeletePress={onRowDeletePress}/>
                ))}
            </View>

            <View
                style={{
                    marginTop: SPACING.medium,
                    width: 'fit-content',
                }}
            >
                <CustomButton
                    onPress={onAddMatchPress}
                    textColor={COLORS.white}
                    buttonText='Přidat zápas'
                    textStyles={{ fontSize: FONT_SIZES.large, fontFamily: FONTS.regular, }}
                    additionalStyles={{ borderWidth: 1, borderColor: COLORS.white, borderRadius: 20 }}
                />
            </View>

            <View style={{ height: 1, backgroundColor: COLORS.whiteBackground2, width: '100%', marginVertical: SPACING.medium }} />

            <View
                style={{
                    alignSelf: 'flex-end',
                    width: 'fit-content',
                }}
            >
                <CustomButton
                    onPress={onSavePress}
                    textColor={COLORS.black}
                    buttonText='Vytvořit tiket'
                    textStyles={{ fontSize: FONT_SIZES.large }}
                    additionalStyles={{ borderRadius: 10 }}
                    backgroundColors={[COLORS.accent2, COLORS.accent, COLORS.accent, COLORS.accent2]}
                />
            </View>
        </View>
    )
}

export default NewTicket