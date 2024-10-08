import React from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import { COLORS, SPACING, FONTS, FONT_SIZES } from '../constants'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import Animated, {
    useAnimatedStyle,
    useFrameCallback,
    useSharedValue,
} from 'react-native-reanimated'

const MeasureElement = ({ onLayout, children }) => (
    <Animated.ScrollView
        horizontal
        style={marqueeStyles.hidden}
        pointerEvents="box-none"
    >
        <View onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}>
            {children}
        </View>
    </Animated.ScrollView>
)

const TranslatedElement = ({ index, children, offset, childrenWidth }) => {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            left: (index - 1) * childrenWidth,
            transform: [
                {
                    translateX: -offset.value,
                },
            ],
        }
    })
    return (
        <Animated.View style={[styles.animatedStyle, animatedStyle]}>
            {children}
        </Animated.View>
    )
}

const getIndicesArray = (length) => Array.from({ length }, (_, i) => i)

const Cloner = ({ count, renderChild }) => (
    <>{getIndicesArray(count).map(renderChild)}</>
)

const ChildrenScroller = ({
    duration,
    childrenWidth,
    parentWidth,
    reverse,
    children,
}) => {
    const offset = useSharedValue(0)
    const coeff = useSharedValue(reverse ? 1 : -1)

    React.useEffect(() => {
        coeff.value = reverse ? 1 : -1
    }, [reverse])

    useFrameCallback((i) => {
        var _a
        // prettier-ignore
        offset.value += (coeff.value * (((_a = i.timeSincePreviousFrame) !== null && _a !== void 0 ? _a : 1) * childrenWidth)) / duration
        offset.value = offset.value % childrenWidth
    }, true)

    const count = Math.round(parentWidth / childrenWidth) + 2

    const renderChild = (index) => (
        <TranslatedElement
            key={`clone-${index}`}
            index={index}
            offset={offset}
            childrenWidth={childrenWidth}
        >
            {children}
        </TranslatedElement>
    )

    return <Cloner count={count} renderChild={renderChild} />
}

const Marquee = ({ duration = 100000, reverse = false, children, style }) => {
    const [parentWidth, setParentWidth] = React.useState(0)
    const [childrenWidth, setChildrenWidth] = React.useState(0)

    return (
        <View
            style={style}
            onLayout={(ev) => {
                setParentWidth(ev.nativeEvent.layout.width)
            }}
            pointerEvents="box-none"
        >
            <View style={marqueeStyles.row} pointerEvents="box-none">
                <MeasureElement onLayout={setChildrenWidth}>{children}</MeasureElement>
            
                {childrenWidth > 0 && parentWidth > 0 && (
                    <ChildrenScroller
                        duration={duration}
                        parentWidth={parentWidth}
                        childrenWidth={childrenWidth}
                        reverse={reverse}
                    >
                        {children}
                    </ChildrenScroller>
                )}

                <View pointerEvents="none" style={{
                    position: 'absolute',
                    left: 0,
                    width: 50,
                    height: '100%',
                }}>
                    <LinearGradient
                        colors={[
                            COLORS.primary,
                            'rgba(13 19 26/0)',
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: 40, height: '100%' }}
                    />
                </View>

                <View pointerEvents="none" style={{
                    position: 'absolute',
                    right: 0,
                    width: 40,
                    height: '100%',
                }}>
                    <LinearGradient
                        colors={[
                            'rgba(13 19 26/0)',
                            COLORS.primary,
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: 40, height: '100%' }}
                    />
                </View>
            </View>
        </View>
    )
}

const marqueeStyles = StyleSheet.create({
    hidden: { opacity: 0, zIndex: -1 },
    row: { flexDirection: 'row', overflow: 'hidden' },
})

const TicketsScroller = () => {

    const { width } = useWindowDimensions()

    return (
        <View
            style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 200
            }}
        >
            
            <Text
                style={{
                    fontFamily: FONTS.medium,
                    fontSize: FONT_SIZES.h1,
                    color: COLORS.white,
                    textAlign: 'center',
                    zIndex: 2
                }}
            >
                Nech se inspirovat
            </Text>
            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: FONT_SIZES.x_large,
                    color: COLORS.grey400,
                    marginTop: 10,
                    paddingHorizontal: SPACING.page_horizontal,
                    textAlign: 'center',
                    zIndex: 2
                }}
            >
                Nech se inspirovat našimi tipy a začni svou cestu k úspěchu ještě dnes.
            </Text>

            {/* <Image
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 0,
                    left: 0,
                    margin: 'auto',
                    width: '40%',
                    aspectRatio: 3000/2400,
                    opacity: 0.3
                    
                }}
                source={require('../assets/images/gold-confetti.png')}
            /> */}

            <Marquee 
                style={{
                    marginTop: SPACING.xxx_large,
                    width: '100%',
                }}
                reverse={false}
                >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        style={[styles.logoImage, {
                            aspectRatio: 935/1280,
                            height: width < 800 ? 250 : 330
                        }]}
                        source={require('../assets/images/ticket.png')}
                    />
                    <Image
                        style={[styles.logoImage, {
                            aspectRatio: 935/1280,
                            height: width < 800 ? 250 : 330
                        }]}
                        source={require('../assets/images/ticket.png')}
                    />
                    <Image
                        style={[styles.logoImage, {
                            aspectRatio: 935/1280,
                            height: width < 800 ? 250 : 330
                        }]}
                        source={require('../assets/images/ticket.png')}
                    />
                    <Image
                        style={[styles.logoImage, {
                            aspectRatio: 935/1280,
                            height: width < 800 ? 250 : 330
                        }]}
                        source={require('../assets/images/ticket.png')}
                    />
                    <Image
                        style={[styles.logoImage, {
                            aspectRatio: 935/1280,
                            height: width < 800 ? 250 : 330
                        }]}
                        source={require('../assets/images/ticket.png')}
                    />
                    <Image
                        style={[styles.logoImage, {
                            aspectRatio: 935/1280,
                            height: width < 800 ? 250 : 330
                        }]}
                        source={require('../assets/images/ticket.png')}
                    />
                    <Image
                        style={[styles.logoImage, {
                            aspectRatio: 935/1280,
                            height: width < 800 ? 250 : 330
                        }]}
                        source={require('../assets/images/ticket.png')}
                    />
                </View>
            </Marquee>
        </View>
    )
}

export default TicketsScroller

const styles = StyleSheet.create({
    logoImage: {
        marginHorizontal: SPACING.large,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.whiteBackground2,
        shadowColor: COLORS.black,

        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.26,
        shadowRadius: 6.68,

        elevation: 11,
    },
    container: {
        flex: 1,
    },
    safeArea: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    animatedStyle: {
        position: 'absolute',
    }
})