import { useState, memo } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import { FONTS, FONT_SIZES, SPACING, CUSTOM_BUTTON_HEIGHT, COLORS } from '../../constants'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import Tooltip from '../elements/Tooltip'
import { roundOdd, getEventDate, getEventTime, normalize } from '../../utils'
import Animated, { useAnimatedStyle, withTiming, useAnimatedProps, interpolateColor } from 'react-native-reanimated'
import { STEP_SMALL_SCREEN_THRESHOLD } from '.'
import { ZoomableText } from '.'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const TICKETS = [
    {
        name: '121',
        type: 'Solo',
        price: 100,
        offer: {
            data: [
                { home: 'Manchester United', away: 'Chelsea', tip: '1', odd: 2.5, league: 'Premier League' }
            ]
        },
        odd: 2.5,
        stake: 2000
    },
    {
        name: '122',
        type: 'Solo',
        price: 100,
        offer: {
            data: [
                { home: 'Manchester United', away: 'Chelsea', tip: '1', odd: 2.5, league: 'Premier League' }
            ]
        },
        odd: 2.5,
        stake: 2000
    },
    {
        name: '123',
        type: 'Solo',
        price: 100,
        offer: {
            data: [
                { home: 'Manchester United', away: 'Chelsea', tip: '1', odd: 2.5, league: 'Premier League' }
            ]
        },
        odd: 2.5,
        stake: 2000
    },
]

const TicketHeader = ({ name, type, price }) => (
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
                <ZoomableText
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.small,
                        color: COLORS.grey400,
                        marginBottom: 2
                    }}
                >
                    {type}
                </ZoomableText>
                <ZoomableText
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.white
                    }}
                >
                    Tiket #{name}
                </ZoomableText>
            </View>
        </View>
        {price === 100 && (
            <Tooltip
                style={{
                    width: 35,
                    height: 35,
                    borderRadius: 17.5,
                    backgroundColor: COLORS.accentSecondaryTransparent,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                text='Exklusivní tip'
            >
                <Ionicons name="diamond" size={normalize(18)} color={COLORS.accent} style={{ marginRight: -1 }} />
            </Tooltip>
        )}
    </View>
)

const Match = memo(({ data, width }) => (
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
                <ZoomableText
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: width < 420 ? FONT_SIZES.medium : FONT_SIZES.large,
                        color: COLORS.white,
                        flexShrink: 1,
                        wordBreak: 'break-word'
                    }}
                >
                    {data.home} - {data.away}
                </ZoomableText>
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
                gap: SPACING.small,
            }}
        >
            <View style={{ flexShrink: 1, }}>
                <ZoomableText
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 4,
                        flexShrink: 1,
                    }}
                >
                    {getEventDate(new Date(), false, true)}, {getEventTime(new Date())}
                </ZoomableText>
                <ZoomableText
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 4,
                        flexShrink: 1,
                    }}
                >
                    {data.tip}
                </ZoomableText>
                <ZoomableText
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        flexShrink: 1,
                    }}
                >
                    {data.league}
                </ZoomableText>
            </View>

            <ZoomableText
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.white,
                    textAlign: 'right'
                }}
            >
                {roundOdd(data.odd)}
            </ZoomableText>
        </View>
    </View>
))

