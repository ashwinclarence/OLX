import React, { useState } from 'react'
import "./SellProduct.css"
import { useNavigate, Link } from 'react-router-dom'
import { addDoc } from 'firebase/firestore'
import { auth, itemRef, storage } from "../../firebase/config"
import proimagedefault from './productimageload.png'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

function SellProduct() {
  const navigate = useNavigate()
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [location, setLocation] = useState('')
  const [productImage, setProductImage] = useState('')
  let date=new Date()
  const addProduct = async (e) => {
    e.preventDefault()
    // function to add profile image to firestorage
    const imageStorageRef = ref(storage, `proImage/${auth.currentUser.uid}/${Date.now()}`)
    await uploadBytes(imageStorageRef, productImage).then(async (snapshot) => {
          // function to generate the url of current uploaded image 
          getDownloadURL(snapshot.ref).then((url) => {
              const docData = {
                productName:"name",
                productPrice:123456,
                productCategory:"name",
                productDescription:"name",
                uploadedUserId:"id",
                uploadedTime: 123456,
                productUrl: "url",
                location:"locatioan",
                reportnum:0,
                reportedUserId:['hello','hi','hei']
            }
              // function to add user details to firestore
              addDoc(itemRef, {
                productName,
                productPrice:Number(productPrice),
                productCategory,
                productDescription,
                uploadedUserId: auth.currentUser.uid,
                uploadedTime: date.toDateString(),
                uploadedTimeMillsecond: Date.now(),
                productUrl: url,
                location,
                reportnum:0,
                reportedUserId:''
              },docData).then(() => {
                setProductName("")
                setProductPrice("")
                setProductCategory("")
                setProductDescription("")
                alert("Item Added")
                navigate('/')
              })
            })

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
              onChange={(e) => setProductName(e.target.value)}
              placeholder='Name of the product'
              required />
            <label htmlFor="">Price</label>
            <input
              type='number'
              step={100}
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder='Price of the product'
              required />
            <label htmlFor="">Category</label>
            <select
              name="product-category"
              id="product-category"
              required
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}>
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
              <option value="Food Items">Food Items</option>
            </select>
            <label htmlFor="">Description</label>
            <textarea
              name="product-description"
              id="product-description"
              className='product-description'
              placeholder='Few words about your product'
              maxLength={500}
              required
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}>
            </textarea>
            <label htmlFor="">Location</label>
            <select
              name="product-category"
              id="product-category"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)} >
              <option value=''>Choose location</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Tripura">Tripura</option>
              <option value="Telangana">Telangana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <div className="product-box-right">
            <label htmlFor="">Product images</label>
            <div className="product-image">
              <img src={productImage ? URL.createObjectURL(productImage) : proimagedefault} alt="" />
            </div>
            <div className="product-image-input">
              <input
                type="file"
                className='product-image'
                onChange={(e) => { setProductImage(e.target.files[0]) }}
                required />
  
            </div>

            <button type='submit' className='add-product'>Add Product</button>

            <h6 className='go-back'><Link to='/' className='go-back'>Back to Home <i class="fa-solid fa-house"></i></Link></h6>

          </div>
        </form>
      </div>

    </div>
  )
}

export default SellProduct
