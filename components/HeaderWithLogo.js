import React from 'react'
import withSearchParams from './hoc/withSearchParams'
import { View } from 'react-native'
import { Image } from 'expo-image'
import { Link } from 'react-router-dom'
import { COLORS, SPACING, HEADER_HEIGHT } from '../constants'
import { normalize } from '../utils'

const HeaderWithLogo = ({ searchParams }) => {

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
                        source={require('../assets/logos/TipStrike.svg')}
                        style={{
                            aspectRatio:853.76/322.77,
                            height: HEADER_HEIGHT / 1.6
                        }}
                    />
                </Link>
            </View>
        </>
    )
}

export default withSearchParams(HeaderWithLogo, ['language'])