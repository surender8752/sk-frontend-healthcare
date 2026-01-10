import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'

function FloatingOrb({ position, color, speed, distort }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2
        }
    })

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={distort}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.6}
                />
            </Sphere>
        </Float>
    )
}

function FloatingCross({ position }) {
    const groupRef = useRef()

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <group ref={groupRef} position={position}>
                {/* Vertical bar */}
                <mesh>
                    <boxGeometry args={[0.2, 1, 0.2]} />
                    <meshStandardMaterial color="#5F6FFF" metalness={0.5} roughness={0.2} />
                </mesh>
                {/* Horizontal bar */}
                <mesh position={[0, 0.2, 0]}>
                    <boxGeometry args={[0.6, 0.2, 0.2]} />
                    <meshStandardMaterial color="#5F6FFF" metalness={0.5} roughness={0.2} />
                </mesh>
            </group>
        </Float>
    )
}

function DNA({ position }) {
    const groupRef = useRef()

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
        }
    })

    return (
        <group ref={groupRef} position={position}>
            {[...Array(8)].map((_, i) => (
                <group key={i} rotation={[0, (i * Math.PI) / 4, 0]} position={[0, i * 0.3 - 1, 0]}>
                    <mesh position={[0.5, 0, 0]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial color="#FF6B8A" metalness={0.3} roughness={0.5} />
                    </mesh>
                    <mesh position={[-0.5, 0, 0]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial color="#5F6FFF" metalness={0.3} roughness={0.5} />
                    </mesh>
                    <mesh>
                        <cylinderGeometry args={[0.02, 0.02, 1, 8]} rotation={[0, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#888" metalness={0.2} roughness={0.8} transparent opacity={0.5} />
                    </mesh>
                </group>
            ))}
        </group>
    )
}

const Scene3D = () => {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#5F6FFF" />

            {/* Background stars */}
            <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

            {/* Floating medical orbs */}
            <FloatingOrb position={[-4, 2, -5]} color="#5F6FFF" speed={1.2} distort={0.4} />
            <FloatingOrb position={[4, -2, -3]} color="#FF6B8A" speed={0.8} distort={0.3} />
            <FloatingOrb position={[-2, -3, -4]} color="#7B8AFF" speed={1} distort={0.5} />
            <FloatingOrb position={[3, 3, -6]} color="#3B4CE0" speed={0.6} distort={0.2} />

            {/* Floating medical cross */}
            <FloatingCross position={[5, 0, -4]} />
            <FloatingCross position={[-5, 1, -5]} />

            {/* DNA Helix */}
            <DNA position={[-6, 0, -3]} />
            <DNA position={[6, -1, -4]} />
        </Canvas>
    )
}

export default Scene3D
