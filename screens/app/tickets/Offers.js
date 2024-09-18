import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { View, Text } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../../../constants'
import { normalize } from '../../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'

import withSearchParams from '../../../components/hoc/withSearchParams'
import HoverableView from '../../../components/elements/HoverableView'
import CustomButton from '../../../components/elements/CustomButton'

import UnlockedTicket from '../../../components/tickets/UnlockedTicket'
import LockedTicket from '../../../components/tickets/LockedTicket'

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
        tickets: []
    },
    {
        id: 2,
        type: 'AKO',
        name: '#34',
        odd: 2.5,
        stake: 2400,
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
        //3 hours from now
        first_match_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
        match_count: 1,
        tickets: []
    },
]

const Offers = ({ searchParams, setTabHeight }) => {

    return (
        <View
            onLayout={(event) => setTabHeight(event.nativeEvent.layout.height)}
            style={{
                //width: normalize(800),
                maxWidth: '100%',
                alignSelf: 'center',
                paddingHorizontal: SPACING.medium,
                paddingTop: SPACING.xx_large,
                backgroundColor: COLORS.primary,
                //alignItems: 'center',
            }}
        >
            <View style={{
                alignItems: 'center',
                gap: SPACING.large
            }}>
                {OFFERS.map((offer, index) => (
                    offer.tickets.length > 0 ? (
                        <UnlockedTicket
                            key={offer.id}
                            ticket={offer.tickets[0]}
                        />
                    ) : (
                        <LockedTicket
                            key={offer.id}
                            ticket={offer}
                        />
                    )
                ))}
            </View>
        </View>
    )
}

export default withSearchParams(Offers, ['language'])