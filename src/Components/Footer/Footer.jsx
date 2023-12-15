import React from 'react'
import './Footer.css'
import googleplay from './google-play-badge.png'
import appstore from './Download_on_the_App_Store_Badge.svg'
function Footer() {
  return (
    <div className='footer'>
      
       <ul className='footer-row'>
        <li>
            <ul className='footer-column'>
                <li className='footer-header'>Popular location</li>
                <li>Kolkata</li>
                <li>Mumbai</li>
                <li>Chennai</li>
                <li>Pune</li>
            </ul>
        </li>
        <li>
            <ul className='footer-column'>
                <li className='footer-header'>Trending location</li>
                <li>Kolkata</li>
                <li>Mumbai</li>
                <li>Chennai</li>
                <li>Pune</li>
            </ul>
        </li>
        <li>
            <ul className='footer-column'>
                <li className='footer-header'>About us</li>
                <li>Contact Us</li>
            </ul>
        </li>
        <li>
            <ul className='footer-column'>
                <li className='footer-header'>OLX</li>
                <li>Help</li>
                <li>SiteMap</li>
                <li>Legal & Privacy information</li>
                <li>Vulnerability Disclosure Program</li>
            </ul>
        </li>
        <li>
            <ul className='footer-column followus'>
                <li className='footer-header'>Follow us</li>
                <li><i class="fa-brands fa-facebook-f"></i><i class="fa-brands fa-instagram"></i><i class="fa-brands fa-twitter"></i><i class="fa-brands fa-youtube"></i></li>
                <li><img src={googleplay} alt="" /><img src={appstore} alt="" /></li>
            </ul>
        </li>
       </ul>
       <div className="copright">
        <ul>
            <li><h5>Help-sitemap</h5></li>
            <li><h5>All rights reserved &#169; 2006-2023 OLX</h5></li>
        </ul>
       </div>
      </div>

  )
}

export default Footer
