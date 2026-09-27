"use client";

import { useEffect, useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type Zone = { left: number; top: number; right: number; bottom: number };

/** Share of nodes kept out of the quiet zone, and how faint the rest draw there. */
const QUIET_EVICT = 0.75;
const QUIET_ALPHA = 0.28;

function inZone(zone: Zone | null, x: number, y: number) {
  return Boolean(zone && x > zone.left && x < zone.right && y > zone.top && y < zone.bottom);
}

type Variant = "hero" | "ambient";
type Density = "default" | "sparse";

function nodeCount(width: number, variant: Variant, density: Density) {
  if (variant === "ambient" && density === "sparse") {
    if (width < 640) return 10;
    if (width < 1024) return 12;
    return 14;
  }
  if (variant === "ambient") return 20;
  if (width < 640) return 28;
  if (width < 1024) return 44;
  return 58;
}

function palette(dark: boolean, ambient: boolean, sparse: boolean) {
  if (sparse) {
    return dark
      ? { rgb: [243, 180, 95] as const, node: 0.2, line: 0.09, glow: 0.28 }
      : { rgb: [232, 162, 74] as const, node: 0.13, line: 0.06, glow: 0.18 };
  }
  if (dark && ambient) {
    return { rgb: [243, 180, 95] as const, node: 0.5, line: 0.28, glow: 0.58 };
  }
  return dark
    ? { rgb: [243, 180, 95] as const, node: 0.32, line: 0.16, glow: 0.42 }
    : { rgb: [196, 130, 42] as const, node: 0.3, line: 0.14, glow: 0.4 };
}

function isDark() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

/**
 * Connecting-nodes field. Decorative — never intercepts clicks.
 * `hero` is mouse-reactive and denser; `ambient` is a calmer, passive drift.
 * `density="sparse"` is the confirmation-page atmosphere: 10–15 nodes, slower.
 * `quietRef` marks an element (the hero headline) the field thins out behind.
 */
export function NodeNetwork({
  variant = "hero",
  density = "default",
  quietRef,
  className,
}: {
  variant?: Variant;
  density?: Density;
  quietRef?: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ambient = variant === "ambient";
  const sparse = ambient && density === "sparse";

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;
    const surface: HTMLCanvasElement = canvas;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const speed = sparse ? 0.07 : ambient ? 0.12 : 0.28;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let colors = palette(isDark(), ambient, sparse);
    let frame = 0;
    let last = 0;
    let running = true;
    let intersecting = true;
    let inView = true;

    function syncView() {
      inView = intersecting && document.visibilityState === "visible";
    }

    const mouse = { x: -9999, y: -9999, inside: false };
    const maxDist = () =>
      sparse
        ? Math.min(220, Math.max(140, width * 0.18))
        : Math.min(148, Math.max(96, width * 0.12));

    let zone: Zone | null = null;

    function place() {
      let x = Math.random() * width;
      let y = Math.random() * height;
      if (inZone(zone, x, y) && Math.random() < QUIET_EVICT) {
        for (let attempt = 0; attempt < 8 && inZone(zone, x, y); attempt += 1) {
          x = Math.random() * width;
          y = Math.random() * height;
        }
      }
      return { x, y };
    }

    function seed() {
      const count = nodeCount(width, variant, density);
      nodes = Array.from({ length: count }, () => ({
        ...place(),
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: 1.6 + Math.random() * 1.8,
      }));
    }

    function measureZone(rect: DOMRect) {
      const quiet = quietRef?.current;
      if (!quiet) {
        zone = null;
        return;
      }
      const box = quiet.getBoundingClientRect();
      const pad = 28;
      zone = {
        left: box.left - rect.left - pad,
        top: box.top - rect.top - pad,
        right: box.right - rect.left + pad,
        bottom: box.bottom - rect.top + pad,
      };
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
      measureZone(rect);
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
      const reactive = !ambient && mouse.inside;

      for (const node of nodes) {
        if (reactive) {
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

          const midX = (a.x + c.x) / 2;
          const midY = (a.y + c.y) / 2;
          let alpha = (1 - dist / link) * colors.line;
          if (inZone(zone, midX, midY)) alpha *= QUIET_ALPHA;
          if (reactive) {
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
        let alpha = inZone(zone, node.x, node.y) ? colors.node * QUIET_ALPHA : colors.node;
        if (reactive) {
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
      colors = palette(isDark(), ambient, sparse);
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

    if (!ambient) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      if (!ambient) {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [ambient, density, quietRef, reduced, sparse, variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-[1] size-full", className)}
      style={
        ambient
          ? undefined
          : {
              maskImage:
                "radial-gradient(ellipse 70% 70% at 68% 42%, black 0%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 70% at 68% 42%, black 0%, transparent 100%)",
            }
      }
    />
  );
}
