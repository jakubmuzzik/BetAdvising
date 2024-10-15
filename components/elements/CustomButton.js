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
import {isBrowser } from 'react-device-detect'

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
        hoveredOpacity=0.9
    } = props

    const [isLoading, setIsLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useImperativeHandle(ref, () => ({
        setIsLoading,
        isLoading
    }))

    const onButtonPress = () => {
        if (disabled || isLoading) {
            return
        }

        onPress()
    }

    return (
        <TouchableOpacity 
            ref={ref} 
            //layout={LinearTransition}
            style={[
                styles.button,
                {
                    ...additionalStyles,
                    backgroundColor: Array.isArray(backgroundColors) ? 'transparent' : backgroundColors,
                    opacity: disabled ? 0.5 : isHovered ? hoveredOpacity : 1,
                    cursor: disabled ? 'not-allowed' : 'pointer'
                }
            ]}
            onPress={onButtonPress}
            activeOpacity={activeOpacity}
            onMouseEnter={isBrowser ? () => setIsHovered(true) : undefined}
            onMouseLeave={isBrowser ? () => setIsHovered(false) : undefined}
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
        </TouchableOpacity>
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
        verticalAlign: 'center',
        includeFontPadding: false,
        verticalAlign: 'center',
        flexShrink: 1
    }
})