import React, {useState} from 'react'
import "../Login.css"
import axios from "../../../api/axios"

function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [result, setResult] = useState({msg:"", state: false, user: {}})
    const [loading, setLoading] = useState(false)
    const [anime, setAnime] = useState(false)

    const signUp = (e)=>{
        e.preventDefault()
        setLoading(true)
        setAnime(true)
        setTimeout(()=>{
            setAnime(false)
        },1000)
        axios.post("/sign-up", {username, password})
            .then(user => {
                setResult(user.data)
                setLoading(false)
                if(user.data.state){
                    setUsername("")
                    setPassword("")
                }
            })
            .catch(err => console.log(err))
    }
  return (
    <div className='sign'>
        <h2>Sign Up</h2>
        <div className={result.msg ? result.state ?`warning success ${anime ? "anime" : ""}`: `warning danger  ${anime ? "anime" : ""}`: "warning" } >
            <p>{result.msg}</p>
        </div>
        <form onSubmit={signUp} action="">
            <input value={username} onChange={e=> setUsername(e.target.value)} className='inp_item' type="text" placeholder='username' />
            <input value={password} onChange={e=> setPassword(e.target.value)} className='inp_item' type="password" placeholder='password' />
            <input value={loading ? "Loading...": "Submit"} disabled={loading} className='login_btn' type="submit" />
        </form>
    </div>
  )
}

export default SignUp