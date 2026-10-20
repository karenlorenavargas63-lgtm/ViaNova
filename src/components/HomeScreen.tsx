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
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';

interface HomeScreenProps {
  setCurrentTab: (tab: NavigationTab) => void;
  onSelectRouteOption?: (routeId: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ 
  setCurrentTab,
  theme = 'light',
  onToggleTheme
}) => {
  return (
    <div className={`space-y-8 py-4 pb-16 relative transition-colors duration-300 ${
      theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
    }`}>
      
      {/* ========================================================================= */}
      {/* 🌟 SELECTOR VISIBLE DE MODO CLARO Y OSCURO AL INGRESAR                    */}
      {/* ========================================================================= */}
      <section className={`p-4 sm:p-5 rounded-3xl border transition-all duration-300 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-slate-900 via-[#0d1d3f] to-slate-900 border-slate-700 text-white'
          : 'bg-white/90 border-sky-300 text-slate-800'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
            theme === 'dark' ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' : 'bg-blue-100 text-[#0057d9] border border-blue-200'
          }`}>
            {theme === 'dark' ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${
                theme === 'dark' ? 'bg-blue-950 text-sky-300 border border-blue-800' : 'bg-sky-100 text-blue-800 border border-sky-200'
              }`}>
                Visualización VIANOVA
              </span>
              <span className="text-xs font-bold opacity-90">
                {theme === 'dark' ? '🌙 Modo Oscuro Activado' : '☀️ Modo Claro Activado'}
              </span>
            </div>
            <p className={`text-xs sm:text-sm font-semibold mt-0.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              Configura la apariencia de la plataforma según las condiciones de luz o tu preferencia.
            </p>
          </div>
        </div>

        {/* Dual Switcher Buttons: Modo Claro / Modo Oscuro */}
        {onToggleTheme && (
          <div className={`inline-flex items-center p-1.5 rounded-2xl border shrink-0 ${
            theme === 'dark' ? 'bg-slate-950/80 border-slate-700' : 'bg-sky-100/90 border-sky-300'
          }`}>
            <button
              type="button"
              onClick={() => theme === 'dark' && onToggleTheme()}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-white text-slate-950 shadow-md font-black border border-sky-300 scale-[1.02]'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Activar Modo Claro"
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Modo Claro</span>
            </button>
            <button
              type="button"
              onClick={() => theme === 'light' && onToggleTheme()}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#0057d9] text-white shadow-md font-black border border-blue-400 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
              title="Activar Modo Oscuro"
            >
              <Moon className="w-4 h-4 text-indigo-300" />
              <span>Modo Oscuro</span>
            </button>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 1. HERO FLOTANTE ELEVADO CON EFECTO DE LEVITACIÓN                         */}
      {/* ========================================================================= */}
      <section className={`relative rounded-[2.5rem] border shadow-[0_16px_40px_-10px_rgba(0,87,217,0.2)] p-6 sm:p-10 lg:p-12 overflow-hidden transition-all duration-300 hover:shadow-[0_22px_50px_-8px_rgba(0,87,217,0.28)] ${
        theme === 'dark'
          ? 'bg-slate-900/90 border-slate-700/80'
          : 'bg-[#caeafc]/90 border-sky-300'
      }`}>
        
        {/* Ambient floating glow */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none animate-float-soft"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none animate-float-gentle"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          
          {/* Left Column: Headlines & Floating Badges */}
          <div className="lg:col-span-6 space-y-6">

            {/* Badge Flotante Oficial VIANOVA */}
            <div className={`inline-flex items-center gap-3.5 px-4 py-2.5 rounded-2xl backdrop-blur-md border shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group ${
              theme === 'dark' ? 'bg-slate-800/90 border-slate-700' : 'bg-white/80 border-sky-300'
            }`}>
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
                  <span className={`text-2xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#0b1b3d]'}`}>
                    <span className="text-[#0057d9]">Via</span>Nova
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    theme === 'dark' ? 'bg-blue-900/60 text-sky-300 border border-blue-700' : 'bg-blue-100/90 text-[#0057d9] border border-sky-300'
                  }`}>
                    Oficial
                  </span>
                </div>
                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Ecosistema Flotante de Movilidad y Convivencia Vial
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide ${
                theme === 'dark' ? 'bg-blue-950/80 text-sky-300 border border-blue-800' : 'bg-[#0057d9]/10 text-[#0057d9] border border-blue-400/30'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>EXPERIENCIA INTELIGENTE DE MOVILIDAD Y PREVENCIÓN</span>
              </div>

              <h1 className={`text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] ${
                theme === 'dark' ? 'text-white' : 'text-[#0b1b3d]'
              }`}>
                Movilidad inteligente para tu ciudad
              </h1>
            </div>

            <p className={`text-base sm:text-lg leading-relaxed max-w-xl font-normal ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Navega con la plataforma flotante de VIANOVA. Explora el estado de la red en tiempo real, rutas de transporte multimodal y alertas para una convivencia vial segura.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                id="hero-explore-btn"
                onClick={() => setCurrentTab('seguridad')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0057d9] hover:bg-[#0047b3] text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explorar VIANOVA</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-routes-btn"
                onClick={() => setCurrentTab('rutas')}
                className={`inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-base border-2 transition-all duration-200 hover:scale-[1.02] shadow-sm cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-white border-slate-600'
                    : 'bg-white/70 hover:bg-white text-[#0b1b3d] border-[#0b1b3d]'
                }`}
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
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase ${
              theme === 'dark' ? 'bg-blue-950 text-sky-400 border border-blue-800' : 'bg-blue-100 text-[#0057d9]'
            }`}>
              <Radio className="w-3.5 h-3.5 animate-pulse text-blue-500" />
              <span>Monitoreo 24/7 en Vivo</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-[#0b1b3d]'
            }`}>
              Estado del Sistema Flotante
            </h2>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Monitoreo continuo de la red vial, transporte masivo y alertas en tiempo real.
            </p>
          </div>

          <div className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-2xl border shadow-sm w-fit ${
            theme === 'dark' ? 'bg-slate-800/90 border-slate-700 text-slate-200' : 'bg-white/70 border-sky-300 text-slate-600'
          }`}>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Sensores activos: 100% operativos</span>
          </div>
        </div>

        {/* 3 Status Cards Flotantes con Click para navegar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Tráfico Urbano */}
          <div 
            onClick={() => setCurrentTab('rutas')}
            className={`cursor-pointer group relative rounded-[2rem] border p-6 sm:p-7 transition-all duration-300 floating-elevated shadow-sm hover:shadow-xl hover:-translate-y-1.5 ${
              theme === 'dark'
                ? 'bg-slate-800/90 border-slate-700 hover:border-blue-500 hover:bg-slate-800 text-white'
                : 'bg-[#caeafc] border-sky-300/80 hover:border-blue-500 hover:bg-white text-slate-900'
            }`}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#0057d9] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <div className="flex flex-col gap-1 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/40"></span>
                </div>
              </div>
              <span className={`px-3.5 py-1 rounded-full text-xs font-bold border shadow-sm ${
                theme === 'dark' ? 'bg-blue-950 text-sky-300 border-blue-800' : 'bg-blue-100 text-[#0057d9] border-sky-300'
              }`}>
                Fluido
              </span>
            </div>
            <h3 className={`text-xl font-bold mb-1.5 flex items-center justify-between ${
              theme === 'dark' ? 'text-white' : 'text-[#0b1b3d]'
            }`}>
              <span>Tráfico Urbano</span>
              <ChevronRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Las vías principales operan con fluidez. Toca para ver rutas y mapas en vivo.
            </p>
          </div>

          {/* Card 2: Transporte Público */}
          <div 
            onClick={() => setCurrentTab('rutas')}
            className={`cursor-pointer group relative rounded-[2rem] border p-6 sm:p-7 transition-all duration-300 floating-elevated shadow-sm hover:shadow-xl hover:-translate-y-1.5 ${
              theme === 'dark'
                ? 'bg-slate-800/90 border-slate-700 hover:border-sky-500 hover:bg-slate-800 text-white'
                : 'bg-[#caeafc] border-sky-300/80 hover:border-sky-500 hover:bg-white text-slate-900'
            }`}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#0b254a] flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform">
                <Bus className="w-6 h-6" />
              </div>
              <span className={`px-3.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${
                theme === 'dark' ? 'bg-slate-700 text-sky-200 border-slate-600' : 'bg-sky-100 text-slate-800 border-sky-300'
              }`}>
                98% Operativo
              </span>
            </div>
            <h3 className={`text-xl font-bold mb-1.5 flex items-center justify-between ${
              theme === 'dark' ? 'text-white' : 'text-[#0b1b3d]'
            }`}>
              <span>Transporte Público</span>
              <ChevronRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
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
