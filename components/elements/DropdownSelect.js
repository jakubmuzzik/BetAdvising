import React, { useState, useCallback, useRef, forwardRef, useImperativeHandle, useEffect, memo } from "react"
import { View, useWindowDimensions, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView, TextInput as NativeTextInput } from 'react-native'
import { TextInput, HelperText, TouchableRipple } from 'react-native-paper'
import { COLORS, CUSTOM_BUTTON_HEIGHT, FONTS, FONT_SIZES, SPACING } from "../../constants"
import { isBrowser } from 'react-device-detect'
import { normalize } from "../../utils"
import HoverableView from "./HoverableView"
import { MotiView } from 'moti'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import CustomInput from "./CustomInput"

const DropdownSelect = forwardRef((props, ref) => {
    const {
        values,
        label,
        placeholder,
        multiselect = false,
        searchable = false,
        searchPlaceholder,
        borderColor=COLORS.whiteBackground2,
        hoveredBorderColor=COLORS.accent, 
        backgroundColor=COLORS.secondary,//COLORS.darkRedBackground, 
        hoveredBackgroundColor=COLORS.secondary,
        errorMessage,
        mode = "outlined",
        labelStyle={ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.white },
        text,
        textStyle={ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.white },
        containerStyle = {},
        setText,
        leftIconName,
        leftIconColor = COLORS.placeholder,
        rightIconName,
        children,
        offsetX = 0,
        containerRef
    } = props

    const dropdownRef = useRef()
    const filteredValuesRef = useRef(values)

    const [dropdownDesc, setDropdownDesc] = useState(0)
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState('')
    const [searchBorderColor, setSearchBorderColor] = useState(COLORS.placeholder)

    const { height, width } = useWindowDimensions()

    useEffect(() => {
        filteredValuesRef.current = values
    }, [values])

    const onValuePress = (value) => {
        setText(value)
        if (!multiselect) {
            setVisible(false)
        }
    }

    const onDropdownPress = () => {
        if (containerRef?.current) {
            dropdownRef.current.measureLayout(
                containerRef.current,
                (left, top, width, height) => {
                    //const hasEnoughSpaceBelow = (height - (py + h + 5)) > 200
                    //const maxHeight = hasEnoughSpaceBelow ? height - (py + h + 5) : 350
                    setDropdownDesc({
                        //y: hasEnoughSpaceBelow ? py + h + 5 : undefined,
                        x: left - offsetX,
                        width: width,
                        //maxHeight,
                        py: top,
                        h: height
                    })
                    setVisible(true)
                },
            )
        } else {
            dropdownRef.current.measure((_fx, _fy, _w, h, _px, py) => {
                //const hasEnoughSpaceBelow = (height - (py + h + 5)) > 200
                //const maxHeight = hasEnoughSpaceBelow ? height - (py + h + 5) : 350
                setDropdownDesc({
                    //y: hasEnoughSpaceBelow ? py + h + 5 : undefined,
                    x: _px - offsetX,
                    width: _w,
                    //maxHeight,
                    py,
                    h
                })
                setVisible(true)
            })
        }       
    }

    useImperativeHandle(ref, () => ({
        onDropdownPress
    }))

    const onSearch = useCallback((value) => {
        filteredValuesRef.current = value ? [...values].filter(val => val.toLowerCase().includes(value.toLowerCase())) : [...values]
        setSearch(value)
    }, [filteredValuesRef.current])

    const onDropdownLayout = useCallback((event) => {
        const spaceBelowDropdown = height - (dropdownDesc.py + dropdownDesc.h + 5 + SPACING.medium)
        const hasEnoughSpaceBelow = spaceBelowDropdown > event.nativeEvent.layout.height

        setDropdownDesc((desc) => ({
            ...desc,
            y: hasEnoughSpaceBelow ? dropdownDesc.py + dropdownDesc.h + 5 : height - event.nativeEvent.layout.height - SPACING.medium,
            dropdownWidth: event.nativeEvent.layout.width
        }))
    }, [dropdownDesc, height])

    const renderDropdown = useCallback(() => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity
                    style={styles.dropdownOverlay}
                    onPress={() => setVisible(false)}
                >
                    <TouchableWithoutFeedback>
                        <MotiView
                            onLayout={onDropdownLayout}
                            from={{
                                opacity: 0,
                                transform: [{ scaleY: 0.8 }, { translateY: -10 }],
                            }}
                            animate={{
                                opacity: 1,
                                transform: [{ scaleY: 1 }, { translateY: 0 }],
                            }}
                            transition={{
                                type: 'timing',
                                duration: 100,
                            }}
                            style={[styles.dropdown, {
                                maxHeight: 300,
                                minWidth: dropdownDesc.width,
                                top: dropdownDesc.y,
                                left: dropdownDesc.x + dropdownDesc.dropdownWidth > width ? dropdownDesc.x - (dropdownDesc.x + dropdownDesc.dropdownWidth - width) - 5 : dropdownDesc.x,
                            }]}
                        >
                            {searchable && (
                                <HoverableView style={{ ...styles.searchWrapper, borderRadius: 10, marginVertical: SPACING.xx_small, marginHorizontal: SPACING.xx_small }} hoveredBackgroundColor={COLORS.darkRedBackground2} backgroundColor='#372b2b' hoveredBorderColor={COLORS.red} borderColor={searchBorderColor} transitionDuration='0ms'>
                                    <Ionicons name="search" size={normalize(17)} color="white" />
                                    <NativeTextInput
                                        style={styles.citySearch}
                                        onChangeText={onSearch}
                                        value={search}
                                        placeholder={searchPlaceholder}
                                        placeholderTextColor={COLORS.placeholder}
                                        onBlur={() => setSearchBorderColor(COLORS.placeholder)}
                                        onFocus={() => setSearchBorderColor(COLORS.red)}
                                    />
                                    <Ionicons onPress={() => onSearch('')} style={{ opacity: search ? '1' : '0' }} name="close" size={normalize(17)} color="white" />
                                </HoverableView>
                            )}

                            <ScrollView>
                                {filteredValuesRef.current.map((value) => {
                                    const selected = multiselect ? text.includes(value) : text === value
                                    return multiselect ? (
                                        <TouchableRipple
                                            key={value}
                                            onPress={() => onValuePress(value)}
                                            style={{ 
                                                backgroundColor: selected ? COLORS.whiteBackground : undefined, 
                                                paddingVertical: SPACING.xx_small, 
                                                paddingHorizontal: SPACING.medium, 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center', 
                                                flexDirection: 'row' 
                                            }}
                                            rippleColor={COLORS.whiteBackground}
                                        >
                                            <BouncyCheckbox
                                                pointerEvents="none"
                                                disableBuiltInState
                                                isChecked={selected}
                                                size={normalize(19)}
                                                fillColor={COLORS.red}
                                                unfillColor="#FFFFFF"
                                                text={value}
                                                iconStyle={{ borderRadius: 3 }}
                                                innerIconStyle={{ borderWidth: 2, borderRadius: 3 }}
                                                textStyle={{ color: '#FFF', fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, textDecorationLine: "none" }}
                                                textContainerStyle={{ flexShrink: 1 }}
                                            />
                                        </TouchableRipple>
                                    ) : (
                                        <TouchableRipple
                                            key={value}
                                            onPress={() => onValuePress(value)}
                                            style={{ 
                                                    paddingVertical: SPACING.xx_small,
                                                    paddingHorizontal: SPACING.medium,
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    backgroundColor: selected ? COLORS.whiteBackground : undefined
                                                }}
                                                rippleColor={COLORS.whiteBackground}
                                            >
                                            <>
                                                <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.medium, color: COLORS.white }}>
                                                    {value}
                                                </Text>
                                                {
                                                    multiselect
                                                    && (
                                                        selected ? <MaterialIcons name="done" style={{ height: normalize(20), width: normalize(20) }} size={normalize(20)} color="green" />
                                                            : <Ionicons name="add-outline" style={{ height: normalize(20), width: normalize(20) }} size={normalize(20)} color="white" />
                                                    )
                                                }
                                            </>
                                        </TouchableRipple>
                                    )
                                })}
                            </ScrollView>
                        </MotiView>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }, [visible, dropdownDesc, text, search, searchBorderColor])

    return (
        <>
            <TouchableOpacity
                ref={dropdownRef}
                onPress={onDropdownPress}
                style={containerStyle}
            >
                {children ? children : 
                    <CustomInput
                        placeholder={placeholder}
                        label={label}
                        errorMessage={errorMessage}
                        value={text}
                        onPress={onDropdownPress}
                        rightIcon={<MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color={COLORS.grey300}
                        />}
                        cursor="pointer"
                    /> 
                }
                {/* {errorMessage && <HelperText type="error" visible>
                    <Text style={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.small, color: COLORS.error }}>
                        {errorMessage}
                    </Text>
                </HelperText>} */}
            </TouchableOpacity>
            {renderDropdown()}
        </>
    )
})

export default memo(DropdownSelect)

const styles = StyleSheet.create({
    dropdownOverlay: {
        width: '100%',
        height: '100%',
        cursor: 'default',
        alignItems: 'flex-end',
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: COLORS.secondary2,
        //marginRight: SPACING.page_horizontal,
        borderRadius: 10,
        paddingVertical: SPACING.xxx_small,
        borderWidth: 1,
        borderColor: COLORS.whiteBackground2,
        overflow: 'hidden'
    },
    searchWrapper: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        paddingHorizontal: SPACING.x_small,
        overflow: 'hidden'
    },
    citySearch: {
        flex: 1,
        padding: SPACING.xxx_small,
        borderRadius: 10,
        fontFamily: FONTS.regular,
        fontSize: FONT_SIZES.medium,
        outlineStyle: 'none',
        color: '#FFF'
    },
})