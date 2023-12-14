import React, { useState } from 'react'
import './Login.css'
import register_logo from "./olx img.png"


function Login() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
  return (
    <div className='login-form'>
      <div className="login-form-box">
      <form action="">
      <img src={register_logo} alt="" />
        <input 
        type="email" 
        value={username} 
        onChange={(e)=>setUsername(e.target.value)}
        placeholder='Username / Email'
        required/>
        <input 
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder='Password' 
        required/>
        <button className='btn-login'>Login</button>
      </form>

      </div>
    </div>
  )
}

export default Login