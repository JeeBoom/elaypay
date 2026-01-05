import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useCanvas() {
  const canvasRef = ref(null);
  
  let ctx;
  let w;
  let h;
  let particles = [];
  let rafId;
  let t = 0;

  const particleConfig = {
    count: 0,
    maxSpeed: 0.35,
    waveAmp: 32,
    hueBase: 270,
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
  };

  const drawWave = () => {
    if (!ctx) return;
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = "#7c4dff";
    ctx.beginPath();
    const waveHeight = h * 0.35;
    const segments = 24;
    for (let i = 0; i <= segments; i += 1) {
      const x = (i / segments) * w;
      const y =
        waveHeight +
        Math.sin(i * 0.6 + t * 2.5) *
          particleConfig.waveAmp *
          (window.devicePixelRatio || 1);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const drawParticles = () => {
    if (!ctx) return;
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

  const loop = () => {
    if (!ctx) return;
    t += 0.005;
    ctx.clearRect(0, 0, w, h);
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
