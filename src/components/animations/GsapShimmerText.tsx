import React from 'react';

interface GsapShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
}

export const GsapShimmerText: React.FC<GsapShimmerTextProps> = ({
  children,
  className = '',
  as: Component = 'span',
}) => {
  return React.createElement(
    Component,
    {
      className: `text-gold-shimmer font-serif italic ${className}`,
    },
    children
  );
};
