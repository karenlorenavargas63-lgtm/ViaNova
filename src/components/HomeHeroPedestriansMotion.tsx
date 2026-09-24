import React, { useState } from 'react';
import { Play, Pause, Activity, Eye, ShieldCheck, UserCheck, Bike, Sparkles } from 'lucide-react';

interface PedestriansMotionProps {
  className?: string;
}

export const HomeHeroPedestriansMotion: React.FC<PedestriansMotionProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showTelemetry, setShowTelemetry] = useState<boolean>(true);
  const [activePedestrian, setActivePedestrian] = useState<string | null>(null);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
      {/* Dynamic Keyframes for Biomechanically Correct Human Walking & Cyclist Motion */}
      <style>{`
        /* --- Realistic Human Walking Cycle Kinematics (60 FPS GPU-accelerated) --- */
        
        /* Pelvis and torso double-bounce per stride (natural inverted pendulum) */
        @keyframes humanBobbing {
          0%, 100% { transform: translateY(0px) rotate(0.8deg); }
          25% { transform: translateY(-3.8px) rotate(-0.5deg); }
          50% { transform: translateY(0px) rotate(0.8deg); }
          75% { transform: translateY(-3.8px) rotate(-0.5deg); }
        }

        /* Thigh / Hip Rotation */
        @keyframes thighSwingFront {
          0% { transform: rotate(24deg); }
          25% { transform: rotate(2deg); }
          50% { transform: rotate(-22deg); }
          75% { transform: rotate(8deg); }
          100% { transform: rotate(24deg); }
        }

        @keyframes thighSwingBack {
          0% { transform: rotate(-22deg); }
          25% { transform: rotate(8deg); }
          50% { transform: rotate(24deg); }
          75% { transform: rotate(2deg); }
          100% { transform: rotate(-22deg); }
        }

        /* Calf / Knee Flexion (Heel plant, weight absorption, push off, deep bend in recovery) */
        @keyframes calfFlexFront {
          0% { transform: rotate(0deg); }
          18% { transform: rotate(-8deg); }
          48% { transform: rotate(-16deg); }
          65% { transform: rotate(-52deg); } /* Deep knee bend when leg swings forward */
          88% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes calfFlexBack {
          0% { transform: rotate(-16deg); }
          15% { transform: rotate(-52deg); } /* Deep knee bend in recovery */
          38% { transform: rotate(-10deg); }
          50% { transform: rotate(0deg); }
          68% { transform: rotate(-8deg); }
          98% { transform: rotate(-16deg); }
          100% { transform: rotate(-16deg); }
        }

        /* Foot & Ankle Articulation */
        @keyframes footStrikeFront {
          0% { transform: rotate(12deg); }   /* Heel strike */
          20% { transform: rotate(0deg); }   /* Planted flat */
          48% { transform: rotate(-28deg); } /* Toe push off */
          70% { transform: rotate(-8deg); }  /* Relaxed in air */
          90% { transform: rotate(14deg); }  /* Pre-strike flexion */
          100% { transform: rotate(12deg); }
        }

        @keyframes footStrikeBack {
          0% { transform: rotate(-28deg); }  /* Toe push off */
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(14deg); }
          50% { transform: rotate(12deg); }  /* Heel strike */
          70% { transform: rotate(0deg); }   /* Planted */
          98% { transform: rotate(-28deg); }
          100% { transform: rotate(-28deg); }
        }

        /* Arms counter-swing opposite to legs */
        @keyframes armSwingFront {
          0% { transform: rotate(-22deg); }
          50% { transform: rotate(22deg); }
          100% { transform: rotate(-22deg); }
        }

        @keyframes armSwingBack {
          0% { transform: rotate(22deg); }
          50% { transform: rotate(-22deg); }
          100% { transform: rotate(22deg); }
        }

        @keyframes forearmSwingFront {
          0% { transform: rotate(6deg); }
          50% { transform: rotate(26deg); }
          100% { transform: rotate(6deg); }
        }

        @keyframes forearmSwingBack {
          0% { transform: rotate(26deg); }
          50% { transform: rotate(6deg); }
          100% { transform: rotate(26deg); }
        }

        /* Foot shadow pulsating with step impact */
        @keyframes groundFootShadow {
          0%, 50%, 100% { transform: scaleX(1.15) scaleY(0.95); opacity: 0.55; }
          25%, 75% { transform: scaleX(0.85) scaleY(0.8); opacity: 0.35; }
        }

        /* --- Horizontal Motion Across the Street Locked to Stride Rate --- */
        
        /* Pedestrian 1 (Left to Right, Foreground Crosswalk) */
        @keyframes walkPathLtoR1 {
          0% { transform: translate3d(-120px, 0, 0); }
          100% { transform: translate3d(calc(100vw + 140px), 0, 0); }
        }

        /* Pedestrian 2 (Right to Left, Foreground Crosswalk) */
        @keyframes walkPathRtoL2 {
          0% { transform: translate3d(calc(100% + 120px), 0, 0); }
          100% { transform: translate3d(-140px, 0, 0); }
        }

        /* Pedestrian 3 (Left to Right, Midground Sidewalk) */
        @keyframes walkPathLtoR3 {
          0% { transform: translate3d(-100px, 0, 0); }
          100% { transform: translate3d(calc(100% + 120px), 0, 0); }
        }

        /* Cyclist (Right to Left, Bike Lane) */
        @keyframes cyclistGlide {
          0% { transform: translate3d(calc(100% + 160px), 0, 0); }
          100% { transform: translate3d(-180px, 0, 0); }
        }

        /* Bike Wheel Rotation */
        @keyframes spinBikeWheel {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        /* Bike Pedaling Crank */
        @keyframes bikePedalCrank {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        /* Smart Crosswalk LED strip pulsers */
        @keyframes ledCrosswalkPulse {
          0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 2px rgba(16, 185, 129, 0.4)); }
          50% { opacity: 0.95; filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.9)); }
        }
      `}</style>

      {/* --- Smart Road Surface & Crosswalk Integration --- */}
      <div className="absolute inset-x-0 bottom-0 h-[48%] pointer-events-none">
        
        {/* Subtle realistic asphalt darkening with perspective */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

        {/* Smart LED Zebra Crossing (Paso Peatonal Inteligente VIANOVA) */}
        <div className="absolute inset-x-0 bottom-4 h-24 flex items-center justify-around px-4 opacity-75">
          {/* LED Sensor strips on pavement */}
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className="h-full w-4 sm:w-6 bg-gradient-to-b from-white/20 via-white/40 to-white/10 skew-x-[-18deg] rounded-sm relative border-t-2 border-emerald-400/80 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
              style={{
                animation: isPlaying ? `ledCrosswalkPulse 3.5s infinite ${i * 0.15}s ease-in-out` : 'none',
              }}
            >
              {/* Micro LED Ground Marker */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            </div>
          ))}
        </div>

        {/* Green Bike Lane Ribbon in Midground */}
        <div className="absolute inset-x-0 top-6 h-6 bg-emerald-600/25 border-y border-emerald-400/40 backdrop-blur-[1px] flex items-center justify-around px-8">
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-300 opacity-70">
            <Bike className="w-3 h-3" />
            <span>Ciclorruta Segura VIANOVA</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-bold tracking-wider text-emerald-300 opacity-60">
            <span>Prioridad Ciclista</span>
          </div>
        </div>
      </div>

      {/* --- PEDESTRIAN 1: Camila (Profesional Urbana) --- */}
      {/* Walking Left to Right on the Foreground Crosswalk */}
      <div
        className="absolute bottom-6 left-0 z-30 pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-105"
        style={{
          animation: isPlaying ? 'walkPathLtoR1 12s infinite linear' : 'none',
          animationPlayState: isPlaying ? 'running' : 'paused',
        }}
        onClick={() => setActivePedestrian(activePedestrian === 'camila' ? null : 'camila')}
      >
        <div className="relative">
          {/* Telemetry HUD Badge above head */}
          {showTelemetry && (
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-400/60 text-[10px] font-bold text-white shadow-lg flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-300">1.3 m/s</span>
              <span className="text-slate-400">•</span>
              <span>Paso seguro</span>
            </div>
          )}

          {/* SVG Articulated Human Walker (Height ~90px) */}
          <svg
            width="64"
            height="100"
            viewBox="-32 -85 64 100"
            className="overflow-visible filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            {/* Ground Contact Shadow */}
            <ellipse
              cx="0"
              cy="8"
              rx="18"
              ry="4"
              fill="rgba(0,0,0,0.5)"
              style={{
                animation: isPlaying ? 'groundFootShadow 1.2s infinite ease-in-out' : 'none',
                transformOrigin: '0px 8px',
              }}
            />

            {/* Back Leg (Starts out of phase) */}
            <g
              style={{
                animation: isPlaying ? 'thighSwingBack 1.2s infinite ease-in-out' : 'none',
                transformOrigin: '-2px -24px',
              }}
            >
              {/* Back Thigh */}
              <line x1="-2" y1="-24" x2="-2" y2="-2" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
              {/* Back Calf / Knee */}
              <g
                style={{
                  animation: isPlaying ? 'calfFlexBack 1.2s infinite ease-in-out' : 'none',
                  transformOrigin: '-2px -2px',
                }}
              >
                <line x1="-2" y1="-2" x2="-2" y2="20" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
                {/* Back Foot / Shoe */}
                <g
                  style={{
                    animation: isPlaying ? 'footStrikeBack 1.2s infinite ease-in-out' : 'none',
                    transformOrigin: '-2px 20px',
                  }}
                >
                  <path d="M-5 20 L4 20 L2 24 L-5 24 Z" fill="#ffffff" />
                  <path d="M-5 23 L4 23 L2 25 L-5 25 Z" fill="#2563eb" />
                </g>
              </g>
            </g>

            {/* Back Arm */}
            <g
              style={{
                animation: isPlaying ? 'armSwingBack 1.2s infinite ease-in-out' : 'none',
                transformOrigin: '0px -54px',
              }}
            >
              <line x1="0" y1="-54" x2="-6" y2="-38" stroke="#1e3a8a" strokeWidth="4.5" strokeLinecap="round" />
              <g
                style={{
                  animation: isPlaying ? 'forearmSwingBack 1.2s infinite ease-in-out' : 'none',
                  transformOrigin: '-6px -38px',
                }}
              >
                <line x1="-6" y1="-38" x2="-4" y2="-22" stroke="#fbcfe8" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            </g>

            {/* Torso & Head Bobbing Group */}
            <g
              style={{
                animation: isPlaying ? 'humanBobbing 1.2s infinite ease-in-out' : 'none',
                transformOrigin: '0px -20px',
              }}
            >
              {/* Stylish Navy Blue Trench Coat / Jacket */}
              <path
                d="M-7 -56 C-8 -56 -9 -45 -8 -30 L-7 -22 C-7 -20 7 -20 7 -22 L8 -30 C9 -45 8 -56 7 -56 Z"
                fill="#1e3a8a"
              />
              {/* Belt / waist accent */}
              <rect x="-8" y="-34" width="16" height="3" rx="1.5" fill="#0f172a" />
              {/* Crossbody Bag Strap */}
              <line x1="-7" y1="-54" x2="6" y2="-32" stroke="#b45309" strokeWidth="2" />
              <rect x="3" y="-33" width="7" height="9" rx="2" fill="#b45309" />

              {/* Neck */}
              <line x1="0" y1="-56" x2="0" y2="-62" stroke="#fbcfe8" strokeWidth="3.5" strokeLinecap="round" />

              {/* Head with natural styled ponytail hair */}
              <circle cx="0" cy="-68" r="6.5" fill="#fbcfe8" />
              {/* Hair */}
              <path d="M-6 -73 C-4 -76 4 -76 6 -73 C6 -71 4 -68 1 -68 C-3 -68 -6 -70 -6 -73 Z" fill="#3b2219" />
              {/* Ponytail bouncing */}
              <path d="M-4 -72 C-8 -73 -12 -70 -11 -64 C-10 -67 -6 -70 -4 -70 Z" fill="#3b2219" />
            </g>

            {/* Front Leg */}
            <g
              style={{
                animation: isPlaying ? 'thighSwingFront 1.2s infinite ease-in-out' : 'none',
                transformOrigin: '2px -24px',
              }}
            >
              {/* Front Thigh */}
              <line x1="2" y1="-24" x2="2" y2="-2" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
              {/* Front Calf / Knee */}
              <g
                style={{
                  animation: isPlaying ? 'calfFlexFront 1.2s infinite ease-in-out' : 'none',
                  transformOrigin: '2px -2px',
                }}
              >
                <line x1="2" y1="-2" x2="2" y2="20" stroke="#1e293b" strokeWidth="5.5" strokeLinecap="round" />
                {/* Front Foot / Shoe */}
                <g
                  style={{
                    animation: isPlaying ? 'footStrikeFront 1.2s infinite ease-in-out' : 'none',
                    transformOrigin: '2px 20px',
                  }}
                >
                  <path d="M-5 20 L5 20 L3 24 L-5 24 Z" fill="#ffffff" />
                  <path d="M-5 23 L5 23 L3 25 L-5 25 Z" fill="#2563eb" />
                </g>
              </g>
            </g>

            {/* Front Arm */}
            <g
              style={{
                animation: isPlaying ? 'armSwingFront 1.2s infinite ease-in-out' : 'none',
                transformOrigin: '0px -54px',
              }}
            >
              <line x1="0" y1="-54" x2="4" y2="-38" stroke="#1d4ed8" strokeWidth="4.5" strokeLinecap="round" />
              <g
                style={{
                  animation: isPlaying ? 'forearmSwingFront 1.2s infinite ease-in-out' : 'none',
                  transformOrigin: '4px -38px',
                }}
              >
                <line x1="4" y1="-38" x2="8" y2="-22" stroke="#fbcfe8" strokeWidth="3.5" strokeLinecap="round" />
                {/* Smart Phone in hand */}
                <rect x="7" y="-24" width="3" height="5" rx="0.5" fill="#0f172a" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* --- PEDESTRIAN 2: Mateo (Ciudadano en dirección contraria) --- */}
      {/* Walking Right to Left on the Foreground Crosswalk (scaleX(-1) for natural direction) */}
      <div
        className="absolute bottom-10 right-0 z-30 pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-105"
        style={{
          animation: isPlaying ? 'walkPathRtoL2 14s infinite linear 2.5s' : 'none',
          animationPlayState: isPlaying ? 'running' : 'paused',
        }}
        onClick={() => setActivePedestrian(activePedestrian === 'mateo' ? null : 'mateo')}
      >
        <div className="relative [transform:scaleX(-1)]">
          {/* Telemetry HUD (Un-flipped text so it's readable) */}
          {showTelemetry && (
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 [transform:scaleX(-1)] whitespace-nowrap px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-400/60 text-[10px] font-bold text-white shadow-lg flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-300">1.2 m/s</span>
              <span className="text-slate-400">•</span>
              <span>En cruce</span>
            </div>
          )}

          {/* SVG Articulated Human Walker with Backpack & Warm Amber Jacket */}
          <svg
            width="68"
            height="104"
            viewBox="-34 -88 68 104"
            className="overflow-visible filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            {/* Ground Contact Shadow */}
            <ellipse
              cx="0"
              cy="8"
              rx="19"
              ry="4"
              fill="rgba(0,0,0,0.5)"
              style={{
                animation: isPlaying ? 'groundFootShadow 1.3s infinite ease-in-out' : 'none',
                transformOrigin: '0px 8px',
              }}
            />

            {/* Back Leg */}
            <g
              style={{
                animation: isPlaying ? 'thighSwingBack 1.3s infinite ease-in-out' : 'none',
                transformOrigin: '-2px -24px',
              }}
            >
              <line x1="-2" y1="-24" x2="-2" y2="-2" stroke="#1e293b" strokeWidth="6.5" strokeLinecap="round" />
              <g
                style={{
                  animation: isPlaying ? 'calfFlexBack 1.3s infinite ease-in-out' : 'none',
                  transformOrigin: '-2px -2px',
                }}
              >
                <line x1="-2" y1="-2" x2="-2" y2="20" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
                <g
                  style={{
                    animation: isPlaying ? 'footStrikeBack 1.3s infinite ease-in-out' : 'none',
                    transformOrigin: '-2px 20px',
                  }}
                >
                  <path d="M-6 20 L5 20 L3 24 L-6 24 Z" fill="#e2e8f0" />
                  <path d="M-6 23 L5 23 L3 25 L-6 25 Z" fill="#b45309" />
                </g>
              </g>
            </g>

            {/* Back Arm */}
            <g
              style={{
                animation: isPlaying ? 'armSwingBack 1.3s infinite ease-in-out' : 'none',
                transformOrigin: '0px -54px',
              }}
            >
              <line x1="0" y1="-54" x2="-6" y2="-38" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
              <g
                style={{
                  animation: isPlaying ? 'forearmSwingBack 1.3s infinite ease-in-out' : 'none',
                  transformOrigin: '-6px -38px',
                }}
              >
                <line x1="-6" y1="-38" x2="-5" y2="-22" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" />
              </g>
            </g>

            {/* Torso with Urban Backpack */}
            <g
              style={{
                animation: isPlaying ? 'humanBobbing 1.3s infinite ease-in-out' : 'none',
                transformOrigin: '0px -20px',
              }}
            >
              {/* Backpack */}
              <rect x="-14" y="-52" width="8" height="18" rx="3" fill="#1e293b" />
              <line x1="-8" y1="-50" x2="-4" y2="-36" stroke="#0f172a" strokeWidth="2.5" />

              {/* Amber / Mustard Urban Jacket */}
              <path
                d="M-7 -56 C-8 -56 -9 -45 -8 -30 L-7 -22 C-7 -20 7 -20 7 -22 L8 -30 C9 -45 8 -56 7 -56 Z"
                fill="#d97706"
              />
              <line x1="0" y1="-56" x2="0" y2="-22" stroke="#b45309" strokeWidth="1.5" />

              {/* Neck */}
              <line x1="0" y1="-56" x2="0" y2="-62" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" />

              {/* Head with Headphones */}
              <circle cx="0" cy="-68" r="7" fill="#fed7aa" />
              {/* Short modern hair */}
              <path d="M-6 -72 C-4 -76 4 -76 6 -72 C6 -70 4 -68 0 -68 C-4 -68 -6 -70 -6 -72 Z" fill="#18181b" />
              {/* Over-ear Headphones */}
              <path d="M-7 -68 C-7 -75 7 -75 7 -68" fill="none" stroke="#0284c7" strokeWidth="2" />
              <rect x="-8" y="-70" width="3" height="5" rx="1" fill="#0284c7" />
              <rect x="5" y="-70" width="3" height="5" rx="1" fill="#0284c7" />
            </g>

            {/* Front Leg */}
            <g
              style={{
                animation: isPlaying ? 'thighSwingFront 1.3s infinite ease-in-out' : 'none',
                transformOrigin: '2px -24px',
              }}
            >
              <line x1="2" y1="-24" x2="2" y2="-2" stroke="#334155" strokeWidth="6.5" strokeLinecap="round" />
              <g
                style={{
                  animation: isPlaying ? 'calfFlexFront 1.3s infinite ease-in-out' : 'none',
                  transformOrigin: '2px -2px',
                }}
              >
                <line x1="2" y1="-2" x2="2" y2="20" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                <g
                  style={{
                    animation: isPlaying ? 'footStrikeFront 1.3s infinite ease-in-out' : 'none',
                    transformOrigin: '2px 20px',
                  }}
                >
                  <path d="M-6 20 L5 20 L3 24 L-6 24 Z" fill="#e2e8f0" />
                  <path d="M-6 23 L5 23 L3 25 L-6 25 Z" fill="#b45309" />
                </g>
              </g>
            </g>

            {/* Front Arm */}
            <g
              style={{
                animation: isPlaying ? 'armSwingFront 1.3s infinite ease-in-out' : 'none',
                transformOrigin: '0px -54px',
              }}
            >
              <line x1="0" y1="-54" x2="5" y2="-38" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
              <g
                style={{
                  animation: isPlaying ? 'forearmSwingFront 1.3s infinite ease-in-out' : 'none',
                  transformOrigin: '5px -38px',
                }}
              >
                <line x1="5" y1="-38" x2="7" y2="-22" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* --- CYCLIST: Santiago en Ciclorruta --- */}
      {/* Gliding Right to Left along the Green Bike Path in Midground */}
      <div
        className="absolute bottom-[92px] right-0 z-20 pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-105"
        style={{
          animation: isPlaying ? 'cyclistGlide 8s infinite linear 1s' : 'none',
          animationPlayState: isPlaying ? 'running' : 'paused',
        }}
        onClick={() => setActivePedestrian(activePedestrian === 'ciclista' ? null : 'ciclista')}
      >
        <div className="relative [transform:scaleX(-1)]">
          {/* Telemetry Tag */}
          {showTelemetry && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 [transform:scaleX(-1)] whitespace-nowrap px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-400/70 text-[9px] font-bold text-white shadow-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-300">16 km/h</span>
              <span className="text-slate-400">•</span>
              <span>Ciclista</span>
            </div>
          )}

          {/* SVG Urban Bicycle & Rider (Scale ~0.78 for realistic perspective) */}
          <svg
            width="82"
            height="70"
            viewBox="0 0 82 70"
            className="overflow-visible filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            {/* Ground Shadow */}
            <ellipse cx="40" cy="65" rx="34" ry="4" fill="rgba(0,0,0,0.4)" />

            {/* Rear Wheel with Rotating Spokes */}
            <g transform="translate(18, 52)">
              <circle cx="0" cy="0" r="13" fill="none" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="11" fill="none" stroke="#64748b" strokeWidth="0.8" />
              <g style={{ animation: isPlaying ? 'spinBikeWheel 0.6s infinite linear' : 'none' }}>
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="0" y1="-12" x2="0" y2="12" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#94a3b8" strokeWidth="0.8" />
              </g>
              <circle cx="0" cy="0" r="2.5" fill="#0f172a" />
            </g>

            {/* Front Wheel with Rotating Spokes */}
            <g transform="translate(64, 52)">
              <circle cx="0" cy="0" r="13" fill="none" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="11" fill="none" stroke="#64748b" strokeWidth="0.8" />
              <g style={{ animation: isPlaying ? 'spinBikeWheel 0.6s infinite linear' : 'none' }}>
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="0" y1="-12" x2="0" y2="12" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#94a3b8" strokeWidth="0.8" />
              </g>
              <circle cx="0" cy="0" r="2.5" fill="#0f172a" />
            </g>

            {/* Bicycle Frame (Vibrant Blue Commuter) */}
            <path
              d="M18 52 L36 52 L54 36 L30 36 Z M36 52 L30 36 M54 36 L64 52"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Saddle & Post */}
            <line x1="30" y1="36" x2="27" y2="30" stroke="#334155" strokeWidth="2.5" />
            <path d="M23 29 C25 28 32 28 34 30 Z" fill="#0f172a" />

            {/* Handlebar & Fork */}
            <line x1="64" y1="52" x2="57" y2="28" stroke="#334155" strokeWidth="2.5" />
            <path d="M54 28 L60 28 L62 31" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

            {/* Flashing Rear Red Safety LED */}
            <circle cx="24" cy="34" r="2" fill="#ef4444" className="animate-ping" />
            <circle cx="24" cy="34" r="2" fill="#ef4444" />

            {/* Rotating Pedal Crank */}
            <g transform="translate(36, 52)">
              <g style={{ animation: isPlaying ? 'bikePedalCrank 0.9s infinite linear' : 'none' }}>
                <circle cx="0" cy="0" r="4" fill="#0f172a" />
                <line x1="0" y1="0" x2="0" y2="7" stroke="#475569" strokeWidth="2" />
                <rect x="-3" y="7" width="6" height="2" fill="#0f172a" />
                <line x1="0" y1="0" x2="0" y2="-7" stroke="#475569" strokeWidth="2" />
                <rect x="-3" y="-9" width="6" height="2" fill="#0f172a" />
              </g>
            </g>

            {/* Cyclist Rider Figure */}
            {/* Torso leaning forward naturally */}
            <path d="M28 29 L44 24 L56 28" fill="none" stroke="#059669" strokeWidth="7" strokeLinecap="round" />
            {/* Neon Reflective Safety Stripe */}
            <line x1="34" y1="27" x2="48" y2="23" stroke="#facc15" strokeWidth="2" />

            {/* Arms reaching to handlebar */}
            <path d="M46 24 L55 28 L59 30" fill="none" stroke="#047857" strokeWidth="3" strokeLinecap="round" />

            {/* Pedaling Legs (Articulated cadence) */}
            <path d="M30 30 L38 42 L36 53" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

            {/* Head & Aerodynamic Safety Helmet */}
            <circle cx="48" cy="14" r="5" fill="#fbcfe8" />
            {/* Helmet */}
            <path d="M42 12 C44 7 53 7 56 12 L54 15 L43 14 Z" fill="#0284c7" />
            <circle cx="53" cy="13" r="1.5" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* --- PEDESTRIAN 3: Sofía (Peatón en perspectiva media) --- */}
      {/* Walking Left to Right on the background sidewalk (Scale ~0.65 for depth) */}
      <div
        className="absolute bottom-[115px] left-0 z-10 pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-105 opacity-90"
        style={{
          animation: isPlaying ? 'walkPathLtoR3 17s infinite linear 4s' : 'none',
          animationPlayState: isPlaying ? 'running' : 'paused',
        }}
        onClick={() => setActivePedestrian(activePedestrian === 'sofia' ? null : 'sofia')}
      >
        <div className="relative">
          {/* Telemetry Tag */}
          {showTelemetry && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-purple-400/50 text-[8px] font-bold text-white shadow flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-purple-400 animate-ping" />
              <span className="text-purple-300">1.1 m/s</span>
            </div>
          )}

          {/* SVG Articulated Walker (Depth Scale ~0.65) */}
          <svg
            width="45"
            height="70"
            viewBox="-22 -60 45 70"
            className="overflow-visible filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            {/* Shadow */}
            <ellipse
              cx="0"
              cy="6"
              rx="12"
              ry="3"
              fill="rgba(0,0,0,0.4)"
              style={{
                animation: isPlaying ? 'groundFootShadow 1.1s infinite ease-in-out' : 'none',
                transformOrigin: '0px 6px',
              }}
            />

            {/* Back Leg */}
            <g
              style={{
                animation: isPlaying ? 'thighSwingBack 1.1s infinite ease-in-out' : 'none',
                transformOrigin: '-2px -16px',
              }}
            >
              <line x1="-2" y1="-16" x2="-2" y2="-1" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
              <g
                style={{
                  animation: isPlaying ? 'calfFlexBack 1.1s infinite ease-in-out' : 'none',
                  transformOrigin: '-2px -1px',
                }}
              >
                <line x1="-2" y1="-1" x2="-2" y2="14" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                <path d="M-4 14 L3 14 L1 17 L-4 17 Z" fill="#ffffff" />
              </g>
            </g>

            {/* Torso & Head */}
            <g
              style={{
                animation: isPlaying ? 'humanBobbing 1.1s infinite ease-in-out' : 'none',
                transformOrigin: '0px -14px',
              }}
            >
              <path d="M-5 -38 C-6 -38 -6 -30 -5 -20 L-4 -14 C-4 -13 4 -13 4 -14 L5 -20 C6 -30 6 -38 5 -38 Z" fill="#7c3aed" />
              <circle cx="0" cy="-45" r="4.5" fill="#fed7aa" />
              <path d="M-4 -49 C-3 -52 3 -52 4 -49 C4 -47 3 -45 0 -45 C-3 -45 -4 -47 -4 -49 Z" fill="#78350f" />
            </g>

            {/* Front Leg */}
            <g
              style={{
                animation: isPlaying ? 'thighSwingFront 1.1s infinite ease-in-out' : 'none',
                transformOrigin: '2px -16px',
              }}
            >
              <line x1="2" y1="-16" x2="2" y2="-1" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" />
              <g
                style={{
                  animation: isPlaying ? 'calfFlexFront 1.1s infinite ease-in-out' : 'none',
                  transformOrigin: '2px -1px',
                }}
              >
                <line x1="2" y1="-1" x2="2" y2="14" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                <path d="M-4 14 L3 14 L1 17 L-4 17 Z" fill="#ffffff" />
              </g>
            </g>

            {/* Front Arm */}
            <g
              style={{
                animation: isPlaying ? 'armSwingFront 1.1s infinite ease-in-out' : 'none',
                transformOrigin: '0px -36px',
              }}
            >
              <line x1="0" y1="-36" x2="3" y2="-25" stroke="#6d28d9" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="3" y1="-25" x2="5" y2="-14" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* --- Floating Bottom Controls Toolbar: Play/Pause & Telemetry Toggle --- */}
      <div className="absolute top-14 right-4 z-40 flex items-center gap-1.5 pointer-events-auto">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? 'Pausar movimiento de personas' : 'Reanudar movimiento de personas'}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold hover:bg-slate-800 transition shadow-md hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 text-amber-400" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
              <span>Reanudar</span>
            </>
          )}
        </button>

        <button
          onClick={() => setShowTelemetry(!showTelemetry)}
          title={showTelemetry ? 'Ocultar indicadores de velocidad' : 'Mostrar indicadores de velocidad'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border text-[11px] font-semibold transition shadow-md hover:scale-105 active:scale-95 ${
            showTelemetry
              ? 'bg-blue-600/90 border-blue-400 text-white'
              : 'bg-slate-950/85 border-white/20 text-slate-300 hover:text-white'
          }`}
        >
          <Activity className="w-3 h-3" />
          <span className="hidden sm:inline">IA VIANOVA</span>
        </button>
      </div>

      {/* Optional Detail Modal / Tooltip on pedestrian click */}
      {activePedestrian && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3.5 py-2 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-sky-400/80 text-white shadow-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white capitalize">{activePedestrian}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                  Cruce Seguro
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Paso peatonal detectado en tiempo real por el sistema VIANOVA
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePedestrian(null);
              }}
              className="text-slate-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
