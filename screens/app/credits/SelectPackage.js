import React, { useRef, useState, useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONTS, FONT_SIZES, COLORS, SPACING, PACKAGES } from '../../../constants'
import { useNavigate } from 'react-router-dom'
import { Image } from 'expo-image'

import withSearchParams from '../../../components/hoc/withSearchParams'

import CustomButton from '../../../components/elements/CustomButton'
import { TouchableRipple } from 'react-native-paper'
import { Discount } from '../../../components/Package'

const PACKAGES_GAP = SPACING.medium

const thresholds = [
    {
        minWidth: 0,
        maxWidth: 460,
        itemsNumber: 1
    },
    {
        minWidth: 460,
        maxWidth: 650,
        itemsNumber: 2
    },
    {
        minWidth: 650,
        itemsNumber: 3
    }
]

const calculatePackageWidth = (contentWidth) => {
    const numberOfItems = thresholds.find(threshold => {
        if (threshold.maxWidth) {
            return contentWidth >= threshold.minWidth && contentWidth < threshold.maxWidth
        } else {
            return contentWidth >= threshold.minWidth
        }
    }).itemsNumber

    if (numberOfItems === 1) {
        return contentWidth
    }

    return (contentWidth / numberOfItems) - (PACKAGES_GAP * (numberOfItems - 1) / numberOfItems)
}

const BulletPoint = ({ text }) => (
    <View
        style={{
            flexDirection: 'row',
            gap: 6,
        }}
    >
        <Text
            style={styles.descriptionText}
        >
            •
        </Text>
        <Text
            style={styles.descriptionText}
        >
            {text}
        </Text>
    </View>
)

const Package = ({ data, isSelected, packageWidth, setSelectedPackage }) => {

    return (
        <TouchableRipple
            //dataSet={{ id: 'package' }}
            style={{
                borderWidth: 1,
                borderColor: isSelected ? COLORS.accent : COLORS.grey400,//COLORS.accent + '90',
                borderRadius: 10,
                padding: SPACING.small,
                width: packageWidth,
                justifyContent: 'space-between',
                backgroundColor: '#151f28'
            }}
            onPress={() => setSelectedPackage(data.id)}
            rippleColor={COLORS.accent + '10'}
        >
            <>
            {data.discount > 0 && <Discount discount={data.discount}/>}
            <View>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.accent,
                        marginBottom: 10
                    }}
                >
                    {data.name}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    marginBottom: 10,
                    alignItems: 'center'
                }}>
                    <Text
                        style={{
                            fontFamily: FONTS.extraBold,
                            fontSize: FONT_SIZES.h2,
                            color: COLORS.white,

                        }}
                    >
                        {data.credits}
                    </Text>
                    <Image
                        source={require('../../../assets/images/coin.png')}
                        style={{
                            width: 30,
                            aspectRatio: 49/36,
                            contentFit: 'contain'
                        }}
                    />
                </View>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey300,
                        marginBottom: 20
                    }}
                >
                    Za {data.price} Kč
                </Text>
                {Array.isArray(data.description) ? (
                    <View key={data.name} style={{
                        gap: 4,
                        flexDirection: 'column',
                    }}>
                        {data.description.map((text, index) => (
                            <BulletPoint text={text} />
                        ))}
                    </View>
                ) : <Text style={styles.descriptionText}>{data.description}</Text>}
            </View>
            </>
        </TouchableRipple>
    )
}

const SelectPackage = ({ searchParams }) => {
    const [contentWidth, setContentWidth] = useState(0)
    const [selectedPackage, setSelectedPackage] = useState()

    const continueButtonRef = useRef()

    const navigate = useNavigate()

    const onContinuePress = () => {
        continueButtonRef.current.setIsLoading(true)

        navigate({
            pathname: '/credits/order/checkout',
            search: new URLSearchParams({...searchParams, package: selectedPackage}).toString()
        })

        continueButtonRef.current.setIsLoading(false)
    }

    const packageWidth = useMemo(() => calculatePackageWidth(contentWidth), [contentWidth])

    return (
        <View
            style={{
                paddingHorizontal: SPACING.medium,
                paddingVertical: SPACING.small,
                width: '100%',
            }}
        >
            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: FONT_SIZES.medium,
                    color: COLORS.grey300,
                    marginBottom: SPACING.medium,
                }}
            >
                Vyberte balíček dle počtu kreditů a ceny.
            </Text>

            <View
                onLayout={(event) => setContentWidth(event.nativeEvent.layout.width)}
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: PACKAGES_GAP
                }}
            >
                {contentWidth > 0 && PACKAGES.map((packageData, index) => (
                    <Package
                        key={packageData.id}
                        data={packageData}
                        packageWidth={packageWidth}
                        isSelected={selectedPackage === packageData.id}
                        setSelectedPackage={setSelectedPackage}
                    />
                ))}
            </View>

            <CustomButton
                ref={continueButtonRef}
                disabled={!selectedPackage}
                onPress={onContinuePress}
                textColor={COLORS.black}
                backgroundColors={COLORS.accent}
                buttonText='Pokračovat'
                additionalStyles={{ marginTop: SPACING.large,}}
                textStyles={{ fontFamily: FONTS.medium, fontSize: FONT_SIZES.large }}
            />
        </View>
    )
}

export default withSearchParams(SelectPackage, ['language'])

const styles = StyleSheet.create({
    descriptionText: {
        fontFamily: FONTS.regular,
        fontSize: FONT_SIZES.medium,
        color: COLORS.grey400
    }
})