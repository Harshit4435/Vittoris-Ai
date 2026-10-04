import React from 'react';
import emblemImg from '../../assets/branding/vittoris-emblem.png';
import fullLogoImg from '../../assets/branding/vittoris-full-logo.png';

interface VittorisLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
  variant?: 'inline' | 'full';
}

export const VittorisIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-9 h-9", 
  size,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div 
      className={`relative flex items-center justify-center select-none shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={style}
    >
      {/* Subtle Purple & Gold Ambient Glow */}
      <div className="absolute inset-0 bg-[#7F56D9]/20 rounded-full blur-md group-hover:bg-[#7F56D9]/40 transition-all duration-300 pointer-events-none" />
      <img 
        src={emblemImg} 
        alt="Vittoris Official Emblem" 
        className="relative z-10 w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_16px_rgba(127,86,217,0.4)]" 
      />
    </div>
  );
};

export const VittorisLogo: React.FC<VittorisLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  subtitleText = 'Growth & AI Services',
  className = '',
  variant = 'inline'
}) => {
  const iconPixelSizes = {
    sm: 32,
    md: 42,
    lg: 52,
    xl: 64
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg md:text-xl',
    lg: 'text-2xl md:text-3xl',
    xl: 'text-3xl md:text-4xl'
  };

  const fullLogoHeights = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20'
  };

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center group select-none ${className}`}>
        <img 
          src={fullLogoImg} 
          alt="Vittoris Logo" 
          className={`${fullLogoHeights[size]} w-auto object-contain drop-shadow-[0_4px_20px_rgba(127,86,217,0.35)] transition-transform duration-300 group-hover:scale-105`} 
        />
        {showSubtitle && (
          <span className="text-[8px] md:text-[8.5px] tracking-[0.26em] uppercase text-stone-400 group-hover:text-stone-300 font-medium mt-1.5 leading-none">
            {subtitleText}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 group select-none ${className}`}>
      {/* Official Purple Lotus Emblem */}
      <VittorisIcon size={iconPixelSizes[size]} />

      {/* Official Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1 leading-none">
          <span className={`font-serif tracking-[0.2em] text-[#C7A86D] group-hover:text-[#E5C788] transition-colors ${textSizes[size]}`}>
            VITTORIS
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[8px] md:text-[8.5px] tracking-[0.26em] uppercase text-stone-400 group-hover:text-stone-300 font-medium mt-1 leading-none">
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};

export default VittorisLogo;
