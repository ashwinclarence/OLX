import React, { useState } from 'react'

function Login() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
  return (
    <div className='login-form'>
      <form action="">
        <input 
        type="text" 
        value={username} 
        onChange={(e)=>setUsername(e.target.value)}
        placeholder='Username'/>
        <input 
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder='Password' />
      </form>
    </div>
  )
}

export default Login
