import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('+1');
  const [phone, setPhone] = useState('');
  const [signupHovered, setSignupHovered] = useState(false);
  const [address, setAddress] = useState('');
const [city, setCity] = useState('');
const [state, setState] = useState('');
const [zip, setZip] = useState('');

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
    width: '100%',
    marginBottom: '20px'
  };

  const handleSignup = (e) => {
  e.preventDefault();
  if (!isFormValid) {
    alert('Please fill out all fields and ensure passwords match.');
    return;
  }
  localStorage.setItem('loginEmail', email);
  localStorage.setItem('loginPhone', phone);
  localStorage.setItem('loginCountry', country);
  localStorage.setItem('loginFirstName', firstName);
  localStorage.setItem('loginLastName', lastName);
  localStorage.setItem('loginAddress', address);
  localStorage.setItem('loginCity', city);
  localStorage.setItem('loginState', state);
  localStorage.setItem('loginZip', zip);
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('loginToken', 'true');
  navigate('/logged-in-landing');
};

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
    '+34': 9,
    '+46': 9,
    '+41': 9,
    '+216': 8,
    '+90': 10,
    '+598': 8,
    '+998': 9,
  };

  const validatePhone = () => {
    const expectedDigits = phoneDigits[country] || 10;
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length !== expectedDigits && digitsOnly.length > 0) {
      alert(`Phone number for ${country} must be exactly ${expectedDigits} digits. You entered ${digitsOnly.length}.`);
    }
  };

  const phoneIsValid = phone.trim() !== '' && (phone.replace(/\D/g, '').length === (phoneDigits[country] || 10));
const isFormValid = firstName.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && password === confirmPassword && phoneIsValid;

  const navigate = useNavigate();

  return (
    <>
      {/* Demo Warning Banner */}
      <div style={{
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px 0',
      }}>
        <div style={{
          maxWidth: '800px',
          width: '100%',
          backgroundColor: 'red',
          color: 'white',
          textAlign: 'center',
          padding: '10px',
          borderRadius: '5px',
        }}>
          ⚠️ This a demo application. DO NOT enter any real personal information. This is for demonstration purposes only. Regardless, your data will not be saved or shared.
        </div>
      </div>

      {/* Main Container */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        {/* Form Container */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          padding: '40px',
          boxSizing: 'border-box',
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>

        {/* Phone Section */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Phone Number</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{
                  flex: '0 0 100px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '16px',
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
                <option value="+599">+599 (Curaçao 🇨🇼)</option>
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
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={validatePhone}
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>

          {/* First Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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

           {/* Last Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px', fontStyle: 'italic' }}>
              *DEVELOPER'S NOTE: Feel free to leave this blank and enter your cat's name (or some other random cat name) instead of your first!
            </p>
          </div>


          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Confirm Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Address */}
<div style={{ marginBottom: '20px' }}>
  <label style={{ display: 'block', marginBottom: '5px' }}>Address</label>
  <input
    type="text"
    placeholder="Enter your address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
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
              {/* City */}
<div style={{ marginBottom: '20px' }}>
  <label style={{ display: 'block', marginBottom: '5px' }}>City</label>
  <input
    type="text"
    placeholder="Enter your city"
    value={city}
    onChange={(e) => setCity(e.target.value)}
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

{/* State */}
<div style={{ marginBottom: '20px' }}>
  <label style={{ display: 'block', marginBottom: '5px' }}>State</label>
  <input
    type="text"
    placeholder="Enter your state"
    value={state}
    onChange={(e) => setState(e.target.value)}
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

{/* Zip */}
<div style={{ marginBottom: '20px' }}>
  <label style={{ display: 'block', marginBottom: '5px' }}>Zip</label>
  <input
    type="text"
    placeholder="Enter your zip code"
    value={zip}
    onChange={(e) => setZip(e.target.value)}
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

          {/* Sign Up Button */}
          <button
            onClick={handleSignup}
            disabled={!isFormValid}
            style={{
              width: '100%',
              padding: '12px',
              background: isFormValid ? 'linear-gradient(90deg, #f25e28, #ff8d5d)' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              opacity: isFormValid ? 1 : 0.5,
              marginBottom: '10px',
            }}
          >
            Sign Up
          </button>

          {/* Log In Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '10px' }}>Already have an account? Log in!</p>
            <Link to="/login">
              <button
                onMouseEnter={() => setSignupHovered(true)}
                onMouseLeave={() => setSignupHovered(false)}
                style={{
                  padding: '10px 20px',
                  background: signupHovered ? 'linear-gradient(90deg, #f25e28, #ff8d5d)' : 'white',
                  color: signupHovered ? 'white' : '#f25e28',
                  border: '2px solid #f25e28',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Log In
              </button>

            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;