import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = ''
const supabaseAnonKey = ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    db: {
        schema: 'public',
    },
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    }
})