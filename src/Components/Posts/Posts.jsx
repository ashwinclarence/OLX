
import './Posts.css'
import React, { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { itemRef } from '../../firebase/config';
import { Link } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    try {
      getDocs(itemRef).then((snapshot) => {
        const allproducts = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })
        setProducts(allproducts)
      })
    } catch (error) {
      console.error(error.message);
    }



  }, []);


  return (

    <div className='posts'>
        <div className="filter-row">
          <p value='all'>All Category</p>
          <p value="Car">Car</p>
          <p value="Mobile">Mobile</p>
          <p value="Bikes">Bikes</p>
          <p value="Books">Books</p>
          <p value="Sports">Sports</p>
          <p value="vehicles">vehicles</p>
          <p value="Furniture">Furniture</p>
          <p value="Electronics">Electronics</p>
          <p value="Home Appliances">Home Appliances</p>
          <p value="Food Items">Food Items</p>
        </div> 
      <div className="post-product-container">
        {products.map((product) => (
          <Link to='/view-product' state={{ id: product.id }}>
            <div key={product.id} className='post-box'>
              <div className='post-img'>
                <i className='fa-solid fa-heart'></i>
                <img src={product.productUrl} alt=''/>
              </div>
              <div className='post-content'>
                <ul>
                  <li className='product-price'>
                    <i className='fa-solid fa-indian-rupee-sign'></i>
                    &nbsp;&nbsp;{product.productPrice.toLocaleString()}
                  </li>
                  <li className='product-name'>{product.productName}</li>
                  {product.productDescription.length > 70 ? <li className='product-description'>{product.productDescription.slice(0, 70)}...</li> : <li className='product-description'>{product.productDescription.slice(0, 70)}</li>}
                 
                  <li className='product-uploaded-time'>{product.uploadedTime}</li>
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Posts;
