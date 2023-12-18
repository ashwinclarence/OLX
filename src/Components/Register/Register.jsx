import React, { useState } from 'react'
import './Register.css'
import register_logo from "./olx img.png"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { auth, userRef } from '../../firebase/config'
import { addDoc } from 'firebase/firestore'

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, Setpassword] = useState('')
    const [registeruserid, Setregisteruserid] = useState('')
    
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
        
        // function to add user details to firestore

        let date=new Date()

       try {
        await addDoc(userRef,{
            username:name,
            Id:auth.currentUser.uid,
            email:email,
            phoneNumber:phone,
            joinDate:date.toDateString()
        }).then(()=>{
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
    <div className='Registeration-page'>
        <div className="register-box">
            <form action="">
                <img src={register_logo} alt="" />
                <input
                    type="text"
                    placeholder='Full Name'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        document.getElementById('ermessage').innerHTML = ""
                    }}
                    required />
                <input
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    maxLength={10}
                    placeholder='Phone Number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required />
                <input
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <input
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={(e) => Setpassword(e.target.value)}
                    required />
                <button className='btn-register' onClick={signIn}>Register</button>
                <h5>already have an account?  <Link to='/login'>Login</Link> </h5>
                <h6><Link to='/' className='go-back'>Back to Home <i class="fa-solid fa-house"></i></Link></h6>
                <h6 id='ermessage'></h6>
            </form>
        </div>
    </div>
)
}

export default Register
