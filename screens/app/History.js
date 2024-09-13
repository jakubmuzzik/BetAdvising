import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../../constants'

const History = () => {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{ color: COLORS.white }}>History</Text>
        </View>
    )
}

export default History