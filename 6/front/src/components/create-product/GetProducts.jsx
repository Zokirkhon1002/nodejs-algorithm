// @ts-nocheck
import React, { useEffect, useState } from 'react'
import axios from '../../api/axios'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import "./style.css"
import { useSelector, useDispatch } from "react-redux"
import {ADD_TO_CART} from "../../context/action/actionTypes"
 
const ProductWrapper = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState('all')
    const [delState, setDelState] = useState(null)
    const [updateModal, setUpdateModal] = useState(false)
    const [updateProductState, setUpdateProductState] = useState(null)
    const [updateProduct, setUpdateProduct] = useState({
      title: "",
      price: "",
      url: [],
      category: ""
    })
    const auth = useSelector(s => s.auth)
    const cart = useSelector(s => s.addToCart)
    const dispatch = useDispatch()

    const addToCartProduct = (product) => {
      let itemIndex = cart.findIndex(item => item._id === product._id)
      console.log(itemIndex);
      if( itemIndex < 0 ){
        let newPro = {
          ...product,
          quontity: 1
        }
        dispatch({type:ADD_TO_CART, payload: [...cart, newPro]})
      }else{
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
    }


    useEffect(() => {
      axios.get(`/products${category === 'all' ? '' : `/category/${category}`}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }, [category, delState, updateProductState])

    const setSearch = (txt) => { 
        axios.get(`/products/search?title=${txt}&c=${category}`)
            .then(res => {
              setData(res.data)
              console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    const deleteProducts = (_id) => {
        axios.delete(`/products/${_id}`)
          .then(res=> setDelState(res))
          .catch(err=> console.log(err))
    }

    const updateProducts = (_id)=>{
      setUpdateModal(true)
      setUpdateProduct(data.data.filter(item => item._id === _id)[0])
    }

    const updatedPro = (e)=>{
      e.preventDefault()
      axios.put(`/products/update/${updateProduct._id}`, updateProduct )
        .then(res=> setUpdateProductState(res))
        .catch(res=> console.log(res))

      setUpdateModal(false)
    }

  return (
    <div className='wrapper'>
      <div className="pro_nav">
        <input 
        type="text" 
        placeholder='Search by Title...' 
        onChange={e => setSearch(e.target.value)}
        />
        <select onChange={({target}) => setCategory(target.value)}>
          <option value="all">All</option>
          <option value="phone">phone</option>
          <option value="laptop">laptop</option>
          <option value="tv">tv</option>
        </select>
      </div>
      <div className="pro_wrapper">
        {
          data?.data?.map(({_id, title, price, url, category}) => <div key={_id} className='product'>
            <img src={url[0]} alt="" />
            <h4>{title}</h4>
            <p>{price}</p>
            {
              auth?.state ? 
              <>
                <button className='btn' onClick={() => deleteProducts(_id)}><FaTrashAlt /></button>
                <button className='btn' onClick={() => updateProducts(_id)}><FaEdit /></button>
              </>
              :
              <button onClick={() => addToCartProduct({_id, title, price, url, category})} className='btn'>Add Cart</button>
            }
          </div>)
        }
      </div>
        <div className={ updateModal ? "update_modal show_modal" : "update_modal"}>
          <FiX onClick={()=>setUpdateModal(false)}/>
            <form onSubmit={updatedPro} action="">
              <label htmlFor="">Title</label>
              <input 
              value={updateProduct.title} 
              onChange={e=> setUpdateProduct({...updateProduct, title: e.target.value})} 
              type="text" />
              <br />
              <label htmlFor="">Price</label>
              <input 
              value={updateProduct.price} 
              onChange={e=> setUpdateProduct({...updateProduct, price: e.target.value})} 
              type="text" />
              <br />
              
              <label htmlFor="">Image url</label>
              <input type="text" />
              <button>next</button>
              <br />
              {
                updateProduct.url?.map((i,inx)=> <img key={inx} width={50} src={i}/>)
              }
              <br />

              <button >Update Products</button>
            </form>
        </div>

    </div>
  )
}

export default ProductWrapper