import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { View, Text, useWindowDimensions, Dimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../../constants'
import { normalize, stripEmptyParams, getParam } from '../../utils'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import ContentLoader, { Rect } from "react-content-loader/native"
import { TouchableRipple } from 'react-native-paper'

import { fetchClosedTicketsCount, fetchOpenTicketsCount } from '../../redux/actions/admin'

import { supabase } from '../../supabase/config'

import withSearchParams from '../../components/hoc/withSearchParams'

const AdminDashboard = ({
    toastRef,
    openTicketsCount,
    closedTicketsCount,
    fetchClosedTicketsCount, 
    fetchOpenTicketsCount,
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
    }, [
        openTicketsCount,
        closedTicketsCount
    ])

    const onDataCountCardPress = (pathToNavigate) => {
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
            borderColor: COLORS.whiteBackground2
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
                {renderNewDataCard(openTicketsCount, 'Open Tickets', '/admin/open-tickets', SPACING.xx_small, <MaterialIcons name="timelapse" size={25} color="white" />)}
                {renderNewDataCard(closedTicketsCount, 'Closed Tickets', '/admin/closed-tickets', 0, <MaterialIcons name="check-circle" size={25} color={COLORS.white} />)}
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    toastRef: store.appState.toastRef,
    openTicketsCount: store.adminState.openTicketsCount,
    closedTicketsCount: store.adminState.closedTicketsCount
})

export default connect(mapStateToProps, { fetchClosedTicketsCount, fetchOpenTicketsCount })(withSearchParams(AdminDashboard, ['language']))