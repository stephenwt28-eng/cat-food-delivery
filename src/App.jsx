import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LoggedInLandingPage from './pages/LoggedInLandingPage';
import ProfilePage from '/src/pages/ProfilePage.jsx';
import FirstOrder from './pages/FirstOrder';
import Checkout from './pages/Checkout';
import OrderConfirm from './pages/OrderConfirm';
import ReturningMember from './pages/ReturningMember';
import ReviewPlan from './pages/ReviewPlan';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Protected Route Component (placeholder for future use)
const ProtectedRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// NotFound Component (simple 404)
const NotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Example useEffect for state management (can be expanded later)
  useEffect(() => {
    // Simulate checking login status or cart from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    const count = parseInt(localStorage.getItem('cartCount') || '0');
    setCartCount(count);
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar isLoggedIn={isLoggedIn} cartCount={cartCount} />
          <main style={{ flex: 1, paddingTop: '70px' }}> {/* Adjust padding for fixed navbar */}
            <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/logged-in-landing" element={<LoggedInLandingPage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/build-plan" element={<FirstOrder />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/orderconfirm" element={<OrderConfirm />} />
  <Route path="/returning-member" element={<ReturningMember />} />
  <Route path="/review-plan" element={<ReviewPlan />} />
  <Route path="*" element={<NotFound />} />
</Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;