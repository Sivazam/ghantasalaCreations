// Simplified Shiva Smarana Home Page - for testing
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import './ShivaSmaranaHomePage.css';

const ShivaSmaranaHomePage = () => {
    const navigate = useNavigate();
    const [showFullscreenPrompt, setShowFullscreenPrompt] = React.useState(false);

    // User Data State - now includes isGuest flag
    const [userData, setUserData] = React.useState({ name: '', count: 0, isGuest: false });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Logged-in user - fetch from Firestore
                try {
                    const docRef = doc(db, "users", user.uid);
                    const snap = await getDoc(docRef);
                    if (snap.exists()) {
                        const data = snap.data();
                        setUserData({
                            name: data.name || 'Devotee',
                            count: data.chant_count || 0,
                            isGuest: false
                        });
                    }
                } catch (e) {
                    console.error("Error fetching user data:", e);
                }
            } else {
                // Guest mode - use localStorage
                const stored = localStorage.getItem('totalChants');
                setUserData({
                    name: 'Guest',
                    count: stored ? parseInt(stored) : 0,
                    isGuest: true
                });
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
            localStorage.removeItem('isGuestMode');
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
                    <div style={{
                        color: '#ffd700',
                        fontSize: '1.2rem',
                        marginBottom: '10px',
                        fontFamily: 'serif',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        Welcome back, {userData.name} 🙏
                    </div>
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
                        <h3>🕉️ Are you ready for an immersive experience?</h3>
                        <p>Take a deep breath and enter the divine temple.</p>
                        <div className="modal-actions">
                            <button className="modal-btn primary" onClick={confirmFullscreen}>
                                🙏 Let's Start
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="shiva-home-footer">
                <p>🙏 ఓం నమః శివాయ 🙏</p>
                {/* Show Sign Out for logged-in users, Login prompt for guests */}
                {!userData.isGuest ? (
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
                ) : (
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: 'rgba(255, 215, 0, 0.2)',
                            color: '#ffd700',
                            border: '1px solid rgba(255, 215, 0, 0.4)',
                            padding: '5px 15px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            marginTop: '15px'
                        }}
                    >
                        Login to Save Progress
                    </button>
                )}
            </footer>
        </div>
    );
};

export default ShivaSmaranaHomePage;
