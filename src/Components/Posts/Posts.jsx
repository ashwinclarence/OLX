
import './Posts.css'
import React, { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { itemRef } from '../../firebase/config';
import { Link } from 'react-router-dom';


function Posts() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
   
      try {
        getDocs(itemRef).then((snapshot)=>{
         const allproducts=snapshot.docs.map((doc)=>{
            return{
              ...doc.data(),
              id:doc.id
            }
          })
          setProducts(allproducts)
        })

      } catch (error) {
        console.error(error.message);
      }
 

   
  }, []); // Make sure to pass an empty dependency array to run the effect only once on mount

 
  return (
    <div className='posts'>
      {products.map((product) => (
        <Link to='/view-product' state={{id:product.id}}>
        <div key={product.id} className='post-box'>
          <div className='post-img'>
          <i className='fa-solid fa-heart'></i>
            <img src={product.productUrl} alt={product.productName} />
          </div>
          <div className='post-content'>
            <ul>
              <li className='product-price'>
                <i className='fa-solid fa-indian-rupee-sign'></i>
                &nbsp;&nbsp;{product.productPrice}/-
              </li>
              <li className='product-name'>{product.productName}</li>
              {product.productDescription.length>70? <li className='product-description'>{product.productDescription.slice(0,70)}...</li>: <li className='product-description'>{product.productDescription.slice(0,70)}</li>}
             
              <li className='product-uploaded-time'>{product.uploadedTime}</li>
            </ul>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
