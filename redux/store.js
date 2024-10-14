import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['persistedState'],
    blacklist: ['appState', 'userState', 'adminState']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = configureStore({ 
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
    })

    let persistor = persistStore(store)

    return { store, persistor }
}