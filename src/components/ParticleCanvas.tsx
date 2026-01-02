import { useEffect, useRef } from 'react';

interface Particle {
  type: 'fire' | 'water';
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  lifeSpeed: number;
  phase: 'in' | 'out';
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();

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

    // Create textures
    const createOrbTexture = (r: number, g: number, b: number, isFire: boolean) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 64;
      offscreen.height = 64;
      const offCtx = offscreen.getContext('2d')!;
      const gradient = offCtx.createRadialGradient(32, 32, 0, 32, 32, 28);

      if (isFire) {
        gradient.addColorStop(0, `rgba(255, 255, 200, 1)`);
        gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.8)`);
        gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.1)`);
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
      } else {
        gradient.addColorStop(0, `rgba(200, 255, 255, 0.8)`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.5)`);
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
      }

      offCtx.fillStyle = gradient;
      offCtx.fillRect(0, 0, 64, 64);
      return offscreen;
    };

    const fireTexture = createOrbTexture(255, 72, 0, true);
    const waterTexture = createOrbTexture(0, 242, 255, false);

    const createParticle = (): Particle => {
      const type = Math.random() > 0.5 ? 'fire' : 'water';
      
      if (type === 'fire') {
        return {
          type,
          x: Math.random() * width,
          y: height + Math.random() * 50,
          vy: -(Math.random() * 2 + 1),
          vx: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 25 + 12,
          alpha: 0,
          maxAlpha: Math.random() * 0.4 + 0.2,
          lifeSpeed: 0.012,
          phase: 'in',
        };
      } else {
        return {
          type,
          x: Math.random() * width,
          y: -Math.random() * 50,
          vy: Math.random() * 3 + 2,
          vx: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 18 + 6,
          alpha: 0,
          maxAlpha: Math.random() * 0.4 + 0.2,
          lifeSpeed: 0.008,
          phase: 'in',
        };
      }
    };

    const resetParticle = (p: Particle) => {
      const newP = createParticle();
      Object.assign(p, newP);
    };

    // Initialize particles
    particlesRef.current = Array.from({ length: 250 }, createParticle);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#020206';
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction - swirl effect
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (200 - dist) / 200;
          const angle = Math.atan2(dy, dx);
          const swirl = angle + Math.PI / 2;
          p.vx += Math.cos(swirl) * force * 1.2;
          p.vy += Math.sin(swirl) * force * 1.2;
        }

        // Apply friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Life cycle
        if (p.phase === 'in') {
          p.alpha += p.lifeSpeed;
          if (p.alpha >= p.maxAlpha) p.phase = 'out';
        } else {
          p.alpha -= p.lifeSpeed;
        }

        // Reset if needed
        if (
          p.alpha <= 0 ||
          p.x < -100 ||
          p.x > width + 100 ||
          (p.type === 'fire' && p.y < -100) ||
          (p.type === 'water' && p.y > height + 100)
        ) {
          resetParticle(p);
        }

        // Draw
        ctx.globalAlpha = p.alpha;
        ctx.globalCompositeOperation = p.type === 'fire' ? 'lighter' : 'source-over';
        const texture = p.type === 'fire' ? fireTexture : waterTexture;
        ctx.drawImage(texture, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
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
