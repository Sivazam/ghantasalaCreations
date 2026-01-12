// 3D Shiva Lingam component using React Three Fiber
import React, { useRef, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const ShivaLingam = ({ position = [0, -1, 0], scale = 1 }) => {
    const meshRef = useRef();
    const { scene } = useGLTF('/shiv_ling_with_snake__trisul.glb');

    // Subtle floating animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
        }
    });

    return (
        <primitive
            ref={meshRef}
            object={scene.clone()}
            position={position}
            scale={scale}
        />
    );
};

// Preload the model
useGLTF.preload('/shiv_ling_with_snake__trisul.glb');

// Loading fallback
export const LingamLoader = () => (
    <mesh>
        <cylinderGeometry args={[0.5, 0.7, 1.5, 32]} />
        <meshStandardMaterial color="#4a3728" />
    </mesh>
);

export default ShivaLingam;
