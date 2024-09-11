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

export const CUSTOM_BUTTON_HEIGHT = normalizeSize(40, 40, 40)

export const COLORS = {
    accent: '#FBC10D',
    hoveredAccent: '#D8A30B',
    primary: '#0D131A',//'#131C27',
    hoveredPrimary: '#1f2937',
    secondary: '#191f26',
    secondary2: '#1f2832',
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
    black: '#000',
    error: '#ff190c',
    errorBackground: 'rgba(255, 25, 12, .1)',
    whiteBackground: 'rgba(255,255,255,.1)',
    whiteBackground2: 'rgba(255,255,255,.2)',
    whiteBackground3: 'rgba(255,255,255,.3)',
    whiteBackground4: 'rgba(255,255,255,.4)',
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
    x_small: normalizeSize(10, 10, 10),
    small: normalizeSize(12, 12, 12), //span
    medium: normalizeSize(14, 14, 14), //base
    large: normalizeSize(16, 16, 16), //paragraph
    x_large: normalizeSize(20, 20, 20),
    h1: normalizeSize(30, 34, 38),
    h2: normalizeSize(32, 32, 36),
    h3: normalizeSize(20, 20, 26),
    heroHeading: normalizeSize(40, 45, 50),
}

export const SPACING = {
    xxx_small: normalizeSize(4, 8, 8),
    xx_small: normalizeSize(8, 12, 12),
    x_small: normalizeSize(12, 16, 16),
    small:normalizeSize(16, 20, 20),
    medium: normalizeSize(20, 24, 24),
    large: normalizeSize(24, 28, 28),
    x_large: normalizeSize(28, 32, 32),
    xx_large: normalizeSize(32, 36, 36),
    xxx_large: normalizeSize(36, 40, 40),
    xxxx_large: normalizeSize(44, 48, 48),
    xxxxx_large: normalizeSize(56, 60, 60),
    page_horizontal: normalizeSize(24, 40, 80)
}