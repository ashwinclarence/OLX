import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Posts from '../Components/Posts/Posts'
import Footer from '../Components/Footer/Footer'
import Banner from '../Components/Banner/Banner'

function Home() {
  return (
    <div>
      <Navbar/>
      <Posts/>
      <Banner/>
      <Footer/>
    </div>
  )
}

export default Home
