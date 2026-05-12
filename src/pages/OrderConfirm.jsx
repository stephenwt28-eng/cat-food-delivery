import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/OrderConfirm.css';

const OrderConfirm = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    cart: {},
    orderNum: '',
    orderDate: '',
    deliveryDate: ''
  });

  const addBusinessDays = (startDate, days) => {
    const result = new Date(startDate);
    let added = 0;
    while (added < days) {
      result.setDate(result.getDate() + 1);
      if (result.getDay() !== 0 && result.getDay() !== 6) {
        added++;
      }
    }
    return result;
  };

  useEffect(() => {
  const year = new Date().getFullYear();
  const orderNum = `#ORD-${year}-${Math.floor(1000 + Math.random() * 9000).toString().padStart(4, '0')}`;
  const orderDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
  const businessDays = 5 + Math.floor(Math.random() * 3);
  const deliveryDate = addBusinessDays(new Date(), businessDays).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  let cart = [];
  try {
    const cartStr = localStorage.getItem('cart');
    if (cartStr) {
      cart = JSON.parse(cartStr);
    }
  } catch (error) {
    console.error('Failed to parse cart from localStorage:', error);
  }

  // SAVE to lastOrder but DON'T delete cart yet
  localStorage.setItem('lastOrder', JSON.stringify(cart));
  // localStorage.removeItem('cart');  // DELETE THIS LINE

  setOrderData({ cart, orderNum, orderDate, deliveryDate });
}, []);

  const { cart, orderNum, orderDate, deliveryDate } = orderData;

  return (
    <div className="firstorder-container">
      <div className="hero-box">
        <button
  className="btn btn-secondary home-button"
  onClick={() => navigate('/returning-member')}
>
          Home
        </button>
        <h2>Plan Confirmed!</h2>
        <p>
          Hooray, sorted! This is the beginning of something beautiful, for your cat's new favorite meal is on its way!
          We have confirmed your subscription and can't wait to delight your furry friend!
        </p>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p><strong>Order Number:</strong> {orderNum}</p>
          <p><strong>Order Date:</strong> {orderDate}</p>
          <p><strong>Estimated Delivery:</strong> {deliveryDate}</p>
          <div className="items-summary">
            {cart.meats?.length > 0 && (
  <p><strong>Meats:</strong> {cart.meats.map(m => m.name).join(', ')}</p>
)}
            {cart.veggies?.length > 0 && (
  <p><strong>Veggies:</strong> {cart.veggies.map(v => v.name).join(', ')}</p>
)}
            {cart.supplements?.length > 0 && (
  <p><strong>Supplements:</strong> {cart.supplements.map(s => s.name).join(', ')}</p>
)}
            {cart.container?.length > 0 && (
  <p><strong>Container:</strong> {cart.container.map(c => c.name).join(', ')}</p>
)}
            {cart.frequency?.length > 0 && (
  <p><strong>Frequency:</strong> {cart.frequency.map(f => f.name).join(', ')}</p>
)}
          </div>
        </div>
       
        <div className="review-button-container">
  <button
    className="btn btn-primary"
    onClick={() => navigate('/review-plan')}
  >
    Review Your Plan
  </button>
</div>
      </div>
    </div>
  );
};

export default OrderConfirm;
