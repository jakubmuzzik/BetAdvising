import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native'
import { SPACING, FONTS, FONT_SIZES, COLORS, CUSTOM_BUTTON_HEIGHT } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient'
import { ActivityIndicator } from 'react-native-paper'
import Animated, { LinearTransition, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const CustomButton = forwardRef((props, ref) => {
    const { 
        onPress, 
        additionalStyles={},
        backgroundColors,
        spinnerColor='#000',
        textColor='#FFF',
        buttonText,
        textStyles={},
        icon,
        disabled = false,
        activeOpacity=0.7,
        animateOnPress=false
    } = props

    const [isLoading, setIsLoading] = useState(false)

    const transformValue = useSharedValue(1)

    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: transformValue.value }]
        }
    })

    useImperativeHandle(ref, () => ({
        setIsLoading
    }))

    const onButtonPress = () => {
        if (animateOnPress) {
            transformValue.value = withTiming(1)
        }
        
        if (disabled || isLoading) {
            return
        }

        onPress()
    }

    const onPressIn = () => {
        if (animateOnPress) {
            transformValue.value = withTiming(0.9)
        }
    }

    return (
        <AnimatedTouchableOpacity ref={ref} layout={LinearTransition}
            style={[
                styles.button,
                {
                    ...additionalStyles,
                    backgroundColor: Array.isArray(backgroundColors) ? 'transparent' : backgroundColors
                },
                buttonAnimatedStyle
            ]}
            onPressOut={onButtonPress}
            onPressIn={onPressIn}
            activeOpacity={activeOpacity}
        >
            {Array.isArray(backgroundColors) && <LinearGradient
                colors={backgroundColors}
                style={{ ...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'center' }}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            />}
            {
                isLoading ? <ActivityIndicator color={spinnerColor} size={FONT_SIZES.large} />
                : (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        {icon}<Text numberOfLines={1} style={[styles.buttonText, { ...textStyles, color: disabled ? COLORS.grey : textColor}]}>{buttonText}</Text>
                    </View>  
                )
            }
        </AnimatedTouchableOpacity>
    )
})

export default CustomButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        paddingHorizontal: SPACING.medium,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        height: CUSTOM_BUTTON_HEIGHT
    },
    buttonText: {
        fontFamily: FONTS.medium,
        fontSize: FONT_SIZES.medium,
        textAlignVertical: 'center',
        includeFontPadding: false,
        textAlignVertical: 'center',
        flexShrink: 1
    }
})