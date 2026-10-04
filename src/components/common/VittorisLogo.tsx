import React from 'react';
import logoMarkImg from '../../assets/branding/vittoris-logo-mark-white.png';

interface VittorisLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
  useRealImage?: boolean;
}

export const VittorisIcon: React.FC<{ className?: string; size?: number; useRealImage?: boolean }> = ({ 
  className = "w-9 h-9", 
  size,
  useRealImage = true
}) => {
  const style = size ? { width: size, height: size } : undefined;

  if (useRealImage) {
    return (
      <div 
        className={`rounded-xl bg-gradient-to-tr from-[#141414] to-[#1C1C1C] flex items-center justify-center p-1.5 shadow-[0_4px_20px_rgba(199,168,109,0.2)] border border-[#C7A86D]/30 transition-transform duration-300 group-hover:scale-105 overflow-hidden select-none shrink-0 ${className}`}
        style={style}
      >
        <img 
          src={logoMarkImg} 
          alt="Vittoris Company Logo" 
          className="w-full h-full object-contain pointer-events-none drop-shadow-sm brightness-110" 
        />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 100 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="vittorisGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5C788" />
          <stop offset="50%" stopColor="#C7A86D" />
          <stop offset="100%" stopColor="#A38347" />
        </linearGradient>
      </defs>
      <path
        d="M 50 8 C 63 8 72 26 66 48 C 61 63 53 73 50 78 C 47 73 39 63 34 48 C 28 26 37 8 50 8 Z"
        fill="url(#vittorisGold)"
      />
    </svg>
  );
};

export const VittorisLogo: React.FC<VittorisLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  subtitleText = 'Growth & Automation Systems',
  className = '',
  useRealImage = true
}) => {
  const iconPixelSizes = {
    sm: 30,
    md: 40,
    lg: 50,
    xl: 60
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg md:text-xl',
    lg: 'text-2xl md:text-3xl',
    xl: 'text-3xl md:text-4xl'
  };

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Brand Logo Mark */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-[#C7A86D]/15 rounded-2xl blur-md group-hover:bg-[#C7A86D]/30 transition-all duration-300 pointer-events-none" />
        <VittorisIcon size={iconPixelSizes[size]} useRealImage={useRealImage} />
      </div>

      {/* Official Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1 leading-none">
          <span className={`font-serif tracking-[0.2em] text-[#C7A86D] group-hover:text-[#E5C788] transition-colors ${textSizes[size]}`}>
            VITTORIS
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[8px] md:text-[8.5px] tracking-[0.26em] uppercase text-slate-400 group-hover:text-slate-300 font-medium mt-1 leading-none">
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};

export default VittorisLogo;
