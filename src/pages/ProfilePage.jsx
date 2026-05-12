import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';
import profilePic from '../assets/cat_food_delivery_profilepic-v2.png';


const ProfilePage = () => {

// State management
const [profileData, setProfileData] = useState(() => ({
  firstName: localStorage.getItem('loginFirstName') || '',
  lastName: localStorage.getItem('loginLastName') || '',
  email: localStorage.getItem('loginEmail') || '',
  phone: localStorage.getItem('loginPhone') || '',
  country: localStorage.getItem('loginCountry') || '+1',
  address: localStorage.getItem('loginAddress') || '',
  city: localStorage.getItem('loginCity') || '',
  state: localStorage.getItem('loginState') || '',
  zip: localStorage.getItem('loginZip') || '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  profilePicture: null,
}));
const [country, setCountry] = useState('+1');
const [phone, setPhone] = useState('');
const [cards, setCards] = useState([]);
const [activeCard, setActiveCard] = useState(null);
const [errors, setErrors] = useState({});
const [showWarning, setShowWarning] = useState(false);
const fileInputRef = useRef(null);
const navigate = useNavigate();
const handleBack = () => {
  const hasPlan = localStorage.getItem('cart') || localStorage.getItem('lastOrder');
  if (hasPlan) {
    navigate('/returning-member');
  } else {
    navigate('/logged-in-landing');
  }
};

const handleLogout = () => navigate('/');

useEffect(() => {
  const savedFirstName = localStorage.getItem('loginFirstName') || '';
  const savedLastName = localStorage.getItem('loginLastName') || '';
  const savedEmail = localStorage.getItem('loginEmail') || '';
  const savedPhone = localStorage.getItem('loginPhone') || '';
  const savedCountry = localStorage.getItem('loginCountry') || '+1';

setProfileData(prev => ({
    ...prev,
    firstName: savedFirstName,
    lastName: savedLastName,
    email: savedEmail,
    phone: savedPhone,
    country: savedCountry,
  }));
  setCountry(savedCountry);
  setPhone(savedPhone);
}, []);

useEffect(() => {
  const savedFirstName = localStorage.getItem('loginFirstName') || '';
  const savedLastName = localStorage.getItem('loginLastName') || '';
  const savedEmail = localStorage.getItem('loginEmail') || '';
  const savedPhone = localStorage.getItem('loginPhone') || '';
  const savedCountry = localStorage.getItem('loginCountry') || '+1';
  const savedAddress = localStorage.getItem('loginAddress') || '';
  const savedCity = localStorage.getItem('loginCity') || '';
  const savedState = localStorage.getItem('loginState') || '';
  const savedZip = localStorage.getItem('loginZip') || '';

  setProfileData(prev => ({
    ...prev,
    firstName: savedFirstName,
    lastName: savedLastName,
    email: savedEmail,
    phone: savedPhone,
    country: savedCountry,
    address: savedAddress,
    city: savedCity,
    state: savedState,
    zip: savedZip,
  }));
  setCountry(savedCountry);
  setPhone(savedPhone);
}, []);

  

const phoneDigits = {
  '+1': 10,
  '+44': 10,
  '+32': 9,
  '+33': 9,
  '+34': 9,
  '+39': 10,
  '+49': 10,
  '+52': 10,
  '+54': 10,
  '+55': 11,
  '+351': 9,
  '+91': 10,
  '+81': 10,
  '+82': 10,
  '+213': 9,
  '+61': 9,
  '+43': 10,
  '+387': 8,
  '+238': 7,
  '+57': 10,
  '+385': 9,
  '+599': 7,
  '+420': 9,
  '+243': 9,
  '+593': 9,
  '+20': 10,
  '+509': 8,
  '+98': 10,
  '+964': 10,
  '+225': 8,
  '+47': 8,
  '+507': 8,
  '+595': 9,
  '+974': 8,
  '+966': 9,
  '+221': 9,
  '+27': 9,
  '+46': 9,
  '+41': 9,
  '+216': 8,
  '+90': 10,
  '+598': 8,
  '+998': 9,
};

// Load data from localStorage on mount
useEffect(() => {
  const savedData = localStorage.getItem('profileData');
  if (savedData) {
    setProfileData(JSON.parse(savedData));
  }
  const savedCards = localStorage.getItem('cards');
  if (savedCards) {
    setCards(JSON.parse(savedCards));
  }
}, []);




// Save to localStorage
const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};




