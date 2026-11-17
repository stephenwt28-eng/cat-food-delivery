import React, { useState } from 'react';
import profilePic from '../assets/cat_food_delivery_profilepic.png';
import shoppingCart from '../assets/shopping-cart.png';
import '../styles/Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearSession } from '../utils/auth';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const isLoggedIn = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
const isRestrictedRoute = ['/profile', '/login', '/signup'].includes(path);
const isLoggedInLandingPage = path === '/logged-in-landing';
const isReturningMember = path === '/returning-member';
const isBuildPlanPage = path === '/build-plan';
const isReviewPlanPage = path === '/review-plan';
const isCheckoutPage = path === '/checkout';
const isOrderConfirmPage = path === '/orderconfirm';

const cartDisabled = isRestrictedRoute || isBuildPlanPage || isReviewPlanPage || isCheckoutPage || isOrderConfirmPage;
const profileDisabled = isRestrictedRoute || isCheckoutPage;

const profileLink = (isLoggedInLandingPage || isReturningMember || isBuildPlanPage || isReviewPlanPage || isOrderConfirmPage)
  ? "/profile"
  : "/login";
const cartLink = isLoggedInLandingPage
  ? "/build-plan"
  : isReturningMember
    ? "/review-plan"
    : "/login";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    clearSession();
    setIsMenuOpen(false);
    navigate('/');
  };

  const menuItems = isLoggedIn
    ? [
        { label: 'Home', to: '/' },
        { label: 'Your Account', to: '/profile' },
        { label: 'Your Order', to: '/review-plan' },
        { label: 'Who We Are', to: '/#who-we-are' },
        { label: 'Help', to: '/#help' },
        { label: 'Log out', onClick: handleLogout },
      ]
    : [
        { label: 'Home', to: '/' },
        { label: 'Who We Are', to: '/#who-we-are' },
        { label: 'Help', to: '/#help' },
        { label: 'Sign in', to: '/login' },
      ];

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
  {cartDisabled ? (
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
{profileDisabled ? (
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
          {menuItems.map((item) =>
            item.onClick ? (
              <button
                key={item.label}
                type="button"
                className="menu-item"
                onClick={item.onClick}
              >
                {item.label}
              </button>
            ) : (
              <Link key={item.label} to={item.to} className="menu-item" onClick={toggleMenu}>
                {item.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;