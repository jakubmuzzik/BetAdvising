import { useEffect, useState } from "react"
import { View } from "react-native"
import { FONTS, FONT_SIZES, COLORS, SPACING } from "../../../constants"
import { MaterialIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { useLocation } from "react-router-dom"

import ExpandableSteps from "../../../components/ExpandableSteps"
import SelectPackage from "./SelectPackage"
import Checkout from "./Checkout"

const ROUTES = [
    '/credits/order/select-package',
    '/credits/order/checkout',
    '/credits/order/result'
]

const STEPS = [
    {
        key: '1',
        index: 0,
        headerLeftIcon: (isActive) => <FontAwesome5 name='coins' size={20} color={isActive ? COLORS.white : COLORS.grey300} />,
        headerText: 'Výběr počtu kreditů',
        body: <SelectPackage />,
        headerPressable: true,
        pathname: '/credits/order/select-package'
    },
    {
        key: '2',
        index: 1,
        headerLeftIcon: (isActive) => <MaterialIcons name='credit-card' size={20} color={isActive ? COLORS.white : COLORS.grey300} />,
        headerText: 'Provedení platby',
        body: <Checkout />,
        pathname: '/credits/order/checkout'
    },
    {
        key: '3',
        index: 2,
        headerLeftIcon: (isActive) => <MaterialIcons name='list-alt' size={20} color={isActive ? COLORS.white : COLORS.grey300} />,
        headerText: 'Potvrzení objednávky',
        body: <SelectPackage />,
        pathname: '/credits/order/checkout'
    }
]

const Order = ({ setTabHeight }) => {
    const location = useLocation()
    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        const foundIndex = ROUTES.findIndex(route => location.pathname.includes(route))
        
        setActiveStep(foundIndex ?? 0)
    }, [location])

    return (
        <View
            onLayout={event => setTabHeight(event.nativeEvent.layout.height)}
            style={{
                flex: 1,
            }}
        >
            <ExpandableSteps
                steps={STEPS}
                activeStep={activeStep}
            />
        </View>
    )
}

export default Order