import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  linkToHome?: boolean;
  variant?: string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  linkToHome = true,
}) => {
  const sizeMap = {
    sm: { img: 40, text: 'text-base', sub: 'text-[9px]' },
    md: { img: 52, text: 'text-lg', sub: 'text-[10px]' },
    lg: { img: 68, text: 'text-2xl', sub: 'text-xs' },
    xl: { img: 96, text: 'text-3xl', sub: 'text-sm' },
  };

  const { img, text, sub } = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Uploaded Future Minds official brand mark - preserved without distortion or recoloring */}
      <div 
        className="relative overflow-hidden flex-shrink-0" 
        style={{ width: img, height: img }}
      >
        <Image
          src="/logo.jpg"
          alt="Future Minds - LEARN / BUILD / BELONG"
          fill
          sizes={`${img}px`}
          className="object-contain p-0.5"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1 font-black tracking-tight uppercase">
            <span className={`${text} text-[#0b1a30]`}>Future</span>
            <span className={`${text} text-[#0066FF]`}>Minds</span>
          </div>
          <span className={`${sub} text-slate-500 font-bold tracking-wider uppercase mt-1`}>
            LEARN / BUILD / BELONG
          </span>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link 
        href="/" 
        className="inline-block transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#0066FF] rounded-md"
        aria-label="Future Minds Homepage"
      >
        {content}
      </Link>
    );
  }

  return content;
};
