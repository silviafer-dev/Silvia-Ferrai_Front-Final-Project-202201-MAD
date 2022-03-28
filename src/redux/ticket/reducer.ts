/* eslint-disable no-underscore-dangle */
import { AnyAction } from 'redux';
import { actionTypesTicket } from './actionTypes';
import { TicketI } from '../../interfaces/ticket';

export function ticketReducer(state: TicketI[] = [], action: AnyAction) {
    switch (action.type) {
        case actionTypesTicket.createTicket:
            return [...state, action.payload];
        case actionTypesTicket.deleteTicket:
            return state.filter((item) => item._id !== action.payload.id);
        case actionTypesTicket.updateTicket:
            return [
                state.map((item) =>
                    item._id === action.payload.id ? action.payload : item
                ),
            ];

        case actionTypesTicket.removeProductFromTicket:
            return state.filter((item) => item._id !== action.payload.id);
        case actionTypesTicket.loadAllTickets:
            return [...action.payload];
        // case actionTypesTicket.getTicket:
        //     return action.payload;
        default:
            return state;
    }
}
