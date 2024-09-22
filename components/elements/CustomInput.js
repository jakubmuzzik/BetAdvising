import React, { useState, useRef, useEffect, memo } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    BounceInLeft,
    FadeOutLeft,
    BounceIn,
    interpolateColor,
    LinearTransition,
    Easing,
    withTiming,
    useDerivedValue
} from 'react-native-reanimated'
import { COLORS, SPACING, FONTS, FONT_SIZES } from '../../constants'
import {isBrowser } from 'react-device-detect'

const VERTICAL_SPACING = SPACING.x_small

const CustomInput = ({
    value = '',
    label,
    placeholder,
    labelStyle = {},
    placeholderTextColor = COLORS.grey400,
    inputStyle = {},
    containerStyle = { },
    leftIcon,
    rightIcon,
    errorMessage,
    onChangeText,
    keyboardType = 'default',
    verticalPadding = 5,
    horizontalPadding = SPACING.xx_small,
    fontSize = FONT_SIZES.medium,
    secureTextEntry = false,
    focusOnInit = false,
    numberOfLines,
    onPress,
    maxLength,
    borderColor = COLORS.whiteBackground2,
    focusedBorderColor = COLORS.accent,
    hoveredBorderColor = COLORS.accent,
    backgroundColor = COLORS.secondary2,
    focusedBackgroundColor = 'transparent',
    onKeyPress = () => {}
}) => {
    const inputRef = useRef()

    const [isHovered, setIsHovered] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const isActive = useSharedValue(value.length > 0 || isFocused)

    const [inputHeight, setInputHeight] = useState()

    const derivedInputHeight = useDerivedValue(() => {
        return inputHeight
    });

    useEffect(() => {
        if (focusOnInit) {
            onInputPress()
        }
    }, [])

    useEffect(() => {
        if ((isFocused || value.length > 0)) {
            isActive.value = withTiming(true)//withSpring(true)
        } else if (!isFocused && value.length === 0) {
            isActive.value = withTiming(false)//withSpring(false)
        }
    }, [isFocused, value])

    const onInputPress = () => {
        if (onPress) {
            onPress()
            return
        }

        setIsFocused(true)
        inputRef.current.focus()
    }

    const labelContainerStyles = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            left: horizontalPadding,
            justifyContent: numberOfLines > 1 ? 'flex-start' : 'center',
            top: interpolate(isActive.value, [false, true], [numberOfLines > 1 ? verticalPadding + VERTICAL_SPACING : verticalPadding, numberOfLines > 1 ? (verticalPadding / 2) + VERTICAL_SPACING : verticalPadding / 2]),
            //height: interpolate(isActive.value, [false, true], [100, 50]) + '%',
            height: interpolate(isActive.value, [false, true], [derivedInputHeight.value, derivedInputHeight.value / 2]),
        }
    })

    const labelStyles = useAnimatedStyle(() => {
        return {
            fontFamily: FONTS.medium, 
            color: labelStyle.color ?? COLORS.grey300,//interpolateColor(isActive.value, [false, true], [labelStyle.color ?? COLORS.grey300, COLORS.grey300]),
            ...labelStyle,
            fontSize: interpolate(isActive.value, [false, true], [fontSize, fontSize * 0.7]),
        }
    })

    return (
        <View 
            style={{ ...containerStyle }}
            onMouseEnter={isBrowser ? () => setIsHovered(true) : undefined}
            onMouseLeave={isBrowser ? () => setIsHovered(false) : undefined}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: errorMessage ? COLORS.error : isHovered ? hoveredBorderColor : isFocused ? focusedBorderColor : borderColor,//COLORS.darkestBlue,
                paddingHorizontal: horizontalPadding,
                backgroundColor: errorMessage ? COLORS.errorBackground : isFocused ? focusedBackgroundColor : backgroundColor,
                boxShadow: isFocused ? '0px 0px 14px rgba(251, 193, 13, 0.35)' : undefined,
            }}>
                {leftIcon ?? undefined}

                <TouchableOpacity
                    onPress={onInputPress}
                    onLayout={(e) => setInputHeight(e.nativeEvent.layout.height - (verticalPadding * 2))}
                    activeOpacity={1}
                    style={{
                        flexDirection: 'column',
                        paddingHorizontal: horizontalPadding,
                        paddingVertical: verticalPadding,
                        flex: 1,
                        cursor: 'text'
                    }}
                >
                    <Animated.View style={labelContainerStyles}>
                        <Animated.Text numberOfLines={1} style={[styles.labelStyle, labelStyles]}>{label}</Animated.Text>
                    </Animated.View>

                    <Text style={{ fontSize: fontSize }}> </Text>

                    <TextInput
                        ref={inputRef}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChangeText={(val) => onChangeText(val)}
                        value={value}
                        style={{
                            fontFamily: value ? FONTS.regular : FONTS.light,
                            fontSize: FONT_SIZES.medium,
                            color: COLORS.white,
                            ...inputStyle,
                            opacity: (value.length > 0 || isFocused) ? 1 : 0,
                            bottom: 3,
                            outlineStyle: 'none',
                        }}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        keyboardType={keyboardType}
                        secureTextEntry={secureTextEntry}
                        numberOfLines={numberOfLines}
                        multiline={numberOfLines > 1}
                        underlineColorAndroid="transparent"
                        textAlignVertical={numberOfLines > 1 ? 'top' : undefined}
                        editable={!onPress}
                        pointerEvents={onPress ? 'none' : 'auto'}
                        maxLength={maxLength}
                        onKeyPress={onKeyPress}
                    />
                </TouchableOpacity>

                <View>
                    {rightIcon ?? undefined}
                </View>
            </View>

            {errorMessage && <Animated.Text entering={BounceInLeft} exiting={FadeOutLeft} style={styles.errorMessage}>{errorMessage}</Animated.Text>}
        </View>
    )
}

export default memo(CustomInput)

const styles = StyleSheet.create({
    labelStyle: {
        textAlignVertical: 'center',
        includeFontPadding: false,
    },
    errorMessage: {
        fontFamily: FONTS.regular,
        color: COLORS.error,
        fontSize: FONT_SIZES.small,
        paddingTop: SPACING.xxx_small,
        alignSelf: 'flex-start'
    }
})