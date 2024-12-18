import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { View, Text, useWindowDimensions, Dimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../../constants'
import { normalize, stripEmptyParams, getParam } from '../../utils'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { MaterialIcons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import ContentLoader, { Rect } from "react-content-loader/native"
import { TouchableRipple } from 'react-native-paper'

import { 
    fetchClosedTicketsCount, 
    fetchOpenTicketsCount, 
    fetchUsersCount, 
    fetchTransactionsCount 
} from '../../redux/actions/admin'

import withSearchParams from '../../components/hoc/withSearchParams'

const AdminDashboard = ({
    toastRef,
    openTicketsCount,
    closedTicketsCount,
    fetchClosedTicketsCount, 
    fetchOpenTicketsCount,
    fetchUsersCount, 
    fetchTransactionsCount,
    usersCount,
    transactionsCount,
    searchParams
}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (openTicketsCount == null) {
            fetchOpenTicketsCount()
        }

        if (closedTicketsCount == null) {
            fetchClosedTicketsCount()
        }

        if (usersCount == null) {
            fetchUsersCount()
        }

        if (transactionsCount == null) {
            fetchTransactionsCount()
        }
    }, [
        openTicketsCount,
        closedTicketsCount,
        usersCount,
        transactionsCount
    ])

    const onDataCountCardPress = (pathToNavigate) => {
        if (pathToNavigate == null) {
            return
        }

        navigate({
            pathname: pathToNavigate,
            search: new URLSearchParams(searchParams).toString()
        })
    }

    const renderNewDataCard = (dataCount, title, pathToNavigate, marginRight, icon) => (
        <TouchableRipple style={{
            flex: 1,
            marginRight: marginRight,
            flexDirection: 'column',
            padding: SPACING.x_small,
            borderRadius: 10,
            backgroundColor: COLORS.secondary,
            borderWidth: 1,
            borderColor: COLORS.whiteBackground2,
            cursor: pathToNavigate == null ? 'default' : 'pointer'
        }}
            onPress={() => onDataCountCardPress(pathToNavigate)}
            rippleColor='rgba(251, 193, 13, 0.1)'
        >
            <>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.small }}>
                    <Text style={{ color: COLORS.white, fontFamily: FONTS.medium, fontSize: FONT_SIZES.large }}>
                        {title}
                    </Text>
                    {icon}
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', flexShrink: 1 }}>
                    {dataCount === null && <ContentLoader
                        speed={2}
                        height={FONT_SIZES.large}
                        width={20}
                        style={{ borderRadius: 5 }}
                        backgroundColor={COLORS.grey}
                        foregroundColor={COLORS.lightGrey}
                    >
                        <Rect x="0" y="0" rx="0" ry="0" width="100%" height={FONT_SIZES.large} />
                    </ContentLoader>}

                    {dataCount !== null && (
                        <Text
                            style={{ fontFamily: FONTS.bold, color: dataCount > 0 ? COLORS.accent : COLORS.white, fontSize: FONT_SIZES.h3 }}
                        >
                            {dataCount}
                        </Text>
                    )}
                </View>
            </>

        </TouchableRipple>
    )

    return (
        <View style={{ width: normalize(800), maxWidth: '100%', alignSelf: 'center', paddingHorizontal: SPACING.medium }}>
            <View style={{ flexDirection: 'row', marginBottom: SPACING.xx_small }}>
                {renderNewDataCard(openTicketsCount, 'Otevřené tikety', '/admin/open-tickets', SPACING.xx_small, <MaterialIcons name="timelapse" size={25} color="white" />)}
                {renderNewDataCard(closedTicketsCount, 'Uzavřené tikety', '/admin/closed-tickets', 0, <MaterialIcons name="check-circle" size={25} color={COLORS.white} />)}
            </View>
            <View style={{ flexDirection: 'row', marginBottom: SPACING.xx_small }}>
                {renderNewDataCard(usersCount, 'Uživatelé', '/admin/users', SPACING.xx_small, <FontAwesome5 name="user-friends" size={20} color="white" />)}
                {renderNewDataCard(transactionsCount, 'Počet zakoupení', null, 0, <FontAwesome6 name="money-check-dollar" size={25} color="white" />)}
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef,
    openTicketsCount: store.adminState.openTicketsCount,
    closedTicketsCount: store.adminState.closedTicketsCount,
    usersCount: store.adminState.usersCount,
    transactionsCount: store.adminState.transactionsCount
})

export default connect(
    mapStateToProps, { 
    fetchClosedTicketsCount, 
    fetchOpenTicketsCount,
    fetchUsersCount, 
    fetchTransactionsCount 
})(withSearchParams(AdminDashboard, ['language']))