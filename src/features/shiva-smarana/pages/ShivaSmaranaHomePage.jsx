// Simplified Shiva Smarana Home Page - for testing
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShivaSmaranaHomePage.css';

const ShivaSmaranaHomePage = () => {
    const navigate = useNavigate();
    const [showFullscreenPrompt, setShowFullscreenPrompt] = React.useState(false);

    const handleStartTemple = () => {
        setShowFullscreenPrompt(true);
    };

    const confirmFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => console.warn("Fullscreen error:", err));
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
        navigate('/shiva-smarana/temple');
    };

    const skipFullscreen = () => {
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

                    <h1>శివ నామ స్మరణ</h1>
                    <p>Shiva Nama Smarana</p>
                </div>
            </header>

            {/* Main content */}
            <main className="shiva-home-content">
                {/* User stats card */}
                <div className="user-stats-card">
                    <div className="stat-item">
                        <span className="stat-label">Total Chant Count</span>
                        <span className="stat-value">0</span>
                    </div>
                </div>

                {/* Start button */}
                <div className="start-section">
                    <div className="start-decoration">
                    </div>
                    <button className="start-temple-btn" onClick={handleStartTemple}>
                        <span className="btn-icon">🙏</span>
                        <span className="btn-text">
                            <span className="btn-title">Start Chanting</span>
                        </span>
                        <span className="btn-icon">🙏</span>
                    </button>
                </div>
            </main>

            {/* Fullscreen Confirmation Modal */}
            {showFullscreenPrompt && (
                <div className="fullscreen-modal-overlay">
                    <div className="fullscreen-modal">
                        <h3>Enter Divine Experience?</h3>
                        <p>For the best immersion, we recommend enabling Fullscreen mode.</p>
                        <div className="modal-actions">
                            <button className="modal-btn secondary" onClick={skipFullscreen}>
                                Normal Mode
                            </button>
                            <button className="modal-btn primary" onClick={confirmFullscreen}>
                                Go Fullscreen
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="shiva-home-footer">
                <p>🙏 ఓం నమః శివాయ 🙏</p>
            </footer>
        </div>
    );
};

export default ShivaSmaranaHomePage;
