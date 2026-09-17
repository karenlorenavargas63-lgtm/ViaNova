import React from 'react';
import logoImg from '../assets/images/vianova_logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
  textColor?: 'dark' | 'light';
  useImage?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showSubtitle = false,
  textColor = 'dark',
  useImage = true,
}) => {
  const sizeMap = {
    sm: { img: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]' },
    md: { img: 'w-10 h-10', text: 'text-xl sm:text-2xl', sub: 'text-[10px]' },
    lg: { img: 'w-14 h-14', text: 'text-2xl sm:text-3xl', sub: 'text-xs' },
    xl: { img: 'w-24 h-24 sm:w-28 sm:h-28', text: 'text-3xl sm:text-4xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Circular Emblem */}
      <div className={`relative ${currentSize.img} shrink-0 rounded-full overflow-hidden shadow-xs border border-blue-500/20 bg-white`}>
        <img
          src={logoImg}
          alt="ViaNova Logo"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className={`font-extrabold tracking-tight ${currentSize.text} flex items-center`}>
            <span className="text-[#0057d9]">Via</span>
            <span className={textColor === 'light' ? 'text-white' : 'text-[#0a193b]'}>Nova</span>
          </div>

          {showSubtitle && (
            <span
              className={`font-semibold tracking-widest uppercase mt-0.5 ${currentSize.sub} ${
                textColor === 'light' ? 'text-blue-200/90' : 'text-slate-500'
              }`}
            >
              Movilidad inteligente para tu ciudad
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
