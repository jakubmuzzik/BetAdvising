import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { COLORS, SPACING, FONTS, FONT_SIZES } from '../../constants'
import { normalize } from '../../utils'
import VerifyAccountBanner from '../../components/VerifyAccountBanner'
import { connect } from 'react-redux'
import withSearchParams from '../../components/hoc/withSearchParams'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CheckoutForm from '../../components/credits/CheckoutForm'

const appearance = {
    theme: 'night',
    //labels: 'floating',
    variables: {
        colorPrimary: COLORS.secondary2,
        fontFamily:'Roboto, sans-serif'
    }
}

const Credits = ({ searchParams, currentUser, currentAuthUser }) => {
    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch(process.env.EXPO_PUBLIC_API_URL + '/config').then(async (r) => {
            const { publishableKey } = await r.json()
            console.log({ publishableKey })
            setStripePromise(loadStripe(publishableKey))
        })

        fetch(process.env.EXPO_PUBLIC_API_URL + "/create-payment-intent")
            .then((res) => res.json())
            .then(({ clientSecret }) => setClientSecret(clientSecret));
    }, [])

    return (
        <View
            style={{
                width: normalize(800),
                maxWidth: '100%',
                alignSelf: 'center',
                paddingTop: SPACING.medium
            }}
        >
            <Text
                style={{
                    color: COLORS.white,
                    fontSize: FONT_SIZES.h2,
                    fontFamily: FONTS.medium,
                    marginTop: SPACING.large,
                    paddingHorizontal: SPACING.medium,
                    marginBottom: !currentAuthUser.phone_confirmed_at ? SPACING.small : SPACING.xx_large
                }}
            >
                Kredity
            </Text>

            {(!currentAuthUser.phone_confirmed_at) && <VerifyAccountBanner />}

            {clientSecret && stripePromise && (
                <View
                    style={{
                        marginTop: SPACING.large,
                        marginHorizontal: SPACING.medium,
                        padding: SPACING.medium,
                        backgroundColor: COLORS.secondary,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: COLORS.whiteBackground2
                    }}
                >
                <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                    <CheckoutForm />
                </Elements>
                </View>
            )}
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    currentAuthUser: store.userState.currentAuthUser,
})

export default connect(mapStateToProps)(withSearchParams(Credits, ['language']))