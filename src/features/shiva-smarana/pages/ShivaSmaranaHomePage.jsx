// Simplified Shiva Smarana Home Page - for testing
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShivaSmaranaHomePage.css';

const ShivaSmaranaHomePage = () => {
    const navigate = useNavigate();

    const handleStartTemple = () => {
        navigate('/shiva-smarana/temple');
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="shiva-home-page">
            {/* Background effects */}
            <div className="divine-bg-effects">
                <div className="bg-glow glow-1"></div>
                <div className="bg-glow glow-2"></div>
            </div>

            {/* Header */}
            <header className="shiva-home-header">
                <button className="back-btn" onClick={handleBackToHome}>
                    ← Back to Home
                </button>
                <div className="header-title">
                    <span className="om-symbol">🕉️</span>
                    <h1>శివ నామ స్మరణ</h1>
                    <p>Shiva Nama Smarana</p>
                </div>
            </header>

            {/* Main content */}
            <main className="shiva-home-content">
                {/* User stats card */}
                <div className="user-stats-card">
                    <div className="stat-item">
                        <span className="stat-label">Your Total Abhishekams</span>
                        <span className="stat-value">0</span>
                    </div>
                </div>

                {/* Leaderboard placeholder */}
                <div className="leaderboard-section">
                    <div style={{
                        background: 'rgba(30, 20, 15, 0.9)',
                        border: '1px solid rgba(255, 215, 0, 0.3)',
                        borderRadius: '16px',
                        padding: '24px',
                        textAlign: 'center',
                        color: '#ffd700'
                    }}>
                        <h2>🏆 Global Leaderboard</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Coming Soon...</p>
                    </div>
                </div>

                {/* Start button */}
                <div className="start-section">
                    <div className="start-decoration">
                        <div className="om-circle">🕉️</div>
                    </div>
                    <button className="start-temple-btn" onClick={handleStartTemple}>
                        <span className="btn-icon">🙏</span>
                        <span className="btn-text">
                            <span className="btn-title">Enter Divine Temple</span>
                            <span className="btn-subtitle">Start Shiva Nama Smarana</span>
                        </span>
                        <span className="btn-icon">🙏</span>
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="shiva-home-footer">
                <p>🙏 ఓం నమః శివాయ 🙏</p>
            </footer>
        </div>
    );
};

export default ShivaSmaranaHomePage;
