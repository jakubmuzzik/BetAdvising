import { useState, useRef } from 'react'
import { Text } from 'react-native'
import {
    PaymentElement,
    LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import CustomButton from '../elements/CustomButton'
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../../constants'
import { connect } from 'react-redux'

const CheckoutForm = ({ toastRef }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState(null)

    const payButtonRef = useRef()

    const onPayPress = async (e) => {
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }
        
        payButtonRef.current.setIsLoading(true)

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url:`${window.location.origin}/credits`,
                },
                redirect: 'if_required'
            })
    
            if (error) throw error

            if (paymentIntent) {
                console.log(paymentIntent)
                console.log(paymentIntent?.status)
                console.log(paymentIntent?.amount)

                if (paymentIntent.status === 'succeeded') {
                    toastRef?.show({
                        type: 'success',
                        text: 'Payment successful.'
                    })
                }
            }
        } catch(e) {
            console.error(e)

            const message = (e.type === "card_error" || e.type === "validation_error") ? e.message : "An unexpected error occured."

            if (toastRef) {
                toastRef.show({
                    type: 'error',
                    text: message
                })
            } else {
                setErrorMessage(message)
            }
        } finally {
            payButtonRef.current.setIsLoading(false)
        }
    }

    return (
        <>
            <PaymentElement id="payment-element" />
            <CustomButton
                ref={payButtonRef}
                onPress={onPayPress}
                textColor={COLORS.black}
                backgroundColors={COLORS.accent}
                buttonText='Zaplatit'
                additionalStyles={{ marginTop: SPACING.large, width: 'fit-content' }}
                textStyles={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large }}
            />
        </>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef
})

export default connect(mapStateToProps)(CheckoutForm)