import { ADD_TO_CART } from "../action/actionTypes"

const addToCart = (state = [], action) => {
    switch(action.type){
        case ADD_TO_CART:
            return state = action.payload
        default:
            return state
    }
}

export default addToCart



