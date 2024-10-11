import {
    USER_STATE_CHANGE,
    USER_AUTH_STATE_CHANGE,
    STORE_TOAST_REF,
    OFFERS_STATE_CHANGE,
    UNLOCKED_STATE_CHANGE,
    NOTIFICATIONS_STATE_CHANGE,
    CLEAR_DATA,
    CREDIT_TRANSACTIONS_STATE_CHANGE
} from '../../actionTypes'
import { logOut } from '../app'
import { supabase } from '../../../supabase/config'

const OFFERS_QUERY = '*, ticket_data:ticket(*, ticket_entries(*))'
const UNLOCKED_QUERY = '*, ticket(*, ticket_entries(*))'
const NOTIFICATIONS_QUERY = '*, ticket(id, name, price)'
const CREDIT_TRANSACTIONS_QUERY = '*, ticket(*, ticket_entries(*)), payment_intent(*)'

export const MAX_OFFER_ROWS_PER_QUERY = 30
export const MAX_UNLOCKED_ROWS_PER_QUERY = 30
export const MAX_NOTIFICATIONS_ROWS_PER_QUERY = 30
export const MAX_CREDIT_TRANSACTIONS_ROWS_PER_QUERY = 30

export const clearReduxData = () => ({
    type: CLEAR_DATA
})

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

export const fetchNotifications = () => async (dispatch, getState) => {
    try {
        const from = getState().userState.notifications != null ? getState().userState.notifications.length : 0

        //order by multiple columns to avoid duplicate notifications when created_date is same
        const { data=[], error } = await supabase
            .from('notifications')
            .select(NOTIFICATIONS_QUERY)
            .eq('user', getState().userState.currentAuthUser.id)
            .order('created_date', { ascending: false })
            .order('id', { ascending: false })
            .range(from, Number(from) + Number(MAX_NOTIFICATIONS_ROWS_PER_QUERY) - 1)

        if (error) throw error

        if (from === 0) {
            dispatch({
                type: NOTIFICATIONS_STATE_CHANGE,
                notifications: data
            })
        } else {
            dispatch({
                type: NOTIFICATIONS_STATE_CHANGE,
                notifications: getState().userState.notifications.concat(data)
            })
        }

        return data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const fetchLatestCreditTransaction = () => async (dispatch, getState) => {
    try {
        //order by multiple columns to avoid duplicate notifications when created_date is same
        const { data=[], error } = await supabase
            .from('credit_transactions')
            .select(CREDIT_TRANSACTIONS_QUERY)
            .eq('user', getState().userState.currentAuthUser.id)
            .order('created_date', { ascending: false })
            .limit(1)
            .throwOnError()

            dispatch({
                type: CREDIT_TRANSACTIONS_STATE_CHANGE,
                creditTransactions: data.concat(getState().userState.creditTransactions ?? [])
            })

        if (data[0]?.transaction_type === 'purchase' && data[0]?.payment_intent?.status === 'succeeded') {
            dispatch(updateCurrentUserInRedux({ credits: Number(getState().userState.currentUser.credits) + Number(data[0].amount) }))
        }

        return data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const fetchCreditTransactions = () => async (dispatch, getState) => {
    try {
        const from = getState().userState.creditTransactions != null ? getState().userState.creditTransactions.length : 0

        //order by multiple columns to avoid duplicate notifications when created_date is same
        const { data=[], error } = await supabase
            .from('credit_transactions')
            .select(CREDIT_TRANSACTIONS_QUERY)
            .eq('user', getState().userState.currentAuthUser.id)
            .order('created_date', { ascending: false })
            .order('id', { ascending: false })
            .range(from, Number(from) + Number(MAX_CREDIT_TRANSACTIONS_ROWS_PER_QUERY) - 1)

        if (error) throw error

        if (from === 0) {
            dispatch({
                type: CREDIT_TRANSACTIONS_STATE_CHANGE,
                creditTransactions: data
            })
        } else {
            dispatch({
                type: CREDIT_TRANSACTIONS_STATE_CHANGE,
                creditTransactions: getState().userState.creditTransactions.concat(data)
            })
        }

        return data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const fetchUnlockedTickets = () => async (dispatch, getState) => {
    try {
        const from = getState().userState.unlocked != null ? getState().userState.unlocked.length : 0

        const { data=[], error } = await supabase
            .from('unlocked_tickets')
            .select(UNLOCKED_QUERY)
            .order('created_date', { ascending: false })
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

export const fetchUnlockedTicket = (unlockedTicketId) => async (dispatch, getState) => {
    try {
        const { data, error } = await supabase
            .from('unlocked_tickets')
            .select(UNLOCKED_QUERY)
            .eq('id', unlockedTicketId)

        if (error) throw error

        if (getState().userState.unlocked != null) {
            dispatch({
                type: UNLOCKED_STATE_CHANGE,
                unlocked: data.concat(getState().userState.unlocked)
            })
        }

        return data
    } catch(e) {
        console.error(e)
        return null
    }
}

export const unlockTicket = (offerId, ticketId) => async (dispatch, getState) => {
    const { data: unlockedTicket, error: unlockError } = await supabase
        .from('unlocked_tickets')
        .insert({
            ticket: ticketId,
            user: getState().userState.currentAuthUser.id
        })
        .select('id')

    if (unlockError) throw unlockError

    const { data=[], error: queryError } = await supabase
        .from('ticket_offers')
        .select(OFFERS_QUERY)
        .eq('id', offerId)

    if (queryError) throw queryError

    dispatch(updateCurrentUserInRedux({ credits: getState().userState.currentUser.credits - data[0].price }))

    dispatch({
        type: OFFERS_STATE_CHANGE,
        offers: getState().userState.offers.map(offer => {
            if (offer.id === offerId) {
                return data[0]
            }

            return offer
        })
    })

    if (getState().userState.unlocked != null) {
       dispatch(fetchUnlockedTicket(unlockedTicket[0].id))
    }
}

export const markNotificationsAsDisplayed = (toUpdateIds) => async (dispatch, getState) => {
    try {
        const { error } = await supabase
            .from('notifications')
            .update({ displayed: true })
            .select()
            .in('id', toUpdateIds)

        if (error) throw error

        dispatch({
            type: NOTIFICATIONS_STATE_CHANGE,
            notifications: getState().userState.notifications?.map(notification => {
                if (toUpdateIds.includes(notification.id)) {
                    return { ...notification, displayed: true }
                } else {
                    return notification
                }
            })
        })
    } catch (e) {
        console.error('Error updating notifications as displayed: ', e)
    }
}