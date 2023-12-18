import React, { useState } from 'react'
import './Register.css'
import register_logo from "./olx img.png"
import defaultProfileImage from './profile.png'
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { auth, userRef, imageStorageRef } from '../../firebase/config'
import { addDoc } from 'firebase/firestore'
import { uploadBytes,getDownloadURL } from 'firebase/storage'

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, Setpassword] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [profileImageurl, setProfileImageurl] = useState('')
    // function to sign-in
    const signIn = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password).then((cred) => {
                console.log("user created", cred.user);
                console.log(cred.user.uid)
                navigate('/')
            })


            await updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                console.log("user name changed to " + auth.currentUser.displayName);
            })


            await sendEmailVerification(auth.currentUser)

            // function to add profile imag to firestorage
  
            uploadBytes(imageStorageRef, profileImage)
              .then((snapshot) => {
                console.log(snapshot);  
                getDownloadURL(snapshot.ref).then((url)=>{
                    console.log("url of the image is "+url);
                    setProfileImageurl(url)
                })
                           
             
            })
            
            
            
            // function to add user details to firestore

            let date = new Date()

            try {
                await addDoc(userRef, {
                    username: name,
                    Id: auth.currentUser.uid,
                    email: email,
                    phoneNumber: phone,
                    joinDate: date.toDateString(),
                    ProfileImage:profileImageurl
                }).then(() => {
                    console.log("user added to firestore")
                })
            } catch (error) {

            }
            alert(auth.currentUser.displayName + " your registeration is Successful")
        } catch (error) {
            console.log(error.message);
            wipeOutData()
            document.getElementById('ermessage').innerHTML = error.message
        }
    }
    const wipeOutData = () => {
        setName('')
        setPhone('')
        setEmail('')
        Setpassword('')
    }

    // console.log(auth?.currentUser)
    return (
        <div className='register'>
            <div className="register-box">
                <form action="" onSubmit={signIn}>
                    <div className="register-box-left">
                        <img src={register_logo} alt="" className='register-logo' />
                        <label htmlFor="">Full name</label>
                        <input
                            type="text"
                            placeholder='Full Name'
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                document.getElementById('ermessage').innerHTML = ""
                            }}
                            required />
                        <label htmlFor="">Phone number</label>
                        <input
                            type="tel"
                            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            maxLength={10}
                            placeholder='Phone Number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required />
                        <label htmlFor="">Email Address</label>
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            placeholder='password'
                            value={password}
                            onChange={(e) => Setpassword(e.target.value)}
                            required />
                    </div>
                    {/* <label htmlFor="">Confirm Password</label>
                    <input
                        type="password"
                        placeholder='password'
                        value={confirmPassword}
                        onChange={(e) => SetConfirmPassword(e.target.value)}
                        required />
                    </div> */}

                    <div className="register-box-right">
                        <label htmlFor="">Profile Picture</label>
                        <img src={profileImage ? URL.createObjectURL(profileImage) : defaultProfileImage} alt="" />
                        <input
                            type="file"
                            className='profile-image'
                            onChange={(e) => { setProfileImage(e.target.files[0]) }}
                            required />
                        <button className='btn-register' type='submit'>Register</button>
                        <h5>already have an account?  <Link to='/login'>Login</Link> </h5>
                        <h6><Link to='/' className='go-back'>Back to Home <i class="fa-solid fa-house"></i></Link></h6>
                        <h6 id='ermessage'></h6>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default Register
