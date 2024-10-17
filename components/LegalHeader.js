import React from 'react'
import withSearchParams from './hoc/withSearchParams'
import { View } from 'react-native'
import { Image } from 'expo-image'
import { Link } from 'react-router-dom'
import { COLORS, SPACING, HEADER_HEIGHT } from '../constants'
import { normalize } from '../utils'

const LegalHeader = ({ searchParams }) => {

    return (
        <>
            <View style={{
                height: HEADER_HEIGHT,
                width: '100%',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: SPACING.page_horizontal,
            }}>
                <Link
                    style={{ width: normalize(80) }}
                    to={{ pathname: '/', search: new URLSearchParams(searchParams).toString() }}
                >
                    <Image
                        contentFit='contain'
                        source={require('../assets/logos/logo-header.png')}
                        style={{
                            width: normalize(80),
                            aspectRatio: 773 / 320
                        }}
                        tintColor={COLORS.accent}
                    />
                </Link>
            </View>
        </>
    )
}

export default withSearchParams(LegalHeader, ['language'])