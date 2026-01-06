import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import logoImage from '@/assets/hydroblaze-logo-3d.png';

interface LogoMeshProps {
  rotation: { x: number; y: number };
}

const LogoMesh = ({ rotation }: LogoMeshProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(logoImage);
  
  texture.colorSpace = THREE.SRGBColorSpace;
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotation.y,
        0.08
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rotation.x,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.1}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

const Logo3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const totalRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      
      // Full 360° rotation - accumulate rotation
      totalRotation.current.y += deltaX * 0.01;
      totalRotation.current.x += deltaY * 0.01;
      
      // Clamp vertical rotation to prevent flipping
      totalRotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, totalRotation.current.x));
      
      setRotation({ ...totalRotation.current });
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.touches[0].clientX - lastMousePos.current.x;
      const deltaY = e.touches[0].clientY - lastMousePos.current.y;
      
      totalRotation.current.y += deltaX * 0.01;
      totalRotation.current.x += deltaY * 0.01;
      totalRotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, totalRotation.current.x));
      
      setRotation({ ...totalRotation.current });
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-[300px] md:h-[400px] lg:h-[450px] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[-3, 2, 2]} intensity={1.5} color="#00b4d8" />
        <pointLight position={[3, -2, 2]} intensity={1.5} color="#ff6b35" />
        
        <LogoMesh rotation={rotation} />
      </Canvas>
    </div>
  );
};

export default Logo3D;
