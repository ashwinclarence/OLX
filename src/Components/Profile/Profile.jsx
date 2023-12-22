import React, { useEffect, useState } from 'react'
import './Profile.css'
import profileImage from "./profile.png"
import { auth, userRef } from '../../firebase/config'
import { onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { getDocs } from 'firebase/firestore'


function Profile() {
  const [username, SetUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [emailVerify, setEmailVerify] = useState(false)
  const [userid, setUserid] = useState('')
  const [navUserProfile, setNavUserProfile] = useState('')
  const navigate = useNavigate()
  onAuthStateChanged(auth, (user) => {
    try {
      SetUsername(user.displayName)
      setEmail(user.email)
      setUserid(user.uid)
      if (user.emailVerified) {
        setEmailVerify(true)

      } else {
        setEmailVerify(false)
      }
    } catch (error) {
      console.log(error);
    }
  })
  // function get current user information from firebase
  getDocs(userRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if (userid === doc.data().Id) {
        setNavUserProfile(doc.data().ProfileImage)
        setPhone(doc.data().phoneNumber)
        setLocation(doc.data().location)
      }
    })
  })
    .catch(err => {
      console.log(err.message);
    })
  //function to send user verification email
  const verifyEmail = async (e) => {
    e.preventDefault()
    await sendEmailVerification(auth.currentUser).then(() => {
      alert("verification mail send")
    }).catch((err) => {
      console.log(err.message);
      alert("Error Ocuured while sending mail. Please try after sometime..")
    })
  }
  // function to send alert about already verified email
  const verfiedEmailAlert = (e) => {
    e.preventDefault()
    alert("Your email is already verfied")
  }
  // function to logout
  const logout = async (e) => {
    e.preventDefault()
    try {
      await signOut(auth).then(() => {
        console.log('signed out');
        navigate('/login')
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  // delete user from database
  const confirmDelete = (e) => {
    e.preventDefault()
    try {
      const confirmBox = window.confirm(
        `${username} Are you sure want to delete your account?`
      )
      if (confirmBox === true) {
       alert("clicked yes")
       navigate('/')
      }else{
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  //navigate to view rating
  const viewMyProducts=()=>{
    navigate('/view-my-products')
  }



  return (
    <div className='profile'>
      <div className="profile-box">
        <form action="">
          <div className="profile-box-left">
            <img src={navUserProfile ? navUserProfile : profileImage} alt="" />
            
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              value={username != null ? username : "error loading username"}
              disabled />
            <label htmlFor="">{phone != null ? <span style={{ color: '#000' }}>Phone Number</span> : <span style={{ color: '#FF0000' }}>Phone Number</span>}</label>
            <input
              type="tel"
              value={phone != null ? phone : "update Phone number"}
              disabled />
            <label htmlFor="">location </label>
            <input
              type="text"
              value={location != null ? location : "error loading email"}
              disabled />
            <label htmlFor="">Email {emailVerify ? <i class="fa-solid fa-circle-check" title='verified email'></i> : <i class="fa-solid fa-circle-xmark" title='Email not verfied'></i>} </label>
            <input
              type="text"
              value={email != null ? email : "error loading email"}
              disabled />
          </div>
          <div className="profile-box-right">
           <button  className='update-password' onClick={viewMyProducts}>View My Products</button>
            {emailVerify ? <button className='update-password' onClick={verfiedEmailAlert}>Send Verification Mail</button> : <button className='update-password' onClick={verifyEmail}>Send Verification Mail</button>}
            <button className='update-password' onClick={logout}>Logout</button>
            <button className='update-password' onClick={confirmDelete}>Delete Account</button>
            <h6 className='go-back'><Link to='/' className='go-back'>Back to Home <i class="fa-solid fa-house"></i></Link></h6>

          </div>


        </form>
      </div>

    </div>
  )
}

export default Profile
