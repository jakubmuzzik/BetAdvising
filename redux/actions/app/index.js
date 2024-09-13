import { CLEAR_DATA, TOGGLE_DRAWER } from "../../actionTypes"
import { supabase } from "../../../supabase/config"

export const logOut = () => async (dispatch, getState) => {
    const { error } = await supabase.auth.signOut()

    dispatch({ type: CLEAR_DATA })

    if (error) throw error
}

export const toggleDrawer = () => ({
    type: TOGGLE_DRAWER
})