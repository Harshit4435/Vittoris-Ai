import React, { useRef, useEffect } from 'react';
import { gsap } from '../../utils/gsapConfig';

interface GsapMagneticProps {
  children: React.ReactElement;
  strength?: number; // 0.1 to 0.8
  className?: string;
}

export const GsapMagnetic: React.FC<GsapMagneticProps> = ({
  children,
  strength = 0.35,
  className = '',
}) => {
  const magneticRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    // Use gsap.quickTo for instant sub-pixel frame rate performance
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={magneticRef} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
};
