import { LOGOUT , LOGIN } from "./../types/auth.type";

const initialState = { 
    loggedIn: false,
    user: null
}

export function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                loggedIn: true,
                user: action.payload.user
            };
        case LOGOUT:
            return {
                loading:false,
                user: null
            };
        default:
            return state
    }
}