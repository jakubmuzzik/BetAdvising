import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { View, Text } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../../../constants'
import { normalize, calculateTimeDifference } from '../../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'

import withSearchParams from '../../../components/hoc/withSearchParams'

import UnlockedTicket from '../../../components/tickets/UnlockedTicket'
import LockedTicket from '../../../components/tickets/LockedTicket'

const GAP = normalize(60)

const OFFERS = [
    {
        id: 1,
        type: 'AKO',
        name: '#35',
        odd: 2.5,
        stake: 4500,
        //3 hours from now
        first_match_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
        match_count: 3,
        tickets: [],
        price: 100
    },
    {
        id: 2,
        type: 'AKO',
        name: '#34',
        odd: 2.5,
        stake: 2400,
        price: 100,
        //3 hours from now
        first_match_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
        tickets: [
            {
                type: 'AKO',
                name: '#34',
                odd: 3.0,
                stake: 100,
                result: 'win',
                //3 hours from now
                first_match_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
                ticket_entries: [
                    {
                        id: 1,
                        sport: 'Football',
                        start_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
                        team_home: 'Manchester United',
                        team_away: 'Chelsea',
                        tip: 'Výsledek zápasu: 1',
                        odd: 1.5,
                        league: 'Premier League',
                        // pending / win / lose / cancelled
                        result: 'win',
                    },
                    {
                        id: 2,
                        sport: 'Football',
                        start_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
                        team_home: 'Manchester United',
                        team_away: 'Chelsea',
                        tip: 'Výsledek zápasu: 1',
                        odd: 1.5,
                        league: 'Premier League',
                        // pending / win / lose / cancelled
                        result: 'win',
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        type: 'Single',
        name: '#33',
        odd: 3.5,
        stake: 1000,
        price: 100,
        //3 hours from now
        first_match_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
        match_count: 1,
        tickets: []
    },
]

const TimeLeft = ({ startDate }) => {

    const timeLeft = calculateTimeDifference(new Date(), startDate) 

    //contains calculated time left using current time and startDate
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

const Divider = ({ isLast }) => {
    const [contentHeight, setContentHeight] = useState(0)

    return (
        <View onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)} >
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
                <MaterialIcons name='lock-open' size={18} color={COLORS.white} />
            </LinearGradient>
            {!isLast && <LinearGradient
                colors={[COLORS.whiteBackground2, COLORS.whiteBackground2, COLORS.whiteBackground2]}
                style={{
                    width: 1,
                    position: 'absolute',
                    //top: -20,
                    left: 17.5,
                    height: contentHeight + GAP,
                }}
            />}
        </View>
    )
}

const Offers = ({ searchParams, setTabHeight }) => {

    return (
        <View
            onLayout={(event) => setTabHeight(event.nativeEvent.layout.height)}
            style={{
                width: 900,
                maxWidth: '100%',
                alignSelf: 'center',
                paddingHorizontal: SPACING.medium,
                paddingTop: SPACING.xx_large,
                backgroundColor: COLORS.primary,
                gap: GAP
                //alignItems: 'center',
            }}
        >
            {OFFERS.map((offer, index) => (
                <View
                    style={{
                        flexDirection: 'row',
                        gap: SPACING.small,
                        //width: 800
                    }}
                >
                    <TimeLeft startDate={offer.first_match_date} />
                    <Divider isLast={index === OFFERS.length - 1} />

                    {offer.tickets.length > 0 ? (
                        <UnlockedTicket
                            key={offer.id}
                            ticket={offer.tickets[0]}
                            isLast={index === OFFERS.length - 1}
                        />
                    ) : (
                        <LockedTicket
                            key={offer.id}
                            ticket={offer}
                            isLast={index === OFFERS.length - 1}
                        />
                    )}
                </View>
            ))}
        </View>
    )
}

export default withSearchParams(Offers, ['language'])