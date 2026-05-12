import React from 'react';
import '../styles/Footer.css';
import facebookIcon from '../assets/facebook-app-round-white-icon.png';
import instagramIcon from '../assets/instagram-white-icon.png';
import youtubeIcon from '../assets/youtube-app-white-icon.png';

function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>Follow Us!</h3>
          <div className="footer-socials">
            <img src={facebookIcon} alt="Facebook" />
            <img src={instagramIcon} alt="Instagram" />
            <img src={youtubeIcon} alt="YouTube" />
            <span className="social-link">𝕏</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p>&copy; 2026 GobsmackKitty LLC. All rights reserved.</p>
          <a href="#terms">Terms & Conditions</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
        <div className="footer-bottom-right">
          <a href="#do-not-sell">DO NOT SELL OUR INFORMATION</a>
          <p>gobbsmackkitty.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;