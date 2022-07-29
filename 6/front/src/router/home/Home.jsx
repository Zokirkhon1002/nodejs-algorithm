import React, {useState, useEffect} from 'react'
import axios from "axios"
import GetProducts from '../../components/create-product/GetProducts'

function Home() {
  // useEffect(()=>{
  //   axios.get("http://localhost:8000/")
  //     .then(res=> console.log(res))
  //     .catch(err=> console.log(err))
  // },[])
  return (
    <div>
        <h1>Home</h1>
        <GetProducts/>
    </div>
  )
}

export default Home