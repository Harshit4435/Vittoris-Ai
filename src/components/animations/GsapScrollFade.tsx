import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig';

interface GsapScrollFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  staggerChildren?: number;
  triggerHook?: string;
}

export const GsapScrollFade: React.FC<GsapScrollFadeProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.9,
  y = 35,
  scale = 0.98,
  staggerChildren = 0,
  triggerHook = 'top 88%',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (staggerChildren > 0) {
      const childElements = el.children;
      gsap.set(childElements, {
        opacity: 0,
        y,
        scale,
      });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: triggerHook,
        once: true,
        onEnter: () => {
          gsap.to(childElements, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            delay,
            stagger: staggerChildren,
            ease: 'power3.out',
          });
        },
      });

      return () => trigger.kill();
    } else {
      gsap.set(el, {
        opacity: 0,
        y,
        scale,
      });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: triggerHook,
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease: 'power3.out',
          });
        },
      });

      return () => trigger.kill();
    }
  }, [delay, duration, y, scale, staggerChildren, triggerHook]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
