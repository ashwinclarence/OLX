import React, { useEffect, useState } from 'react'
import './MyProducts.css'
import '../Posts/Posts.css'
import profileImage from '../Profile/profile.png'
import { Link } from 'react-router-dom'
import { getDocs } from 'firebase/firestore';
import { auth, itemRef, userRef } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';


function MyProducts() {
    const [products, setProducts] = useState([]);
    const [username, SetUsername] = useState('')
    const [location, setLocation] = useState('')
    const [phone, setPhone] = useState('')
    const [joinDate, setJoinDate] = useState('')
    const [userid, setUserid] = useState('')
    const [navUserProfile, setNavUserProfile] = useState('')
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
          }
        })
      })
        .catch(err => {
          console.log(err.message);
        })
    
  return (
    <div className="my-product-container">

          <div className="left-profile-box">
          <img src={navUserProfile ? navUserProfile : profileImage} alt="" />
          <h2>{username}</h2>
          <h6><i class="fa-regular fa-calendar"></i>Memeber since {joinDate}</h6>
          <h6><i class="fa-solid fa-location-dot"></i>{location}</h6>
          <h6><i class="fa-solid fa-phone"></i>{phone}</h6>
          <h6><i class="fa-solid fa-user-group"></i>40 followers</h6>
          </div>
          <div className="right-product-box">
          {products.map((product) => (
          <Link to='/view-product' state={{ id: product.id }}>
            <div key={product.id} className='post-box'>
              <div className='post-img'>
                <i className='fa-solid fa-heart'></i>
                <img src={product.productUrl} alt=''/>
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
