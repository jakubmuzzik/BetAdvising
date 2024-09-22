import {
    NEW_TICKETS_COUNT_CHANGE,
    CLOSED_TICKETS_COUNT_CHANGE
} from '../../actionTypes'

export const setNewTicketsCount = (newTicketsCount) => ({
    type: NEW_TICKETS_COUNT_CHANGE,
    newTicketsCount
})

export const setClosedTicketsCount = (closedTicketsCount) => ({
    type: CLOSED_TICKETS_COUNT_CHANGE,
    closedTicketsCount
})