import { useState } from 'react'
import './PasswordUpdate.css'
import { Link } from 'react-router-dom'
import profileImage from './profile.png'
import { auth } from '../../firebase/config'
import { updatePassword, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


function PasswordUpdate() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate=useNavigate()

    onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user !== null) {
            console.log(user);
            setUser(user)
        } else {
            // alert("no user")
            console.log("no user")
            alert("update not possible at the moment")
        }
    })


    const updatepass = (e) => {
        e.preventDefault()

        console.log("inside updatepass ")
        if (password === confirmPassword) {
            console.log(" same password")
            updatePassword(user, password).then(() => {
                console.log("password updated");
                setPassword("")
                setConfirmPassword("")
                navigate('/profile')
                alert("Password Updated successfully")
            }).catch((err) => {
                console.log(err.message)
            })
        } else {
            setPassword("")
            setConfirmPassword("")
            alert("Passwords doesn't match")
            console.log("not same")
        }

    }
 

    return (
        <div className='update-form'>
            <div className="update-form-box">
                <form action="">
                    <img src={profileImage} alt="" />
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'
                        required />
                    <button onClick={updatepass} className='btn-update'>Update</button>

                    <h6 className='go-back'><Link to='/profile' className='go-back'>Back to Profile <i class="fa-solid fa-address-card"></i></Link></h6>

                </form>
            </div>
        </div>
    )
}

export default PasswordUpdate