// Handle input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setProfileData(prev => ({ ...prev, [name]: value }));
};




// Handle file upload
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData(prev => ({ ...prev, profilePicture: reader.result }));
    };
    reader.readAsDataURL(file);
  }
};


const handleResetProfilePicture = () => {
  setProfileData(prev => ({ ...prev, profilePicture: null }));
};

// Validation
const validateForm = () => {
 const newErrors = {};
 if (!profileData.firstName) newErrors.firstName = 'First name is required';
 if (!profileData.lastName) newErrors.lastName = 'Last name is required';
 if (!profileData.email) newErrors.email = 'Email is required';
 else if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = 'Email is invalid';
  // Phone validation with country-based digit check
 if (!phone.trim()) newErrors.phone = 'Phone number is required';
 else {
   const digitsOnly = phone.replace(/\D/g, '');
   const expectedDigits = phoneDigits[country] || 10;
   if (digitsOnly.length !== expectedDigits) {
     newErrors.phone = `Phone number must be exactly ${expectedDigits} digits`;
   }
 }
  if (!profileData.address) newErrors.address = 'Address is required';
 if (!profileData.city) newErrors.city = 'City is required';
 if (!profileData.state) newErrors.state = 'State is required';
 if (!profileData.zip) newErrors.zip = 'Zip is required';
 if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
   newErrors.confirmPassword = 'Passwords do not match';
 }
 setErrors(newErrors);
 return Object.keys(newErrors).length === 0;
};


const validatePhone = () => {
 const expectedDigits = phoneDigits[country] || 10;
 const digitsOnly = phone.replace(/\D/g, '');
 if (digitsOnly.length !== expectedDigits && digitsOnly.length > 0) {
   alert(`Phone number for ${country} must be exactly ${expectedDigits} digits. You entered ${digitsOnly.length}.`);
 }
};


const handleSubmit = (e) => {
 e.preventDefault();
 if (validateForm()) {
   saveToLocalStorage('profileData', profileData);
   alert('Profile updated successfully');
 }
};




// Handle cancel
const handleCancel = () => {
  // Reset to saved data
  const savedData = localStorage.getItem('profileData');
  if (savedData) {
    setProfileData(JSON.parse(savedData));
  }
  setErrors({});
};




// Card management
const addCard = () => {
  const newCard = { id: Date.now(), number: '', expiry: '', cvv: '', name: '' };
  setCards(prev => [...prev, newCard]);
};




const removeCard = (id) => {
  setCards(prev => prev.filter(card => card.id !== id));
  saveToLocalStorage('cards', cards.filter(card => card.id !== id));
};




const updateCard = (id, field, value) => {
  setCards(prev => prev.map(card => card.id === id ? { ...card, [field]: value } : card));
};




const saveCards = () => {
  saveToLocalStorage('cards', cards);
  alert('Cards updated');
};




const selectCard = (id) => {
  setActiveCard(id);
};

