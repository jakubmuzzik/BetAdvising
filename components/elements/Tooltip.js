import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ReactDOM from 'react-dom'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { COLORS, FONT_SIZES, FONTS } from '../../constants'

const Tooltip = ({ children, text, style={} }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

    // Function to calculate the position of the tooltip
    const calculateTooltipPosition = (target) => {
        const rect = target.getBoundingClientRect()  // Get the parent element position
        setTooltipPosition({
            top: rect.bottom + window.scrollY,  // Add scroll position to maintain the correct position
            left: rect.left + rect.width / 2 + window.scrollX,  // Maintain horizontal position with scroll
        })
    }

    const handleMouseEnter = (e) => {
        calculateTooltipPosition(e.target)
        setIsTooltipVisible(true)
    }

    const handleMouseLeave = () => {
        setIsTooltipVisible(false)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (isTooltipVisible) {
                const parentElement = document.querySelector(`[data-tooltip-id="${children.props.id}"]`)
                if (parentElement) {
                    calculateTooltipPosition(parentElement)
                }
            }
        }

        // Attach scroll listener
        window.addEventListener('scroll', handleScroll)

        // Cleanup on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isTooltipVisible])

    return (
        <View
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                ...style,
                position: 'relative',
            }}
            data-tooltip-id={children.props.id}  // Add a unique identifier for the parent element
        >
            {children}
            {isTooltipVisible && ReactDOM.createPortal(
                <Animated.View
                    entering={FadeIn.duration(100)}
                    exiting={FadeOut.duration(100)}
                    style={[
                        styles.tooltip,
                        { top: tooltipPosition.top, left: tooltipPosition.left }
                    ]}
                >
                    <View 
                        style={{
                            margin: 'auto',
                            width: 0,
                            height: 0,
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderBottom: '8px solid #333',
                        }}
                    />
                    <View
                        style={{
                            padding: 8,
                            backgroundColor: '#333',
                            borderRadius: 4
                        }}
                    >
                        <Text style={styles.tooltipText}>{text}</Text>
                    </View>
                </Animated.View>,
                document.body
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    tooltip: {
        position: 'absolute',
        transform: [{ translateX: '-50%' }],
        //backgroundColor: '#333',
        zIndex: 1000,
        whiteSpace: 'nowrap',
    },
    tooltipText: {
        color: COLORS.white,
        fontFamily: FONTS.regular,
        fontSize: FONT_SIZES.medium
    },
})

export default Tooltip
