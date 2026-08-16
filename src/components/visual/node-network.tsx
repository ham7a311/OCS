"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

function nodeCount(width: number) {
  if (width < 640) return 36;
  if (width < 1024) return 56;
  return 72;
}

function palette(dark: boolean) {
  return dark
    ? { rgb: [243, 180, 95] as const, node: 0.38, line: 0.2, glow: 0.45 }
    : { rgb: [232, 162, 74] as const, node: 0.28, line: 0.13, glow: 0.36 };
}

function isDark() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

/**
 * Ambient connecting-nodes field for the hero. Canvas is decorative and
 * never intercepts clicks; the parent section owns pointer tracking.
 */
export function NodeNetwork() {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;
    const surface: HTMLCanvasElement = canvas;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let colors = palette(isDark());
    let frame = 0;
    let last = 0;
    let running = true;
    let intersecting = true;
    let inView = true;

    function syncView() {
      inView = intersecting && document.visibilityState === "visible";
    }

    const mouse = { x: -9999, y: -9999, inside: false };
    const maxDist = () => Math.min(148, Math.max(96, width * 0.12));

    function seed() {
      const count = nodeCount(width);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1.6 + Math.random() * 1.8,
      }));
    }

    function resize() {
      const rect = surface.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      surface.width = Math.floor(width * dpr);
      surface.height = Math.floor(height * dpr);
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function onMove(event: MouseEvent) {
      const rect = surface.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.inside =
        mouse.x >= 0 && mouse.y >= 0 && mouse.x <= width && mouse.y <= height;
    }

    function onLeave() {
      mouse.inside = false;
    }

    function step() {
      const link = maxDist();
      const influence = 150;

      for (const node of nodes) {
        if (mouse.inside) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < influence) {
            const force = ((influence - dist) / influence) * 0.045;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        node.vx *= 0.992;
        node.vy *= 0.992;
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.min(width, Math.max(0, node.x));
        node.y = Math.min(height, Math.max(0, node.y));
      }

      ctx.clearRect(0, 0, width, height);
      const [r, g, b] = colors.rgb;

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const c = nodes[j];
          const dx = a.x - c.x;
          const dy = a.y - c.y;
          const dist = Math.hypot(dx, dy);
          if (dist > link) continue;

          let alpha = (1 - dist / link) * colors.line;
          if (mouse.inside) {
            const midX = (a.x + c.x) / 2;
            const midY = (a.y + c.y) / 2;
            const toMouse = Math.hypot(midX - mouse.x, midY - mouse.y);
            if (toMouse < influence) {
              alpha += ((influence - toMouse) / influence) * 0.16;
            }
          }

          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(c.x, c.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        let alpha = colors.node;
        if (mouse.inside) {
          const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
          if (dist < influence) {
            alpha += ((influence - dist) / influence) * (colors.glow - colors.node);
          }
        }
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function tick(now: number) {
      if (!running) return;
      frame = window.requestAnimationFrame(tick);
      if (!inView) return;
      if (now - last < 32) return;
      last = now;
      step();
    }

    resize();
    frame = window.requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(surface);

    const themeObserver = new MutationObserver(() => {
      colors = palette(isDark());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const visibility = () => {
      syncView();
    };
    document.addEventListener("visibilitychange", visibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        intersecting = Boolean(entry?.isIntersecting);
        syncView();
      },
      { rootMargin: "80px" },
    );
    io.observe(surface);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] size-full"
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
      }}
    />
  );
}
