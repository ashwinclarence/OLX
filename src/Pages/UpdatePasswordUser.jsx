import React from 'react'
import PasswordUpdate from '../Components/PasswordUpdate/PasswordUpdate'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

function UpdatePasswordUser() {
  return (
    <div className='update-password-user'>
      <Navbar/>
      <PasswordUpdate/>
      <Footer/>
    </div>
  )
}

export default UpdatePasswordUser
