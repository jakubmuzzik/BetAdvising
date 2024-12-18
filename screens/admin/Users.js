import React, { useState, useEffect, useRef } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../../constants'
import { normalize, getEventDate } from '../../utils'
import { fetchUsers } from '../../redux/actions/admin'
import { ActivityIndicator } from 'react-native-paper'
import Animated, { FlipInEasyX } from 'react-native-reanimated'
import { MAX_USER_ROWS_PER_QUERY } from '../../redux/actions/admin'
import ContentLoader, { Rect } from "react-content-loader/native"
import HoverableView from '../../components/elements/HoverableView'

import { connect } from 'react-redux'
import withSearchParams from '../../components/hoc/withSearchParams'

const GAP = SPACING.x_small

const Skeleton = () => (
    <ContentLoader
        speed={2}
        height={70}
        width={'100%'}
        style={{ borderRadius: 10, alignSelf: 'center' }}
        backgroundColor={COLORS.secondary}
        foregroundColor={COLORS.secondary2}
    >
        <Rect x="0" y="0" rx="0" ry="0" width="100%" height={70} />
    </ContentLoader>
)

const User = ({ user }) => {

    return (
        <>
            <HoverableView
                style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    borderRadius: 10,
                }}
                backgroundColor={COLORS.secondary}
                hoveredBackgroundColor={COLORS.secondary2}
            >
                <>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                color: COLORS.grey400,
                                fontFamily: FONTS.regular,
                                fontSize: FONT_SIZES.medium
                            }}
                        >
                            {getEventDate(user.created_date, false, true)}
                        </Text>

                        <Text
                            style={{
                                paddingTop: 8,
                                fontFamily: FONTS.medium,
                                fontSize: FONT_SIZES.large,
                                color: COLORS.grey100
                            }}
                        >
                            {user.name}
                        </Text>
                        <Text
                            style={{
                                paddingTop: 8,
                                fontFamily: FONTS.regular,
                                fontSize: FONT_SIZES.large,
                                color: COLORS.grey400
                            }}
                        >
                            {user.email}
                        </Text>
                    </View>
                </>
            </HoverableView>
        </>
    )
}

const Users = ({ fetchUsers, setTabHeight, users, searchParams, offsetX, closeOpenTicketInRedux, updateTicketEntryInRedux }) => {
    const { width } = useWindowDimensions()

    const isSmallScreen = width < 700

    const allUsersLoaded = useRef(false)

    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (users == null) {
            fetchUsers()
        }
    }, [
        users
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
    }, [users])

    const onEndReached = async () => {
        if (allUsersLoaded.current || users == null || refreshing || users.length < MAX_USER_ROWS_PER_QUERY) {
            return
        }

        setRefreshing(true)
        const newUsers = await fetchUsers()
        if (newUsers == null || newUsers?.length === 0) {
            allUsersLoaded.current = true
        }
        setRefreshing(false)
    }

    const renderSkeleton = () => new Array(10).fill(null, 0).map((_, index) => <Skeleton key={index} />)

    return (
        <View
            onLayout={(event) => setTabHeight(event.nativeEvent.layout.height)}
            style={{
                width: normalize(800),
                maxWidth: '100%',
                alignSelf: 'center',
                //paddingHorizontal: SPACING.medium,
                paddingTop: SPACING.xx_large,
                backgroundColor: COLORS.primary,
                //alignItems: 'center',
            }}
        >
            <View
                style={{
                    gap: GAP
                }}
            >
                {users == null && renderSkeleton()}
                {users != null && users.map((user) => <User key={user.id} user={user} />)}
            </View>

            {users != null && users.length === 0 && !refreshing && (
                <Animated.Text entering={FlipInEasyX} style={{ textAlign: 'center', fontFamily: FONTS.medium, color: COLORS.grey400, fontSize: FONT_SIZES.xx_large, }}>
                    Žádní uživatelé
                </Animated.Text>
            )}

            {refreshing && <ActivityIndicator color={COLORS.accent} />}
        </View>
    )
}

const mapStateToProps = (store) => ({
    users: store.adminState.users
})

export default connect(mapStateToProps, { fetchUsers })(withSearchParams(Users, ['language']))