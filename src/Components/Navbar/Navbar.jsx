import React, { useState } from 'react'
import logo from './logo.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import userimage from './profile.jpg'
function Navbar() {
  const[userStatus,setUserStatus]=useState(false)
  const[username,SetUsername]=useState('')
  const logout=async(e)=>{
    e.preventDefault()
    try {
      await signOut(auth).then(()=>{
        console.log('signed out');
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  onAuthStateChanged(auth,(user)=>{
    if(user!==null){
      SetUsername(user.displayName)
      setUserStatus(true)
    }else{
      setUserStatus(false)
    }
  })

  return (
    <div className='navbar'>
      <div className="navrow">
        <div className="logo">
          <img src={logo} alt="olx" />
        </div>
        <div className="navlinks">
        <ul>
          <li><div className="location-search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder='location'/>
            <i class="fa-solid fa-caret-down"></i>
          </div></li>
          <li>
          <div className="item-search">
           <input type="text" placeholder='Find cars, mobile phones and more ...'/>
           <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          </li>
          <li>
            <div className="language-box">
              <div className="drop-language">
                <h2 className='language'>English<i class="fa-solid fa-caret-down"></i></h2>
                <div className="drop-language-list">
                 <p className='active-language'>English<i class="fa-solid fa-check"></i></p>
                 <p>Hindi</p>
                </div>
              </div>
            </div>
          </li>
          <li>   
          <div className="profile-nav-box">
              <div className="drop-profile-nav">
                <img src={userimage} alt="" className='userimg'/>
                <div className="drop-profile-nav-list">
                 <p className='imageholder'><img src={userimage} alt="" className='userimg-inside'/></p>
              <p >{userStatus?username:"User"}</p>
               <Link to='/profile' className='view-profile-nav'> <p >View Profile</p></Link> 
               <Link to='/profile' className='view-profile-nav'> <p>Verify email</p></Link> 
               <Link to='/profile' className='view-profile-nav'> <p>Change Password</p></Link> 
               <Link to='/login' className='view-profile-nav'> <p >Login</p></Link> 
               <Link to='/login' className='view-profile-nav'> <p onClick={logout}>Logout</p></Link> 
                 
                 <p>Login</p>
                </div>
              </div>
            </div>
          </li>
          <li>
              <div className="become-seller">
                <h2><i class="fa-solid fa-plus"></i>Sell</h2>
              </div>
          </li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
