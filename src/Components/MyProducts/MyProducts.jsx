import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom/dist'
import './MyProducts.css'
import '../Posts/Posts.css'
import profileImage from '../Profile/profile.png'
import { Link } from 'react-router-dom'
import { getDocs } from 'firebase/firestore';
import { auth, itemRef, userRef } from '../../firebase/config';
import { onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';


function MyProducts() {
  const [products, setProducts] = useState([]);
  const [username, SetUsername] = useState('')
  const [location, setLocation] = useState('')
  const [mail, setmail] = useState('')
  const [phone, setPhone] = useState('')
  const [joinDate, setJoinDate] = useState('')
  const [userid, setUserid] = useState('')
  const [emailVerify, setEmailVerify] = useState(false)
  const [navUserProfile, setNavUserProfile] = useState('')
  const navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(itemRef);
        const allProducts = snapshot.docs
          .map((doc) => {
            if (doc.data().uploadedUserId === auth.currentUser.uid) {
              return {
                ...doc.data(),
                id: doc.id,
              };
            }
            return null; // Added to filter out non-matching documents
          })
          .filter((product) => product !== null); // Filter out null values

        setProducts(allProducts);

      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData(); // Call the async function
  }, []);


  onAuthStateChanged(auth, (user) => {
    try {

      SetUsername(user.displayName)
      setUserid(user.uid)
      if (user.emailVerified) {
        setEmailVerify(true)

      } else {
        setEmailVerify(false)
      }
    } catch (error) {
      console.log(error);
    }
  })
  // function get current user information from firebase
  getDocs(userRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if (userid === doc.data().Id) {
        setNavUserProfile(doc.data().ProfileImage)
        setJoinDate(doc.data().joinDate)
        setLocation(doc.data().location)
        setPhone(doc.data().phoneNumber)
        setmail(doc.data().email)
      }
    })
  })
    .catch(err => {
      console.log(err.message);
    })


    //function to send user verification email
  const verifyEmail = async (e) => {
    e.preventDefault()
    await sendEmailVerification(auth.currentUser).then(() => {
      alert("verification mail send")
    }).catch((err) => {
      console.log(err.message);
      alert("Error Ocuured while sending mail. Please try after sometime..")
    })
  }
  // function to send alert about already verified email
  const verfiedEmailAlert = (e) => {
    e.preventDefault()
    alert("Your email is already verfied")
  }
  // function to logout
  const logout = async (e) => {
    e.preventDefault()
    try {
      await signOut(auth).then(() => {
        console.log('signed out');
        navigate('/login')
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  // delete user from database
  const confirmDelete = (e) => {
    e.preventDefault()
    try {
      const confirmBox = window.confirm(
        `${username} Are you sure want to delete your account?`
      )
      if (confirmBox === true) {
       alert("clicked yes")
       navigate('/')
      }else{
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="my-product-container">

      <div className="left-profile-box">
      
          <img src={navUserProfile ? navUserProfile : profileImage} alt="" />
          <h2>{username}</h2>
          <h6><i class="fa-regular fa-calendar"></i>Memeber since {joinDate}</h6>
          <h6><i class="fa-solid fa-location-dot"></i>{location}</h6>
          <h6><i class="fa-solid fa-envelope"></i>{mail}</h6>
          <h6><i class="fa-solid fa-phone"></i>{phone}</h6>
          <h6><i class="fa-solid fa-user-group"></i>40 followers | 50 following</h6>
          {/* <button>Follow <i class="fa-solid fa-plus"></i></button> */}
          <button>Share Profile <i class="fa-solid fa-share"></i></button>
        {emailVerify?<button onClick={verfiedEmailAlert}>verifiy mail</button>:<button onClick={verifyEmail}>verifiy mail</button>}  
          <button onClick={logout}>Logout </button>
          <button onClick={confirmDelete}>Delete Account </button>
       
    
       
      </div>
      <div className="right-product-box">
        {products.map((product) => (
          <Link to='/view-product' state={{ id: product.id }}>
            <div key={product.id} className='post-box'>
              <div className='post-img'>
                <i className='fa-solid fa-heart'></i>
                <img src={product.productUrl} alt='' />
              </div>
              <div className='post-content'>
                <ul>
                  <li className='product-price'>
                    <i className='fa-solid fa-indian-rupee-sign'></i>
                    &nbsp;&nbsp;{product.productPrice.toLocaleString()}
                  </li>
                  <li className='product-name'>{product.productName}</li>
                  {product.productDescription.length > 70 ? <li className='product-description'>{product.productDescription.slice(0, 70)}...</li> : <li className='product-description'>{product.productDescription.slice(0, 70)}</li>}

                  <li className='product-uploaded-time'>{product.uploadedTime}</li>
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MyProducts
