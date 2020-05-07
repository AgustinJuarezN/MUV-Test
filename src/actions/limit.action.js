import { SET_LIMITS } from "./../types/limit.type";

export const setLimits = (limits) => {
    return {
        type: SET_LIMITS,
        payload: {
            limits:limits
        }
    }
}
