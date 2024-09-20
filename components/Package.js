import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../constants'
import { normalize } from '../utils'
import { Image } from 'expo-image'
import HoverableView from './elements/HoverableView'
import { BlurView } from 'expo-blur'

const Package = ({ name, coins, price, description }) => {

    return (
        <BlurView
            style={{
                borderWidth: 1,
                borderColor: COLORS.grey400,
                borderRadius: 10,
                padding: SPACING.small,
                maxWidth: normalize(250),
                justifyContent: 'space-between'
            }}
            intensity={15}
            tint='dark'
        >
            <View>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.accent,
                        marginBottom: 10
                    }}
                >
                    {name}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    marginBottom: 10,
                    alignItems: 'center'
                }}>
                    <Text
                        style={{
                            fontFamily: FONTS.extraBold,
                            fontSize: FONT_SIZES.h2,
                            color: COLORS.white,

                        }}
                    >
                        {coins}
                    </Text>
                    <Image
                        source={require('../assets/images/coin.png')}
                        style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'contain'
                        }}
                    />
                </View>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 20
                    }}
                >
                    Za {price} Kč
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.light,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey400
                    }}
                >
                    {description}
                </Text>
            </View>

            <HoverableView
                hoveredBackgroundColor={'rgba(255, 255, 255, 0.2)'}
                backgroundColor={COLORS.whiteBackground}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    width: 'fit-content',
                    borderWidth: 1,
                    borderColor: COLORS.grey300,
                    marginTop: SPACING.small
                }}
            >
                <TouchableOpacity
                    //onPress={onGetAppPress}
                    style={{
                        paddingHorizontal: SPACING.x_small,
                        paddingVertical: SPACING.xx_small,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.grey300,
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.medium
                        }}
                    >
                        Get started →
                    </Text>
                </TouchableOpacity>
            </HoverableView>
        </BlurView>
    )
}

export default Package