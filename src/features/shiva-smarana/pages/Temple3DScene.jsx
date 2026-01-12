// 3D Temple Scene Component - Loaded lazily
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// 3D Shiva Lingam Component
function ShivaLingam({ position = [0, -0.5, 0], scale = 0.8 }) {
    const { scene } = useGLTF('/shiv_ling_with_snake__trisul.glb');

    return (
        <primitive
            object={scene}
            position={position}
            scale={scale}
        />
    );
}

// 3D Daara Patra (Water Vessel)
function DaaraPatra({ position = [0, 2.5, 0] }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Vessel body */}
            <mesh>
                <cylinderGeometry args={[0.4, 0.3, 0.5, 32]} />
                <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Pot rim */}
            <mesh position={[0, 0.25, 0]}>
                <torusGeometry args={[0.4, 0.05, 16, 32]} />
                <meshStandardMaterial color="#daa520" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Spout */}
            <mesh position={[0, -0.35, 0]}>
                <coneGeometry args={[0.08, 0.2, 16]} />
                <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Water inside */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.35, 0.25, 0.4, 32]} />
                <meshStandardMaterial color="#4fc3f7" transparent opacity={0.3} emissive="#0288d1" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}

// Water Droplet Component
function WaterDroplet({ onComplete, id }) {
    const meshRef = useRef();
    const velocityRef = useRef(0);
    const [active, setActive] = useState(true);

    useFrame((state, delta) => {
        if (!active || !meshRef.current) return;

        velocityRef.current += 9.8 * delta * 0.5;
        meshRef.current.position.y -= velocityRef.current * delta;

        if (meshRef.current.position.y <= 0.5) {
            setActive(false);
            if (onComplete) onComplete(id);
        }
    });

    if (!active) return null;

    return (
        <mesh ref={meshRef} position={[0, 2.2, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#4fc3f7" transparent opacity={0.85} emissive="#0288d1" emissiveIntensity={0.2} />
        </mesh>
    );
}

// Diya (Lamp)
function Diya({ position = [0, 0, 0], scale = 1 }) {
    const flameRef = useRef();

    useFrame((state) => {
        if (flameRef.current) {
            const flicker = Math.sin(state.clock.elapsedTime * 10) * 0.1;
            flameRef.current.scale.y = 1 + flicker;
        }
    });

    return (
        <group position={position} scale={scale}>
            <mesh>
                <cylinderGeometry args={[0.15, 0.1, 0.08, 32]} />
                <meshStandardMaterial color="#cd7f32" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh ref={flameRef} position={[0, 0.15, 0]}>
                <coneGeometry args={[0.03, 0.12, 8]} />
                <meshStandardMaterial color="#ffeb3b" emissive="#ff9800" emissiveIntensity={2} transparent opacity={0.9} />
            </mesh>
            <pointLight position={[0, 0.15, 0]} color="#ff9800" intensity={0.5} distance={2} />
        </group>
    );
}

// Temple Floor
function TempleFloor() {
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#2d1810" />
            </mesh>
            <mesh position={[0, -1.2, 0]}>
                <cylinderGeometry args={[1.2, 1.5, 0.3, 32]} />
                <meshStandardMaterial color="#4a3728" />
            </mesh>
            <mesh position={[0, -1, 0]}>
                <cylinderGeometry args={[0.9, 1.1, 0.2, 32]} />
                <meshStandardMaterial color="#5c4033" />
            </mesh>
        </group>
    );
}

// Fallback while lingam loads
function LingamFallback() {
    return (
        <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.7, 1.5, 32]} />
            <meshStandardMaterial color="#4a3728" />
        </mesh>
    );
}

// Main 3D Scene
function Temple3DScene({ dropletTrigger }) {
    const [droplets, setDroplets] = useState([]);
    const lastTriggerRef = useRef(0);

    // Add droplet when trigger changes
    useEffect(() => {
        if (dropletTrigger > lastTriggerRef.current) {
            const newId = Date.now();
            setDroplets(prev => [...prev, { id: newId }]);
            lastTriggerRef.current = dropletTrigger;
        }
    }, [dropletTrigger]);

    const handleDropletComplete = (id) => {
        setDroplets(prev => prev.filter(d => d.id !== id));
    };

    return (
        <Canvas
            camera={{ position: [0, 2, 6], fov: 50 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(180deg, #0d0d0d 0%, #1a0a0a 50%, #2d1810 100%)'
            }}
        >
            {/* Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2.2}
                minAzimuthAngle={-Math.PI / 6}
                maxAzimuthAngle={Math.PI / 6}
            />

            {/* Lighting */}
            <ambientLight intensity={0.2} color="#ffefd5" />
            <spotLight position={[0, 8, 0]} angle={0.4} penumbra={1} intensity={1.5} color="#ffd700" />
            <directionalLight position={[0, 2, 5]} intensity={0.3} color="#ff9933" />

            {/* Fog */}
            <fog attach="fog" args={['#1a0a0a', 5, 20]} />

            {/* Temple Floor */}
            <TempleFloor />

            {/* Shiva Lingam */}
            <Suspense fallback={<LingamFallback />}>
                <ShivaLingam position={[0, -0.5, 0]} scale={0.8} />
            </Suspense>

            {/* Daara Patra */}
            <DaaraPatra position={[0, 3, 0.5]} />

            {/* Diyas */}
            <Diya position={[-1.8, -0.7, 1]} scale={1.2} />
            <Diya position={[1.8, -0.7, 1]} scale={1.2} />

            {/* Droplets */}
            {droplets.map((droplet) => (
                <WaterDroplet key={droplet.id} id={droplet.id} onComplete={handleDropletComplete} />
            ))}
        </Canvas>
    );
}

export default Temple3DScene;
