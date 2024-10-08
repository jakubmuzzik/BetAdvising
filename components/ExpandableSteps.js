import React from "react"
import { View, Text } from "react-native"
import { TouchableRipple } from "react-native-paper"
import { COLORS, SPACING, FONTS, FONT_SIZES } from "../constants"
import Animated, { BounceIn, useSharedValue, useDerivedValue, useAnimatedStyle, withTiming } from "react-native-reanimated"
import { Image } from "expo-image"
import { replace, useNavigate } from "react-router-dom"
import withSearchParams from "./hoc/withSearchParams"

const ACTIVE_BORDER_COLOR = COLORS.white
const INACTIVE_BORDER_COLOR = COLORS.whiteBackground2

const Step = ({ step, activeStep, navigate, searchParams }) => {
    const isActive = step.index === activeStep

    const height = useSharedValue(0)

    const derivedHeight = useDerivedValue(() =>
        withTiming(height.value * Number(isActive), {
            duration: 300
        })
    )

    const bodyStyle = useAnimatedStyle(() => ({
        height: derivedHeight.value,
    }))

    const onHeaderPress = () => {
        if (!step.headerPressable) {
            return
        }

        navigate({
            pathname: step.pathname,
            search: new URLSearchParams(searchParams).toString(),
        }, {
            replace: true
        })
    }

    return (
        <View
            style={{
                backgroundColor: COLORS.secondary,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: isActive ? ACTIVE_BORDER_COLOR : INACTIVE_BORDER_COLOR,
                width: '100%',
            }}
        >
            <TouchableRipple
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: COLORS.secondary,
                    borderRadius: 10,
                    padding: SPACING.medium,
                    flex: 1,
                    cursor: step.headerPressable ? 'pointer' : 'default'
                }}
                rippleColor={step.headerPressable ? COLORS.secondary2 + '99' : 'transparent'}
                onPress={onHeaderPress}
            >
                <>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15
                        }}
                    >
                        {step.headerLeftIcon(isActive)}
                        <Text style={{
                            fontSize: FONT_SIZES.large,
                            fontFamily: FONTS.medium,
                            color: isActive ? COLORS.white : COLORS.grey400
                        }}>
                            {step.headerText}
                        </Text>
                    </View>
                    {activeStep > step.index && (
                        <Animated.View
                            entering={BounceIn}
                        >
                            <Image
                                source={require('../assets/images/SuccessIcon.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                            />
                        </Animated.View>
                    )}
                </>
            </TouchableRipple>
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
                        width: '100%',
                    }}
                >
                    {step.body}
                </View>
            </Animated.View>
        </View>
    )
}

const ExpandableSteps = ({ steps, activeStep, searchParams }) => {
    const navigate = useNavigate()

    return (
        <View
            style={{
                alignItems: 'center',
            }}
        >
        {steps.map((step, index) => (
            <>
                <Step
                    key={step.key}
                    step={step}
                    activeStep={activeStep}
                    navigate={navigate}
                    searchParams={searchParams}
                />
                {index !== steps.length - 1 && <View style={{ width: 1, height: 30, backgroundColor: COLORS.whiteBackground2 }} />}
            </>
            ))}
        </View>
    )
}

export default withSearchParams(ExpandableSteps, ['language'])