return (
  <div className="profile-container">
    <div className="profile-header">
      <button className="back-button" onClick={handleBack}>Back</button>
      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </div>
    {showWarning && <div className="warning-banner">Warning: Please complete your profile</div>}
    <div className="profile-picture-section">
  <img
    src={profileData.profilePicture || profilePic}
    alt="Profile"
    className="profile-picture"
    onClick={() => fileInputRef.current.click()}
    style={{ cursor: 'pointer' }}
  />
  <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>Click to upload photo</p>
  <button
    type="button"
    onClick={handleResetProfilePicture}
    style={{
      marginTop: '10px',
      padding: '8px 16px',
      backgroundColor: '#ccc',
      color: '#333',
      border: 'none',
      borderRadius: '5px',
      fontSize: '14px',
      cursor: 'pointer'
    }}
  >
    Reset to Default
  </button>
  <input
    type="file"
    ref={fileInputRef}
    accept="image/*"
    onChange={handleFileChange}
    style={{ display: 'none' }}
  />
</div>
  
    <form onSubmit={handleSubmit} className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
      <div className="form-group">
        <label className="form-label">First Name</label>
        <input type="text" name="firstName" value={profileData.firstName} onChange={handleInputChange} className="form-input" />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>
    
      <div className="form-group">
        <label className="form-label">Last Name</label>
        <input type="text" name="lastName" value={profileData.lastName} onChange={handleInputChange} className="form-input" />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>
    
      <div className="form-group">
        <label className="form-label">Email</label>
        <input type="email" name="email" value={profileData.email} onChange={handleInputChange} className="form-input" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
    
      <div className="form-group" style={{ gridColumn: 'span 1.5' }}>
 <label className="form-label">Phone</label>
 <div style={{ display: 'flex', gap: '10px' }}>
   <select
     value={country}
     onChange={(e) => setCountry(e.target.value)}
     style={{
       flex: '0 0 90px',
       padding: '10px',
       border: '1px solid #ccc',
       borderRadius: '5px',
       fontSize: '14px',
     }}
 >
     <option value="+1">+1 (United States 🇺🇸/Canada 🇨🇦)</option>
     <option value="+44">+44 (United Kingdom 🇬🇧)</option>
     <option value="+213">+213 (Algeria 🇩🇿)</option>
     <option value="+54">+54 (Argentina 🇦🇷)</option>
     <option value="+61">+61 (Australia 🇦🇺)</option>
     <option value="+43">+43 (Austria 🇦🇹)</option>
     <option value="+32">+32 (Belgium 🇧🇪)</option>
     <option value="+55">+55 (Brazil 🇧🇷)</option>
     <option value="+387">+387 (Bosnia & Herzegovina 🇧🇦)</option>
     <option value="+238">+238 (Cabo Verde 🇨🇻)</option>
     <option value="+57">+57 (Colombia 🇨🇴)</option>
     <option value="+385">+385 (Croatia 🇭🇷)</option>
     <option value="+599">+599 (Curaçao 🇨�)</option>
     <option value="+420">+420 (Czech Republic 🇨🇿)</option>
     <option value="+243">+243 (DR Congo 🇨🇩)</option>
     <option value="+593">+593 (Ecuador 🇪🇨)</option>
     <option value="+20">+20 (Egypt 🇪🇬)</option>
     <option value="+33">+33 (France 🇫🇷)</option>
     <option value="+49">+49 (Germany 🇩🇪)</option>
     <option value="+509">+509 (Haiti 🇭🇹)</option>
     <option value="+98">+98 (Iran 🇮🇷)</option>
     <option value="+964">+964 (Iraq 🇮🇶)</option>
     <option value="+39">+39 (Italy 🇮🇹)</option>
     <option value="+225">+225 (Ivory Coast 🇨🇮)</option>
     <option value="+81">+81 (Japan 🇯🇵)</option>
     <option value="+82">+82 (Korea Republic 🇰🇷)</option>
     <option value="+52">+52 (Mexico 🇲🇽)</option>
     <option value="+47">+47 (Norway 🇳🇴)</option>
     <option value="+507">+507 (Panama 🇵🇦)</option>
     <option value="+351">+351 (Portugal 🇵🇹)</option>
     <option value="+966">+966 (Saudi Arabia 🇸🇦)</option>
     <option value="+27">+27 (South Africa 🇿🇦)</option>
     <option value="+34">+34 (Spain 🇪🇸)</option>
     <option value="+46">+46 (Sweden 🇸🇪)</option>
     <option value="+41">+41 (Switzerland 🇨🇭)</option>
     <option value="+90">+90 (Turkey 🇹🇷)</option>
     <option value="+598">+598 (Uruguay 🇺🇾)</option>
     <option value="+998">+998 (Uzbekistan 🇺🇿)</option>
   </select>
   <input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={validatePhone} style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }} />
 </div>
 {errors.phone && <span className="error">{errors.phone}</span>}
