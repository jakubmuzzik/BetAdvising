import React, { useState, useRef, useLayoutEffect, memo, useMemo } from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS } from '../constants'
import { ActivityIndicator } from 'react-native-paper'
import { normalize } from '../utils'
import { updateCurrentUserInRedux } from '../redux/actions/user'
import { connect } from 'react-redux'

import withSearchParams from '../components/hoc/withSearchParams'

import PersonalInformation from '../screens/app/account/PersonalInformation'
import EmailNotifications from '../screens/app/account/EmailNotifications'
import AccountSettings from '../screens/app/account/AccountSettings'

import VerifyAccountBanner from '../components/VerifyAccountBanner'

const Account = ({ currentUser, searchParams, currentAuthUser, toastRef, updateCurrentUserInRedux }) => {
    return (
        <View
            style={{
                width: normalize(800),
                maxWidth: '100%',
                alignSelf: 'center',
                paddingTop: SPACING.medium,
                paddingHorizontal: SPACING.medium,
            }}
        >
            <Text
                style={{
                    color: COLORS.white,
                    fontSize: FONT_SIZES.h2,
                    fontFamily: FONTS.medium,
                    marginTop: SPACING.large,
                    marginBottom: SPACING.xx_large
                }}
            >
                Účet
            </Text>

            {(!currentAuthUser.phone_confirmed_at) && <VerifyAccountBanner containerStyle={{
                marginBottom: SPACING.medium,
            }} />}

            <View
                style={{
                    gap: SPACING.medium,
                }}
            >
                <PersonalInformation currentUser={currentUser} toastRef={toastRef} updateCurrentUserInRedux={updateCurrentUserInRedux} />
                <EmailNotifications currentUser={currentUser} toastRef={toastRef} updateCurrentUserInRedux={updateCurrentUserInRedux} />
                <AccountSettings currentUser={currentUser} toastRef={toastRef} updateCurrentUserInRedux={updateCurrentUserInRedux} isVerified={!!currentAuthUser.phone_confirmed_at}/>
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    currentAuthUser: store.userState.currentAuthUser,
    toastRef: store.appState.toastRef,
})

export default connect(mapStateToProps, {updateCurrentUserInRedux})(withSearchParams(Account, ['language']))