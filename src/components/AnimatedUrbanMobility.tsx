import React from 'react';
import { ShieldCheck, Activity, Wifi } from 'lucide-react';
import intersectionImg from '../assets/images/urban_mobility_intersection_1788442809042.jpg';

interface AnimatedUrbanMobilityProps {
  className?: string;
}

export const AnimatedUrbanMobility: React.FC<AnimatedUrbanMobilityProps> = ({ className = '' }) => {
  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group select-none ${className}`}>
      
      {/* 1. Base Image: High quality smart city intersection */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={intersectionImg}
          alt="Intersección urbana inteligente y conectada VIANOVA"
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Ambient atmospheric lighting & clean depth gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-slate-950/30 pointer-events-none" />

        {/* Smart City IoT Virtual Lanes (Subtle HUD Grid / Sensor Paths) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Protected Bike Lane HUD Path */}
          <div className="absolute left-0 right-0 top-[67%] h-[14%] bg-emerald-500/10 border-y border-emerald-400/30 backdrop-blur-[0.5px]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(16,185,129,0.15)_50%,transparent_100%)] animate-pulse" />
            <div className="absolute right-4 top-1 text-[9px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              CICLORRUTA SEGURA • SENSOR ACTIVO
            </div>
          </div>

          {/* Pedestrian Crossing HUD Path */}
          <div className="absolute left-0 right-0 top-[79%] h-[15%] bg-blue-500/10 border-y border-blue-400/25">
            <div className="absolute left-4 bottom-1 text-[9px] font-mono font-bold text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30 flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              CRUCE PEATONAL INTELIGENTE
            </div>
          </div>
        </div>

        {/* Top Overlay: Live Status */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20 pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white shadow-lg text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="tracking-wide">Infraestructura Conectada</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-blue-300 shadow-lg text-xs font-medium">
            <Wifi className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Red Vial IoT</span>
          </div>
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
