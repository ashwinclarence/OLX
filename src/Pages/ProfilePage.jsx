import React from 'react'
// import Navbar from '../Components/Navbar/Navbar'
// import Profile from '../Components/Profile/Profile'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import MyProducts from '../Components/MyProducts/MyProducts'
function ProfilePage() {
  return (
    <div className='profilePage'>
      <Navbar/>
     <MyProducts/>
      <Footer/>
    </div>
  )
}

export default ProfilePage
