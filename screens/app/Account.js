import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../../constants'

const Account = () => {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{ color: COLORS.white }}>Account</Text>
        </View>
    )
}

export default Account