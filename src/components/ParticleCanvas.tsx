import { useEffect, useRef } from 'react';

interface Particle {
  type: 'fire' | 'water' | 'steam';
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  lifeSpeed: number;
  phase: 'in' | 'out';
  rotation: number;
  rotationSpeed: number;
  flickerOffset: number;
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const texturesRef = useRef<{
    fire: HTMLCanvasElement[];
    water: HTMLCanvasElement[];
    steam: HTMLCanvasElement;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Create flame texture - organic, flickering shape
    const createFlameTexture = (intensity: number) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 64;
      offscreen.height = 96;
      const offCtx = offscreen.getContext('2d')!;
      
      // Flame shape - teardrop pointing up
      const gradient = offCtx.createRadialGradient(32, 60, 0, 32, 50, 40);
      gradient.addColorStop(0, `rgba(255, 255, 220, ${0.9 * intensity})`);
      gradient.addColorStop(0.2, `rgba(255, 200, 50, ${0.8 * intensity})`);
      gradient.addColorStop(0.4, `rgba(255, 100, 0, ${0.6 * intensity})`);
      gradient.addColorStop(0.7, `rgba(200, 50, 0, ${0.3 * intensity})`);
      gradient.addColorStop(1, 'rgba(100, 20, 0, 0)');

      offCtx.beginPath();
      offCtx.moveTo(32, 5);
      offCtx.bezierCurveTo(10, 40, 5, 70, 32, 90);
      offCtx.bezierCurveTo(59, 70, 54, 40, 32, 5);
      offCtx.fillStyle = gradient;
      offCtx.fill();
      
      return offscreen;
    };

    // Create water stream texture - flowing, elongated
    const createWaterTexture = (stretch: number) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 32;
      offscreen.height = 80;
      const offCtx = offscreen.getContext('2d')!;
      
      // Water stream - vertical elongated shape
      const gradient = offCtx.createLinearGradient(16, 0, 16, 80);
      gradient.addColorStop(0, 'rgba(150, 220, 255, 0)');
      gradient.addColorStop(0.2, `rgba(100, 200, 255, ${0.4 * stretch})`);
      gradient.addColorStop(0.5, `rgba(0, 242, 255, ${0.7 * stretch})`);
      gradient.addColorStop(0.8, `rgba(100, 200, 255, ${0.4 * stretch})`);
      gradient.addColorStop(1, 'rgba(150, 220, 255, 0)');

      offCtx.beginPath();
      offCtx.ellipse(16, 40, 8, 38, 0, 0, Math.PI * 2);
      offCtx.fillStyle = gradient;
      offCtx.fill();
      
      // Add highlight
      const highlight = offCtx.createRadialGradient(12, 30, 0, 12, 30, 6);
      highlight.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
      offCtx.fillStyle = highlight;
      offCtx.fillRect(0, 0, 32, 80);
      
