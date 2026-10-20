import React, { useState } from 'react';
import { 
  BookOpen, 
  Car, 
  Bike, 
  Footprints, 
  AlertTriangle, 
  Wrench, 
  Activity, 
  MapPin, 
  Map, 
  SlidersHorizontal, 
  RotateCw, 
  CheckCircle2, 
  X, 
  Plus, 
  Eye,
  AlertOctagon,
  ShieldCheck,
  ArrowRight,
  Maximize2,
  Gamepad2,
  PlayCircle,
  Sparkles,
  Video,
  Play,
  Clock,
  Lightbulb,
  Award,
  Volume2
} from 'lucide-react';
import obrasMonitorImg from '../assets/images/obras_asfalto_monitor_1788438254687.jpg';
import redAlertImg from '../assets/images/red_alert_gradient_1788438272797.jpg';

// Thematic Safety Images for the 6 Culture Cards
import signsImg from '../assets/images/traffic_signs_chart_1790078148438.jpg';
import rulesImg from '../assets/images/traffic_rules_signs_grid_1790078289383.jpg';
import preventionImg from '../assets/images/prevention_shield_hand_icon_1790078674267.jpg';
import responsibleDrivingImg from '../assets/images/no_phone_driving_silhouette_1790078748593.jpg';
import motorcyclistImg from '../assets/images/motorcyclist_silhouette_icon_1790079069842.jpg';
import pedestrianImg from '../assets/images/pedestrian_signs_four_grid_1790079168489.jpg';
import { TOPIC_RECOMMENDATIONS, KeyRecommendation, getRecommendationsForTopic } from '../data/safetyRecommendations';
import { RecommendationLogo } from './RecommendationLogo';
import { ImageLightboxModal } from './ImageLightboxModal';
import { DIDACTIC_VIDEOS, DidacticVideo } from '../data/didacticSafetyData';

interface SafetyScreenProps {
  onNavigateToMapWithAlert?: (alert: any) => void;
  onNavigateToEducation?: () => void;
}

