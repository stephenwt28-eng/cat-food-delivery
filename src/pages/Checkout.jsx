import React, { useState, useEffect } from 'react';
import '../styles/Checkout.css';

const Checkout = () => {

  const [address, setAddress] = useState(() => localStorage.getItem('loginAddress') || '');
const [city, setCity] = useState(() => localStorage.getItem('loginCity') || '');
const [state, setState] = useState(() => localStorage.getItem('loginState') || '');
const [zip, setZip] = useState(() => localStorage.getItem('loginZip') || '');
const [addressCountry, setAddressCountry] = useState(() => localStorage.getItem('loginAddressCountry') || 'United States');

  const [customizations, setCustomizations] = useState({
    meats: [],
    veggies: [],
    supplements: [],
    container: [],
    frequency: []
  });

  const [savedCards, setSavedCards] = useState([]);
const [selectedCardId, setSelectedCardId] = useState(null);

useEffect(() => {
  const handleStorageChange = () => {
    setAddress(localStorage.getItem('loginAddress') || '');
    setCity(localStorage.getItem('loginCity') || '');
    setState(localStorage.getItem('loginState') || '');
    setZip(localStorage.getItem('loginZip') || '');
    setAddressCountry(localStorage.getItem('loginAddressCountry') || '');
  };

  window.addEventListener('storage', handleStorageChange);
  
  // Load on mount
  handleStorageChange();

  return () => window.removeEventListener('storage', handleStorageChange);
}, []);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      setCustomizations(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
  try {
    const cards = JSON.parse(localStorage.getItem('cards') || '[]');
    setSavedCards(cards);
    if (cards.length > 0) {
      setSelectedCardId(cards[0].id);
    }
  } catch (e) {
    console.error('Error loading cards:', e);
  }
}, []);

useEffect(() => {
  const savedAddress = localStorage.getItem('loginAddress');
  const savedCity = localStorage.getItem('loginCity');
  const savedState = localStorage.getItem('loginState');
  const savedZip = localStorage.getItem('loginZip');
  const savedAddressCountry = localStorage.getItem('loginAddressCountry');

  if (savedAddress) setAddress(savedAddress);
  if (savedCity) setCity(savedCity);
  if (savedState) setState(savedState);
  if (savedZip) setZip(savedZip);
  if (savedAddressCountry) setAddressCountry(savedAddressCountry);
}, []);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const getNames = (items) => items.map(item => item.name).join(', ');

  const getCategoryTotal = (items) => 
    items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0).toFixed(2);

  const categories = ['meats', 'veggies', 'supplements', 'container', 'frequency'];

  const hasItems = (cat) => customizations[cat]?.length > 0;

  const categoryTotals = {};
  categories.forEach(cat => {
    if (hasItems(cat)) {
      categoryTotals[cat] = getCategoryTotal(customizations[cat]);
    }
  });

  const subtotal = categories
    .filter(hasItems)
    .reduce((sum, cat) => sum + parseFloat(categoryTotals[cat] || 0), 0)
    .toFixed(2);

  const grandTotal = subtotal;

  const handleBack = () => {
    window.history.back();
  };

  const handlePlaceOrder = () => {
  localStorage.setItem('cards', JSON.stringify(savedCards));
  window.location.href = '/orderconfirm';
};

const updateCard = (id, field, value) => {
  const updated = savedCards.map(card => card.id === id ? { ...card, [field]: value } : card);
  setSavedCards(updated);
};

const selectCard = (id) => {
  setSelectedCardId(id);
};

const selectedCard = savedCards.find(card => card.id === selectedCardId);
const addressIsComplete = address.trim() !== '' && city.trim() !== '' && state.trim() !== '' && zip.trim() !== '' && addressCountry.trim() !== '';
const canPlaceOrder = addressIsComplete && selectedCard && selectedCard.number && selectedCard.expiry && selectedCard.cvv && selectedCard.name;

const addCard = () => {
  const newCard = { 
    id: Date.now(), 
    number: '', 
    expiry: '', 
    cvv: '', 
    name: '' 
  };
  setSavedCards(prev => [...prev, newCard]);
};

