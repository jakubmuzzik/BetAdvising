import React, { useRef, memo } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, renderSportIcon } from '../../constants'
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { getEventDate, getEventTime, roundOdd } from '../../utils'
import { Image } from 'expo-image'
import { IconButton } from 'react-native-paper'

import DropdownSelect from '../elements/DropdownSelect'
import Tooltip from '../elements/Tooltip'

const TicketHeader = ({ name, id, type, showEditButtons, offsetX, actions, price }) => {
    const actionsDropdownRef = useRef()

    return (
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
                        Tiket #{name}
                    </Text>
                </View>
            </View>

            {showEditButtons && (
                <DropdownSelect
                    ref={actionsDropdownRef}
                    offsetX={offsetX}
                    options={actions.map(action => ({ label: action.label, icon: action.icon }))}
                    setText={(text) => actions.find(action => action.label === text).onPress(id)}
                >
                    <IconButton
                        icon="dots-horizontal"
                        iconColor="#FFF"
                        containerColor={COLORS.grey600 + 'B3'}
                        size={18}
                        onPress={() => actionsDropdownRef.current?.onDropdownPress()}
                    />
                </DropdownSelect>
            )}

            {price === 100 && !showEditButtons && (
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
                    <Ionicons name="diamond" size={18} color={COLORS.accent} style={{ marginRight: -1 }} />
                </Tooltip>
            )}
        </View>
    )
}

const Match = ({ match, width, ticketId, id, showEditButtons, offsetX, actions }) => {
    const actionsDropdownRef = useRef()

    return (
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
                    {renderSportIcon(match.sport)}
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: width < 420 ? FONT_SIZES.medium : FONT_SIZES.large,
                            color: COLORS.white,
                            flexShrink: 1,
                            wordBreak: 'break-word'
                        }}
                    //numberOfLines={1}
                    >
                        {match.home} - {match.away}
                    </Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                }}>
                    {
                        match.result === 'pending' ? <MaterialIcons name="question-mark" size={FONT_SIZES.x_large} color={COLORS.white} />
                            : match.result === 'win' ? <Image
                                source={require('../../assets/images/SuccessIcon.png')}
                                style={{
                                    width: 18,
                                    height: 18
                                }}
                                contentFit="contain"
                            />
                                : match.result === 'lose' ? <Image
                                    source={require('../../assets/images/ErrorIcon.png')}
                                    style={{
                                        width: 18,
                                        height: 18
                                    }}
                                    contentFit="contain"
                                />
                                    : <MaterialCommunityIcons name="cancel" size={18} color={COLORS.white} />
                    }
                    {showEditButtons && (
                        <DropdownSelect
                            ref={actionsDropdownRef}
                            offsetX={offsetX}
                            options={actions.map(action => ({ label: action.label, icon: action.icon }))}
                            setText={(text) => actions.find(action => action.label === text).onPress(ticketId, id)}
                        >
                            <IconButton
                                icon="dots-horizontal"
                                iconColor="#FFF"
                                containerColor={COLORS.grey600 + 'B3'}
                                size={10}
                                onPress={() => actionsDropdownRef.current?.onDropdownPress()}
                            />
                        </DropdownSelect>
                    )}
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
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.medium,
                            color: COLORS.grey300,
                            marginBottom: 4,
                            flexShrink: 1,
                        }}
                    >
                        {getEventDate(match.start_date, false, true)}, {getEventTime(match.start_date)}
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.medium,
                            color: COLORS.grey300,
                            marginBottom: 4,
                            flexShrink: 1,
                        }}
                    >
                        {match.tip}
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.medium,
                            color: COLORS.grey300,
                            flexShrink: 1,
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
                        textAlign: 'right',
                        flexShrink: 1,
                    }}
                >
                    {roundOdd(match.odd)}
                </Text>
            </View>
        </View>
    )
}

const TicketBody = ({ ticket, showEditButtons, offsetX, actions }) => {
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
            {ticket.ticket_entries?.map((match) => (
                <Match key={match.id} match={match} width={width} ticketId={ticket.id} id={match.id} showEditButtons={showEditButtons} offsetX={offsetX} actions={actions} />
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
                {roundOdd(odd)}
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
                    result === 'pending' ? <MaterialIcons name="question-mark" size={FONT_SIZES.x_large} color={COLORS.white} />
                        : result === 'win' ? <Image
                            source={require('../../assets/images/SuccessIcon.png')}
                            style={{
                                width: 18,
                                height: 18
                            }}
                            contentFit="contain"
                        />
                            : result === 'lose' ? <Image
                                source={require('../../assets/images/ErrorIcon.png')}
                                style={{
                                    width: 18,
                                    height: 18
                                }}
                                contentFit="contain"
                            />
                                : <MaterialCommunityIcons name="cancel" size={18} color={COLORS.white} />
                }
            </View>
        </View>
    </View>
)

const UnlockedTicket = ({ ticket, searchParams, showEditButtons, offsetX, ticketEntryActions, ticketActions }) => {

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
            <TicketHeader price={ticket.price} type={ticket.ticket_entries?.length > 1 ? 'AKO' : 'Solo'} id={ticket.id} name={ticket.name} showEditButtons={showEditButtons} offsetX={offsetX} actions={ticketActions} />
            <TicketBody ticket={ticket} showEditButtons={showEditButtons} offsetX={offsetX} actions={ticketEntryActions} />
            <TicketFooter
                odd={ticket.ticket_entries?.reduce((acc, curr) => acc * curr.odd, 1)}
                result={ticket.result}
            />
        </View>
    )
}

export default memo(UnlockedTicket)