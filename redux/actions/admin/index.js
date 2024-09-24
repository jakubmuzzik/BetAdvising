import {
    OPEN_TICKETS_COUNT_CHANGE,
    CLOSED_TICKETS_COUNT_CHANGE,
    OPEN_TICKETS_STATE_CHANGE,
    CLOSED_TICKETS_STATE_CHANGE
} from '../../actionTypes'
import { API_RETRY_LIMIT } from '../../../constants'
import { supabase } from '../../../supabase/config'

export const MAX_TICKETS_ROWS_PER_QUERY = 50

const TICKETS_QUERY = '*, ticket_entries(*)'

export const setOpenTicketsCount = (openTicketsCount) => ({
    type: OPEN_TICKETS_COUNT_CHANGE,
    openTicketsCount
})

export const setClosedTicketsCount = (closedTicketsCount) => ({
    type: CLOSED_TICKETS_COUNT_CHANGE,
    closedTicketsCount
})

export const fetchOpenTickets = () => async (dispatch, getState) => {
    try {
        const from = getState().adminState.openTickets != null ? getState().adminState.openTickets.length : 0

        const { data=[], error } = await supabase
            .from('tickets')
            .select(TICKETS_QUERY)
            //.gte('start_date', new Date().toISOString())
            .eq('result', 'pending')
            .order('start_date', { ascending: true })
            .range(from, Number(from) + Number(MAX_TICKETS_ROWS_PER_QUERY) - 1)

        if (error) throw error

        if (from === 0) {
            dispatch({
                type: OPEN_TICKETS_STATE_CHANGE,
                openTickets: data
            })
        } else {
            dispatch({
                type: OPEN_TICKETS_STATE_CHANGE,
                openTickets: getState().userState.openTickets.concat(data)
            })
        }

        return data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const fetchClosedTickets = () => async (dispatch, getState) => {
    try {
        const from = getState().adminState.closedTickets != null ? getState().adminState.closedTickets.length : 0

        const { data=[], error } = await supabase
            .from('tickets')
            .select(TICKETS_QUERY)
            //.lte('start_date', new Date().toISOString())
            .neq('result', 'pending')
            .order('closed_date', { ascending: false })
            .range(from, Number(from) + Number(MAX_TICKETS_ROWS_PER_QUERY) - 1)

        if (error) throw error

        if (from === 0) {
            dispatch({
                type: CLOSED_TICKETS_STATE_CHANGE,
                closedTickets: data
            })
        } else {
            dispatch({
                type: CLOSED_TICKETS_STATE_CHANGE,
                closedTickets: getState().userState.closedTickets.concat(data)
            })
        }

        return data
    } catch (e) {
        console.error(e)
        return null
    }
}

export const fetchOpenTicketsCount = (attemptsLeft=API_RETRY_LIMIT) => async (dispatch, getState) => {
    try {        
        const { count, error } = await supabase
            .from('tickets')
            .select('id', { count: 'exact', head: true })
            .eq('result', 'pending')

        if (error) throw error

        dispatch(setOpenTicketsCount(count ?? 0))
    } catch (e) {
        console.error('fetchOpenTicketsCount', e)

        if (attemptsLeft > 0) {
            console.log('fetchOpenTicketsCount failed. Retrying...' + Number(attemptsLeft - 1))
            return dispatch(fetchOpenTicketsCount(Number(attemptsLeft - 1)))
        } else {
            console.log('fetchOpenTicketsCount failed. No more retries left.')
            return null
        }
    }
}

export const fetchClosedTicketsCount = (attemptsLeft=API_RETRY_LIMIT) => async (dispatch, getState) => {
    try {        
        const { count, error } = await supabase
            .from('tickets')
            .select('id', { count: 'exact', head: true })
            .neq('result', 'pending')

        if (error) throw error

        dispatch(setClosedTicketsCount(count ?? 0))
    } catch (e) {
        console.error('setClosedTicketsCount', e)

        if (attemptsLeft > 0) {
            console.log('setClosedTicketsCount failed. Retrying...' + Number(attemptsLeft - 1))
            return dispatch(setClosedTicketsCount(Number(attemptsLeft - 1)))
        } else {
            console.log('setClosedTicketsCount failed. No more retries left.')
            return null
        }
    }
}

export const closeOpenTicketInRedux = (ticketId, result) => (dispatch, getState) => {
    const openTickets = getState().adminState.openTickets.filter((ticket) => ticket.id !== ticketId)

    const toClose = getState().adminState.openTickets.find((ticket) => ticket.id === ticketId)

    dispatch({
        type: OPEN_TICKETS_STATE_CHANGE,
        openTickets
    })

    dispatch({
        type: CLOSED_TICKETS_STATE_CHANGE,
        closedTickets: [{
            ...toClose,
            result,
            closed_date: new Date()
        }].concat(getState().adminState.closedTickets ?? [])
    })

    const openTicketsCount = getState().adminState.openTicketsCount

    if (openTicketsCount != null && openTicketsCount > 0) {
        dispatch(setOpenTicketsCount(openTicketsCount - 1))
    }

    const closedTicketsCount = getState().adminState.closedTicketsCount

    if (closedTicketsCount != null && closedTicketsCount >= 0) {
        dispatch(setClosedTicketsCount(closedTicketsCount + 1))
    }
}

export const updateTicketEntryInRedux = (ticketEntryId, result) => (dispatch, getState) => {
    let openTicketsToUpdate = JSON.parse(JSON.stringify(getState().adminState.openTickets))

    openTicketsToUpdate.find(ticket => ticket.ticket_entries.find(ticketEntry => ticketEntry.id === ticketEntryId).result = result)


    dispatch({
        type: OPEN_TICKETS_STATE_CHANGE,
        openTickets: openTicketsToUpdate
    })
}