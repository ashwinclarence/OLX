import React from 'react'
import SellProduct from '../Components/SellProduct/SellProduct'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'

function ProductSell() {
  return (
    <div className='Product-sell'>
      <Navbar/>
      <SellProduct/>
      <Footer/>
    </div>
  )
}

export default ProductSell
