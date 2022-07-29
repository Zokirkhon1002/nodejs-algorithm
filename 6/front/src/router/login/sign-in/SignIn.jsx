import React, {useState} from 'react'
import "../Login.css"
import axios from "../../../api/axios"
import { useSelector, useDispatch } from "react-redux"
import {AUTH} from "../../../context/action/actionTypes"
import { useHistory } from "react-router-dom"

function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [result, setResult] = useState({msg:"", state: false, user: {}})
    const [loading, setLoading] = useState(false)
    const [anime, setAnime] = useState(false)

    const history = useHistory()

    const dispatch = useDispatch()

    const signIn = (e)=>{
      e.preventDefault()
      setLoading(true)
      setAnime(true)
      setTimeout(()=>{
          setAnime(false)
      },1000)
      axios.post("/sign-in", {username, password})
      .then(user => {
          setResult(user.data)
          setLoading(false)
          if(user.data.state){
              setUsername("")
              setPassword("")
              if(user.data.user.token){
                dispatch({type:AUTH, payload:user.data.user.token })
                history.push("/admin")
              }
          }
      })
      .catch(err => console.log(err))
    }

  return (
    <div className='sign'>
        <h2>Sign In</h2>
        <div className={result.msg ? result.state ?`warning success ${anime ? "anime" : ""}`: `warning danger  ${anime ? "anime" : ""}`: "warning" } >
            <p>{result.msg}</p>
        </div>
        <form onSubmit={signIn} action="">
            <input value={username} onChange={e=> setUsername(e.target.value)} className='inp_item' type="text" placeholder='username' />
            <input value={password} onChange={e=> setPassword(e.target.value)} className='inp_item' type="password" placeholder='password' />
            <input value={loading ? "Loading...": "Submit"} disabled={loading} className='login_btn' type="submit" />
        </form>
    </div>
  )
}

export default SignIn