import React, { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsapConfig';

export const GsapMouseFollower: React.FC = () => {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    // Only enable on fine pointer devices (desktops/laptops)
    if (window.matchMedia('(pointer: coarse)').matches) {
      el.style.display = 'none';
      return;
    }

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power2.out' });

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to(el, { opacity: 0.45, duration: 0.5 });
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      gsap.to(el, { opacity: 0, duration: 0.5 });
      isVisible = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(199,168,109,0.12)_0%,rgba(127,86,217,0.06)_40%,transparent_70%)] rounded-full blur-3xl pointer-events-none z-0 opacity-0 will-change-transform"
      style={{ pointerEvents: 'none' }}
    />
  );
};
