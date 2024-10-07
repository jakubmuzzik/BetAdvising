import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS, SPACING, FONTS, FONT_SIZES } from '../../../constants'
import { normalize } from '../../../utils'
import VerifyAccountBanner from '../../../components/VerifyAccountBanner'
import { connect } from 'react-redux'
import withSearchParams from '../../../components/hoc/withSearchParams'
import { Image } from 'expo-image'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { fetchCreditTransactions } from '../../../redux/actions/user'
import Animated, { FlipInEasyX }  from 'react-native-reanimated'
import { MAX_CREDIT_TRANSACTIONS_ROWS_PER_QUERY } from '../../../redux/actions/user'
import { useNavigate } from 'react-router-dom'

import HoverableView from '../../../components/elements/HoverableView'
import CustomButton from '../../../components/elements/CustomButton'
import UnlockedTicketModal from '../../../components/modal/UnlockedTicketModal'


const Balance = ({ credits, navigate, searchParams }) => {
    const onBuyCreditsPress = () => {
        navigate({
            pathname: '/credits/order/select-package',
            search: new URLSearchParams(searchParams).toString()
        })
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 20,
                alignItems: 'center',
                //backgroundColor: COLORS.secondary,
                borderRadius: 10,
                padding: SPACING.small,
                borderWidth: 1,
                borderColor: COLORS.grey400,
                //marginTop: SPACING.large,
                //marginRight: SPACING.small + SPACING.xx_small
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 20
                }}
            >
                <Image
                    source={require('../../../assets/images/coin.png')}
                    style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'contain'
                    }}
                />
                <View>
                    <Text
                        style={{
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.medium,
                            color: COLORS.grey300,
                            marginBottom: 4
                        }}
                    >
                        Dostupné kredity
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.bold,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.white,
                        }}
                    >
                        {credits ?? 0}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={onBuyCreditsPress}
            >
                <HoverableView
                    hoveredOpacity={0.8}
                    //backgroundColor={}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        width: 'fit-content',
                        paddingHorizontal: SPACING.x_small,
                        paddingVertical: SPACING.xx_small,
                        flexDirection: 'row',
                        //boxShadow: '0px 0px 10px rgba(251, 193, 13, 0.15)',
                        borderWidth: 1,
                        borderColor: COLORS.accent
                    }}
                    withCustomButtonHeight
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.medium
                        }}
                    >
                        Dokoupit
                    </Text>
                </HoverableView>
            </TouchableOpacity>
        </View>
    )
}

const TransactionEntry = ({ transaction }) => {
    const [ticketModalVisible, setTicketModalVisible] = useState(false)

    const renderDate = () => {
        let diffInMilliSeconds = Math.abs(new Date(transaction.created_date) - new Date()) / 1000
        const daysDiff = getDaysDiff(diffInMilliSeconds)

        if (daysDiff === 0) {
            const hoursDiff = getHoursDiff(diffInMilliSeconds)
            if (hoursDiff === 0) {
                const minutesDiff = getMinutesDiff(diffInMilliSeconds)
                return minutesDiff === 0 ? 'Just now' : `${minutesDiff} minute${minutesDiff < 2 ? '' : 's'} ago`
            } else {
                return `${hoursDiff} hour${hoursDiff === 1 ? '' : 's'} ago`
            }
        } else if (daysDiff < 8) {
            return `${daysDiff} day${daysDiff === 1 ? '' : 's'} ago`
        } else {
            return getEventDate(transaction.created_date, true, true)
        }
    }

    const getMinutesDiff = (diff) => {
        const minutes = Math.floor(diff / 60) % 60
        return minutes
    }

    const getHoursDiff = (diff) => {
        const hours = Math.floor(diff / 3600) % 24
        return hours
    }

    const getDaysDiff = (diff) => {
        const days = Math.floor(diff / 86400)
        return days
    }

    const onTransactionPress = () => {
        console.log(transaction.ticket)
        if (
            transaction.transaction_type === 'ticket_unlock' 
            && transaction.ticket
        ) {
            setTicketModalVisible(true)
        } else if (
            transaction.transaction_type === 'purchase' &&
            transaction.payment_intent
        ) {
            //TODO - show payment details / PDF invoice
        }
    }

    return (
        <>
            <HoverableView
                style={{
                    borderRadius: 10,
                    width: '100%',
                }}
                backgroundColor={COLORS.secondary}
                hoveredBackgroundColor={COLORS.secondary2}
            >
                <TouchableOpacity
                    activeOpacity={(transaction.ticket || transaction.payment_intent) ? 0.8 : 1}
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                        cursor: (transaction.ticket || transaction.payment_intent) ? 'pointer' : 'default'
                    }}

                    onPress={onTransactionPress}
                >
                    <>
                        <View
                            style={{
                                marginRight: 20
                            }}
                        >
                            {
                                transaction.transaction_type === 'purchase' ? (
                                    <Text style={{ fontSize: FONT_SIZES.xx_large }}>💳</Text>
                                ) : transaction.transaction_type === 'ticket_unlock' ? (
                                    <Text style={{ fontSize: FONT_SIZES.xx_large }}>🔓</Text>
                                ) : null
                            }
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    color: COLORS.grey400,
                                    fontFamily: FONTS.regular,
                                    fontSize: FONT_SIZES.medium
                                }}
                            >
                                {renderDate(transaction.created_date)}
                            </Text>

                            <Text
                                style={{
                                    paddingTop: 8,
                                    fontFamily: FONTS.medium,
                                    fontSize: FONT_SIZES.large,
                                    color: COLORS.grey100
                                }}
                            >
                                {
                                transaction.transaction_type === 'purchase' ? (
                                    `Nákup ${transaction.amount} kreditů${(transaction.payment_intent && transaction.payment_intent.amount) ? ` za ${transaction.payment_intent.amount} Kč` : ''}.`
                                ) : transaction.transaction_type === 'ticket_unlock' ? (
                                    `Odemčení tiketu${transaction.ticket ? ` #${transaction.ticket.name}` : ''} za ${transaction.amount} kreditů.`
                                ) : null
                            }
                            </Text>
                        </View>
                    </>
                </TouchableOpacity>
            </HoverableView>

            {transaction.ticket && <UnlockedTicketModal
                visible={ticketModalVisible}
                ticketId={transaction.ticket.id}
                onCancel={() => setTicketModalVisible(false)}
            />}
        </>
    )
}

