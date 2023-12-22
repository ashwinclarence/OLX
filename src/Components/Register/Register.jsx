import React, { useState } from 'react'
import './Register.css'
import register_logo from "./olx img.png"
import defaultProfileImage from './profile.png'
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { auth, userRef, storage } from '../../firebase/config'
import { addDoc } from 'firebase/firestore'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [password, Setpassword] = useState('')
    const [confirmPassword, SetConfirmPassword] = useState('')
    const [profileImage, setProfileImage] = useState('')


    // function to sign-in
    const signIn = async (e) => {
        e.preventDefault();

        try {
            if (password === confirmPassword) {
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

                //function to send user verification email
                await sendEmailVerification(auth.currentUser)
                // function to add profile image to firestorage
                const imageStorageRef = ref(storage, `userImage/${auth.currentUser.uid}`)
                await uploadBytes(imageStorageRef, profileImage)
                    .then((snapshot) => {
                        console.log(snapshot);
                        // function to generate the url of current uploaded image 
                        getDownloadURL(snapshot.ref).then((url) => {
                            console.log("url of the image is " + url);
                            const docData = {
                                username: "name",
                                Id: "authcurrentUseruid",
                                email: "email",
                                phoneNumber: 123456,
                                joinDate: 123456,
                                ProfileImage: "url",
                                reportCount: 0,
                                location:"location"
                            }
                            // function to add user details to firestore
                            addDoc(userRef, {
                                username: name,
                                Id: auth.currentUser.uid,
                                email: email,
                                phoneNumber: phone,
                                joinDate: Date.now(),
                                ProfileImage: url,
                                reportCount: 0,
                                location
                            }, docData).then(() => {
                                console.log("user added to firestore")
                            })
                        })
                    })
                alert(auth.currentUser.displayName + " your registeration is Successful")

            } else {
                document.getElementById('ermessage').innerHTML = "yours passwords doesn't match try again"
                Setpassword("")
                SetConfirmPassword("")
            }



        } catch (error) {
            console.log(error.message);
            wipeOutData()
            document.getElementById('ermessage').innerHTML = error.message
        }
    }
    const wipeOutData = () => {
        setName('')
        setPhone('')
        setLocation('')
        setEmail('')
        Setpassword('')
        SetConfirmPassword('')
        setProfileImage('')
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
                        <label htmlFor="">Location</label>
                        <select
                            name="product-category"
                            id="product-category"
                            required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)} >
                            <option value=''>Choose location</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
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
                        <label htmlFor="">Confirm Password</label>
                        <input
                            type="password"
                            placeholder='confirm password'
                            value={confirmPassword}
                            onChange={(e) => SetConfirmPassword(e.target.value)}
                            required />
                    </div>

                    <div className="register-box-right">
                        <label htmlFor="">Profile Picture</label>
                        <img src={profileImage ? URL.createObjectURL(profileImage) : defaultProfileImage} alt="" />
                        <input
                            type="file"
                            className='profile-image'
                            onChange={(e) => { setProfileImage(e.target.files[0]) }}
                            required />
                        <button className='btn-register' type='submit'>Register</button>
                        <label htmlFor="">already have an account?  <Link to='/login'>Login</Link></label>
                        {/* <h5>already have an account?  <Link to='/login'>Login</Link> </h5> */}
                        {/* <h6></h6> */}
                        <h6 id='ermessage'><Link to='/' className='go-back'>Back to Home <i class="fa-solid fa-house"></i></Link></h6>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default Register
