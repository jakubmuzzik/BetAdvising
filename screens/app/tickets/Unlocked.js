import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../../../constants'
import { normalize, getEventDate, getEventTime } from '../../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'

import withSearchParams from '../../../components/hoc/withSearchParams'

import UnlockedTicket from '../../../components/tickets/UnlockedTicket'

const GAP = normalize(60)

const OFFERS = [
    {
        id: 1,
        type: 'AKO',
        name: '#34',
        odd: 3.0,
        stake: 100,
        result: 'win',
        //3 hours from now
        created_date: new Date(),
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
                result: 'cancelled',
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
    },
    {
        id: 2,
        type: 'Single',
        name: '#34',
        odd: 3.0,
        stake: 100,
        result: 'win',
        //3 hours from now
        created_date: new Date(),
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
            }
        ]
    }
]

const TimeStamp = ({ createdDate, width, onTimeLeftLayout=() => {} }) => {
    
    return (
        <View
            onLayout={(event) => onTimeLeftLayout(event)}
            style={width != null ? { width } : null}
        >
            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey400
                }}
            >
                Odemčeno:
            </Text>
            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.x_large,
                    color: COLORS.white,
                    marginTop: 4
                }}
            >
                {getEventDate(createdDate, false, true)}, {getEventTime(createdDate)}
            </Text>
        </View>
    )
}

const Divider = ({ isLast, result }) => {
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
                {
                    result === 'lose' ? <Image
                        source={require('../../../assets/images/ErrorIcon.png')}
                        style={{
                            width: 18,
                            height: 18
                        }}
                        contentFit="contain"
                    />
                        : result === 'win' ? <Image
                            source={require('../../../assets/images/SuccessIcon.png')}
                            style={{
                                width: 18,
                                height: 18
                            }}
                            contentFit="contain"
                        />
                    : <MaterialIcons name="question-mark" size={18} color={COLORS.white} />
                }
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

const Unlocked = ({ searchParams, setTabHeight }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < 700

    const currentWidestTimeLeft = useRef(0)

    const [timeLeftWidth, setTimeLeftWidth] = useState()

    const onTimeLeftLayout = (event, index) => {
        const { width } = event.nativeEvent.layout
        
        if (width > currentWidestTimeLeft.current) {
            currentWidestTimeLeft.current = width
        }

        if (index === OFFERS.length - 1) {
            setTimeLeftWidth(currentWidestTimeLeft.current)
        }
    }

    return (
        <View
            onLayout={(event) => setTabHeight(event.nativeEvent.layout.height)}
            style={{
                width: 850,
                maxWidth: '100%',
                alignSelf: 'center',
                //paddingHorizontal: SPACING.medium,
                paddingTop: SPACING.xx_large,
                backgroundColor: COLORS.primary,
                gap: GAP
                //alignItems: 'center',
            }}
        >
            {OFFERS.map((offer, index) => (
                <View
                    key={offer.id} 
                    style={{
                        flexDirection: 'row',
                        gap: SPACING.small
                    }}
                >
                    {!isSmallScreen && <TimeStamp createdDate={offer.created_date} onTimeLeftLayout={(event) => onTimeLeftLayout(event, index)} width={timeLeftWidth} />}

                    <Divider 
                        isLast={index === OFFERS.length - 1} 
                        result={
                            offer.ticket_entries.some(ticket => ticket.result === 'lose' || ticket.result === 'cancelled') ? 'lose'
                            : offer.ticket_entries.every(ticket => ticket.result === 'win') ? 'win'
                            : 'pending'
                        } 
                    />

                    <View
                        style={{
                            gap: SPACING.medium,
                            flex: 1
                        }}
                    >
                        {isSmallScreen && <TimeStamp createdDate={offer.created_date} />}
                        <UnlockedTicket
                            ticket={offer}
                            isLast={index === OFFERS.length - 1}
                        />
                    </View>
                </View>
            ))}
        </View>
    )
}

export default withSearchParams(Unlocked, ['language'])