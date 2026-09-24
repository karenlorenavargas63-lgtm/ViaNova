import React from 'react';
import { ShieldCheck, Activity, Wifi, Sparkles } from 'lucide-react';
import intersectionImg from '../assets/images/urban_mobility_intersection_1788442809042.jpg';

interface AnimatedUrbanMobilityProps {
  className?: string;
}

export const AnimatedUrbanMobility: React.FC<AnimatedUrbanMobilityProps> = ({ className = '' }) => {
  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 border-sky-300 bg-slate-900 group select-none ${className}`}>
      
      {/* 1. Base Image: High quality smart city intersection (Clean Real Photography, no overlays/muñecos) */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={intersectionImg}
          alt="Intersección urbana inteligente y conectada VIANOVA"
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient atmospheric lighting & clean depth gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/25 pointer-events-none" />

        {/* Top Overlay: Live Status */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20 pointer-events-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white shadow-xl text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="tracking-wide">Infraestructura Conectada</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-blue-300 shadow-xl text-xs font-medium">
            <Wifi className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Red Vial IoT</span>
          </div>
        </div>

        {/* Center-Right Subtle Floating Intelligence Card */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/15 text-white shadow-2xl hidden sm:flex flex-col gap-1 max-w-[200px] pointer-events-none transform transition-transform group-hover:translate-x-[-4px]">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gestión Inteligente</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Priorización adaptativa para peatones, ciclorrutas y transporte público sostenible.
          </p>
        </div>

        {/* Bottom Overlay: Telemetry Pills */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-20">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white shadow-lg text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Prioridad al Peatón y Ciclista</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white shadow-lg text-xs flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span>Monitoreo en Tiempo Real</span>
          </div>
        </div>

      </div>
    </div>
  );
};
