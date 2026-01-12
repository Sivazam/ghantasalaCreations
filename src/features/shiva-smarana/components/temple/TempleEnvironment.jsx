// Temple Environment - lighting and atmosphere
import React from 'react';
import { Environment } from '@react-three/drei';

const TempleEnvironment = () => {
    return (
        <>
            {/* Ambient light for overall illumination */}
            <ambientLight intensity={0.2} color="#ffefd5" />

            {/* Main top-down divine light */}
            <spotLight
                position={[0, 8, 0]}
                angle={0.4}
                penumbra={1}
                intensity={1.5}
                color="#ffd700"
                castShadow
                shadow-mapSize={[1024, 1024]}
            />

            {/* Front fill light (warm) */}
            <directionalLight
                position={[0, 2, 5]}
                intensity={0.3}
                color="#ff9933"
            />

            {/* Back rim light */}
            <directionalLight
                position={[0, 3, -5]}
                intensity={0.2}
                color="#ff6600"
            />

            {/* Side accent lights */}
            <pointLight
                position={[-3, 2, 1]}
                intensity={0.4}
                color="#ff9800"
                distance={6}
            />
            <pointLight
                position={[3, 2, 1]}
                intensity={0.4}
                color="#ff9800"
                distance={6}
            />

            {/* Fog for depth */}
            <fog attach="fog" args={['#1a0a0a', 5, 20]} />

            {/* Simple environment for reflections */}
            <Environment preset="night" />
        </>
    );
};

export default TempleEnvironment;
