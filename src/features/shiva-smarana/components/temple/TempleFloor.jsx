// Temple Floor component
import React from 'react';

const TempleFloor = () => {
    return (
        <group>
            {/* Main floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial
                    color="#2d1810"
                    metalness={0.1}
                    roughness={0.8}
                />
            </mesh>

            {/* Platform for lingam */}
            <mesh position={[0, -1.2, 0]}>
                <cylinderGeometry args={[1.2, 1.5, 0.3, 32]} />
                <meshStandardMaterial
                    color="#4a3728"
                    metalness={0.2}
                    roughness={0.7}
                />
            </mesh>

            {/* Inner platform */}
            <mesh position={[0, -1, 0]}>
                <cylinderGeometry args={[0.9, 1.1, 0.2, 32]} />
                <meshStandardMaterial
                    color="#5c4033"
                    metalness={0.3}
                    roughness={0.6}
                />
            </mesh>

            {/* Yoni base */}
            <mesh position={[0, -0.85, 0]}>
                <cylinderGeometry args={[0.7, 0.85, 0.15, 32]} />
                <meshStandardMaterial
                    color="#3d2817"
                    metalness={0.4}
                    roughness={0.5}
                />
            </mesh>
        </group>
    );
};

export default TempleFloor;