const History = ({ creditTransactions, fetchCreditTransactions }) => {
    const loadMoreButtonRef = useRef()
    const allTransactionsLoaded = useRef()

    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (creditTransactions == null) {
            fetchCreditTransactions()
        }
    }, [creditTransactions])

    const onLoadMorePress = async () => {
        setRefreshing(true)
        loadMoreButtonRef.current?.setIsLoading(true)
        const newTransactions = await fetchCreditTransactions()
        if (newTransactions == null || newTransactions?.length === 0) {
            allTransactionsLoaded.current = true
        }
        setRefreshing(false)
        loadMoreButtonRef.current?.setIsLoading(false)
    }

    return (
        <View
            style={{
                //backgroundColor: COLORS.secondary,
                borderRadius: 10,
                //padding: SPACING.small,
                marginTop: SPACING.xx_large,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: SPACING.medium
                }}
            >
                <MaterialCommunityIcons name="history" size={20} color={COLORS.grey300} />
                <Text
                    style={{
                        color: COLORS.grey200,
                        fontSize: FONT_SIZES.x_large,
                        fontFamily: FONTS.medium,
                    }}
                >
                    Historie
                </Text>
            </View>

            {creditTransactions != null && creditTransactions.length === 0 && (
                <Animated.Text
                    entering={FlipInEasyX}
                    style={{
                        color: COLORS.grey400,
                        fontSize: FONT_SIZES.large,
                        fontFamily: FONTS.regular,
                    }}
                >
                    Žádné transakce k dispozici
                </Animated.Text>
            )}

            {creditTransactions != null && creditTransactions.length > 0 && (
                <View
                    style={{
                        //gap: 10,
                        alignItems: 'center',
                    }}
                >
                    {creditTransactions.map((transaction, index) => (
                        <>
                            <TransactionEntry key={transaction.id} transaction={transaction} />
                            {index !== creditTransactions.length - 1 && <View style={{width: 1, height: 20, backgroundColor: COLORS.whiteBackground2}} />}
                        </>
                    ))}
                </View>
            )}

            {creditTransactions != null && creditTransactions.length > 0 && creditTransactions.length % MAX_CREDIT_TRANSACTIONS_ROWS_PER_QUERY === 0 && !allTransactionsLoaded.current && (
                <CustomButton
                    ref={loadMoreButtonRef}
                    onPress={onLoadMorePress}
                    additionalStyles={{ borderWidth: 1, borderColor: COLORS.white, marginTop: SPACING.x_small, width: 'fit-content' }}
                    textColor={COLORS.white}
                    //backgroundColors={COLORS.white}
                    spinnerColor={COLORS.white}
                    buttonText='Načíst další'
                    textStyles={{ fontFamily: FONTS.medium }}
                />
            )}
        </View>
    )
}

const Credits = ({ searchParams, currentUser, currentAuthUser, setTabHeight, creditTransactions, fetchCreditTransactions }) => {
    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState('')

    const navigate = useNavigate()

    return (
        <View
            onLayout={event => setTabHeight(event.nativeEvent.layout.height)}
            style={{
                flex: 1,
            }}
        >
          
            {(!currentAuthUser.phone_confirmed_at) && <VerifyAccountBanner 
                containerStyle={{
                    marginBottom: SPACING.large
                }}
            />}

            <Balance credits={currentUser.credits} navigate={navigate} searchParams={searchParams} />

            <History fetchCreditTransactions={fetchCreditTransactions} creditTransactions={creditTransactions}/>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    currentAuthUser: store.userState.currentAuthUser,
    creditTransactions: store.userState.creditTransactions
})

export default connect(mapStateToProps, { fetchCreditTransactions })(withSearchParams(Credits, ['language']))