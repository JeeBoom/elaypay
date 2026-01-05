import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useCanvas() {
  const canvasRef = ref(null);
  
  let ctx;
  let w;
  let h;
  let particles = [];
  let connections = [];
  let floatingOrbs = [];
  let rafId;
  let t = 0;

  const particleConfig = {
    count: 0,
    maxSpeed: 0.35,
    waveAmp: 32,
    hueBase: 270,
    connectionDistance: 150,
    orbCount: 8,
  };

  const resizeCanvas = () => {
    if (!canvasRef.value) return;
    const ratio = window.devicePixelRatio || 1;
    w = canvasRef.value.width = window.innerWidth * ratio;
    h = canvasRef.value.height = window.innerHeight * ratio;
    canvasRef.value.style.width = `${window.innerWidth}px`;
    canvasRef.value.style.height = `${window.innerHeight}px`;
    initParticles(ratio);
  };

  const initParticles = (ratio) => {
    particles = Array.from({ length: particleConfig.count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * particleConfig.maxSpeed * ratio,
      vy: (Math.random() - 0.5) * particleConfig.maxSpeed * ratio,
      radius: Math.random() * 2 + 0.6,
    }));
    
    // Initialize floating orbs
    floatingOrbs = Array.from({ length: particleConfig.orbCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2 * ratio,
      vy: (Math.random() - 0.5) * 0.2 * ratio,
      radius: Math.random() * 40 + 30,
      hue: 220 + Math.random() * 80,
      phase: Math.random() * Math.PI * 2,
    }));
  };

  const drawWave = () => {
    if (!ctx) return;
    ctx.save();
    
    // Draw multiple wave layers with different colors and speeds
    const waves = [
      { alpha: 0.12, color: '#7c4dff', speed: 2.5, amp: 1, slope: 0.6 },
      { alpha: 0.08, color: '#b17cff', speed: 1.8, amp: 0.7, slope: 0.65 },
      { alpha: 0.06, color: '#6ef7d5', speed: 3.2, amp: 0.5, slope: 0.55 },
    ];
    
    waves.forEach((wave) => {
      ctx.globalAlpha = wave.alpha;
      ctx.fillStyle = wave.color;
      ctx.beginPath();
      const segments = 32;
      
      for (let i = 0; i <= segments; i += 1) {
        const progress = i / segments;
        const x = progress * w;
        // Diagonal line from bottom-left to top-right
        const baseY = h - (progress * h * wave.slope);
        const y = baseY + Math.sin(i * 0.5 + t * wave.speed) * 
                  particleConfig.waveAmp * wave.amp * (window.devicePixelRatio || 1);
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      // Close the path to fill the area below the wave
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();
    });
    
    ctx.restore();
  };

  const drawParticles = () => {
    if (!ctx) return;
    
    // Update and draw connections between nearby particles
    connections = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < particleConfig.connectionDistance) {
          connections.push({
            from: particles[i],
            to: particles[j],
            opacity: 1 - distance / particleConfig.connectionDistance,
          });
        }
      }
    }
    
    // Draw connection lines
    connections.forEach((conn) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(124, 77, 255, ${conn.opacity * 0.15})`;
      ctx.lineWidth = 0.5;
      ctx.moveTo(conn.from.x, conn.from.y);
      ctx.lineTo(conn.to.x, conn.to.y);
      ctx.stroke();
    });
    
    // Draw particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      const hue =
        particleConfig.hueBase + Math.sin((p.x + p.y) * 0.0008 + t) * 30;
      ctx.fillStyle = `hsla(${hue}, 85%, 70%, 0.9)`;
      ctx.arc(
        p.x,
        p.y,
        p.radius * (window.devicePixelRatio || 1),
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  };

  const drawFloatingOrbs = () => {
    if (!ctx) return;
    
    floatingOrbs.forEach((orb) => {
      orb.x += orb.vx;
      orb.y += orb.vy;
      orb.phase += 0.01;
      
      // Bounce off edges
      if (orb.x < -orb.radius || orb.x > w + orb.radius) orb.vx *= -1;
      if (orb.y < -orb.radius || orb.y > h + orb.radius) orb.vy *= -1;
      
      // Pulsating effect
      const pulseRadius = orb.radius * (1 + Math.sin(orb.phase) * 0.2);
      
      // Draw orb with radial gradient
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, pulseRadius);
      gradient.addColorStop(0, `hsla(${orb.hue}, 80%, 65%, 0.08)`);
      gradient.addColorStop(0.5, `hsla(${orb.hue}, 80%, 60%, 0.04)`);
      gradient.addColorStop(1, `hsla(${orb.hue}, 80%, 55%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, pulseRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw inner glow
      const innerGradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, pulseRadius * 0.3);
      innerGradient.addColorStop(0, `hsla(${orb.hue}, 90%, 75%, 0.15)`);
      innerGradient.addColorStop(1, `hsla(${orb.hue}, 90%, 70%, 0)`);
      
      ctx.fillStyle = innerGradient;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, pulseRadius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const loop = () => {
    if (!ctx) return;
    t += 0.005;
    ctx.clearRect(0, 0, w, h);
    drawFloatingOrbs();
    drawWave();
    drawParticles();
    rafId = requestAnimationFrame(loop);
  };

  const setupCanvas = () => {
    ctx = canvasRef.value?.getContext("2d") || null;
    if (!ctx) return;
    resizeCanvas();
    loop();
    window.addEventListener("resize", resizeCanvas);
  };

  const cleanup = () => {
    window.removeEventListener("resize", resizeCanvas);
    if (rafId) cancelAnimationFrame(rafId);
  };

  return {
    canvasRef,
    setupCanvas,
    cleanup,
  };
}
