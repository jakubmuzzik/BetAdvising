import { Dimensions } from 'react-native'

const {
  width: SCREEN_WIDTH
} = Dimensions.get('window')

export const LARGE_SCREEN_THRESHOLD = 960
export const SMALL_SCREEN_THRESHOLD = 640

export const isLargeScreen = SCREEN_WIDTH >= LARGE_SCREEN_THRESHOLD
export const isMediumScreen = SCREEN_WIDTH >= SMALL_SCREEN_THRESHOLD && SCREEN_WIDTH < LARGE_SCREEN_THRESHOLD
export const isSmallScreen = SCREEN_WIDTH < SMALL_SCREEN_THRESHOLD

export const SUPPORTED_LANGUAGES = [
    'en',
    'cs'
]

const normalizeSize = (forSmallScreenSize, forMediumScreenSize, forLargeScreenSize) => {
    return isLargeScreen ? forLargeScreenSize : isMediumScreen ? forMediumScreenSize : forSmallScreenSize
}

export const COLORS = {
    accent: '#FBC10D',
    hoveredAccent: '#D8A30B',
    primary: '#0D131A',//'#131C27',
    hoveredPrimary: '#1f2937',
    grey: '#6b6e7b',
    grey50: '#f9fafb',
    grey100: '#f3f4f6',
    grey200: '#e5e7eb',
    grey300: '#d1d5db',
    grey400: '#9ca3af',
    grey500: '#6b7280',
    grey600: '#4b5563',
    grey700: '#374151',
    grey800: '#1f2937',
    grey900: '#111827',
    grey950: '#030712',
    error: '#ff190c',
    errorBackground: 'rgba(255, 25, 12, .1)',
    whiteBackground: 'rgba(255,255,255,.1)',
    white: '#FFF'
}

export const FONTS = {
    extraBold: 'Roboto-Black',
    bold: 'Roboto-Bold',
    medium: 'Roboto-Medium',
    regular: 'Roboto-Regular',
    light: 'Roboto-Light'

   /* black : 'Inter-Black',
    extraBold : 'Inter-ExtraBold',
    bold :  'Inter-Bold',
    medium : 'Inter-Medium',
    regular : 'Inter-Regular',
    light : 'Inter-Light',
    thin : 'Inter-Thin'*/
}

export const FONT_SIZES = {
    x_small: normalizeSize(8, 8, 10),
    small: normalizeSize(10, 10, 12), //span
    medium: normalizeSize(12, 12, 14), //base
    large: normalizeSize(14, 14, 16), //paragraph
    x_large: normalizeSize(18, 18, 20),
    h1: normalizeSize(30, 34, 38),
    h2: normalizeSize(32, 32, 36),
    h3: normalizeSize(20, 20, 26),
    heroHeading: normalizeSize(40, 45, 50),
}

export const SPACING = {
    xxx_small: normalizeSize(4, 6, 6),
    xx_small: normalizeSize(8, 10, 10),
    x_small: normalizeSize(11, 15, 15),
    small:normalizeSize(15, 20, 20),
    medium: normalizeSize(20, 25, 25),
    large: normalizeSize(25, 30, 30),
    x_large: normalizeSize(30, 35, 35),
    xx_large: normalizeSize(35, 40, 40),
    xxx_large: normalizeSize(40, 45, 45),
    xxxx_large: normalizeSize(45, 50, 50),
    xxxxx_large: normalizeSize(55, 60, 60),
    page_horizontal: normalizeSize(24, 40, 80)
}