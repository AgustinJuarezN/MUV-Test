import { LOGIN, LOGOUT } from "./../types/auth.type";

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const login = (user) => {
    return {
        type: LOGIN,
        payload: {
            user: user
        }
    }
}