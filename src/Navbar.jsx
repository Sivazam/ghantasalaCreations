import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DP from './images/dp.png';
import { auth, db } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { checkIsAdmin } from './features/dasara/firebase/dasaraFirestore';

export default function Navrbar(){
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            if (user) {
                const adminStatus = await checkIsAdmin(user.uid);
                setIsAdmin(adminStatus);
            } else {
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            // Check if user doc exists in Firestore, if not create default
            const userDocRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDocRef);
            if (!userSnap.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    name: user.displayName || 'Devotee',
                    email: user.email || '',
                    createdAt: new Date().toISOString()
                }, { merge: true });
            }
            const adminStatus = await checkIsAdmin(user.uid);
            setIsAdmin(adminStatus);
        } catch (error) {
            console.error("Navbar Login Error:", error);
            if (error.code !== 'auth/popup-closed-by-user') {
                alert("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('isGuestMode');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return(
        <nav className="navbar navbar-expand-lg navbar-dark" id="navBar">
            <span className="container-fluid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link className="navbar-brand" to="/" style={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}>
                    <img src={DP} width="45" height="45" className="d-inline-block align-middle icon" alt="Logo" />
                    <span className="floating" style={{ fontSize: '20px', fontWeight: '900', textAlign: 'left', marginLeft: '8px' }}>Ghantasala arts</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Mobile Quick Login / Avatar */}
                    <div className="d-lg-none">
                        {currentUser ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <img 
                                    src={currentUser.photoURL || 'https://via.placeholder.com/32'} 
                                    alt="Profile" 
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ffd700' }} 
                                />
                                {isAdmin && <span style={{ fontSize: '0.75rem', background: '#ffd700', color: '#000', padding: '1px 5px', borderRadius: '4px', fontWeight: 'bold' }}>Admin</span>}
                            </div>
                        ) : (
                            <button 
                                onClick={handleLogin}
                                disabled={loading}
                                style={{
                                    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                                    color: '#000',
                                    border: 'none',
                                    borderRadius: '16px',
                                    padding: '4px 12px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                {loading ? '...' : '🔑 Login'}
                            </button>
                        )}
                    </div>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse" id="navbarNav" style={{ margin: '0.5rem 0' }}>
                    <ul className="navbar-nav ms-auto" style={{ alignItems: 'center', gap: '6px' }}>
                        {/* Dasara Nav Link */}
                        <li className="nav-item">
                            <a className="nav-link" href="/#dasara-section">
                                <button className="btn" style={{ color: '#ffd700', border: '1px solid #ffd700', background: 'rgba(255, 215, 0, 0.1)', fontWeight: 'bold' }}>
                                    🪷 దసరా నవరాత్రులు
                                </button>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); alert("Coming soon"); }}>
                                <button className="btn" style={{ color: 'white', border: '1px solid yellow' }}>వాస్తు</button>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); alert("Coming soon"); }}>
                                <button className="btn" style={{ color: 'white', border: '1px solid yellow' }}>జ్యోతిష్యం</button>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); alert("Coming soon"); }}>
                                <button className="btn" style={{ color: 'white', border: '1px solid yellow' }}>పూజలు</button>
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/nakshatras">
                                <button className="btn" style={{ color: 'white', border: '1px solid yellow' }}>వివాహం</button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/projects">
                                <button className="btn" style={{ color: 'white', border: '1px solid yellow' }}>ప్రాజెక్టులు</button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/gallery">
                                <button className="btn" style={{ color: 'white', border: '1px solid yellow' }}>ఫొటో గ్యాలరీ</button>
                            </Link>
                        </li>

                        {/* Desktop Auth Section */}
                        <li className="nav-item" style={{ marginLeft: '10px' }}>
                            {currentUser ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.4)', padding: '5px 12px', borderRadius: '25px', border: '1px solid #ffd700' }}>
                                    <img 
                                        src={currentUser.photoURL || 'https://via.placeholder.com/32'} 
                                        alt="Profile" 
                                        style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ffd700' }} 
                                    />
                                    <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
                                        <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, display: 'block' }}>
                                            {currentUser.displayName || currentUser.email?.split('@')[0]}
                                        </span>
                                        {isAdmin && (
                                            <span style={{ color: '#ffd700', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                                👑 Admin
                                            </span>
                                        )}
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid rgba(255,255,255,0.4)',
                                            color: '#ff6b6b',
                                            borderRadius: '12px',
                                            padding: '2px 8px',
                                            fontSize: '0.75rem',
                                            cursor: 'pointer',
                                            marginLeft: '4px'
                                        }}
                                        title="Logout"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={handleLogin}
                                    disabled={loading}
                                    style={{
                                        background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                                        color: '#000',
                                        border: 'none',
                                        borderRadius: '20px',
                                        padding: '8px 20px',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        boxShadow: '0 0 10px rgba(255, 215, 0, 0.4)'
                                    }}
                                >
                                    <span>🔑</span> {loading ? 'Logging in...' : 'లాగిన్ / Login'}
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </span>
        </nav>
    );
}