import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, useWindowDimensions, StyleSheet, FlatList } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING, PACKAGES } from '../constants'
import { normalize } from '../utils'
import { Image } from 'expo-image'
import Package from './Package'
import { LinearGradient } from 'expo-linear-gradient'
import withSearchParams from './hoc/withSearchParams'
import { isBrowser } from 'react-device-detect'

import VanillaTilt from 'vanilla-tilt'
import { ScrollView } from 'react-native-gesture-handler'


const Packages = ({ searchParams }) => {
    const { width } = useWindowDimensions()

    useEffect(() => {
        if (!isBrowser) return

        VanillaTilt.init(document.querySelectorAll(`[data-id="package"]`), {
          max: 0,
          speed: 200,
          easing: "cubic-bezier(.03,.98,.52,.99)",
          reverse: true,
          glare: true,
          "max-glare": 0.1,
          //scale: 1.02,
        })
      }, [])

    return (
        <View
            dataSet={{ id: 'packages' }}
            style={{
                width: '100%',
                marginTop: normalize(190)
            }}
        >
            {width < 1230 ? (
                <LinearGradient
                    colors={[COLORS.primary, 'rgba(255,255,255,.05)', COLORS.primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        position: 'absolute',
                        width: width - SPACING.page_horizontal * 1.5,
                        maxWidth: 1180,
                        left: 0,
                        right: 0,
                        margin: 'auto',
                        height: 300,
                        top: -30,
                        //borderTopWidth: 1,
                        borderColor: COLORS.grey400,
                    }}
                >
                    <LinearGradient
                        colors={['rgba(255,255,255,0)', COLORS.grey400, 'rgba(255,255,255,.0)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            height: 1
                        }}
                    />
                    <LinearGradient
                        colors={['rgba(255,255,255,0)', COLORS.primary]}
                        style={{ position: 'absolute', bottom: 0, height: 100, right: 0, left: 0 }}
                        locations={[0, 0.75]}
                    />
                </LinearGradient>
            ) : (
                <Image
                    source={require('../assets/images/dot_grid.svg')}
                    style={{
                        width,
                        aspectRatio: 1824 / 623,
                        maxWidth: 1380,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        margin: 'auto',
                        //height: 200 * 1.4,
                        position: 'absolute',
                        //top: -120,
                        opacity: .8
                    }}
                    contentFit='contain'
                />
            )}
            
            <Image
                source={require('../assets/images/arrow.png')}
                style={{
                    //width: 250,
                    aspectRatio: 338 / 338,
                    height: width * 0.3,
                    minHeight: 300,
                    maxHeight: 350,
                    position: 'absolute',
                    zIndex: 2,
                    top: -350,
                    left: width < 500 ? '0%' : width < 1000 ? '10%' : '30%',
                    transform: [{ scaleX: -1 }]
                    //opacity: .7
                }}
                contentFit='contain'
            />
            <View style={{
                paddingHorizontal: SPACING.page_horizontal,
                maxWidth: 1380,
                alignItems: 'center',
                margin: 'auto'
            }}>
                <span
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.h1,
                        color: COLORS.white,
                        textAlign: 'center',
                        maxWidth: 500,
                        marginBottom: 10,
                        background: `linear-gradient(180deg, ${COLORS.white}, rgba(255, 255, 255, 0.7))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Jaké balíčky nabízíme?
                </span>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.grey400,
                        lineHeight: FONT_SIZES.large * 1.5,
                        textAlign: 'center',
                    }}
                >
                    Vyberte si počet kreditů, za které můžete odemykat naše sázkové tipy.
                </Text>
            </View>

            {/* <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={width > 1500 ? {
                    margin: 'auto',
                } : {}}
                data={PACKAGES}
                contentContainerStyle={{ paddingHorizontal: SPACING.page_horizontal, gap: SPACING.medium, paddingVertical: 2 }}
                initialNumToRender={30}
                renderItem={({ item, index }) => (
                    <Package
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        credits={item.credits}
                        price={item.price}
                        description={item.description}
                        searchParams={searchParams}
                    />
                )}
            /> */}

            <ScrollView
                horizontal  
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: SPACING.page_horizontal,
                    paddingVertical: SPACING.large,
                    gap: SPACING.medium,
                    justifyContent: 'center',
                }}
                style={width > 1500 ? {
                    margin: 'auto',
                } : {}}
            >
                {
                    PACKAGES.map((item, index) => (
                <Package 
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            credits={item.credits}
                            price={item.price}
                            description={item.description}
                            discount={item.discount}
                            searchParams={searchParams}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default withSearchParams(Packages, ['language'])