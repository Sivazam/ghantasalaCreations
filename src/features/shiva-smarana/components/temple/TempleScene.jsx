// Main Temple Scene - orchestrates all 3D components
import React, { Suspense, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

import ShivaLingam, { LingamLoader } from './ShivaLingam';
import DaaraPatra from './DaaraPatra';
import Diya from './Diya';
import TempleEnvironment from './TempleEnvironment';
import TempleFloor from './TempleFloor';
import WaterDroplet from './WaterDroplet';
import SplashEffect from './SplashEffect';
import useShivaSmaranaStore from '../../store/useShivaSmaranaStore';

const TempleScene = ({ onDropletHit }) => {
    const sessionCount = useShivaSmaranaStore((state) => state.sessionCount);
    const activeDroplets = useShivaSmaranaStore((state) => state.activeDroplets);
    const removeDroplet = useShivaSmaranaStore((state) => state.removeDroplet);

    const [splashes, setSplashes] = useState([]);

    // Handle when droplet hits the lingam
    const handleDropletHit = useCallback((dropletId) => {
        // Create splash effect
        const splashId = Date.now();
        setSplashes((prev) => [...prev, { id: splashId }]);

        // Remove splash after animation
        setTimeout(() => {
            setSplashes((prev) => prev.filter((s) => s.id !== splashId));
        }, 1000);

        // Notify parent
        if (onDropletHit) onDropletHit();
    }, [onDropletHit]);

    // Handle when droplet animation completes
    const handleDropletComplete = useCallback((dropletId) => {
        removeDroplet(dropletId);
    }, [removeDroplet]);

    return (
        <Canvas
            shadows
            dpr={[1, 2]}
            gl={{
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance'
            }}
            style={{
                background: 'linear-gradient(180deg, #0d0d0d 0%, #1a0a0a 50%, #2d1810 100%)'
            }}
        >
            {/* Camera */}
            <PerspectiveCamera
                makeDefault
                position={[0, 2, 6]}
                fov={50}
            />

            {/* Limited orbit controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2.2}
                minAzimuthAngle={-Math.PI / 6}
                maxAzimuthAngle={Math.PI / 6}
            />

            {/* Environment and lighting */}
            <TempleEnvironment />

            {/* Floor and platform */}
            <TempleFloor />

            {/* Shiva Lingam */}
            <Suspense fallback={<LingamLoader />}>
                <ShivaLingam position={[0, -0.5, 0]} scale={0.8} />
            </Suspense>

            {/* Daara Patra (Water Vessel) */}
            <DaaraPatra position={[0, 3, 0.5]} count={sessionCount} />

            {/* Diyas (Lamps) */}
            <Diya position={[-1.8, -0.7, 1]} scale={1.2} />
            <Diya position={[1.8, -0.7, 1]} scale={1.2} />

            {/* Active Water Droplets */}
            {activeDroplets.map((droplet) => (
                <WaterDroplet
                    key={droplet.id}
                    id={droplet.id}
                    startPosition={[0, 2.5, 0.5]}
                    onHitLingam={handleDropletHit}
                    onComplete={handleDropletComplete}
                />
            ))}

            {/* Splash Effects */}
            {splashes.map((splash) => (
                <SplashEffect
                    key={splash.id}
                    position={[0, 0.8, 0]}
                    onComplete={() => { }}
                />
            ))}
        </Canvas>
    );
};

export default TempleScene;
