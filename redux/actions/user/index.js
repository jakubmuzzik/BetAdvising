import {
    USER_STATE_CHANGE,
    USER_AUTH_STATE_CHANGE,
    STORE_TOAST_REF,
    OFFERS_STATE_CHANGE,
    UNLOCKED_STATE_CHANGE
} from '../../actionTypes'
import { logOut } from '../app'
import { supabase } from '../../../supabase/config'

const OFFERS_QUERY = '*, ticket_data:ticket(*, ticket_entries(*))'
const UNLOCKED_QUERY = '*, ticket_entries(*)'
const MAX_OFFER_ROWS_PER_QUERY = 50
const MAX_UNLOCKED_ROWS_PER_QUERY = 50

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
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .limit(1)

    if (error || !data || data.length === 0) {
        dispatch(logOut())
        return
    }

    dispatch({ type: USER_STATE_CHANGE, data: data[0] })
}

export const fetchOffers = () => async (dispatch, getState) => {
    try {
        const from = getState().userState.offers != null ? getState().userState.offers.length : 0

        const { data=[], error } = await supabase
            .from('ticket_offers')
            .select(OFFERS_QUERY)
            .gte('start_date', new Date().toISOString())
            .order('start_date', { ascending: true })
            .range(from, Number(from) + Number(MAX_OFFER_ROWS_PER_QUERY) - 1)

        if (error) throw error

        if (from === 0) {
            dispatch({
                type: OFFERS_STATE_CHANGE,
                offers: data
            })
        } else {
            dispatch({
                type: OFFERS_STATE_CHANGE,
                offers: getState().userState.offers.concat(data)
            })
        }

        return data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const fetchUnlocked = () => async (dispatch, getState) => {
    try {
        const from = getState().userState.unlocked != null ? getState().userState.unlocked.length : 0

        const { data=[], error } = await supabase
            .from('tickets')
            .select(UNLOCKED_QUERY)
            .gte('start_date', new Date().toISOString())
            .order('start_date', { ascending: true })
            .range(from, Number(from) + Number(MAX_UNLOCKED_ROWS_PER_QUERY) - 1)

        if (error) throw error

        if (from === 0) {
            dispatch({
                type: UNLOCKED_STATE_CHANGE,
                unlocked: data
            })
        } else {
            dispatch({
                type: UNLOCKED_STATE_CHANGE,
                unlocked: getState().userState.unlocked.concat(data)
            })
        }

        return data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const unlockTicket = (offerId, ticketId) => async (dispatch, getState) => {
    const { error: unlockError } = await supabase
        .from('unlocked_tickets')
        .insert({
            ticket: ticketId,
            user: getState().userState.currentAuthUser.id
        })

    if (unlockError) throw unlockError

    const { data=[], error: queryError } = await supabase
        .from('ticket_offers')
        .select(OFFERS_QUERY)
        .eq('id', offerId)

    if (queryError) throw queryError

    dispatch(updateCurrentUserInRedux({ credits: getState().userState.currentUser.credits - data[0].price }))

    return data[0]

    /*dispatch({
        type: OFFERS_STATE_CHANGE,
        offers: getState().userState.offers.map(offer => {
            if (offer.id === offerId) {
                return data[0]
            }

            return offer
        })
    })*/
}

//need to call this after the unlock animation is done
export const updateOfferInRedux = (data) => async (dispatch, getState) => {
    dispatch({
        type: OFFERS_STATE_CHANGE,
        offers: getState().userState.offers.map(offer => {
            if (offer.id === data.id) {
                return data
            }

            return offer
        })
    })
}