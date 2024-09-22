import React from 'react'
import { View, Text } from 'react-native'
import { COLORS, SPACING, FONTS, FONT_SIZES } from '../../constants'
import { normalize } from '../../utils'

const Credits = () => {

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
                    marginBottom: SPACING.xx_large
                }}
            >
                Kredity
            </Text>
                
        </View>
    )
}

export default Credits