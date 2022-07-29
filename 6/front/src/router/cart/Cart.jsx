import React from 'react'
import "./Cart.css"
import { useSelector, useDispatch } from "react-redux"
import {ADD_TO_CART} from "../../context/action/actionTypes"

function Cart() {
    const cart = useSelector(s => s.addToCart)
    const dispatch = useDispatch()

    const incProduct = (id) => {
        let itemIndex = cart.findIndex(item => item._id === id)
        let newOrder = cart?.map((item, inx)=> {
            if(inx === itemIndex){
              return {
                ...item,
                quontity: item.quontity + 1
              }
            }else{
              return item
            }
          })
          dispatch({type:ADD_TO_CART, payload: newOrder })
    }
    const decProduct = (id) => {
        let itemIndex = cart.findIndex(item => item._id === id)
        let newOrder = cart?.map((item, inx)=> {
            if(inx === itemIndex){
              return {
                ...item,
                quontity: item.quontity - 1
              }
            }else{
              return item
            }
          })
          dispatch({type:ADD_TO_CART, payload: newOrder })
    }
    const removeProduct = (id)=>{
        if(window.confirm("Are you sure?")){
            let filterCart = cart.filter(i => i._id !== id)
            dispatch({type:ADD_TO_CART, payload: filterCart })
        }
    }
  return (
    <div className='cart'>
        <h1>Total price: {cart?.reduce((a,b)=> a + (b.quontity * b.price), 0).brm()}$</h1>
        <div className="pro_wrapper">
        {
          cart?.map(({_id, title, price, url, quontity}) => <div key={_id} className='product'>
            <img src={url[0]} alt="" />
            <h4>{title}</h4>
            <p>{Number(price).brm()}$</p>
            <div>
                <button disabled={quontity <= 1} onClick={() => decProduct(_id)} className='btn'>-</button>
                <span style={{margin: "0 20px"}}>{quontity}</span>
                <button onClick={() => incProduct(_id)} className='btn'>+</button>
                <button onClick={()=> removeProduct(_id)} className='btn'>delete</button>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}

export default Cart