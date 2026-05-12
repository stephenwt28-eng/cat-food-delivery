import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import catEyeShow from '../assets/cat_eye_password_show.png';
import catEyeHide from '../assets/cat_eye_password_hide.png';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [country, setCountry] = useState('+1');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerHovered, setRegisterHovered] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
    '+46': 9,
    '+41': 9,
    '+216': 8,
    '+90': 10,
    '+598': 8,
    '+998': 9,
  };

  const phoneIsValid = phone.trim() !== '' && (phone.replace(/\D/g, '').length === (phoneDigits[country] || 10));
  const isFormValid = (email.trim() !== '' && password.trim() !== '') || phoneIsValid;

  const validatePhone = () => {
    const expectedDigits = phoneDigits[country] || 10;
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length !== expectedDigits && digitsOnly.length > 0) {
      alert(`Phone number for ${country} must be exactly ${expectedDigits} digits. You entered ${digitsOnly.length}.`);
    }
  };

  const handleLogin = (e) => {
  e.preventDefault();
  if (!isFormValid) {
    alert('Please fill out either (Email + Password) or a valid Phone number for your country.');
    return;
  }
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('loginEmail', email);
  localStorage.setItem('loginPhone', phone);
  localStorage.setItem('loginCountry', country);
  console.log('Login successful');
  navigate('/logged-in-landing');
};

  return (
    <>
      {/* Demo Warning Banner - MOVED OUTSIDE */}
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
        {/* Form Container - WIDENED TO 800px */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          padding: '40px',
          boxSizing: 'border-box',
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Log In</h2>

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

          {/* OR Separator */}
          <div style={{
            textAlign: 'center',
            margin: '20px 0',
            position: 'relative',
          }}>
            <hr style={{ border: 'none', borderTop: '1px solid #ccc' }} />
            <span style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              padding: '0 10px',
              color: '#666',
            }}>OR</span>
          </div>

          {/* Email Input */}
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

          {/* Password Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  paddingRight: '40px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img
                  src={passwordVisible ? catEyeHide : catEyeShow}
                  alt={passwordVisible ? 'Hide password' : 'Show password'}
                  style={{ width: '20px', height: '20px' }}
                />
              </button>
            </div>
          </div>

          {/* Log In Button */}
          <button
            onClick={handleLogin}
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
            Log in
          </button>

          {/* Forgot Password Link */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <a
              href="#"
              style={{
                color: '#f25e28',
                textDecoration: 'none',
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* Registration Section */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '10px' }}>Don't have an account? Register now!</p>
            <Link to="/signup">
              <button
                onMouseEnter={() => setRegisterHovered(true)}
                onMouseLeave={() => setRegisterHovered(false)}
                style={{
                  padding: '10px 20px',
                  background: registerHovered ? 'linear-gradient(90deg, #f25e28, #ff8d5d)' : 'white',
                  color: registerHovered ? 'white' : '#f25e28',
                  border: '2px solid #f25e28',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;