const saveCards = () => {
  localStorage.setItem('cards', JSON.stringify(savedCards));
};

  return (
    <div className="checkout-container">
      <div className="checkout-box customizations-box">
        <button className="btn btn-secondary" onClick={handleBack}>
    Back
  </button>
        <h2>{customizations.catName ? `${customizations.catName}'s Customizations` : 'Your Customizations'}</h2>
        {categories
  .filter(hasItems)
  .map(cat => (
    <div key={cat}>
      {capitalize(cat)}: {getNames(customizations[cat])}
    </div>
  ))}
      </div>

      <div 
        className="reviews-section" 
        style={{ background: 'linear-gradient(135deg, #fcecd2 0%, #fcb69f 100%)' }}
      >
        <h2 style={{ textAlign: 'center' }}>What Cat Parents Are Saying</h2>
        <div className="review-cards">
          <div className="review-card">
            <div style={{ color: '#FFD700', fontSize: '1.2em' }}>★★★★★</div>
            <blockquote style={{ fontStyle: 'italic', margin: '10px 0' }}>
              "My cat has never been more excited for mealtime!"
            </blockquote>
            <div style={{ fontWeight: 'bold' }}>- Xandra E.</div>
          </div>
          <div className="review-card">
            <div style={{ color: '#FFD700', fontSize: '1.2em' }}>★★★★★</div>
            <blockquote style={{ fontStyle: 'italic', margin: '10px 0' }}>
              “So convenient! The supplement mixing saves me so much hassle every day."
            </blockquote>
            <div style={{ fontWeight: 'bold' }}>- Smbok W.</div>
          </div>
        </div>
      </div>

      <div className="checkout-box price-breakdown-box">
  <h2>Price Breakdown</h2>
  {categories
  .filter(hasItems)
  .map(cat => (
    <div key={cat} className="breakdown-item">
      <span>{capitalize(cat)}:</span>
      <span>${categoryTotals[cat]}</span>
    </div>
  ))}
  <div className="breakdown-item subtotal">
    <span>Subtotal:</span>
    <span>${subtotal}</span>
  </div>
  <div className="breakdown-item total">
    <span>Grand Total:</span>
    <span>${grandTotal}</span>
  </div>

  {/* Address Section */}
<div style={{ marginBottom: '20px', marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
  <h3>Delivery Address</h3>

  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', marginBottom: '5px' }}>Address</label>
    <input
      type="text"
      placeholder="Enter your address"
      value={address}
      onChange={(e) => {
    setAddress(e.target.value);
    localStorage.setItem('loginAddress', e.target.value);
  }}
      style={{
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        boxSizing: 'border-box',
      }}
    />
  </div>

  <div style={{ display: 'flex', gap: '20px' }}>
    <div style={{ flex: 2 }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>City</label>
      <input
        type="text"
        placeholder="Enter your city"
        value={city}
        onChange={(e) => {
      setCity(e.target.value);
      localStorage.setItem('loginCity', e.target.value);
    }}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
          boxSizing: 'border-box',
        }}
      />
    </div>

    <div style={{ flex: 1 }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>State</label>
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => {
      setState(e.target.value);
      localStorage.setItem('loginState', e.target.value);
    }}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
          boxSizing: 'border-box',
        }}
      />
    </div>

    <div style={{ flex: 1 }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>Zip</label>
      <input
        type="text"
        placeholder="Zip code"
        value={zip}
        onChange={(e) => {
      setZip(e.target.value);
      localStorage.setItem('loginZip', e.target.value);
    }}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
          boxSizing: 'border-box',
        }}
        />
    </div>
  </div>

  <div style={{ marginTop: '20px' }}>
    <label style={{ display: 'block', marginBottom: '5px' }}>Country</label>
    <select
      value={addressCountry}
      onChange={(e) => {
    setAddressCountry(e.target.value);
    localStorage.setItem('loginAddressCountry', e.target.value);
  }}
      style={{
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        boxSizing: 'border-box',
      }}
    >
      <option value="United States">🇺🇸 United States</option>
      <option value="Canada">🇨🇦 Canada</option>
      <option value="United Kingdom">🇬🇧 United Kingdom</option>
      <option value="Algeria">🇩🇿 Algeria</option>
      <option value="Argentina">🇦🇷 Argentina</option>
      <option value="Australia">🇦🇺 Australia</option>
      <option value="Austria">🇦🇹 Austria</option>
      <option value="Belgium">🇧🇪 Belgium</option>
      <option value="Brazil">🇧🇷 Brazil</option>
      <option value="Bosnia & Herzegovina">🇧🇦 Bosnia & Herzegovina</option>
      <option value="Cabo Verde">🇨🇻 Cabo Verde</option>
      <option value="Colombia">🇨🇴 Colombia</option>
      <option value="Croatia">🇭🇷 Croatia</option>
      <option value="Curaçao">🇨🇼 Curaçao</option>
      <option value="Czech Republic">🇨🇿 Czech Republic</option>
      <option value="DR Congo">🇨🇩 DR Congo</option>
      <option value="Ecuador">🇪🇨 Ecuador</option>
      <option value="Egypt">🇪🇬 Egypt</option>
      <option value="France">🇫🇷 France</option>
      <option value="Germany">🇩🇪 Germany</option>
      <option value="Haiti">🇭🇹 Haiti</option>
      <option value="Iran">🇮🇷 Iran</option>
      <option value="Iraq">🇮🇶 Iraq</option>
      <option value="Italy">🇮🇹 Italy</option>
      <option value="Ivory Coast">🇨🇮 Ivory Coast</option>
      <option value="Japan">🇯🇵 Japan</option>
      <option value="Korea Republic">🇰🇷 Korea Republic</option>
      <option value="Mexico">🇲🇽 Mexico</option>
      <option value="Norway">🇳🇴 Norway</option>
      <option value="Panama">🇵🇦 Panama</option>
      <option value="Portugal">🇵🇹 Portugal</option>
      <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
      <option value="South Africa">🇿🇦 South Africa</option>
      <option value="Spain">🇪🇸 Spain</option>
      <option value="Sweden">🇸🇪 Sweden</option>
      <option value="Switzerland">🇨🇭 Switzerland</option>
      <option value="Turkey">🇹🇷 Turkey</option>
      <option value="Uruguay">🇺🇾 Uruguay</option>
      <option value="Uzbekistan">🇺🇿 Uzbekistan</option>
    </select>
  </div>
