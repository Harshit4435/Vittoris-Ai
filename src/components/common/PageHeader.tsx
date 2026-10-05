import React from 'react';
import { GsapTextReveal } from '../animations/GsapTextReveal';
import { GsapMagnetic } from '../animations/GsapMagnetic';
import { GsapScrollFade } from '../animations/GsapScrollFade';

interface PageHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
  badge?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  subtitle,
  title,
  description,
  badge
}) => {
  return (
    <div className="relative pt-36 pb-20 px-6 lg:px-16 border-b overflow-hidden" style={{ borderColor: 'var(--border-divider)' }}>
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
        {badge && (
          <div className="mb-4">
            <GsapMagnetic strength={0.25}>
              <span className="inline-block px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase font-semibold text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-full shadow-[0_2px_12px_rgba(212,175,55,0.1)]">
                {badge}
              </span>
            </GsapMagnetic>
          </div>
        )}

        <div className="mb-3">
          <span className="text-xs tracking-[0.35em] uppercase text-[#D4AF37] font-semibold inline-block">
            {subtitle}
          </span>
        </div>

        <GsapTextReveal
          as="h1"
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal leading-tight tracking-wide mb-6 max-w-4xl text-white"
          delay={0.15}
          duration={1.1}
          stagger={0.06}
          scrollTrigger={false}
        >
          {title}
        </GsapTextReveal>

        {description && (
          <GsapScrollFade delay={0.3} y={20}>
            <p className="text-sm md:text-base leading-relaxed font-light max-w-2xl text-center text-stone-300" style={{ color: 'var(--text-muted)' }}>
              {description}
            </p>
          </GsapScrollFade>
        )}

        <GsapScrollFade delay={0.4} y={15}>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-8" />
        </GsapScrollFade>
      </div>
    </div>
  );
};
