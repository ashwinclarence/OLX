import React, { useState } from 'react'
import './Register.css'
import register_logo from "./olx img.png"


function Register() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, Setpassword] = useState('')
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
                    <button className='btn-register'>Register</button>
                </form>

            </div>

        </div>
    )
}

export default Register
