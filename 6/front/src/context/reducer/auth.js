import {AUTH, SIGN_OUT_AUTH} from "../action/actionTypes"

const auth = (state=null, action)=>{
    switch(action.type){
        case AUTH:
            return {
                state: action.payload 
            }
        case SIGN_OUT_AUTH:
            return {
                state: null
            }
        default:
            return state
    }
}
export default auth;