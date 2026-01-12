// Daara Patra (Water Vessel) 3D component
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const DaaraPatra = ({ position = [0, 2.5, 0], count = 0 }) => {
    const groupRef = useRef();

    // Subtle swaying animation
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Vessel body - brass pot shape */}
            <mesh position={[0, 0, 0]}>
                {/* Main pot body */}
                <cylinderGeometry args={[0.4, 0.3, 0.5, 32]} />
                <meshStandardMaterial
                    color="#b8860b"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#8b6914"
                    emissiveIntensity={0.1}
                />
            </mesh>

            {/* Pot rim */}
            <mesh position={[0, 0.25, 0]}>
                <torusGeometry args={[0.4, 0.05, 16, 32]} />
                <meshStandardMaterial
                    color="#daa520"
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Spout */}
            <mesh position={[0, -0.35, 0]} rotation={[0, 0, 0]}>
                <coneGeometry args={[0.08, 0.2, 16]} />
                <meshStandardMaterial
                    color="#b8860b"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Count display */}
            <Text
                position={[0, 0.05, 0.45]}
                fontSize={0.18}
                color="#ffd700"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.01}
                outlineColor="#000000"
                font="/fonts/NotoSansTelugu-Bold.ttf"
            >
                {count.toLocaleString('en-IN')}
            </Text>

            {/* Water level indicator (blue glow inside) */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.35, 0.25, 0.4, 32]} />
                <meshStandardMaterial
                    color="#4fc3f7"
                    transparent
                    opacity={0.3}
                    emissive="#0288d1"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </group>
    );
};

export default DaaraPatra;
