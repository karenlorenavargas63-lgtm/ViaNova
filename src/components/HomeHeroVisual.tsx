import React from 'react';
import { Wifi, ShieldCheck } from 'lucide-react';
import smartCityHeroImg from '../assets/images/vianova_smart_city_hero_1788275485184.jpg';
import logoImg from '../assets/images/vianova_logo.png';
import { HomeHeroPedestriansMotion } from './HomeHeroPedestriansMotion';

interface HomeHeroVisualProps {
  className?: string;
}

export const HomeHeroVisual: React.FC<HomeHeroVisualProps> = ({ className = '' }) => {
  return (
    <div className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-sky-300 bg-slate-900 group select-none ${className}`}>
      
      {/* Base Image: Smart City Medellín / Modern Urban Center */}
      <div className="relative w-full h-[400px] sm:h-[470px] overflow-hidden">
        <img
          src={smartCityHeroImg}
          alt="Movilidad Inteligente para tu ciudad - VIANOVA"
          className="w-full h-full object-cover opacity-95 group-hover:scale-102 transition-transform duration-700"
        />

        {/* Cinematic Clean Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Floating Status Pill */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-30 pointer-events-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white shadow-xl text-xs font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="tracking-wide">Monitoreo Urbano en Vivo</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-blue-300 shadow-xl text-xs font-medium">
            <Wifi className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Red Vial Activa</span>
          </div>
        </div>

        {/* Dynamic Articulated Pedestrians & Cyclist Motion Layer */}
        <HomeHeroPedestriansMotion />

        {/* Bottom Floating Smart Badge: Sky Blue Theme */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md p-3 sm:p-3.5 rounded-2xl bg-[#caeafc]/95 backdrop-blur-md shadow-2xl border border-sky-300 z-30 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-[#a8d8fc] p-0.5 border border-sky-300 shadow-md shrink-0 flex items-center justify-center">
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
                  En Vivo
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium truncate">Cruce peatonal monitoreado con detección de paso seguro</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
