import React, { useState, useRef, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../../constants'
import Animated, { useAnimatedStyle, withTiming, useSharedValue, interpolate, useDerivedValue } from 'react-native-reanimated'

const Indicator = ({ measures, activeIndex }) => {
    const indicatorAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(measures[activeIndex].width - 10),
            height: measures[activeIndex].height - 10,
            transform: [
                {
                    translateX: withTiming(measures[activeIndex].x + 5)
                }
            ]
        }
    }, [activeIndex])

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    left: 0,
                    backgroundColor: COLORS.secondary2,
                    borderRadius: 10
                },
                indicatorAnimatedStyle
            ]}
        />
    )
}

const FilledTabView = ({
    containerStyle = {},
    tabItemStyle = {},
    labelStyle = {},
    tabItemsGap = 0,//SPACING.large,
    labelActiveColor = COLORS.white,
    labelInactiveColor = COLORS.grey400,
    itemPaddingVertical = 12,
    itemPaddingHorizontal = 16,
    tabs,
    activeIndex
}) => {
    const [measures, setMeasures] = useState([])
    const containerRef = useRef()

    useEffect(() => {
        const m = []
        tabs.forEach((tab) => {
            tab.ref.current.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    m.push({ x, y, width, height })
                }
            )
        })

        setMeasures(m)
    }, [])

    return (
        <View
            ref={containerRef}
            style={{
                flexDirection: 'row',
                gap: tabItemsGap,
                borderRadius: 10,
                backgroundColor: COLORS.secondary,
                ...containerStyle
            }}
        >
            {measures.length > 0 && <Indicator measures={measures} activeIndex={activeIndex} />}

            {tabs.map((tab) => (
                <TouchableOpacity
                    ref={tab.ref}
                    key={tab.key}
                    onPress={tab.onPress}
                    activeOpacity={1}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        ...tabItemStyle
                    }}
                >
                    {tab.icon && tab.icon(tab.index === activeIndex)}
                    <Text
                        style={{
                            color: tab.index === activeIndex ? labelActiveColor : labelInactiveColor,
                            fontFamily: FONTS.medium,
                            fontSize: FONT_SIZES.large,
                            ...labelStyle
                        }}
                    >
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default FilledTabView