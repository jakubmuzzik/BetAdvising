import React, { useState, useRef, useEffect, useLayoutEffect, memo } from 'react'
import { View, TouchableOpacity, Text, InteractionManager } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../../constants'
import Animated, { useAnimatedStyle, withTiming, useSharedValue, interpolate, useDerivedValue } from 'react-native-reanimated'

const Indicator = ({ measures, activeIndex, indicatorStyle={} }) => {
    if (activeIndex == null) return null

    const indicatorAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(measures[activeIndex].width - 10),
            transform: [
                {
                    translateX: withTiming(measures[activeIndex].x + 5)
                }
            ]
        }
    }, [activeIndex, measures])

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
    indicatorStyle={ bottom: -4 },
    itemPaddingVertical = 12,
    itemPaddingHorizontal = 16,
    tabs,
    activeIndex
}) => {
    const [measures, setMeasures] = useState([])
    const containerRef = useRef()

    /*useEffect(() => {
        const m = []
        tabs.forEach((tab, index) => {
            tab.ref.current.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    m.push({ 
                        //need to calculate like this, because x does not contain the padding
                        x: index === 0 ? 0 : m[index - 1].x + m[index - 1].width + tabItemsGap, 
                        y, 
                        width,//: Number(width) + Number(itemPaddingHorizontal * 2), 
                        height
                    })
                }
            )
        })

        setMeasures(m)
    }, [])*/

    const onTabLayout = (e, index) => {
       const { x, y, width, height } = e.nativeEvent.layout
        setMeasures(prev => {
            const m = [...prev]
            m[index] = { x, y, width, height }
            return m
        })
    }


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
            {measures.length === tabs.length && <Indicator measures={measures} activeIndex={activeIndex} indicatorStyle={indicatorStyle} />}

            {tabs.map((tab, index) => (
                <TouchableOpacity
                    onLayout={(e) => onTabLayout(e, index)}
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

export default memo(UnderlineTabView)