import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { View, Text } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../../../constants'
import { normalize } from '../../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'

import withSearchParams from '../../../components/hoc/withSearchParams'
import HoverableView from '../../../components/elements/HoverableView'
import CustomButton from '../../../components/elements/CustomButton'

const Tickets = ({ searchParams }) => {

    return (
        <View style={{
            alignItems: 'center'
        }}>
            <View
                style={{
                    flexDirection: 'row',
                    gap: SPACING.large,
                }}
            >
                <View>
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.medium,
                            color: COLORS.grey400
                        }}
                    >
                        Zbývá:
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.x_large,
                            color: COLORS.white,
                            marginTop: 4
                        }}
                    >
                        3 hod 15 min
                    </Text>
                </View>
                <View>
                    <LinearGradient
                        colors={[COLORS.secondary, COLORS.secondary2]}
                        style={{
                            borderRadius: 17.5,
                            width: 35,
                            height: 35,
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 2
                        }}
                    >
                        <MaterialIcons name="lock" size={18} color={COLORS.white} />
                    </LinearGradient>
                    <LinearGradient
                        colors={[COLORS.secondary, COLORS.secondary2, COLORS.secondary]}
                        style={{
                            borderRadius: 17.5,
                            width: 1,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: -50
                            //height: 200
                        }}
                    />
                </View>
                <View
                    style={{
                        padding: 50,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.secondary,
                        borderWidth: 1,
                        borderColor: COLORS.whiteBackground2,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: SPACING.large,
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    fontFamily: FONTS.medium,
                                    fontSize: FONT_SIZES.medium,
                                    color: COLORS.grey400
                                }}
                            >
                                Kurz
                            </Text>
                            <Text
                                style={{
                                    fontFamily: FONTS.medium,
                                    fontSize: FONT_SIZES.x_large,
                                    color: COLORS.white,
                                    marginTop: 4
                                }}
                            >
                                2.5
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontFamily: FONTS.medium,
                                    fontSize: FONT_SIZES.medium,
                                    color: COLORS.grey400
                                }}
                            >
                                Typ
                            </Text>
                            <Text
                                style={{
                                    fontFamily: FONTS.medium,
                                    fontSize: FONT_SIZES.x_large,
                                    color: COLORS.white,
                                    marginTop: 4
                                }}
                            >
                                AKO
                            </Text>
                        </View>
                    </View>

                    <CustomButton
                        additionalStyles={{ marginTop: SPACING.medium, width: '100%' }}
                        textColor={COLORS.black}
                        backgroundColors={[COLORS.accent2, COLORS.accent, COLORS.accent, COLORS.accent2]}
                        buttonText='Odemknout'
                        textStyles={{ fontFamily: FONTS.medium }}
                    />
                </View>
            </View>
        </View>
    )
}

export default withSearchParams(Tickets, ['language'])