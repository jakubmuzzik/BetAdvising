import {
    OPEN_TICKETS_COUNT_CHANGE,
    CLOSED_TICKETS_COUNT_CHANGE,
    CLEAR_DATA,
    OPEN_TICKETS_STATE_CHANGE,
    CLOSED_TICKETS_STATE_CHANGE,
    USERS_COUNT_STATE_CHANGE,
    TRANSACTIONS_COUNT_STATE_CHANGE
} from '../actionTypes'

const INITIAL_STATE = {
    openTicketsCount: null,
    closedTicketsCount: null,
    openTickets: null,
    usersCount: null,
    transactionsCount: null
}

export const admin = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_TICKETS_COUNT_CHANGE:
            return {
                ...state,
                openTicketsCount: action.openTicketsCount
            }
        case CLOSED_TICKETS_COUNT_CHANGE:
            return {
                ...state,
                closedTicketsCount: action.closedTicketsCount
            }
        case OPEN_TICKETS_STATE_CHANGE:
            return {
                ...state,
                openTickets: action.openTickets
            }
        case CLOSED_TICKETS_STATE_CHANGE:
            return {
                ...state,
                closedTickets: action.closedTickets
            }
        case USERS_COUNT_STATE_CHANGE:
            return {
                ...state,
                usersCount: action.usersCount
            }
        case TRANSACTIONS_COUNT_STATE_CHANGE:
            return {
                ...state,
                transactionsCount: action.transactionsCount
            }
        case CLEAR_DATA:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}