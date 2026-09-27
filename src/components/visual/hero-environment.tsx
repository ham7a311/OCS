"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { HeroSkyline } from "@/components/visual/hero-skyline";
import { NodeNetwork } from "@/components/visual/node-network";
import { imagery } from "@/data/imagery";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * The hero as one physical scene: the dusk photograph, light, skyline
 * linework, and the node field. The still is the environment.
 */
export function HeroEnvironment({ quietRef }: { quietRef: RefObject<HTMLElement | null> }) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const skylineY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 36]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let running = false;
    let visible = true;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const loop = () => {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      root.style.setProperty("--hero-px", x.toFixed(4));
      root.style.setProperty("--hero-py", y.toFixed(4));
      if (Math.abs(targetX - x) > 0.0005 || Math.abs(targetY - y) > 0.0005) {
        frame = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const onMove = (event: PointerEvent) => {
      if (!visible) return;
      targetX = event.clientX / window.innerWidth - 0.5;
      targetY = event.clientY / window.innerHeight - 0.5;
      if (!running) {
        running = true;
        frame = requestAnimationFrame(loop);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
    });
    observer.observe(root);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="hero-env" aria-hidden="true">
      <motion.div className="hero-env__plane" style={{ y: photoY }}>
        <div className="hero-env__photo">
          <Image
            src={imagery.hero.src}
            alt={imagery.hero.alt}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="hero-env__img"
          />
        </div>
      </motion.div>
      <div className="hero-env__light" />
      <motion.div className="hero-env__plane" style={{ y: skylineY }}>
        <div className="hero-env__skyline">
          <HeroSkyline />
        </div>
      </motion.div>
      <NodeNetwork quietRef={quietRef} className="hero-env__nodes" />
      <div className="hero-env__grain" />
    </div>
  );
}
