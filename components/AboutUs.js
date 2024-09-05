import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import { SPACING } from '../constants'

const AboutUs = () => {
    const { width } = useWindowDimensions()

    return (
        <View
            style={{
                flexDirection: 'row',
                gap: SPACING.medium,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

            </View>
        </View>
    )
}

export default AboutUs