export const SafetyScreen: React.FC<SafetyScreenProps> = ({ 
  onNavigateToMapWithAlert,
  onNavigateToEducation 
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<any | null>(null);
  const [selectedSymbolIndex, setSelectedSymbolIndex] = useState<number>(0);
  const [selectedAlertForMap, setSelectedAlertForMap] = useState<any | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; category?: string } | null>(null);

  // Active playing video ID for inline playback "ahí mismo"
  const [activePlayingVideoId, setActivePlayingVideoId] = useState<string | null>(null);
  const [videoQuizAnswers, setVideoQuizAnswers] = useState<{ [videoId: string]: number }>({});
  const [videoQuizSubmitted, setVideoQuizSubmitted] = useState<{ [videoId: string]: boolean }>({});

  const handleAnswerVideoQuiz = (videoId: string, selectedIdx: number) => {
    setVideoQuizAnswers(prev => ({ ...prev, [videoId]: selectedIdx }));
    setVideoQuizSubmitted(prev => ({ ...prev, [videoId]: true }));
  };

  const getVideoColors = (topic: string) => {
    switch (topic) {
      case 'Tráfico':
        return {
          gradient: 'from-amber-500 via-orange-500 to-amber-600',
          badgeBg: 'bg-amber-500 text-slate-950 font-black',
          goldenBox: 'bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-black border border-amber-300 shadow-md',
          stepBadge: 'bg-amber-500 text-slate-950 font-black',
          btnGradient: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black shadow-md shadow-amber-500/30'
        };
      case 'Prevención':
        return {
          gradient: 'from-rose-600 via-red-600 to-pink-600',
          badgeBg: 'bg-rose-600 text-white font-black',
          goldenBox: 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white font-black border border-rose-400 shadow-md',
          stepBadge: 'bg-rose-600 text-white font-black',
          btnGradient: 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black shadow-md shadow-rose-500/30'
        };
      case 'Movilidad':
      default:
        return {
          gradient: 'from-emerald-600 via-teal-600 to-green-600',
          badgeBg: 'bg-emerald-600 text-white font-black',
          goldenBox: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-black border border-emerald-400 shadow-md',
          stepBadge: 'bg-emerald-600 text-white font-black',
          btnGradient: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black shadow-md shadow-emerald-500/30'
        };
    }
  };

  const handleOpenGuide = (card: any, symbolIdx: number = 0) => {
    setSelectedGuide(card);
    setSelectedSymbolIndex(symbolIdx);
  };

  // New report form state
  const [reportTitle, setReportTitle] = useState('');
  const [reportType, setReportType] = useState<'accidente' | 'obras' | 'trafico' | 'inundacion'>('accidente');
  const [reportLocation, setReportLocation] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Initial alerts matching Image 2 exactly
  const [alertsList, setAlertsList] = useState([
    {
      id: 'alert_1',
      title: 'Accidente múltiple',
      timeAgo: 'Hace 5 min',
      type: 'accidente',
      severity: 'critico',
      severityLabel: 'RIESGO CRÍTICO',
      badgeType: 'red',
      description: 'Colisión que involucra tres vehículos. Carril central y derecho bloqueados. Se esperan demoras significativas.',
      location: 'Av. Principal esq. Calle 14',
      image: redAlertImg,
      buttonType: 'solid',
      affectedLanes: 'Carriles central y derecho bloqueados',
      alternativeRouteSuggestion: 'Tomar Calle 12 o vía paralela al río.'
    },
    {
      id: 'alert_2',
      title: 'Mantenimiento de asfalto',
      timeAgo: '',
      type: 'obras',
      severity: 'obras',
      severityLabel: 'OBRAS VIALES',
      badgeType: 'gray',
      description: 'Trabajos de repavimentación en curso. Reducción a un solo carril de circulación.',
      location: 'Blvd. de los Insurgentes, Norte',
      image: obrasMonitorImg,
      buttonType: 'outline',
      affectedLanes: 'Reducción a un solo carril de circulación',
      alternativeRouteSuggestion: 'Usar carril lateral o desvío por Carrera 45.'
    },
    {
      id: 'alert_3',
      title: 'Congestión Vehicular',
      timeAgo: 'Hace 15 min',
      type: 'trafico',
      severity: 'denso',
      severityLabel: 'TRÁFICO DENSO',
      badgeType: 'gray',
      description: 'Avance muy lento debido al volumen de vehículos. Velocidad promedio 12 km/h.',
      location: 'Autopista Sur, Km 15',
      image: redAlertImg,
      buttonType: 'outline',
      affectedLanes: 'Todos los carriles principales lentos',
      alternativeRouteSuggestion: 'Desviarse hacia Avenida Las Vegas.'
    },
    {
      id: 'alert_4',
      title: 'Inundación en vía',
      timeAgo: 'Hace 2 min',
      type: 'inundacion',
      severity: 'critico',
      severityLabel: 'RIESGO CRÍTICO',
      badgeType: 'red',
      description: 'Acumulación severa de agua. Paso inhabilitado para vehículos ligeros. Rutas alternas recomendadas.',
      location: 'Paso a desnivel, Centro Histórico',
      image: redAlertImg,
      buttonType: 'solid',
      affectedLanes: 'Paso a desnivel completamente cerrado',
      alternativeRouteSuggestion: 'Tomar viaducto superior o San Juan.'
    }
  ]);

  // 6 Thematic cards with specific images for each road safety topic
  const cultureCards = [
    {
      id: 'senales',
      title: 'Señales',
      icon: AlertOctagon,
      image: signsImg,
      badge: 'Señalización Urbana',
      themeGradient: 'from-red-500 via-rose-600 to-red-700',
      themeGlow: 'shadow-red-500/35 ring-red-400/40',
      themeBorder: 'hover:border-red-400',
      themeBadge: 'bg-red-600 text-white',
      themeAccent: 'text-red-600',
      tagline: 'PARE • Preventivas • Informativas • Demarcación',
      description: 'Conoce el significado y la importancia de la señalización vertical y horizontal en el entorno urbano para una navegación predictiva.',
      recommendations: TOPIC_RECOMMENDATIONS.senales,
      details: [
        'Señales Reglamentarias (Rojas): Notifican prohibiciones, prioridades y límites de velocidad.',
        'Señales Preventivas (Amarillas): Advierten sobre peligros potenciales en el tramo próximo.',
        'Señales Informativas (Azules/Verdes): Guían hacia destinos estratégicos y servicios esenciales.',
        'Demarcación en Calzada: Líneas continuas, discontinuas y zonas de cruce seguro.'
      ]
    },
    {
      id: 'normas',
      title: 'Normas',
      icon: BookOpen,
      image: rulesImg,
      badge: 'Código y Reglamentos',
      themeGradient: 'from-blue-600 via-indigo-600 to-blue-800',
      themeGlow: 'shadow-blue-500/35 ring-blue-400/40',
      themeBorder: 'hover:border-blue-400',
      themeBadge: 'bg-blue-600 text-white',
      themeAccent: 'text-blue-600',
      tagline: 'Límites 50/30 • Glorietas • Casco • 0.0% Alcohol',
      description: 'Accede al reglamento de tránsito actualizado. Reglas claras estructuran un flujo vehicular ordenado y previenen incidentes.',
      recommendations: TOPIC_RECOMMENDATIONS.normas,
      details: [
        'Límites vigentes: 50 km/h en avenidas principales y 30 km/h en barrios y zonas residenciales.',
        'Prioridad en Glorietas: Tienen prelación siempre los vehículos dentro del anillo circulatorio.',
        'Cinturón y Casco Obligatorio: En todas las plazas y para todo conductor de motocicleta.',
        'Normativa Cero Alcohol: Sanciones estrictas para la preservación de la vida.'
      ]
    },
    {
      id: 'prevencion',
      title: 'Prevención',
      icon: ShieldCheck,
      image: preventionImg,
      badge: 'Anticipación del Riesgo',
      themeGradient: 'from-amber-400 via-amber-500 to-orange-600',
      themeGlow: 'shadow-amber-500/35 ring-amber-400/40',
      themeBorder: 'hover:border-amber-400',
      themeBadge: 'bg-amber-500 text-slate-950 font-black',
      themeAccent: 'text-amber-600',
      tagline: 'Revisión • Lluvia SOS • 3 Segundos • Kit SOS',
      description: 'Estrategias proactivas para identificar riesgos potenciales en tu ruta y actuar antes de que ocurran contratiempos.',
      recommendations: TOPIC_RECOMMENDATIONS.prevencion,
      details: [
        'Chequeo preoperacional: Neumáticos, frenos y luces antes de cada trayecto.',
        'Manejo con lluvia: Aumentar la distancia de frenado y reducir velocidad un 30%.',
        'Distancia de seguridad: Regla de los 3 segundos con respecto al vehículo delantero.',
        'Kit reglamentario de emergencias y botiquín vigente.'
      ]
    },
    {
      id: 'conduccion',
      title: 'Conducción responsable',
      icon: Car,
      image: responsibleDrivingImg,
      badge: 'Manejo Defensivo',
      themeGradient: 'from-emerald-500 via-teal-600 to-emerald-700',
      themeGlow: 'shadow-emerald-500/35 ring-emerald-400/40',
      themeBorder: 'hover:border-emerald-400',
      themeBadge: 'bg-emerald-600 text-white',
      themeAccent: 'text-emerald-600',
      tagline: 'Cero Celular • Direccionales 30m • 1.5m Bicis • Espejos',
      description: 'Técnicas de manejo defensivo, mantenimiento de la atención y respeto por los límites de velocidad del sistema.',
      recommendations: TOPIC_RECOMMENDATIONS.conduccion,
      details: [
        'Cero distracciones móviles: Manos libres de dispositivos mientras se opera un vehículo.',
        'Uso oportuno de direccionales con al menos 30 metros de anticipación.',
        'Cortesía y respeto al ciclista dejando 1.5 metros de distancia lateral.',
        'Monitoreo constante de espejos retrovisores y puntos ciegos.'
      ]
    },
    {
      id: 'motociclistas',
      title: 'Motociclistas',
      icon: Bike,
      image: motorcyclistImg,
      badge: 'Protección Bimodal',
      themeGradient: 'from-purple-600 via-violet-600 to-fuchsia-700',
      themeGlow: 'shadow-purple-500/35 ring-purple-400/40',
      themeBorder: 'hover:border-purple-400',
      themeBadge: 'bg-purple-600 text-white',
      themeAccent: 'text-purple-600',
      tagline: 'Casco DOT • Reflectivos • Carril Propio • Puntos Ciegos',
      description: 'Protocolos de seguridad específicos, equipamiento obligatorio y posicionamiento estratégico en la calzada.',
      recommendations: TOPIC_RECOMMENDATIONS.motociclistas,
      details: [
        'Casco integral con certificación vigente (ECE / DOT) abrochado.',
        'Prendas de alta visibilidad reflectivas y guantes con protección.',
        'Posicionamiento seguro: No transitar sobre las líneas divisorias de carril en marcha.',
        'Evitar los ángulos muertos de autobuses y camiones pesados.'
      ]
    },
    {
      id: 'peatones',
      title: 'Peatones',
      icon: Footprints,
      image: pedestrianImg,
      badge: 'Usuario Prioritario',
      themeGradient: 'from-cyan-500 via-sky-600 to-blue-600',
      themeGlow: 'shadow-cyan-500/35 ring-cyan-400/40',
      themeBorder: 'hover:border-cyan-400',
      themeBadge: 'bg-cyan-600 text-white',
      themeAccent: 'text-cyan-600',
      tagline: 'Paso Cebra • Contacto Visual • Carril Bus • EV Silente',
      description: 'Zonas seguras, cruces inteligentes y cómo interactuar de manera segura con el flujo vehicular motorizado.',
      recommendations: TOPIC_RECOMMENDATIONS.peatones,
      details: [
        'Cruces peatonales señalizados y puentes elevados como única vía de cruce.',
        'Contacto visual con conductores antes de pisar la calzada.',
        'No invadir carriles exclusivos de transporte masivo o ciclorrutas.',
        'Especial atención ante vehículos eléctricos silenciosos.'
      ]
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle || !reportLocation) return;

    const newAlert = {
      id: `alert_${Date.now()}`,
      title: reportTitle,
      timeAgo: 'Justo ahora',
      type: reportType,
      severity: reportType === 'accidente' || reportType === 'inundacion' ? 'critico' : reportType === 'obras' ? 'obras' : 'denso',
      severityLabel: reportType === 'accidente' || reportType === 'inundacion' ? 'RIESGO CRÍTICO' : reportType === 'obras' ? 'OBRAS VIALES' : 'TRÁFICO DENSO',
      badgeType: reportType === 'accidente' || reportType === 'inundacion' ? 'red' : 'gray',
      description: reportDesc || 'Reporte de la comunidad registrado en tiempo real.',
      location: reportLocation,
      image: reportType === 'obras' ? obrasMonitorImg : redAlertImg,
      buttonType: reportType === 'accidente' || reportType === 'inundacion' ? 'solid' : 'outline',
      affectedLanes: 'En verificación en terreno',
      alternativeRouteSuggestion: 'Manejar con extrema precaución en el sector.'
    };

    setAlertsList([newAlert, ...alertsList]);
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setIsReportModalOpen(false);
      setReportTitle('');
      setReportLocation('');
      setReportDesc('');
    }, 1200);
  };

  const filteredAlerts = alertsList.filter((alert) => {
    if (selectedFilter === 'todos') return true;
    return alert.type === selectedFilter;
  });

  return (
    <div className="w-full py-8 sm:py-12 space-y-20 animate-fade-in text-slate-800">
      
      {/* ========================================================================= */}
      {/* 1. PRIMERA SECCIÓN: CULTURA Y SEGURIDAD VIAL (Exactamente como Imagen 1)  */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto space-y-10">
        
        {/* Title & Subtitle */}
        <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a193b] tracking-tight">
            Cultura y Seguridad Vial
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            La seguridad en nuestras vías es responsabilidad de todos. Explora nuestras guías, normativas y consejos prácticos para garantizar trayectos seguros e inteligentes en el ecosistema urbano.
          </p>
        </div>

        {/* 6 Thematic Cards Grid with topic images & vibrant contained symbols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {cultureCards.map((card) => {
            const IconComponent = card.icon;
            const recs = card.recommendations || [];

            return (
              <div
                key={card.id}
                onClick={() => handleOpenGuide(card, 0)}
                className="group bg-white rounded-[28px] overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 hover:border-slate-300 transition-all duration-300 cursor-pointer"
              >
                <div>
                  {/* Thematic Topic Image */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (card.image) {
                        setLightboxImage({ src: card.image, title: card.title, category: card.badge });
                      }
                    }}
                    className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-100 cursor-zoom-in"
                    title="Haz clic para ver y ampliar la lámina en pantalla completa"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain bg-white p-2 sm:p-3 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />
                    
                    {/* Botón flotante para ampliar imagen */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage({ src: card.image, title: card.title, category: card.badge });
                      }}
                      className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-slate-950/85 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md border border-white/20 transition cursor-pointer z-10"
                      title="Ampliar lámina de señales a pantalla completa"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Ampliar</span>
                    </button>

                    {/* Floating Icon: Símbolo Principal Ultrallamativo con Gradiente Fuerte */}
                    {IconComponent && (
                      <div className="absolute top-3.5 right-3.5 flex flex-col items-center">
                        <div className={`w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-br ${card.themeGradient} text-white shadow-xl ${card.themeGlow} ring-3 ring-white flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          <IconComponent className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 stroke-[2.4] drop-shadow-md" />
                        </div>
                        <span className="mt-1 px-1.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[8.5px] font-black uppercase tracking-wider text-white border border-white/20 shadow-xs pointer-events-none">
                          Símbolo Oficial
                        </span>
                      </div>
                    )}

                    {/* Badge Category */}
                    <div className="absolute bottom-3 left-3.5 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5 border border-white/20 pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span>{card.badge}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 pb-4 space-y-3">
                    {/* Header: Title and Category Pill */}
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${card.themeBadge}`}>
                          {card.badge}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">
                          {recs.length} Símbolos Clave
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                        {card.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-2">
                      {card.description}
                    </p>

                    {/* SÍMBOLOS QUE CONTIENE CADA CASILLA (Llamativos en colores fuertes) */}
                    <div className="pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2 px-0.5">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                          <span>Símbolos que contiene:</span>
                        </span>
                        <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60 flex items-center gap-1">
                          <span>Toca para abrir</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>

                      {/* Cuadrícula de 4 Símbolos Oficiales con colores fuertes */}
                      <div className="grid grid-cols-4 gap-2">
                        {recs.map((rec: KeyRecommendation, rIdx: number) => (
                          <div
                            key={rec.id || rIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenGuide(card, rIdx);
                            }}
                            className="cursor-pointer"
                            title={`Toca para abrir información y significado de: ${rec.title}`}
                          >
                            <RecommendationLogo
                              recommendation={rec}
                              size="sm"
                              index={rIdx}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Abrir Información Action Button */}
                <div className="p-6 sm:p-7 pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenGuide(card, 0);
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0a193b] via-[#0b2b63] to-[#0057d9] hover:from-[#0057d9] hover:to-[#0042a6] text-white text-sm sm:text-base font-black transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg group-hover:scale-[1.01]"
                  >
                    <Eye className="w-4.5 h-4.5" />
                    <span>Abrir Información y Símbolos Clave ({recs.length})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
 
      {/* ========================================================================= */}
      {/* 🎬 SECCIÓN OFICIAL DE VIDEOS DE SEGURIDAD VIAL (REPRODUCCIÓN INMEDIATA)    */}
      {/* Exactamente 3 videos con reproducción directa ahí mismo al hacer clic      */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto space-y-6 pt-4">
        
        {/* Header de la sección de Videos */}
        <div className="bg-gradient-to-r from-[#0a193b] via-[#0f2b66] to-[#0057d9] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-white/10">
          <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-black tracking-wide border border-white/15">
                <Video className="w-4 h-4 text-rose-400" />
                <span>CÁPSULAS OFICIALES • REPRODUCCIÓN EN VIVO AHÍ MISMO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Videos de Seguridad Vial y Prevención Activa
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                Selecciona cualquiera de las 3 cápsulas oficiales de VIANOVA. <strong>El video se reproduce ahí mismo al instante</strong> para que aprendas la física del tráfico, el respeto vial y las distancias salvavidas.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white flex items-center gap-3">
                <PlayCircle className="w-6 h-6 text-rose-400 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-200 block">Catálogo Oficial</span>
                  <span className="text-base font-black">{DIDACTIC_VIDEOS.length} Videos Verificados</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rejilla de los 3 Videos con Reproducción Ahí Mismo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {DIDACTIC_VIDEOS.map((video) => {
            const colors = getVideoColors(video.topic);
            const isPlaying = activePlayingVideoId === video.id;
            const quizSelected = videoQuizAnswers[video.id];
            const isQuizSubmitted = videoQuizSubmitted[video.id];

            return (
              <div
                key={video.id}
                id={`video-card-${video.id}`}
                className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-blue-400 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Accent Top Strip with Topic Gradient */}
                  <div className={`h-2.5 w-full bg-gradient-to-r ${colors.gradient}`} />

                  {/* Reproductor de Video 16:9 - Se reproduce ahí mismo */}
                  <div className="p-3">
                    {isPlaying ? (
                      <div className="space-y-2">
                        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-rose-500 animate-fade-in">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                            title={video.title}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                        {/* Control bar below active video */}
                        <div className="flex items-center justify-between px-1 text-xs">
                          <span className="inline-flex items-center gap-1.5 text-rose-600 font-extrabold text-[11px] animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-rose-600" />
                            Reproduciendo video ahí mismo
                          </span>
                          <button
                            type="button"
                            onClick={() => setActivePlayingVideoId(null)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            Cerrar reproductor
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => setActivePlayingVideoId(video.id)}
                        className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden cursor-pointer group shadow-md"
                        title="Haz clic para reproducir este video aquí mismo"
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/35 to-transparent" />

                        {/* Floating Glow Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-115 group-hover:bg-rose-500 transition-all duration-300">
                            <Play className="w-7 h-7 fill-white text-white ml-1" />
                          </div>
                        </div>

                        {/* Floating Topic & Tags */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-black shadow-md ${colors.badgeBg}`}>
                            {video.topic}
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-300 text-[10px] font-black border border-white/10">
                            {video.highlightTag}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1 border border-white/10">
                          <Clock className="w-3.5 h-3.5 text-amber-300" />
                          <span>{video.duration}</span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white/90">
                          <span className="truncate">{video.sourceBadge}</span>
                          <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black shrink-0">
                            {video.impactMetric}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contenido Didáctico y Explicativo de la Cápsula */}
                  <div className="p-5 space-y-4">
                    
                    {/* Botón de Reproducción Inmediata */}
                    {!isPlaying ? (
                      <button
                        type="button"
                        onClick={() => setActivePlayingVideoId(video.id)}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${colors.btnGradient}`}
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Ver y Reproducir Video Aquí Mismo</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActivePlayingVideoId(null)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Detener Reproducción</span>
                      </button>
                    )}

                    {/* Título y Resumen */}
                    <div className="space-y-1.5">
                      <h3 className="text-base font-black text-slate-900 leading-snug">
                        {video.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {video.summary}
                      </p>
                    </div>

                    {/* Regla de Oro en Color Vivo */}
                    <div className={`p-3 rounded-xl ${colors.goldenBox}`}>
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="text-[9px] uppercase font-black tracking-wider block opacity-90">
                            Regla de Oro Salvavidas:
                          </span>
                          <p className="text-xs font-bold leading-tight">
                            {video.goldenRule}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 3 Pasos Clave de la Maniobra */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                        3 Pasos Clave de Seguridad:
                      </span>
                      <div className="space-y-1.5">
                        {video.solutionSteps.slice(0, 3).map((step, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 ${colors.stepBadge}`}>
                              {step.stepNumber}
                            </span>
                            <div className="min-w-0">
                              <strong className="text-slate-900 block text-[11px]">{step.title}</strong>
                              <span className="text-slate-600 text-[10px] leading-tight block line-clamp-2">{step.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Do's & Don'ts */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5 text-[11px]">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">SÍ: {video.doAndDont.dos[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-rose-800 font-bold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                        <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span className="truncate">NUNCA: {video.doAndDont.donts[0]}</span>
                      </div>
                    </div>

                    {/* Mini-Quiz Interactivo Integrado en la Tarjeta */}
                    <div className="pt-3 border-t border-slate-200 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Mini-Quiz del Video:</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">
                        {video.quizQuestion.question}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        {video.quizQuestion.options.map((option, optIdx) => {
                          const isSelected = quizSelected === optIdx;
                          const isCorrect = optIdx === video.quizQuestion.correctIndex;

                          let btnClasses = 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100';
                          if (isQuizSubmitted) {
                            if (isCorrect) {
                              btnClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-black';
                            } else if (isSelected) {
                              btnClasses = 'border-rose-400 bg-rose-50 text-rose-900';
                            } else {
                              btnClasses = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                            }
                          } else if (isSelected) {
                            btnClasses = 'border-blue-500 bg-blue-50 text-blue-900 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={isQuizSubmitted}
                              onClick={() => handleAnswerVideoQuiz(video.id, optIdx)}
                              className={`w-full p-2 rounded-xl border text-left text-[11px] transition-all flex items-center justify-between gap-2 cursor-pointer ${btnClasses}`}
                            >
                              <span>{option}</span>
                              {isQuizSubmitted && isCorrect && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              )}
                              {isQuizSubmitted && isSelected && !isCorrect && (
                                <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explicación tras responder */}
                      {isQuizSubmitted && (
                        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-[11px] leading-tight space-y-1 animate-fade-in">
                          <strong className="block text-blue-900 font-bold">
                            {quizSelected === video.quizQuestion.correctIndex ? '¡Correcto! Excelente respuesta.' : 'Explicación oficial:'}
                          </strong>
                          <p>{video.quizQuestion.explanation}</p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* BANNER INTERACTIVO: RETOS Y VIDEOS DE TRÁFICO, TRÁNSITO Y PREVENCIÓN       */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-[#0a193b] via-[#0b2b63] to-[#0057d9] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2.5 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-black tracking-wide border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NUEVO • ZONA DE DESAFÍOS Y RETOS VIALES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Aprende Jugando: Tráfico, Tránsito y Prevención Vial
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Pon a prueba tus reflejos en la <strong>Ruleta Vial A-Z</strong>, <strong>Cruce Seguro</strong>, <strong>Sopa de Letras</strong>, <strong>Memorama de Señales</strong> y nuestra sección de Videos Oficiales con explicaciones en colores fuertes y mini-evaluaciones dinámicas.
            </p>
            <div className="flex flex-wrap gap-2 pt-1.5">
              <span className="px-3 py-1 rounded-xl bg-white/10 text-white text-[11px] font-bold">🎡 Ruleta Vial A-Z</span>
              <span className="px-3 py-1 rounded-xl bg-white/10 text-white text-[11px] font-bold">🐸 Cruce Seguro</span>
              <span className="px-3 py-1 rounded-xl bg-white/10 text-white text-[11px] font-bold">🔍 Sopa de Letras</span>
              <span className="px-3 py-1 rounded-xl bg-white/10 text-white text-[11px] font-bold">🎬 Videos</span>
            </div>
          </div>

          <div className="shrink-0 relative z-10">
            <button
              type="button"
              onClick={onNavigateToEducation}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 shadow-lg hover:scale-105"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Jugar Desafíos Viales Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================================== */}
      {/* 2. SEGUNDA SECCIÓN: ALERTAS DE MOVILIDAD (Exactamente como Imagen 2)    */}
      {/* ======================================================================== */}
      <section className="max-w-6xl mx-auto space-y-6 pt-6 border-t border-slate-200/70">
        
        {/* Header with Title and Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Alertas de movilidad
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5">
              Información en tiempo real sobre incidentes, obras y estado del tráfico en tu área.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative">
            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 text-slate-700 text-sm sm:text-base font-semibold shadow-sm transition-all"
              >
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span>Filtrar</span>
              </button>

              {/* Filter Dropdown Menu */}
              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-30 animate-fade-in text-sm sm:text-base">
                  {[
                    { id: 'todos', label: 'Todas las alertas' },
                    { id: 'accidente', label: 'Accidentes' },
                    { id: 'obras', label: 'Obras Viales' },
                    { id: 'trafico', label: 'Tráfico Denso' },
                    { id: 'inundacion', label: 'Inundaciones' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        setSelectedFilter(filter.id);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 font-medium hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        selectedFilter === filter.id ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{filter.label}</span>
                      {selectedFilter === filter.id && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actualizar Button */}
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 text-slate-700 text-sm sm:text-base font-semibold shadow-sm transition-all"
            >
              <RotateCw className={`w-4 h-4 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>

            {/* Optional Community Report trigger */}
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm sm:text-base font-bold shadow-sm transition-all ml-1"
            >
              <Plus className="w-4 h-4" />
              <span>Reportar</span>
            </button>
          </div>
        </div>

        {/* 4 Cards Grid matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setSelectedAlertForMap(alert)}
              className="cursor-pointer group bg-white rounded-[24px] border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-slate-300 transition-all duration-300"
            >
              <div>
                {/* Thumbnail Image with Badge Overlay matching image 2 */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={alert.image}
                    alt={alert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badge top-left */}
                  <div className="absolute top-3 left-3">
                    {alert.badgeType === 'red' ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c0262b] text-white text-xs font-black uppercase tracking-wider shadow-md">
                        <AlertTriangle className="w-4 h-4 text-white fill-white/20 animate-pulse" />
                        <span>{alert.severityLabel}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200/80 text-xs font-black uppercase tracking-wider shadow-md">
                        {alert.type === 'obras' ? (
                          <Wrench className="w-4 h-4 text-amber-600" />
                        ) : (
                          <Activity className="w-4 h-4 text-blue-600" />
                        )}
                        <span>{alert.severityLabel}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Title & Time */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                      {alert.title}
                    </h3>
                    {alert.timeAgo && (
                      <span className="text-xs sm:text-sm text-slate-500 font-semibold whitespace-nowrap pt-0.5">
                        {alert.timeAgo}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                    {alert.description}
                  </p>

                  {/* Location with Pin */}
                  <div className="flex items-center gap-2 text-sm sm:text-base text-slate-600 font-medium">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{alert.location}</span>
                  </div>
                </div>
              </div>

              {/* Ver en el mapa Action Button */}
              <div className="p-6 pt-0">
                {alert.buttonType === 'solid' ? (
                  <button
                    onClick={() => setSelectedAlertForMap(alert)}
                    className="w-full py-3 px-4 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] text-white text-sm sm:text-base font-bold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Map className="w-4 h-4" />
                    <span>Ver en el mapa</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedAlertForMap(alert)}
                    className="w-full py-3 px-4 rounded-xl border-2 border-[#0057d9] text-[#0057d9] hover:bg-blue-50 text-sm sm:text-base font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Map className="w-4 h-4" />
                    <span>Ver en el mapa</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guide Detail Modal (Información Completa al dar clic con símbolos llamativos) */}
      {selectedGuide && (() => {
        const guideRecs: KeyRecommendation[] = (selectedGuide.recommendations && selectedGuide.recommendations.length > 0)
          ? selectedGuide.recommendations
          : getRecommendationsForTopic(selectedGuide.id);

        const currentSymbol = guideRecs[selectedSymbolIndex] || guideRecs[0];

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-4xl rounded-[28px] bg-white border border-slate-200 p-6 sm:p-8 text-slate-900 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
              
              {/* Header Modal */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs bg-gradient-to-r ${selectedGuide.themeGradient || 'from-blue-600 to-indigo-700'} text-white`}>
                      {selectedGuide.badge || 'Seguridad Vial'}
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {guideRecs.length} Símbolos Oficiales
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0a193b] tracking-tight">
                    {selectedGuide.title}
                  </h3>
                  {selectedGuide.tagline && (
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      {selectedGuide.tagline}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="p-2.5 rounded-2xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 transition-colors cursor-pointer"
                  title="Cerrar ventana de información"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* SPOTLIGHT DEL SÍMBOLO ACTIVO (Llamativo, enfocado e interactivo) */}
              <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 border-2 border-blue-200/80 shadow-sm space-y-4">
                {/* Selector de pestañas para cambiar rápidamente entre los 4 símbolos */}
                <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800">
                      Explorar Símbolo Activo ({selectedSymbolIndex + 1} de {guideRecs.length}):
                    </span>
                  </div>
                  
                  {/* Botones rápidos para alternar entre los 4 símbolos */}
                  <div className="flex items-center gap-1.5">
                    {guideRecs.map((rec, idx) => (
                      <button
                        key={rec.id || idx}
                        onClick={() => setSelectedSymbolIndex(idx)}
                        className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          selectedSymbolIndex === idx
                            ? 'bg-[#0057d9] text-white shadow-md scale-105 ring-2 ring-blue-400/50'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs'
                        }`}
                      >
                        {rec.logoCode || `S-${idx + 1}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vista ampliada del símbolo activo */}
                {currentSymbol && (
                  <div className="flex flex-col sm:flex-row gap-5 items-start pt-1">
                    {/* Emblema grande oficial */}
                    <div className="shrink-0 w-full sm:w-auto flex justify-center">
                      <RecommendationLogo
                        recommendation={currentSymbol}
                        size="lg"
                        index={selectedSymbolIndex}
                        className="scale-105"
                      />
                    </div>

                    {/* Explicación y detalle en colores fuertes */}
                    <div className="flex-1 space-y-3 min-w-0">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-100 text-[#0055d4] text-[11px] font-black uppercase tracking-wide mb-1">
                          <span>Símbolo Vial en Foco</span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-black text-[#0a193b] leading-snug">
                          {currentSymbol.title}
                        </h4>
                      </div>

                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                        {currentSymbol.description}
                      </p>

                      {currentSymbol.highlight && (
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5 text-amber-900 shadow-2xs">
                          <span className="text-base">💡</span>
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
                              Regla de Oro en la Vía:
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-amber-900">
                              {currentSymbol.highlight}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* LISTADO COMPLETO DE TODOS LOS SÍMBOLOS CONTENIDOS EN ESTA CASILLA */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#0a193b] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0066ff] animate-pulse"></span>
                    <span>Todos los Símbolos Contenidos ({guideRecs.length})</span>
                  </h4>
                  <span className="text-xs font-bold text-slate-500">
                    Haz clic en cualquiera para enfocarlo
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {guideRecs.map((rec: KeyRecommendation, idx: number) => {
                    const isSelected = selectedSymbolIndex === idx;

                    return (
                      <div
                        key={rec.id || idx}
                        onClick={() => setSelectedSymbolIndex(idx)}
                        className={`rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-start ${
                          isSelected
                            ? 'bg-blue-50/50 border-[#0057d9] shadow-md ring-2 ring-blue-400/20'
                            : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                        }`}
                      >
                        {/* Logo oficial */}
                        <RecommendationLogo
                          recommendation={rec}
                          size="lg"
                          index={idx}
                        />

                        {/* Descripción y reglas */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className={`w-5 h-5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-emerald-600'}`} />
                              <h5 className="text-base sm:text-lg font-black text-[#0a193b] leading-snug">
                                {rec.title}
                              </h5>
                            </div>
                            {isSelected && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#0057d9] text-white shrink-0">
                                En Foco
                              </span>
                            )}
                          </div>

                          <p className="text-sm sm:text-base text-slate-600 leading-relaxed pl-7">
                            {rec.description}
                          </p>

                          {rec.highlight && (
                            <div className="pl-7 pt-1">
                              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0055d4] bg-blue-50 px-3 py-1 rounded-lg border border-blue-200/80">
                                <span>💡</span>
                                <span>{rec.highlight}</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guía Visual e Infografía con opción Zoom HD */}
              {selectedGuide.image && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
                      Lámina Oficial de Señalización (Gráfico de Referencia)
                    </span>
                    <button
                      onClick={() => setLightboxImage({ src: selectedGuide.image, title: selectedGuide.title, category: selectedGuide.badge })}
                      className="text-xs font-bold text-[#0057d9] hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Ver a Pantalla Completa</span>
                    </button>
                  </div>

                  <div 
                    onClick={() => setLightboxImage({ src: selectedGuide.image, title: selectedGuide.title, category: selectedGuide.badge })}
                    className="relative h-64 sm:h-80 bg-slate-50 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xs group cursor-zoom-in"
                  >
                    <img
                      src={selectedGuide.image}
                      alt={selectedGuide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain bg-white p-3 sm:p-4 group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage({ src: selectedGuide.image, title: selectedGuide.title, category: selectedGuide.badge });
                      }}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/85 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md border border-white/20 transition cursor-pointer z-10"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Ampliar en HD</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Normas y Directrices del Módulo */}
              {selectedGuide.details && selectedGuide.details.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Pautas y Normativas Clave:</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {selectedGuide.details.map((detail: string, dIdx: number) => (
                      <li key={dIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Botón de cierre y acción */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="flex-1 py-3.5 rounded-xl bg-[#0a193b] hover:bg-[#0055d4] text-white text-base font-bold transition-colors shadow-sm cursor-pointer text-center"
                >
                  Cerrar Guía
                </button>
                {onNavigateToEducation && (
                  <button
                    onClick={() => {
                      setSelectedGuide(null);
                      onNavigateToEducation();
                    }}
                    className="py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>Practicar en Juegos Viales</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Alert Map Viewer Modal */}
      {selectedAlertForMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 text-slate-900 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                selectedAlertForMap.badgeType === 'red' ? 'bg-[#c0262b] text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {selectedAlertForMap.severityLabel}
              </span>
              <button
                onClick={() => setSelectedAlertForMap(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden h-48 border border-slate-100">
              <img
                src={selectedAlertForMap.image}
                alt={selectedAlertForMap.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{selectedAlertForMap.title}</h3>
              <p className="text-sm sm:text-base text-slate-600 mt-1.5">{selectedAlertForMap.description}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm space-y-2">
              <p className="text-slate-700"><strong>Ubicación:</strong> {selectedAlertForMap.location}</p>
              <p className="text-slate-700"><strong>Estado:</strong> {selectedAlertForMap.affectedLanes}</p>
              <p className="text-blue-700 font-medium"><strong>Ruta sugerida:</strong> {selectedAlertForMap.alternativeRouteSuggestion}</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  if (onNavigateToMapWithAlert) {
                    onNavigateToMapWithAlert(selectedAlertForMap);
                  }
                  setSelectedAlertForMap(null);
                }}
                className="flex-1 py-3 rounded-xl bg-[#0057d9] hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm"
              >
                <Map className="w-4 h-4" />
                <span>Navegar al Mapa</span>
              </button>
              <button
                onClick={() => setSelectedAlertForMap(null)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-sm sm:text-base"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Incident Reporting Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 text-slate-900 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Reportar Incidente Vial</h3>
                  <p className="text-sm text-slate-500">Avisa a la comunidad en tiempo real</p>
                </div>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">¡Reporte Enviado con Éxito!</h4>
                <p className="text-sm sm:text-base text-slate-600">Tu alerta ya está visible en la lista de movilidad.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateReport} className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-1.5">Tipo de Incidente</label>
                  <select
                    value={reportType}
                    onChange={(e: any) => setReportType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="accidente">Accidente múltiple o simple</option>
                    <option value="obras">Mantenimiento de asfalto / Obras</option>
                    <option value="trafico">Congestión vehicular severa</option>
                    <option value="inundacion">Inundación en vía</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-1.5">Título del incidente</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Colisión en vía principal"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-1.5">Ubicación exacta</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Av. Regional con Calle 30"
                    value={reportLocation}
                    onChange={(e) => setReportLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-1.5">Descripción</label>
                  <textarea
                    rows={3}
                    placeholder="Detalles de afectación de carriles o desvíos..."
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0057d9] hover:bg-blue-700 text-white text-base font-bold transition-all shadow-sm cursor-pointer"
                >
                  Publicar Alerta Inmediata
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen HD Lightbox Modal */}
      <ImageLightboxModal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageSrc={lightboxImage?.src || ''}
        title={lightboxImage?.title || 'Lámina de Seguridad Vial'}
        category={lightboxImage?.category}
        subtitle="Visualizador de alta definición con zoom interactivo • Ecosistema VIANOVA"
      />

    </div>
  );
};
