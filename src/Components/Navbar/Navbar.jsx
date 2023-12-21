import React, { useState } from 'react'
import logo from './logo.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { auth, userRef } from '../../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import userimage from './profile.png'
import { useNavigate } from 'react-router-dom'
import { getDocs } from 'firebase/firestore'

function Navbar() {
  const[userStatus,setUserStatus]=useState(false)
  const[username,setUsername]=useState('')
  const[userid,setUserid]=useState('')
  const[navUserProfile,setNavUserProfile]=useState('')
  const navigate=useNavigate()

  const logout=async(e)=>{
    e.preventDefault()
    try {
      await signOut(auth).then(()=>{
        console.log('signed out');
        navigate('/login')
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  onAuthStateChanged(auth,(user)=>{
    if(user!==null){
      setUsername(user.displayName)
      setUserid(user.uid)
      setUserStatus(true)
    }else{
      setUserStatus(false)
    }
  })

  // function get current user information from firebase
  getDocs(userRef).then((snapshot)=>{
      snapshot.docs.forEach((doc)=>{
        if(userid===doc.data().Id){
          setNavUserProfile(doc.data().ProfileImage)
        }
      }) 
    })
    .catch(err=>{
      console.log(err.message);
    })
    
    return (
      <div className='navbar'>
      <div className="navrow">
        <div className="logo">
          <Link to='/'><img src={logo} alt="olx" /></Link>
        
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
                <img src={navUserProfile?navUserProfile:userimage} alt="" className='userimg'/>
                <div className="drop-profile-nav-list">
                 <p className='imageholder'><img src={navUserProfile?navUserProfile:userimage} alt="" className='userimg-inside'/></p>
              <p >{userStatus?username:"User"}</p>
                
                <p>{userStatus?<Link to='/profile' className='view-profile-nav'> <p >View Profile</p></Link>:""}</p>
                 <p>{userStatus?<p onClick={logout}>Logout</p>: <Link to='/login' className='view-profile-nav'> <p >Login</p></Link> }</p>
                </div>
              </div>
            </div>
          </li>
          <li>
              <div className="become-seller">
                {userStatus? <Link to="/sell-product" className='sell-product'><h2><i class="fa-solid fa-plus"></i>Sell</h2></Link>: <Link to="/login" className='sell-product'><h2><i class="fa-solid fa-plus"></i>Sell</h2></Link>   }
            
              </div>
          </li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
