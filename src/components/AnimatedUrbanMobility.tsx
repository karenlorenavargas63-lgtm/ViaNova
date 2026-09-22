import React, { useState } from 'react';
import { Play, Pause, Zap, Eye, ShieldCheck, Activity } from 'lucide-react';
import intersectionImg from '../assets/images/urban_mobility_intersection_1788442809042.jpg';

interface AnimatedUrbanMobilityProps {
  className?: string;
}

export const AnimatedUrbanMobility: React.FC<AnimatedUrbanMobilityProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 1.5>(1);
  const [showSensors, setShowSensors] = useState(true);
  const [hoveredActor, setHoveredActor] = useState<string | null>(null);

  const speedClass = speedMultiplier === 1.5 ? 'speed-fast' : 'speed-normal';

  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group select-none ${className}`}>
      
      {/* 1. Base Image: High quality smart city intersection */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={intersectionImg}
          alt="Intersección urbana inteligente con ciclovías y peatones en movimiento"
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.01]"
        />

        {/* Ambient atmospheric lighting & realistic pavement shadow layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none" />

        {/* 2. Smart City IoT Virtual Lanes (Subtle HUD Grid / Sensor Paths) */}
        {showSensors && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-300">
            {/* Protected Bike Lane HUD Path */}
            <div className="absolute left-0 right-0 top-[67%] h-[14%] bg-emerald-500/10 border-y border-emerald-400/30 backdrop-blur-[0.5px]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(16,185,129,0.15)_50%,transparent_100%)] animate-pulse" />
              <div className="absolute right-4 top-1 text-[9px] font-mono font-bold text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                CICLORRUTA SEGURA • SENSOR ACTIVO
              </div>
            </div>

            {/* Pedestrian Crossing HUD Path */}
            <div className="absolute left-0 right-0 top-[79%] h-[15%] bg-blue-500/10 border-y border-blue-400/25">
              <div className="absolute left-4 bottom-1 text-[9px] font-mono font-bold text-blue-300 bg-blue-950/70 px-2 py-0.5 rounded border border-blue-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                CRUCE PEATONAL INTELIGENTE
              </div>
            </div>
          </div>
        )}

        {/* 3. ANIMATED ACTORS LAYER (CYCLISTS & PEDESTRIANS) */}
        <div className={`absolute inset-0 overflow-hidden ${!isPlaying ? 'animation-paused' : ''} ${speedClass}`}>
          
          {/* ========================================================================= */}
          {/* CYCLIST 1: Heading East (Left to Right along the protected cycle track) */}
          {/* ========================================================================= */}
          <div 
            className="actor-cyclist-east absolute pointer-events-auto cursor-pointer z-20"
            style={{ top: '68%' }}
            onMouseEnter={() => setHoveredActor('ciclista-1')}
            onMouseLeave={() => setHoveredActor(null)}
          >
            {/* Floating Inspection Tooltip */}
            {hoveredActor === 'ciclista-1' && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl border border-emerald-400/40 z-30 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ciclista Urbano • 21 km/h (Vía Segura)</span>
              </div>
            )}

            {/* Cyclist SVG with animated wheels, legs, and safety beacon */}
            <div className="relative w-20 h-16 sm:w-24 sm:h-20 drop-shadow-[0_8px_6px_rgba(0,0,0,0.65)]">
              {/* Ground Shadow */}
              <div className="absolute bottom-1 left-2 right-2 h-2 bg-black/40 rounded-full blur-[2px] transform scale-x-90" />

              <svg viewBox="0 0 100 80" className="w-full h-full overflow-visible">
                <defs>
                  {/* Wheel Pattern */}
                  <pattern id="spokes" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="4" stroke="#94a3b8" strokeWidth="0.5" fill="none" />
                  </pattern>
                </defs>

                {/* Back Wheel (Spinning) */}
                <g className="cyclist-wheel" style={{ transformOrigin: '22px 60px' }}>
                  <circle cx="22" cy="60" r="14" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
                  <circle cx="22" cy="60" r="11" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1="22" y1="46" x2="22" y2="74" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="8" y1="60" x2="36" y2="60" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="12" y1="50" x2="32" y2="70" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="12" y1="70" x2="32" y2="50" stroke="#e2e8f0" strokeWidth="1" />
                  <circle cx="22" cy="60" r="3" fill="#0055d4" />
                </g>

                {/* Front Wheel (Spinning) */}
                <g className="cyclist-wheel" style={{ transformOrigin: '76px 60px' }}>
                  <circle cx="76" cy="60" r="14" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
                  <circle cx="76" cy="60" r="11" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1="76" y1="46" x2="76" y2="74" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="62" y1="60" x2="90" y2="60" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="66" y1="50" x2="86" y2="70" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="66" y1="70" x2="86" y2="50" stroke="#e2e8f0" strokeWidth="1" />
                  <circle cx="76" cy="60" r="3" fill="#0055d4" />
                </g>

                {/* Bicycle Frame (Modern Cyan/Blue Commuter) */}
                <path d="M22 60 L48 60 L42 42 L22 60 Z" fill="none" stroke="#0055d4" strokeWidth="3.5" strokeLinejoin="round" />
                <path d="M48 60 L76 60 L68 38 L42 42" fill="none" stroke="#00d2ff" strokeWidth="3.5" strokeLinejoin="round" />
                <line x1="68" y1="38" x2="76" y2="60" stroke="#0055d4" strokeWidth="3.5" />
                {/* Handlebars */}
                <path d="M68 38 L65 30 L72 29" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Seat Post & Saddle */}
                <line x1="42" y1="42" x2="40" y2="35" stroke="#334155" strokeWidth="3" />
                <path d="M34 35 C34 35 44 33 46 35 C47 36 43 38 41 38 Z" fill="#0f172a" />

                {/* Headlight Beam */}
                <polygon points="72,30 98,22 98,38" fill="rgba(255,255,255,0.25)" className="animate-pulse" />
                <circle cx="71" cy="30" r="2.5" fill="#ffffff" />
                {/* Rear Red Light */}
                <circle cx="34" cy="37" r="2" fill="#ef4444" className="animate-ping" />

                {/* Cyclist Rider (Torso & Head) */}
                {/* Head with Protective Helmet */}
                <circle cx="56" cy="18" r="6.5" fill="#f87171" />
                {/* Helmet */}
                <path d="M50 18 C50 10 63 10 65 17 L68 18 L50 20 Z" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1" />
                <path d="M52 20 L56 24 L62 21" fill="none" stroke="#334155" strokeWidth="1" /> {/* Chin strap */}

                {/* Torso & Arm */}
                <path d="M42 35 L52 23 L66 31" fill="none" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                {/* Backpack */}
                <rect x="42" y="22" width="7" height="10" rx="3" fill="#1e293b" transform="rotate(-15 42 22)" />

                {/* Articulated Pedaling Legs */}
                <g className="cyclist-pedal-legs" style={{ transformOrigin: '48px 60px' }}>
                  {/* Leg 1 */}
                  <path d="M44 35 L48 48 L52 60" fill="none" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Pedal Shoe */}
                  <rect x="50" y="58" width="6" height="3" rx="1" fill="#f97316" />
                </g>
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CYCLIST 2: Heading West (Right to Left in the adjacent buffer lane) */}
          {/* ========================================================================= */}
          <div 
            className="actor-cyclist-west absolute pointer-events-auto cursor-pointer z-10"
            style={{ top: '61%' }}
            onMouseEnter={() => setHoveredActor('ciclista-2')}
            onMouseLeave={() => setHoveredActor(null)}
          >
            {/* Tooltip */}
            {hoveredActor === 'ciclista-2' && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl border border-amber-400/40 z-30 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Ciclista de Ruta • 24 km/h (Retorno Seguro)</span>
              </div>
            )}

            {/* Cyclist facing Left */}
            <div className="relative w-16 h-14 sm:w-20 sm:h-16 drop-shadow-[0_6px_5px_rgba(0,0,0,0.6)] transform scale-x-[-1]">
              <div className="absolute bottom-1 left-2 right-2 h-1.5 bg-black/40 rounded-full blur-[2px]" />
              
              <svg viewBox="0 0 100 80" className="w-full h-full overflow-visible">
                {/* Wheels */}
                <g className="cyclist-wheel" style={{ transformOrigin: '22px 60px' }}>
                  <circle cx="22" cy="60" r="13" fill="#0f172a" stroke="#334155" strokeWidth="2.5" />
                  <circle cx="22" cy="60" r="10" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="22" y1="47" x2="22" y2="73" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="9" y1="60" x2="35" y2="60" stroke="#e2e8f0" strokeWidth="1" />
                  <circle cx="22" cy="60" r="3" fill="#e11d48" />
                </g>

                <g className="cyclist-wheel" style={{ transformOrigin: '76px 60px' }}>
                  <circle cx="76" cy="60" r="13" fill="#0f172a" stroke="#334155" strokeWidth="2.5" />
                  <circle cx="76" cy="60" r="10" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="76" y1="47" x2="76" y2="73" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="63" y1="60" x2="89" y2="60" stroke="#e2e8f0" strokeWidth="1" />
                  <circle cx="76" cy="60" r="3" fill="#e11d48" />
                </g>

                {/* Frame in Amber/Yellow */}
                <path d="M22 60 L48 60 L42 42 L22 60 Z" fill="none" stroke="#f59e0b" strokeWidth="3.2" />
                <path d="M48 60 L76 60 L68 38 L42 42" fill="none" stroke="#fbbf24" strokeWidth="3.2" />
                <line x1="68" y1="38" x2="76" y2="60" stroke="#f59e0b" strokeWidth="3.2" />
                <path d="M68 38 L66 31 L71 30" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="42" y1="42" x2="40" y2="36" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M35 36 C35 36 44 34 46 36 Z" fill="#020617" />

                {/* Cyclist Rider */}
                <circle cx="56" cy="18" r="6" fill="#fbcfe8" />
                <path d="M50 18 C50 11 63 11 65 17 L67 18 L50 20 Z" fill="#e11d48" />
                <path d="M42 36 L52 24 L66 32" fill="none" stroke="#059669" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Legs pedaling */}
                <g className="cyclist-pedal-legs-reverse" style={{ transformOrigin: '48px 60px' }}>
                  <path d="M44 36 L48 48 L52 60" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                  <rect x="50" y="58" width="5" height="2.5" rx="1" fill="#0f172a" />
                </g>
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PEDESTRIAN 1: Walking across the crosswalk (Left to Right) */}
          {/* ========================================================================= */}
          <div 
            className="actor-pedestrian-cross absolute pointer-events-auto cursor-pointer z-30"
            style={{ top: '80%' }}
            onMouseEnter={() => setHoveredActor('peaton-1')}
            onMouseLeave={() => setHoveredActor(null)}
          >
            {/* Tooltip */}
            {hoveredActor === 'peaton-1' && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl border border-blue-400/40 z-40 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>Peatón en Paso de Cebra • Prioridad de Cruce</span>
              </div>
            )}

            <div className="relative w-9 h-16 sm:w-11 sm:h-20 drop-shadow-[0_6px_4px_rgba(0,0,0,0.6)]">
              {/* Soft Pedestrian Shadow */}
              <div className="absolute bottom-0 left-1 right-1 h-2 bg-black/45 rounded-full blur-[1.5px]" />

              <svg viewBox="0 0 40 75" className="w-full h-full overflow-visible">
                {/* Head */}
                <circle cx="20" cy="11" r="6" fill="#fed7aa" />
                {/* Hair/Cap */}
                <path d="M14 10 C14 5 26 5 26 10 L28 11 L14 11 Z" fill="#0284c7" />

                {/* Torso & Jacket (Navy Blue) */}
                <path d="M15 18 L25 18 L26 38 L14 38 Z" fill="#1e3a8a" rx="2" />
                {/* Yellow Safety Accent or Scarf */}
                <path d="M17 18 L23 18 L22 24 L18 24 Z" fill="#facc15" />

                {/* Left Arm (Alternating swing) */}
                <g className="ped-arm-left" style={{ transformOrigin: '16px 20px' }}>
                  <path d="M16 20 L12 32 L10 36" fill="none" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="10" cy="36" r="2" fill="#fed7aa" />
                </g>

                {/* Right Arm (Opposite swing) */}
                <g className="ped-arm-right" style={{ transformOrigin: '24px 20px' }}>
                  <path d="M24 20 L28 31 L31 35" fill="none" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="31" cy="35" r="2" fill="#fed7aa" />
                  {/* Smartphone in hand */}
                  <rect x="29" y="33" width="3" height="5" rx="0.5" fill="#0f172a" />
                </g>

                {/* Left Leg (Walking swing) */}
                <g className="ped-leg-left" style={{ transformOrigin: '17px 38px' }}>
                  <path d="M17 38 L15 54 L11 70" fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                  {/* Shoe */}
                  <path d="M11 70 L6 71 L11 73 Z" fill="#0f172a" />
                </g>

                {/* Right Leg (Walking swing) */}
                <g className="ped-leg-right" style={{ transformOrigin: '23px 38px' }}>
                  <path d="M23 38 L25 53 L29 70" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                  {/* Shoe */}
                  <path d="M29 70 L34 71 L29 73 Z" fill="#0f172a" />
                </g>
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PEDESTRIAN 2: Walking opposite direction (Right to Left on Sidewalk) */}
          {/* ========================================================================= */}
          <div 
            className="actor-pedestrian-return absolute pointer-events-auto cursor-pointer z-20"
            style={{ top: '84%' }}
            onMouseEnter={() => setHoveredActor('peaton-2')}
            onMouseLeave={() => setHoveredActor(null)}
          >
            {/* Tooltip */}
            {hoveredActor === 'peaton-2' && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl border border-purple-400/40 z-40 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>Ciudadana Caminando • Acera Segura</span>
              </div>
            )}

            <div className="relative w-8 h-15 sm:w-10 sm:h-18 drop-shadow-[0_5px_4px_rgba(0,0,0,0.55)] transform scale-x-[-1]">
              <div className="absolute bottom-0 left-1 right-1 h-1.5 bg-black/40 rounded-full blur-[1.5px]" />

              <svg viewBox="0 0 40 75" className="w-full h-full overflow-visible">
                {/* Head */}
                <circle cx="20" cy="11" r="5.5" fill="#fed7aa" />
                {/* Long Hair */}
                <path d="M14 10 C14 5 26 5 26 13 L27 22 L22 22 L14 14 Z" fill="#92400e" />

                {/* Torso & Coat (Emerald Green) */}
                <path d="M15 18 L25 18 L27 40 L13 40 Z" fill="#059669" rx="2" />
                {/* Crossbody Bag */}
                <line x1="16" y1="18" x2="26" y2="35" stroke="#78350f" strokeWidth="1.5" />
                <rect x="23" y="32" width="6" height="7" rx="1.5" fill="#78350f" />

                {/* Arms */}
                <g className="ped-arm-left" style={{ transformOrigin: '16px 20px' }}>
                  <path d="M16 20 L13 32 L11 36" fill="none" stroke="#047857" strokeWidth="2.8" strokeLinecap="round" />
                  <circle cx="11" cy="36" r="1.8" fill="#fed7aa" />
                </g>

                <g className="ped-arm-right" style={{ transformOrigin: '24px 20px' }}>
                  <path d="M24 20 L27 30 L29 35" fill="none" stroke="#047857" strokeWidth="2.8" strokeLinecap="round" />
                  <circle cx="29" cy="35" r="1.8" fill="#fed7aa" />
                </g>

                {/* Legs */}
                <g className="ped-leg-left" style={{ transformOrigin: '17px 40px' }}>
                  <path d="M17 40 L15 54 L11 69" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M11 69 L6 70 L11 72 Z" fill="#ffffff" />
                </g>

                <g className="ped-leg-right" style={{ transformOrigin: '23px 40px' }}>
                  <path d="M23 40 L25 53 L28 69" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M28 69 L33 70 L28 72 Z" fill="#ffffff" />
                </g>
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PEDESTRIAN 3: Runner / Jogger on the inner sidewalk (Left to Right) */}
          {/* ========================================================================= */}
          <div 
            className="actor-pedestrian-jogger absolute pointer-events-auto cursor-pointer z-20"
            style={{ top: '75%' }}
            onMouseEnter={() => setHoveredActor('peaton-3')}
            onMouseLeave={() => setHoveredActor(null)}
          >
            {hoveredActor === 'peaton-3' && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl border border-teal-400/40 z-40 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>Deportista / Corredor • Vía Activa</span>
              </div>
            )}

            <div className="relative w-8 h-14 sm:w-10 sm:h-17 drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)]">
              <div className="absolute bottom-0 left-1 right-1 h-1 bg-black/40 rounded-full blur-[1px]" />
              <svg viewBox="0 0 40 75" className="w-full h-full overflow-visible">
                <circle cx="21" cy="11" r="5" fill="#fbcfe8" />
                {/* Athletic Visor/Hat */}
                <path d="M15 10 C15 6 27 6 27 10 L29 11 L15 11 Z" fill="#ec4899" />
                {/* Sports Shirt (Coral/Pink) */}
                <path d="M16 17 L26 17 L25 36 L15 36 Z" fill="#f43f5e" rx="1.5" />
                
                {/* Running Arms (Bent 90 deg) */}
                <g className="ped-run-arm-left" style={{ transformOrigin: '17px 18px' }}>
                  <path d="M17 18 L11 26 L17 29" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <g className="ped-run-arm-right" style={{ transformOrigin: '24px 18px' }}>
                  <path d="M24 18 L30 25 L25 30" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* Running Legs */}
                <g className="ped-run-leg-left" style={{ transformOrigin: '17px 36px' }}>
                  <path d="M17 36 L11 48 L18 64" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="18" cy="65" r="2" fill="#38bdf8" />
                </g>
                <g className="ped-run-leg-right" style={{ transformOrigin: '24px 36px' }}>
                  <path d="M24 36 L31 46 L26 64" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="26" cy="65" r="2" fill="#38bdf8" />
                </g>
              </svg>
            </div>
          </div>

        </div>

        {/* 4. Top Overlay: Live Simulation Status & Quick Controls */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2 z-40 pointer-events-auto">
          {/* Live Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white shadow-lg text-xs font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </span>
            <span className="tracking-wide">
              {isPlaying ? 'Movilidad Activa en Vivo' : 'Simulación Pausada'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md px-2 py-1 rounded-2xl border border-white/20 shadow-lg">
            {/* Toggle Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pausar movimiento de ciclistas y peatones' : 'Reanudar movimiento'}
              className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4 text-emerald-300" />}
            </button>

            {/* Toggle Speed */}
            <button
              onClick={() => setSpeedMultiplier(speedMultiplier === 1 ? 1.5 : 1)}
              title="Ajustar velocidad del flujo"
              className="px-2 py-1 rounded-xl text-[11px] font-bold text-white hover:bg-white/20 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Zap className={`w-3.5 h-3.5 ${speedMultiplier === 1.5 ? 'text-amber-400' : 'text-slate-300'}`} />
              <span>{speedMultiplier}x</span>
            </button>

            {/* Toggle Sensors */}
            <button
              onClick={() => setShowSensors(!showSensors)}
              title={showSensors ? 'Ocultar sensores y carriles IoT' : 'Mostrar sensores y carriles IoT'}
              className={`p-1.5 rounded-xl text-white transition-colors cursor-pointer ${showSensors ? 'bg-blue-600/60 text-blue-200' : 'hover:bg-white/20 text-slate-300'}`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. Bottom Overlay: Real-Time Traffic & Safety Telemetry Pill */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-30">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-white shadow-lg text-[11px] flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Prioridad al Peatón y Ciclista
            </span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-500" />
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              Flujo Seguro Monitoreado
            </span>
          </div>
        </div>

      </div>

      {/* Embedded CSS Keyframes for Buttery 60fps Motion */}
      <style>{`
        /* --- HORIZONTAL ACTOR TRANSLATIONS (100% Responsive to Card Container) --- */

        /* Cyclist 1: Left to Right across bike lane (~10s normal, ~6.5s fast) */
        @keyframes moveCyclistEast {
          0% {
            left: -18%;
          }
          100% {
            left: 112%;
          }
        }

        /* Cyclist 2: Right to Left (~13s normal, ~8.5s fast) */
        @keyframes moveCyclistWest {
          0% {
            left: 112%;
          }
          100% {
            left: -18%;
          }
        }

        /* Pedestrian 1: Crossing zebra Left to Right (~16s) */
        @keyframes movePedestrianCross {
          0% {
            left: -12%;
          }
          100% {
            left: 110%;
          }
        }

        /* Pedestrian 2: Sidewalk Right to Left (~19s) */
        @keyframes movePedestrianReturn {
          0% {
            left: 110%;
          }
          100% {
            left: -12%;
          }
        }

        /* Pedestrian 3 (Jogger): Left to Right (~12s) */
        @keyframes movePedestrianJogger {
          0% {
            left: -15%;
          }
          100% {
            left: 112%;
          }
        }

        /* --- ACTOR CLASS BINDINGS --- */
        .actor-cyclist-east {
          animation: moveCyclistEast 10s linear infinite;
        }
        .actor-cyclist-west {
          animation: moveCyclistWest 13s linear infinite;
        }
        .actor-pedestrian-cross {
          animation: movePedestrianCross 16s linear infinite;
        }
        .actor-pedestrian-return {
          animation: movePedestrianReturn 19s linear infinite;
        }
        .actor-pedestrian-jogger {
          animation: movePedestrianJogger 12s linear infinite;
        }

        /* Fast Speed Modifier */
        .speed-fast .actor-cyclist-east {
          animation-duration: 6.5s;
        }
        .speed-fast .actor-cyclist-west {
          animation-duration: 8.5s;
        }
        .speed-fast .actor-pedestrian-cross {
          animation-duration: 10.5s;
        }
        .speed-fast .actor-pedestrian-return {
          animation-duration: 12.5s;
        }
        .speed-fast .actor-pedestrian-jogger {
          animation-duration: 8s;
        }

        /* Pause State */
        .animation-paused .actor-cyclist-east,
        .animation-paused .actor-cyclist-west,
        .animation-paused .actor-pedestrian-cross,
        .animation-paused .actor-pedestrian-return,
        .animation-paused .actor-pedestrian-jogger,
        .animation-paused .cyclist-wheel,
        .animation-paused .cyclist-pedal-legs,
        .animation-paused .cyclist-pedal-legs-reverse,
        .animation-paused .ped-leg-left,
        .animation-paused .ped-leg-right,
        .animation-paused .ped-arm-left,
        .animation-paused .ped-arm-right,
        .animation-paused .ped-run-leg-left,
        .animation-paused .ped-run-leg-right {
          animation-play-state: paused !important;
        }

        /* --- INTERNAL MECHANICAL ANIMATIONS (Wheels, Pedaling, Walking) --- */

        /* Bike Wheels Rotating */
        @keyframes spinWheel {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .cyclist-wheel {
          animation: spinWheel 0.6s linear infinite;
        }

        /* Cyclist Leg Pedaling (Articulated Up and Down / Rotation) */
        @keyframes pedalCycle {
          0% { transform: rotate(0deg) translateY(0px); }
          25% { transform: rotate(15deg) translateY(-2px); }
          50% { transform: rotate(0deg) translateY(2px); }
          75% { transform: rotate(-15deg) translateY(-1px); }
          100% { transform: rotate(0deg) translateY(0px); }
        }
        .cyclist-pedal-legs {
          animation: pedalCycle 0.6s ease-in-out infinite;
        }
        .cyclist-pedal-legs-reverse {
          animation: pedalCycle 0.5s ease-in-out infinite reverse;
        }

        /* Pedestrian Walking Leg Alternations */
        @keyframes pedWalkLegLeft {
          0% { transform: rotate(20deg); }
          50% { transform: rotate(-20deg); }
          100% { transform: rotate(20deg); }
        }
        @keyframes pedWalkLegRight {
          0% { transform: rotate(-20deg); }
          50% { transform: rotate(20deg); }
          100% { transform: rotate(-20deg); }
        }
        .ped-leg-left {
          animation: pedWalkLegLeft 0.8s ease-in-out infinite;
        }
        .ped-leg-right {
          animation: pedWalkLegRight 0.8s ease-in-out infinite;
        }

        /* Pedestrian Arm Alternations */
        @keyframes pedArmSwingLeft {
          0% { transform: rotate(-18deg); }
          50% { transform: rotate(18deg); }
          100% { transform: rotate(-18deg); }
        }
        @keyframes pedArmSwingRight {
          0% { transform: rotate(18deg); }
          50% { transform: rotate(-18deg); }
          100% { transform: rotate(18deg); }
        }
        .ped-arm-left {
          animation: pedArmSwingLeft 0.8s ease-in-out infinite;
        }
        .ped-arm-right {
          animation: pedArmSwingRight 0.8s ease-in-out infinite;
        }

        /* Jogger Fast Cycles */
        @keyframes jogLegLeft {
          0% { transform: rotate(32deg) translateY(-2px); }
          50% { transform: rotate(-32deg) translateY(2px); }
          100% { transform: rotate(32deg) translateY(-2px); }
        }
        @keyframes jogLegRight {
          0% { transform: rotate(-32deg) translateY(2px); }
          50% { transform: rotate(32deg) translateY(-2px); }
          100% { transform: rotate(-32deg) translateY(2px); }
        }
        .ped-run-leg-left {
          animation: jogLegLeft 0.45s ease-in-out infinite;
        }
        .ped-run-leg-right {
          animation: jogLegRight 0.45s ease-in-out infinite;
        }
        .ped-run-arm-left {
          animation: pedArmSwingLeft 0.45s ease-in-out infinite;
        }
        .ped-run-arm-right {
          animation: pedArmSwingRight 0.45s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
