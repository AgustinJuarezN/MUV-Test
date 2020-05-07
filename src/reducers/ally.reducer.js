import { SET_ALLIES } from "./../types/ally.type";

const initialState = { 
    allies: null,
}

export function ally(state = initialState, action) {
    switch (action.type) {
        case SET_ALLIES:
            return {
                ...state, 
                allies: action.payload.allies
            };
        default:
            return state
    }
}