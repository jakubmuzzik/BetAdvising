import {
    USER_STATE_CHANGE,
    USER_AUTH_STATE_CHANGE,
    STORE_TOAST_REF,
} from '../../actionTypes'
import { logOut } from '../app'
import { supabase } from '../../../supabase/config'

export const storeToastRef = (toastRef) => ({
    type: STORE_TOAST_REF,
    toastRef
})

export const updateCurrentUserInRedux = (data) => ({
    type: USER_STATE_CHANGE,
    data
})

export const updateCurrentAuthUser = (currentAuthUser) => ({
    type: USER_AUTH_STATE_CHANGE,
    currentAuthUser
})

export const fetchUser = (userId) => async (dispatch, getState) => {
    /*const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .limit(1)

    if (error || !data || data.length === 0) {
        dispatch(logOut())
        return
    }

    dispatch({ type: USER_STATE_CHANGE, data: data[0] })*/
}