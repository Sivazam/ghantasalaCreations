import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DP from './images/dp.png';
import './Navbar.css';

export default function Navrbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    const currentHash = location.hash;

    const handleComingSoon = (e, menuName) => {
        if (e) e.preventDefault();
        setIsNavOpen(false);
        alert(`${menuName ? menuName + ': ' : ''}త్వరలో అందుబాటులోకి వస్తుంది (Coming soon)`);
    };

    const handleDasaraClick = (e) => {
        setIsNavOpen(false);
        const el = document.getElementById('dasara-section');
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', '/#dasara-section');
        }
    };

    const handleAppsClick = (e) => {
        setIsNavOpen(false);
        const el = document.getElementById('new-apps-section') || document.querySelector('.new-apps-section-wrapper');
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', '/#new-apps-section');
        }
    };

    // Active state detection
    const isDasaraActive = currentPath.startsWith('/dasara') || (currentPath === '/' && currentHash === '#dasara-section');
    const isVivahamActive = currentPath === '/nakshatras' || currentPath === '/nakshatra_detail';
    const isGalleryActive = currentPath === '/gallery';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" id="navBar">
            <div className="container-fluid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link 
                    className="navbar-brand" 
                    to="/" 
                    onClick={() => setIsNavOpen(false)}
                    style={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}
                >
                    <img src={DP} width="44" height="44" className="d-inline-block align-middle icon" alt="Logo" />
                    <span className="navbar-brand-title" style={{ marginLeft: '10px' }}>
                        ఘంటసాల <span>ఆర్ట్స్</span>
                    </span>
                </Link>

                <div>
                    <button 
                        className="navbar-toggler custom-nav-toggler" 
                        type="button" 
                        aria-controls="navbarNav" 
                        aria-expanded={isNavOpen} 
                        aria-label="Toggle navigation"
                        onClick={() => setIsNavOpen(prev => !prev)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto" style={{ alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        
                        {/* New Apps Nav Pill */}
                        <li className="nav-item">
                            <a 
                                className="nav-link" 
                                href="/#new-apps-section" 
                                onClick={handleAppsClick}
                            >
                                <span className="nav-pill-btn">
                                    ✨ ముఖ్యమైన యాప్‌లు
                                </span>
                            </a>
                        </li>

                        {/* 1. Dasara Special */}
                        <li className="nav-item">
                            <a 
                                className="nav-link" 
                                href="/#dasara-section" 
                                onClick={handleDasaraClick}
                            >
                                <span className={`nav-pill-btn dasara-highlight ${isDasaraActive ? 'active-nav-btn' : ''}`}>
                                    🪷 దసరా నవరాత్రులు
                                </span>
                            </a>
                        </li>

                        {/* 2. Vastu (Coming soon) */}
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={(e) => handleComingSoon(e, "వాస్తు")}>
                                <span className="nav-pill-btn">వాస్తు</span>
                            </a>
                        </li>

                        {/* 3. Astrology (Coming soon) */}
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={(e) => handleComingSoon(e, "జ్యోతిష్యం")}>
                                <span className="nav-pill-btn">జ్యోతిష్యం</span>
                            </a>
                        </li>

                        {/* 4. Entertainment (Coming soon) */}
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={(e) => handleComingSoon(e, "ఎంటర్టైన్మెంట్")}>
                                <span className="nav-pill-btn">ఎంటర్టైన్మెంట్</span>
                            </a>
                        </li>

                        {/* 5. Learning Gita (Coming soon) */}
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={(e) => handleComingSoon(e, "లెర్నింగ్ భగవద్గీత")}>
                                <span className="nav-pill-btn">లెర్నింగ్ భగవద్గీత</span>
                            </a>
                        </li>

                        {/* 6. Marriage / Nakshatras */}
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/nakshatras" 
                                onClick={() => setIsNavOpen(false)}
                            >
                                <span className={`nav-pill-btn ${isVivahamActive ? 'active-nav-btn' : ''}`}>
                                    వివాహం
                                </span>
                            </Link>
                        </li>

                        {/* 7. Photo Gallery */}
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/gallery" 
                                onClick={() => setIsNavOpen(false)}
                            >
                                <span className={`nav-pill-btn ${isGalleryActive ? 'active-nav-btn' : ''}`}>
                                    ఫొటో గ్యాలరీ
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}