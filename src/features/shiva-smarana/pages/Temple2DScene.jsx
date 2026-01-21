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
function Temple2DScene({ dropletTrigger, isMuted, count, leftLit, setLeftLit, rightLit, setRightLit, isGoldMode }) { // Accepting props
    const [droplets, setDroplets] = useState([]);
    const [splashes, setSplashes] = useState([]);

    // DIYA STATE (Lifted to Parent)


    const playMatchSound = () => {
        if (!isMuted) {
            const audio = new Audio('/match.mp3');
            audio.volume = 0.6;
            audio.play().catch(console.error);
        }
    };

    const handleLeftDiyaClick = (e) => {
        e.stopPropagation();
        if (!leftLit) {
            setLeftLit(true);
            playMatchSound();
        }
    };

    const handleRightDiyaClick = (e) => {
        e.stopPropagation();
        if (!rightLit) {
            setRightLit(true);
            playMatchSound();
        }
    };

    // CUSTOM BILVA LEAF STATE
    const [leaves, setLeaves] = useState([]);
    const [leafImage, setLeafImage] = useState(null);

    // PROCESS IMAGE TO REMOVE WHITE BACKGROUND
    useEffect(() => {
        const img = new Image();
        img.src = '/bilva-leaf-real.png';
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            // Iterating loops to clear white pixels
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                // If pixel is near white (>200), make it transparent
                if (r > 200 && g > 200 && b > 200) {
                    data[i + 3] = 0;
                }
            }

            ctx.putImageData(imgData, 0, 0);
            setLeafImage(canvas.toDataURL());
        };
    }, []);

    const lastTriggerRef = useRef(0);
    const dropletIdRef = useRef(0);

    const dropletSoundRef = useRef(null);

    // BILVA LEAF BLAST TRIGGER LOGIC
    const isFirstRenderRef = useRef(true);

    useEffect(() => {
        // Skip on initial mount/restore to prevent crashing
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            return;
        }

        if (count > 1 && count % 10 === 1) {
            const newLeaves = []; // ... logic continues
            const timestamp = Date.now();

            // Responsive Blast Config
            const isMobile = window.innerWidth < 768;
            const particleCount = isMobile ? 250 : 600; // MASSIVE COUNT
            const spreadX = isMobile ? 350 : 1200;      // FULL WIDTH
            const sizeBase = isMobile ? 40 : 80;
            const sizeVar = isMobile ? 30 : 40;

            // Landing Zone (Base of Lingam)
            const landBase = isMobile ? 65 : 80;

            // Spawn Bilva Leaves
            for (let i = 0; i < particleCount; i++) {
                // SHOWER LOGIC: Start from top, drift down
                const startWidth = isMobile ? 350 : 1200;
                const startXOffset = Math.random() * startWidth - (startWidth / 2); // Full width start
                const endXOffset = Math.random() * 100 - 50;

                newLeaves.push({
                    id: timestamp + i,
                    style: {
                        left: `calc(50% + ${startXOffset}px)`,
                        '--end-x': `${endXOffset}px`,
                        '--land-y': `${landBase + Math.random() * 15}%`,
                        '--rot-start': `${Math.random() * 360}deg`,
                        '--rot-end': `${Math.random() * 720 - 360}deg`,
                        width: `${Math.random() * sizeVar + sizeBase}px`,
                        animationDelay: `${Math.random() * 2.5}s`,
                    }
                });
            }

            setLeaves(prev => [...prev, ...newLeaves]);

            // Cleanup - Stay for 30s + 5s fall = 35s (Set to 37s safety)
            setTimeout(() => {
                setLeaves(prev => {
                    const ids = newLeaves.map(l => l.id);
                    return prev.filter(l => !ids.includes(l.id));
                });
            }, 37000);
        }
    }, [count]);



    // 2. Handle Droplets
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
    }, [dropletTrigger, isMuted]);

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

            {/* CONFETTI LAYER (Used for Bilva Blast) */}
            <div className="confetti-layer">
                {leaves.map(item => (
                    <img
                        key={item.id}
                        src={leafImage}
                        alt="bilva"
                        className="confetti-particle"
                        style={item.style}
                    />
                ))}
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
                <div className="shiva-lingam">
                    {/* User Provided Lingam Structure (Scaled) */}
                    <div className={`shiv-ling ${isGoldMode ? 'gold' : ''}`}>
                        {/* Orange sun halo - Moved Inside for scaling */}
                        <div className="lingam-halo"></div>

                        {/* Crescent moon - Moved Inside */}
                        <div className="crescent-moon">🌙</div>

                        <div className="top">
                            <div className="gold-overlay"></div>
                            <div className="namas">
                                <span className="line"></span>
                                <span className="line"></span>
                                <span className="line"></span>
                            </div>
                        </div>
                        <div className="middle">
                            <div className="gold-overlay"></div>
                            {/* Spout Curve converted to div */}
                            <div className="spout-curve">
                                <div className="gold-overlay"></div>
                            </div>
                            {/* Spout Extension converted to div */}
                            <div className="spout-extension">
                                <div className="gold-overlay"></div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="line-1"><div className="gold-overlay"></div></div>
                            <div className="line-2"><div className="gold-overlay"></div></div>
                            <div className="line-3"><div className="gold-overlay"></div></div>
                            <div className="line-4"><div className="gold-overlay"></div></div>
                            <div className="line-5"><div className="gold-overlay"></div></div>
                        </div>
                    </div>
                </div>

                {/* Splash Effects */}
                <div className="splashes-container">
                    {splashes.map((s) => (
                        <SplashEffect key={s.id} id={s.id} onComplete={handleSplashComplete} />
                    ))}
                </div>
            </div>

            {/* Kuthuvilakku (Traditional Standing Lamps) */}
            <div className="diya left-diya" onClick={handleLeftDiyaClick} style={{ cursor: leftLit ? 'default' : 'pointer' }}>
                {!leftLit && (
                    <div className="diya-instruction">
                        <div className="hand-icon">👆</div>
                        <span className="instruction-text">Tap to Light</span>
                    </div>
                )}
                <div className="lamp-structure">
                    <div className="lamp-top"></div>
                    <div className="lamp-bowl">
                        <div className={`lamp-flame flame-left ${leftLit ? 'lit' : ''}`}></div>
                        <div className={`lamp-flame flame-center ${leftLit ? 'lit' : ''}`}></div>
                        <div className={`lamp-flame flame-right ${leftLit ? 'lit' : ''}`}></div>
                    </div>
                    <div className="lamp-stem"></div>
                    <div className="lamp-base"></div>
                </div>
            </div>

            <div className="diya right-diya" onClick={handleRightDiyaClick} style={{ cursor: rightLit ? 'default' : 'pointer' }}>
                {!rightLit && (
                    <div className="diya-instruction">
                        <div className="hand-icon">👆</div>
                        <span className="instruction-text">Tap to Light</span>
                    </div>
                )}
                <div className="lamp-structure">
                    <div className="lamp-top"></div>
                    <div className="lamp-bowl">
                        <div className={`lamp-flame flame-left ${rightLit ? 'lit' : ''}`}></div>
                        <div className={`lamp-flame flame-center ${rightLit ? 'lit' : ''}`}></div>
                        <div className={`lamp-flame flame-right ${rightLit ? 'lit' : ''}`}></div>
                    </div>
                    <div className="lamp-stem"></div>
                    <div className="lamp-base"></div>
                </div>
            </div>

            {/* Om Symbol */}
            <div className="floating-om">🕉️</div>


        </div>
    );
}

export default Temple2DScene;
