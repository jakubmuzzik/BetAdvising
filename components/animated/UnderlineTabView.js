import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../../constants'
import Animated, { useAnimatedStyle, withTiming, useSharedValue, interpolate, useDerivedValue } from 'react-native-reanimated'

const Indicator = ({ measures, activeIndex, indicatorStyle={} }) => {
    const indicatorAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(measures[activeIndex].width - 10),
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
                    backgroundColor: COLORS.accent,
                    borderRadius: 10,
                    height: 2,
                    bottom: 0
                },
                indicatorStyle,
                indicatorAnimatedStyle
            ]}
        />
    )
}

const UnderlineTabView = ({
    containerStyle = {},
    tabItemStyle = {},
    labelStyle = {},
    tabItemsGap = 0,//SPACING.large,
    labelActiveColor = COLORS.white,
    labelInactiveColor = COLORS.grey400,
    indicatorStyle={},
    itemPaddingVertical = 12,
    itemPaddingHorizontal = 16,
    tabs,
    activeIndex
}) => {
    const [measures, setMeasures] = useState([])
    const containerRef = useRef()

    useLayoutEffect(() => {
        const m = []
        tabs.forEach((tab, index) => {
            tab.ref.current.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    m.push({ 
                        //need to calculate like this, because x does not contain the padding
                        x: index === 0 ? 0 : m[index - 1].x + m[index - 1].width + tabItemsGap, 
                        y, 
                        width: Number(width) + Number(itemPaddingHorizontal * 2), 
                        height
                    })
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
                alignItems: 'center',
                gap: tabItemsGap,
                borderRadius: 10,
                ...containerStyle
            }}
        >
            {measures.length > 0 && <Indicator measures={measures} activeIndex={activeIndex} indicatorStyle={indicatorStyle} />}

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
                        paddingVertical: itemPaddingVertical,
                        paddingHorizontal: itemPaddingHorizontal,
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

export default UnderlineTabView