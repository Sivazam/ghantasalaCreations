// Water Droplet 3D component
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WaterDroplet = ({
    id,
    startPosition = [0, 3, 0],
    onComplete,
    onHitLingam
}) => {
    const meshRef = useRef();
    const [position, setPosition] = useState(new THREE.Vector3(...startPosition));
    const velocityRef = useRef(0);
    const [isActive, setIsActive] = useState(true);

    // Lingam top Y position (approximate)
    const LINGAM_TOP_Y = 0.8;
    const GRAVITY = 9.8;

    useFrame((state, delta) => {
        if (!isActive || !meshRef.current) return;

        // Apply gravity
        velocityRef.current += GRAVITY * delta * 0.5;

        const newY = position.y - velocityRef.current * delta;

        // Check if hit lingam
        if (newY <= LINGAM_TOP_Y) {
            setIsActive(false);
            if (onHitLingam) onHitLingam(id);
            if (onComplete) onComplete(id);
            return;
        }

        // Update position
        const newPosition = new THREE.Vector3(position.x, newY, position.z);
        setPosition(newPosition);
        meshRef.current.position.copy(newPosition);
    });

    if (!isActive) return null;

    return (
        <mesh ref={meshRef} position={position}>
            {/* Teardrop shape using sphere */}
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
                color="#4fc3f7"
                transparent
                opacity={0.85}
                metalness={0.1}
                roughness={0.1}
                emissive="#0288d1"
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

export default WaterDroplet;
