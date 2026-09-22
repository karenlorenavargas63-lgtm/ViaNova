import React from 'react';
import { NavigationTab } from '../types';
import { HomeHeroPedestriansAnimation } from './HomeHeroPedestriansAnimation';
import logoImg from '../assets/images/vianova_logo.png';
import { 
  ArrowRight, 
  Bus, 
  Wrench, 
  AlertTriangle 
} from 'lucide-react';

interface HomeScreenProps {
  setCurrentTab: (tab: NavigationTab) => void;
  onSelectRouteOption?: (routeId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ setCurrentTab }) => {
  return (
    <div className="space-y-16 py-6 pb-20 animate-fade-in text-slate-900">
      
      {/* Hero Section Matching 99737.png */}
      <section className="relative overflow-hidden pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-6">

            {/* Logo Oficial VIANOVA Destacado */}
            <div className="inline-flex items-center gap-3.5 px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-md hover:shadow-lg transition-all duration-300 hover:border-blue-300 group">
              <div className="relative w-12 h-12 rounded-2xl p-1 bg-gradient-to-br from-[#0057d9] to-indigo-700 shadow-md shadow-blue-500/25 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-xl overflow-hidden bg-white flex items-center justify-center">
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
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-[#0057d9] border border-blue-200/80">
                    Oficial
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Sistema de Movilidad y Convivencia Vial
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-[#0b1b3d] leading-[1.15]">
              Movilidad inteligente para tu ciudad
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Navega de forma eficiente y segura. Descubre rutas optimizadas en tiempo real, mantente informado con alertas de seguridad vial y accede a herramientas digitales diseñadas para mejorar la experiencia urbana.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-btn"
                onClick={() => setCurrentTab('rutas')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0057d9] hover:bg-[#0047b3] text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Explorar VIANOVA</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-routes-btn"
                onClick={() => setCurrentTab('rutas')}
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-[#0b1b3d] font-bold text-base border-2 border-[#0b1b3d] transition-all duration-200 hover:scale-[1.02] shadow-sm"
              >
                <span>Ver rutas</span>
              </button>
            </div>
          </div>

          {/* Right Column: Movilidad Urbana Inteligente Visual with Animated Pedestrians */}
          <div className="lg:col-span-6 relative">
            <HomeHeroPedestriansAnimation />
          </div>

        </div>
      </section>

      {/* System Status Section (Estado del Sistema) Matching 99737.png */}
      <section className="space-y-6 pt-2">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b3d] tracking-tight">
            Estado del Sistema
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Monitoreo en tiempo real de la red de movilidad.
          </p>
        </div>

        {/* 3 Status Cards Matching 99737.png Exactly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Tráfico Urbano (White card with blue icon and 'Fluido' pill) */}
          <div 
            onClick={() => setCurrentTab('rutas')}
            className="cursor-pointer group relative rounded-[1.75rem] bg-white border border-slate-200/80 p-6 sm:p-7 hover:shadow-xl hover:border-blue-300 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#0057d9] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                {/* Traffic icon matching the 3-light indicator */}
                <div className="flex flex-col gap-1 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/40"></span>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#e8edff] text-[#335cff]">
                Fluido
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#0b1b3d] mb-2">Tráfico Urbano</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Las vías principales operan con normalidad.
            </p>
          </div>

          {/* Card 2: Transporte Público (White card with dark blue icon and '98% Operativo' pill) */}
          <div 
            onClick={() => setCurrentTab('rutas')}
            className="cursor-pointer group relative rounded-[1.75rem] bg-white border border-slate-200/80 p-6 sm:p-7 hover:shadow-xl hover:border-slate-400 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#0b254a] flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform">
                <Bus className="w-6 h-6" />
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                98% Operativo
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#0b1b3d] mb-2">Transporte Público</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Rutas activas y circulando en horario.
            </p>
          </div>

          {/* Card 3: Mantenimiento (Crimson Red card with white icon and 'Atención' pill) */}
          <div 
            onClick={() => setCurrentTab('seguridad')}
            className="cursor-pointer group relative rounded-[1.75rem] bg-[#b91c1c] p-6 sm:p-7 text-white shadow-lg shadow-red-950/20 hover:bg-[#a81616] transition-all duration-300 overflow-hidden"
          >
            {/* Background Watermark Triangle */}
            <AlertTriangle className="absolute -right-4 -bottom-4 w-36 h-36 text-white/[0.07] pointer-events-none" />
            
            <div className="relative z-10 flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#b91c1c] shadow-md group-hover:scale-105 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
                Atención
              </span>
            </div>
            <h3 className="relative z-10 text-xl font-bold text-white mb-2">Mantenimiento</h3>
            <p className="relative z-10 text-sm text-white/90 leading-relaxed">
              Obras menores en Avenida Central. Posibles desvíos.
            </p>
          </div>

        </div>
      </section>

      {/* VIANOVA Platform Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white p-1 border border-white/20 shadow-lg shrink-0 flex items-center justify-center">
            <img 
              src={logoImg} 
              alt="Logo VIANOVA" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-400 font-bold">Red Inteligente de Movilidad Urbana</p>
            <h4 className="text-base font-bold text-white">VIANOVA — Plataforma Integral de Convivencia y Seguridad Vial</h4>
            <p className="text-xs text-slate-400">Innovación tecnológica, educación interactiva y prevención en tiempo real para todos los actores viales</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentTab('nosotros')}
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-colors whitespace-nowrap"
        >
          Conocer más sobre nosotros
        </button>
      </div>

    </div>
  );
};
