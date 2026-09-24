import React, { useState } from 'react';
import { Wifi, ShieldCheck, Play, Pause } from 'lucide-react';
import smartCityHeroImg from '../assets/images/vianova_smart_city_hero_1788275485184.jpg';
import logoImg from '../assets/images/vianova_logo.png';

interface HomeHeroVisualProps {
  className?: string;
}

export const HomeHeroVisual: React.FC<HomeHeroVisualProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  return (
    <div className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-sky-300 bg-slate-950 group select-none ${className}`}>
      
      {/* Dynamic Keyframes for Living Cinemagraph Motion */}
      <style>{`
        @keyframes photoLivingDrift {
          0% {
            transform: scale(1.0) translate3d(0%, 0%, 0);
          }
          25% {
            transform: scale(1.05) translate3d(-1.2%, -0.8%, 0);
          }
          50% {
            transform: scale(1.08) translate3d(0.8%, -1.2%, 0);
          }
          75% {
            transform: scale(1.04) translate3d(1.2%, 0.5%, 0);
          }
          100% {
            transform: scale(1.0) translate3d(0%, 0%, 0);
          }
        }

        @keyframes lightSweepAcross {
          0% {
            transform: translateX(-120%) skewX(-25deg);
            opacity: 0;
          }
          20% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.25;
          }
          100% {
            transform: translateX(240%) skewX(-25deg);
            opacity: 0;
          }
        }

        @keyframes roadScanWave {
          0% {
            transform: translateY(120%);
            opacity: 0;
          }
          30% {
            opacity: 0.6;
          }
          70% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-20%);
            opacity: 0;
          }
        }
      `}</style>

      {/* Container: Original Photo in Continuous Living Motion */}
      <div className="relative w-full h-[390px] sm:h-[450px] overflow-hidden bg-slate-950">
        
        {/* Original Photo with Smooth Living Cinemagraph Motion */}
        <img
          src={smartCityHeroImg}
          alt="Movilidad Urbana Inteligente - VIANOVA"
          className="w-full h-full object-cover will-change-transform"
          style={{
            animation: isPlaying ? 'photoLivingDrift 16s infinite ease-in-out' : 'none',
            transformOrigin: '50% 60%',
          }}
        />

        {/* Ambient Sunlight Glimmer Sheen across the Avenue */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 45%, rgba(56,189,248,0.2) 50%, rgba(255,255,255,0.08) 55%, transparent 100%)',
            animation: isPlaying ? 'lightSweepAcross 8s infinite cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        />

        {/* Subtle Smart City LIDAR / Crosswalk Sensor Sweep at bottom street */}
        <div className="absolute inset-x-0 bottom-0 h-44 overflow-hidden pointer-events-none">
          <div
            className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8]"
            style={{
              animation: isPlaying ? 'roadScanWave 6s infinite ease-in-out' : 'none',
            }}
          />
        </div>

        {/* Cinematic Clean Overlays for Visual Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/25 pointer-events-none" />

        {/* Top Floating Status Pill */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-30 pointer-events-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white shadow-xl text-xs font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="tracking-wide">Monitoreo Urbano Inteligente</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pausar movimiento' : 'Reanudar movimiento'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white shadow-xl text-xs font-medium hover:bg-slate-800 transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px]">Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  <span className="text-[11px]">Reanudar</span>
                </>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-blue-300 shadow-xl text-xs font-medium">
              <Wifi className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Red Vial Activa</span>
            </div>
          </div>
        </div>

        {/* Bottom Floating Smart Badge: Sky Blue Theme */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-3.5 rounded-2xl bg-[#caeafc]/95 backdrop-blur-md shadow-2xl border border-sky-300 z-30 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#a8d8fc] p-0.5 border border-sky-300 shadow-md shrink-0 flex items-center justify-center">
              <img 
                src={logoImg} 
                alt="Logo Oficial VIANOVA" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">Seguridad y Movilidad Vial</h4>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-700 shrink-0">
                  Activo
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium truncate">Red inteligente de monitoreo en tiempo real para Medellín</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
