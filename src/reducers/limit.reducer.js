import { SET_LIMITS } from "./../types/limit.type";

const initialState = { 
    limits: []
}

export function limit(state = initialState, action) {
    switch (action.type) {
        case SET_LIMITS:
            return {
                ...state, 
                limits: action.payload.limits
            };
        default:
            return state
    }
}