import React, { useState } from 'react'
import './Register.css'
import register_logo from "./olx img.png"
import {Link} from "react-router-dom"
import {createUserWithEmailAndPassword,sendEmailVerification} from 'firebase/auth'
import {auth} from '../../firebase/config'

function Register() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, Setpassword] = useState('')

    // function to sign-in
    const signIn=async(e)=>{
        e.preventDefault();
       try {
        await createUserWithEmailAndPassword(auth,email,password).then((result)=>{
            console.log(result);
        })
        await sendEmailVerification(auth.currentUser)
        setName('')
        setPhone('')
        setEmail('')
        Setpassword('')
        alert("registeration Successful")
       } catch (error) {
        console.log(error);
        alert(error)
       }
    }
    

    console.log(auth?.currentUser)
    return (
        <div className='Registeration-page'>
            <div className="register-box">
                <form action="">
                    <img src={register_logo} alt="" />
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <h6><Link to='/' className='go-back'>Back to Home</Link></h6>
                </form>
            </div>
        </div>
    )
}

export default Register
