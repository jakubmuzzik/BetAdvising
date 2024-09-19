import React from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../../constants'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { getEventDate, getEventTime } from '../../utils'

import withSearchParams from '../hoc/withSearchParams'

const TicketHeader = ({ name, type }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: SPACING.x_small
        }}
    >
        <View
            style={{
                flexDirection: 'row',
                gap: SPACING.xx_small,
                alignItems: 'center',
            }}
        >
            <MaterialCommunityIcons name="ticket-confirmation" size={30} color={COLORS.grey200} />
            <View>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.small,
                        color: COLORS.grey400,
                        marginBottom: 2
                    }}
                >
                    {type}
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.white
                    }}
                >
                    Tiket {name}
                </Text>
            </View>
        </View>
    </View>
)

const Match = ({ match, width }) => (
    <View
        style={{
            flex: 1
        }}
    >
        <View
            style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 1,
                gap: 10
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SPACING.xx_small,
                    flexShrink: 1
                }}
            >
                <FontAwesome name="soccer-ball-o" size={18} color={COLORS.grey300} />
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: width < 420 ? FONT_SIZES.medium : FONT_SIZES.large,
                        color: COLORS.white,
                        flexShrink: 1
                    }}
                    //numberOfLines={1}
                >
                    {match.team_home} - {match.team_away}
                </Text>
            </View>

            <View>
                {
                    match.result === 'pending' ? <MaterialIcons name="question-mark" size={FONT_SIZES.x_large} color={COLORS.white} />
                    : match.result === 'wing' ? <MaterialIcons name="question-mark" size={FONT_SIZES.x_large} color={COLORS.white} />
                    : match.result === 'lose' ? <MaterialIcons name="question-mark" size={FONT_SIZES.x_large} color={COLORS.white} />
                    : <MaterialIcons name="question-mark" size={FONT_SIZES.x_large} color={COLORS.white} />
                }
            </View>
        </View>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <View>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 4
                    }}
                >
                    {getEventDate(match.start_date, false, true)}, {getEventTime(match.start_date)}
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 4
                    }}
                >
                    {match.tip}
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300
                    }}
                >
                    {match.league}
                </Text>
            </View>

            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.white,
                    textAlign: 'right'
                }}
            >
                {match.odd}
            </Text>
        </View>
    </View>
)

const TicketBody = ({ ticket }) => {
    const { width } = useWindowDimensions()

    return (
        <View style={{
            padding: SPACING.small,
            backgroundColor: COLORS.secondary2,
            borderTopWidth: 1,
            borderColor: COLORS.whiteBackground2,
            gap: SPACING.medium
        }}>
            {ticket.ticket_entries.map((match) => (
                <Match key={match.id} match={match} width={width}/>
            ))}
        </View>
    )
}

const TicketFooter = ({ odd, result }) => (
    <View
        style={{
            padding: SPACING.xx_small,
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderTopWidth: 1,
            borderColor: COLORS.whiteBackground2,
        }}
    >
        <View>
            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey400
                }}
            >
                Celkový kurz
            </Text>
            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.white,
                    marginTop: 4,
                    textAlign: 'center'
                }}
            >
                {odd}
            </Text>
        </View>
        <View>
            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey400
                }}
            >
                Výsledek
            </Text>
            <View
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.white,
                    marginTop: 4,
                    alignItems: 'center'
                }}
            >
                {
                    result === 'pending' ? <MaterialIcons name="question-mark" size={FONT_SIZES.large} color={COLORS.white} />
                    : result === 'wing' ? <MaterialIcons name="question-mark" size={FONT_SIZES.large} color={COLORS.white} />
                    : result === 'lose' ? <MaterialIcons name="question-mark" size={FONT_SIZES.large} color={COLORS.white} />
                    : <MaterialIcons name="question-mark" size={FONT_SIZES.large} color={COLORS.white} />
                }
            </View>
        </View>
    </View>
)

const UnlockedTicket = ({ ticket, searchParams }) => {
    return (
        <View
            style={{
                borderRadius: 10,
                backgroundColor: COLORS.secondary,
                borderWidth: 1,
                borderColor: COLORS.whiteBackground2,
                flexGrow: 1
            }}
        >
            <TicketHeader type={ticket.type} name={ticket.name} />
            <TicketBody ticket={ticket} />
            <TicketFooter odd={ticket.odd} stake={ticket.result} />
        </View>
    )
}

export default withSearchParams(UnlockedTicket, ['language'])