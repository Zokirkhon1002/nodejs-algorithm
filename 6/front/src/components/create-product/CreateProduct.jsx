import React, {useState} from 'react'
import axios from 'axios'
import {auth} from "../../auth/auth"

function CreateProduct() {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [url, setUrl] = useState("")
    const [urls, setUrls] = useState([])
    const [category, setCategory] = useState("")
    const [product, setProduct] = useState(null)

    const addUrls = (e)=>{
        e.preventDefault()
        if(!url){
            return alert("Image url is required")
        }
        setUrls([...urls, url])
        setUrl("")
    }

    const createProduct = e => {
        e.preventDefault()
        let newProduct = {title, url: urls, price, category}

        axios.post("http://localhost:8000/products", newProduct, auth())
            .then(res=> {
                setProduct(res.data)
                if(res.data.state){
                    setTitle("")
                    setPrice("")
                    setUrls([])
                }
            })
            .catch(err=> console.log(err))
    }

  return (
    <div>
        <h1>Create Product</h1>
        <h2 style={{background:product && product.state ? "green" : "red" }}>{product && product.msg}</h2>
        <form action="">
            <input value={title} onChange={e=> setTitle(e.target.value)} type="text" placeholder='Title' />
            <input value={price} onChange={e=> setPrice(e.target.value)} type="text" placeholder='Price' />
            <input value={url} onChange={e=> setUrl(e.target.value)} type="text" placeholder='url' /> 
            <button onClick={addUrls}>next</button>
            <select value={category} onChange={e=> setCategory(e.target.value)} name="" id="">
                <option value="">Select Category</option>
                <option value="phone">Phone</option>
                <option value="laptop">Laptop</option>
                <option value="tv">TV</option>
            </select>

            <input onClick={createProduct} type="submit" value="Create Product" />
        </form>
  
    </div>
  )
}

export default CreateProduct