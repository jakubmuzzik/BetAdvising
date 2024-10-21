import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../constants'
import { normalize } from '../utils'
import { Image } from 'expo-image'
import HoverableView from './elements/HoverableView'
import { BlurView } from 'expo-blur'
import withSearchParams from './hoc/withSearchParams'
import { Link } from 'react-router-dom'

const BulletPoint = ({ text }) => (
    <View
        style={{
            flexDirection: 'row',
            gap: 6,
        }}
    >
        <Text
            style={styles.descriptionText}
        >
            •
        </Text>
        <Text
            style={styles.descriptionText}
        >
            {text}
        </Text>
    </View>
)

export const Discount = ({ discount }) => (
    <View
        style={{
            position: 'absolute',
            top: 0,
            right: 16,
            width: 30,
        }}
    >
        <Text
            style={{
                fontFamily: FONTS.bold,
                fontSize: FONT_SIZES.x_small * 1.1,
                color: COLORS.white,
                backgroundColor: COLORS.red,
                height: 25,
                textAlign: 'center',
                paddingTop: 5,
            }}
        >
            -{discount}%
        </Text>
        <View
            style={{
                flexDirection: 'row',
            }}
        >
            <View
                style={{
                    borderLeftWidth: 15,
                    //borderRightWidth: 15,
                    borderBottomWidth: 15,
                    width: 15,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: COLORS.red,
                    transform: [{ rotate: '180deg' }]
                }}
            />
            <View
                style={{
                    borderLeftWidth: 15,
                    //borderRightWidth: 15,
                    borderBottomWidth: 15,
                    width: 15,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: COLORS.red,
                    transform: [{ rotateX: '180deg' }]
                }}
            />
        </View>
    </View>
)

const Package = ({ id, name, credits, price, description, discount, searchParams }) => {

    return (
        <BlurView
            dataSet={{ id: 'package' }}
            style={{
                borderWidth: 1,
                borderColor: COLORS.grey400,//COLORS.accent + '90',
                borderRadius: 10,
                padding: SPACING.small,
                width: normalize(250),
                justifyContent: 'space-between'
            }}
            intensity={20}
            tint='dark'
        >
           {discount > 0 && <Discount discount={discount}/>}
            <View>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.accent,
                        marginBottom: 12
                    }}
                >
                    {name}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    marginBottom: 6,
                    alignItems: 'center'
                }}>
                    <Text
                        style={{
                            fontFamily: FONTS.extraBold,
                            fontSize: FONT_SIZES.h2,
                            color: COLORS.white,

                        }}
                    >
                        {credits}
                    </Text>
                    <Image
                        source={require('../assets/images/coin.png')}
                        style={{
                            width: 30,
                            aspectRatio: 49/36,
                            contentFit: 'contain'
                        }}
                    />
                </View>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 24
                    }}
                >
                    Za {price} Kč
                </Text>

                {Array.isArray(description) ? (
                    <View key={name} style={{
                        gap: 4,
                        flexDirection: 'column',
                    }}>
                        {description.map((text, index) => (
                            <BulletPoint text={text} />
                        ))}
                    </View>
                ) : <Text style={styles.descriptionText}>{description}</Text>}
            </View>

            <Link
                style={{
                    textDecoration: 'none',
                    marginTop: SPACING.small,
                    width: 'fit-content'
                }}
                to={{ pathname: '/credits/order/checkout', search: new URLSearchParams({...searchParams, package: id}).toString() }}
            >
                <HoverableView
                    hoveredBackgroundColor={COLORS.accentHoveredSecondary}
                    backgroundColor={COLORS.accentSecondary}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        width: 'fit-content',
                        borderWidth: 1,
                        borderColor: COLORS.accentSecondaryBorder,
                        paddingHorizontal: SPACING.x_small,
                        paddingVertical: SPACING.xx_small
                    }}
                    withHoverableArrow
                    withCustomButtonHeight
                    arrowColor={COLORS.accent}
                    arrowSize={11}
                >
                    <Text
                        style={{
                            color: COLORS.accent,
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

const styles = StyleSheet.create({
    descriptionText: {
        fontFamily: FONTS.regular,
        fontSize: FONT_SIZES.medium,
        color: COLORS.grey400
    }
})