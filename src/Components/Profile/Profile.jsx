import React, { useState } from 'react'
import './Profile.css'
import profileImage from "./profile.png"
import {auth,userRef} from '../../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { getDocs } from 'firebase/firestore'


function Profile() {
    const[username,SetUsername]=useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const[emailVerify,setEmailVerify]=useState(false)
    const[userid,setUserid]=useState('')
    const[navUserProfile,setNavUserProfile]=useState('')
    onAuthStateChanged(auth,(user)=>{
         try {
            SetUsername(user.displayName)
            setEmail(user.email)
            setUserid(user.uid)
            if(user.emailVerified){
              setEmailVerify(true)
              
            }else{
              setEmailVerify(false)
            }
         } catch (error) {
            console.log(error);
         }
      })
      // function get current user information from firebase
  getDocs(userRef).then((snapshot)=>{
    snapshot.docs.forEach((doc)=>{
      if(userid===doc.data().Id){
        setNavUserProfile(doc.data().ProfileImage)
        setPhone(doc.data().phoneNumber)
        console.log("userfound "+doc.data().username)
      }
    }) 
  })
  .catch(err=>{
    console.log(err.message);
  })
   
  return (
    <div className='profile'>
        <div className="profile-box">
            <form action="">
                <img src={navUserProfile?navUserProfile:profileImage} alt="" />
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
