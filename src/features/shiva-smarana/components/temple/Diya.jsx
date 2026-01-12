// Diya (Lamp) 3D component with animated flame
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Diya = ({ position = [0, 0, 0], scale = 1 }) => {
    const flameRef = useRef();
    const flameGlowRef = useRef();

    // Animate flame
    useFrame((state) => {
        if (flameRef.current) {
            // Flicker effect
            const flicker = Math.sin(state.clock.elapsedTime * 10) * 0.1 +
                Math.sin(state.clock.elapsedTime * 15) * 0.05;
            flameRef.current.scale.y = 1 + flicker;
            flameRef.current.scale.x = 1 + flicker * 0.3;

            // Slight sway
            flameRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 5) * 0.1;
        }

        if (flameGlowRef.current) {
            // Pulsing glow
            const pulse = Math.sin(state.clock.elapsedTime * 8) * 0.2 + 0.8;
            flameGlowRef.current.material.emissiveIntensity = pulse;
        }
    });

    return (
        <group position={position} scale={scale}>
            {/* Diya base (brass bowl) */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.1, 0.08, 32]} />
                <meshStandardMaterial
                    color="#cd7f32"
                    metalness={0.8}
                    roughness={0.3}
                    emissive="#8b4513"
                    emissiveIntensity={0.1}
                />
            </mesh>

            {/* Oil surface */}
            <mesh position={[0, 0.02, 0]}>
                <circleGeometry args={[0.12, 32]} />
                <meshStandardMaterial
                    color="#8b4513"
                    metalness={0.2}
                    roughness={0.8}
                />
            </mesh>

            {/* Wick */}
            <mesh position={[0, 0.06, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.08, 8]} />
                <meshStandardMaterial color="#2d1b00" />
            </mesh>

            {/* Flame */}
            <group ref={flameRef} position={[0, 0.15, 0]}>
                {/* Inner flame (bright yellow) */}
                <mesh>
                    <coneGeometry args={[0.03, 0.12, 8]} />
                    <meshStandardMaterial
                        color="#ffeb3b"
                        emissive="#ff9800"
                        emissiveIntensity={2}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Outer flame (orange glow) */}
                <mesh ref={flameGlowRef} scale={[1.5, 1.3, 1.5]}>
                    <coneGeometry args={[0.03, 0.12, 8]} />
                    <meshStandardMaterial
                        color="#ff5722"
                        emissive="#ff9800"
                        emissiveIntensity={1}
                        transparent
                        opacity={0.4}
                    />
                </mesh>
            </group>

            {/* Point light for flame illumination */}
            <pointLight
                position={[0, 0.15, 0]}
                color="#ff9800"
                intensity={0.5}
                distance={2}
                decay={2}
            />
        </group>
    );
};

export default Diya;
