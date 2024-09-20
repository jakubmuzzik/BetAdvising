import React, { useState, memo } from 'react'
import { View, StyleSheet } from 'react-native'
import { isBrowser } from 'react-device-detect'
import { CUSTOM_BUTTON_HEIGHT } from '../../constants'
import { AntDesign } from '@expo/vector-icons'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const HoverableView = ({
    children,
    style,
    hoveredBackgroundColor,
    backgroundColor,
    hoveredOpacity = 1,
    hoveredBorderColor,
    borderColor,
    transitionDuration = '150ms',
    withCustomButtonHeight = false,
    withHoverableArrow = false,
    arrowSize = 16,
    arrowColor = 'black',
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false)

    const heightStyle = withCustomButtonHeight ? { height: CUSTOM_BUTTON_HEIGHT } : {}

    const arrowAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: withTiming(isHovered ? 3 : 0) }
            ]
        }
    })

    //TODO - maybe implement responder when rendered on mobile? https://stackoverflow.com/questions/70573259/how-to-style-hover-in-react-native
    return (
        <View style={{
            transitionDuration: { transitionDuration },
            backgroundColor: isHovered ? hoveredBackgroundColor : backgroundColor,
            opacity: isHovered ? hoveredOpacity : 1,
            borderColor: isHovered ? hoveredBorderColor : borderColor,
            flexDirection: 'row',
            gap: 5,
            overflow: 'hidden',
            ...heightStyle,
            ...style
        }}
            {...props}
            onMouseEnter={isBrowser ? () => setIsHovered(true) : undefined}
            onMouseLeave={isBrowser ? () => setIsHovered(false) : undefined}
        >
            {Array.isArray(backgroundColor) && <LinearGradient
                colors={backgroundColor}
                style={{ ...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'center' }}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            />}
            {children}
            {withHoverableArrow && (
                <Animated.View style={arrowAnimatedStyle}>
                    <AntDesign name="arrowright" size={arrowSize} color={arrowColor} />
                </Animated.View>
            )}
        </View>
    )
}

export default memo(HoverableView)