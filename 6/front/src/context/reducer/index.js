import { combineReducers } from "redux"
import auth from "./auth"
import addToCart from "./addToCart"

const rootReducer = combineReducers({
    auth,
    addToCart
})

export default rootReducer