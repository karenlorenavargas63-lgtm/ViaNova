import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { HomeHeroVisual } from './HomeHeroVisual';
import logoImg from '../assets/images/vianova_logo.png';
import { DIDACTIC_VIDEOS } from '../data/didacticSafetyData';
import { 
  ArrowRight, 
  Bus, 
  Wrench, 
  AlertTriangle,
  ShieldCheck,
  Video,
  Gamepad2,
  Megaphone,
  Trophy,
  Sparkles,
  MapPin,
  Activity,
  Clock,
  Compass,
  Car,
  Bike,
  Footprints,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  X,
  Layers,
  Eye,
  Play,
  Check,
  Award,
  HelpCircle,
  Radio,
  Zap,
  Gauge
} from 'lucide-react';

interface HomeScreenProps {
  setCurrentTab: (tab: NavigationTab) => void;
  onSelectRouteOption?: (routeId: string) => void;
}

type CasillaId = 'trafico' | 'rutas' | 'seguridad' | 'videoteca' | 'retos' | 'campanas' | 'pasaporte';

interface CasillaDef {
  id: CasillaId;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  accentBg: string;
  accentText: string;
  borderHover: string;
  targetTab: NavigationTab;
  highlightStat: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ setCurrentTab }) => {
  // Estado para la casilla activa en Inicio: a medida que el usuario entra a cada casilla, se despliega flotante
  const [activeCasilla, setActiveCasilla] = useState<CasillaId>('trafico');
  const [hasInteracted, setHasInteracted] = useState<boolean>(true);

  // Estados interactivos para widgets dentro de las casillas flotantes
  const [selectedMobilityMode, setSelectedMobilityMode] = useState<'auto' | 'bus' | 'bici' | 'peaton'>('bici');
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [quizScoreAwarded, setQuizScoreAwarded] = useState<boolean>(false);
  const [pledgeJoined, setPledgeJoined] = useState<boolean>(false);
  const [pledgeCount, setPledgeCount] = useState<number>(8420);
  const [activeTrafficCorridor, setActiveTrafficCorridor] = useState<'norte' | 'centro' | 'sur'>('centro');

  const casillas: CasillaDef[] = [
    {
      id: 'trafico',
      number: '01',
      title: 'Tráfico & Monitoreo en Tiempo Real',
      subtitle: 'Sensores en vivo, fluidez vial y semáforos sincronizados',
      icon: Gauge,
      tag: '85% Fluido',
      accentBg: 'bg-blue-600',
      accentText: 'text-blue-600',
      borderHover: 'hover:border-blue-500',
      targetTab: 'rutas',
      highlightStat: '42 km/h promedio'
    },
    {
      id: 'rutas',
      number: '02',
      title: 'Rutas & Movilidad Multimodal',
      subtitle: 'Trayectos optimizados para transporte público, auto, bici y a pie',
      icon: Compass,
      tag: 'Multimodal',
      accentBg: 'bg-sky-600',
      accentText: 'text-sky-700',
      borderHover: 'hover:border-sky-500',
      targetTab: 'rutas',
      highlightStat: '3 modos optimizados'
    },
    {
      id: 'seguridad',
      number: '03',
      title: 'Seguridad Vial & Alertas Vivas',
      subtitle: 'Incidentes reportados, obras, desvíos y prevención inmediata',
      icon: ShieldCheck,
      tag: '3 Alertas Activas',
      accentBg: 'bg-rose-600',
      accentText: 'text-rose-600',
      borderHover: 'hover:border-rose-500',
      targetTab: 'seguridad',
      highlightStat: 'Red 99.4% protegida'
    },
    {
      id: 'videoteca',
      number: '04',
      title: 'Videoteca Vial Explicada',
      subtitle: 'Videos llamativos con colores fuertes y explicaciones paso a paso',
      icon: Video,
      tag: '9 Videos Explicados',
      accentBg: 'bg-purple-600',
      accentText: 'text-purple-600',
      borderHover: 'hover:border-purple-500',
      targetTab: 'educacion',
      highlightStat: 'Colores Fuertes'
    },
    {
      id: 'retos',
      number: '05',
      title: 'Retos & Desafíos Viales',
      subtitle: 'Mini-juegos, trivias interactivas y suma de puntos en vivo',
      icon: Gamepad2,
      tag: '6 Desafíos',
      accentBg: 'bg-amber-500',
      accentText: 'text-amber-600',
      borderHover: 'hover:border-amber-500',
      targetTab: 'educacion',
      highlightStat: '+50 pts por trivia'
    },
    {
      id: 'campanas',
      number: '06',
      title: 'Campañas de Convivencia',
      subtitle: 'Iniciativas ciudadanas para salvar vidas y cero accidentes',
      icon: Megaphone,
      tag: 'Iniciativa Activa',
      accentBg: 'bg-emerald-600',
      accentText: 'text-emerald-600',
      borderHover: 'hover:border-emerald-500',
      targetTab: 'campanas',
      highlightStat: '+8,400 firmas'
    },
    {
      id: 'pasaporte',
      number: '07',
      title: 'Mi Pasaporte & Logros',
      subtitle: 'Historial de conductor, medallas desbloqueadas y score de seguridad',
      icon: Trophy,
      tag: 'Nivel Conductor',
      accentBg: 'bg-indigo-600',
      accentText: 'text-indigo-600',
      borderHover: 'hover:border-indigo-500',
      targetTab: 'perfil',
      highlightStat: '920 pts acumulados'
    }
  ];

  const handleSelectCasilla = (id: CasillaId) => {
    setActiveCasilla(id);
    setHasInteracted(true);
    // Smooth scroll to the floating details panel if needed
    const detailsElement = document.getElementById('casilla-floating-panel');
    if (detailsElement) {
      detailsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleNextCasilla = () => {
    const currentIndex = casillas.findIndex(c => c.id === activeCasilla);
    const nextIndex = (currentIndex + 1) % casillas.length;
    handleSelectCasilla(casillas[nextIndex].id);
  };

  const handlePrevCasilla = () => {
    const currentIndex = casillas.findIndex(c => c.id === activeCasilla);
    const prevIndex = (currentIndex - 1 + casillas.length) % casillas.length;
    handleSelectCasilla(casillas[prevIndex].id);
  };

  const currentCasillaObj = casillas.find(c => c.id === activeCasilla) || casillas[0];

  return (
    <div className="space-y-12 py-4 pb-24 text-slate-900 relative">
      
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0057d9]/10 text-[#0057d9] border border-blue-400/30 text-xs font-black tracking-wide animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>EXPERIENCIA FLOTANTE E INTERACTIVA POR CASILLAS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-[#0b1b3d] leading-[1.12]">
                Movilidad inteligente para tu ciudad
              </h1>
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Navega con la nueva experiencia flotante de VIANOVA. Explora cada casilla de la ciudad: tráfico en vivo, rutas multimodales, seguridad vial, videoteca explicada y retos interactivos con retroalimentación inmediata.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                id="hero-explore-btn"
                onClick={() => handleSelectCasilla('trafico')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0057d9] hover:bg-[#0047b3] text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5"
              >
                <span>Explorar Casillas Flotantes</span>
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
              Selecciona cualquier casilla para entrar y desplegar sus detalles flotantes al instante.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white/70 px-4 py-2 rounded-2xl border border-sky-300 shadow-sm w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Sensores activos: 100% operativos</span>
          </div>
        </div>

        {/* 3 Status Cards Flotantes con Click para activar la Casilla correspondiente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Tráfico Urbano */}
          <div 
            onClick={() => handleSelectCasilla('trafico')}
            className={`cursor-pointer group relative rounded-[2rem] bg-[#caeafc] border p-6 sm:p-7 transition-all duration-300 floating-elevated ${
              activeCasilla === 'trafico' 
                ? 'ring-4 ring-[#0057d9] border-[#0057d9] bg-white shadow-2xl -translate-y-2' 
                : 'border-sky-300/80 hover:border-blue-400'
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
              <div className="flex items-center gap-1.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-[#0057d9] border border-sky-300 shadow-sm">
                  Fluido
                </span>
                {activeCasilla === 'trafico' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white uppercase">
                    Abierta
                  </span>
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#0b1b3d] mb-1.5 flex items-center justify-between">
              <span>Tráfico Urbano</span>
              <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Las vías principales operan con fluidez. Toca para ver detalle del corredor.
            </p>
          </div>

          {/* Card 2: Transporte Público */}
          <div 
            onClick={() => handleSelectCasilla('rutas')}
            className={`cursor-pointer group relative rounded-[2rem] bg-[#caeafc] border p-6 sm:p-7 transition-all duration-300 floating-elevated ${
              activeCasilla === 'rutas' 
                ? 'ring-4 ring-sky-600 border-sky-600 bg-white shadow-2xl -translate-y-2' 
                : 'border-sky-300/80 hover:border-blue-400'
            }`}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#0b254a] flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform">
                <Bus className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-slate-800 border border-sky-300 shadow-sm">
                  98% Operativo
                </span>
                {activeCasilla === 'rutas' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-sky-600 text-white uppercase">
                    Abierta
                  </span>
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#0b1b3d] mb-1.5 flex items-center justify-between">
              <span>Transporte Público</span>
              <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Rutas activas y circulando en horario. Toca para calcular trayecto.
            </p>
          </div>

          {/* Card 3: Mantenimiento y Alertas */}
          <div 
            onClick={() => handleSelectCasilla('seguridad')}
            className={`cursor-pointer group relative rounded-[2rem] bg-[#b91c1c] p-6 sm:p-7 text-white transition-all duration-300 floating-elevated overflow-hidden ${
              activeCasilla === 'seguridad' 
                ? 'ring-4 ring-amber-400 shadow-2xl -translate-y-2' 
                : 'hover:bg-[#a81616]'
            }`}
          >
            <AlertTriangle className="absolute -right-4 -bottom-4 w-36 h-36 text-white/[0.08] pointer-events-none" />
            
            <div className="relative z-10 flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#b91c1c] shadow-md group-hover:scale-105 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm shadow-sm">
                  Atención
                </span>
                {activeCasilla === 'seguridad' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-900 uppercase">
                    Abierta
                  </span>
                )}
              </div>
            </div>
            <h3 className="relative z-10 text-xl font-bold text-white mb-1.5 flex items-center justify-between">
              <span>Mantenimiento & Alertas</span>
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="relative z-10 text-sm text-white/90 leading-relaxed">
              Obras menores en Av. Central. Toca para ver las 3 alertas activas.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CENTRO DE CASILLAS FLOTANTES DE INICIO                                */}
      {/* "que cuando el usuario estén en inicio le aparezcan las cosas a medida    */}
      {/* de que vaya entrando a cada casilla"                                     */}
      {/* ========================================================================= */}
      <section className="space-y-8 pt-4">
        
        {/* Cabecera del Centro de Casillas Flotantes */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-md border border-sky-300 p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0057d9] text-white text-xs font-black tracking-wider uppercase shadow-sm">
              <Layers className="w-3.5 h-3.5" />
              <span>NAVEGACIÓN MODULAR FLOTANTE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b3d] tracking-tight">
              Tablero de Casillas Flotantes VIANOVA
            </h2>
            <p className="text-slate-700 text-sm sm:text-base max-w-2xl font-normal">
              Entra a cada casilla para que la información, métricas en vivo, herramientas interactivas y videos se desplieguen de forma flotante ante ti.
            </p>
          </div>

          {/* Selector de Controles Flotantes Siguiente / Anterior */}
          <div className="flex items-center gap-2 bg-[#caeafc] p-2 rounded-2xl border border-sky-300 shrink-0 shadow-inner">
            <button
              onClick={handlePrevCasilla}
              aria-label="Casilla Anterior"
              className="p-3 rounded-xl bg-white text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm hover:scale-105 active:scale-95"
              title="Casilla anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="px-3 text-center">
              <span className="text-[10px] uppercase font-black text-slate-500 block">Casilla Actual</span>
              <span className="text-sm font-black text-[#0057d9]">
                {currentCasillaObj.number} / {String(casillas.length).padStart(2, '0')}
              </span>
            </div>
            <button
              onClick={handleNextCasilla}
              aria-label="Siguiente Casilla"
              className="p-3 rounded-xl bg-white text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm hover:scale-105 active:scale-95"
              title="Siguiente casilla"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PARRILLA DE CASILLAS INTERACTIVAS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {casillas.map((casilla) => {
            const Icon = casilla.icon;
            const isSelected = activeCasilla === casilla.id;
            return (
              <button
                key={casilla.id}
                id={`casilla-btn-${casilla.id}`}
                onClick={() => handleSelectCasilla(casilla.id)}
                className={`relative flex flex-col items-start text-left p-4 sm:p-5 rounded-3xl transition-all duration-300 floating-elevated border ${
                  isSelected
                    ? 'bg-white border-[#0057d9] ring-4 ring-blue-500/30 shadow-2xl -translate-y-2.5 z-20 scale-[1.03]'
                    : 'bg-[#caeafc]/90 border-sky-300/80 hover:bg-white hover:border-blue-400 hover:-translate-y-1'
                }`}
              >
                {/* Floating active pill tag */}
                {isSelected && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0057d9] text-white text-[9px] font-black uppercase tracking-wider shadow-md whitespace-nowrap animate-bounce">
                    Entraste Aquí
                  </span>
                )}

                <div className="w-full flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md ${casilla.accentBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-slate-400">
                    {casilla.number}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-[#0b1b3d] leading-snug line-clamp-2 mb-1">
                  {casilla.title.split('&')[0]}
                </h4>

                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full mt-auto ${
                  isSelected ? 'bg-blue-100 text-[#0057d9]' : 'bg-white/80 text-slate-600'
                }`}>
                  {casilla.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 4. PANEL FLOTANTE DESPLEGADO DINÁMICO DE LA CASILLA SELECCIONADA           */}
        {/* Aquí es donde "a medida de que el usuario vaya entrando a cada casilla     */}
        {/* le van apareciendo las cosas de forma flotante"                           */}
        {/* ========================================================================= */}
        <div
          id="casilla-floating-panel"
          className="relative rounded-[2.5rem] bg-white border-2 border-sky-300/90 shadow-[0_20px_50px_-10px_rgba(0,87,217,0.25)] p-6 sm:p-10 transition-all duration-500 animate-float-in overflow-hidden"
        >
          {/* Ambient Corner Flare matching casilla theme */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Bar of Expanded Casilla */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-sky-200 gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${currentCasillaObj.accentBg} flex items-center justify-center text-white shadow-lg shrink-0 animate-float-gentle`}>
                <currentCasillaObj.icon className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Casilla Activa • {currentCasillaObj.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
                    ● En Pantalla
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b3d]">
                  {currentCasillaObj.title}
                </h3>
                <p className="text-slate-600 text-sm mt-0.5">
                  {currentCasillaObj.subtitle}
                </p>
              </div>
            </div>

            {/* Quick Action to Full View & Close */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentTab(currentCasillaObj.targetTab)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0057d9] hover:bg-[#0047b3] text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-105"
              >
                <span>Ir a pantalla completa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CONTENIDO FLOTANTE ESPECÍFICO SEGÚN LA CASILLA ACTIVA */}
          
          {/* ------------------------------------------------------------- */}
          {/* CASILLA 1: TRÁFICO EN TIEMPO REAL                             */}
          {/* ------------------------------------------------------------- */}
          {activeCasilla === 'trafico' && (
            <div className="space-y-8 animate-float-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Metric 1 */}
                <div className="p-6 rounded-3xl bg-[#caeafc] border border-sky-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Aforo General</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-extrabold">Fluido</span>
                  </div>
                  <p className="text-3xl font-black text-[#0b1b3d]">85%</p>
                  <p className="text-xs text-slate-600">Circulación vehicular despejada en ejes primarios.</p>
                </div>

                {/* Metric 2 */}
                <div className="p-6 rounded-3xl bg-[#caeafc] border border-sky-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Velocidad Promedio</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-extrabold">Óptima</span>
                  </div>
                  <p className="text-3xl font-black text-[#0b1b3d]">42 km/h</p>
                  <p className="text-xs text-slate-600">Tiempos de recorrido estables sin trancones mayores.</p>
                </div>

                {/* Metric 3 */}
                <div className="p-6 rounded-3xl bg-[#caeafc] border border-sky-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Semáforos Inteligentes</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-extrabold">Onda Verde</span>
                  </div>
                  <p className="text-3xl font-black text-[#0b1b3d]">142 Nodos</p>
                  <p className="text-xs text-slate-600">Sincronización adaptativa según flujo en vivo.</p>
                </div>

              </div>

              {/* Interactive Corridors Monitor */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Monitoreo de Corredores Viales</span>
                    <h4 className="text-xl font-bold text-white">Selecciona una arteria para ver su velocidad en vivo</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {(['norte', 'centro', 'sur'] as const).map((corridor) => (
                      <button
                        key={corridor}
                        onClick={() => setActiveTrafficCorridor(corridor)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                          activeTrafficCorridor === corridor 
                            ? 'bg-[#0057d9] text-white shadow-md' 
                            : 'bg-white/10 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        Corredor {corridor}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400">Arteria Principal Seleccionada</p>
                    <h5 className="text-lg font-bold text-white">
                      {activeTrafficCorridor === 'norte' && 'Autopista Norte • Corredor Industrial'}
                      {activeTrafficCorridor === 'centro' && 'Avenida Central • Corredor Cívico y Bancario'}
                      {activeTrafficCorridor === 'sur' && 'Carrera 7 Sur • Corredor Residencial y Comercial'}
                    </h5>
                    <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      Sin incidentes graves reportados en este momento.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Tiempo estimado cruce</span>
                      <span className="text-xl font-black text-amber-300">
                        {activeTrafficCorridor === 'norte' ? '12 min' : activeTrafficCorridor === 'centro' ? '8 min' : '15 min'}
                      </span>
                    </div>
                    <button
                      onClick={() => setCurrentTab('rutas')}
                      className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm"
                    >
                      Ver en mapa interactivo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* CASILLA 2: RUTAS Y MOVILIDAD MULTIMODAL                       */}
          {/* ------------------------------------------------------------- */}
          {activeCasilla === 'rutas' && (
            <div className="space-y-8 animate-float-in">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#caeafc] border border-sky-300 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-black text-[#0057d9] uppercase tracking-wider">Simulador de Trayectos Flotante</span>
                    <h4 className="text-xl font-bold text-[#0b1b3d]">Elige tu medio de transporte favorito</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-white/80 px-3 py-1.5 rounded-xl border border-sky-300">
                    Punto Central ➔ Destino Ciudadano
                  </span>
                </div>

                {/* Mobility Mode Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'bici', label: 'Bicicleta', icon: Bike, time: '14 min', stat: 'Ciclovía 100% protegida', co2: '0g CO2' },
                    { id: 'bus', label: 'Transporte Público', icon: Bus, time: '19 min', stat: 'Frecuencia cada 4 min', co2: 'Baja huella' },
                    { id: 'auto', label: 'Vehículo', icon: Car, time: '18 min', stat: 'Flujo fluido por carril rápido', co2: '2.1 kg CO2' },
                    { id: 'peaton', label: 'Caminata', icon: Footprints, time: '32 min', stat: 'Aceras amplias e iluminadas', co2: 'Saludable' },
                  ].map((mode) => {
                    const Icon = mode.icon;
                    const isModeSelected = selectedMobilityMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setSelectedMobilityMode(mode.id as any)}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          isModeSelected
                            ? 'bg-white border-[#0057d9] ring-2 ring-[#0057d9] shadow-md -translate-y-1'
                            : 'bg-white/60 border-sky-200 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-6 h-6 ${isModeSelected ? 'text-[#0057d9]' : 'text-slate-600'}`} />
                          <span className="text-xs font-black text-slate-800">{mode.time}</span>
                        </div>
                        <p className="text-sm font-bold text-[#0b1b3d]">{mode.label}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{mode.stat}</p>
                        <span className="inline-block mt-2 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                          {mode.co2}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-2xl bg-white border border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0057d9] flex items-center justify-center shrink-0 font-bold">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">Ruta Recomendada Seleccionada</p>
                      <h5 className="text-sm font-black text-[#0b1b3d]">
                        {selectedMobilityMode === 'bici' && 'Corredor Verde Laureles y Parque de los Pies Descalzos'}
                        {selectedMobilityMode === 'bus' && 'Línea Troncal Metroplús con integración directa'}
                        {selectedMobilityMode === 'auto' && 'Avenida Las Palmas por carril express'}
                        {selectedMobilityMode === 'peaton' && 'Paseo Peatonal Bolívar con pasos cebrados prioritarios'}
                      </h5>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentTab('rutas')}
                    className="px-6 py-2.5 rounded-xl bg-[#0057d9] text-white font-bold text-xs hover:bg-[#0047b3] transition-colors shadow-md whitespace-nowrap"
                  >
                    Navegar esta ruta ahora
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* CASILLA 3: SEGURIDAD VIAL Y ALERTAS                           */}
          {/* ------------------------------------------------------------- */}
          {activeCasilla === 'seguridad' && (
            <div className="space-y-6 animate-float-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Alert Item 1 */}
                <div className="p-5 rounded-3xl bg-amber-50 border border-amber-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-800 uppercase px-2 py-0.5 rounded-full bg-amber-200">Precaución</span>
                    <Clock className="w-4 h-4 text-amber-700" />
                  </div>
                  <h5 className="text-base font-bold text-amber-950">Mantenimiento de Señalización</h5>
                  <p className="text-xs text-amber-800">Cuadrilla vial repintando cruces peatonales en Av. Central. Reducción a 30 km/h.</p>
                </div>

                {/* Alert Item 2 */}
                <div className="p-5 rounded-3xl bg-blue-50 border border-blue-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-800 uppercase px-2 py-0.5 rounded-full bg-blue-200">Asistencia</span>
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                  </div>
                  <h5 className="text-base font-bold text-blue-950">Patrulla de Convivencia Activa</h5>
                  <p className="text-xs text-blue-800">Agentes pedagógicos en Glorieta de la 80 orientando a ciclistas y peatones.</p>
                </div>

                {/* Alert Item 3 */}
                <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-800 uppercase px-2 py-0.5 rounded-full bg-emerald-200">Zona Protegida</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <h5 className="text-base font-bold text-emerald-950">Corredor Escolar Seguro</h5>
                  <p className="text-xs text-emerald-800">Zona escolar con límite estricto de 30 km/h y cámaras de conteo vial activas.</p>
                </div>

              </div>

              {/* Regla de Oro Destacada en la Casilla */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-900 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-amber-300 uppercase tracking-widest">Regla de Oro Inquebrantable de Hoy</span>
                    <h4 className="text-lg font-bold text-white">Distancia de Seguridad: Aplica siempre la Regla de los 3 Segundos</h4>
                    <p className="text-xs text-slate-300">En calzada húmeda o lluvia, duplica a 6 segundos para evitar colisiones por alcance.</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentTab('seguridad')}
                  className="px-6 py-3 rounded-2xl bg-white text-rose-900 font-bold text-xs hover:bg-rose-50 transition-colors shadow-md whitespace-nowrap"
                >
                  Abrir Panel de Seguridad Vial
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* CASILLA 4: VIDEOTECA VIAL EXPLICADA (COLORES FUERTES)         */}
          {/* ------------------------------------------------------------- */}
          {activeCasilla === 'videoteca' && (
            <div className="space-y-6 animate-float-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black text-purple-700 uppercase tracking-wider">Cápsulas en Video Explicadas</span>
                  <h4 className="text-xl font-extrabold text-[#0b1b3d]">Explicaciones Didácticas con Colores Fuertes y Puntos Clave</h4>
                </div>
                <button
                  onClick={() => setCurrentTab('educacion')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 transition-colors shadow-md"
                >
                  <span>Ver los 9 Videos Explicados</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Video Cards Grid preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {DIDACTIC_VIDEOS.slice(0, 3).map((video) => (
                  <div 
                    key={video.id}
                    onClick={() => setCurrentTab('educacion')}
                    className="cursor-pointer group rounded-3xl bg-[#caeafc] border border-sky-300 p-5 space-y-3.5 hover:shadow-xl hover:border-purple-400 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Strong Color Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black text-white shadow-sm ${
                          video.topic === 'Prevención' ? 'bg-rose-600' :
                          video.topic === 'Tráfico' ? 'bg-amber-600' :
                          video.topic === 'Tránsito' ? 'bg-blue-600' : 'bg-emerald-600'
                        }`}>
                          {video.topic}
                        </span>
                        <span className="text-xs font-bold text-slate-500 bg-white/80 px-2.5 py-0.5 rounded-md">
                          {video.duration}
                        </span>
                      </div>

                      <h5 className="text-base font-extrabold text-[#0b1b3d] group-hover:text-purple-700 transition-colors line-clamp-2">
                        {video.title}
                      </h5>

                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                        {video.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-sky-200 flex items-center justify-between">
                      <span className="text-[11px] font-black text-purple-700">
                        {video.highlightTag}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                        <span>Ver video</span>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* CASILLA 5: RETOS & DESAFÍOS VIALES (MINI-QUIZ INTERACTIVO)    */}
          {/* ------------------------------------------------------------- */}
          {activeCasilla === 'retos' && (
            <div className="space-y-6 animate-float-in">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-lg space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md font-bold">
                      <Gamepad2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-amber-800 uppercase tracking-wider">Trivia Vial Rápida en Vivo</span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-amber-950">
                        ¿Quién tiene la máxima prioridad en una intersección sin semáforo?
                      </h4>
                    </div>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-amber-200 text-amber-900 text-xs font-black tracking-wide shrink-0">
                    +50 Puntos VIANOVA
                  </div>
                </div>

                {/* Interactive Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 0, text: 'El peatón que se dispone a cruzar', isCorrect: true },
                    { id: 1, text: 'El vehículo más rápido o de mayor tamaño', isCorrect: false },
                    { id: 2, text: 'El conductor que toque la bocina primero', isCorrect: false },
                  ].map((option) => {
                    const isSelected = quizAnswered === option.id;
                    let btnStyle = 'bg-white border-amber-200 text-slate-800 hover:border-amber-400';
                    if (quizAnswered !== null) {
                      if (option.isCorrect) {
                        btnStyle = 'bg-emerald-500 border-emerald-600 text-white font-bold ring-2 ring-emerald-400';
                      } else if (isSelected && !option.isCorrect) {
                        btnStyle = 'bg-rose-500 border-rose-600 text-white font-bold';
                      }
                    }

                    return (
                      <button
                        key={option.id}
                        disabled={quizAnswered !== null}
                        onClick={() => {
                          setQuizAnswered(option.id);
                          if (option.isCorrect) {
                            setQuizScoreAwarded(true);
                          }
                        }}
                        className={`p-4 rounded-2xl border text-left text-sm font-semibold transition-all duration-200 shadow-sm ${btnStyle}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs uppercase font-black opacity-80">Opción {String.fromCharCode(65 + option.id)}</span>
                          {quizAnswered !== null && option.isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                          {quizAnswered !== null && isSelected && !option.isCorrect && <XCircle className="w-4 h-4 text-white" />}
                        </div>
                        <p>{option.text}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Banner */}
                {quizAnswered !== null && (
                  <div className={`p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-float-in ${
                    quizAnswered === 0 ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-rose-100 text-rose-950 border border-rose-300'
                  }`}>
                    <div className="space-y-0.5">
                      <p className="text-sm font-extrabold flex items-center gap-2">
                        {quizAnswered === 0 ? '🎉 ¡Respuesta Correcta! (+50 pts ganados)' : '⚠️ Recuerda la Pirámide de la Movilidad'}
                      </p>
                      <p className="text-xs">
                        La ley y la pirámide sitúan al peatón en la cúspide. Todo conductor debe ceder el paso preventivamente.
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentTab('educacion')}
                      className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold whitespace-nowrap shadow-md transition-colors"
                    >
                      Jugar más retos viales
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* CASILLA 6: CAMPAÑAS CIUDADANAS Y CONVIVENCIA                  */}
          {/* ------------------------------------------------------------- */}
          {activeCasilla === 'campanas' && (
            <div className="space-y-6 animate-float-in">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Campaña Activa VIANOVA</span>
                    <h4 className="text-2xl font-black text-white">«Baja la Velocidad, Salva Vidas en Ciudad»</h4>
                    <p className="text-xs text-slate-300 max-w-xl mt-1">
                      A 30 km/h el riesgo de fatalidad peatonal es menor al 10%. A 50 km/h supera el 85%. Tu prudencia salva familias.
                    </p>
                  </div>
                  <div className="text-right bg-white/10 p-4 rounded-2xl border border-white/10 shrink-0">
                    <span className="text-xs text-slate-300 block">Ciudadanos Comprometidos</span>
                    <span className="text-2xl font-black text-emerald-400">{pledgeCount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-sm font-bold">Compromiso por la Convivencia Vial</p>
                      <p className="text-xs text-slate-300">Respetar cebras peatonales, no usar celular al volante y cuidar a ciclistas.</p>
                    </div>
                  </div>
                  <button
                    disabled={pledgeJoined}
                    onClick={() => {
                      setPledgeJoined(true);
                      setPledgeCount(prev => prev + 1);
                    }}
                    className={`px-6 py-3 rounded-xl font-bold text-xs transition-all shadow-md whitespace-nowrap ${
                      pledgeJoined
                        ? 'bg-emerald-500 text-white cursor-default'
                        : 'bg-white text-emerald-950 hover:bg-emerald-50'
                    }`}
                  >
                    {pledgeJoined ? '✓ Ya firmaste el compromiso (+20 pts)' : 'Sumar mi compromiso ciudadano (+20 pts)'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* CASILLA 7: MI PASAPORTE Y LOGROS                              */}
          {/* ------------------------------------------------------------- */}
          {activeCasilla === 'pasaporte' && (
            <div className="space-y-6 animate-float-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Metric 1 */}
                <div className="p-6 rounded-3xl bg-[#caeafc] border border-sky-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Nivel de Conductor</span>
                    <Award className="w-4 h-4 text-[#0057d9]" />
                  </div>
                  <p className="text-2xl font-black text-[#0b1b3d]">Ciudadano Ejemplar</p>
                  <p className="text-xs text-slate-600">Puntaje de seguridad vial: 94 / 100.</p>
                </div>

                {/* Metric 2 */}
                <div className="p-6 rounded-3xl bg-[#caeafc] border border-sky-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Puntos Acumulados</span>
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-2xl font-black text-amber-600">{920 + (quizScoreAwarded ? 50 : 0) + (pledgeJoined ? 20 : 0)} pts</p>
                  <p className="text-xs text-slate-600">Por completar trivias, respetar límites y reportes útiles.</p>
                </div>

                {/* Metric 3 */}
                <div className="p-6 rounded-3xl bg-[#caeafc] border border-sky-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Medallas Desbloqueadas</span>
                    <Trophy className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="text-2xl font-black text-purple-700">4 Insignias</p>
                  <p className="text-xs text-slate-600">Puntualidad, Cero Infracciones, Eco-Movilidad, Embajador.</p>
                </div>

              </div>

              <div className="p-4 rounded-2xl bg-white border border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#0b1b3d]">Siguiente Medalla: «Héroe de la Convivencia Vial»</h5>
                    <p className="text-xs text-slate-500">Completa 2 retos más en la sección de educación para desbloquearla.</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentTab('perfil')}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-md whitespace-nowrap"
                >
                  Ver Mi Perfil Completo
                </button>
              </div>
            </div>
          )}

          {/* Bottom Navigation between Casillas */}
          <div className="pt-8 mt-8 border-t border-sky-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevCasilla}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#caeafc] hover:bg-white text-slate-800 text-xs font-bold border border-sky-300 transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Casilla Anterior</span>
              </button>
              <button
                onClick={handleNextCasilla}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Siguiente Casilla</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">¿Quieres explorar todo el ecosistema?</span>
              <button
                onClick={() => setCurrentTab('rutas')}
                className="px-4 py-2 rounded-xl bg-white text-[#0057d9] text-xs font-extrabold border border-sky-300 hover:bg-blue-50 transition-colors shadow-sm"
              >
                Ir a Rutas y Navegación
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. CALLOUT DE PLATAFORMA INTEGRAL VIANOVA                                 */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 floating-elevated">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white p-1 border border-white/20 shadow-lg shrink-0 flex items-center justify-center animate-float-gentle">
            <img 
              src={logoImg} 
              alt="Logo VIANOVA" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-400 font-bold">Red Inteligente de Movilidad Urbana</p>
            <h4 className="text-base font-bold text-white">VIANOVA — Plataforma Integral de Convivencia y Seguridad Vial</h4>
            <p className="text-xs text-slate-400">Innovación tecnológica, casillas interactivas y prevención en tiempo real para todos los actores viales</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentTab('nosotros')}
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-colors whitespace-nowrap shadow-sm hover:scale-105"
        >
          Conocer más sobre nosotros
        </button>
      </div>

    </div>
  );
};