</div>

    <div className="saved-cards-section" style={{ marginBottom: '20px' }}>
  <h3>Payment Method</h3>
  {savedCards.length === 0 ? (
    <div>
  <p>No saved cards. Add one below or in your profile.</p>
  <div style={{ marginTop: '10px' }}>
    <button type="button" className="btn btn-primary" onClick={addCard} style={{ marginTop: '5px' }}>Add Card Now</button>
  </div>
  </div>
  ) : (
    <div>
      {/* Add Card and Save Cards - left aligned */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '0', marginBottom: '16px' }}>
        <button type="button" onClick={addCard} className="btn btn-primary">Add Card</button>
        <button type="button" onClick={saveCards} className="btn btn-primary">Save Cards</button>
      </div>

      {/* Cards section - the actual cards render here */}
      <div className="cards-section">
        {savedCards.map((card, index) => (
          <div
            key={card.id}
            className={`payment-card ${selectedCardId === card.id ? 'active' : ''}`}
            onClick={() => setSelectedCardId(card.id)}
          >
            <div className="payment-card-header">
              <span className="payment-card-label">💳 Card {index + 1}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSavedCards(prev => prev.filter(c => c.id !== card.id));
                }}
                className="payment-card-remove"
              >
                Remove
              </button>
            </div>
            <div className="payment-card-fields">
              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" value={card.number} onChange={(e) => updateCard(card.id, 'number', e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Expiry</label>
                <input type="text" placeholder="MM/YY" value={card.expiry} onChange={(e) => updateCard(card.id, 'expiry', e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">CVV</label>
                <input type="text" placeholder="123" value={card.cvv} onChange={(e) => updateCard(card.id, 'cvv', e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Name on Card</label>
                <input type="text" placeholder="Jane Doe" value={card.name} onChange={(e) => updateCard(card.id, 'name', e.target.value)} className="form-input" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

  <div className="checkout-buttons">
  <button className="btn btn-primary" onClick={handlePlaceOrder} disabled={!canPlaceOrder}>
  Place Order
</button>
</div>
</div>
    </div>
  );
};

export default Checkout;