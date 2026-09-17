import React from 'react';
import { NavigationTab, MobilityAlert } from '../types';
import { ArrowRight, Navigation, ShieldCheck, Activity, Bus, Wrench, TrafficCone, MapPin, Sparkles, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface HomeViewProps {
  onSelectTab: (tab: NavigationTab) => void;
  alerts: MobilityAlert[];
  onSelectAlert: (alert: MobilityAlert) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  alerts,
  onSelectAlert
}) => {
  return (
    <div id="vianova-home-view" className="space-y-12 pb-16 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              Plataforma de Movilidad Urbana Inteligente
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight leading-[1.15]">
              Movilidad inteligente para tu ciudad
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              Navega de forma eficiente y segura. Descubre rutas optimizadas en tiempo real, mantente informado con alertas de seguridad vial y accede a herramientas digitales diseñadas para mejorar la experiencia urbana.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="btn-hero-explore"
                onClick={() => onSelectTab('seguridad')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explorar VIANOVA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-routes"
                onClick={() => onSelectTab('rutas')}
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-sm font-bold shadow-xs transition hover:border-slate-400"
              >
                Ver rutas
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg">
              <div>
                <p className="text-2xl font-extrabold text-slate-900 font-display">12,400+</p>
                <p className="text-xs text-slate-500 font-medium">Ciclistas y Peatones</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-blue-600 font-display">99.4%</p>
                <p className="text-xs text-slate-500 font-medium">Alertas Verificadas</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-emerald-600 font-display">-32%</p>
                <p className="text-xs text-slate-500 font-medium">Incidentes en Rutas</p>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic (Simulating the modern smart mobility visual with badge) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=900&auto=format&fit=crop&q=80"
                alt="Movilidad Inteligente VIANOVA"
                className="w-full h-[360px] sm:h-[420px] object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

              {/* Floating Smart Badge overlay matching PDF page 3 */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Seguridad Vial</h4>
                    <p className="text-xs text-slate-500 font-medium">Sistemas activos en la zona urbana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estado del Sistema Section (Page 3 & 4) */}
      <section id="section-system-status" className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
            Estado del Sistema
          </h2>
          <p className="text-sm text-slate-500">
            Monitoreo en tiempo real de la red de movilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Tráfico Urbano */}
          <div 
            onClick={() => onSelectTab('rutas')}
            className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                Fluido
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
              Tráfico Urbano
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Las vías principales operan con normalidad y velocidad constante.
            </p>
          </div>

          {/* Card 2: Transporte Público */}
          <div 
            onClick={() => onSelectTab('rutas')}
            className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bus className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                98% Operativo
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
              Transporte Público
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Rutas activas y circulando en horario sin retrasos en troncales.
            </p>
          </div>

          {/* Card 3: Mantenimiento */}
          <div 
            onClick={() => onSelectTab('seguridad')}
            className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                Atención
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
              Mantenimiento
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Obras menores en Avenida Central. Posibles desvíos temporales.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Quick Pathways Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-blue-300">
              Herramientas de Planificación
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
              ¿Hacia dónde te diriges hoy?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Calcula rutas inteligentes con tres alternativas en tiempo real: la más <strong>Rápida</strong>, la más <strong>Segura</strong> con iluminación LED y ciclovías protegidas, o la <strong>Alternativa</strong> libre de peajes.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onSelectTab('rutas')}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition"
              >
                <Navigation className="w-4 h-4" />
                <span>Planificar Ruta Ahora</span>
              </button>
              <button
                onClick={() => onSelectTab('educacion')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs sm:text-sm font-bold transition"
              >
                Cursos & Evaluaciones
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Última Alerta Comunitaria</span>
            </h4>
            {alerts[0] && (
              <div 
                onClick={() => {
                  onSelectTab('seguridad');
                  onSelectAlert(alerts[0]);
                }}
                className="bg-white/10 hover:bg-white/15 p-3 rounded-xl cursor-pointer transition text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-300">{alerts[0].title}</span>
                  <span className="text-[10px] text-slate-400">{alerts[0].timeAgo}</span>
                </div>
                <p className="text-slate-300 line-clamp-2">{alerts[0].description}</p>
                <p className="text-[11px] text-blue-300 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {alerts[0].location}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
