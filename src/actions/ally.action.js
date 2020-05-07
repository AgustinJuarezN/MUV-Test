import { SET_ALLIES } from "./../types/ally.type";

export const setAllies = (allies) => {
    return {
        type: SET_ALLIES,
        payload: {
            allies:allies
        }
    }
}
