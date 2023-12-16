import React from 'react'
import bike from "./yamaha.jpeg"
import './Posts.css'


function Posts() {
  return (
    <div className='posts'>
      <div className="post-box">
      <i class="fa-regular fa-heart"></i>
        <div className="post-img">
          <img src={bike} alt="" />
        </div>
        <div className="post-content">
        <ul>
          <li className='product-price'><i class="fa-solid fa-indian-rupee-sign"></i> 15000</li>
          <li className='product-name'>yamaha</li>
          <li className='product-description'>The Yamaha FZ-FI V3 is powered by a 149 cc air-cooled engine which produces 12.4 PS @ 7250 rpm of power.</li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Posts
