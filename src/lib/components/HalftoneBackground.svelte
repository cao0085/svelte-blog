<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  type Dot = {
    x: number; y: number;
    jx: number; jy: number;   // stable jitter (precomputed)
    size: number; opacity: number;
    r: number; g: number; b: number;
  };

  let dots: Dot[] = [];
  let phase = 0;
  let targetPhase = 0;
  let rafId: number;

  function buildDots(w: number, h: number) {
    dots = [];

    const foci = [
      { cx: w * 0.18, cy: h * 0.18, xs: w * 0.28, ys: h * 0.32, r: 64,  g: 117, b: 166 },
      { cx: w * 0.28, cy: h * 0.52, xs: w * 0.26, ys: h * 0.38, r: 45,  g: 88,  b: 135 },
      { cx: w * 0.12, cy: h * 0.82, xs: w * 0.24, ys: h * 0.28, r: 72,  g: 128, b: 172 },
    ];

    const spacing = 10;
    const maxDotSize = 3.2;

    for (let x = 0; x <= w; x += spacing) {
      for (let y = 0; y <= h; y += spacing) {
        let density = 0;
        let wR = 0, wG = 0, wB = 0;

        for (const f of foci) {
          const norm = Math.sqrt(((x - f.cx) / f.xs) ** 2 + ((y - f.cy) / f.ys) ** 2);
          if (norm >= 1) continue;
          const contrib = 1 - norm;
          density += contrib;
          wR += f.r * contrib;
          wG += f.g * contrib;
          wB += f.b * contrib;
        }

        if (density < 0.06) continue;

        const clamped = Math.min(density, 1);
        dots.push({
          x, y,
          jx: (Math.random() - 0.5) * 1.5,
          jy: (Math.random() - 0.5) * 1.5,
          size: maxDotSize * (0.2 + 0.8 * clamped),
          opacity: 0.12 + 0.55 * clamped,
          r: (wR / density) | 0,
          g: (wG / density) | 0,
          b: (wB / density) | 0,
        });
      }
    }
  }

  function applyRightEdgeMask(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    const mask = ctx.createLinearGradient(w * 0.70, 0, w, 0);
    mask.addColorStop(0, 'rgba(0,0,0,0)');
    mask.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = mask;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  function render() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    for (const d of dots) {
      // 雙頻 wave 位移，產生有機流動感
      const waveX =
        Math.sin(d.y / 55 + phase * 1.2) * 2.8 +
        Math.sin(d.y / 130 + phase * 0.5) * 1.5;
      const waveY =
        Math.cos(d.x / 70 + phase * 0.9) * 2.0 +
        Math.cos(d.x / 150 + phase * 0.4) * 1.2;

      // 輕微 size 脈動
      const sizeWave = 1 + Math.sin(d.x / 45 + d.y / 65 + phase * 0.7) * 0.12;

      ctx.beginPath();
      ctx.arc(
        d.x + d.jx + waveX,
        d.y + d.jy + waveY,
        d.size * sizeWave,
        0, Math.PI * 2,
      );
      ctx.fillStyle = `rgba(${d.r},${d.g},${d.b},${d.opacity.toFixed(2)})`;
      ctx.fill();
    }

    applyRightEdgeMask(ctx, w, h);
  }

  function loop() {
    // Lerp phase → targetPhase，惰性感
    phase += (targetPhase - phase) * 0.04;
    render();
    rafId = requestAnimationFrame(loop);
  }

  function onScroll() {
    targetPhase = window.scrollY / 180;
  }

  function resize() {
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    buildDots(canvas.width, canvas.height);
  }

  onMount(() => {
    resize();
    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(loop);

    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  });
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
