import React, { useState } from 'react';
import { ShieldCheck, Activity, Eye, Play, Pause, Zap, Crosshair } from 'lucide-react';
import intersectionImg from '../assets/images/urban_mobility_intersection_1788442809042.jpg';

interface AnimatedUrbanMobilityProps {
  className?: string;
}

export const AnimatedUrbanMobility: React.FC<AnimatedUrbanMobilityProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 1.5>(1);
  const [showAiTracking, setShowAiTracking] = useState(true);
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);

  const speedClass = speedMultiplier === 1.5 ? 'speed-fast' : 'speed-normal';

  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-950 group select-none ${className}`}>
      
      {/* 1. Base Image Container with Cinematic Camera Drift */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={intersectionImg}
          alt="Intersección urbana inteligente y conectada VIANOVA"
          className={`w-full h-full object-cover transition-transform duration-1000 ${
            isPlaying ? 'scale-105 animate-[cinematicPan_28s_ease-in-out_infinite_alternate]' : 'scale-100'
          }`}
        />

        {/* Ambient realistic lighting & depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-slate-950/25 pointer-events-none" />

        {/* 2. Smart City IoT Virtual Lanes (Subtle HUD Grid) */}
        {showAiTracking && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-300">
            {/* Protected Bike Lane HUD Path */}
            <div className="absolute left-0 right-0 top-[66%] h-[14%] bg-emerald-500/10 border-y border-emerald-400/30 backdrop-blur-[0.5px]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(16,185,129,0.18)_50%,transparent_100%)] animate-pulse" />
              <div className="absolute right-4 top-1 text-[9px] font-mono font-bold text-emerald-300 bg-emerald-950/85 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                CICLORRUTA SEGURA • SENSOR ACTIVO
              </div>
            </div>

            {/* Pedestrian Crossing HUD Path */}
            <div className="absolute left-0 right-0 top-[78%] h-[15%] bg-blue-500/10 border-y border-blue-400/25">
              <div className="absolute left-4 bottom-1 text-[9px] font-mono font-bold text-blue-300 bg-blue-950/85 px-2 py-0.5 rounded border border-blue-500/40 flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                PASO PEATONAL INTELIGENTE
              </div>
            </div>
          </div>
        )}

        {/* 3. REALISTIC PEOPLE & CYCLISTS LAYER (NO CARTOONS - REALISTIC HUMAN & BICYCLE ANATOMY) */}
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${!isPlaying ? 'motion-paused' : ''} ${speedClass}`}>

          {/* ========================================================================= */}
          {/* REALISTIC CYCLIST 1 (EASTBOUND): Riding along the green bike lane */}
          {/* ========================================================================= */}
          <div 
            className="cyclist-realistic-east absolute pointer-events-auto cursor-pointer z-20"
            style={{ top: '66%' }}
            onMouseEnter={() => setHoveredEntity('cyclist-1')}
            onMouseLeave={() => setHoveredEntity(null)}
          >
            {/* AI Vision Tracking Bounding Box */}
            {showAiTracking && (
              <div className="absolute -inset-1.5 border border-emerald-400/70 rounded-md pointer-events-none">
                <div className="absolute -top-4 left-0 bg-emerald-950/90 text-emerald-300 border border-emerald-400/50 px-1.5 py-0.2 text-[8px] font-mono font-bold rounded flex items-center gap-1 whitespace-nowrap shadow-md">
                  <Crosshair className="w-2.5 h-2.5 text-emerald-400" />
                  <span>CICLISTA #01 • 19.4 km/h</span>
                </div>
                {/* Corner reticles */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-emerald-400" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-emerald-400" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-emerald-400" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-emerald-400" />
              </div>
            )}

            {/* Hover Tooltip */}
            {hoveredEntity === 'cyclist-1' && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-2xl border border-emerald-400/60 z-40 flex items-center gap-1.5 animate-in fade-in zoom-in-95 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ciclista Urbano • Vía Segura Protegida</span>
              </div>
            )}

            {/* Anatomically Realistic Commuter Bicycle & Rider */}
            <div className="relative w-24 h-18 sm:w-28 sm:h-21">
              {/* Realistic Ground Asphalt Shadow (matches sunlight angle) */}
              <div className="absolute bottom-0 left-2 right-1 h-2 bg-slate-950/70 rounded-full blur-[2px] transform -skew-x-12" />

              <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
                <defs>
                  {/* Subtle Metallic Gradient for Bike Frame */}
                  <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="50%" stopColor="#0369a1" />
                    <stop offset="100%" stopColor="#075985" />
                  </linearGradient>
                  {/* Wheel Rim Gradient */}
                  <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#64748b" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                </defs>

                {/* Back Wheel (Spinning realistic spokes) */}
                <g className="wheel-spin" style={{ transformOrigin: '28px 65px' }}>
                  <circle cx="28" cy="65" r="16" fill="none" stroke="#0f172a" strokeWidth="3.2" />
                  <circle cx="28" cy="65" r="14" fill="none" stroke="url(#rimGrad)" strokeWidth="1.2" />
                  {/* Fine realistic spokes */}
                  <line x1="28" y1="51" x2="28" y2="79" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.85" />
                  <line x1="14" y1="65" x2="42" y2="65" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.85" />
                  <line x1="18" y1="55" x2="38" y2="75" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.85" />
                  <line x1="18" y1="75" x2="38" y2="55" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.85" />
                  <circle cx="28" cy="65" r="3" fill="#0f172a" />
                  <circle cx="28" cy="65" r="1.5" fill="#38bdf8" />
                </g>

                {/* Front Wheel (Spinning realistic spokes) */}
                <g className="wheel-spin" style={{ transformOrigin: '88px 65px' }}>
                  <circle cx="88" cy="65" r="16" fill="none" stroke="#0f172a" strokeWidth="3.2" />
                  <circle cx="88" cy="65" r="14" fill="none" stroke="url(#rimGrad)" strokeWidth="1.2" />
                  <line x1="88" y1="51" x2="88" y2="79" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.85" />
                  <line x1="74" y1="65" x2="102" y2="65" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.85" />
                  <line x1="78" y1="55" x2="98" y2="75" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.85" />
                  <line x1="78" y1="75" x2="98" y2="55" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.85" />
                  <circle cx="88" cy="65" r="3" fill="#0f172a" />
                  <circle cx="88" cy="65" r="1.5" fill="#38bdf8" />
                </g>

                {/* Realistic Diamond Frame Geometry */}
                {/* Chainstay & Seatstay */}
                <line x1="28" y1="65" x2="54" y2="65" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="28" y1="65" x2="48" y2="44" stroke="url(#frameGrad)" strokeWidth="2.8" strokeLinecap="round" />
                {/* Seat tube */}
                <line x1="54" y1="65" x2="48" y2="44" stroke="url(#frameGrad)" strokeWidth="3.2" strokeLinecap="round" />
                {/* Down tube */}
                <line x1="54" y1="65" x2="78" y2="40" stroke="url(#frameGrad)" strokeWidth="3.5" strokeLinecap="round" />
                {/* Top tube */}
                <line x1="48" y1="44" x2="78" y2="40" stroke="url(#frameGrad)" strokeWidth="3" strokeLinecap="round" />
                {/* Front Fork */}
                <line x1="78" y1="40" x2="88" y2="65" stroke="url(#frameGrad)" strokeWidth="3" strokeLinecap="round" />
                
                {/* Stem & Handlebar */}
                <line x1="78" y1="40" x2="76" y2="33" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M74 33 L82 32 L84 35" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Seatpost & Ergonomic Saddle */}
                <line x1="48" y1="44" x2="46" y2="36" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M40 36 C40 36 50 34 53 36 C54 37 51 38 48 38 Z" fill="#0f172a" />

                {/* Front LED Safety Light & Beam */}
                <circle cx="83" cy="33" r="2" fill="#ffffff" />
                <polygon points="85,33 115,28 115,40" fill="rgba(255,255,255,0.18)" />
                {/* Rear Safety Blinker */}
                <circle cx="41" cy="38" r="1.5" fill="#ef4444" className="animate-pulse" />

                {/* Realistic Human Cyclist (Anatomical Posture, Commuter Apparel) */}
                {/* Head & Aerodynamic Helmet */}
                <circle cx="62" cy="19" r="6" fill="#e2e8f0" />
                {/* Urban Safety Helmet */}
                <path d="M56 18 C56 11 69 11 72 17 L75 19 L56 20 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="0.8" />
                {/* Sunglasses / Visor */}
                <path d="M67 18 L73 18 L71 21 L66 21 Z" fill="#0f172a" />

                {/* Torso: Realistic Fitted Jacket & Natural Forward Lean */}
                <path d="M49 36 L60 23 L75 32" fill="none" stroke="#1e293b" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Commuter Backpack */}
                <rect x="49" y="22" width="7" height="11" rx="2.5" fill="#0f172a" transform="rotate(-15 49 22)" />

                {/* Realistic Arms & Gripping Hands */}
                <path d="M60 24 L72 30 L80 33" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Natural Pedaling Legs (Synchronized with Pedals) */}
                <g className="realistic-pedal-leg" style={{ transformOrigin: '54px 65px' }}>
                  {/* Thigh & Calf */}
                  <path d="M50 37 L56 50 L58 64" fill="none" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Commuter Shoe */}
                  <path d="M58 64 L65 65 L61 67 Z" fill="#0f172a" />
                </g>
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* REALISTIC CYCLIST 2 (WESTBOUND): Riding opposite direction on buffer track */}
          {/* ========================================================================= */}
          <div 
            className="cyclist-realistic-west absolute pointer-events-auto cursor-pointer z-10"
            style={{ top: '61%' }}
            onMouseEnter={() => setHoveredEntity('cyclist-2')}
            onMouseLeave={() => setHoveredEntity(null)}
          >
            {showAiTracking && (
              <div className="absolute -inset-1 border border-teal-400/60 rounded-md pointer-events-none">
                <div className="absolute -top-4 left-0 bg-teal-950/90 text-teal-300 border border-teal-400/50 px-1.5 py-0.2 text-[8px] font-mono font-bold rounded flex items-center gap-1 whitespace-nowrap shadow-md">
                  <Crosshair className="w-2.5 h-2.5 text-teal-400" />
                  <span>CICLISTA #02 • 21.8 km/h</span>
                </div>
              </div>
            )}

            {hoveredEntity === 'cyclist-2' && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-2xl border border-teal-400/60 z-40 flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>Ciclista de Retorno • Vía Exclusiva</span>
              </div>
            )}

            {/* Cyclist facing Left (Scaled slightly smaller for perspective depth) */}
            <div className="relative w-20 h-16 sm:w-24 sm:h-18 transform scale-x-[-1]">
              <div className="absolute bottom-0 left-2 right-1 h-1.5 bg-slate-950/65 rounded-full blur-[2px] transform -skew-x-12" />

              <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible drop-shadow-[0_4px_5px_rgba(0,0,0,0.65)]">
                {/* Back Wheel */}
                <g className="wheel-spin" style={{ transformOrigin: '28px 65px' }}>
                  <circle cx="28" cy="65" r="15" fill="none" stroke="#0f172a" strokeWidth="3" />
                  <line x1="28" y1="52" x2="28" y2="78" stroke="#cbd5e1" strokeWidth="0.8" />
                  <line x1="15" y1="65" x2="41" y2="65" stroke="#cbd5e1" strokeWidth="0.8" />
                  <circle cx="28" cy="65" r="2.5" fill="#e2e8f0" />
                </g>
                {/* Front Wheel */}
                <g className="wheel-spin" style={{ transformOrigin: '88px 65px' }}>
                  <circle cx="88" cy="65" r="15" fill="none" stroke="#0f172a" strokeWidth="3" />
                  <line x1="88" y1="52" x2="88" y2="78" stroke="#cbd5e1" strokeWidth="0.8" />
                  <line x1="75" y1="65" x2="101" y2="65" stroke="#cbd5e1" strokeWidth="0.8" />
                  <circle cx="88" cy="65" r="2.5" fill="#e2e8f0" />
                </g>

                {/* Frame in Anthracite/Amber */}
                <line x1="28" y1="65" x2="54" y2="65" stroke="#334155" strokeWidth="2.5" />
                <line x1="28" y1="65" x2="48" y2="44" stroke="#d97706" strokeWidth="2.8" />
                <line x1="54" y1="65" x2="48" y2="44" stroke="#d97706" strokeWidth="3" />
                <line x1="54" y1="65" x2="78" y2="40" stroke="#d97706" strokeWidth="3.2" />
                <line x1="48" y1="44" x2="78" y2="40" stroke="#d97706" strokeWidth="3" />
                <line x1="78" y1="40" x2="88" y2="65" stroke="#d97706" strokeWidth="3" />
                <line x1="78" y1="40" x2="76" y2="33" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M74 33 L82 32 L84 35" fill="none" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="48" y1="44" x2="46" y2="36" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M40 36 C40 36 50 34 53 36 C54 37 51 38 48 38 Z" fill="#020617" />

                {/* Rider */}
                <circle cx="62" cy="19" r="5.5" fill="#fde047" />
                <path d="M56 18 C56 11 69 11 72 17 L75 19 L56 20 Z" fill="#059669" />
                <path d="M49 36 L60 23 L75 32" fill="none" stroke="#047857" strokeWidth="7" strokeLinecap="round" />
                <path d="M60 24 L72 30 L80 33" fill="none" stroke="#065f46" strokeWidth="2.8" strokeLinecap="round" />

                {/* Pedaling leg */}
                <g className="realistic-pedal-leg-reverse" style={{ transformOrigin: '54px 65px' }}>
                  <path d="M50 37 L56 50 L58 64" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* REALISTIC PEDESTRIAN 1 (EASTBOUND): Crossing on the zebra crosswalk */}
          {/* ========================================================================= */}
          <div 
            className="pedestrian-realistic-cross absolute pointer-events-auto cursor-pointer z-30"
            style={{ top: '78%' }}
            onMouseEnter={() => setHoveredEntity('pedestrian-1')}
            onMouseLeave={() => setHoveredEntity(null)}
          >
            {showAiTracking && (
              <div className="absolute -inset-1 border border-blue-400/70 rounded-md pointer-events-none">
                <div className="absolute -top-4 left-0 bg-blue-950/90 text-blue-300 border border-blue-400/50 px-1.5 py-0.2 text-[8px] font-mono font-bold rounded flex items-center gap-1 whitespace-nowrap shadow-md">
                  <Crosshair className="w-2.5 h-2.5 text-blue-400" />
                  <span>PEATÓN #03 • CRUCE SEGURO</span>
                </div>
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-blue-400" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-blue-400" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-blue-400" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-blue-400" />
              </div>
            )}

            {hoveredEntity === 'pedestrian-1' && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-2xl border border-blue-400/60 z-40 flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>Peatón en Paso de Cebra • Prioridad de Paso</span>
              </div>
            )}

            {/* Anatomical Pedestrian (Proportional 8-heads human silhouette) */}
            <div className="relative w-10 h-18 sm:w-12 sm:h-22 drop-shadow-[0_6px_6px_rgba(0,0,0,0.7)]">
              {/* Ground contact shadow */}
              <div className="absolute bottom-0 left-1 right-1 h-2 bg-slate-950/70 rounded-full blur-[1.5px] transform -skew-x-12" />

              <svg viewBox="0 0 50 90" className="w-full h-full overflow-visible">
                {/* Head (Proper natural proportion) */}
                <circle cx="25" cy="14" r="6" fill="#e2e8f0" />
                {/* Hair / Headwear */}
                <path d="M19 13 C19 7 31 7 31 13 L32 15 L19 15 Z" fill="#0f172a" />

                {/* Torso & Overcoat / Tailored Jacket */}
                <path d="M18 22 L32 22 L33 46 L17 46 Z" fill="#0f2b5c" rx="2" />
                {/* Lapel & Collar details */}
                <line x1="22" y1="22" x2="25" y2="34" stroke="#1d4ed8" strokeWidth="1.2" />
                <line x1="28" y1="22" x2="25" y2="34" stroke="#1d4ed8" strokeWidth="1.2" />

                {/* Natural Left Arm Swing */}
                <g className="realistic-arm-left" style={{ transformOrigin: '19px 24px' }}>
                  <path d="M19 24 L14 38 L11 44" fill="none" stroke="#0f2b5c" strokeWidth="3.2" strokeLinecap="round" />
                  <circle cx="11" cy="44" r="2" fill="#e2e8f0" />
                </g>

                {/* Natural Right Arm Swing */}
                <g className="realistic-arm-right" style={{ transformOrigin: '31px 24px' }}>
                  <path d="M31 24 L36 37 L39 43" fill="none" stroke="#0f2b5c" strokeWidth="3.2" strokeLinecap="round" />
                  <circle cx="39" cy="43" r="2" fill="#e2e8f0" />
                  {/* Commuter Tablet/Folder */}
                  <rect x="37" y="40" width="4" height="6" rx="0.8" fill="#0f172a" />
                </g>

                {/* Natural Human Left Leg Walking Stride */}
                <g className="realistic-leg-left" style={{ transformOrigin: '21px 46px' }}>
                  <path d="M21 46 L18 64 L13 83" fill="none" stroke="#1e293b" strokeWidth="4.2" strokeLinecap="round" />
                  {/* Shoe */}
                  <path d="M13 83 L7 84 L13 86 Z" fill="#0f172a" />
                </g>

                {/* Natural Human Right Leg Walking Stride */}
                <g className="realistic-leg-right" style={{ transformOrigin: '29px 46px' }}>
                  <path d="M29 46 L32 63 L37 83" fill="none" stroke="#0f172a" strokeWidth="4.2" strokeLinecap="round" />
                  {/* Shoe */}
                  <path d="M37 83 L43 84 L37 86 Z" fill="#0f172a" />
                </g>
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* REALISTIC PEDESTRIAN 2 (WESTBOUND): Citizen walking on the sidewalk */}
          {/* ========================================================================= */}
          <div 
            className="pedestrian-realistic-sidewalk absolute pointer-events-auto cursor-pointer z-20"
            style={{ top: '83%' }}
            onMouseEnter={() => setHoveredEntity('pedestrian-2')}
            onMouseLeave={() => setHoveredEntity(null)}
          >
            {showAiTracking && (
              <div className="absolute -inset-1 border border-indigo-400/60 rounded-md pointer-events-none">
                <div className="absolute -top-4 left-0 bg-indigo-950/90 text-indigo-300 border border-indigo-400/50 px-1.5 py-0.2 text-[8px] font-mono font-bold rounded flex items-center gap-1 whitespace-nowrap shadow-md">
                  <Crosshair className="w-2.5 h-2.5 text-indigo-400" />
                  <span>PEATÓN #05 • ACERA</span>
                </div>
              </div>
            )}

            {hoveredEntity === 'pedestrian-2' && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-2xl border border-indigo-400/60 z-40 flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span>Ciudadana en Acera Peatonal</span>
              </div>
            )}

            {/* Facing West (Left) */}
            <div className="relative w-9 h-17 sm:w-11 sm:h-21 drop-shadow-[0_5px_5px_rgba(0,0,0,0.65)] transform scale-x-[-1]">
              <div className="absolute bottom-0 left-1 right-1 h-1.5 bg-slate-950/65 rounded-full blur-[1.5px] transform -skew-x-12" />

              <svg viewBox="0 0 50 90" className="w-full h-full overflow-visible">
                <circle cx="25" cy="14" r="5.5" fill="#f1f5f9" />
                {/* Hair */}
                <path d="M19 13 C19 7 31 7 31 16 L32 26 L26 26 L19 17 Z" fill="#451a03" />

                {/* Overcoat */}
                <path d="M18 22 L32 22 L34 49 L16 49 Z" fill="#047857" rx="2" />
                {/* Bag strap */}
                <line x1="20" y1="22" x2="31" y2="42" stroke="#78350f" strokeWidth="1.5" />
                <rect x="28" y="38" width="6" height="7" rx="1.5" fill="#78350f" />

                {/* Arms */}
                <g className="realistic-arm-left" style={{ transformOrigin: '19px 24px' }}>
                  <path d="M19 24 L15 37 L12 43" fill="none" stroke="#047857" strokeWidth="2.8" strokeLinecap="round" />
                  <circle cx="12" cy="43" r="1.8" fill="#f1f5f9" />
                </g>
                <g className="realistic-arm-right" style={{ transformOrigin: '31px 24px' }}>
                  <path d="M31 24 L35 36 L38 42" fill="none" stroke="#047857" strokeWidth="2.8" strokeLinecap="round" />
                  <circle cx="38" cy="42" r="1.8" fill="#f1f5f9" />
                </g>

                {/* Legs */}
                <g className="realistic-leg-left" style={{ transformOrigin: '21px 49px' }}>
                  <path d="M21 49 L18 65 L13 83" fill="none" stroke="#1e293b" strokeWidth="3.8" strokeLinecap="round" />
                  <path d="M13 83 L7 84 L13 85 Z" fill="#0f172a" />
                </g>
                <g className="realistic-leg-right" style={{ transformOrigin: '29px 49px' }}>
                  <path d="M29 49 L32 65 L36 83" fill="none" stroke="#0f172a" strokeWidth="3.8" strokeLinecap="round" />
                  <path d="M36 83 L42 84 L36 85 Z" fill="#0f172a" />
                </g>
              </svg>
            </div>
          </div>

        </div>

        {/* 4. Top Overlay: Live Status & Simulation Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-30 pointer-events-auto">
          {/* Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-white shadow-xl text-xs font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </span>
            <span className="tracking-wide">
              {isPlaying ? 'Movilidad Activa en Tiempo Real' : 'Simulación Pausada'}
            </span>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-2xl border border-white/20 shadow-xl">
            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pausar simulación' : 'Reanudar movimiento'}
              className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4 text-emerald-300" />}
            </button>

            {/* Speed Multiplier */}
            <button
              onClick={() => setSpeedMultiplier(speedMultiplier === 1 ? 1.5 : 1)}
              title="Ajustar velocidad del flujo"
              className="px-2 py-1 rounded-xl text-[11px] font-bold text-white hover:bg-white/20 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Zap className={`w-3.5 h-3.5 ${speedMultiplier === 1.5 ? 'text-amber-400' : 'text-slate-300'}`} />
              <span>{speedMultiplier}x</span>
            </button>

            {/* AI Vision Tracking Toggle */}
            <button
              onClick={() => setShowAiTracking(!showAiTracking)}
              title={showAiTracking ? 'Ocultar recuadros de detección IA' : 'Mostrar recuadros de detección IA'}
              className={`p-1.5 rounded-xl text-white transition-colors cursor-pointer ${
                showAiTracking ? 'bg-blue-600/70 text-blue-200' : 'hover:bg-white/20 text-slate-300'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. Bottom Overlay: Real-Time Telemetry & Safety Status */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-30">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white shadow-lg text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Prioridad al Peatón y Ciclista</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white shadow-lg text-xs flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span>Detección y Flujo Vial Seguro</span>
          </div>
        </div>

      </div>

      {/* Embedded CSS Keyframes for Photorealistic Smooth Motion */}
      <style>{`
        /* Cinematic Background Camera Drift */
        @keyframes cinematicPan {
          0% {
            transform: scale(1.04) translate(0px, 0px);
          }
          50% {
            transform: scale(1.08) translate(-6px, -4px);
          }
          100% {
            transform: scale(1.05) translate(4px, -2px);
          }
        }

        /* --- HORIZONTAL ACTOR TRANSLATIONS (Percentage coordinates relative to container) --- */

        /* Cyclist 1: Left to Right across bike lane (~10s normal, ~6.5s fast) */
        @keyframes moveRealisticCyclistEast {
          0% {
            left: -18%;
          }
          100% {
            left: 112%;
          }
        }

        /* Cyclist 2: Right to Left (~13s normal, ~8.5s fast) */
        @keyframes moveRealisticCyclistWest {
          0% {
            left: 112%;
          }
          100% {
            left: -18%;
          }
        }

        /* Pedestrian 1: Crossing zebra Left to Right (~16s normal, ~10.5s fast) */
        @keyframes moveRealisticPedestrianCross {
          0% {
            left: -14%;
          }
          100% {
            left: 110%;
          }
        }

        /* Pedestrian 2: Sidewalk Right to Left (~19s normal, ~12.5s fast) */
        @keyframes moveRealisticPedestrianSidewalk {
          0% {
            left: 110%;
          }
          100% {
            left: -14%;
          }
        }

        /* Bindings */
        .cyclist-realistic-east {
          animation: moveRealisticCyclistEast 10s linear infinite;
        }
        .cyclist-realistic-west {
          animation: moveRealisticCyclistWest 13s linear infinite;
        }
        .pedestrian-realistic-cross {
          animation: moveRealisticPedestrianCross 16s linear infinite;
        }
        .pedestrian-realistic-sidewalk {
          animation: moveRealisticPedestrianSidewalk 19s linear infinite;
        }

        /* Speed Fast Modifiers */
        .speed-fast .cyclist-realistic-east {
          animation-duration: 6.5s;
        }
        .speed-fast .cyclist-realistic-west {
          animation-duration: 8.5s;
        }
        .speed-fast .pedestrian-realistic-cross {
          animation-duration: 10.5s;
        }
        .speed-fast .pedestrian-realistic-sidewalk {
          animation-duration: 12.5s;
        }

        /* Paused State */
        .motion-paused .cyclist-realistic-east,
        .motion-paused .cyclist-realistic-west,
        .motion-paused .pedestrian-realistic-cross,
        .motion-paused .pedestrian-realistic-sidewalk,
        .motion-paused .wheel-spin,
        .motion-paused .realistic-pedal-leg,
        .motion-paused .realistic-pedal-leg-reverse,
        .motion-paused .realistic-arm-left,
        .motion-paused .realistic-arm-right,
        .motion-paused .realistic-leg-left,
        .motion-paused .realistic-leg-right {
          animation-play-state: paused !important;
        }

        /* --- NATURAL GAIT & BIKE ROTATION ANIMATIONS --- */

        /* Bicycle Wheels Spin */
        @keyframes wheelSpinAnim {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .wheel-spin {
          animation: wheelSpinAnim 0.65s linear infinite;
        }

        /* Natural Pedaling Cadence */
        @keyframes pedalCadence {
          0% { transform: rotate(0deg) translateY(0px); }
          25% { transform: rotate(14deg) translateY(-2px); }
          50% { transform: rotate(0deg) translateY(2px); }
          75% { transform: rotate(-14deg) translateY(-1px); }
          100% { transform: rotate(0deg) translateY(0px); }
        }
        .realistic-pedal-leg {
          animation: pedalCadence 0.65s ease-in-out infinite;
        }
        .realistic-pedal-leg-reverse {
          animation: pedalCadence 0.55s ease-in-out infinite reverse;
        }

        /* Natural Human Walking Leg Strides */
        @keyframes realisticWalkLegLeft {
          0% { transform: rotate(22deg); }
          50% { transform: rotate(-22deg); }
          100% { transform: rotate(22deg); }
        }
        @keyframes realisticWalkLegRight {
          0% { transform: rotate(-22deg); }
          50% { transform: rotate(22deg); }
          100% { transform: rotate(-22deg); }
        }
        .realistic-leg-left {
          animation: realisticWalkLegLeft 0.88s ease-in-out infinite;
        }
        .realistic-leg-right {
          animation: realisticWalkLegRight 0.88s ease-in-out infinite;
        }

        /* Natural Human Arm Swings */
        @keyframes realisticArmSwingLeft {
          0% { transform: rotate(-16deg); }
          50% { transform: rotate(16deg); }
          100% { transform: rotate(-16deg); }
        }
        @keyframes realisticArmSwingRight {
          0% { transform: rotate(16deg); }
          50% { transform: rotate(-16deg); }
          100% { transform: rotate(16deg); }
        }
        .realistic-arm-left {
          animation: realisticArmSwingLeft 0.88s ease-in-out infinite;
        }
        .realistic-arm-right {
          animation: realisticArmSwingRight 0.88s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
