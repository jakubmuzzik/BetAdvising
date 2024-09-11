const DEFAULT_LANGUAGE = 'en'
const SUPPORTED_LANGUAGES = ['en', 'cs']

const translateLabel = (language, label) => {
    const translateTo = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE
    
    return LABELS[label][translateTo]
}

export const translateLabels = (language, labels) => labels.reduce((out, label) => ({...out, [label] : translateLabel(language, label)}), {}) 

const LABELS = {
    [LOG_IN]: {
        'en': 'Log in',
        'cs': 'Přihlásit se'
    },
}