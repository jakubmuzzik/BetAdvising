import '@expo/metro-runtime'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { COLORS } from './constants'
import * as Font from 'expo-font'

import Main from './navigations/Main'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.querySelector('body').style.overflowY = 'auto'
    document.querySelector('body').style.backgroundColor = '#131C27'
    init()
  }, [])

  const init = async () => {
    try {
      await Promise.all([
        /*Asset.loadAsync([
          require('./assets/th.png'),
        ]),*/
        Font.loadAsync({
          'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
          'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
          'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
        })
      ])
    } catch (e) {
      // handle errors
      console.log('error during init', e)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <View style={{ ...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>

      </View>
    )
  }

  return (
    <>
      <StatusBar style="auto" />

      <SafeAreaProvider style={{ backgroundColor: COLORS.primary, /*overflowY: 'auto'*/ /* overscrollBehavior: 'none'*/ }}>
        <Main />
      </SafeAreaProvider>
    </>
  )
}