</div>
    
      <div className="form-group" style={{ gridColumn: 'span 1.5' }}>
 <label className="form-label">Address</label>
 <input type="text" name="address" value={profileData.address} onChange={handleInputChange} className="form-input" />
 {errors.address && <span className="error">{errors.address}</span>}
</div>


    
      <div className="form-group" style={{ gridColumn: 'span 1' }}>
 <label className="form-label">City</label>
 <input type="text" name="city" value={profileData.city} onChange={handleInputChange} className="form-input" />
 {errors.city && <span className="error">{errors.city}</span>}
</div>
    
      <div className="form-group" style={{ gridColumn: 'span 1' }}>
 <label className="form-label">State</label>
 <input type="text" name="state" value={profileData.state} onChange={handleInputChange} className="form-input" />
 {errors.state && <span className="error">{errors.state}</span>}
</div>
    
      <div className="form-group" style={{ gridColumn: 'span 1' }}>
 <label className="form-label">Zip</label>
 <input type="text" name="zip" value={profileData.zip} onChange={handleInputChange} className="form-input" />
 {errors.zip && <span className="error">{errors.zip}</span>}
</div>
    
      {/* Password Row */}
<div className="form-group" style={{ gridColumn: 'span 1' }}>
 <label className="form-label">Current Password</label>
 <input type="password" name="currentPassword" value={profileData.currentPassword} onChange={handleInputChange} className="form-input" />
</div>


<div className="form-group" style={{ gridColumn: 'span 1' }}>
 <label className="form-label">New Password</label>
 <input type="password" name="newPassword" value={profileData.newPassword} onChange={handleInputChange} className="form-input" />
</div>


<div className="form-group" style={{ gridColumn: 'span 1' }}>
 <label className="form-label">Confirm New Password</label>
 <input type="password" name="confirmPassword" value={profileData.confirmPassword} onChange={handleInputChange} className="form-input" />
 {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
</div>
    
      {/* Cards section heading - ABOVE the Add/Save buttons */}
<div style={{ gridColumn: '1 / -1' }}>
  <h3>Cards</h3>
</div>

{/* Add Card and Save Cards - left aligned */}
<div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px', marginTop: '0' }}>
  <button type="button" onClick={addCard} className="btn btn-primary">Add Card</button>
  <button type="button" onClick={saveCards} className="btn btn-primary">Save Cards</button>
</div>

{/* Cards section - the actual cards render here */}
<div className="cards-section" style={{ gridColumn: '1 / -1', flexDirection: 'column', gap: '15px' }}>
  {cards.map(card => (
    <div key={card.id} className={`card ${activeCard === card.id ? 'active' : ''}`} onClick={() => selectCard(card.id)}>
      <input type="text" placeholder="Card Number" value={card.number} onChange={(e) => updateCard(card.id, 'number', e.target.value)} className="form-input" />
      <input type="text" placeholder="Expiry" value={card.expiry} onChange={(e) => updateCard(card.id, 'expiry', e.target.value)} className="form-input" />
      <input type="text" placeholder="CVV" value={card.cvv} onChange={(e) => updateCard(card.id, 'cvv', e.target.value)} className="form-input" />
      <input type="text" placeholder="Name" value={card.name} onChange={(e) => updateCard(card.id, 'name', e.target.value)} className="form-input" />
      <button onClick={() => removeCard(card.id)} className="btn btn-secondary">Remove</button>
    </div>
  ))}
</div>

{/* Update Profile and Cancel - centered below cards */}
<div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
  <button type="submit" className="btn btn-primary">Update Profile</button>
  <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
</div>
</form>
</div>
);
};

export default ProfilePage;