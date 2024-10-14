import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../../constants'
import { normalize } from '../../utils'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Animated, { useSharedValue, useDerivedValue, useAnimatedStyle, withTiming, LinearTransition } from 'react-native-reanimated'
import { TouchableRipple } from 'react-native-paper'

const Accordion = ({ headerText, bodyText, headerTextStyle, bodyTextStyle, backgroundColor }) => {
    const height = useSharedValue(0)
    const isExpanded = useSharedValue(false)

    const derivedHeight = useDerivedValue(() =>
        withTiming(height.value * Number(isExpanded.value), {
            duration: 300
        })
    )

    const bodyStyle = useAnimatedStyle(() => ({
        height: derivedHeight.value,
    }))

    const derivedChevronRotation = useDerivedValue(() =>
        withTiming(isExpanded.value ? 180 : 0, {
            duration: 200
        })
    )

    const animatedChevronStyle = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: `${derivedChevronRotation.value}deg`
            }
        ]
    }))

    const onAccordionPress = () => {
        isExpanded.value = !isExpanded.value
    }

    return (
        <TouchableRipple
            style={{
                backgroundColor,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.whiteBackground2,
            }}
            onPress={onAccordionPress}
            rippleColor='rgba(251, 193, 13, 0.1)'
        >
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                        borderRadius: 10,
                        padding: SPACING.medium,
                        gap: SPACING.x_small
                    }}
                >
                        <Text style={headerTextStyle}>
                            {headerText}
                        </Text>
                        <Animated.View
                            style={animatedChevronStyle}
                        >
                            <MaterialCommunityIcons
                                name="chevron-down"
                                size={20}
                                color={COLORS.grey300}
                            />
                        </Animated.View>
                   
                </View>
                <Animated.View

                    style={[bodyStyle, { overflow: 'hidden' }]}
                >
                    <View
                        onLayout={(event) => {
                            height.value = event.nativeEvent.layout.height
                        }}
                        style={{
                            position: 'absolute',
                            padding: SPACING.medium,
                            paddingTop: 0,
                        }}
                    >
                        <Text style={bodyTextStyle}>
                            {bodyText}
                        </Text>
                    </View>
                </Animated.View>
            </>
        </TouchableRipple>
    )
}

export default Accordion