import React, { useState, useEffect, useRef, memo } from 'react'
import { View, Text, useWindowDimensions, FlatList, StyleSheet } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../../../constants'
import { normalize } from '../../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import ContentLoader, { Rect } from "react-content-loader/native"
import { MAX_OFFER_ROWS_PER_QUERY } from '../../../redux/actions/user'
import Animated, { FlipInEasyX } from 'react-native-reanimated'

import withSearchParams from '../../../components/hoc/withSearchParams'

import { connect } from 'react-redux'
import { fetchOffers } from '../../../redux/actions/user'
import { ActivityIndicator } from 'react-native-paper'

import FlippableTicket from './FlippableTicket'

const GAP = normalize(60)

const Skeleton = ({ timeLeftWidth, isSmallScreen }) => (
    <View
        style={{
            flexDirection: 'row',
            gap: SPACING.small,
            width: 850,
            maxWidth: '100%',
            alignSelf: 'center',
        }}
    >
        {!isSmallScreen && <ContentLoader
            speed={2}
            height={50}
            width={timeLeftWidth ?? 150}
            style={{ borderRadius: 10 }}
            backgroundColor={COLORS.secondary}
            foregroundColor={COLORS.secondary2}
        >
            <Rect x="0" y="0" rx="0" ry="0" width="100%" height={50} />
        </ContentLoader>}

        <View>
            <LinearGradient
                colors={[COLORS.secondary, COLORS.secondary2]}
                style={{
                    borderRadius: 17.5,
                    width: 35,
                    height: 35,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2
                }}
            >
                <FontAwesome name="lock" size={18} color={COLORS.white} />
            </LinearGradient>
            <LinearGradient
                colors={[COLORS.whiteBackground2, COLORS.whiteBackground2, COLORS.whiteBackground2]}
                style={{
                    width: 1,
                    position: 'absolute',
                    //top: -20,
                    left: 17.5,
                    height: 400 + GAP,
                }}
            />
        </View>

        <ContentLoader
            speed={2}
            height={400}
            //width={750}
            style={{ borderRadius: 10, alignSelf: 'center', flexGrow: 1 }}
            backgroundColor={COLORS.secondary}
            foregroundColor={COLORS.secondary2}
        >
            <Rect x="0" y="0" rx="0" ry="0" width={850} height={400} />
        </ContentLoader>
    </View>
)

const Offers = ({ searchParams, setTabHeight, fetchOffers, offers }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < 700

    const currentWidestTimeLeft = useRef(0)
    const allTicketsLoaded = useRef(false)

    const [timeLeftWidth, setTimeLeftWidth] = useState()
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (offers == null) {
            fetchOffers()
        }
    }, [
        offers
    ])

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight

            if (scrollPosition >= document.body.scrollHeight) {
                onEndReached()
            }
        }

        document.addEventListener("scroll", handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [offers])

    const onEndReached = async () => {
        if (allTicketsLoaded.current || offers == null || refreshing || offers.length < MAX_OFFER_ROWS_PER_QUERY) {
            return
        }

        setRefreshing(true)
        const newOffers = await fetchOffers()
        if (newOffers == null || newOffers?.length === 0) {
            allTicketsLoaded.current = true
        }
        setRefreshing(false)
    }

    const onTimeLeftLayout = (event, index) => {
        const { width } = event.nativeEvent.layout

        if (width > currentWidestTimeLeft.current) {
            currentWidestTimeLeft.current = width
        }

        if (index === offers.length - 1) {
            setTimeLeftWidth(currentWidestTimeLeft.current)
        }
    }

    const renderSkeleton = () => new Array(10).fill(null, 0).map((_, index) => <Skeleton key={index} timeLeftWidth={timeLeftWidth} isSmallScreen={isSmallScreen} />)

    return (
        <View
            onLayout={(event) => setTabHeight(event.nativeEvent.layout.height)}
            style={{
                width: 850,
                maxWidth: '100%',
                alignSelf: 'center',
                //paddingHorizontal: SPACING.medium,
                paddingTop: SPACING.xx_large,
                backgroundColor: COLORS.primary,
                gap: GAP
                //alignItems: 'center',
            }}
        >
            <View
                style={{ 
                    gap: GAP
                }}
            >
                {offers == null && renderSkeleton()}
                {offers != null && offers.map((offer, index) => <FlippableTicket key={offer.id} searchParams={searchParams} isLast={index === offers.length - 1} offer={offer} isSmallScreen={isSmallScreen} onTimeLeftLayout={onTimeLeftLayout} timeLeftWidth={timeLeftWidth} index={index} />)}
            </View>

            {offers != null && offers.length === 0 && !refreshing && (
                <Animated.Text entering={FlipInEasyX} style={{ textAlign: 'center', fontFamily: FONTS.medium, color: COLORS.grey400, fontSize: FONT_SIZES.x_large, }}>
                    No offers at the moment
                </Animated.Text>
            )}

            {refreshing && <ActivityIndicator color={COLORS.accent} />}
        </View>
    )
}

const mapStateToProps = (store) => ({
    offers: store.userState.offers
})

export default connect(mapStateToProps, { fetchOffers })(withSearchParams(Offers, ['language']))


const styles = StyleSheet.create({
    regularCard: {
        zIndex: 1,
        overflow: 'hidden',
        flexGrow: 1
    },
    flippedCard: {
        position: 'absolute',
        backfaceVisibility: 'hidden',
        zIndex: 2,
        overflow: 'hidden'
    },
})