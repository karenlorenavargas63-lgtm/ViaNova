import React, { useState } from 'react';
import { Wifi, Eye, ShieldCheck, Activity, Users } from 'lucide-react';
import realPedestriansGif from '../assets/images/pedestrians_real_crossing_opt.gif';
import realPedestriansMp4 from '../assets/images/pedestrians_real_crossing.mp4';
import logoImg from '../assets/images/vianova_logo.png';

interface HomeHeroVisualProps {
  className?: string;
}

export const HomeHeroVisual: React.FC<HomeHeroVisualProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  return (
    <div className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-sky-300 bg-slate-950 group select-none ${className}`}>
      
      {/* Container: Real Human Pedestrians Animated GIF & Smooth Video Loop */}
      <div className="relative w-full h-[400px] sm:h-[480px] overflow-hidden bg-slate-950">
        
        {/* Real Human Beings in City Crosswalk (Video / GIF Loop) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-95 group-hover:scale-102 transition-transform duration-700"
        >
          <source src={realPedestriansMp4} type="video/mp4" />
          {/* Native Animated GIF for Real Humans Crossing */}
          <img
            src={realPedestriansGif}
            alt="Personas humanas reales en cruce peatonal urbano - VIANOVA"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Cinematic Clean Shadow Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-black/35 pointer-events-none" />

        {/* Top Floating Status Pill */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-30 pointer-events-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-white shadow-xl text-xs font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="tracking-wide">Cruce Peatonal en Tiempo Real</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-blue-300 shadow-xl text-xs font-medium">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white font-semibold">Peatones en Tránsito</span>
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
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">Seguridad y Tránsito Peatonal</h4>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-700 shrink-0">
                  En Directo
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium truncate">Flujo de personas en paso peatonal monitoreado por VIANOVA</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
