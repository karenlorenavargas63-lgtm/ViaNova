import React from 'react';
import { NavigationTab } from '../types';
import { HomeHeroVisual } from './HomeHeroVisual';
import logoImg from '../assets/images/vianova_logo.png';
import { 
  ArrowRight, 
  Bus, 
  Wrench, 
  AlertTriangle,
  Radio,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface HomeScreenProps {
  setCurrentTab: (tab: NavigationTab) => void;
  onSelectRouteOption?: (routeId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ setCurrentTab }) => {
  return (
    <div className="space-y-12 py-4 pb-16 text-slate-900 relative">
      
      {/* ========================================================================= */}
      {/* 1. HERO FLOTANTE ELEVADO CON EFECTO DE LEVITACIÓN                         */}
      {/* ========================================================================= */}
      <section className="relative rounded-[2.5rem] bg-[#caeafc]/90 border border-sky-300 shadow-[0_16px_40px_-10px_rgba(0,87,217,0.2)] p-6 sm:p-10 lg:p-12 overflow-hidden transition-all duration-300 hover:shadow-[0_22px_50px_-8px_rgba(0,87,217,0.28)]">
        
        {/* Ambient floating glow */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none animate-float-soft"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none animate-float-gentle"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          
          {/* Left Column: Headlines & Floating Badges */}
          <div className="lg:col-span-6 space-y-6">

            {/* Badge Flotante Oficial VIANOVA */}
            <div className="inline-flex items-center gap-3.5 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-sky-300 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
              <div className="relative w-12 h-12 rounded-2xl p-1 bg-gradient-to-br from-[#0057d9] to-indigo-700 shadow-md shadow-blue-500/25 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-xl overflow-hidden bg-[#a8d8fc] flex items-center justify-center">
                  <img
                    src={logoImg}
                    alt="Logo Oficial VIANOVA"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-[#0b1b3d]">
                    <span className="text-[#0057d9]">Via</span>Nova
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100/90 text-[#0057d9] border border-sky-300">
                    Oficial
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  Ecosistema Flotante de Movilidad y Convivencia Vial
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0057d9]/10 text-[#0057d9] border border-blue-400/30 text-xs font-black tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>EXPERIENCIA INTELIGENTE DE MOVILIDAD Y PREVENCIÓN</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-[#0b1b3d] leading-[1.12]">
                Movilidad inteligente para tu ciudad
              </h1>
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Navega con la plataforma flotante de VIANOVA. Explora el estado de la red en tiempo real, rutas de transporte multimodal y alertas para una convivencia vial segura.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                id="hero-explore-btn"
                onClick={() => setCurrentTab('seguridad')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0057d9] hover:bg-[#0047b3] text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5"
              >
                <span>Explorar VIANOVA</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-routes-btn"
                onClick={() => setCurrentTab('rutas')}
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white/70 hover:bg-white text-[#0b1b3d] font-bold text-base border-2 border-[#0b1b3d] transition-all duration-200 hover:scale-[1.02] shadow-sm"
              >
                <span>Ver Mapa Completo</span>
              </button>
            </div>
          </div>

          {/* Right Column: Movilidad Urbana Inteligente Visual */}
          <div className="lg:col-span-6 relative">
            <HomeHeroVisual />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ESTADO DEL SISTEMA (3 CASILLAS FLOTANTES DE ACCESO RÁPIDO)             */}
      {/* ========================================================================= */}
      <section className="space-y-5 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0057d9] text-xs font-black tracking-wider uppercase">
              <Radio className="w-3.5 h-3.5 animate-pulse text-blue-600" />
              <span>Monitoreo 24/7 en Vivo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b3d] tracking-tight">
              Estado del Sistema Flotante
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Monitoreo continuo de la red vial, transporte masivo y alertas en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white/70 px-4 py-2 rounded-2xl border border-sky-300 shadow-sm w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Sensores activos: 100% operativos</span>
          </div>
        </div>

        {/* 3 Status Cards Flotantes con Click para navegar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Tráfico Urbano */}
          <div 
            onClick={() => setCurrentTab('rutas')}
            className="cursor-pointer group relative rounded-[2rem] bg-[#caeafc] border border-sky-300/80 hover:border-blue-500 hover:bg-white p-6 sm:p-7 transition-all duration-300 floating-elevated shadow-sm hover:shadow-xl hover:-translate-y-1.5"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#0057d9] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <div className="flex flex-col gap-1 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/40"></span>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-[#0057d9] border border-sky-300 shadow-sm">
                Fluido
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#0b1b3d] mb-1.5 flex items-center justify-between">
              <span>Tráfico Urbano</span>
              <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Las vías principales operan con fluidez. Toca para ver rutas y mapas en vivo.
            </p>
          </div>

          {/* Card 2: Transporte Público */}
          <div 
            onClick={() => setCurrentTab('rutas')}
            className="cursor-pointer group relative rounded-[2rem] bg-[#caeafc] border border-sky-300/80 hover:border-sky-500 hover:bg-white p-6 sm:p-7 transition-all duration-300 floating-elevated shadow-sm hover:shadow-xl hover:-translate-y-1.5"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#0b254a] flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform">
                <Bus className="w-6 h-6" />
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-slate-800 border border-sky-300 shadow-sm">
                98% Operativo
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#0b1b3d] mb-1.5 flex items-center justify-between">
              <span>Transporte Público</span>
              <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Rutas masivas activas y circulando en horario. Toca para calcular trayectos.
            </p>
          </div>

          {/* Card 3: Mantenimiento y Alertas */}
          <div 
            onClick={() => setCurrentTab('seguridad')}
            className="cursor-pointer group relative rounded-[2rem] bg-[#b91c1c] p-6 sm:p-7 text-white transition-all duration-300 floating-elevated overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:bg-[#a81616]"
          >
            <AlertTriangle className="absolute -right-4 -bottom-4 w-36 h-36 text-white/[0.08] pointer-events-none" />
            
            <div className="relative z-10 flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#b91c1c] shadow-md group-hover:scale-105 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm shadow-sm">
                Atención
              </span>
            </div>
            <h3 className="relative z-10 text-xl font-bold text-white mb-1.5 flex items-center justify-between">
              <span>Mantenimiento & Alertas</span>
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="relative z-10 text-sm text-white/90 leading-relaxed">
              Obras menores en Av. Central. Toca para consultar alertas de seguridad vial.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
