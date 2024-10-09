import { isSmallScreen } from "../constants"

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const TRANSLATED_DAY_NAMES = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota']

export const normalize = (size, inverse = false) => {
    return isSmallScreen ? size - 5 * (inverse ? -1 : 1) : size
}

export const stripEmptyParams = (params) => {
    return Object.keys(params).reduce((out, param) => params[param] ? { ...out, [param]: params[param] } : out, {})
}

export const getParam = (supportedValues, param, fallbackValue) => {
    if (!supportedValues) {
        return fallbackValue
    }

    const decodedParam = decodeURIComponent(param)

    if (!decodedParam) {
        return fallbackValue
    }

    const paramValid = supportedValues.some(value => value.toLowerCase() === decodedParam.toLocaleLowerCase())
    return paramValid ? decodedParam : fallbackValue
}

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export const calculateTimeDifference = (date1, date2) => {
    // Get timestamps for both dates
    const startDate = new Date(date1)
    const endDate = new Date(date2)

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endDate - startDate

    // Convert milliseconds to days, hours, minutes, and seconds
    const millisecondsInOneDay = 24 * 60 * 60 * 1000
    const millisecondsInOneHour = 60 * 60 * 1000
    const millisecondsInOneMinute = 60 * 1000
    const millisecondsInOneSecond = 1000

    const days = Math.floor(differenceInMilliseconds / millisecondsInOneDay)
    const hours = Math.floor(
        (differenceInMilliseconds % millisecondsInOneDay) / millisecondsInOneHour
    )
    const minutes = Math.floor(
        (differenceInMilliseconds % millisecondsInOneHour) / millisecondsInOneMinute
    )
    const seconds = Math.floor(
        (differenceInMilliseconds % millisecondsInOneMinute) / millisecondsInOneSecond
    )

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    }
}

export const getEventDate = (timestamp, getDayName = false, getYear = false) => {
    if (!timestamp) {
        return ''
    }

    let out = ''

    const dateTime = new Date(timestamp)

    out += getDayName ? TRANSLATED_DAY_NAMES[DAY_NAMES.indexOf(DAY_NAMES[dateTime.getDay()])] + ', ' : ''
    out += dateTime.getDate() + '. ' + (dateTime.getMonth() + 1) + '.'
    out += getYear ? ' ' + dateTime.getFullYear() : ''

    return out
}

export const getEventTime = (timestamp) => {
    if (!timestamp) {
        return ''
    }

    const dateTime = new Date(timestamp)

    return dateTime.getHours() + ':' + (dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes())
}

export const createRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    
    return result
}