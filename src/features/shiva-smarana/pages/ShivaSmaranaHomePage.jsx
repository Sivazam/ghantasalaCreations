// Simplified Shiva Smarana Home Page - for testing
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth'; // Import signOut
import './ShivaSmaranaHomePage.css';

const ShivaSmaranaHomePage = () => {
    const navigate = useNavigate();
    const [showFullscreenPrompt, setShowFullscreenPrompt] = React.useState(false);

    // User Data State
    const [userData, setUserData] = React.useState({ name: '', count: 0 });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const snap = await getDoc(docRef);
                    if (snap.exists()) {
                        const data = snap.data();
                        setUserData({
                            name: data.name || 'Devotee',
                            count: data.chant_count || 0
                        });
                    }
                } catch (e) {
                    console.error("Error fetching user data:", e);
                }
            } else {
                // Fallback to local storage if not logged in
                const stored = localStorage.getItem('totalChants');
                if (stored) setUserData(prev => ({ ...prev, count: parseInt(stored) }));
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


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

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Logout Error:", error);
        }
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
                    ← Back
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
                    {userData.name && (
                        <div style={{
                            color: '#ffd700',
                            fontSize: '1.2rem',
                            marginBottom: '10px',
                            fontFamily: 'serif',
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        }}>
                            Welcome back, {userData.name} 🙏
                        </div>
                    )}
                    <div className="stat-item">
                        <span className="stat-label">Total Chant Count</span>
                        <span className="stat-value">
                            {loading ? '...' : userData.count.toLocaleString('en-IN')}
                        </span>
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
                {userData.name && (
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'rgba(255, 0, 0, 0.2)',
                            color: 'white',
                            border: '1px solid rgba(255, 0, 0, 0.4)',
                            padding: '5px 15px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            marginTop: '15px'
                        }}
                    >
                        Sign Out
                    </button>
                )}
            </footer>
        </div>
    );
};

export default ShivaSmaranaHomePage;
