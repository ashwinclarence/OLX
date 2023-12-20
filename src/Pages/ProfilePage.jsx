import React from 'react'
// import Navbar from '../Components/Navbar/Navbar'
import Profile from '../Components/Profile/Profile'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
function ProfilePage() {
  return (
    <div className='profilePage'>
      <Navbar/>
      <Profile/>
      <Footer/>
    </div>
  )
}

export default ProfilePage
