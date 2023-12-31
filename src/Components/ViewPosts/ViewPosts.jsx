import React, { useEffect, useState } from 'react'
import './ViewPosts.css'
import testimg from './profile.png'
import { useLocation } from 'react-router-dom'
import { arrayUnion, doc, getDoc, getDocs, increment, updateDoc } from 'firebase/firestore'
import { auth, db, userRef } from '../../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


function ViewPosts() {
  const [eachProduct, setEachProduct] = useState([])
  const [productSeller, setProductSeller] = useState([])
  const [price, setprice] = useState(0)
  const [userStatus, setUserStatus] = useState(false)
  const navigate = useNavigate()
  let { state } = useLocation()
  const eachDocRef = doc(db, "item", state.id);
  useEffect(() => {

    getDoc(eachDocRef).then((snapshot) => {
      const eachProductData = snapshot.data();
      setEachProduct(eachProductData);

      getDocs(userRef).then((userDocs) => {
        userDocs.docs.forEach((userDoc) => {
          const userData = userDoc.data();
          if (eachProductData.uploadedUserId === userData.Id) {
            setProductSeller(userData);
          }
        });
      });
    });
  }, []);


  useEffect(() => {
    if (eachProduct && eachProduct.productPrice) {
      let num = eachProduct.productPrice.toLocaleString();
      setprice(num);
    }
  }, [eachProduct]);



  onAuthStateChanged(auth, (user) => {
    try {
      if (user) {
        setUserStatus(true)


      } else {
        setUserStatus(false)
      }
    } catch (error) {
      console.log(error);
    }
  })

  const callSeller = () => {
    if (userStatus) {
      const confirmBox = window.confirm(
        `Do you really want to call ${productSeller.username}?`
      )
      if (confirmBox === true) {
        const telLink = `tel:${productSeller.phoneNumber}`;
        window.location.href = telLink;
      }

    } else {
      navigate('/login')
    }

  }

  const report = async (e) => {
    e.preventDefault()
    try {
      if (auth.currentUser.uid !== productSeller.Id) {

        let alreadyReport = true
        if (eachProduct.reportedUserId !== '') {
          eachProduct.reportedUserId.map((obj) => {
            console.log(obj);
            if (obj === auth.currentUser.uid) {
              alreadyReport = false
            }
            return 0
          })
        }
        if (alreadyReport) {
          await updateDoc(eachDocRef, {
            reportnum: increment(1),
            reportedUserId: arrayUnion(auth.currentUser.uid)
          });
          alert("reported")
          window.location.reload(false)
        } else {
          alert("already reported")
        }

      } else {
        alert("this is your product")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const visibility=()=>{
    document.getElementById('action-box').style.visibility= 'visible'
    document.getElementById('action-box-mini').style.display= 'none'
  }




  return (
    <div className='view-post-container'>
      <div className="view-post-row">
        <div className="view-post-left">
          <div className="image-box">
            <img className='product-img' src={eachProduct.productUrl} alt="" />
          </div>
          <div className="description-box">
            <h3>Description</h3>
            <h5>{eachProduct.productDescription}</h5>
          </div>
          <div className="similar-add">
          </div>
        </div>
        <div className="view-post-right">
          <div className="price-box">
            <div className="price-box-row-one">
              <h2 ><i class="fa-solid fa-indian-rupee-sign"></i> {price}</h2>
              <h2><i class="fa-solid fa-heart"></i><i class="fa-solid fa-share-nodes"></i></h2>
            </div>
            <h4>{eachProduct.productName}</h4>
            <h5 className='posted-date'>{eachProduct.uploadedTime}</h5>
          </div>
          <div className="seller-box">
            <div className="seller-box-inner">
              {userStatus ? <img src={productSeller.ProfileImage} alt="" /> : <img src={testimg} alt="" />}
              {userStatus ? <h4>{productSeller.username}</h4> : <h4>Seller Details</h4>}
            </div>
            <button onClick={callSeller} className='call-btn' ><i class="fa-solid fa-phone"></i> Call the seller</button>
            {userStatus ? <h4>{productSeller.phoneNumber} | {productSeller.location}</h4> : <h4>+91-xxxx-xxxxxx | <i class="fa-solid fa-location-pin-lock"></i></h4>}
          </div>
          <div className="contact-box">
            <h4>Location to get the product</h4>
            <h1>{eachProduct.location}</h1>
          </div>
          <div className="action-box-mini" id='action-box-mini'>
            <h5 onClick={visibility}>Report this add</h5>
          </div>
          <div className="action-box" id='action-box'>
            <form action="" onSubmit={report}>
              <div>
                <textarea
                  className='product-report'
                  placeholder='Reason for reporting the product'
                  minLength={50}
                  maxLength={300}
                >
                </textarea>
              </div>

              <div>
                <button type='submit'>Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPosts
