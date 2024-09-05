import React from 'react'
import { Text, View, useWindowDimensions, ScrollView, FlatList } from 'react-native'
import { COLORS, FONT_SIZES, FONTS, SPACING } from '../constants'
import { normalize } from '../utils'
import { Image } from 'expo-image'
import Package from './Package'

const Packages = () => {
    const { width } = useWindowDimensions()

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center'
        }}>
            <Image 
                source={require('../assets/images/arrow.png')}
                style={{
                    width: 250,
                    aspectRatio: 338 / 338,
                    height: width * 0.3,
                    position: 'absolute',
                    zIndex: 2,
                    top: -350,
                    left: '30%',
                    transform: [{ scaleX: -1 }]
                    //opacity: .7
                }}
                contentFit='contain'
            />
            {/* <Image
                source={require('../assets/images/blurred_glow_primary.png')}
                style={{
                    width: width * 0.3,
                    height: width * 0.3,
                    position: 'absolute',
                    //top: -120,
                    opacity: .7
                }}
                contentFit='contain'
            /> */}
            <Image
                source={require('../assets/images/dot_grid.png')}
                style={{
                    width: '100%',
                    height: width * 0.3,
                    position: 'absolute',
                    //top: -120,
                    opacity: .7
                }}
                contentFit='contain'
            />
            <View style={{
                paddingHorizontal: SPACING.page_horizontal,
                maxWidth: 1380
            }}>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.h1,
                        color: COLORS.white,
                        textAlign: 'center',
                        maxWidth: 500,
                        marginBottom: 10
                    }}
                >
                    Jaké balíčky nabízíme
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.light,
                        fontSize: FONT_SIZES.large,
                        color: COLORS.grey400,
                        lineHeight: FONT_SIZES.large * 1.5,
                        marginBottom: SPACING.large,
                        textAlign: 'center',
                    }}
                >
                    Vyberte si počet kreditů, za které poté můžete odemykat profesionální tipy.
                </Text>
            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[
                    { id: 1, name: 'Starter', coins: 10, price: 250, description: 'New or casual users who want to try out the service with minimal investment.' },
                    { id: 2, name: 'Basic', coins: 50, price: 350, description: 'Users who are somewhat familiar with the service and want more flexibility.' },
                    { id: 3, name: 'Standard', coins: 100, price: 550, description: 'Regular users who frequently use your betting tips.' },
                    { id: 4, name: 'Premium', coins: 200, price: 850, description: 'Serious bettors who are committed to using your service regularly and want the best value.' },
                    { id: 5, name: 'VIP', coins: 350, price: 999, description: 'High-volume users or professional bettors who want to maximize their use of the service.' },
                ]}                
                contentContainerStyle={{ paddingHorizontal: SPACING.page_horizontal, gap: SPACING.medium }}
                initialNumToRender={30}
                renderItem={({ item, index }) => (
                        <Package
                            key={item.id}
                            name={item.name}
                            coins={item.coins}
                            price={item.price}
                            description={item.description}
                        />
                )}
            />

            {/* <ScrollView
                horizontal  
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: SPACING.page_horizontal,
                    gap: SPACING.medium,
                    justifyContent: 'center',
                }}
            >
                <Package 
                    name='Starter'
                    coins={10}
                    price={250}
                    description='New or casual users who want to try out the service with minimal investment.'
                />
                <Package 
                    name='Basic'
                    coins={50}
                    price={350}
                    description='Users who are somewhat familiar with the service and want more flexibility.'
                />
                <Package 
                    name='Standard'
                    coins={100}
                    price={550}
                    description='Regular users who frequently use your betting tips.'
                />
                <Package 
                    name='Premium'
                    coins={200}
                    price={850}
                    description='Serious bettors who are committed to using your service regularly and want the best value.'
                />
                <Package 
                    name='VIP'
                    coins={350}
                    price={999}
                    description='High-volume users or professional bettors who want to maximize their use of the service.'
                />
            </ScrollView> */}
        </View>
    )
}

export default Packages