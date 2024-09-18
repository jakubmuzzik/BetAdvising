import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { View, Text, useWindowDimensions, Dimensions } from 'react-native'
import { FONTS, FONT_SIZES, SPACING, COLORS, SUPPORTED_LANGUAGES } from '../../../constants'
import { normalize, stripEmptyParams, getParam } from '../../../utils'
import { MotiText, AnimatePresence, MotiView } from 'moti'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Image } from 'expo-image'
import { connect } from 'react-redux'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { supabase } from '../../../supabase/config'

import withSearchParams from '../../../components/hoc/withSearchParams'
import HoverableView from '../../../components/elements/HoverableView'

const Unlocked = ({ setTabHeight }) => {

    return (
        <View
            onLayout={(event) => setTabHeight(event.nativeEvent.layout.height)}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{ color: COLORS.white }}>Unlocked</Text>
        </View>
    )
}

export default withSearchParams(Unlocked, ['language'])