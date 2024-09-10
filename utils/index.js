import { isSmallScreen } from "../constants"

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
