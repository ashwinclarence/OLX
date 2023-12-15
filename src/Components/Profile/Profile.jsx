import React from 'react'
import './Profile.css'
import profileImage from "./profile.png"
import {signOut} from 'firebase/auth'
import {auth} from '../../firebase/config'
function Profile() {

    //function to signout
    const signout=async(e)=>{
        try{
            await signOut(auth)
        }catch(error){
            console.log(error);
            alert(error)
        }
    }
  return (
    <div className='profile'>
        <div className="profile-box">
            <form action="">
                <img src={profileImage} alt="" />
                <input 
                type="text"
                value={null}
                placeholder='ASHWIN'
                disabled />
                <input 
                type="tel"
                value={null}
                placeholder='8590120463'
                disabled />
                <input 
                type="text"
                value={null}
                placeholder='meashwinclarence@gmail.com'
                disabled />
                <button className='update-password'>Update password</button>
                <button onClick={signout}>Sign Out</button>
            </form>
        </div>
      
    </div>
  )
}

export default Profile
