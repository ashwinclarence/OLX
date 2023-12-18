
import './Posts.css'
// getDocs(itemRef).then((snapshot) => {
//   snapshot.docs.forEach((doc) => {
//    console.log(doc.data())
//    setProducts(doc.data())
//   })
//   console.log(products);
// })
import React, { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { itemRef } from '../../firebase/config';

function Posts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(itemRef);
        const productsData = snapshot.docs.map((doc) => doc.data());
        setProducts(productsData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, []); // Make sure to pass an empty dependency array to run the effect only once on mount

  return (
    <div className='posts'>
      {products.map((product, index) => (
        <div key={index} className='post-box'>
          <i className='fa-regular fa-heart'></i>
          <div className='post-img'>
            <img src={product.productUrl} alt={product.productName} />
          </div>
          <div className='post-content'>
            <ul>
              <li className='product-price'>
                <i className='fa-solid fa-indian-rupee-sign'></i>
                &nbsp;&nbsp;{product.productPrice}
              </li>
              <li className='product-name'>{product.productName}</li>
              <li className='product-description'>{product.productDescription}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
