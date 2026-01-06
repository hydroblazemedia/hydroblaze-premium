import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import logoImage from '@/assets/hydroblaze-logo-3d.png';

// Water particle system
const WaterParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 60;
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Position particles on the left side (water/hydro)
      pos[i * 3] = -1.2 + (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      
      // Upward flowing velocity for water
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = 0.01 + Math.random() * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Reset particle when it goes too high
      if (positions[i * 3 + 1] > 1.5) {
        positions[i * 3] = -1.2 + (Math.random() - 0.5) * 0.8;
        positions[i * 3 + 1] = -1.5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00b4d8"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Fire particle system
const FireParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 60;
  
  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Position particles on the right side (fire/blaze)
      pos[i * 3] = 1.2 + (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      
      // Upward velocity for fire with more variation
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = 0.02 + Math.random() * 0.03;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // Orange to red gradient
      const t = Math.random();
      col[i * 3] = 1; // R
      col[i * 3 + 1] = 0.3 + t * 0.4; // G
      col[i * 3 + 2] = 0; // B
    }
    return [pos, vel, col];
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3] + Math.sin(state.clock.elapsedTime * 3 + i) * 0.003;
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Reset particle when it goes too high
      if (positions[i * 3 + 1] > 1.5) {
        positions[i * 3] = 1.2 + (Math.random() - 0.5) * 0.8;
        positions[i * 3 + 1] = -1.5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = -state.clock.elapsedTime * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Pulsing aura ring
const AuraRing = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const shaderData = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uHydroColor: { value: new THREE.Color('#00b4d8') },
      uBlazeColor: { value: new THREE.Color('#ff6b35') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uHydroColor;
      uniform vec3 uBlazeColor;
      varying vec2 vUv;
      
      void main() {
        float pulse = sin(uTime * 1.5) * 0.5 + 0.5;
        vec3 color = mix(uHydroColor, uBlazeColor, pulse);
        
        // Create ring glow effect
        float dist = abs(vUv.y - 0.5) * 2.0;
        float glow = 1.0 - smoothstep(0.0, 1.0, dist);
        glow = pow(glow, 2.0);
        
        // Add shimmer
        float shimmer = sin(vUv.x * 20.0 + uTime * 3.0) * 0.1 + 0.9;
        
        gl_FragColor = vec4(color * shimmer, glow * 0.7);
      }
    `,
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -0.1]}>
      <torusGeometry args={[1.8, 0.15, 16, 64]} />
      <shaderMaterial
        ref={materialRef}
        {...shaderData}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

interface LogoMeshProps {
  rotation: { x: number; y: number };
}

const LogoMesh = ({ rotation }: LogoMeshProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(logoImage);
  
  texture.colorSpace = THREE.SRGBColorSpace;
  
  useFrame(() => {
    if (groupRef.current) {
      // Smooth interpolation to target rotation
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
      
      {/* Pulsing aura ring */}
      <AuraRing />
      
      {/* Water particles on left */}
      <WaterParticles />
      
      {/* Fire particles on right */}
      <FireParticles />
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
