import { memo } from 'react'
import { Text } from 'react-native'
import { Link } from 'react-router-dom'
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../../constants'

import HoverableView from './HoverableView'

const HoverableLinkButton = ({ 
    searchParams, 
    primary=false, 
    secondary=true, 
    pathname, 
    linkStyles={}, 
    buttonStyles={}, 
    withArrow=true, 
    arrowColor=COLORS.accent, 
    buttonText 
}) => {

    return (
        <Link
            style={{
                textDecoration: 'none',
                ...linkStyles
            }}
            to={{ pathname, search: new URLSearchParams(searchParams).toString() }}
        >
            <HoverableView
                hoveredBackgroundColor={COLORS.accentHoveredSecondary}
                backgroundColor={COLORS.accentSecondary}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    width: 'fit-content',
                    //boxShadow: '0px 0px 14px rgba(251, 193, 13, 0.35)',
                    paddingHorizontal: SPACING.x_small,
                    paddingVertical: SPACING.xx_small,
                    borderWidth: 1,
                    borderColor: COLORS.accentSecondaryBorder,
                    ...buttonStyles
                }}
                withCustomButtonHeight
                withHoverableArrow={withArrow}
                arrowColor={arrowColor}
            >
                <Text
                    style={{
                        color: COLORS.accent,
                        fontFamily: FONTS.medium,
                        fontSize: FONT_SIZES.large
                    }}
                >
                    {buttonText}
                </Text>
            </HoverableView>
        </Link>
    )
}

export default memo(HoverableLinkButton)