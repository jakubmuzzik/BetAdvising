import { CLEAR_DATA, TOGGLE_DRAWER, CLEAR_PERSISTED_DATA } from "../../actionTypes"
import { supabase } from "../../../supabase/config"

export const logOut = () => async (dispatch, getState) => {
    const { error } = await supabase.auth.signOut()

    dispatch({ type: CLEAR_DATA })

    if (error) throw error
}

export const toggleDrawer = () => ({
    type: TOGGLE_DRAWER
})

export const clearPersistedReduxData = () => ({
    type: CLEAR_PERSISTED_DATA
})