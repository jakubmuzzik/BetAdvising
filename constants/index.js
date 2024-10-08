import { Dimensions } from 'react-native'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

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

export const SMALL_SCREEN_THRESHOLD_APP_HEADER = 700

export const HEADER_HEIGHT = normalizeSize(60, 60, 60)
export const SIDEBAR_WIDTH = normalizeSize(230, 230, 230)

export const COLORS = {
    accent: '#FBC10D',
    accent2: '#957308',
    hoveredAccent: '#D8A30B',
    primary: '#0D131A',//'#131C27',
    hoveredPrimary: '#1f2937',
    secondary: '#191f26',
    secondary2: '#1f2832',
    hoveredSecondary: '#2b3745',
    hoveredSecondary2: '#2b3745',
    lightGrey: '#323232',
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
    red: '#f95a50',
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
    xx_large: normalizeSize(24, 24, 24),
    h1: normalizeSize(30, 34, 38),
    h2: normalizeSize(28, 28, 32),
    h3: normalizeSize(20, 20, 26),
    heroHeading: normalizeSize(40, 45, 50),
}

export const SPACING = {
    xxx_small: normalizeSize(6, 8, 8),
    xx_small: normalizeSize(10, 12, 12),
    x_small: normalizeSize(14, 16, 16),
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

export const renderSportIcon = (sport) => {
    switch (sport) {
        case 'Fotbal':
            return <Ionicons name="football" size={20} color="white" />
        case 'Basketbal':
            return <Ionicons name="basketball" size={20} color="white" />
        case 'Házená':
            return <MaterialIcons name="sports-handball" size={20} color="white" />
        case 'Volejbal':
            return <MaterialIcons name="sports-volleyball" size={20} color="white" />
        case 'Tenis':
            return <Ionicons name="tennisball" size={20} color="white" />
        case 'Stolní tenis':
            return <MaterialCommunityIcons name="table-tennis" size={20} color="white" />
        case 'Badminton':
            return <MaterialCommunityIcons name="badminton" size={20} color="white" />
        case 'Hokej':
            return <MaterialCommunityIcons name="hockey-puck" size={20} color="white" />
        default:
            return undefined
    }
}

export const SPORTS = [
    {label: 'Fotbal', icon: renderSportIcon('Fotbal')},
    {label: 'Basketbal', icon: renderSportIcon('Basketbal')},
    {label: 'Házená', icon: renderSportIcon('Házená')},
    {label: 'Volejbal', icon: renderSportIcon('Volejbal')},
    {label: 'Tenis', icon: renderSportIcon('Tenis')},
    {label: 'Stolní tenis', icon: renderSportIcon('Stolní tenis')},
    {label: 'Badminton', icon: renderSportIcon('Badminton')},
    {label: 'Hokej', icon: renderSportIcon('Hokej')}
]

export const API_RETRY_LIMIT = 3

export const PACKAGES = [
    { id: 'starter', name: 'Starter', coins: 10, price: 250, description: 'New or casual users who want to try out the service with minimal investment.' },
    { id: 'basic', name: 'Basic', coins: 50, price: 350, description: 'Users who are somewhat familiar with the service and want more flexibility.' },
    { id: 'standard', name: 'Standard', coins: 100, price: 550, description: 'Regular users who frequently use your betting tips.' },
    { id: 'premium', name: 'Premium', coins: 200, price: 850, description: 'Serious bettors who are committed to using your service regularly and want the best value.' },
    { id: 'vip', name: 'VIP', coins: 350, price: 999, description: 'High-volume users or professional bettors who want to maximize their use of the service.' },
]

//SEARCH PARAMS
export const LANGUAGE = 'language'
export const PACKAGE = 'package'
export const STATUS = 'status'

export const SEARCH_PARAMS = [
    LANGUAGE, 
    PACKAGE, 
    STATUS
]