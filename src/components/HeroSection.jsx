import React, { useState } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import './HeroSection.css';

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScrollToApps = (e) => {
    e.preventDefault();
    const target = document.getElementById('new-apps-section') || document.querySelector('.new-apps-section-wrapper');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToDasara = (e) => {
    e.preventDefault();
    const target = document.getElementById('dasara-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="ghanta-hero-wrapper">
      <div className="ghanta-hero">
        {/* Left Column: Text, Badges, CTAs */}
        <div className="ghanta-hero-text">
          <div className="ghanta-hero-badge">
            ఆధ్యాత్మిక వేదిక • ఘంటసాల ఆర్ట్స్
          </div>

          <h1>
            సనాతన ధర్మ <br />
            వైభవం
          </h1>

          <p className="ghanta-hero-subtitle">
            సనాతన సంస్కృతి, దేవతా అర్చనలు, నిత్య పూజా విధానాలు, జ్యోతిష్య సలహాలు మరియు పవిత్ర వేద జ్ఞానాన్ని అందించే సమగ్ర ఆధ్యాత్మిక వేదిక. మీ నిత్య సాధనకు తోడ్పడే నూతన డిజిటల్ అనుభవం.
          </p>

          {/* Primary CTA Action Buttons */}
          <div className="ghanta-cta-row">
            <a 
              href="#new-apps-section" 
              onClick={handleScrollToApps} 
              className="ghanta-btn ghanta-btn-primary"
            >
              ✦ ముఖ్యమైన యాప్‌లు
            </a>

            <button 
              type="button" 
              onClick={() => setIsModalOpen(true)} 
              className="ghanta-btn ghanta-btn-secondary"
            >
              మరింత సమాచారం
            </button>
          </div>

          {/* Fast Contact Options */}
          <div className="ghanta-contact-row">
            <a 
              href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ghanta-contact-pill"
            >
              <WhatsAppIcon style={{ fontSize: '1.2rem', color: '#25D366' }} />
              <span>వాట్సాప్ సంప్రదింపు</span>
            </a>

            <a 
              href="tel:+919490478707" 
              className="ghanta-contact-pill"
            >
              <CallIcon style={{ fontSize: '1.15rem', color: '#0c7775' }} />
              <span>+91 94904 78707</span>
            </a>
          </div>
        </div>

        {/* Right Column: Concentric Teal Target Discs, Center White Frame & 3 Red Badges */}
        <div className="ghanta-hero-visual">
          <div className="ghanta-target-wrapper">
            
            {/* Outer Teal Disc */}
            <div className="ghanta-target-outer">
              
              {/* Inner Dark Teal Disc */}
              <div className="ghanta-target-inner">
                
                {/* Center White Disc with Guruji's Portrait */}
                <div className="ghanta-target-center">
                  <img 
                    src="/guruji_hero.png" 
                    alt="శ్రీ ఘంటసాల గురువుగారు" 
                    className="ghanta-target-guruji-img" 
                    loading="eager"
                  />
                </div>
              </div>

              {/* 3 Red Pill Badges matching user's design */}
              {/* Left Badge: నిత్యపూజలు */}
              <div className="ghanta-target-badge badge-left">
                నిత్యపూజలు
              </div>

              {/* Right Badge: వేదజ్ఞానం */}
              <div className="ghanta-target-badge badge-right">
                వేదజ్ఞానం
              </div>

              {/* Bottom Badge: జ్యోతిష్య మార్గదర్శనం */}
              <div className="ghanta-target-badge badge-bottom">
                జ్యోతిష్య మార్గదర్శనం
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Luxury Information Modal */}
      {isModalOpen && (
        <div 
          className="ghanta-hero-modal-overlay" 
          onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
        >
          <div className="ghanta-hero-modal-box">
            <button 
              type="button" 
              className="ghanta-hero-modal-close" 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '14px', color: '#ffd700', fontFamily: 'serif' }}>
              ఘంటసాల ఆర్ట్స్ &amp; క్రియేషన్స్
            </h3>
            <p style={{ lineHeight: '1.85', color: '#d9ffff', fontSize: '0.98rem', marginBottom: '18px' }}>
              సనాతన ధర్మ సంప్రదాయాలను భావితరాలకు అందించేందుకు, పవిత్ర శ్లోకాలు, నిత్య పూజా విధానాలు, నవరాత్రి విశేషాలు మరియు శాస్త్రీయ జ్యోతిష్య సలహాలను ఒకే చోట సులభంగా అందించేందుకు ఈ వేదిక రూపొందించబడింది.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a 
                href="#dasara-section" 
                onClick={(e) => { setIsModalOpen(false); handleScrollToDasara(e); }}
                className="ghanta-btn ghanta-btn-primary"
                style={{ fontSize: '0.9rem', padding: '10px 18px' }}
              >
                🪷 దసరా నవరాత్రులు
              </a>
              <a 
                href="https://api.whatsapp.com/send?phone=+919490478707" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ghanta-btn ghanta-btn-whatsapp"
                style={{ fontSize: '0.9rem', padding: '10px 18px' }}
              >
                WhatsApp చాట్
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
