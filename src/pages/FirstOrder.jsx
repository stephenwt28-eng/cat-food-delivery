import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FirstOrder.css';

const FirstOrder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [catName, setCatName] = useState('');
  const [catAge, setCatAge] = useState('');
  const [catWeight, setCatWeight] = useState('');
  const [catAllergies, setCatAllergies] = useState('');
  const [selectedMeats, setSelectedMeats] = useState([]);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedSupplements, setSelectedSupplements] = useState([]);
    const [selectedContainer, setSelectedContainer] = useState(null);
  const [skippedVeggies, setSkippedVeggies] = useState(false);
  const [skippedSupplements, setSkippedSupplements] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState(null);

  const meats = [
    { emoji: '🐔', name: 'Chicken', price: 10 },
    { emoji: '🐟', name: 'Salmon', price: 8 },
    { emoji: '🥩', name: 'Beef', price: 12 },
    { emoji: '🦃', name: 'Turkey', price: 9 },
    { emoji: '🐠', name: 'Tuna', price: 15 },
    { emoji: '🍖', name: 'Pork', price: 14 }
  ];

  const veggies = [
    { emoji: '🥬', name: 'Spinach', price: 5 },
    { emoji: '🥕', name: 'Carrot', price: 4 },
    { emoji: '🥑', name: 'Avocado', price: 6 },
    { emoji: '🥒', name: 'Cucumber', price: 5 },
    { emoji: '🎃', name: 'Pumpkin', price: 4 },
    { emoji: '😼', name: 'Catnip', price: 5 }
  ];

  const supplements = [
    { name: 'Joint Support', price: 10, desc: 'Glucosamine & Chondroitin' },
    { name: 'Hairball Control', price: 8, desc: 'Fiber blend' },
    { name: 'Digestive Aid', price: 12, desc: 'Probiotics' },
    { name: 'Urinary Health', price: 15, desc: 'pH balance' },
    { name: 'Omega-3', price: 7, desc: 'Multivitamin' },
    { name: 'Multivitamin', price: 11, desc: 'Complete nutrition' }
  ];

  const containers = [
    { name: 'Pouches', price: 5 },
    { name: 'Cans', price: 8 },
    { name: 'Dry Kibble', price: 6 }
  ];

  const frequencyOptions = [
    { name: 'Weekly', value: 'weekly', price: 19.99, desc: 'Weekly = $19.99/delivery' },
    { name: 'Bi-weekly', value: 'biweekly', price: 39.99, desc: 'Bi-weekly = $39.99/delivery' },
    { name: 'Monthly', value: 'monthly', price: 69.99, desc: 'Monthly = $69.99/delivery' }
  ];

  const toggleMeat = (idx) => {
    setSelectedMeats((prev) => 
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleVeggie = (idx) => {
    setSelectedVeggies((prev) => 
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleSupplement = (idx) => {
    setSelectedSupplements((prev) => 
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleContainer = (idx) => {
    setSelectedContainer((prev) => (prev === idx ? null : idx));
  };

  const toggleSkipVeggies = () => setSkippedVeggies((p) => !p);
  const toggleSkipSupplements = () => setSkippedSupplements((p) => !p);

  const toggleFrequency = (value) => {
    setSelectedFrequency((prev) => (prev === value ? null : value));
  };

  const prevStep = () => setCurrentStep((c) => c - 1);

  const handleContinue = () => {
  if (currentStep === 6) {
    const cart = {
      catName: catName.trim(),
      catAge,
      catWeight,
      catAllergies: catAllergies.trim(),
      meats: selectedMeats.map(idx => ({ name: meats[idx].name, price: meats[idx].price })),
      veggies: !skippedVeggies ? selectedVeggies.map(idx => ({ name: veggies[idx].name, price: veggies[idx].price })) : [],
      supplements: !skippedSupplements ? selectedSupplements.map(idx => ({ name: supplements[idx].name, price: supplements[idx].price })) : [],
      container: selectedContainer !== null ? [{ name: containers[selectedContainer].name, price: containers[selectedContainer].price }] : [],
      frequency: selectedFrequency ? [{ name: frequencyOptions.find(f => f.value === selectedFrequency).name, price: frequencyOptions.find(f => f.value === selectedFrequency).price }] : []
    };
    
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/checkout');
  } else {
    setCurrentStep((c) => c + 1);
  }
};

  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return catName.trim() !== '';
      case 2:
        return selectedMeats.length > 0;
      case 3:
        return skippedVeggies || selectedVeggies.length > 0;
      case 4:
        return skippedSupplements || selectedSupplements.length > 0;
      case 5:
        return selectedContainer !== null;
      case 6:
        return selectedFrequency !== null;
      default:
        return false;
    }
  };

  const calculateTotal = () => {
  let subtotal = 0;
  
  selectedMeats.forEach((idx) => {
    subtotal += meats[idx].price;
  });
  
  if (!skippedVeggies) {
    selectedVeggies.forEach((idx) => {
      subtotal += veggies[idx].price;
    });
  }
  
  if (!skippedSupplements) {
    selectedSupplements.forEach((idx) => {
      subtotal += supplements[idx].price;
    });
  }
  
  if (selectedContainer !== null) {
    subtotal += containers[selectedContainer].price;
  }
  
  const frequencyPrice = selectedFrequency
    ? frequencyOptions.find((f) => f.value === selectedFrequency)?.price || 0
    : 0;
  
  return subtotal + frequencyPrice;
};

  return (
    <>
      <div className="firstorder-container">
        <div className="hero-box">
          <div className="progress">
  {Array.from({ length: 6 }, (_, i) => (
    <div
      className={`progress-step ${currentStep >= i + 1 ? `progress-step-${i + 1}` : ''}`}
      key={i}
    >
      {i + 1}
    </div>
  ))}
</div>
          <div className="step-content">
            {currentStep === 1 && (
              <>
                <h2>Tell Us About <span className="step-header-1">Your Cat</span></h2>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Cat's Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dora"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Age (years)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="e.g. 3"
                      value={catAge}
                      onChange={(e) => setCatAge(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Weight (lbs)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="e.g. 10"
                      value={catWeight}
                      onChange={(e) => setCatWeight(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Allergies or Dietary Restrictions (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. No fish, sensitive stomach"
                    value={catAllergies}
                    onChange={(e) => setCatAllergies(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="buttons">
                  <button
                    className="btn btn-primary"
                    disabled={!canContinue()}
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <h2>Choose {catName ? `${catName}'s` : 'Your'} <span className="step-header-1">Meats</span></h2>
                <div className="grid">
                  {meats.map((item, idx) => (
                    <label className={`item-card item-card-step-1`} key={idx}>
                      <input
                        type="checkbox"
                        checked={selectedMeats.includes(idx)}
                        onChange={() => toggleMeat(idx)}
                      />
                      <div>
                        <span className="emoji">{item.emoji}</span>
                        <div className="item-details">{item.name} - ${item.price}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="total-display">
                  Live Total: ${calculateTotal().toFixed(2)}
                </div>
                <div className="buttons">
                  <button className="btn btn-secondary" onClick={prevStep}>
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    disabled={!canContinue()}
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <h2>Choose Your <span className="step-header-2">Veggies</span></h2>
                <div className="grid">
                  {veggies.map((item, idx) => (
                    <label className={`item-card item-card-step-2`} key={idx}>
                      <input
                        type="checkbox"
                        checked={selectedVeggies.includes(idx)}
                        onChange={() => toggleVeggie(idx)}
                      />
                      <div>
                        <span className="emoji">{item.emoji}</span>
                        <div className="item-details">{item.name} - ${item.price}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="skip-section">
                  <button
  className={`skip-btn step-2-skip ${skippedVeggies ? 'skipped' : ''}`}
  onClick={toggleSkipVeggies}
>
                    {skippedVeggies ? 'Add Veggies' : 'Skip Veggies'}
                  </button>
                </div>
                <div className="total-display">
                  Live Total: ${calculateTotal().toFixed(2)}
                </div>
                <div className="buttons">
                  <button className="btn btn-secondary" onClick={prevStep}>
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    disabled={!canContinue()}
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
            {currentStep === 4 && (
              <>
                <h2>Add <span className="step-header-3">Supplements</span></h2>
                <div className="grid">
                  {supplements.map((item, idx) => (
                    <label className="item-card item-card-step-3" key={idx}>
                      <input
                        type="checkbox"
                        checked={selectedSupplements.includes(idx)}
                        onChange={() => toggleSupplement(idx)}
                      />
                      <div>
                        <div className="item-details">{item.name} - ${item.price}</div>
                        <div className="desc">{item.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="skip-section">
                  <button
  className={`skip-btn step-3-skip ${skippedSupplements ? 'skipped' : ''}`}
  onClick={toggleSkipSupplements}
>
  {skippedSupplements ? 'Add Supplements' : 'No Meds? No Problem!'}
</button>
                </div>
                <div className="total-display">
                  Live Total: ${calculateTotal().toFixed(2)}
                </div>
                <div className="buttons">
                  <button className="btn btn-secondary" onClick={prevStep}>
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    disabled={!canContinue()}
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
            {currentStep === 5 && (
              <>
                <h2>Select <span className="step-header-4">Container</span></h2>
                <div className="freq-grid">
                  {containers.map((item, idx) => (
                    <button
  className={`freq-btn freq-btn-step-4 ${selectedContainer === idx ? 'selected' : ''}`}
                      key={idx}
                      onClick={() => toggleContainer(idx)}
                    >
                      <div>{item.name}</div>
                      <div className="price">${item.price}</div>
                    </button>
                  ))}
                </div>
                <div className="total-display">
                  Live Total: ${calculateTotal().toFixed(2)}
                </div>
                <div className="buttons">
                  <button className="btn btn-secondary" onClick={prevStep}>
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    disabled={!canContinue()}
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
            {currentStep === 6 && (
              <>
                <h2>Schedule <span className="step-header-5">Deliveries</span></h2>
                <div className="freq-grid">
                  {frequencyOptions.map((item) => (
                    <button
  className={`freq-btn freq-btn-step-5 ${selectedFrequency === item.value ? 'selected' : ''}`}
                      key={item.value}
                      onClick={() => toggleFrequency(item.value)}
                    >
                      <div>{item.name}</div>
                      <div className="desc">{item.desc}</div>
                    </button>
                  ))}
                </div>
                <div className="total-display">
  Live Total: ${calculateTotal().toFixed(2)}
</div>
                <div className="buttons">
                  <button className="btn btn-secondary" onClick={prevStep}>
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    disabled={!canContinue()}
                    onClick={handleContinue}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstOrder;