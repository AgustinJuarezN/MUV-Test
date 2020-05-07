import { SET_ALL_PROMOTIONS, SET_FILTERED_PROMOTIONS, SET_FILTER, SET_PROMOCODE, CREATED_PROMOCODE } from "./../types/promotion.type";

export const setPromotions = (promos) => {
    return {
        type: SET_ALL_PROMOTIONS,
        payload: {
            promotions:promos
        }
    }
}



export const setPromocode = (promocode) => {
    return {
        type: SET_PROMOCODE,
        payload: {
            promocode:promocode
        }
    }
}

export const createdPromocode = (newPromocode) => {
    return {
        type: CREATED_PROMOCODE,
        payload: {
            newPromocode: newPromocode
        }
    }
}

export const setFilteredPromotions = (promos) => {
    return {
        type: SET_FILTERED_PROMOTIONS,
        payload: {
            filtered:promos
        }
    }
}

export const setFilter = () => {
    return {
        type: SET_FILTER
    }
}