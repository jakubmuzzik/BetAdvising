import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../../constants'

const Credits = () => {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{ color: COLORS.white }}>Credits</Text>
        </View>
    )
}

export default Credits