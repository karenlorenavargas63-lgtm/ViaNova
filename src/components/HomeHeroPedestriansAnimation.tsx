import React from 'react';
import { Wifi } from 'lucide-react';
import smartCityHeroImg from '../assets/images/vianova_smart_city_hero_1788275485184.jpg';
import logoImg from '../assets/images/vianova_logo.png';

interface HomeHeroPedestriansAnimationProps {
  className?: string;
}

export const HomeHeroPedestriansAnimation: React.FC<HomeHeroPedestriansAnimationProps> = ({ className = '' }) => {
  return (
    <div className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-slate-200/80 bg-slate-900 group select-none ${className}`}>
      
      {/* 1. Base Image: Smart City Medellín / Modern Urban Center */}
      <div className="relative w-full h-[380px] sm:h-[440px] overflow-hidden">
        <img
          src={smartCityHeroImg}
          alt="Movilidad Inteligente para tu ciudad - VIANOVA"
          className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/20 pointer-events-none" />

        {/* Smart Pedestrian Crossing Zone (Subtle IoT Path) */}
        <div className="absolute left-0 right-0 top-[56%] h-[24%] pointer-events-none">
          {/* Subtle safe-crossing lane glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent border-y border-blue-400/20" />
          
          {/* Smart Crossing Marker */}
          <div className="absolute left-6 top-1 text-[9px] font-mono font-bold text-blue-300 bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-400/30 flex items-center gap-1.5 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>PASO PEATONAL INTELIGENTE • PRIORIDAD ACTIVA</span>
          </div>
        </div>

        {/* Top Floating Status Pill */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20 pointer-events-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white shadow-xl text-xs font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="tracking-wide">Monitoreo Urbano Inteligente</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-blue-300 shadow-xl text-xs font-medium">
            <Wifi className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Red Vial Activa</span>
          </div>
        </div>

        {/* Bottom Floating Smart Badge: Exact Brand Spec Preserved */}
        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/60 z-30 pointer-events-auto">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white p-0.5 border border-blue-200/80 shadow-md shrink-0 flex items-center justify-center">
              <img 
                src={logoImg} 
                alt="Logo Oficial VIANOVA" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 truncate">Seguridad y Movilidad Vial</h4>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700 shrink-0">
                  Activo
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate">Red inteligente de monitoreo en tiempo real para Medellín</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
