import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../../../constants'
import { normalize, getEventDate, getEventTime } from '../../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import ContentLoader, { Rect } from "react-content-loader/native"
import Animated, { FlipInEasyX } from 'react-native-reanimated'
import { Image } from 'expo-image'
import { ActivityIndicator } from 'react-native-paper'

import withSearchParams from '../../../components/hoc/withSearchParams'

import UnlockedTicket from '../../../components/tickets/UnlockedTicket'
import { connect } from 'react-redux'
import { fetchUnlockedTickets } from '../../../redux/actions/user'
import { MAX_UNLOCKED_ROWS_PER_QUERY } from '../../../redux/actions/user'

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

const TimeStamp = ({ createdDate, isSmallScreen, width, onTimeLeftLayout = () => { } }) => {

    return (
        <View
        style={width != null ? { width, alignItems: isSmallScreen ? 'flex-start' : 'flex-end' } : { alignItems: isSmallScreen ? 'flex-start' : 'flex-end' }}
        >
            <View
                onLayout={(event) => onTimeLeftLayout(event)}
                style={{
                    position: isSmallScreen ? 'relative' : 'absolute',
                    flexDirection: 'column',
                    width: 'max-content'
                }}
            >
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.medium,
                        color: COLORS.grey400
                    }}
                >
                    Odemčeno:
                </Text>
                <Text
                    style={{
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.x_large,
                        color: COLORS.white,
                        marginTop: 4
                    }}
                >
                    {getEventDate(createdDate, false, true)}, {getEventTime(createdDate)}
                </Text>
            </View>
        </View>
    )
}

const Divider = ({ isLast, result }) => {
    const [contentHeight, setContentHeight] = useState(0)

    return (
        <View onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)} >
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
                {
                    result === 'lose' ? <Image
                        source={require('../../../assets/images/ErrorIcon.png')}
                        style={{
                            width: 18,
                            height: 18
                        }}
                        contentFit="contain"
                    />
                        : result === 'win' ? <Image
                            source={require('../../../assets/images/SuccessIcon.png')}
                            style={{
                                width: 18,
                                height: 18
                            }}
                            contentFit="contain"
                        />
                            : <MaterialIcons name="question-mark" size={18} color={COLORS.white} />
                }
            </LinearGradient>
            {!isLast && <LinearGradient
                colors={[COLORS.whiteBackground2, COLORS.whiteBackground2, COLORS.whiteBackground2]}
                style={{
                    width: 1,
                    position: 'absolute',
                    //top: -20,
                    left: 17.5,
                    height: contentHeight + GAP,
                }}
            />}
        </View>
    )
}

const Unlocked = ({ searchParams, setTabHeight, fetchUnlockedTickets, unlocked }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < 700

    const currentWidestTimeLeft = useRef(0)
    const allTicketsLoaded = useRef(false)

    const [timeLeftWidth, setTimeLeftWidth] = useState()
    const [refreshing, setRefreshing] = useState(false)

    const onTimeLeftLayout = (event, index) => {
        const { width } = event.nativeEvent.layout

        if (width > currentWidestTimeLeft.current) {
            currentWidestTimeLeft.current = width
        }

        if (index === unlocked.length - 1) {
            setTimeLeftWidth(currentWidestTimeLeft.current)
        }
    }

    useEffect(() => {
        if (unlocked == null) {
            fetchUnlockedTickets()
        }
    }, [
        unlocked
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
    }, [unlocked])

    const onEndReached = async () => {
        if (allTicketsLoaded.current || unlocked == null || refreshing || unlocked.length < MAX_UNLOCKED_ROWS_PER_QUERY) {
            return
        }

        setRefreshing(true)
        const newUnlockedTickets = await fetchUnlockedTickets()
        if (newUnlockedTickets == null || newOffers?.length === 0) {
            allTicketsLoaded.current = true
        }
        setRefreshing(false)
    }

    const renderItem = (item, index) => (
        <View
            key={item.id}
            style={{
                flexDirection: 'row',
                gap: SPACING.small
            }}
        >
            {!isSmallScreen && <TimeStamp isSmallScreen={isSmallScreen} createdDate={item.created_date} onTimeLeftLayout={(event) => onTimeLeftLayout(event, index)} width={timeLeftWidth} />}

            <Divider
                isLast={index === unlocked.length - 1}
                result={
                    item.ticket.result
                }
            />

            <View
                style={{
                    gap: SPACING.medium,
                    flex: 1
                }}
            >
                {isSmallScreen && <TimeStamp isSmallScreen={isSmallScreen} createdDate={item.created_date} />}
                <UnlockedTicket
                    ticket={item.ticket}
                    isLast={index === unlocked.length - 1}
                />
            </View>
        </View>
    )

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
                {unlocked == null && renderSkeleton()}
                {unlocked != null && unlocked.map((item, index) => renderItem(item, index))}
            </View>

            {unlocked != null && unlocked.length === 0 && !refreshing && (
                <Animated.Text entering={FlipInEasyX} style={{ textAlign: 'center', fontFamily: FONTS.medium, color: COLORS.grey400, fontSize: FONT_SIZES.x_large, }}>
                   You haven't unlocked any tickets yet.
                </Animated.Text>
            )}

            {refreshing && <ActivityIndicator color={COLORS.accent} />}
        </View>
    )
}

const mapStateToProps = (store) => ({
    unlocked: store.userState.unlocked
})

export default connect(mapStateToProps, { fetchUnlockedTickets })(withSearchParams(Unlocked, ['language']))