      return offscreen;
    };

    // Create steam texture - wispy, ethereal
    const createSteamTexture = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 64;
      offscreen.height = 64;
      const offCtx = offscreen.getContext('2d')!;
      
      const gradient = offCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
      gradient.addColorStop(0, 'rgba(200, 220, 240, 0.6)');
      gradient.addColorStop(0.3, 'rgba(180, 200, 220, 0.3)');
      gradient.addColorStop(0.6, 'rgba(160, 180, 200, 0.1)');
      gradient.addColorStop(1, 'rgba(150, 170, 190, 0)');

      offCtx.fillStyle = gradient;
      offCtx.fillRect(0, 0, 64, 64);
      
      return offscreen;
    };

    // Generate texture variants
    texturesRef.current = {
      fire: [createFlameTexture(1), createFlameTexture(0.8), createFlameTexture(0.6)],
      water: [createWaterTexture(1), createWaterTexture(0.8), createWaterTexture(0.6)],
      steam: createSteamTexture(),
    };

    const centerX = () => width / 2;

    const createParticle = (forceType?: 'fire' | 'water' | 'steam'): Particle => {
      const type = forceType || (Math.random() < 0.1 ? 'steam' : (Math.random() < 0.5 ? 'fire' : 'water'));
      
      if (type === 'steam') {
        // Steam spawns at the center collision zone
        return {
          type,
          x: centerX() + (Math.random() - 0.5) * 100,
          y: height * 0.4 + Math.random() * height * 0.3,
          vy: -(Math.random() * 1.5 + 0.5),
          vx: (Math.random() - 0.5) * 2,
          size: Math.random() * 40 + 25,
          alpha: 0,
          maxAlpha: Math.random() * 0.25 + 0.1,
          lifeSpeed: 0.006,
          phase: 'in',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          flickerOffset: Math.random() * 100,
        };
      }
      
      if (type === 'fire') {
        // Fire on left side, rising flames
        const xPos = Math.random() * (width * 0.45);
        return {
          type,
          x: xPos,
          y: height + Math.random() * 30,
          vy: -(Math.random() * 4 + 2),
          vx: (Math.random() - 0.3) * 1.5 + (xPos > width * 0.3 ? 0.5 : 0), // drift toward center
          size: Math.random() * 35 + 20,
          alpha: 0,
          maxAlpha: Math.random() * 0.6 + 0.3,
          lifeSpeed: 0.008,
          phase: 'in',
          rotation: (Math.random() - 0.5) * 0.3,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          flickerOffset: Math.random() * 100,
        };
      } else {
        // Water on right side, flowing down
        const xPos = width * 0.55 + Math.random() * (width * 0.45);
        return {
          type,
          x: xPos,
          y: -Math.random() * 30,
          vy: Math.random() * 5 + 3,
          vx: (Math.random() - 0.7) * 1.5 - (xPos < width * 0.7 ? 0.5 : 0), // drift toward center
          size: Math.random() * 30 + 15,
          alpha: 0,
          maxAlpha: Math.random() * 0.6 + 0.3,
          lifeSpeed: 0.006,
          phase: 'in',
          rotation: 0,
          rotationSpeed: 0,
          flickerOffset: Math.random() * 100,
        };
      }
    };

    const resetParticle = (p: Particle) => {
      const newP = createParticle();
      Object.assign(p, newP);
    };

    // Initialize particles - more fire and water, some steam
    const particles: Particle[] = [];
    for (let i = 0; i < 150; i++) particles.push(createParticle('fire'));
    for (let i = 0; i < 150; i++) particles.push(createParticle('water'));
    for (let i = 0; i < 60; i++) particles.push(createParticle('steam'));
    particlesRef.current = particles;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    let time = 0;

    const animate = () => {
      time += 0.016;
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#020206';
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const center = centerX();

      // Sort particles: steam on top
      const sortedParticles = [...particlesRef.current].sort((a, b) => {
        if (a.type === 'steam') return 1;
        if (b.type === 'steam') return -1;
        return 0;
      });

      for (const p of sortedParticles) {
        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Collision zone interaction - particles near center create more steam
        const distFromCenter = Math.abs(p.x - center);
        if (distFromCenter < 80 && p.type !== 'steam') {
          // Particles slow down and fade faster at collision zone
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.lifeSpeed *= 1.001;
          
          // Small chance to spawn extra steam
          if (Math.random() < 0.01) {
            const steamP = createParticle('steam');
            steamP.x = p.x;
            steamP.y = p.y;
            particlesRef.current.push(steamP);
          }
        }

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          const angle = Math.atan2(dy, dx);
          const swirl = angle + Math.PI / 2;
          p.vx += Math.cos(swirl) * force * 1.5;
          p.vy += Math.sin(swirl) * force * 1.5;
        }

        // Apply drag
        p.vx *= 0.995;
        if (p.type === 'fire') {
          p.vy *= 0.99;
        }

        // Life cycle
        if (p.phase === 'in') {
          p.alpha += p.lifeSpeed;
          if (p.alpha >= p.maxAlpha) p.phase = 'out';
        } else {
          p.alpha -= p.lifeSpeed;
        }

        // Reset conditions
        const shouldReset = 
          p.alpha <= 0 ||
          p.x < -100 ||
          p.x > width + 100 ||
          (p.type === 'fire' && p.y < -100) ||
          (p.type === 'water' && p.y > height + 100) ||
          (p.type === 'steam' && p.y < -100);

        if (shouldReset) {
          resetParticle(p);
        }

        // Draw
        ctx.save();
        ctx.globalAlpha = p.alpha;
        
        if (p.type === 'fire') {
          ctx.globalCompositeOperation = 'lighter';
          const flicker = Math.sin(time * 10 + p.flickerOffset) * 0.2 + 0.8;
          ctx.globalAlpha = p.alpha * flicker;
          
          const texIndex = Math.floor(time * 8 + p.flickerOffset) % 3;
          const texture = texturesRef.current!.fire[texIndex];
          
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.drawImage(texture, -p.size / 2, -p.size, p.size, p.size * 1.5);
        } else if (p.type === 'water') {
          ctx.globalCompositeOperation = 'screen';
          
          const texIndex = Math.floor(p.flickerOffset) % 3;
          const texture = texturesRef.current!.water[texIndex];
          
          ctx.translate(p.x, p.y);
          ctx.drawImage(texture, -p.size / 4, -p.size, p.size / 2, p.size * 2.5);
        } else {
          // Steam
          ctx.globalCompositeOperation = 'screen';
          const texture = texturesRef.current!.steam;
          
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.drawImage(texture, -p.size / 2, -p.size / 2, p.size, p.size);
        }
        
        ctx.restore();
      }

      // Clean up excess steam particles
      if (particlesRef.current.length > 400) {
        particlesRef.current = particlesRef.current.slice(0, 360);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: '#020206' }}
    />
  );
};

export default ParticleCanvas;
