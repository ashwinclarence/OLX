import React, { useState } from 'react'
import './Login.css'
import register_logo from "./olx img.png"
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'

function Login() {
  let navigate=useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = async(e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth,username,password).then((userCredential)=>{
        alert('Welcome Back '+userCredential.user.displayName)
        navigate('/')
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className='login-form'>
      <div className="login-form-box">
        <form action="" onSubmit={login}>
          <img src={register_logo} alt="" />
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username / Email'
            required />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required />
          <button type='submit'  className='btn-login'>Login</button>

          <h5>New User? <Link to='/signup' className='navigate'> &nbsp;Register Here</Link></h5>
          <h6 className='go-back'><Link to='/' className='go-back'>Back to Home <i class="fa-solid fa-house"></i></Link></h6>

        </form>

      </div>
    </div>
  )
}

export default Login
