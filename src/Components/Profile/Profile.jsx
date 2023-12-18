import React, { useState } from 'react'
import './Profile.css'
import profileImage from "./profile.png"
import {auth} from '../../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { Link } from 'react-router-dom'



function Profile() {
    const[username,SetUsername]=useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const[emailVerify,setEmailVerify]=useState(false)

    onAuthStateChanged(auth,(user)=>{
         try {
            SetUsername(user.displayName)
            setPhone(user.phoneNumber)
            setEmail(user.email)
            if(user.emailVerified){
              setEmailVerify(true)
            }else{
              setEmailVerify(false)
            }
         } catch (error) {
            console.log(error);
         }
      })
   
  return (
    <div className='profile'>
        <div className="profile-box">
            <form action="">
                <img src={profileImage} alt="" />
                <label htmlFor="">Full Name</label>
                <input 
                type="text"
                value={username!=null?username:"error loading username"}
                disabled />
                <label htmlFor="">{phone!=null?<span style={{color:'#000'}}>Phone Number</span>:<span style={{color:'#FF0000'}}>Phone Number</span>}</label>
                <input 
                type="tel"
                value={phone!=null?phone:"update Phone number"}
                disabled />
                <label htmlFor="">Email {emailVerify?<i class="fa-solid fa-circle-check" title='verified email'></i>:<i class="fa-solid fa-circle-xmark" title='Email not verfied'></i>} </label>
                <input 
                type="text"
                value={email!=null?email:"error loading email"}
                disabled />
                <button className='update-password'>Update Phone Number</button>
                <Link to='/update-password' className='update-password'><button className='update-password' >Update password</button></Link>
                <button className='update-password'>Delete Account</button>
                <h6 className='go-back'><Link to='/' className='go-back'>Back to Home <i class="fa-solid fa-house"></i></Link></h6>

            </form>
        </div>
      
    </div>
  )
}

export default Profile
