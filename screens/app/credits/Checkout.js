import { useState, useRef, useEffect } from 'react'
import { Text, View } from 'react-native'
import {
    PaymentElement,
    LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CustomButton from '../../../components/elements/CustomButton'
import { COLORS, FONTS, FONT_SIZES, SPACING, PACKAGES } from '../../../constants'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../../supabase/config'

import withSearchParams from '../../../components/hoc/withSearchParams'
import { ActivityIndicator } from 'react-native-paper'

const appearance = {
    theme: 'night',
    //labels: 'floating',
    variables: {
        colorPrimary: COLORS.secondary2,
        fontFamily: 'Roboto, sans-serif'
    }
}

const OrderRecap = ({ searchParams }) => {

    const packageData = PACKAGES.find(packageData => packageData.id.toLocaleLowerCase() === searchParams.package.toLocaleLowerCase())

    return (
        <>
            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: FONT_SIZES.large,
                    color: COLORS.grey300,
                    marginBottom: SPACING.small
                }}
            >
                Vaše objednávka:
            </Text>
            {/* <View style={{ height: 1, backgroundColor: COLORS.whiteBackground2, marginVertical: SPACING.x_small }} /> */}
            <View
                style={{
                    padding: SPACING.small,
                    backgroundColor: COLORS.secondary2,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor: COLORS.accent,
                    flexWrap: 'wrap',
                    gap: 10
                }}
            >
                <View>
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.large,
                            color: COLORS.white,
                            marginBottom: 4
                        }}
                    >
                        {packageData.name} balíček
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.medium,
                            color: COLORS.grey300
                        }}
                    >
                        {packageData.credits} kreditů
                    </Text>
                </View>

                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.white
                    }}
                >
                    {packageData.price} Kč
                </Text>
            </View>

            <View style={{ height: 1, backgroundColor: COLORS.whiteBackground2, marginVertical: SPACING.large }} />
        </>
    )
}

const CheckoutForm = ({ toastRef, navigate, searchParams }) => {
    const stripe = useStripe()
    const elements = useElements()

    const payButtonRef = useRef()

    const onPayPress = async (e) => {
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }
        
        payButtonRef.current.setIsLoading(true)

        let return_url = `${window.location.origin}/credits/order/result`

        let params = []

        if (searchParams.language) {
            params.push(`language=${searchParams.language}`)
        }

        params.push(`package=${searchParams.package}`)

        return_url += `?${params.join('&')}`

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url
                },
                redirect: 'if_required'
            })
    
            if (error) throw error

            if (paymentIntent) {
                if (paymentIntent.status === 'succeeded') {
                    toastRef?.show({
                        type: 'success',
                        text: 'Platba byla úspěšná 🎉'
                    })
                }

                navigate({
                    pathname: '/credits/order/result',
                    search: new URLSearchParams({...searchParams, status: paymentIntent.status}).toString(),
                }, {
                    replace: true
                })
            }
        } catch(e) {
            console.error(e)

            const message = (e.type === "card_error" || e.type === "validation_error") ? e.message : "An unexpected error occured."

            toastRef?.show({
                type: 'error',
                text: message
            })
        } finally {
            payButtonRef.current.setIsLoading(false)
        }
    }

    return (
        <>
            <OrderRecap searchParams={searchParams} />
            <PaymentElement id="payment-element" />
            <CustomButton
                ref={payButtonRef}
                onPress={onPayPress}
                textColor={COLORS.black}
                backgroundColors={COLORS.accent}
                buttonText='Zaplatit'
                additionalStyles={{ marginTop: SPACING.large, width: '100%' }}
                textStyles={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large }}
            />
        </>
    )
}

const Checkout = ({ toastRef, searchParams }) => {
    const location = useLocation()
    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(false)
    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState('')

    const paymentIntentCreated = useRef()

    useEffect(() => {
        if (paymentIntentCreated.current) {
            return
        }

        if (searchParams.package) {
            paymentIntentCreated.current = true
            createPaymentIntent(searchParams.package)
        }
    }, [searchParams])

    const createPaymentIntent = async (packageId) => {         
        try {
            setLoading(true)
            console.log('creating payment intent for package: ', packageId)
            const { error, data } = await supabase.functions.invoke('create-payment-intent', {
                body: {
                    packageId
                }
            })
            
            if (error) throw error

            setStripePromise(loadStripe(data.publishableKey))
            setClientSecret(data.clientSecret)
        } catch (e) {
            console.error('error creating payment intent: ', e)
            const message = e.message ?? 'An unexpected error occured.'

            if (message.includes('Selected package was not found')) {
                toastRef?.show({
                    type: 'error',
                    text: 'Balíček nebyl nalezen.'
                })

                navigate({
                    pathname: '/credits/order/select-package',
                    search: new URLSearchParams(searchParams).toString(),
                }, {
                    replace: true
                })
            }
        } finally {
            setLoading(false)
        }
    }

    if (location.pathname !== '/credits/order/checkout') {
        return null
    }

    if (!searchParams.package || PACKAGES.findIndex(packageData => packageData.id.toLocaleLowerCase() === searchParams.package.toLocaleLowerCase()) === -1) {
        return (
            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.error,
                    padding: SPACING.large
                }}
            >
                Balíček nebyl nalezen.
            </Text>
        )
    }

    if (loading) {
        return (
            <View
                style={{
                    padding: SPACING.medium,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size='small' color={COLORS.white} />
            </View>
        )
    }

    return (
        clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                <CheckoutForm toastRef={toastRef} navigate={navigate} searchParams={searchParams} />
            </Elements>
        )
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef
})

export default connect(mapStateToProps)(withSearchParams(Checkout, ['language', 'package']))