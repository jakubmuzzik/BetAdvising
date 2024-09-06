import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

const CountInNumber = ({ step=1, duration=100, number, textStyle, trailingText = '', trailingTextAfterFinish = '' }) => {
    const [count, setCount] = useState(0)
    const [isCounting, setIsCounting] = useState(true)

    const incrementDuration = duration / number
    
    useEffect(() => {
        if (isCounting) {
            if (count < number) {
                setTimeout(() => {
                    setCount(Math.min(count + step, number))
                }, incrementDuration)
            } else {
                setIsCounting(false)
            }
        }
    }, [count, isCounting])


    return (
        <Text
            style={textStyle}
        >
            {count}
            {trailingTextAfterFinish && !isCounting && trailingTextAfterFinish}
            {trailingText}
        </Text>
    )
}

export default CountInNumber