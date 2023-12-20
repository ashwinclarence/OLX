import React from 'react'
import ViewPosts from '../Components/ViewPosts/ViewPosts'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

function ProductView() {
    return (
        <div className='product-view-each'>
            <Navbar />
            <ViewPosts />
            <Footer />
        </div>
    )
}

export default ProductView
