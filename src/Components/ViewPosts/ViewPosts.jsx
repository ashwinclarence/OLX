import React from 'react'
import './ViewPosts.css'
import testimg from './closecartbg.png'

function ViewPosts() {
  return (
    <div className='view-post-container'>
      <div className="view-post-row">
        <div className="view-post-left">
          <div className="image-box">
            <img src={testimg} alt="" />
          </div>
          <div className="description-box">
            <h3>Description</h3>
            <h5>I’m not bored or anything but what I feel like doing right now is standing up, stepping into a lift, descending at high speed to ground level, tip-toeing through a fire door, pausing beside the Thames, crossing a footbridge, trudging through endless suburbs, walking up a hill, conceiving a dislike for Kent, sleeping in a wet haystack, waking up with a headache, cadging a cup of tea, scrambling over a ridge, spotting the sea, sniffing the salt air, loafing around a port, sneaking up a gang-plank,</h5>
          </div>
        </div>
        <div className="view-post-right">
          <div className="price-box">
            <h2 ><i class="fa-solid fa-indian-rupee-sign"></i> 2500 /-</h2>
            <h4>iPhone 12 pro max</h4>
            <h4>posted date</h4>
          </div>
          <div className="seller-box">
            <div className="seller-box-inner">
            <img src={testimg} alt="" />
            <h4>product seller name</h4>
            </div>
            <button className='call-btn'><i class="fa-solid fa-phone"></i> chat with seller</button>
          </div>
          <div className="contact-box">
            <h4>Location</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPosts
