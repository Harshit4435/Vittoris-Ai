import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig';

interface GsapCounterProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const GsapCounter: React.FC<GsapCounterProps> = ({
  end,
  start = 0,
  duration = 2.0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const [val, setVal] = useState(start);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const proxy = { value: start };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(proxy, {
          value: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setVal(decimals > 0 ? parseFloat(proxy.value.toFixed(decimals)) : Math.round(proxy.value));
          },
        });
      },
    });

    return () => trigger.kill();
  }, [end, start, duration, decimals]);

  return (
    <span ref={containerRef} className={className}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
};
