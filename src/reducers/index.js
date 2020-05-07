import { combineReducers } from "redux";
import { auth } from "./auth.reducer";
import { promotion } from "./promotion.reducer";
import { ally } from "./ally.reducer";
import { limit } from "./limit.reducer";

const rootReducer = combineReducers({
    auth,
    promotion,
    ally,
    limit
})

export default rootReducer