// Shiva Smarana Temple Page - 2D animated experience
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Temple2DScene from './Temple2DScene';
import Leaderboard from '../components/leaderboard/Leaderboard'; // Import Leaderboard logic
import './ShivaSmaranaTemplePage.css';

// Firebase Imports (Standard ES6)
import { auth, db } from '../../../firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

// Main Component
function ShivaSmaranaTemplePage() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [dropletTrigger, setDropletTrigger] = useState(0);

    // COOLDOWN STATE
    // COOLDOWN STATE
    const [isCooldown, setIsCooldown] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // --- FIREBASE SYNC ---
    const queuedChantsRef = React.useRef(0);
    // We still need a forceUpdate or state to trigger re-renders if needed, 
    // but for background sync ref is better. 
    // We'll use a local counter just for the 50-check if we want, or just check ref.

    // Initialize Count from Firestore
    React.useEffect(() => {
        const fetchCount = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const snap = await getDoc(docRef);
                    if (snap.exists()) {
                        const cloudCount = snap.data().chant_count || 0;
                        setCount(cloudCount);
                        // Force LocalStorage to match Cloud (Source of Truth)
                        localStorage.setItem('totalChants', cloudCount.toString());
                    }
                } catch (e) {
                    console.error("Firestore Read Error:", e);
                }
            } else {
                // Fallback to local storage if not logged in (legacy support)
                const stored = parseInt(localStorage.getItem('totalChants') || '0');
                if (stored) setCount(stored);
            }
        };
        fetchCount();
    }, []);

    // Sync Logic (Periodic + Unmount)
    const syncToCloud = useCallback(async () => {
        const amountToSync = queuedChantsRef.current;
        if (amountToSync === 0) return;

        // RESET IMMEDIATELY to prevent double syncs
        queuedChantsRef.current = 0;
        console.log("Syncing...", amountToSync);

        const user = auth.currentUser;
        if (!user) return;

        try {
            const userRef = doc(db, "users", user.uid);
            const lbRef = doc(db, "leaderboard", user.uid);

            await updateDoc(userRef, { chant_count: increment(amountToSync) });
            await updateDoc(lbRef, { chant_count: increment(amountToSync) });

            console.log("Synced successfully:", amountToSync);
        } catch (e) {
            console.error("Sync Error Detailed:", e);
            // Verify if we should restore the count on failure? 
            // For now, simpler to log. Safety first.
        }
    }, []);

    // Sync on Unmount
    React.useEffect(() => {
        return () => {
            if (queuedChantsRef.current > 0) syncToCloud();
        }
    }, [syncToCloud]);

    // --- AUDIO SYSTEM (Lifted State) ---
    const [isMuted, setIsMuted] = useState(false); // Default Unmuted
    const bgMusicRef = React.useRef(null);

    // Leaderboard Modal State
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    // Login Prompt for Guests at Milestones
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    // CHANT TEXT ROTATION STATE
    const [chantTextIndex, setChantTextIndex] = useState(0);
    const chantTexts = [
        "ఓం నమః శివాయ",   // Telugu
        "Om Namah Shivaya", // English
        "ॐ नमः शिवाय"       // Hindi/Sanskrit
    ];

    // React.useEffect(() => {
    //     const interval = setInterval(() => {
    //         setChantTextIndex(prev => (prev + 1) % chantTexts.length);
    //     }, 3000);
    //     return () => clearInterval(interval);
    // }, []);

    // Re-enable safely
    React.useEffect(() => {
        const interval = setInterval(() => {
            setChantTextIndex(prev => (prev + 1) % chantTexts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // DIYA LIFTED STATE
    const [leftLit, setLeftLit] = useState(false);
    const [rightLit, setRightLit] = useState(false);
    const promptedMilestonesRef = React.useRef(new Set()); // Track which milestones we've prompted

    // LINGAM COLOR LOGIC STATE
    const [isGoldMode, setIsGoldMode] = useState(false); // Default Black
    const revertCountRef = React.useRef(null); // When to turn back to black
    const nextRandomTriggerRef = React.useRef(null); // Next trigger after 108

    // Initialize BG Music
    React.useEffect(() => {
        bgMusicRef.current = new Audio('/shivaMain.webm');
        bgMusicRef.current.loop = true;
        bgMusicRef.current.volume = 0.5;

        return () => {
            if (bgMusicRef.current) {
                bgMusicRef.current.pause();
                bgMusicRef.current = null;
            }
        };
    }, []);

    // Handle Playback
    React.useEffect(() => {
        if (!bgMusicRef.current) return;
        if (isMuted) {
            bgMusicRef.current.pause();
        } else {
            bgMusicRef.current.play().catch(e => {
                console.warn("Autoplay prevented", e);
                setIsMuted(true);
            });
        }
    }, [isMuted]);

    const toggleMute = () => setIsMuted(prev => !prev);
    const toggleLeaderboard = () => setShowLeaderboard(prev => !prev);


    const handleOmClick = useCallback(() => {
        // 1. Restriction: Both Diyas must be lit
        if (!leftLit || !rightLit) {
            // Simple alert or toast replacement
            const toast = document.createElement('div');
            toast.textContent = "Please light the diyas before chanting ✨";
            toast.style.cssText = `
                position: fixed;
                bottom: 120px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: #ffd700;
                padding: 12px 24px;
                border: 1px solid #ffd700;
                border-radius: 8px;
                z-index: 1000;
                font-family: serif;
                animation: fade-in-out 3s forwards;
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
            return;
        }

        if (isCooldown) return; // Prevent spam

        const newCount = count + 1;
        setCount(newCount);
        setDropletTrigger(prev => prev + 1);

        // Increment Queue Ref
        queuedChantsRef.current += 1;

        // SYNC EVERY 50 CHANTS
        if (queuedChantsRef.current >= 50) {
            syncToCloud();
        }

        // LINGAM COLOR LOGIC
        // 1. Check Revert (Turn back to Black)
        if (revertCountRef.current && newCount >= revertCountRef.current) {
            setIsGoldMode(false);
            revertCountRef.current = null;
        }

        // 2. Check Triggers (Turn to Gold)
        const milestones = [11, 21, 51, 71, 108];
        let shouldTurnGold = false;

        // A. Fixed Milestones
        if (milestones.includes(newCount)) {
            shouldTurnGold = true;
        }
        // B. Random Post-108 Triggers
        else if (newCount > 108) {
            // Initialize first random trigger if needed
            if (!nextRandomTriggerRef.current) {
                nextRandomTriggerRef.current = newCount + Math.floor(Math.random() * 11) + 20; // 20-30 counts later
            }

            if (newCount === nextRandomTriggerRef.current) {
                shouldTurnGold = true;
                nextRandomTriggerRef.current = null; // Reset for next cycle
            }
        }

        // Apply Gold Logic
        if (shouldTurnGold) {
            setIsGoldMode(true);
            const duration = Math.floor(Math.random() * 4) + 7; // 7 to 10 counts
            revertCountRef.current = newCount + duration;
        }

        // LOGIN PROMPT FOR GUESTS at milestones (21, 59, 109)
        const loginMilestones = [21, 59, 109];
        if (!auth.currentUser && loginMilestones.includes(newCount) && !promptedMilestonesRef.current.has(newCount)) {
            promptedMilestonesRef.current.add(newCount);
            setShowLoginPrompt(true);
        }

        // Start Cooldown (1 Second)
        setIsCooldown(true);
        setTimeout(() => {
            setIsCooldown(false);
        }, 1000);

        // Legacy Local Storage (ALWAYS update this for instant home page display)
        const currentTotal = parseInt(localStorage.getItem('totalChants') || '0');
        localStorage.setItem('totalChants', (currentTotal + 1).toString());
    }, [isCooldown, syncToCloud, count, leftLit, rightLit]);

    const handleExit = useCallback(async () => {
        // Force Sync before exit
        if (queuedChantsRef.current > 0) {
            setIsSaving(true);
            await syncToCloud();
            setIsSaving(false);
        }

        // Exit Fullscreen if active
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.warn("Exit Fullscreen error:", err));
        }
        navigate('/shiva-smarana');
    }, [navigate, syncToCloud]);

    return (
        <div className="temple-page">
            {/* Control bar */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center', // Align center vertical
                padding: '16px 20px',
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%)',
                pointerEvents: 'none' // Let clicks pass through empty space
            }}>
                {/* Left Side: Leaderboard Trigger */}
                <button
                    onClick={toggleLeaderboard}
                    style={{
                        pointerEvents: 'auto', // Re-enable clicks
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 215, 0, 0.6)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: '#ffd700',
                        cursor: 'pointer',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)'
                    }}
                    title="View Leaderboard"
                >
                    🏆
                </button>

                {/* Right Side: Controls */}
                <div style={{
                    display: 'flex',
                    gap: '15px',
                    pointerEvents: 'auto' // Re-enable clicks
                }}>
                    {/* Mute Button */}
                    <button
                        onClick={toggleMute}
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            border: '1px solid rgba(255, 215, 0, 0.5)',
                            background: 'rgba(0, 0, 0, 0.4)',
                            color: '#ffd700',
                            cursor: 'pointer',
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(4px)'
                        }}
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? "🔇" : "🔊"}
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={handleExit}
                        disabled={isSaving}
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            border: '1px solid rgba(244, 67, 54, 0.3)',
                            background: isSaving ? 'rgba(255, 165, 0, 0.5)' : 'rgba(244, 67, 54, 0.2)',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: isSaving ? '10px' : '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title="Exit"
                    >
                        {isSaving ? "⏳" : "✕"}
                    </button>
                </div>
            </div>

            {/* 2D Temple Scene Container */}
            <div className="temple-canvas-container">
                <Temple2DScene
                    dropletTrigger={dropletTrigger}
                    isMuted={isMuted}
                    count={count}
                    leftLit={leftLit}
                    setLeftLit={setLeftLit}
                    rightLit={rightLit}
                    setRightLit={setRightLit}
                    isGoldMode={isGoldMode}
                />
            </div>

            {/* Leaderboard Modal Overlay */}
            {showLeaderboard && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 200, // Topmost
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '500px',
                        background: 'linear-gradient(135deg, #1a0a0a 0%, #2d1810 100%)',
                        border: '2px solid rgba(255, 215, 0, 0.4)',
                        borderRadius: '20px',
                        boxShadow: '0 0 30px rgba(255, 165, 0, 0.3)',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        {/* Close Modal Button */}
                        <button
                            onClick={toggleLeaderboard}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'transparent',
                                border: 'none',
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: '24px',
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                        >
                            ✕
                        </button>

                        {/* Leaderboard Component */}
                        <div style={{ padding: '20px 0' }}>
                            <Leaderboard />
                        </div>
                    </div>
                </div>
            )}

            {/* Session count overlay */}
            <div style={{
                position: 'fixed',
                top: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 50,
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                borderRadius: '12px',
                padding: '12px 24px',
                textAlign: 'center'
            }}>
                <span style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: '4px'
                }}>This Session</span>
                <span style={{
                    fontFamily: 'monospace',
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#ffd700',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                }}>{count.toLocaleString('en-IN')}</span>
            </div>

            <div className="bottom-button-bar">
                <button
                    onClick={handleOmClick}
                    disabled={isCooldown}
                    className={`chant-button ${isCooldown ? 'cooldown' : ''}`}
                >
                    <span className="btn-main-text key-text">
                        {isCooldown ? "Offering..." : chantTexts[chantTextIndex]}
                    </span>
                    <span className="btn-hint-text">
                        {isCooldown ? "" : "Click to offer sacred water"}
                    </span>
                </button>
            </div>

            {/* Login Prompt Modal for Guests at Milestones */}
            {showLoginPrompt && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    backdropFilter: 'blur(5px)'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
                        borderRadius: '20px',
                        padding: '30px 25px',
                        maxWidth: '380px',
                        width: '90%',
                        textAlign: 'center',
                        border: '2px solid #ffd700',
                        boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🙏✨🙏</div>
                        <h3 style={{
                            color: '#ffd700',
                            fontFamily: 'serif',
                            fontSize: '1.3rem',
                            marginBottom: '10px'
                        }}>
                            Amazing! {count} Chants Complete!
                        </h3>
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.9rem',
                            marginBottom: '20px',
                            lineHeight: '1.5'
                        }}>
                            Login to unlock the <strong style={{ color: '#ffd700' }}>Leaderboard</strong> and sync your progress across devices!
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button
                                onClick={() => {
                                    setShowLoginPrompt(false);
                                    handleExit();
                                    // Navigate to home to trigger login
                                    navigate('/');
                                }}
                                style={{
                                    background: 'linear-gradient(135deg, #4285f4 0%, #357ae8 100%)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 20px',
                                    borderRadius: '10px',
                                    fontSize: '0.95rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                🔐 Login Now
                            </button>

                            <button
                                onClick={() => setShowLoginPrompt(false)}
                                style={{
                                    background: 'transparent',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    padding: '10px 20px',
                                    borderRadius: '10px',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Continue as Guest
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShivaSmaranaTemplePage;
