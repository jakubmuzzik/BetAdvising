import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import withSearchParams from '../../components/hoc/withSearchParams'
import { ActivityIndicator } from 'react-native-paper'
import { SPACING, FONTS, FONT_SIZES, COLORS } from '../../constants'
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

import { supabase } from '../../supabase/config'

const ErrorMessage = ({ message }) => (
    <>
        <Text style={{
            color: COLORS.white,
            fontFamily: FONTS.medium,
            fontSize: FONT_SIZES.x_large,
            marginBottom: 8
        }}>
            Odhlášení se nepodařilo 😞
        </Text>

        <Text style={{
            color: COLORS.red,
            fontFamily: FONTS.regular,
            fontSize: FONT_SIZES.medium
        }}>
            {message}
        </Text>
    </>
)

const Success = ({email}) => (
    <>
        <Text style={{
            color: COLORS.white,
            fontFamily: FONTS.medium,
            fontSize: FONT_SIZES.x_large,
            marginBottom: 8
        }}>
            Odhlášení proběhlo úspěšně ✅
        </Text>

        <Text style={{
            color: COLORS.grey400,
            fontFamily: FONTS.regular,
            fontSize: FONT_SIZES.medium
        }}>
            Úspěšně jste se odhlásili z přijímání notifikací ohledně nových sázkových tipů pro email: {email}
        </Text>
    </>
)

const Unsubscribe = ({ searchParams }) => {
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState()
    const [email, setEmail] = useState('')

    useEffect(() => {
        unsubsribe()
    }, [])

    const unsubsribe = async () => {
        try {
            if (!searchParams.token) {
                throw new Error('Neplatný uživatelský token.')
            }

            const { data, error } = await supabase.rpc('unsubscribe_user', {
                token: searchParams.token,
            })

            if (error) throw error

            if (!data) {
                throw new Error('Uživatel nebyl nalezen.')
            }

            setEmail(data)
        } catch(e) {
            console.error(e)
            setErrorMessage(e.message ?? 'Něco se pokazilo.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: SPACING.page_horizontal,
        }}>
            <Animated.View
                entering={FadeInDown}
                //layout={LinearTransition}
                style={{
                    borderColor: COLORS.whiteBackground2,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: 450,
                    maxWidth: '100%',
                    boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.1)'
                }}
            >
                <LinearGradient
                    style={{
                        padding: SPACING.xx_large,
                        borderRadius: 10,
                        flex: 1,
                    }}
                    colors={[COLORS.secondary, COLORS.primary]}
                    start={{ x: -0.7, y: 0 }}
                >
                    {loading && <ActivityIndicator color={COLORS.accent} />}
                    {!loading && errorMessage && <ErrorMessage message={errorMessage} />}
                    {!loading && !errorMessage && <Success email={email}/>}
                </LinearGradient>
            </Animated.View>
        </View>
    )
}

export default withSearchParams(Unsubscribe, ['token'])