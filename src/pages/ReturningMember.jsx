import '../styles/LandingPage.css';
import customizableFlavors from '../assets/cat_food_delivery_heartcustomizableflavors.png';
import medicationOptions from '../assets/cat_food_delivery_shieldsupplementoptions.png';
import flexibleDelivery from '../assets/cat_food_delivery_truck.png';
import Riley from '../assets/11064865-246E-4581-A7E5-5A117E5E3E86_1_105_c.jpeg';
import Atticus from '../assets/33275040-ED26-4EA2-B7EC-3A1F96DBDBC5_1_102_o.jpeg';
import Angus from '../assets/31EAC3F1-2D7A-4222-B337-3FCE1FD5605C_1_105_c.jpeg';
import Dora from '../assets/FB14D151-0DC0-46F0-A961-29EE1E0ED9DB_1_105_c.jpeg';
import { Link } from 'react-router-dom';

const handleScrollToWhySection = () => {
  const section = document.querySelector('.why-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

function ReturningMember() {
  return (
    <main className="landing-page">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-tagline">This time, it's PERSONAL...</p>
            <h1>FRESH CUSTOMIZABLE MEALS BUILT AROUND YOUR CAT!</h1>
            <p className="hero-text">
              We believe every cat deserves a meal plan tailored to their unique needs. Whether your feline friend has dietary restrictions, prefers specific flavors, or needs portion control, GobsmackKitty makes it easy to build a plan that works for them—and for your lifestyle. Choose from fresh, premium ingredients, customize delivery schedules, and add supplements or treats. Your cat gets the nutrition they deserve. You get the convenience you need.
            </p>
            <div className="hero-actions">
              <Link to="/review-plan">
                <button className="btn btn-primary">Review Your Plan</button>
              </Link>
              <button className="btn btn-secondary" onClick={handleScrollToWhySection}>Learn More</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="mockup-box">
              <div className="floating-badge badge-top-left">✅ Vet Approved</div>
              <div className="mockup-placeholder">
</div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section">
                    <div className="container why-container">
                      <div className="why-header">
                        <h2>Why Cats <span className="accent">LOVE</span> Us</h2>
                        <p className="hero-text">Everything your feline friend needs, all in one place!</p>
                      </div>
            
                      <div className="why-grid">
                        <div className="why-card">
                          <div className="why-icon">
                            <img src={customizableFlavors} alt="Customizable Flavors" />
                </div>
                          <h3>Customizable Flavors</h3>
                          <p>Choose from naturally prepared chicken, salmon, and even vegetables! Mix and match to keep your cat excited!</p>
                        </div>
            
                        <div className="why-card">
                          <div className="why-icon">
                            <img src={medicationOptions} alt="Medication Options" />
                </div>
                          <h3>Medication Options</h3>
                          <p>Easily add supplements and medications to your order. We'll mix them into meals for stress-free care.</p>
                        </div>
            
                        <div className="why-card">
                          <div className="why-icon">
                            <img src={flexibleDelivery} alt="Flexible Delivery" />
                </div>
                          <h3>Flexible Delivery</h3>
                          <p>Weekly, bi-weekly, or monthly delivery. Pause, skip, or cancel anytime—no questions asked!</p>
                        </div>
                      </div>
                    </div>
            
                    <div className="why-divider" />
                    <div className="why-header">
                      <h2 className="section-title">Who We Are</h2>
                      <p className="hero-text">
                    Meet the founders of GobsmackKitty: our beloved cats Riley, Atticus, and Angus. These incredible felines are the heart and soul of our mission, bringing joy, inspiration, and a touch of chaos to everything we do.
                  </p>
            
                  <div className="grid grid-cols-3 gap-8">
            
                  <div className="card cat-card">
                     <img src={Riley} alt="Riley" className="cat-image" />
                    <h3 className="card-title">RILEY</h3>
                    <p className="card-description">
                      The charismatic leader with a penchant for adventure and endless curiosity. He sets the pace for our pack.
                    </p>
                  </div>
            
                  <div className="card cat-card">
                    <img src={Atticus} alt="Atticus" className="cat-image" />
                    <h3 className="card-title">ATTICUS</h3>
                    <p className="card-description">
                      The wise and gentle soul, always observing with quiet intelligence and offering comfort to all.
                    </p>
                  </div>
            
                  <div className="card cat-card">
                    <img src={Angus} alt="Angus" className="cat-image" />
                    <h3 className="card-title">ANGUS</h3>
                    <p className="card-description">
                      The playful bundle of energy, turning every day into a game and reminding us to live in the moment.
                    </p>
                  </div>
                </div>
            
                <div className="why-divider" style={{ gridColumn: '1 / -1' }}></div>
            
                <div className="dora-memorial-wrapper">
                  <h2 className="section-title">In Loving Memory of Dora</h2>
                    <img src={Dora} alt="Dora" />
                    <div>
                      <p className="hero-text">Dora was the woman of the house. Ruling the roost, she bravely battled arthritis and chronic vomiting. Despite her constant pain, she remained the most gentle and well-behaved cat imaginable, never complaining or lashing out. We tried everything—medications, special diets, countless vet visits, shutting us up in separate rooms (uncool)—to ease her suffering. But at the close of May in 2025, with heavy hearts, we made the compassionate choice to let her go peacefully. Her unwavering spirit and resilience inspired the creation of GobsmackKitty, dedicated to improving the lives of cats like her.
                      </p>
                    </div>
                  </div>
                </div>
                  </section>
    </main>
  );
}

export default ReturningMember;