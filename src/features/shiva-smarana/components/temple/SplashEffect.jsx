// Splash Effect particle system
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SplashParticle = ({ startPosition, velocity, onComplete }) => {
    const meshRef = useRef();
    const [isActive, setIsActive] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const positionRef = useRef(new THREE.Vector3(...startPosition));
    const velocityRef = useRef(new THREE.Vector3(...velocity));
    const ageRef = useRef(0);

    const MAX_AGE = 0.6; // seconds

    useFrame((state, delta) => {
        if (!isActive || !meshRef.current) return;

        ageRef.current += delta;

        if (ageRef.current >= MAX_AGE) {
            setIsActive(false);
            if (onComplete) onComplete();
            return;
        }

        // Apply gravity to velocity
        velocityRef.current.y -= 15 * delta;

        // Update position
        positionRef.current.add(velocityRef.current.clone().multiplyScalar(delta));
        meshRef.current.position.copy(positionRef.current);

        // Fade out
        const newOpacity = 1 - (ageRef.current / MAX_AGE);
        setOpacity(newOpacity);

        // Shrink
        const scale = Math.max(0.1, 1 - (ageRef.current / MAX_AGE) * 0.5);
        meshRef.current.scale.setScalar(scale);
    });

    if (!isActive) return null;

    return (
        <mesh ref={meshRef} position={startPosition}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
                color="#81d4fa"
                transparent
                opacity={opacity}
                emissive="#4fc3f7"
                emissiveIntensity={0.3}
            />
        </mesh>
    );
};

const SplashEffect = ({ position = [0, 0.8, 0], onComplete }) => {
    const [particles, setParticles] = useState([]);
    const completedCountRef = useRef(0);

    useEffect(() => {
        // Generate splash particles
        const newParticles = [];
        const particleCount = 8;

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const speed = 1.5 + Math.random() * 1;
            const velocity = [
                Math.cos(angle) * speed,
                2 + Math.random() * 1.5,
                Math.sin(angle) * speed * 0.3
            ];

            newParticles.push({
                id: i,
                position: [...position],
                velocity
            });
        }

        setParticles(newParticles);
    }, [position]);

    const handleParticleComplete = () => {
        completedCountRef.current += 1;
        if (completedCountRef.current >= particles.length && onComplete) {
            onComplete();
        }
    };

    return (
        <group>
            {particles.map((particle) => (
                <SplashParticle
                    key={particle.id}
                    startPosition={particle.position}
                    velocity={particle.velocity}
                    onComplete={handleParticleComplete}
                />
            ))}
        </group>
    );
};

export default SplashEffect;
