import React, { useState } from 'react'
import "./SellProduct.css"
import { useNavigate,Link } from 'react-router-dom'
import { addDoc } from 'firebase/firestore'
import {colRef} from "../../firebase/config"
import proimagedefault from './productimageload.png'

function SellProduct() {
    const navigate=useNavigate()
    const[productName,setProductName]=useState('')
    const[productPrice,setProductPrice]=useState('')
    const[productCategory,setProductCategory]=useState('')
    const[productDescription,setProductDescription]=useState('')
    const[productImage,setProductImage]=useState('')
  
    const addProduct=(e)=>{
        e.preventDefault()
       addDoc(colRef,{
       productName,
       productPrice,
       productCategory,
       productDescription
       }).then(()=>{
        setProductName("")
       setProductPrice("")
       setProductCategory("")
       setProductDescription("")
       alert("Item Added")
       navigate('/')
       })
    }

  return (
    <div className='product'>
    <div className="product-box">
        <form action="" onSubmit={addProduct}>
           <div className="product-box-left">
           <label htmlFor="">Name</label>
            <input 
            type="text"
            value={productName}
            onChange={(e)=>setProductName(e.target.value)}
            placeholder='Name of the product'
            required />
            <label htmlFor="">Price</label>
            <input
             type='number'
             step={100}
             value={productPrice}
             onChange={(e)=>setProductPrice(e.target.value)} 
             placeholder='Price of the product'
             required/>
            <label htmlFor="">Category</label>
            <select 
            name="product-category" 
            id="product-category" 
            required
            value={productCategory}
            onChange={(e)=>setProductCategory(e.target.value)}>
                <option value=''>Choose category</option>
                <option value="Car">Car</option>
                <option value="Mobile">Mobile</option>
                <option value="Bikes">Bikes</option>
                <option value="Books">Books</option>
                <option value="Sports">Sports</option>
                <option value="vehicles">vehicles</option>
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
                <option value="Home Appliances">Home Appliances</option>
            </select>
            <label htmlFor="">Description</label>
            <textarea 
            name="product-description" 
            id="product-description" 
            placeholder='Few words about your product'
            maxLength={500}
            required
            value={productDescription}
            onChange={(e)=>setProductDescription(e.target.value)}>
            </textarea>
           </div>
           <div className="product-box-right">
           <label htmlFor="">Product image</label>
            <img src={productImage?URL.createObjectURL(productImage):proimagedefault} alt="" />
            <input 
            type="file" 
            className='product-image' 
            onChange={(e)=>{setProductImage(e.target.files[0])}}
            required/>


           <button type='submit' className='add-product'>Add Product</button>
            
            <h6 className='go-back'><Link to='/' className='go-back'>Back to Home <i class="fa-solid fa-house"></i></Link></h6>

           </div>
        </form>
    </div>
  
</div>
  )
}

export default SellProduct
