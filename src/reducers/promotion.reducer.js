import { SET_ALL_PROMOTIONS, SET_FILTERED_PROMOTIONS, SET_FILTER, SET_PROMOCODE, CREATED_PROMOCODE } from "./../types/promotion.type";

const initialState = { 
    promotions: {
        all: [{
            "id": 2938,
            "code": "HALLOWEEN2019",
            "discount": 15,
            "createdDate" : "10-22-2019",
            "allies":[],
            "limits": {
                "date": {
                    "fromDate": "10-22-2019",
                    "toDate" : "11-22-2019"
                },
                "user" : {
                    "emails" : ["hola@hotmail.com"]
                }
            },
            "amount": "2000000",
            "activePromo": true
        }],
        filtered:  [{
            "id": 2938,
            "code": "HALLOWEEN2019",
            "discount": 15,
            "createdDate" : "10-22-2019",
            "allies":[],
            "limits": {
                "date": {
                    "fromDate": "10-22-2019",
                    "toDate" : "11-22-2019"
                },
                "user" : {
                    "emails" : ["hola@hotmail.com"]
                }
            },
            "amount": "2000000",
            "activePromo": true
        }]
    },
    filtered: false,
    promocode: {
        id: "",
        code: "",
        createdDate: "",
        amount: "",
        discount: 0,
        multiplesTrips: true,
        activePromo: true,
        allies:[],
        limits: {
            date: {
                fromDate: "",
                toDate: ""
            },
            user: {
                emails: []
            },
            trips: "",
            monetary: "",
            geolocation: {
                radio: "",
                place: ""
            }
        },
        config: {
            step1: false,
            step2: false,
            step3: false
        }
    }
}

export function promotion(state = initialState, action) {
    switch (action.type) {
        case CREATED_PROMOCODE:
            return {
                promotions: state.promotions,
                filtered: state.filtered,
                promocode: action.payload.newPromocode
            }
        case SET_PROMOCODE:
            return {
                ...state,
                promocode: action.payload.promocode
            };
        case SET_ALL_PROMOTIONS:
            return {
                ...state,
                promotions: {
                    ...state.promotions,
                    all: action.payload.promotions
                }
            };
        case SET_FILTERED_PROMOTIONS:
            return {
                ...state,
                promotions: {
                    ...state.promotions,
                    filtered: action.payload.filtered
                },
                filtered: true
            };
        case SET_FILTER:
                return {
                    ...state,
                    filtered: !state.filtered,
                };
        default:
            return state
    }
}