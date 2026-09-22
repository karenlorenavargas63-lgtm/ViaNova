import React from 'react';
import { NavigationTab } from '../types';
import { CrashHeroAnimation } from './CrashHeroAnimation';
import { 
  ArrowRight, 
  MapPin, 
  Activity, 
  Bus, 
  Wrench, 
  ShieldCheck, 
  Compass, 
  Award,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  TrafficCone
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

          {/* Right Column: ViaNova Visual Showcase with Highway Background */}
          <div className="lg:col-span-6 relative">
            <CrashHeroAnimation variant="hero" />
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

      {/* Feature Navigation Bento Grid */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-[#0057d9] font-bold">Ecosistema Completo</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b3d] tracking-tight">Explora las funciones de VIANOVA</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card: Planificador de Rutas */}
          <div 
            onClick={() => setCurrentTab('rutas')}
            className="group cursor-pointer rounded-3xl bg-white border border-slate-200/80 hover:border-blue-500/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0057d9] group-hover:bg-[#0057d9] group-hover:text-white transition-all">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1b3d] group-hover:text-[#0057d9] transition-colors">
                Rutas Inteligentes
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Elige entre opciones Rápida, Segura o Alternativa según tu modo de transporte y necesidades.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-[#0057d9]">
              Planificar viaje <ChevronRight className="w-4 h-4" />
            </span>
          </div>

          {/* Card: Alertas de Movilidad */}
          <div 
            onClick={() => setCurrentTab('seguridad')}
            className="group cursor-pointer rounded-3xl bg-white border border-slate-200/80 hover:border-rose-500/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1b3d] group-hover:text-rose-600 transition-colors">
                Alertas en Tiempo Real
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reportes verificados de incidentes, inundaciones, desvíos y riesgo vial en el mapa.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
              Ver alertas <ChevronRight className="w-4 h-4" />
            </span>
          </div>

          {/* Card: Módulos Educativos */}
          <div 
            onClick={() => setCurrentTab('educacion')}
            className="group cursor-pointer rounded-3xl bg-white border border-slate-200/80 hover:border-emerald-500/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1b3d] group-hover:text-emerald-600 transition-colors">
                Educación y Certificación
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Cursos interactivos, normativas viales y evaluaciones para obtener insignias de usuario seguro.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
              Aprender más <ChevronRight className="w-4 h-4" />
            </span>
          </div>

          {/* Card: Campañas Viales */}
          <div 
            onClick={() => setCurrentTab('campanas')}
            className="group cursor-pointer rounded-3xl bg-white border border-slate-200/80 hover:border-cyan-500/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1b3d] group-hover:text-cyan-600 transition-colors">
                Campañas Ciudadanas
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Iniciativas de concientización para peatones, ciclistas, conductores y zonas escolares.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-cyan-600">
              Conocer campañas <ChevronRight className="w-4 h-4" />
            </span>
          </div>

        </div>
      </section>

      {/* VIANOVA Platform Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0066ff] flex items-center justify-center text-white font-black text-xl shadow-md">
            V
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
