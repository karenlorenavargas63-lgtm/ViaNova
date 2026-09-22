import React, { useEffect, useRef } from 'react';
import { 
  Sparkles,
  ShieldCheck,
  Radio,
  Navigation
} from 'lucide-react';
import highwayBg from '../assets/images/highway_night_road_1789653812367.jpg';
import vianovaLogoImg from '../assets/images/vianova_logo.png';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

interface CrashHeroAnimationProps {
  variant?: 'hero' | 'compact' | 'full';
  className?: string;
}

export const CrashHeroAnimation: React.FC<CrashHeroAnimationProps> = ({ 
  variant = 'hero',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ambient floating light particles
    const particleColors = ['#00d2ff', '#00ff88', '#ffffff', '#38bdf8'];
    const pList: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      pList.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 500),
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.7 - 0.2,
        size: Math.random() * 2.5 + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.5 + 0.2
      });
    }
    particlesRef.current = pList;

    let roadTime = 0;

    const animate = () => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Subtle highway perspective road lines
      roadTime = (roadTime + 0.5) % 100;
      for (let i = 0; i < 8; i++) {
        const lanePos = ((i * 14 + roadTime) % 100) / 100;
        const y = h * 0.42 + (h * 0.58) * Math.pow(lanePos, 1.8);
        const lineH = 6 + lanePos * 28;
        const lineW = 2 + lanePos * 6;
        ctx.fillStyle = `rgba(0, 255, 136, ${0.12 + lanePos * 0.5})`;
        ctx.fillRect(w * 0.5 - lineW / 2, y, lineW, lineH);
      }

      // Ambient floating particles
      pList.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const containerHeight = variant === 'compact' 
    ? 'h-[360px] sm:h-[400px]'
    : variant === 'full'
    ? 'h-full min-h-[490px] lg:min-h-[580px]'
    : 'h-[440px] sm:h-[490px] md:h-[530px]';

  return (
    <div 
      className={`relative w-full rounded-3xl overflow-hidden shadow-2xl border border-sky-500/30 select-none bg-slate-950 group ${className}`}
    >
      {/* 1. Photorealistic Highway Background */}
      <div className={`relative w-full ${containerHeight} overflow-hidden flex items-center justify-center`}>
        <img
          src={highwayBg}
          alt="Carretera urbana inteligente - ViaNova"
          className="w-full h-full object-cover object-center brightness-70 contrast-125 scale-105"
        />
        
        {/* Gradients & futuristic night atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-slate-950/20 to-emerald-950/60 pointer-events-none" />

        {/* 2. Interactive Canvas Layer (Road lines & ambient cybernetic particles) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* 3. CENTERPIECE: THE VIANOVA SHOWCASE (PERFECTLY CENTERED HORIZONTALLY & VERTICALLY) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-4 md:p-6 pointer-events-none">
          <div className="relative flex flex-col items-center justify-center text-center max-w-md w-full mx-auto pointer-events-auto">
            
            {/* Multi-layered Glowing Aura: Electric Blue & Neon Green */}
            <div className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-radial from-[#00d2ff]/30 via-[#00ff88]/20 to-transparent blur-3xl -z-10 animate-pulse pointer-events-none" />

            {/* Glassmorphism Card Framing the ViaNova Visual */}
            <div className="relative px-5 py-5 sm:px-7 sm:py-6 rounded-3xl bg-slate-950/85 backdrop-blur-2xl border-2 border-sky-400/40 shadow-2xl shadow-sky-950/70 w-full overflow-hidden transition-all duration-300 hover:border-sky-400/60">
              
              {/* Neon Cybernetic Corner Brackets */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 rounded-tl-lg border-t-2 border-l-2 border-[#00ff88] shadow-[0_0_10px_#00ff88]" />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-tr-lg border-t-2 border-r-2 border-[#00d2ff] shadow-[0_0_10px_#00d2ff]" />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 rounded-bl-lg border-b-2 border-l-2 border-[#00d2ff] shadow-[0_0_10px_#00d2ff]" />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 rounded-br-lg border-b-2 border-r-2 border-[#00ff88] shadow-[0_0_10px_#00ff88]" />

              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-sky-500/20 via-emerald-500/20 to-sky-500/20 border border-emerald-400/60 mb-2.5 shadow-md shadow-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-emerald-300 font-mono">
                  Red Inteligente de Movilidad Urbana
                </span>
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              </div>

              {/* The Official VIANOVA Image / Logo Emblem (Full Logo Shown Clearly) */}
              <div className="relative my-2 flex items-center justify-center">
                <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-[#00d2ff] via-white to-[#00ff88] shadow-[0_0_25px_rgba(0,210,255,0.5)]">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center shadow-inner">
                    <img
                      src={vianovaLogoImg}
                      alt="ViaNova - Movilidad Inteligente"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Smart Highway Glowing Circuit SVG */}
              <div className="relative w-full h-8 my-1 flex items-center justify-center">
                <svg viewBox="0 0 340 32" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="roadCircuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.1" />
                      <stop offset="25%" stopColor="#00d2ff" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="75%" stopColor="#00ff88" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#00ff88" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="glowFilt" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <path 
                    d="M 10 22 Q 90 6, 170 16 T 330 12" 
                    fill="none" 
                    stroke="url(#roadCircuitGrad)" 
                    strokeWidth="3" 
                    filter="url(#glowFilt)"
                  />
                  <path 
                    d="M 10 22 Q 90 6, 170 16 T 330 12" 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="1.5" 
                    strokeDasharray="6 4"
                  />

                  <circle cx="90" cy="11" r="3.5" fill="#00d2ff" filter="url(#glowFilt)" />
                  <circle cx="170" cy="16" r="4" fill="#ffffff" filter="url(#glowFilt)" />
                  <circle cx="250" cy="14" r="3.5" fill="#00ff88" filter="url(#glowFilt)" />
                </svg>
              </div>

              {/* Prominent "ViaNova" Title */}
              <div className="relative mb-1.5">
                <h2 className="text-3xl sm:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-white to-[#00ff88] filter drop-shadow-[0_0_20px_rgba(0,255,136,0.6)] font-sans uppercase">
                  ViaNova
                </h2>
              </div>

              {/* Ribbon Line */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-[1.5px] w-8 bg-gradient-to-r from-transparent to-[#00d2ff]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#00ff88] shadow-[0_0_6px_#00ff88]" />
                <span className="text-[10px] sm:text-[11px] font-black text-white tracking-[0.2em] uppercase font-mono">
                  Tecnología Vial • Prevención • Futuro
                </span>
                <div className="w-1.5 h-1.5 rotate-45 bg-[#00d2ff] shadow-[0_0_6px_#00d2ff]" />
                <div className="h-[1.5px] w-8 bg-gradient-to-l from-transparent to-[#00ff88]" />
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal max-w-sm mx-auto">
                Plataforma tecnológica de movilidad urbana y seguridad vial. Conectamos conductores, ciclistas y peatones con rutas inteligentes y prevención en tiempo real.
              </p>

              {/* Core Feature Metric Highlights */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-800/90">
                <div className="p-2 rounded-xl bg-slate-900/70 border border-sky-500/20 flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-sky-400 mb-0.5" />
                  <p className="text-[9px] text-sky-400 font-bold uppercase">Prevención</p>
                  <p className="text-[11px] sm:text-xs font-black text-white">Ruta Segura</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/70 border border-emerald-500/20 flex flex-col items-center">
                  <Radio className="w-4 h-4 text-[#00ff88] mb-0.5" />
                  <p className="text-[9px] text-emerald-400 font-bold uppercase">Monitoreo</p>
                  <p className="text-[11px] sm:text-xs font-black text-white">Tiempo Real</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/70 border border-teal-500/20 flex flex-col items-center">
                  <Navigation className="w-4 h-4 text-teal-400 mb-0.5" />
                  <p className="text-[9px] text-teal-400 font-bold uppercase">Navegación</p>
                  <p className="text-[11px] sm:text-xs font-black text-white">Medellín</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Ambient Bottom Gradient Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-white to-[#00ff88] z-30" />

      </div>
    </div>
  );
};
