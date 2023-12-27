
import './Posts.css'
import React, { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { itemRef } from '../../firebase/config';
import { Link } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
console.log(category);

  useEffect(() => {
    try {
      getDocs(itemRef).then((snapshot) => {
        const allproducts = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        }).filter((result)=>{
          if(category!=='all'){
           return result.productCategory===category;            
          }else{
            return result
          }
        })
      
        setProducts(allproducts)
      })
    } catch (error) {
      console.error(error.message);
    }



  }, [category]);


  return (

    <div className='posts'>
        <div className="filter-row">
          <p value='all' onClick={(e)=>setCategory('all')}>All Category</p>
          <p value="Car" onClick={(e)=>setCategory('Car')}>Car</p>
          <p value="Mobile" onClick={(e)=>setCategory('Mobile')}>Mobile</p>
          <p value="Bikes" onClick={(e)=>setCategory('Bikes')}>Bikes</p>
          <p value="Books" onClick={(e)=>setCategory('Books')}>Books</p>
          <p value="Sports" onClick={(e)=>setCategory('Sports')}>Sports</p>
          <p value="vehicles" onClick={(e)=>setCategory('vehicles')}>vehicles</p>
          <p value="Furniture" onClick={(e)=>setCategory('Furniture')}>Furniture</p>
          <p value="Electronics" onClick={(e)=>setCategory('Electronics')}>Electronics</p>
          <p value="Home Appliances" onClick={(e)=>setCategory('Home Appliances')}>Home Appliances</p>
          <p value="Food Items" onClick={(e)=>setCategory('Food Items')}>Food Items</p>
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
                  {product.productName.length>25? <li className='product-name'>{product.productName.slice(0,25)}...</li>:<li className='product-name'>{product.productName.slice(0,25)}</li>}
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
