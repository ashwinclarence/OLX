import React from 'react'
import logo from './logo.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/config'
import { signOut } from 'firebase/auth'

function Navbar() {

  const logout=async(e)=>{
    e.preventDefault()
    try {
      await signOut(auth).then(()=>{
        console.log('the user signed out');
      })
    } catch (error) {
      console.log(error.message);
    }
  }

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
          <div className="action-box">
              <div className="action">
                <h2 className='language'><i class="fa-solid fa-caret-down"></i></h2>
                <div className="drop-language-list">
                 <p className='active-language'>English<i class="fa-solid fa-check"></i></p>
                 <p>Hindi</p>
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
