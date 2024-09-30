import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../constants'
import { normalize } from '../utils'
import { Image } from 'expo-image'
import HoverableView from './elements/HoverableView'
import { BlurView } from 'expo-blur'
import withSearchParams from './hoc/withSearchParams'
import { Link } from 'react-router-dom'

const Package = ({ name, coins, price, description, searchParams }) => {

    return (
        <BlurView
            dataSet={{ id: 'package' }}
            style={{
                borderWidth: 1,
                borderColor: COLORS.grey400,//COLORS.accent + '90',
                borderRadius: 10,
                padding: SPACING.small,
                maxWidth: normalize(250),
                justifyContent: 'space-between'
            }}
            intensity={20}
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

            <Link
                style={{
                    textDecoration: 'none',
                    marginTop: SPACING.small
                }}
                to={{ pathname: '/auth', search: new URLSearchParams(searchParams).toString() }}
            >
                <HoverableView
                    //hoveredBackgroundColor={'rgba(255, 255, 255, 0.2)'}
                    //backgroundColor={COLORS.whiteBackground}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        width: 'fit-content',
                        borderWidth: 1,
                        borderColor: COLORS.accent,
                        paddingHorizontal: SPACING.x_small,
                        paddingVertical: SPACING.xx_small
                    }}
                    withHoverableArrow
                    withCustomButtonHeight
                    arrowColor={COLORS.white}
                    arrowSize={13}
                >
                    <Text
                        style={{
                            color: COLORS.grey300,
                            fontFamily: FONTS.regular,
                            fontSize: FONT_SIZES.medium
                        }}
                    >
                        Vybrat
                    </Text>
                </HoverableView>
            </Link>
        </BlurView>
    )
}

export default Package