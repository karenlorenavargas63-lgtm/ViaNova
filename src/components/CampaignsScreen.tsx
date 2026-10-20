import React, { useState, useEffect, useRef } from 'react';
import { SafetyCampaign, NavigationTab } from '../types';
import { mockCampaigns } from '../data/mockData';
import { getCampaignRecommendations, KeyRecommendation } from '../data/safetyRecommendations';
import { RecommendationLogo } from './RecommendationLogo';
import { 
  Megaphone, 
  Share2, 
  Eye, 
  CheckCircle2, 
  Footprints, 
  Bike, 
  Car, 
  GraduationCap, 
  Moon, 
  Cpu, 
  X, 
  Check, 
  Sparkles,
  ArrowRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ShieldCheck,
  AlertTriangle,
  Gauge,
  Award,
  Search,
  RotateCcw,
  Radio,
  FileText,
  Sliders,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface CampaignsScreenProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const CampaignsScreen: React.FC<CampaignsScreenProps> = ({ onNavigate }) => {
  const [campaigns] = useState<SafetyCampaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<SafetyCampaign | null>(null);
  const [activeTabModal, setActiveTabModal] = useState<'audiovisual' | 'infografia' | 'senalizacion' | 'simulador'>('audiovisual');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [heroIndex, setHeroIndex] = useState<number>(0);

  // Audio speech narration state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Simulator states
  // 1. Crosswalk SafeCross
  const [crosswalkActive, setCrosswalkActive] = useState<boolean>(false);
  const [crosswalkTimer, setCrosswalkTimer] = useState<number>(0);

  // 2. Bike distance slider
  const [bikeDistance, setBikeDistance] = useState<number>(1.5);

  // 3. Distraction calculator
  const [distractionSpeed, setDistractionSpeed] = useState<number>(60);
  const [distractionTime, setDistractionTime] = useState<number>(5);

  // 4. School speed
  const [schoolSpeed, setSchoolSpeed] = useState<number>(20);

  // 5. Night visibility mode
  const [nightMode, setNightMode] = useState<'oscura' | 'clara' | 'reflectivo'>('reflectivo');

  // 6. Smart signals wave
  const [waveActive, setWaveActive] = useState<boolean>(false);

  // Civic commitment checklist
  const [commitments, setCommitments] = useState<Record<string, boolean>>({});
  const [signedBadge, setSignedBadge] = useState<boolean>(false);

  // Cleanup speech synthesis on unmount or campaign change
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedCampaign]);

  // Handle SafeCross countdown
  useEffect(() => {
    let interval: any = null;
    if (crosswalkActive && crosswalkTimer > 0) {
      interval = setInterval(() => {
        setCrosswalkTimer((prev) => {
          if (prev <= 1) {
            setCrosswalkActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [crosswalkActive, crosswalkTimer]);

  const handleToggleAudio = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('La síntesis de voz no está soportada en este navegador.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleShare = (campaign: SafetyCampaign) => {
    const text = `🚨 Campaña Oficial VIANOVA: "${campaign.title}" (${campaign.hashtag || '#MuéveteSeguroVIANOVA'}). Movilidad Inteligente y Seguridad Vial: ${window.location.href}`;
    navigator.clipboard?.writeText?.(text);
    setCopiedId(campaign.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const getCampaignIcon = (type: string) => {
    switch (type) {
      case 'peatones':
        return Footprints;
      case 'micromovilidad':
        return Bike;
      case 'conductores':
        return Car;
      case 'escolar':
        return GraduationCap;
      case 'nocturno':
        return Moon;
      case 'infraestructura':
        return Cpu;
      default:
        return Megaphone;
    }
  };

  const categories = [
    { id: 'todos', label: 'Todas las Campañas', icon: Megaphone },
    { id: 'peatones', label: 'Peatones & Cruces', icon: Footprints },
    { id: 'micromovilidad', label: 'Ciclovías & Bicis', icon: Bike },
    { id: 'conductores', label: 'Conductores & Visión Cero', icon: Car },
    { id: 'escolar', label: 'Zonas Escolares', icon: GraduationCap },
    { id: 'nocturno', label: 'Visibilidad Nocturna', icon: Moon },
    { id: 'infraestructura', label: 'Semáforos IoT', icon: Cpu },
  ];

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesCategory = selectedCategory === 'todos' || camp.targetType === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (camp.hashtag && camp.hashtag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      camp.targetCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const heroCampaign = campaigns[heroIndex] || campaigns[0];

  const handleNextCampaign = () => {
    if (!selectedCampaign) return;
    const currentIndex = campaigns.findIndex((c) => c.id === selectedCampaign.id);
    const nextIndex = (currentIndex + 1) % campaigns.length;
    setSelectedCampaign(campaigns[nextIndex]);
    if (isPlayingAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
    }
  };

  const handlePrevCampaign = () => {
    if (!selectedCampaign) return;
    const currentIndex = campaigns.findIndex((c) => c.id === selectedCampaign.id);
    const prevIndex = (currentIndex - 1 + campaigns.length) % campaigns.length;
    setSelectedCampaign(campaigns[prevIndex]);
    if (isPlayingAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
    }
  };

  // Distance blind calculation for Distraction Simulator
  const blindMeters = Math.round(((distractionSpeed * 1000) / 3600) * distractionTime * 10) / 10;

  return (
    <div className="space-y-12 py-4 pb-24 animate-fade-in text-slate-900">
      
      {/* 1. BRAND IDENTITY & HERO HEADER */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs">
          <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
          VIANOVA Content Network • Movilidad Inteligente y Seguridad Vial
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
          Campañas Digitales de <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 bg-clip-text text-transparent">Tránsito Inteligente</span>
        </h1>
        
        <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium max-w-3xl mx-auto">
          Iniciativas multimedia interactivas diseñadas por VIANOVA para transformar la convivencia vial mediante tecnología de sensores, señalización reglamentaria y educación ciudadana.
        </p>

        {/* Brand Hashtag Marquee Banner */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {['#MuéveteSeguroVIANOVA', '#CrucesSegurosVIANOVA', '#RespetaEl1yMedio', '#CeroCelularAlVolante', '#EscuelaSegura20kmh', '#HazteVisibleDeNoche', '#TránsitoFluidoVIANOVA'].map((tag) => (
            <span
              key={tag}
              onClick={() => {
                navigator.clipboard?.writeText?.(tag);
                alert(`Hashtag copiado: ${tag}`);
              }}
              className="px-3 py-1 rounded-full bg-white/80 hover:bg-blue-50 border border-sky-300 text-xs font-bold text-blue-800 cursor-pointer shadow-xs hover:border-blue-500 transition-all"
              title="Click para copiar hashtag de campaña"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 2. HERO SPOTLIGHT: INTERACTIVE CAMPAIGN HIGHLIGHT */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a193b] via-[#0d2a5c] to-[#04336c] text-white shadow-2xl border border-blue-400/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Column: Content, Brand Tag, Infographic Metric & CTAs */}
          <div className="p-6 sm:p-10 lg:col-span-7 space-y-6 z-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {heroCampaign.brandTag || 'Iniciativa Oficial VIANOVA'}
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold">
                {heroCampaign.targetCategory}
              </span>
              <span className="text-xs font-medium text-cyan-200/80">
                {heroCampaign.hashtag}
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                {heroCampaign.title}
              </h2>
              <p className="text-base sm:text-lg text-cyan-200 font-bold mt-1">
                {heroCampaign.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {heroCampaign.description}
            </p>

            {/* Quick Infographic Callout in Hero */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div>
                <p className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">Métrica de Impacto</p>
                <p className="text-xl sm:text-2xl font-black text-white mt-0.5">{heroCampaign.infographic?.keyMetric || heroCampaign.stats.split(' ')[0]}</p>
                <p className="text-xs text-slate-300 leading-tight mt-0.5">{heroCampaign.infographic?.metricLabel || heroCampaign.stats}</p>
              </div>
              <div className="border-l border-white/10 pl-3">
                <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Señal Vial Oficial</p>
                <p className="text-sm sm:text-base font-black text-white mt-0.5">{heroCampaign.signage?.code} • {heroCampaign.signage?.name}</p>
                <p className="text-xs text-slate-300 leading-tight mt-0.5">{heroCampaign.signage?.type}</p>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  setSelectedCampaign(heroCampaign);
                  setActiveTabModal('audiovisual');
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <Eye className="w-4 h-4" />
                <span>Explorar Campaña Completa</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCampaign(heroCampaign);
                  setActiveTabModal('simulador');
                }}
                className="px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-cyan-300" />
                <span>Probar Simulador</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Real Mobility Photography */}
          <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative overflow-hidden">
            <img
              src={heroCampaign.image}
              alt={heroCampaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0a193b] via-[#0a193b]/40 to-transparent"></div>
            
            {/* Cycle through hero spotlight */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <span className="text-xs font-bold text-slate-300">Campaña {heroIndex + 1} de {campaigns.length}</span>
              <button
                onClick={() => setHeroIndex((prev) => (prev - 1 + campaigns.length) % campaigns.length)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                title="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setHeroIndex((prev) => (prev + 1) % campaigns.length)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                title="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. NAVIGATION & CATEGORY FILTERING */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-blue-500/30 shadow-md scale-102'
                      : 'bg-white hover:bg-blue-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tema vial o señal..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. CAMPAIGN CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredCampaigns.map((camp) => {
          const Icon = getCampaignIcon(camp.targetType);
          const isCopied = copiedId === camp.id;

          return (
            <div
              key={camp.id}
              className="group rounded-3xl bg-white border-2 border-slate-200 shadow-lg shadow-slate-200/50 overflow-hidden flex flex-col justify-between hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                {/* Real Mobility Image with Overlay Elements */}
                <div className="h-52 w-full relative overflow-hidden bg-slate-900">
                  <img
                    src={camp.image}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-black text-cyan-300 shadow-md">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{camp.targetCategory}</span>
                    </div>

                    {camp.signage && (
                      <div className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 text-xs font-black tracking-wider shadow-md">
                        {camp.signage.code}
                      </div>
                    )}
                  </div>

                  {/* Bottom Brand Pill & Metric */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-bold text-cyan-200 drop-shadow-sm">{camp.brandTag}</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-600/90 font-black text-[11px] text-white">
                      {camp.infographic?.keyMetric || camp.stats.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3.5">
                  <div>
                    <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider block">
                      {camp.hashtag}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 group-hover:text-blue-700 transition-colors tracking-tight leading-snug mt-0.5">
                      {camp.title}
                    </h2>
                    <p className="text-sm text-slate-700 font-bold mt-1 leading-snug">
                      {camp.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-800 leading-relaxed font-normal">
                    {camp.description}
                  </p>

                  {/* Interactive road sign preview bar */}
                  {camp.signage && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                        {camp.signage.code}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 leading-tight truncate">{camp.signage.name}</p>
                        <p className="text-[11px] text-amber-900 font-medium leading-tight truncate">{camp.signage.meaning}</p>
                      </div>
                    </div>
                  )}

                  {/* Audiovisual Preview Indicator */}
                  {camp.audiovisual && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>{camp.audiovisual.title} ({camp.audiovisual.duration})</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Actions: Ver Campaña + Simulador + Compartir */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedCampaign(camp);
                    setActiveTabModal('audiovisual');
                  }}
                  className="flex-1 py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-1.5 hover:shadow-lg cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Campaña</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedCampaign(camp);
                    setActiveTabModal('simulador');
                  }}
                  title="Abrir Simulador de la Campaña"
                  className="py-3 px-3 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-900 border border-cyan-200 text-sm font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sliders className="w-4 h-4 text-cyan-700" />
                  <span className="hidden sm:inline">Simular</span>
                </button>

                <button
                  onClick={() => handleShare(camp)}
                  title="Compartir campaña en redes"
                  className={`p-3 rounded-xl border transition-colors shadow-xs cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  }`}
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-700" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. MULTI-TAB RICH DIGITAL CAMPAIGN MODAL */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border-2 border-slate-200 text-slate-950 shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                    {selectedCampaign.brandTag || 'Campaña Oficial VIANOVA'}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-bold text-slate-500">
                    {selectedCampaign.targetCategory}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug truncate">
                  {selectedCampaign.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handlePrevCampaign}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Campaña anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextCampaign}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Siguiente campaña"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedCampaign(null);
                    if (isPlayingAudio) {
                      window.speechSynthesis?.cancel();
                      setIsPlayingAudio(false);
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors"
                  title="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Subnavigation: 4 Digital Campaign Dimensions */}
            <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
              {[
                { id: 'audiovisual', label: '1. Audiovisual & Manifiesto', icon: Volume2 },
                { id: 'infografia', label: '2. Infografía & Datos', icon: FileText },
                { id: 'senalizacion', label: '3. Señalización & Guías', icon: AlertTriangle },
                { id: 'simulador', label: '4. Simulador Interactivo', icon: Sliders },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTabModal === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabModal(tab.id as any)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body Container */}
            <div className="p-6 sm:p-8 space-y-6">

              {/* TAB 1: AUDIOVISUAL & MANIFIESTO */}
              {activeTabModal === 'audiovisual' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Audiovisual Interactive Player */}
                  <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 text-white shadow-xl">
                    <div className="h-64 sm:h-80 w-full relative">
                      <img
                        src={selectedCampaign.image}
                        alt={selectedCampaign.title}
                        className="w-full h-full object-cover opacity-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                      {/* Brand Watermark */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-black text-cyan-300">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>VIANOVA Media Studio</span>
                      </div>

                      {/* Center Play Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <button
                          onClick={() => handleToggleAudio(selectedCampaign.audiovisual?.scriptAudio || selectedCampaign.fullContent)}
                          className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer"
                          title={isPlayingAudio ? 'Pausar audio' : 'Reproducir locución de la campaña'}
                        >
                          {isPlayingAudio ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                        </button>
                        <p className="text-white font-extrabold text-sm sm:text-base mt-3 drop-shadow-md">
                          {isPlayingAudio ? 'Reproduciendo Locución Didáctica VIANOVA' : 'Escuchar Locución de la Campaña'}
                        </p>
                        <span className="text-xs text-cyan-200 mt-0.5">
                          {selectedCampaign.audiovisual?.duration || '1:45 min'} • Audio en español
                        </span>
                      </div>

                      {/* Sound Waveform Visualizer */}
                      {isPlayingAudio && (
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-1">
                          {[20, 45, 80, 60, 30, 90, 75, 40, 85, 50, 70, 95, 40, 60, 85, 30].map((h, i) => (
                            <div
                              key={i}
                              className="w-1.5 bg-cyan-400 rounded-full animate-pulse"
                              style={{ height: `${h * 0.3}px`, animationDelay: `${i * 0.08}s` }}
                            ></div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Audio Player Controls Bar */}
                    <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleAudio(selectedCampaign.audiovisual?.scriptAudio || selectedCampaign.fullContent)}
                          className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white"
                        >
                          {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">
                            {selectedCampaign.audiovisual?.title || 'Cápsula Digital VIANOVA'}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {selectedCampaign.audiovisual?.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-cyan-300">
                          {isPlayingAudio ? 'EN VIVO' : 'LISTO'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Transcript / Guión de la Campaña */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Guión y Mensaje Central de la Campaña
                    </h4>
                    <p className="text-sm text-slate-800 leading-relaxed italic">
                      "{selectedCampaign.audiovisual?.scriptAudio || selectedCampaign.fullContent}"
                    </p>
                  </div>

                  {/* Manifiesto Completo */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Manifiesto y Contexto Urbano VIANOVA
                    </h4>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                      {selectedCampaign.fullContent}
                    </p>
                  </div>

                </div>
              )}

              {/* TAB 2: INFOGRAFÍA & DATOS */}
              {activeTabModal === 'infografia' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Infographic Banner */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white space-y-5 shadow-lg">
                    <div className="flex items-center justify-between border-b border-white/15 pb-3">
                      <div>
                        <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                          Infografía Oficial de Tránsito
                        </span>
                        <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                          {selectedCampaign.infographic?.headline || 'Métricas y Flujo Vial'}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl sm:text-4xl font-black text-cyan-400">
                          {selectedCampaign.infographic?.keyMetric || '-50%'}
                        </span>
                        <span className="text-[11px] block text-cyan-200 font-medium">Impacto Comprobado</span>
                      </div>
                    </div>

                    {/* Before vs After VIANOVA comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/30">
                        <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
                          <X className="w-4 h-4 text-rose-400" />
                          Antes de VIANOVA (Sin Tecnología)
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                          {selectedCampaign.infographic?.beforeVianova || 'Tráfico no regulado, sin alertas anticipadas ni mediciones en tiempo real.'}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30">
                        <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                          <Check className="w-4 h-4 text-emerald-400" />
                          Con Sensores VIANOVA SafeCross
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                          {selectedCampaign.infographic?.afterVianova || 'Detección automática en 4.5 segundos antes de que ocurra una situación crítica.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3 Steps Infographic Flow */}
                  <div className="space-y-3">
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                      Ciclo de Acción Inteligente VIANOVA (3 Fases)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedCampaign.infographic?.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-blue-500 transition-colors"
                        >
                          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                            {step.number}
                          </div>
                          <h5 className="text-sm font-black text-slate-950">{step.title}</h5>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Stats Callout */}
                  <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-950 text-sm font-bold flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-cyan-700 shrink-0" />
                    <span><strong>Métrica Global Verificada:</strong> {selectedCampaign.stats}</span>
                  </div>

                </div>
              )}

              {/* TAB 3: SEÑALIZACIÓN & GUÍAS */}
              {activeTabModal === 'senalizacion' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Official Road Sign Banner */}
                  {selectedCampaign.signage && (
                    <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
                        <div className="flex items-center gap-4">
                          {/* Traffic Sign Diamond/Circle Representation */}
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl shadow-md border-2 ${
                            selectedCampaign.signage.type === 'Reglamentaria'
                              ? 'bg-white border-rose-600 text-rose-600 rounded-full'
                              : 'bg-amber-400 border-slate-950 text-slate-950 rotate-45'
                          }`}>
                            <span className={selectedCampaign.signage.type !== 'Reglamentaria' ? '-rotate-45' : ''}>
                              {selectedCampaign.signage.code}
                            </span>
                          </div>
                          <div>
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider">
                              Señal {selectedCampaign.signage.type}
                            </span>
                            <h4 className="text-xl font-black text-slate-950 mt-1">
                              {selectedCampaign.signage.name}
                            </h4>
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-xs font-bold text-amber-900 block">Código Nacional de Tránsito</span>
                          <span className="text-xs font-black text-slate-900">{selectedCampaign.signage.fineInfo}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div className="p-3.5 rounded-xl bg-white border border-amber-200">
                          <p className="font-extrabold text-slate-950">Descripción Reglamentaria:</p>
                          <p className="text-slate-700 mt-1 leading-relaxed">{selectedCampaign.signage.description}</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white border border-amber-200">
                          <p className="font-extrabold text-slate-950">Obligación del Conductor / Actor Vial:</p>
                          <p className="text-slate-700 mt-1 leading-relaxed">{selectedCampaign.signage.meaning}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendation Cards with Official Badges */}
                  <div className="space-y-3.5">
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Protocolos Viales y Conductas Seguras Recomendadas
                    </h4>

                    <div className="grid grid-cols-1 gap-3">
                      {getCampaignRecommendations(selectedCampaign.id).map((rec: KeyRecommendation, i: number) => (
                        <div
                          key={rec.id || i}
                          className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row gap-4 items-start hover:border-blue-500 transition-all shadow-xs"
                        >
                          <RecommendationLogo
                            recommendation={rec}
                            size="lg"
                            index={i}
                            isDark={false}
                          />

                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <h5 className="text-sm sm:text-base font-black text-slate-950 leading-snug">
                                {rec.title}
                              </h5>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed pl-6">
                              {rec.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: SIMULADOR INTERACTIVO & PACTO CIUDADANO */}
              {activeTabModal === 'simulador' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Dynamic Simulator based on campaign type */}
                  <div className="p-6 rounded-3xl bg-slate-950 text-white space-y-5 border border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-cyan-400" />
                        <h4 className="text-lg sm:text-xl font-black text-white">
                          {selectedCampaign.simulator?.title || 'Simulador de Tránsito en Vivo'}
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                        Modo Interactivo
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300">
                      {selectedCampaign.simulator?.prompt}
                    </p>

                    {/* 1. Crosswalk SafeCross Simulator */}
                    {selectedCampaign.targetType === 'peatones' && (
                      <div className="space-y-4">
                        <div className="h-44 w-full rounded-2xl bg-[#1e293b] border-2 border-slate-700 relative overflow-hidden flex flex-col justify-between p-4">
                          {/* Asphalt road with zebra crossing stripes */}
                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 bg-slate-900 border-y-2 border-slate-600 flex items-center justify-center gap-3 px-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                              <div
                                key={s}
                                className={`w-8 h-16 rounded-sm transition-all duration-300 ${
                                  crosswalkActive ? 'bg-amber-300 shadow-[0_0_15px_#facc15]' : 'bg-white/80'
                                }`}
                              ></div>
                            ))}
                          </div>

                          {/* Top: Status display */}
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="text-xs font-mono text-slate-300">SENSOR VIANOVA: {crosswalkActive ? '🟢 PEATÓN DETECTADO' : '⚪ EN ESPERA'}</span>
                            <span className="text-xs font-mono text-cyan-300">BALIZAS LED: {crosswalkActive ? `ACTIVAS (${crosswalkTimer}s)` : 'APAGADAS'}</span>
                          </div>

                          {/* Bottom: Simulated cars and pedestrian */}
                          <div className="relative z-10 flex items-center justify-between">
                            <div className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${crosswalkActive ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'}`}>
                              SEMÁFORO: {crosswalkActive ? 'VERDE PEATÓN' : 'ROJO PEATÓN'}
                            </div>
                            <div className="text-xs font-bold text-slate-300">
                              VEHÍCULOS: {crosswalkActive ? '🛑 DETENIDOS ANTE LA CEBRA' : '🚗 EN CIRCULACIÓN'}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setCrosswalkActive(true);
                              setCrosswalkTimer(10);
                            }}
                            disabled={crosswalkActive}
                            className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${
                              crosswalkActive
                                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg cursor-pointer'
                            }`}
                          >
                            {crosswalkActive ? `Paso Activo (${crosswalkTimer}s)` : 'Simular Presencia de Peatón en el Bordillo'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 2. Bike 1.5m Clearance Simulator */}
                    {selectedCampaign.targetType === 'micromovilidad' && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-300">Distancia Lateral de Rebase al Ciclista:</span>
                            <span className={`text-xl font-black ${bikeDistance >= 1.5 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {bikeDistance} metros
                            </span>
                          </div>

                          <input
                            type="range"
                            min="0.5"
                            max="2.5"
                            step="0.1"
                            value={bikeDistance}
                            onChange={(e) => setBikeDistance(parseFloat(e.target.value))}
                            className="w-full accent-cyan-400 cursor-pointer"
                          />

                          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                            <span>0.5 m (Peligro Letal)</span>
                            <span className="text-cyan-400 font-bold">1.5 m (Límite Legal)</span>
                            <span>2.5 m (Óptimo)</span>
                          </div>

                          <div className={`p-3 rounded-xl text-xs font-bold transition-all ${
                            bikeDistance >= 1.5
                              ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                              : 'bg-rose-950/80 border border-rose-500/40 text-rose-300'
                          }`}>
                            {bikeDistance >= 1.5
                              ? '✅ MARGEN SEGURO: Cumples el Código de Tránsito. La succión del vehículo no desestabilizará al ciclista.'
                              : '⚠️ INFRACCIÓN CRÍTICA: Rebasar a menos de 1.5 metros puede provocar caídas graves bajo las ruedas del vehículo.'}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. Distraction / Metros a Ciegas Simulator */}
                    {selectedCampaign.targetType === 'conductores' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-300">
                              <span>Velocidad del Auto:</span>
                              <span className="text-cyan-400 font-black">{distractionSpeed} km/h</span>
                            </div>
                            <input
                              type="range"
                              min="30"
                              max="90"
                              step="5"
                              value={distractionSpeed}
                              onChange={(e) => setDistractionSpeed(parseInt(e.target.value))}
                              className="w-full accent-cyan-400 cursor-pointer"
                            />
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-300">
                              <span>Mirar Celular:</span>
                              <span className="text-amber-400 font-black">{distractionTime} segundos</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="8"
                              step="1"
                              value={distractionTime}
                              onChange={(e) => setDistractionTime(parseInt(e.target.value))}
                              className="w-full accent-amber-400 cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Resulting Metros a Ciegas */}
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950 to-red-900 border border-rose-500/40 text-center space-y-1">
                          <p className="text-xs uppercase tracking-wider font-extrabold text-rose-300">Distancia Recorrida Totalmente a Ciegas</p>
                          <p className="text-4xl sm:text-5xl font-black text-white">{blindMeters} <span className="text-2xl font-bold">metros</span></p>
                          <p className="text-xs text-rose-200">
                            Equivalente a atravesar <strong className="text-white">{Math.round((blindMeters / 10) * 10) / 10} vehículos estacionados</strong> sin ver la calzada.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 4. School Zone Speed Simulator */}
                    {selectedCampaign.targetType === 'escolar' && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-300">Selecciona velocidad en zona escolar:</span>
                          {[20, 30, 50].map((spd) => (
                            <button
                              key={spd}
                              onClick={() => setSchoolSpeed(spd)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                                schoolSpeed === spd
                                  ? 'bg-cyan-400 text-slate-950 shadow-md'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              {spd} km/h
                            </button>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                            <span className="text-[11px] font-bold text-slate-400 uppercase">Distancia de Frenado</span>
                            <p className="text-2xl font-black text-cyan-300 mt-1">
                              {schoolSpeed === 20 ? '6 metros' : schoolSpeed === 30 ? '14 metros' : '35 metros'}
                            </p>
                            <span className="text-[10px] text-slate-400">Reacción + frenado total</span>
                          </div>

                          <div className={`p-4 rounded-2xl border ${
                            schoolSpeed === 20 
                              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                              : schoolSpeed === 30
                              ? 'bg-amber-950/70 border-amber-500/40 text-amber-300'
                              : 'bg-rose-950/70 border-rose-500/40 text-rose-300'
                          }`}>
                            <span className="text-[11px] font-bold uppercase">Supervivencia Infantil</span>
                            <p className="text-2xl font-black mt-1">
                              {schoolSpeed === 20 ? '98%' : schoolSpeed === 30 ? '80%' : '15%'}
                            </p>
                            <span className="text-[10px] leading-tight block">
                              {schoolSpeed === 20 ? 'Riesgo mínimo' : schoolSpeed === 30 ? 'Lesiones moderadas' : 'Letalidad extrema'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 5. Night Visibility Simulator */}
                    {selectedCampaign.targetType === 'nocturno' && (
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {[
                            { id: 'oscura', label: 'Ropa Oscura (25 m)' },
                            { id: 'clara', label: 'Ropa Blanca (55 m)' },
                            { id: 'reflectivo', label: 'Reflectivo 360° + VIANOVA (150 m)' },
                          ].map((mode) => (
                            <button
                              key={mode.id}
                              onClick={() => setNightMode(mode.id as any)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                                nightMode === mode.id
                                  ? 'bg-cyan-400 text-slate-950 shadow-md'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              {mode.label}
                            </button>
                          ))}
                        </div>

                        <div className="h-28 w-full rounded-2xl bg-black border border-slate-700 relative overflow-hidden flex items-center px-4">
                          {/* Car headlights simulation */}
                          <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-20 bg-gradient-to-r from-amber-200/90 via-amber-200/40 to-transparent transition-all duration-500"
                            style={{
                              width: nightMode === 'oscura' ? '25%' : nightMode === 'clara' ? '50%' : '95%'
                            }}
                          ></div>

                          <div className="relative z-10 flex items-center justify-between w-full text-xs font-mono">
                            <span className="text-amber-300 font-bold">🚗 FAROS DEL CONDUCTOR</span>
                            <span className={nightMode === 'reflectivo' ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                              {nightMode === 'oscura' ? '👤 INVISIBLE (25m)' : nightMode === 'clara' ? '👤 APENAS VISIBLE (55m)' : '✨ TOTALMENTE VISIBLE A 150m'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 6. Smart Signals Wave Simulator */}
                    {selectedCampaign.targetType === 'infraestructura' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          {[1, 2, 3].map((num) => (
                            <div key={num} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-[10px] font-bold text-slate-400">Intersección {num}</span>
                              <div className="flex justify-center gap-1 my-2">
                                <span className={`w-3.5 h-3.5 rounded-full ${waveActive ? 'bg-slate-700' : 'bg-rose-500 animate-pulse'}`}></span>
                                <span className="w-3.5 h-3.5 rounded-full bg-slate-700"></span>
                                <span className={`w-3.5 h-3.5 rounded-full ${waveActive ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-slate-700'}`}></span>
                              </div>
                              <span className="text-[11px] font-mono font-bold text-cyan-300">{waveActive ? 'ONDA VERDE' : 'EN ESPERA'}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => setWaveActive(!waveActive)}
                          className={`w-full py-3 rounded-xl font-black text-sm transition-all cursor-pointer ${
                            waveActive
                              ? 'bg-emerald-500 text-slate-950 shadow-lg'
                              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                          }`}
                        >
                          {waveActive ? 'Onda Verde Activada (-34% Trancones)' : 'Sincronizar Semáforos con Algoritmo VIANOVA'}
                        </button>
                      </div>
                    )}

                  </div>

                  {/* Pacto Ciudadano de la Campaña */}
                  <div className="p-6 rounded-3xl bg-blue-50 border-2 border-blue-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                      <div>
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Compromiso Cívico</span>
                        <h4 className="text-lg font-black text-slate-950 mt-0.5">
                          Firma el Pacto Ciudadano VIANOVA
                        </h4>
                      </div>
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      Marca tus compromisos viales para generar tu certificado digital de actor vial consciente:
                    </p>

                    <div className="space-y-2.5">
                      {selectedCampaign.recommendations.map((rec, idx) => {
                        const isChecked = !!commitments[`${selectedCampaign.id}_${idx}`];
                        return (
                          <label
                            key={idx}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-blue-100/70 border-blue-400 text-blue-950'
                                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                setCommitments({
                                  ...commitments,
                                  [`${selectedCampaign.id}_${idx}`]: e.target.checked
                                });
                              }}
                              className="w-4 h-4 mt-0.5 accent-blue-600 rounded"
                            />
                            <span className="text-xs sm:text-sm font-semibold leading-snug">
                              {rec}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={() => {
                          setSignedBadge(true);
                          alert('🎉 ¡Pacto Ciudadano firmado con éxito! Has sumado puntos de seguridad vial a tu perfil VIANOVA.');
                        }}
                        className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Firmar Mi Compromiso y Obtener Insignia</span>
                      </button>

                      {signedBadge && (
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-2 rounded-xl border border-emerald-300">
                          <Check className="w-4 h-4" />
                          <span>¡Insignia Certificada Guardada!</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Modal Bottom Persistent Footer CTAs */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedCampaign)}
                  className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    copiedId === selectedCampaign.id
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedId === selectedCampaign.id ? '¡Enlace Copiado!' : 'Compartir Campaña'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                {onNavigate && (
                  <button
                    onClick={() => {
                      setSelectedCampaign(null);
                      onNavigate('rutas');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Activar Alertas en Mi Ruta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 6. GLOBAL CTA BANNER FOR SMART MOBILITY */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Movilidad Inteligente en Acción
          </div>

          <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Únete a la Red de Movilidad Más Segura con VIANOVA
          </h3>

          <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium">
            Planifica tus trayectos cotidianos, recibe alertas preventivas en tiempo real sobre cruces peatonales y ciclorrutas, y contribuye al reporte ciudadano de incidencias viales.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onNavigate && (
              <>
                <button
                  onClick={() => onNavigate('rutas')}
                  className="px-6 py-3.5 rounded-xl bg-white text-blue-900 font-black text-sm sm:text-base shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <span>Planificar Mi Próxima Ruta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('seguridad')}
                  className="px-6 py-3.5 rounded-xl bg-blue-900/40 hover:bg-blue-900/60 border border-white/20 text-white font-black text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-300" />
                  <span>Ver Seguridad Vial en Vivo</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Ambient background blur */}
        <div className="absolute right-[-10%] top-[-20%] w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none"></div>
      </div>

    </div>
  );
};
