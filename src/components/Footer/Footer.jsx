import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'


const Footer = () => {
    return (
        <div className='footer' id='footer'>

            <div className='footer-content'>
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Food so good, it's worth the calorie splurge.
                        Flavors that make your taste buds dance.
                        Eating is a necessity, but dining is an art form.
                        Life's too short to skip dessert.</p>

                        <div className='footer-social-icon'>
                              <img src={assets.twitter_icon} alt="" />
                              <img src={assets.facebook_icon} alt="" />
                              <img src={assets.linkedin_icon} alt="" />
                        </div>
                </div>
                <div className="footer-content-center">
                      <h2>COMPANY</h2>
                      <ul>
                          <li>Home</li>
                          <li>About Us</li>
                          <li>Privacy Policy</li>
                          <li>Delivery</li>
                      </ul>
                </div>
                <div className="footer-content-right">
                     <h2>GET IN TOUCH</h2>
                     <ul>
                        <li>+1-212-456-978</li>
                        <li>contact@taomato.com</li>
                     </ul>
                </div>

            </div>
            <hr />
            <p className='footer-copyright'>Copyright 2024 @ Tomato.com - All Right Reserved</p>

        </div>
    )
}

export default Footer