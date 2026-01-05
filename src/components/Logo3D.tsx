import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import logoImage from '@/assets/hydroblaze-logo-3d.png';

const LogoMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(logoImage);
  
  // Make texture transparent
  texture.colorSpace = THREE.SRGBColorSpace;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle rotation based on time
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.1}
          side={THREE.DoubleSide}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

const Logo3D = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[450px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-3, 2, 2]} intensity={0.8} color="#00b4d8" />
        <pointLight position={[3, -2, 2]} intensity={0.8} color="#ff6b35" />
        
        <LogoMesh />
      </Canvas>
    </div>
  );
};

export default Logo3D;
