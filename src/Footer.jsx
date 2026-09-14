import React from "react";
import { Link, useLocation } from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const currentPath = location.pathname;
    const currentHash = location.hash;

    const handleComingSoon = (e, name) => {
        if (e) e.preventDefault();
        alert(`${name ? name + ': ' : ''}త్వరలో అందుబాటులోకి వస్తుంది (Coming Soon)`);
    };

    const handleDasaraClick = (e) => {
        const el = document.getElementById('dasara-section');
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', '/#dasara-section');
        }
    };

    // Route-based active detection
    const isDasaraActive = currentPath.startsWith('/dasara') || (currentPath === '/' && currentHash === '#dasara-section');
    const isShivaActive = currentPath.startsWith('/shiva-smarana');
    const isVivahamActive = currentPath === '/nakshatras' || currentPath === '/nakshatra_detail';
    const isProjectsActive = currentPath === '/projects';
    const isGalleryActive = currentPath === '/gallery';
    const isQuestionsActive = currentPath === '/questions';

    return (
        <footer className="spiritual-footer">
            {/* Golden glowing accent line at very top */}
            <div className="footer-top-accent"></div>

            <div className="footer-container">
                {/* Sacred Ribbon with Shloka & Holy Emblems */}
                <div className="footer-sacred-ribbon">
                    <div className="sacred-symbols">🪔 ✦ 🕉️ ✦ 🪷 ✦ 🕉️ ✦ 🪔</div>
                    <p className="sacred-shloka">
                        || ఓం శ్రీ మాత్రే నమః | ఓం నమః శివాయ ||
                    </p>
                </div>

                {/* 4-Column Structured Content Grid */}
                <div className="footer-grid">
                    
                    {/* Column 1: Brand, Mission & Fast Actions */}
                    <div className="footer-col">
                        <div className="footer-brand-title">
                            <span>🕉️</span>
                            <span>ఘంటసాల ఆర్ట్స్</span>
                        </div>
                        <span className="footer-tagline">|| ధర్మో రక్షతి రక్షితః ||</span>
                        <p className="footer-description">
                            సనాతన ధర్మ వైభవం, దేవతా పూజా విధులు, వేద జ్ఞానం, జ్యోతిష్య మార్గదర్శనం మరియు భక్తి సాధనకు అంకితమైన సమగ్ర ఆధ్యాత్మిక వేదిక.
                        </p>
                        <div className="footer-quick-actions">
                            <a 
                                href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer-action-pill whatsapp"
                                title="WhatsApp Direct Chat"
                            >
                                <WhatsAppIcon style={{ fontSize: '1.15rem' }} />
                                <span>వాట్సాప్</span>
                            </a>
                            <a 
                                href="tel:+919490478707" 
                                className="footer-action-pill"
                                title="Call directly"
                            >
                                <CallIcon style={{ fontSize: '1.15rem' }} />
                                <span>కాల్ చేయండి</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Spiritual Events & Rituals */}
                    <div className="footer-col">
                        <h5 className="footer-heading">
                            <span>🪷</span> ఆధ్యాత్మిక ఉత్సవాలు &amp; పూజలు
                        </h5>
                        <ul className="footer-nav-list">
                            <li className="footer-nav-item">
                                <a 
                                    href="/#dasara-section" 
                                    onClick={handleDasaraClick}
                                    className={`footer-nav-link highlight ${isDasaraActive ? 'active-page' : ''}`}
                                >
                                    <span>🪷 దసరా నవరాత్రులు</span>
                                    <span style={{ fontSize: '0.72rem', background: '#ffd700', color: '#1a0505', padding: '1px 6px', borderRadius: '4px', fontWeight: '800' }}>విశేషం</span>
                                </a>
                            </li>
                            <li className="footer-nav-item">
                                <Link to="/shiva-smarana" className={`footer-nav-link ${isShivaActive ? 'active-page' : ''}`}>
                                    <span>🕉️ శ్రీ శివ స్మరణ &amp; జపం</span>
                                </Link>
                            </li>
                            <li className="footer-nav-item">
                                <button 
                                    onClick={(e) => handleComingSoon(e, "పూజలు")} 
                                    className="footer-nav-link"
                                >
                                    <span>🔱 నిత్య &amp; విశేష పూజలు</span>
                                    <span className="coming-soon-badge">త్వరలో</span>
                                </button>
                            </li>
                            <li className="footer-nav-item">
                                <button 
                                    onClick={(e) => handleComingSoon(e, "వాస్తు")} 
                                    className="footer-nav-link"
                                >
                                    <span>🏡 వాస్తు శాస్త్ర సలహాలు</span>
                                    <span className="coming-soon-badge">త్వరలో</span>
                                </button>
                            </li>
                            <li className="footer-nav-item">
                                <button 
                                    onClick={(e) => handleComingSoon(e, "జ్యోతిష్యం")} 
                                    className="footer-nav-link"
                                >
                                    <span>🔮 జ్యోతిష్య పరిష్కారాలు</span>
                                    <span className="coming-soon-badge">త్వరలో</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Vedic Wisdom & Portals */}
                    <div className="footer-col">
                        <h5 className="footer-heading">
                            <span>📖</span> వైదిక జ్ఞానం &amp; సేవలు
                        </h5>
                        <ul className="footer-nav-list">
                            <li className="footer-nav-item">
                                <button 
                                    onClick={(e) => handleComingSoon(e, "లెర్నింగ్ భగవద్గీత")} 
                                    className="footer-nav-link"
                                >
                                    <span>📖 లెర్నింగ్ భగవద్గీత</span>
                                    <span className="coming-soon-badge">త్వరలో</span>
                                </button>
                            </li>
                            <li className="footer-nav-item">
                                <button 
                                    onClick={(e) => handleComingSoon(e, "ఎంటర్టైన్మెంట్")} 
                                    className="footer-nav-link"
                                >
                                    <span>🎭 ఆధ్యాత్మిక ఎంటర్టైన్మెంట్</span>
                                    <span className="coming-soon-badge">త్వరలో</span>
                                </button>
                            </li>
                            <li className="footer-nav-item">
                                <Link to="/nakshatras" className={`footer-nav-link ${isVivahamActive ? 'active-page' : ''}`}>
                                    <span>💍 వివాహ నక్షత్రాల పొంతన</span>
                                </Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link to="/projects" className={`footer-nav-link ${isProjectsActive ? 'active-page' : ''}`}>
                                    <span>🏗️ దేవాలయ ప్రాజెక్టులు</span>
                                </Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link to="/gallery" className={`footer-nav-link ${isGalleryActive ? 'active-page' : ''}`}>
                                    <span>🖼️ దివ్య ఫొటో గ్యాలరీ</span>
                                </Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link to="/questions" className={`footer-nav-link ${isQuestionsActive ? 'active-page' : ''}`}>
                                    <span>❓ సందేహాలు - ప్రశ్నోత్తరాలు</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact & Timings */}
                    <div className="footer-col">
                        <h5 className="footer-heading">
                            <span>🪔</span> సంప్రదించండి &amp; వేళలు
                        </h5>
                        <ul className="footer-contact-list">
                            <li className="footer-contact-item">
                                <LocationOnIcon className="footer-contact-icon" />
                                <div className="footer-contact-text">
                                    <strong>స్థానం:</strong> ఘంటసాల గ్రామం, కృష్ణా జిల్లా, ఆంధ్రప్రదేశ్.
                                </div>
                            </li>
                            <li className="footer-contact-item">
                                <AccessTimeIcon className="footer-contact-icon" />
                                <div className="footer-contact-text">
                                    <strong>సేవా సమయాలు:</strong> ఉదయం 7:00 – రాత్రి 9:00 (ప్రతిరోజూ)
                                </div>
                            </li>
                            <li className="footer-contact-item">
                                <CallIcon className="footer-contact-icon" />
                                <div className="footer-contact-text">
                                    <strong>ఫోన్:</strong> <a href="tel:+919490478707">+91 94904 78707</a>
                                </div>
                            </li>
                            <li className="footer-contact-item">
                                <WhatsAppIcon className="footer-contact-icon" style={{ color: '#25d366' }} />
                                <div className="footer-contact-text">
                                    <strong>వాట్సాప్:</strong> <a href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " target="_blank" rel="noopener noreferrer">+91 94904 78707</a>
                                </div>
                            </li>
                        </ul>

                        <a 
                            href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="footer-whatsapp-cta"
                        >
                            <WhatsAppIcon style={{ fontSize: '1.25rem' }} />
                            <span>వాట్సాప్‌లో సందేహం అడగండి</span>
                        </a>
                    </div>

                </div>

                {/* Sub-footer Bottom Bar with Peace Shloka and Copyright */}
                <div className="footer-bottom-bar">
                    <p className="footer-copyright">
                        © {currentYear} Copyright 
                        <Link to="/" className="footer-copyright-link">
                            | ఘంటసాల ఆర్ట్స్ (Ghantasala Arts) |
                        </Link> 
                        సర్వహక్కులు ప్రత్యేకించబడినవి.
                    </p>
                    <p className="footer-blessing-text">
                        "సర్వే భవంతు సుఖినః | సర్వే సంతు నిరామయాః"
                    </p>
                </div>
            </div>
        </footer>
    );
}