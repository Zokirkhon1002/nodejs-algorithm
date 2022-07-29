import React, {useState, useEffect} from 'react'
import axios from "../../api/axios"
import "./Login.css"
import { Route, Switch, Link } from "react-router-dom"
import SignUp from './sign-up/SignUp'
import SignIn from './sign-in/SignIn'

function Login() {

  return (
    <div className='login'>
      <button><Link to="/login/sign-up">Sign Up</Link></button>
      <button> <Link to="/login/sign-in">Sign In</Link></button>

      <Switch>
        <Route path="/login/sign-up" component={SignUp}/>
        <Route path="/login/sign-in" component={SignIn}/>
      </Switch>

    </div>
  )
}

export default Login