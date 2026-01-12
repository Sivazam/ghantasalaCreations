// Shiva Smarana Temple Page - 2D animated experience
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Temple2DScene from './Temple2DScene';
import './ShivaSmaranaTemplePage.css';

// Main Component
function ShivaSmaranaTemplePage() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [dropletTrigger, setDropletTrigger] = useState(0);

    const handleOmClick = useCallback(() => {
        setCount(prev => prev + 1);
        setDropletTrigger(prev => prev + 1);
    }, []);

    const handleExit = useCallback(() => {
        navigate('/shiva-smarana');
    }, [navigate]);

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
                justifyContent: 'flex-end',
                padding: '16px 20px',
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%)'
            }}>
                <button
                    onClick={handleExit}
                    style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        border: '1px solid rgba(244, 67, 54, 0.3)',
                        background: 'rgba(244, 67, 54, 0.2)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    ✕
                </button>
            </div>

            {/* 2D Temple Scene */}
            <Temple2DScene dropletTrigger={dropletTrigger} />

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

            {/* Bottom button bar */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                display: 'flex',
                justifyContent: 'center',
                padding: '24px',
                background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%)'
            }}>
                <button
                    onClick={handleOmClick}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '20px 50px',
                        background: 'linear-gradient(145deg, #b8860b, #daa520, #ffd700)',
                        border: '3px solid #ffd700',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
                        minWidth: '280px',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <span style={{
                        fontFamily: "'Noto Serif Telugu', serif",
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#1a0a00'
                    }}>ఓం నమః శివాయ</span>
                    <span style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#4a2800',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}>Om Namah Shivaya</span>
                    <span style={{
                        fontSize: '0.75rem',
                        color: '#5c3d00',
                        marginTop: '8px'
                    }}>Click to offer sacred water</span>
                </button>
            </div>
        </div>
    );
}

export default ShivaSmaranaTemplePage;
