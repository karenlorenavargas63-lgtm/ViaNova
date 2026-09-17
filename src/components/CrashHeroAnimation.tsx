import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCcw, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Gauge, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import highwayBg from '../assets/images/highway_night_road_1789653812367.jpg';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export const CrashHeroAnimation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isSlowMotion, setIsSlowMotion] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0 to 1
  const [hasImpacted, setHasImpacted] = useState<boolean>(false);
  const [showDecoratedLogo, setShowDecoratedLogo] = useState<boolean>(false);
  const [screenShake, setScreenShake] = useState<number>(0);
  const [impactFlash, setImpactFlash] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<{ radius: number; maxRadius: number; alpha: number; color: string }[]>([]);
  const hasTriggeredImpactFx = useRef<boolean>(false);

  // Total duration of 1 full cycle in ms
  const TOTAL_CYCLE_MS = 8000;
  const IMPACT_MOMENT = 0.38; // at 38% of the timeline (approx 3.0s), the crash happens!
  const LOGO_FADE_IN_MOMENT = 0.39; // immediately at crash instant

  // Initialize Web Audio API safely on user gesture
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSynthSound = (type: 'engine' | 'crash' | 'chime') => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      if (type === 'crash') {
        // Crash explosion sound: noise buffer + low frequency boom
        const bufferSize = ctx.sampleRate * 0.8;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(80, now + 0.6);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);

        // Low impact sub-bass thud
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.5);
        oscGain.gain.setValueAtTime(0.8, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'chime') {
        // Harmonic uplifting chord for ViaNova emergence
        const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + idx * 0.05);
          gain.gain.setValueAtTime(0.12, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + idx * 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + 1.4);
        });
      }
    } catch (e) {
      // Audio fallback
    }
  };

  const triggerImpactEffects = () => {
    setHasImpacted(true);
    setShowDecoratedLogo(true);
    setImpactFlash(true);
    setTimeout(() => setImpactFlash(false), 240);

    // Camera shake
    setScreenShake(14);
    setTimeout(() => setScreenShake(8), 120);
    setTimeout(() => setScreenShake(4), 250);
    setTimeout(() => setScreenShake(0), 450);

    // Audio
    playSynthSound('crash');
    setTimeout(() => playSynthSound('chime'), 280);

    // Generate spark and debris particles
    const canvas = canvasRef.current;
    if (canvas) {
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.58;
      const newParticles: Particle[] = [];
      const colors = ['#ffffff', '#ffeb3b', '#ff9800', '#ff5722', '#00e5ff', '#64ffda'];

      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        newParticles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 3, // slightly upward
          size: Math.random() * 4 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 40 + 30
        });
      }
      particlesRef.current = newParticles;

      // Shockwaves
      shockwavesRef.current = [
        { radius: 10, maxRadius: 180, alpha: 1, color: '#ffffff' },
        { radius: 5, maxRadius: 240, alpha: 0.9, color: '#ffb703' },
        { radius: 0, maxRadius: 320, alpha: 0.8, color: '#00d4ff' }
      ];
    }
  };

  // Reset to beginning
  const resetAnimation = () => {
    startTimeRef.current = performance.now();
    setProgress(0);
    setHasImpacted(false);
    setShowDecoratedLogo(false);
    setImpactFlash(false);
    setScreenShake(0);
    hasTriggeredImpactFx.current = false;
    particlesRef.current = [];
    shockwavesRef.current = [];
  };

  // Main animation tick
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isPlaying) {
        lastTime = currentTime;
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      const speedMultiplier = isSlowMotion ? 0.45 : 1.0;
      const delta = (currentTime - lastTime) * speedMultiplier;
      lastTime = currentTime;

      const totalDuration = TOTAL_CYCLE_MS;
      let currentProgress = ((currentTime - startTimeRef.current) * speedMultiplier) % totalDuration / totalDuration;
      
      // If looped back to start
      if (currentProgress < 0.05 && hasTriggeredImpactFx.current) {
        hasTriggeredImpactFx.current = false;
        setHasImpacted(false);
        setShowDecoratedLogo(false);
        particlesRef.current = [];
        shockwavesRef.current = [];
      }

      setProgress(currentProgress);

      // Check impact trigger
      if (currentProgress >= IMPACT_MOMENT && !hasTriggeredImpactFx.current) {
        hasTriggeredImpactFx.current = true;
        triggerImpactEffects();
      }

      // Render Canvas Elements
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const w = canvas.width;
          const h = canvas.height;

          // 1. Perspective Road Lines Animation (Speeding road)
          const roadSpeed = isSlowMotion ? 4 : 12;
          const roadTime = (currentTime * 0.05 * roadSpeed) % 100;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(w * 0.5, h * 0.35); // Horizon center
          ctx.lineTo(w * 0.49, h);
          ctx.lineTo(w * 0.51, h);
          ctx.closePath();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.fill();

          // Animated dashed road lane divider
          for (let i = 0; i < 7; i++) {
            const lanePos = ((i * 18 + roadTime) % 100) / 100;
            const y = h * 0.35 + (h * 0.65) * Math.pow(lanePos, 1.8);
            const lineH = 10 + lanePos * 35;
            const lineW = 2 + lanePos * 7;
            ctx.fillStyle = `rgba(255, 255, 200, ${0.1 + lanePos * 0.7})`;
            ctx.fillRect(w * 0.5 - lineW / 2, y, lineW, lineH);
          }
          ctx.restore();

          // 2. Headlight beams projected on road
          if (currentProgress < IMPACT_MOMENT) {
            const carXRatio = 0.08 + (currentProgress / IMPACT_MOMENT) * 0.38;
            const motoXRatio = 0.92 - (currentProgress / IMPACT_MOMENT) * 0.38;
            const carX = w * carXRatio;
            const motoX = w * motoXRatio;
            const roadY = h * 0.62;

            // Car headlight projection
            const carBeamGrad = ctx.createRadialGradient(carX + 50, roadY, 10, carX + 180, roadY, 160);
            carBeamGrad.addColorStop(0, 'rgba(255, 255, 230, 0.45)');
            carBeamGrad.addColorStop(1, 'rgba(255, 255, 200, 0)');
            ctx.fillStyle = carBeamGrad;
            ctx.beginPath();
            ctx.moveTo(carX + 30, roadY - 10);
            ctx.lineTo(carX + 240, roadY - 25);
            ctx.lineTo(carX + 260, roadY + 45);
            ctx.lineTo(carX + 30, roadY + 20);
            ctx.closePath();
            ctx.fill();

            // Motorcycle headlight projection
            const motoBeamGrad = ctx.createRadialGradient(motoX - 40, roadY, 10, motoX - 180, roadY, 150);
            motoBeamGrad.addColorStop(0, 'rgba(180, 240, 255, 0.6)');
            motoBeamGrad.addColorStop(1, 'rgba(100, 200, 255, 0)');
            ctx.fillStyle = motoBeamGrad;
            ctx.beginPath();
            ctx.moveTo(motoX - 20, roadY - 8);
            ctx.lineTo(motoX - 220, roadY - 20);
            ctx.lineTo(motoX - 240, roadY + 40);
            ctx.lineTo(motoX - 20, roadY + 15);
            ctx.closePath();
            ctx.fill();
          }

          // 3. Update & Draw Particles (Sparks & Shards)
          if (particlesRef.current.length > 0) {
            particlesRef.current.forEach((p) => {
              p.x += p.vx;
              p.y += p.vy;
              p.vy += 0.14; // gravity
              p.life += 1;
              p.alpha = Math.max(0, 1 - p.life / p.maxLife);

              ctx.save();
              ctx.globalAlpha = p.alpha;
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 8;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            });
            // Filter out dead particles
            particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);
          }

          // 4. Update & Draw Shockwaves
          if (shockwavesRef.current.length > 0) {
            const cx = w / 2;
            const cy = h * 0.58;
            shockwavesRef.current.forEach((sw) => {
              sw.radius += 5.5;
              sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

              ctx.save();
              ctx.beginPath();
              ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
              ctx.lineWidth = 3.5;
              ctx.strokeStyle = sw.color;
              ctx.globalAlpha = sw.alpha;
              ctx.shadowColor = sw.color;
              ctx.shadowBlur = 12;
              ctx.stroke();
              ctx.restore();
            });
            shockwavesRef.current = shockwavesRef.current.filter((sw) => sw.radius < sw.maxRadius);
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPlaying, isSlowMotion, isSoundEnabled]);

  // Handle Canvas Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute Positions for Car and Motorcycle
  // Phase 1 (0 -> IMPACT_MOMENT): Approaching each other at full speed
  // Phase 2 (IMPACT_MOMENT -> 1.0): Crash point and aftermath
  const approachFactor = Math.min(1, progress / IMPACT_MOMENT);
  
  // Left car position: 0% -> 43%
  const carLeft = progress < IMPACT_MOMENT 
    ? -15 + approachFactor * 58 
    : 43;

  // Right motorcycle position: 100% -> 47%
  const motoRight = progress < IMPACT_MOMENT 
    ? -15 + approachFactor * 58 
    : 43;

  const showVehicles = progress < 0.92;

  return (
    <div 
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 select-none bg-slate-950 group"
      style={{
        transform: screenShake > 0 
          ? `translate(${(Math.random() - 0.5) * screenShake}px, ${(Math.random() - 0.5) * screenShake}px)` 
          : 'none',
        transition: screenShake === 0 ? 'transform 0.15s ease-out' : 'none'
      }}
    >
      {/* 1. Cinematic Background Road */}
      <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] overflow-hidden">
        <img
          src={highwayBg}
          alt="Vía de alta velocidad nocturna"
          className="w-full h-full object-cover object-center brightness-75 contrast-125 scale-105"
        />
        
        {/* Dark Vignette & Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 via-transparent to-indigo-950/60 pointer-events-none" />

        {/* 2. Interactive Canvas Layer for Particles, Beams & Shockwaves */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* 3. Blinding Impact Flash Overlay */}
        {impactFlash && (
          <div className="absolute inset-0 bg-white/95 z-30 pointer-events-none animate-pulse" />
        )}

        {/* 4. Speed & Danger HUD Indicators before impact */}
        {progress < IMPACT_MOMENT && (
          <>
            {/* Car HUD (Left) */}
            <div 
              className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-amber-500/40 text-left shadow-lg"
              style={{ opacity: 0.2 + approachFactor * 0.8 }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300">Vehículo A</span>
              </div>
              <p className="text-sm font-black text-white font-mono tracking-tight flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                125 km/h
              </p>
              <p className="text-[9px] text-rose-400 font-semibold">Exceso de velocidad</p>
            </div>

            {/* Motorcycle HUD (Right) */}
            <div 
              className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/40 text-right shadow-lg"
              style={{ opacity: 0.2 + approachFactor * 0.8 }}
            >
              <div className="flex items-center justify-end gap-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-300">Motocicleta B</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <p className="text-sm font-black text-white font-mono tracking-tight flex items-center justify-end gap-1">
                110 km/h
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
              </p>
              <p className="text-[9px] text-rose-400 font-semibold">Invasión de carril</p>
            </div>

            {/* Proximity Warning Alert */}
            {approachFactor > 0.65 && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-rose-600/90 text-white text-xs font-black tracking-wider uppercase border border-rose-300 shadow-xl shadow-rose-900/50 animate-bounce flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-300 animate-spin" />
                <span>¡Colisión Inminente!</span>
              </div>
            )}
          </>
        )}

        {/* 5. The Vehicles: Moving at High Speed */}
        {showVehicles && (
          <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
            {/* CAR (Moving from left to center) */}
            <div
              className="absolute bottom-[20%] transition-transform duration-75"
              style={{
                left: `${carLeft}%`,
                transform: `scale(${0.85 + approachFactor * 0.35}) ${hasImpacted ? 'rotate(-8deg) translateY(-8px)' : 'rotate(2deg)'}`,
                filter: hasImpacted ? 'brightness(1.5) drop-shadow(0 0 20px #ff9800)' : 'drop-shadow(0 15px 25px rgba(0,0,0,0.8))'
              }}
            >
              <div className="relative w-44 sm:w-56 h-28">
                {/* Car Vector Graphic */}
                <svg viewBox="0 0 240 120" className="w-full h-full drop-shadow-2xl">
                  {/* Motion blur / speed lines behind car */}
                  {!hasImpacted && (
                    <g opacity="0.7">
                      <line x1="-30" y1="65" x2="20" y2="65" stroke="#00e5ff" strokeWidth="3" strokeDasharray="10 15" />
                      <line x1="-50" y1="80" x2="10" y2="80" stroke="#ffeb3b" strokeWidth="2.5" strokeDasharray="15 20" />
                      <line x1="-20" y1="95" x2="30" y2="95" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 12" />
                    </g>
                  )}

                  {/* Car Body (Modern Sleek Sports Sedan) */}
                  <path 
                    d="M 20 80 Q 25 55 60 52 L 100 35 Q 125 32 165 36 L 205 52 Q 225 58 230 75 L 232 90 Q 230 96 220 98 L 30 98 Q 20 96 20 80 Z" 
                    fill="url(#carGradient)" 
                    stroke="#38bdf8" 
                    strokeWidth="1.5"
                  />
                  {/* Roof & Windshield */}
                  <path 
                    d="M 68 52 L 105 37 L 160 38 L 195 52 Z" 
                    fill="#0f172a" 
                    stroke="#64748b" 
                    strokeWidth="1"
                  />
                  {/* Windshield Reflection */}
                  <path 
                    d="M 108 40 L 155 41 L 185 51 L 140 51 Z" 
                    fill="rgba(56, 189, 248, 0.45)"
                  />
                  {/* Headlights (Piercing Dual Xenon) */}
                  <polygon points="215,68 232,70 230,82 210,80" fill="#ffffff" filter="drop-shadow(0 0 8px #38bdf8)" />
                  <circle cx="225" cy="74" r="5" fill="#e0f2fe" />
                  <circle cx="225" cy="74" r="2" fill="#ffffff" />
                  
                  {/* Front Wheel */}
                  <g transform="translate(180, 88)">
                    <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
                    <circle cx="0" cy="0" r="10" fill="#0f172a" />
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#94a3b8" strokeWidth="2" />
                  </g>
                  {/* Rear Wheel */}
                  <g transform="translate(55, 88)">
                    <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
                    <circle cx="0" cy="0" r="10" fill="#0f172a" />
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#94a3b8" strokeWidth="2" />
                  </g>

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0369a1" />
                      <stop offset="50%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Headlight Flare Glow */}
                <div className="absolute right-0 top-14 w-8 h-8 rounded-full bg-white blur-sm opacity-90 animate-pulse" />
              </div>
            </div>

            {/* MOTORCYCLE (Moving from right to center) */}
            <div
              className="absolute bottom-[20%] transition-transform duration-75"
              style={{
                right: `${motoRight}%`,
                transform: `scale(${0.85 + approachFactor * 0.35}) ${hasImpacted ? 'rotate(18deg) translateY(-14px)' : 'rotate(-4deg)'}`,
                filter: hasImpacted ? 'brightness(1.5) drop-shadow(0 0 20px #ef4444)' : 'drop-shadow(0 15px 25px rgba(0,0,0,0.8))'
              }}
            >
              <div className="relative w-36 sm:w-44 h-28">
                {/* Motorcycle Vector Graphic */}
                <svg viewBox="0 0 180 120" className="w-full h-full drop-shadow-2xl">
                  {/* Speed lines behind motorcycle */}
                  {!hasImpacted && (
                    <g opacity="0.7">
                      <line x1="190" y1="60" x2="150" y2="60" stroke="#ef4444" strokeWidth="3" strokeDasharray="10 15" />
                      <line x1="205" y1="75" x2="160" y2="75" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="15 20" />
                      <line x1="185" y1="90" x2="145" y2="90" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 12" />
                    </g>
                  )}

                  {/* Front Wheel */}
                  <g transform="translate(38, 88)">
                    <circle cx="0" cy="0" r="17" fill="#0f172a" stroke="#475569" strokeWidth="3" />
                    <circle cx="0" cy="0" r="8" fill="#1e293b" />
                    <line x1="-10" y1="0" x2="10" y2="0" stroke="#cbd5e1" strokeWidth="1.5" />
                    <line x1="0" y1="-10" x2="0" y2="10" stroke="#cbd5e1" strokeWidth="1.5" />
                  </g>

                  {/* Rear Wheel */}
                  <g transform="translate(135, 88)">
                    <circle cx="0" cy="0" r="17" fill="#0f172a" stroke="#475569" strokeWidth="3" />
                    <circle cx="0" cy="0" r="8" fill="#1e293b" />
                    <line x1="-10" y1="0" x2="10" y2="0" stroke="#cbd5e1" strokeWidth="1.5" />
                    <line x1="0" y1="-10" x2="0" y2="10" stroke="#cbd5e1" strokeWidth="1.5" />
                  </g>

                  {/* Motorcycle Chassis, Engine & Fairing */}
                  <path 
                    d="M 38 88 L 60 55 L 90 52 L 125 65 L 135 88 L 95 86 Z" 
                    fill="#1e293b" 
                    stroke="#dc2626" 
                    strokeWidth="2"
                  />
                  {/* Fuel Tank & Cowl */}
                  <path 
                    d="M 50 55 Q 75 42 100 48 L 85 62 L 50 55 Z" 
                    fill="url(#motoGradient)" 
                  />
                  {/* Windshield */}
                  <path 
                    d="M 38 52 Q 45 35 55 38 L 50 55 Z" 
                    fill="rgba(239, 68, 68, 0.6)" 
                  />

                  {/* Rider Silhouette (Aerodynamic tuck forward) */}
                  <g transform="translate(68, 26)">
                    {/* Helmet */}
                    <ellipse cx="0" cy="0" rx="11" ry="10" fill="#dc2626" stroke="#fecaca" strokeWidth="1.5" />
                    {/* Visor */}
                    <path d="M -9 1 Q -3 -4 5 -1 L 2 5 Q -6 5 -9 1 Z" fill="#0f172a" />
                    {/* Torso leaning aggressively */}
                    <path d="M 5 6 L 25 18 L 18 36 L -2 24 Z" fill="#0f172a" />
                    {/* Arm stretching to handle */}
                    <line x1="12" y1="14" x2="-18" y2="28" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
                  </g>

                  {/* Headlight beam */}
                  <polygon points="32,54 18,52 18,65 32,60" fill="#ffffff" filter="drop-shadow(0 0 10px #ffffff)" />
                  <circle cx="22" cy="57" r="4" fill="#ffffff" />

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="motoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#991b1b" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Motorcycle Headlight Flare */}
                <div className="absolute left-1 top-12 w-7 h-7 rounded-full bg-white blur-xs opacity-95 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* 6. THE INSTANT IMPACT EXPLOSION CORE (At center) */}
        {hasImpacted && progress < 0.65 && (
          <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-25 flex items-center justify-center">
            {/* Impact Sunburst */}
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-radial from-amber-300 via-rose-500/70 to-transparent blur-md animate-ping" />
            <div className="absolute w-16 h-16 rounded-full bg-white blur-xs animate-pulse" />
          </div>
        )}

        {/* 7. DECORATED "VIANOVA" LOGO REVEAL AT INSTANT OF IMPACT */}
        {showDecoratedLogo && (
          <div 
            className="absolute inset-0 z-35 flex flex-col items-center justify-center p-4 text-center pointer-events-none transition-all duration-700 ease-out"
            style={{
              opacity: Math.min(1, (progress - LOGO_FADE_IN_MOMENT) * 15),
              transform: `scale(${Math.min(1, 0.7 + (progress - LOGO_FADE_IN_MOMENT) * 3)})`
            }}
          >
            {/* Backdrop Glow & Aura */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-radial from-blue-500/40 via-indigo-600/25 to-transparent blur-3xl -z-10" />
            
            {/* Decorated Emblem Badge Container */}
            <div className="relative px-6 py-5 sm:px-8 sm:py-6 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-blue-400/40 shadow-2xl shadow-blue-500/30 max-w-md w-full mx-auto transform transition-all pointer-events-auto">
              
              {/* Decorative Glowing Corner Accents */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-tl-lg border-t-2 border-l-2 border-amber-400" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-tr-lg border-t-2 border-r-2 border-amber-400" />
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 rounded-bl-lg border-b-2 border-l-2 border-amber-400" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-br-lg border-b-2 border-r-2 border-amber-400" />

              {/* Safety Badge Crown */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-amber-500/20 border border-amber-400/50 mb-2 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-amber-300">
                  Prevenir es Salvar Vidas
                </span>
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" />
              </div>

              {/* DECORATED "ViaNova" LOGO */}
              <div className="relative py-1 my-1">
                {/* Background Shadow Text */}
                <h2 className="text-4xl sm:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-200 to-indigo-300 filter drop-shadow-[0_0_25px_rgba(56,189,248,0.8)] font-sans uppercase">
                  ViaNova
                </h2>
                {/* Sparkling Highlights */}
                <div className="absolute top-0 right-1/4 text-amber-300 animate-bounce text-sm">✦</div>
                <div className="absolute bottom-1 left-1/4 text-sky-300 animate-pulse text-xs">✧</div>
              </div>

              {/* Ornate Gold Ribbon Under Title */}
              <div className="flex items-center justify-center gap-2 my-2">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400" />
                <div className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
                <span className="text-[11px] sm:text-xs font-extrabold text-slate-200 tracking-widest uppercase font-mono">
                  Seguridad & Conciencia Vial
                </span>
                <div className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400" />
              </div>

              {/* Educational Message */}
              <p className="text-xs sm:text-sm text-slate-300 leading-snug font-medium mt-2">
                La alta velocidad y la imprudencia dejan huellas imborrables. En <span className="text-white font-bold underline decoration-blue-400 underline-offset-2">ViaNova</span> transformamos la movilidad urbana con rutas seguras y educación vial.
              </p>

              {/* Quick Actions in Logo Card */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Sistemas viales activos
                </span>
                <button
                  type="button"
                  onClick={resetAnimation}
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ver de nuevo</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 8. Top Control Bar (Pausa, Reinicio, Cámara lenta, Sonido) */}
        <div className="absolute bottom-4 right-4 z-40 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-700/80 shadow-lg">
          
          {/* Play / Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pausar animación' : 'Reanudar animación'}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Slow Motion (Cámara Lenta) Toggle */}
          <button
            type="button"
            onClick={() => setIsSlowMotion(!isSlowMotion)}
            title={isSlowMotion ? 'Velocidad normal (1x)' : 'Cámara lenta (0.5x)'}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              isSlowMotion 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{isSlowMotion ? '0.5x' : '1.0x'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => {
              initAudio();
              setIsSoundEnabled(!isSoundEnabled);
            }}
            title={isSoundEnabled ? 'Silenciar efectos' : 'Activar sonido de impacto'}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              isSoundEnabled 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                : 'bg-white/10 hover:bg-white/20 text-slate-300'
            }`}
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Replay Button */}
          <button
            type="button"
            onClick={resetAnimation}
            title="Reiniciar choque"
            className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-blue-600/30"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* 9. Timeline Progress Bar on Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900/90 z-40 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-rose-500 transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
          {/* Impact Marker */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_#ffffff]"
            style={{ left: `${IMPACT_MOMENT * 100}%` }}
            title="Momento del impacto y aparición de ViaNova"
          />
        </div>

        {/* 10. Bottom Left Scene Phase Badge */}
        <div className="absolute bottom-4 left-4 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-white text-xs font-semibold shadow-lg">
          <span className={`w-2 h-2 rounded-full ${
            progress < IMPACT_MOMENT 
              ? 'bg-amber-400 animate-ping' 
              : 'bg-blue-400 animate-pulse'
          }`} />
          <span>
            {progress < IMPACT_MOMENT 
              ? 'Aproximación a alta velocidad...' 
              : '¡Impacto! — ViaNova Conciencia Vial'}
          </span>
        </div>

      </div>
    </div>
  );
};
