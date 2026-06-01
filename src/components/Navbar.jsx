import React, { useState, useEffect } from 'react';
import profilePic from '../assets/cat_food_delivery_profilepic.png';
import shoppingCart from '../assets/shopping-cart.png';
import '../styles/Navbar.css';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isRestrictedRoute = ['/profile', '/login', '/signup'].includes(location.pathname);
  const isLandingPage = location.pathname === '/';
const isLoggedInLandingPage = location.pathname === '/logged-in-landing';
const isReturningMember = location.pathname === '/returning-member';
const isReviewPlanPage = location.pathname === '/review-plan';
const isCheckoutPage = location.pathname === '/checkout';
const isOrderConfirmPage = location.pathname === '/orderconfirm';
const profileLink = (isLoggedInLandingPage || isReturningMember)
  ? "/profile"
  : "/login";
const cartLink = (isLoggedInLandingPage || isReturningMember) 
  ? (isReturningMember ? "/review-plan" : "/build-plan")
  : "/login";

  console.log('DEBUG - isLoggedIn:', isLoggedIn, 'isReturningMember:', isReturningMember, 'cartLink:', cartLink);

  useEffect(() => {
  const isLoggedInStorage = localStorage.getItem('isLoggedIn') === 'true';
  const loginToken = localStorage.getItem('loginToken') === 'true';
  setIsLoggedIn(isLoggedInStorage || loginToken);
}, [location.key]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = isLoggedIn
    ? ['Home', 'Your Account', 'Your Order', 'Who We Are', 'Help', 'Log out']
    : ['Home', 'Who We Are', 'Help', 'Sign in'];

  return (
    <header className="site-header">
      <div className="container navbar-content">
        <div className="brand">
          <h1>RA&A ®</h1>
        </div>

        <nav className="desktop-nav" aria-label="Primary">
          {/* Removed Features, About, Contact */}
        </nav>

        <div className="navbar-icons">
  {isRestrictedRoute || isReviewPlanPage || isCheckoutPage || isOrderConfirmPage ? (
  <button className="icon-button cart-button" aria-label="Shopping cart" disabled>
    <img src={shoppingCart} alt="Cart" className="cart-icon" />
  </button>
) : (
  <Link to={cartLink}>
    <button className="icon-button cart-button" aria-label="Shopping cart">
      <img src={shoppingCart} alt="Cart" className="cart-icon" />
    </button>
  </Link>
)}
  {isRestrictedRoute || isReviewPlanPage || isCheckoutPage ? (
  <button className="icon-button user-button" aria-label="User account" disabled>
    <img src={profilePic} alt="User profile" className="profile-icon" />
  </button>
) : (
  <Link to={profileLink}>
    <button className="icon-button user-button" aria-label="User account">
      <img src={profilePic} alt="User profile" className="profile-icon" />
    </button>
  </Link>
)}
          <button
            className="menu-button"
            onClick={toggleMenu}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="dropdown-menu" aria-label="Mobile menu">
          {menuItems.map((item, index) => 
            item === 'Sign in' ? (
              <Link key={index} to="/login" className="menu-item" onClick={toggleMenu}>
                Sign in
              </Link>
            ) : (
              <a
                key={index}
                href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                className="menu-item"
                onClick={toggleMenu}
              >
                {item}
              </a>
            )
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;