import React, { useState, useRef } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING, SPORTS, PACKAGE_TYPES } from '../../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { supabase } from '../../supabase/config'

import CustomInput from '../../components/elements/CustomInput'
import CustomButton from '../../components/elements/CustomButton'
import HoverableView from '../../components/elements/HoverableView'
import DropdownSelect from '../../components/elements/DropdownSelect'
import { connect } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { storeCreatedTicketToRedux } from '../../redux/actions/admin'

import withSearchParams from '../../components/hoc/withSearchParams'

const DEFAULT_TICKET_ENTRIES = [
    { sport: '', league: '', home: '', away: '', date: '', time: '', tip: '', odds: '' }
]

const DEFAULT_TICKET = {
    price: '',
    priceErrorMessage: undefined,
    stake: '',
    stakeErrorMessage: undefined,
}

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
                backgroundColor: COLORS.secondary,
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
                    options={SPORTS}
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
                    value={match.tip}
                    errorMessage={match.typeErrorMessage}
                    onChangeText={text => {
                        setTicketEntries(entries => {
                            entries[index].tip = text
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
                            entries[index].odds = text.replace(/[^0-9.]/g, '')
                            return [...entries]
                        })
                    }}
                />
            </View>
        </View>
    )
}

const NewTicket = ({ offsetX, toastRef, setTabHeight, searchParams, storeCreatedTicketToRedux }) => {
    const saveButtonRef = useRef()

    const [ticket, setTicket] = useState(DEFAULT_TICKET)
    const [ticketEntries, setTicketEntries] = useState(DEFAULT_TICKET_ENTRIES)

    const navigate = useNavigate()

    const onAddMatchPress = () => {
        setTicketEntries(entries => {
            return [...entries, { sport: '', league: '', home: '', away: '', date: '', time: '', tip: '', odds: '' }]
        })
    }

    const onRowDeletePress = (index) => {
        setTicketEntries(d => {
            d.splice(index, 1)
            return [...d]
        })
    }

    const convertStringsToDateTime = (dateStr, timeStr) => {
        // Extract day, month, and year from date string
        const day = parseInt(dateStr.substring(0, 2), 10)
        const month = parseInt(dateStr.substring(2, 4), 10) - 1 // Months are 0-based in JS Date
        const year = parseInt(dateStr.substring(4, 8), 10)

        // Extract hours and minutes from time string
        const hours = parseInt(timeStr.substring(0, 2), 10)
        const minutes = parseInt(timeStr.substring(2, 4), 10)

        // Create a Date object
        const dateObj = new Date(year, month, day, hours, minutes)
        return dateObj
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

            if (!current.tip) {
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

            if (current.date && current.time && current.date.length === 8 && current.time.length === 4) {
                const entryDateTime = convertStringsToDateTime(current.date, current.time)
                if (entryDateTime < new Date()) {
                    console.log('Date is in the past')
                    current.dateErrorMessage = 'Date must be in the future'
                    current.timeErrorMessage = 'Time must be in the future'
                    out = false
                } else {
                    current.dateErrorMessage = ''
                    current.timeErrorMessage = ''
                }
            }

            updatedTicketEntries = { ...updatedTicketEntries, ...current }

            return out
        }, true)

        if (!ticket.price) {
            isValid = false
            setTicket(t => {
                t.priceErrorMessage = 'Price is required'
                return { ...t }
            })
        } else {
            setTicket(t => {
                t.priceErrorMessage = undefined
                return { ...t }
            })
        }

        if (!ticket.stake) {
            isValid = false
            setTicket(t => {
                t.stakeErrorMessage = 'Stake is required'
                return { ...t }
            })
        } else {
            setTicket(t => {
                t.stakeErrorMessage = undefined
                return { ...t }
            })
        }

        if (!isValid) {
            setTicketEntries([...ticketEntries])
            return
        }

        const price = PACKAGE_TYPES.find(type => type.label === ticket.price).price

        if (!price) {
            toastRef?.show({
                text: 'Price is required',
                type: 'error'
            })
            return
        }

        try {
            saveButtonRef.current.setIsLoading(true)

            let formattedEntries = ticketEntries.map(entry => ({
                sport: entry.sport,
                league: entry.league,
                home: entry.home,
                away: entry.away,
                start_date: convertStringsToDateTime(entry.date, entry.time),
                tip: entry.tip,
                odd: entry.odds
            }))

            const { data, error } = await supabase
                .from('tickets')
                .insert({
                    price,
                    stake: ticket.stake,
                    start_date: formattedEntries.sort((a, b) => a.start_date - b.start_date)[0].start_date,
                })
                .select('id, name')

            if (error) {
                toastRef?.show({
                    text: 'Could not save ticket',
                    type: 'error'
                })

                throw error
            }

            const ticketId = data[0].id
            const ticketName = data[0].name

            formattedEntries = formattedEntries.map(entry => ({
                ...entry,
                ticket: ticketId
            }))

            const { error: entriesError } = await supabase
                .from('ticket_entries')
                .insert(formattedEntries)

            if (entriesError) {
                toastRef?.show({
                    text: 'Could not save ticket entries',
                    type: 'error'
                })

                throw entriesError
            }

            const hashedTicketEntries = formattedEntries.map(entry => ({
                ...Object.keys(entry).reduce((out, current) => {
                    if (current === 'start_date' || current === 'ticket') {
                        return out
                    }

                    out[current] = entry[current].length //createRandomString(entry[current].length)

                    return out
                }, {})
            }))

            console.log(hashedTicketEntries)

            const { error: hashedEntriesError } = await supabase
                .from('ticket_offers')
                .insert({
                    ticket: ticketId,
                    name: ticketName,
                    odd: formattedEntries.reduce((out, current) => out * current.odd, 1),
                    stake: ticket.stake,
                    start_date: formattedEntries.sort((a, b) => a.start_date - b.start_date)[0].start_date,
                    data: hashedTicketEntries,
                    price
                })

            if (hashedEntriesError) {
                toastRef?.show({
                    text: 'Could not save hashed ticket entries.',
                    type: 'error'
                })

                throw hashedEntriesError
            }

            toastRef?.show({
                text: 'Ticket created successfully.',
                type: 'success'
            })

            storeCreatedTicketToRedux(ticketId)

            navigate({
                pathname: '/admin',
                search: new URLSearchParams(searchParams).toString() 
            })
        } catch (e) {
            console.error(e)
        } finally {
            saveButtonRef.current.setIsLoading(false)
        }
    }

    return (
        <View
            onLayout={(event) => setTabHeight(event.nativeEvent.layout.height)}
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
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: COLORS.whiteBackground2,
                    backgroundColor: COLORS.secondary,
                    padding: SPACING.small,
                    marginBottom: SPACING.medium
                }}
            >

                <View style={{
                    flexDirection: 'row',
                    gap: SPACING.medium,
                }}>
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        {/* <CustomInput
                            placeholder='100'
                            label='Cena'
                            value={ticket.price}
                            errorMessage={ticket.priceErrorMessage}
                            onChangeText={text => {
                                setTicket((t) => {
                                    t.price = text
                                    return { ...t }
                                })
                            }}
                            keyboardType='numeric'
                        /> */}
                        <DropdownSelect
                            label='Cena'
                            placeholder='Cena'
                            containerStyle={{ flex: 1 }}
                            options={PACKAGE_TYPES}
                            text={ticket.price}
                            errorMessage={ticket.priceErrorMessage}
                            setText={(text) => {
                                setTicket((t) => {
                                    t.price = text
                                    return { ...t }
                                })
                            }}
                            rightIconName='chevron-down'
                            offsetX={offsetX}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <CustomInput
                            placeholder='100'
                            label='Kolik jsme vsadili'
                            value={ticket.stake}
                            errorMessage={ticket.stakeErrorMessage}
                            onChangeText={text => {
                                setTicket((t) => {
                                    t.stake = text
                                    return { ...t }
                                })
                            }}
                            keyboardType='numeric'
                        />
                    </View>
                </View>
            </View>

            <Text
                style={{
                    color: COLORS.white,
                    fontSize: FONT_SIZES.h3,
                    fontFamily: FONTS.medium,
                    marginBottom: SPACING.small,
                    marginTop: SPACING.medium
                }}
            >
                Zápasy
            </Text>

            <View
                style={{
                    //borderWidth: 1,
                    //borderRadius: 10,
                    //borderColor: COLORS.whiteBackground2,
                    //backgroundColor: COLORS.secondary,
                    //padding: SPACING.small
                }}
            >



                <View
                    style={{
                        gap: SPACING.medium,
                    }}
                >
                    {ticketEntries.map((entry, index) => (
                        <Match key={index} offsetX={offsetX} setTicketEntries={setTicketEntries} match={entry} index={index} onRowDeletePress={onRowDeletePress} />
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
                        textColor={COLORS.accent}
                        backgroundColors={COLORS.accentSecondary}
                        buttonText='Přidat zápas'
                        textStyles={{ fontSize: FONT_SIZES.large, fontFamily: FONTS.regular, }}
                        additionalStyles={{ borderWidth: 1, borderColor: COLORS.accentSecondaryBorder }}
                    />
                </View>
            </View>

            <View
                style={{
                    alignSelf: 'flex-end',
                    width: 'fit-content',
                    marginTop: SPACING.medium
                }}
            >
                <CustomButton
                    ref={saveButtonRef}
                    onPress={onSavePress}
                    textColor={COLORS.black}
                    buttonText='Vytvořit tiket'
                    textStyles={{ fontSize: FONT_SIZES.large }}
                    additionalStyles={{ borderRadius: 10 }}
                    backgroundColors={COLORS.accent}
                />
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef
})


export default connect(mapStateToProps, { storeCreatedTicketToRedux })(withSearchParams(NewTicket, ['language']))