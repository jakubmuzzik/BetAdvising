import { CLEAR_DATA } from "../../actionTypes"
import { supabase } from "../../../supabase/config"

export const logOut = () => async (dispatch) => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        return
    }
    dispatch({ type: CLEAR_DATA })
}