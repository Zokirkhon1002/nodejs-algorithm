export const auth = ()=>{
    let token = JSON.parse(localStorage.getItem("persist:root"))
    if(token.auth){
        return {
            headers: {
                token: JSON.parse(token.auth).state
            }
        }
    }
}
