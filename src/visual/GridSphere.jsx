import React, { useEffect, useRef } from "react";

/**
 * Pixel CRT wireframe sphere (latitude/longitude) rendered in a canvas.
 * - 3D rotate + perspective project
 * - pixel-quantized drawing for authentic "chunky" look
 */
export function GridSphere({
  size = 220, // canvas CSS size (px)
  internalScale = 0.5, // <1 makes it chunkier (lower internal res)
  color = "#33ff00",
  glow = true,
  speed = 0.7, // radians/sec
  lineAlpha = 0.7,
  bgAlpha = 0.0, // leave 0 for transparent (good for overlays)
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Render at lower internal resolution to get pixel look.
    const internalW = Math.max(64, Math.floor(size * internalScale));
    const internalH = Math.max(64, Math.floor(size * internalScale));
    canvas.width = internalW;
    canvas.height = internalH;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext("2d", { alpha: true });

    const cx = internalW / 2;
    const cy = internalH / 2;
    const radius = Math.min(internalW, internalH) * 0.36;

    // Build a set of lat/long polylines on a unit sphere
    const makeLatLine = (phi, segments = 80) => {
      const pts = [];
      for (let i = 0; i <= segments; i++) {
        const t = (i / segments) * Math.PI * 2;
        const x = Math.cos(t) * Math.cos(phi);
        const y = Math.sin(phi);
        const z = Math.sin(t) * Math.cos(phi);
        pts.push([x, y, z]);
      }
      return pts;
    };

    const makeLonLine = (theta, segments = 80) => {
      const pts = [];
      for (let i = 0; i <= segments; i++) {
        const p = (i / segments) * Math.PI - Math.PI / 2;
        const x = Math.cos(theta) * Math.cos(p);
        const y = Math.sin(p);
        const z = Math.sin(theta) * Math.cos(p);
        pts.push([x, y, z]);
      }
      return pts;
    };

    const latCount = 10;
    const lonCount = 12;

    const lines = [];
    for (let i = 1; i < latCount; i++) {
      const phi = (i / latCount) * Math.PI - Math.PI / 2;
      lines.push(makeLatLine(phi));
    }
    for (let i = 0; i < lonCount; i++) {
      const theta = (i / lonCount) * Math.PI * 2;
      lines.push(makeLonLine(theta));
    }

    const rotateY = (p, a) => {
      const [x, y, z] = p;
      const ca = Math.cos(a),
        sa = Math.sin(a);
      return [x * ca + z * sa, y, -x * sa + z * ca];
    };

    const rotateX = (p, a) => {
      const [x, y, z] = p;
      const ca = Math.cos(a),
        sa = Math.sin(a);
      return [x, y * ca - z * sa, y * sa + z * ca];
    };

    // Project 3D -> 2D with simple perspective
    const project = (p) => {
      const [x, y, z] = p;
      const depth = 2.4; // bigger = flatter
      const scale = 1 / (depth - z);
      return [x * scale, y * scale, z];
    };

    const draw = (tSec) => {
      ctx.clearRect(0, 0, internalW, internalH);

      // Optional subtle background tint
      if (bgAlpha > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${bgAlpha})`;
        ctx.fillRect(0, 0, internalW, internalH);
      }

      // Spin angles
      const a = tSec * speed;
      const ax = 0.35; // fixed tilt
      const ay = a;

      // Glow pass (faux bloom)
      if (glow) {
        ctx.save();
        ctx.globalAlpha = 0.18;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        renderLines(ax, ay, true);
        ctx.restore();
      }

      // Main pass (crisp pixel lines)
      ctx.save();
      ctx.globalAlpha = lineAlpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      renderLines(ax, ay, false);
      ctx.restore();
    };

    const renderLines = (ax, ay, isGlow) => {
      for (const line of lines) {
        // Hidden-line effect: fade segments that go behind the sphere
        for (let i = 0; i < line.length - 1; i++) {
          let p0 = line[i];
          let p1 = line[i + 1];

          p0 = rotateX(rotateY(p0, ay), ax);
          p1 = rotateX(rotateY(p1, ay), ax);

          const q0 = project(p0);
          const q1 = project(p1);

          // Skip far-back segments for cleaner wireframe
          const zAvg = (q0[2] + q1[2]) / 2;
          if (!isGlow && zAvg < -0.35) continue;

          // Convert to pixel-ish coordinates
          const x0 = Math.round(cx + q0[0] * radius);
          const y0 = Math.round(cy + q0[1] * radius);
          const x1 = Math.round(cx + q1[0] * radius);
          const y1 = Math.round(cy + q1[1] * radius);

          ctx.beginPath();
          ctx.moveTo(x0 + 0.5, y0 + 0.5);
          ctx.lineTo(x1 + 0.5, y1 + 0.5);
          ctx.stroke();
        }
      }
    };

    let start = performance.now();
    const loop = (now) => {
      const tSec = (now - start) / 1000;
      draw(tSec);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [size, internalScale, color, glow, speed, lineAlpha, bgAlpha]);

  return <canvas ref={canvasRef} className="grid-sphere" aria-hidden="true" />;
}