const TicketBody = ({ offer, animatedProps, animatedButtonStyle }) => {
    const { width } = useWindowDimensions()

    return (
        <View style={{
            padding: SPACING.small,
            backgroundColor: COLORS.secondary2,
            borderTopWidth: 1,
            borderColor: COLORS.whiteBackground2,
            gap: SPACING.medium,
            flexGrow: 1
        }}>
            <AnimatedBlurView
                animatedProps={animatedProps}
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
                <Animated.View
                    style={[{
                        borderRadius: 10,
                        paddingHorizontal: SPACING.medium,
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        height: CUSTOM_BUTTON_HEIGHT,
                        backgroundColor: COLORS.accent,
                    }, animatedButtonStyle]}
                >
                    <ZoomableText
                        style={{
                            fontFamily: FONTS.bold,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.black
                        }}
                    >
                        Odemknout
                    </ZoomableText>
                </Animated.View>
            </AnimatedBlurView>

            {offer.data.map((match, index) => <Match key={index} data={match} width={width} />)}
        </View>
    )
}

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
            <ZoomableText
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey400
                }}
            >
                Celkový kurz
            </ZoomableText>
            <ZoomableText
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.white,
                    marginTop: 4,
                    textAlign: 'center'
                }}
            >
                {odd}
            </ZoomableText>
        </View>
        <View>
            <ZoomableText
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey400
                }}
            >
                Kolik jsme vsadili
            </ZoomableText>
            <View
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.white,
                    marginTop: 4,
                    alignItems: 'center'
                }}
            >
                <ZoomableText
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.white,
                        textAlign: 'center'
                    }}
                >
                    {stake} Kč
                </ZoomableText>
            </View>
        </View>
    </View>
)

const Ticket = ({ data, backdropOpacity = 0 }) => {
    const [isHovered, setIsHovered] = useState(false)

    const alphaDecimal = Math.round(255 * (1 - backdropOpacity));

    // Convert the alpha value to a 2-digit hexadecimal string
    const alphaHex = alphaDecimal.toString(16).padStart(2, '0');

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: withTiming(isHovered ? -30 : 0, { duration: 200 }) },
            ],
            borderColor: interpolateColor(
                Number(isHovered),
                [0, 1],
                [COLORS.grey600 + alphaHex, COLORS.grey600]
            ),
        }
    })

    const animatedProps = useAnimatedProps(() => {
        return {
            intensity: withTiming(isHovered ? 0 : 50, { duration: 200 })
        };
    });

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isHovered ? 0 : 1, { duration: 100 }),
        }
    })

    const animatedBackdropStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isHovered ? 0 : backdropOpacity, { duration: 200 })
        }
    })

    return (
        <Animated.View
            style={[{
                borderRadius: 10,
                backgroundColor: COLORS.secondary,
                borderWidth: 1,
                borderColor: COLORS.grey600 + alphaHex,
                flexGrow: 1,
            }, animatedStyle]}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <TicketHeader name={data.name} type={data.type} price={data.price} />
            <TicketBody offer={data.offer} animatedProps={animatedProps} animatedButtonStyle={animatedButtonStyle} />
            <TicketFooter odd={data.odd} stake={data.stake} />

            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: COLORS.primary,
                    opacity: 0.5,
                    borderRadius: 10
                }, animatedBackdropStyle]}
            />
        </Animated.View>
    )
}

const Tickets = () => {
    const { width } = useWindowDimensions()
    const isSmallScreen = width < STEP_SMALL_SCREEN_THRESHOLD

    return (

        <View
            style={{
                width: 500,
                maxWidth: 500,
                //width: isSmallScreen ? '100%' : 500,
                zoom: width < 350 ? 0.4 : width < 450 ? 0.5 : 0.65,
                perspective: 2000,
                alignSelf: 'center',
                marginLeft: -500*0.05*TICKETS.length-1,
                marginBottom: isSmallScreen ? 140 : 0,
            }}
        >
            {
                TICKETS.map((ticket, index) => (
                    <View
                        key={ticket.name}
                        style={{
                            position: index === 0 ? 'relative' : 'absolute',
                            width: 500,
                            //width: width,
                            //width: '100%',
                            //paddingHorizontal: isSmallScreen ? width * 0.1 : 0,
                            left: `${10 * index}%`,
                            top: `${10 * index}%`,
                            transform: [
                                { skewY: '-4deg' },
                                { rotateX: '-14deg' },
                                { rotateY: '20deg' }
                            ],
                        }}
                    >
                        <Ticket
                            data={ticket}
                            backdropOpacity={1 - ((index + 1) / TICKETS.length)}
                        />
                    </View>
                ))
            }
        </View>
    )
}

export default Tickets