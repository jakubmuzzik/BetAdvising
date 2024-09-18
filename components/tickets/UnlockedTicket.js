import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { calculateTimeDifference, getEventDate } from '../../utils'

import CustomButton from '../elements/CustomButton'

const TimeLeft = ({ startDate }) => {
    const timeLeft = calculateTimeDifference(new Date(), startDate) 

    return (
        <View>
            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey400
                }}
            >
                Zbývá:
            </Text>
            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.x_large,
                    color: COLORS.white,
                    marginTop: 4
                }}
            >
                {timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}
                {timeLeft.hours > 0 ? `${timeLeft.hours}h ` : ''}
                {timeLeft.minutes > 0 ? `${timeLeft.minutes}m ` : ''}
                {timeLeft.seconds > 0 ? `${timeLeft.seconds}s ` : ''}
            </Text>
        </View>
    )
}

const Divider = ({ height }) => {

    return (
        <View>
            <LinearGradient
                colors={[COLORS.secondary, COLORS.secondary2]}
                style={{
                    borderRadius: 17.5,
                    width: 35,
                    height: 35,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2
                }}
            >
                <MaterialIcons name='lock-outline' size={18} color={COLORS.white} />
            </LinearGradient>
            <LinearGradient
                colors={[COLORS.whiteBackground2, COLORS.whiteBackground2, COLORS.whiteBackground2]}
                style={{
                    width: 1,
                    height: height,
                    position: 'absolute',
                    top: -20,
                    left: 17.5,
                    height: height + 30
                }}
            />
        </View>
    )
}

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

const Match = ({ match }) => (
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
                alignItems: 'center'
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SPACING.xx_small,

                }}
            >
                <FontAwesome name="soccer-ball-o" size={18} color={COLORS.grey300} />
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.white,
                    }}
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
                    {getEventDate(match.start_date, false, true)}
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

const TicketBody = ({ ticket }) => (
    <View style={{
        padding: SPACING.small,
        backgroundColor: COLORS.secondary2,
        borderTopWidth: 1,
        borderColor: COLORS.whiteBackground2,
        gap: SPACING.medium
    }}>
        {ticket.ticket_entries.map((match) => (
            <Match key={match.id} match={match} />
        ))}
    </View>
)

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

const UnlockedTicket = ({ ticket }) => {
    const [contentHeight, setContentHeight] = useState(0)

    return (
        <View
            onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
            style={{
                flexDirection: 'row',
                gap: SPACING.large,
                maxWidth: '100%',
                width: 900
            }}
        >
            <TimeLeft startDate={ticket.first_match_date} />

            <Divider height={contentHeight} />

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
        </View>
    )
}

export default UnlockedTicket