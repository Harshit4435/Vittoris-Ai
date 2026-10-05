import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig';

interface GsapTextRevealProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  scrollTrigger?: boolean;
  triggerHook?: string; // e.g. "top 85%"
  direction?: 'up' | 'down';
  blur?: boolean;
}

export const GsapTextReveal: React.FC<GsapTextRevealProps> = ({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 1.0,
  stagger = 0.045,
  scrollTrigger = true,
  triggerHook = 'top 88%',
  direction = 'up',
  blur = true,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Find all word/item spans
    const targets = el.querySelectorAll('.gsap-reveal-item');
    if (!targets.length) return;

    const fromY = direction === 'up' ? 45 : -45;

    // Set initial state
    gsap.set(targets, {
      y: fromY,
      opacity: 0,
      rotateX: direction === 'up' ? -25 : 25,
      filter: blur ? 'blur(8px)' : 'none',
      transformPerspective: 1000,
      transformOrigin: '50% 100%',
    });

    const animConfig: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      duration,
      stagger,
      delay,
      ease: 'power3.out',
    };

    let triggerInstance: ScrollTrigger | null = null;

    if (scrollTrigger) {
      triggerInstance = ScrollTrigger.create({
        trigger: el,
        start: triggerHook,
        once: true,
        onEnter: () => {
          gsap.to(targets, animConfig);
        },
      });
    } else {
      gsap.to(targets, animConfig);
    }

    return () => {
      if (triggerInstance) triggerInstance.kill();
    };
  }, [delay, duration, stagger, scrollTrigger, triggerHook, direction, blur]);

  // If children is a pure string, split into words
  const renderContent = () => {
    if (typeof children === 'string') {
      const words = children.split(' ');
      return words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0"
        >
          <span className="gsap-reveal-item inline-block will-change-transform">
            {word}
          </span>
        </span>
      ));
    }

    // If children is already JSX or mixed, wrap children with container class
    return <span className="gsap-reveal-item inline-block will-change-transform">{children}</span>;
  };

  return React.createElement(
    Component,
    {
      ref: containerRef,
      className: `${className} perspective-1000`,
    },
    renderContent()
  );
};
