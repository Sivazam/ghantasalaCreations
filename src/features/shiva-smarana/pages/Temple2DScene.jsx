// 2D Temple Scene - With realistic snake like reference
import React, { useState, useRef, useEffect } from 'react';
import './Temple2DScene.css';

// Water Droplet Component
function WaterDroplet({ id, onComplete }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete(id);
        }, 1000);
        return () => clearTimeout(timer);
    }, [id, onComplete]);

    return <div className="water-droplet"></div>;
}

// Splash Effect Component
function SplashEffect({ id, onComplete }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete(id);
        }, 400);
        return () => clearTimeout(timer);
    }, [id, onComplete]);

    return (
        <div className="splash-effect">
            <div className="splash-drop splash-1"></div>
            <div className="splash-drop splash-2"></div>
            <div className="splash-drop splash-3"></div>
            <div className="splash-drop splash-4"></div>
            <div className="splash-drop splash-5"></div>
        </div>
    );
}

// Main 2D Temple Scene
function Temple2DScene({ dropletTrigger }) {
    const [droplets, setDroplets] = useState([]);
    const [splashes, setSplashes] = useState([]);
    const lastTriggerRef = useRef(0);
    const dropletIdRef = useRef(0);

    useEffect(() => {
        if (dropletTrigger > lastTriggerRef.current) {
            dropletIdRef.current += 1;
            const newId = dropletIdRef.current;

            setDroplets(prev => [...prev, { id: newId }]);
            lastTriggerRef.current = dropletTrigger;

            setTimeout(() => {
                setSplashes(prev => [...prev, { id: newId }]);
            }, 950);
        }
    }, [dropletTrigger]);

    const handleDropletComplete = (id) => {
        setDroplets(prev => prev.filter(d => d.id !== id));
    };

    const handleSplashComplete = (id) => {
        setSplashes(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="temple-2d-scene">
            {/* Temple Background */}
            <div className="temple-background">
                <div className="divine-rays"></div>
            </div>

            {/* Water Vessel (Daara Patra) */}
            <div className="daara-patra">
                <div className="vessel-handle"></div>
                <div className="vessel-body">
                    <div className="vessel-water"></div>
                </div>
                <div className="vessel-bulge"></div>
                <div className="vessel-spout"></div>
            </div>

            {/* Water droplets */}
            <div className="droplet-path">
                {droplets.map((d) => (
                    <WaterDroplet key={d.id} id={d.id} onComplete={handleDropletComplete} />
                ))}
            </div>

            {/* Shiva Lingam */}
            <div className="shiva-lingam-container">
                {/* Orange sun halo */}
                <div className="lingam-halo"></div>

                {/* Crescent moon */}
                <div className="crescent-moon">🌙</div>

                <div className="shiva-lingam">
                    {/* Main lingam */}
                    <div className="lingam-top">
                        {/* Tripundra */}
                        <div className="tripundra">
                            <div className="tripundra-line"></div>
                            <div className="tripundra-line middle"></div>
                            <div className="tripundra-line"></div>
                        </div>

                        {/* Snake coils - just below tripundra on lingam sphere */}
                        <svg className="snake-coil-front" viewBox="0 0 130 45" width="130" height="45">
                            <defs>
                                {/* Clean gradient for snake */}
                                <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8b7355" />
                                    <stop offset="50%" stopColor="#c4a97a" />
                                    <stop offset="100%" stopColor="#8b7355" />
                                </linearGradient>
                            </defs>
                            {/* First coil (upper) - connected to head */}
                            <path
                                d="M 5 15 Q 30 25, 55 18 Q 80 11, 105 20"
                                fill="none"
                                stroke="url(#snakeGrad)"
                                strokeWidth="7"
                                strokeLinecap="round"
                            />
                            {/* Shadow/separation line below first coil */}
                            <path
                                d="M 7 19 Q 32 28, 56 22 Q 80 16, 104 23"
                                fill="none"
                                stroke="rgba(50,35,20,0.5)"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            {/* Second coil (lower) with tail attached */}
                            <path
                                d="M 8 23 Q 35 32, 58 26 Q 82 20, 115 28"
                                fill="none"
                                stroke="url(#snakeGrad)"
                                strokeWidth="7"
                                strokeLinecap="round"
                            />
                            {/* Tail tip - only this animates */}
                            <path
                                className="snake-tail-tip"
                                d="M 115 28 Q 120 29, 128 25"
                                fill="none"
                                stroke="url(#snakeGrad)"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            {/* Body going up-left to head */}
                            <path
                                d="M 5 15 C -5 10, -12 5, -18 0"
                                fill="none"
                                stroke="url(#snakeGrad)"
                                strokeWidth="6"
                                strokeLinecap="round"
                            />
                        </svg>

                        {/* No back coil SVG - it's hidden behind the lingam */}

                        {/* Snake head - on the left of lingam */}
                        <div className="snake-head-wrap">
                            <div className="snake-head">
                                <div className="snake-hood"></div>
                                <div className="snake-eye left"></div>
                                <div className="snake-eye right"></div>
                                <div className="snake-tongue"></div>
                            </div>
                        </div>
                    </div>

                    {/* Yoni base */}
                    <div className="yoni-base">
                        <div className="yoni-spout"></div>
                    </div>

                    {/* Pedestal */}
                    <div className="lingam-pedestal"></div>
                </div>

                {/* Splash Effects */}
                <div className="splashes-container">
                    {splashes.map((s) => (
                        <SplashEffect key={s.id} id={s.id} onComplete={handleSplashComplete} />
                    ))}
                </div>
            </div>

            {/* Diyas */}
            <div className="diya left-diya">
                <div className="diya-base"></div>
                <div className="flame">🔥</div>
            </div>
            <div className="diya right-diya">
                <div className="diya-base"></div>
                <div className="flame">🔥</div>
            </div>

            {/* Om Symbol */}
            <div className="floating-om">🕉️</div>
        </div>
    );
}

export default Temple2DScene;
