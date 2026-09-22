import React, { useState } from 'react';
import { ShieldCheck, Play, Pause, Zap, Activity } from 'lucide-react';
import smartCityHeroImg from '../assets/images/vianova_smart_city_hero_1788275485184.jpg';

interface HomeHeroPedestriansAnimationProps {
  className?: string;
}

export const HomeHeroPedestriansAnimation: React.FC<HomeHeroPedestriansAnimationProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 1.5>(1);
  const [hoveredPedestrian, setHoveredPedestrian] = useState<string | null>(null);

  const speedClass = speedMultiplier === 1.5 ? 'speed-fast' : 'speed-normal';

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

        {/* 2. ANIMATED PEOPLE / CITIZENS LAYER (PERSONAS EN MOVIMIENTO) */}
        <div className={`absolute inset-0 overflow-hidden ${!isPlaying ? 'home-animation-paused' : ''} ${speedClass}`}>

          {/* ========================================================================= */}
          {/* PERSONA 1: Citizen with backpack walking Left to Right */}
          {/* ========================================================================= */}
          <div
            className="home-pedestrian-east-1 absolute pointer-events-auto cursor-pointer z-20"
            style={{ top: '56%' }}
            onMouseEnter={() => setHoveredPedestrian('p1')}
            onMouseLeave={() => setHoveredPedestrian(null)}
          >
            {/* Tooltip */}
            {hoveredPedestrian === 'p1' && (
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl border border-blue-400/50 z-30 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>Transeúnte en cruce seguro (1.3 m/s)</span>
              </div>
            )}

            <div className="relative w-10 h-18 sm:w-12 sm:h-22 drop-shadow-[0_8px_6px_rgba(0,0,0,0.7)]">
              {/* Dynamic Ground Shadow */}
              <div className="absolute bottom-0 left-1 right-1 h-2 bg-black/50 rounded-full blur-[1.5px]" />

              <svg viewBox="0 0 40 80" className="w-full h-full overflow-visible">
                {/* Head */}
                <circle cx="20" cy="12" r="6" fill="#fbcfe8" />
                {/* Modern Haircut / Cap */}
                <path d="M14 11 C14 5 26 5 26 11 L27 12 L14 12 Z" fill="#0369a1" />

                {/* Torso: Blue Smart Jacket */}
                <path d="M14 19 L26 19 L27 41 L13 41 Z" fill="#0284c7" rx="2" />
                {/* Backpack with Straps */}
                <rect x="11" y="21" width="5" height="15" rx="2" fill="#0f172a" />
                <line x1="16" y1="21" x2="22" y2="35" stroke="#0f172a" strokeWidth="1.5" />

                {/* Left Arm (Alternating forward swing) */}
                <g className="home-arm-swing-left" style={{ transformOrigin: '16px 21px' }}>
                  <path d="M16 21 L12 34 L10 39" fill="none" stroke="#0369a1" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="10" cy="39" r="2" fill="#fbcfe8" />
                </g>

                {/* Right Arm (Alternating back swing) */}
                <g className="home-arm-swing-right" style={{ transformOrigin: '24px 21px' }}>
                  <path d="M24 21 L28 33 L30 38" fill="none" stroke="#0369a1" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="30" cy="38" r="2" fill="#fbcfe8" />
                </g>

                {/* Left Leg (Alternating step) */}
                <g className="home-leg-step-left" style={{ transformOrigin: '17px 41px' }}>
                  <path d="M17 41 L15 57 L11 74" fill="none" stroke="#1e293b" strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M11 74 L6 75 L11 77 Z" fill="#ffffff" />
                </g>

                {/* Right Leg (Alternating step) */}
                <g className="home-leg-step-right" style={{ transformOrigin: '23px 41px' }}>
                  <path d="M23 41 L25 56 L29 74" fill="none" stroke="#0f172a" strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M29 74 L34 75 L29 77 Z" fill="#ffffff" />
                </g>
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PERSONA 2: Professional woman walking Right to Left with briefcase/bag */}
          {/* ========================================================================= */}
          <div
            className="home-pedestrian-west-1 absolute pointer-events-auto cursor-pointer z-20"
            style={{ top: '58%' }}
            onMouseEnter={() => setHoveredPedestrian('p2')}
            onMouseLeave={() => setHoveredPedestrian(null)}
          >
            {hoveredPedestrian === 'p2' && (
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl border border-emerald-400/50 z-30 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ciudadana en trayecto seguro</span>
              </div>
            )}

            <div className="relative w-9 h-17 sm:w-11 sm:h-21 drop-shadow-[0_8px_6px_rgba(0,0,0,0.7)] transform scale-x-[-1]">
              <div className="absolute bottom-0 left-1 right-1 h-2 bg-black/45 rounded-full blur-[1.5px]" />

              <svg viewBox="0 0 40 80" className="w-full h-full overflow-visible">
                {/* Head */}
                <circle cx="20" cy="12" r="5.5" fill="#fed7aa" />
                {/* Hair */}
                <path d="M14 11 C14 5 26 5 26 14 L27 24 L22 24 L14 15 Z" fill="#78350f" />

                {/* Torso: Emerald Coat */}
                <path d="M15 19 L25 19 L27 43 L13 43 Z" fill="#059669" rx="2" />
                {/* Bag */}
                <line x1="16" y1="19" x2="26" y2="37" stroke="#92400e" strokeWidth="1.5" />
                <rect x="23" y="34" width="7" height="8" rx="1.5" fill="#92400e" />

                {/* Arms */}
                <g className="home-arm-swing-left" style={{ transformOrigin: '16px 21px' }}>
                  <path d="M16 21 L13 33 L11 38" fill="none" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="11" cy="38" r="2" fill="#fed7aa" />
                </g>

                <g className="home-arm-swing-right" style={{ transformOrigin: '24px 21px' }}>
                  <path d="M24 21 L27 32 L29 37" fill="none" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="29" cy="37" r="2" fill="#fed7aa" />
                </g>

                {/* Legs */}
                <g className="home-leg-step-left" style={{ transformOrigin: '17px 43px' }}>
                  <path d="M17 43 L15 57 L11 73" fill="none" stroke="#1e293b" strokeWidth="3.8" strokeLinecap="round" />
                  <path d="M11 73 L6 74 L11 76 Z" fill="#0f172a" />
                </g>

                <g className="home-leg-step-right" style={{ transformOrigin: '23px 43px' }}>
                  <path d="M23 43 L25 56 L28 73" fill="none" stroke="#0f172a" strokeWidth="3.8" strokeLinecap="round" />
                  <path d="M28 73 L33 74 L28 76 Z" fill="#0f172a" />
                </g>
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PERSONA 3: Young pedestrian with hoodie walking Left to Right */}
          {/* ========================================================================= */}
          <div
            className="home-pedestrian-east-2 absolute pointer-events-auto cursor-pointer z-10"
            style={{ top: '54%' }}
            onMouseEnter={() => setHoveredPedestrian('p3')}
            onMouseLeave={() => setHoveredPedestrian(null)}
          >
            {hoveredPedestrian === 'p3' && (
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl border border-amber-400/50 z-30 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Estudiante caminando por acera segura</span>
              </div>
            )}

            <div className="relative w-8 h-16 sm:w-10 sm:h-20 drop-shadow-[0_6px_5px_rgba(0,0,0,0.65)]">
              <div className="absolute bottom-0 left-1 right-1 h-1.5 bg-black/40 rounded-full blur-[1.5px]" />

              <svg viewBox="0 0 40 80" className="w-full h-full overflow-visible">
                <circle cx="20" cy="12" r="5.5" fill="#fde047" />
                {/* Amber/Orange Hoodie */}
                <path d="M13 14 C13 7 27 7 27 14 L28 20 L12 20 Z" fill="#f59e0b" />
                <path d="M14 20 L26 20 L26 40 L14 40 Z" fill="#f59e0b" rx="2" />

                {/* Arms */}
                <g className="home-arm-swing-left" style={{ transformOrigin: '16px 22px' }}>
                  <path d="M16 22 L12 34 L10 38" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="10" cy="38" r="2" fill="#fde047" />
                </g>
                <g className="home-arm-swing-right" style={{ transformOrigin: '24px 22px' }}>
                  <path d="M24 22 L27 33 L29 37" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="29" cy="37" r="2" fill="#fde047" />
                </g>

                {/* Jeans & Sneakers */}
                <g className="home-leg-step-left" style={{ transformOrigin: '17px 40px' }}>
                  <path d="M17 40 L15 56 L12 72" fill="none" stroke="#1d4ed8" strokeWidth="3.6" strokeLinecap="round" />
                  <circle cx="12" cy="73" r="2" fill="#ffffff" />
                </g>
                <g className="home-leg-step-right" style={{ transformOrigin: '23px 40px' }}>
                  <path d="M23 40 L25 55 L28 72" fill="none" stroke="#1e40af" strokeWidth="3.6" strokeLinecap="round" />
                  <circle cx="28" cy="73" r="2" fill="#ffffff" />
                </g>
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PERSONA 4: Person walking with friendly pet dog across sidewalk (Right to Left) */}
          {/* ========================================================================= */}
          <div
            className="home-pedestrian-west-2 absolute pointer-events-auto cursor-pointer z-20"
            style={{ top: '61%' }}
            onMouseEnter={() => setHoveredPedestrian('p4')}
            onMouseLeave={() => setHoveredPedestrian(null)}
          >
            {hoveredPedestrian === 'p4' && (
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl border border-teal-400/50 z-30 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>Paseo seguro en andén peatonal</span>
              </div>
            )}

            <div className="relative w-18 h-18 sm:w-22 sm:h-22 drop-shadow-[0_8px_6px_rgba(0,0,0,0.65)] transform scale-x-[-1]">
              <div className="absolute bottom-0 left-2 right-6 h-2 bg-black/45 rounded-full blur-[1.5px]" />

              <svg viewBox="0 0 70 80" className="w-full h-full overflow-visible">
                {/* Pedestrian */}
                <circle cx="20" cy="12" r="5.5" fill="#fed7aa" />
                <path d="M14 11 C14 6 26 6 26 11 L27 12 L14 12 Z" fill="#9333ea" />
                <path d="M14 19 L26 19 L26 41 L14 41 Z" fill="#7e22ce" rx="2" />

                {/* Arm holding leash extending forward to dog */}
                <g className="home-arm-swing-left" style={{ transformOrigin: '16px 21px' }}>
                  <path d="M16 21 L28 29 L35 32" fill="none" stroke="#7e22ce" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="35" cy="32" r="2" fill="#fed7aa" />
                </g>
                <g className="home-arm-swing-right" style={{ transformOrigin: '24px 21px' }}>
                  <path d="M24 21 L21 33 L19 37" fill="none" stroke="#6b21a8" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* Leash line */}
                <line x1="35" y1="32" x2="48" y2="52" stroke="#e2e8f0" strokeWidth="1.2" strokeDasharray="2 1" />

                {/* Pedestrian Legs */}
                <g className="home-leg-step-left" style={{ transformOrigin: '17px 41px' }}>
                  <path d="M17 41 L15 56 L12 73" fill="none" stroke="#334155" strokeWidth="3.8" strokeLinecap="round" />
                </g>
                <g className="home-leg-step-right" style={{ transformOrigin: '23px 41px' }}>
                  <path d="M23 41 L25 55 L28 73" fill="none" stroke="#1e293b" strokeWidth="3.8" strokeLinecap="round" />
                </g>

                {/* Friendly Little Dog walking ahead */}
                <g className="home-dog-bounce" style={{ transformOrigin: '54px 60px' }}>
                  {/* Dog Body */}
                  <ellipse cx="54" cy="58" rx="8" ry="5" fill="#d97706" />
                  {/* Dog Head */}
                  <circle cx="61" cy="53" r="4.5" fill="#d97706" />
                  {/* Snout */}
                  <polygon points="63,52 67,54 63,56" fill="#b45309" />
                  {/* Ear */}
                  <path d="M58 50 C58 47 62 47 61 52 Z" fill="#92400e" />
                  {/* Tail wagging */}
                  <path d="M46 56 C43 51 45 47 47 45" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                  {/* Collar */}
                  <circle cx="58" cy="55" r="1.5" fill="#ef4444" />
                  {/* Legs */}
                  <line x1="50" y1="62" x2="49" y2="72" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                  <line x1="57" y1="62" x2="58" y2="72" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>

        </div>

        {/* 3. Top Floating Status & Control Toolbar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-40 pointer-events-auto">
          {/* Status Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white shadow-xl text-xs font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </span>
            <span className="tracking-wide">
              {isPlaying ? 'Peatones en Movimiento • Flujo Activo' : 'Simulación Pausada'}
            </span>
          </div>

          {/* Quick Play/Pause & Speed Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md px-2 py-1 rounded-2xl border border-white/20 shadow-xl">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pausar movimiento de personas' : 'Reanudar movimiento'}
              className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4 text-emerald-300" />}
            </button>

            <button
              onClick={() => setSpeedMultiplier(speedMultiplier === 1 ? 1.5 : 1)}
              title="Ajustar velocidad del flujo peatonal"
              className="px-2 py-1 rounded-xl text-[11px] font-bold text-white hover:bg-white/20 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Zap className={`w-3.5 h-3.5 ${speedMultiplier === 1.5 ? 'text-amber-400' : 'text-slate-300'}`} />
              <span>{speedMultiplier}x</span>
            </button>
          </div>
        </div>

        {/* 4. Bottom Floating Smart Badge: Exact Brand Spec Preserved */}
        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/60 z-30 pointer-events-auto">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#0057d9] text-white flex items-center justify-center shadow-md flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
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

      {/* Embedded CSS Animations */}
      <style>{`
        /* --- HORIZONTAL PEDESTRIAN TRANSLATIONS (100% Responsive to Image Container) --- */

        /* Persona 1: Left to Right across crosswalk (~15s) */
        @keyframes homePedEast1 {
          0% {
            left: -15%;
          }
          100% {
            left: 110%;
          }
        }

        /* Persona 2: Right to Left (~18s) */
        @keyframes homePedWest1 {
          0% {
            left: 112%;
          }
          100% {
            left: -15%;
          }
        }

        /* Persona 3: Left to Right (~13s) */
        @keyframes homePedEast2 {
          0% {
            left: -18%;
          }
          100% {
            left: 112%;
          }
        }

        /* Persona 4 with Dog: Right to Left (~21s) */
        @keyframes homePedWest2 {
          0% {
            left: 115%;
          }
          100% {
            left: -20%;
          }
        }

        /* --- CLASS BINDINGS --- */
        .home-pedestrian-east-1 {
          animation: homePedEast1 15s linear infinite;
        }
        .home-pedestrian-west-1 {
          animation: homePedWest1 18s linear infinite;
        }
        .home-pedestrian-east-2 {
          animation: homePedEast2 13s linear infinite;
        }
        .home-pedestrian-west-2 {
          animation: homePedWest2 21s linear infinite;
        }

        /* Fast Speed Modifiers */
        .speed-fast .home-pedestrian-east-1 {
          animation-duration: 9.5s;
        }
        .speed-fast .home-pedestrian-west-1 {
          animation-duration: 11.5s;
        }
        .speed-fast .home-pedestrian-east-2 {
          animation-duration: 8.5s;
        }
        .speed-fast .home-pedestrian-west-2 {
          animation-duration: 13.5s;
        }

        /* Paused State */
        .home-animation-paused .home-pedestrian-east-1,
        .home-animation-paused .home-pedestrian-west-1,
        .home-animation-paused .home-pedestrian-east-2,
        .home-animation-paused .home-pedestrian-west-2,
        .home-animation-paused .home-arm-swing-left,
        .home-animation-paused .home-arm-swing-right,
        .home-animation-paused .home-leg-step-left,
        .home-animation-paused .home-leg-step-right,
        .home-animation-paused .home-dog-bounce {
          animation-play-state: paused !important;
        }

        /* --- ARTICULATED STEPPING & ARM SWINGING KEYFRAMES --- */
        @keyframes homeLegStepLeft {
          0% { transform: rotate(22deg); }
          50% { transform: rotate(-22deg); }
          100% { transform: rotate(22deg); }
        }
        @keyframes homeLegStepRight {
          0% { transform: rotate(-22deg); }
          50% { transform: rotate(22deg); }
          100% { transform: rotate(-22deg); }
        }
        .home-leg-step-left {
          animation: homeLegStepLeft 0.85s ease-in-out infinite;
        }
        .home-leg-step-right {
          animation: homeLegStepRight 0.85s ease-in-out infinite;
        }

        @keyframes homeArmSwingLeft {
          0% { transform: rotate(-18deg); }
          50% { transform: rotate(18deg); }
          100% { transform: rotate(-18deg); }
        }
        @keyframes homeArmSwingRight {
          0% { transform: rotate(18deg); }
          50% { transform: rotate(-18deg); }
          100% { transform: rotate(18deg); }
        }
        .home-arm-swing-left {
          animation: homeArmSwingLeft 0.85s ease-in-out infinite;
        }
        .home-arm-swing-right {
          animation: homeArmSwingRight 0.85s ease-in-out infinite;
        }

        /* Dog subtle walking bounce */
        @keyframes homeDogBounce {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
          100% { transform: translateY(0px); }
        }
        .home-dog-bounce {
          animation: homeDogBounce 0.42s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
