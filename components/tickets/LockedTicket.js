import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import CustomButton from '../elements/CustomButton'
import withSearchParams from '../hoc/withSearchParams'
import { calculateTimeDifference } from '../../utils'

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
                <MaterialIcons name='lock-open' size={18} color={COLORS.white} />
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

const Match = () => (
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
                    FC Barcelona - Real Madrid
                </Text>
            </View>

            <View>
                <MaterialIcons name="question-mark" size={FONT_SIZES.x_large} color={COLORS.white} />
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
                    12. 5. 2021 20:00
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 4
                    }}
                >
                    Výsledek zápasu: 1
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300
                    }}
                >
                    Fotbal / La Liga
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
                2.89
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
        <BlurView
            intensity={50}
            tint='dark'
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                borderRadius: 10,
                padding: SPACING.medium,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CustomButton
                onPress={() => { }}
                additionalStyles={{ marginTop: SPACING.medium }}
                textColor={COLORS.black}
                backgroundColors={[COLORS.accent2, COLORS.accent, COLORS.accent, COLORS.accent2]}
                buttonText='Odemknout'
                textStyles={{ fontFamily: FONTS.medium }}
            />
        </BlurView>
        
        {
            new Array(ticket.match_count).fill(null, 0).map((_, index) => (<Match key={index} />))
        }
    </View>
)

const TicketFooter = ({ odd, stake }) => (
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
                Kolik jsme vsadili
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
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.white,
                        textAlign: 'center'
                    }}
                >
                    {stake} Kč
                </Text>
            </View>
        </View>
    </View>
)

const LockedTicket = ({ ticket, searchParams }) => {
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
                <TicketFooter odd={ticket.odd} stake={ticket.stake} />
            </View>
        </View>
    )
}

export default withSearchParams(LockedTicket, ['language'])