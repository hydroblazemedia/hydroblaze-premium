import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import logoImage from '@/assets/hydroblaze-logo-3d.png';

interface LogoMeshProps {
  mousePosition: { x: number; y: number };
}

const LogoMesh = ({ mousePosition }: LogoMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(logoImage);
  const targetRotation = useRef({ x: 0, y: 0 });
  
  texture.colorSpace = THREE.SRGBColorSpace;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Calculate target rotation based on mouse position
      targetRotation.current.y = mousePosition.x * 0.4;
      targetRotation.current.x = -mousePosition.y * 0.3;
      
      // Add subtle floating animation
      const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      const floatX = Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
      
      // Smooth interpolation (lerp) for natural movement
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation.current.y + floatY,
        0.08
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current.x + floatX,
        0.08
      );
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.1}
      floatIntensity={0.3}
    >
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.1}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
};

const Logo3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize mouse position relative to container center (-1 to 1)
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      // Clamp values
      setMousePosition({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y))
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[300px] md:h-[400px] lg:h-[450px] cursor-pointer"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-3, 2, 2]} intensity={0.8} color="#00b4d8" />
        <pointLight position={[3, -2, 2]} intensity={0.8} color="#ff6b35" />
        
        <LogoMesh mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default Logo3D;
