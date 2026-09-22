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
  ArrowRight
} from 'lucide-react';
import obrasMonitorImg from '../assets/images/obras_asfalto_monitor_1788438254687.jpg';
import redAlertImg from '../assets/images/red_alert_gradient_1788438272797.jpg';

// Thematic Safety Images for the 6 Culture Cards
import signsImg from '../assets/images/traffic_signs_chart_1790078148438.jpg';
import rulesImg from '../assets/images/traffic_rules_regulations_1788875981998.jpg';
import preventionImg from '../assets/images/accident_prevention_drive_1788875999075.jpg';
import responsibleDrivingImg from '../assets/images/responsible_car_driving_1788876017243.jpg';
import motorcyclistImg from '../assets/images/motorcyclist_safety_helmet_1788876032377.jpg';
import pedestrianImg from '../assets/images/pedestrian_safe_crosswalk_1788876049804.jpg';
import { TOPIC_RECOMMENDATIONS, KeyRecommendation, getRecommendationsForTopic } from '../data/safetyRecommendations';
import { RecommendationLogo } from './RecommendationLogo';

interface SafetyScreenProps {
  onNavigateToMapWithAlert?: (alert: any) => void;
}

export const SafetyScreen: React.FC<SafetyScreenProps> = ({ onNavigateToMapWithAlert }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<any | null>(null);
  const [selectedAlertForMap, setSelectedAlertForMap] = useState<any | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

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
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0a193b] tracking-tight">
            Cultura y Seguridad Vial
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            La seguridad en nuestras vías es responsabilidad de todos. Explora nuestras guías, normativas y consejos prácticos para garantizar trayectos seguros e inteligentes en el ecosistema urbano.
          </p>
        </div>

        {/* 6 Thematic Cards Grid with topic images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {cultureCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="group bg-white rounded-[26px] overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300"
              >
                <div>
                  {/* Thematic Topic Image */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full ${card.id === 'senales' ? 'object-contain bg-white p-1.5' : 'object-cover'} group-hover:scale-105 transition-transform duration-500 ease-out`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                    
                    {/* Floating Icon */}
                    {IconComponent && (
                      <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-[#0066ff]">
                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                      </div>
                    )}

                    {/* Badge Category */}
                    <div className="absolute bottom-3 left-3.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold tracking-wide flex items-center gap-1.5 border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span>{card.badge}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 pb-4">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-blue-700 transition-colors">
                      {card.title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed line-clamp-3">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Aprender más Button */}
                <div className="p-6 sm:p-7 pt-0">
                  <button
                    onClick={() => setSelectedGuide(card)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0a193b] text-white hover:bg-[#0055d4] text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Aprender más y ver símbolos clave</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================================== */}
      {/* 2. SEGUNDA SECCIÓN: ALERTAS DE MOVILIDAD (Exactamente como Imagen 2)    */}
      {/* ======================================================================== */}
      <section className="max-w-6xl mx-auto space-y-6 pt-6 border-t border-slate-200/70">
        
        {/* Header with Title and Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Alertas de movilidad
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Información en tiempo real sobre incidentes, obras y estado del tráfico en tu área.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 relative">
            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 text-slate-700 text-xs font-semibold shadow-sm transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span>Filtrar</span>
              </button>

              {/* Filter Dropdown Menu */}
              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-30 animate-fade-in text-xs">
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
                      className={`w-full text-left px-4 py-2 font-medium hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        selectedFilter === filter.id ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{filter.label}</span>
                      {selectedFilter === filter.id && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actualizar Button */}
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 text-slate-700 text-xs font-semibold shadow-sm transition-all"
            >
              <RotateCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>

            {/* Optional Community Report trigger */}
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all ml-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Reportar</span>
            </button>
          </div>
        </div>

        {/* 4 Cards Grid matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-[24px] border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300"
            >
              <div>
                {/* Thumbnail Image with Badge Overlay matching image 2 */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={alert.image}
                    alt={alert.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Badge top-left */}
                  <div className="absolute top-3 left-3">
                    {alert.badgeType === 'red' ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#c0262b] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                        <AlertTriangle className="w-3 h-3 text-white fill-white/20" />
                        <span>{alert.severityLabel}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/95 backdrop-blur-sm text-slate-700 border border-slate-200/80 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                        {alert.type === 'obras' ? (
                          <Wrench className="w-3 h-3 text-slate-600" />
                        ) : (
                          <Activity className="w-3 h-3 text-slate-600" />
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
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {alert.title}
                    </h3>
                    {alert.timeAgo && (
                      <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap pt-0.5">
                        {alert.timeAgo}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {alert.description}
                  </p>

                  {/* Location with Pin */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{alert.location}</span>
                  </div>
                </div>
              </div>

              {/* Ver en el mapa Action Button */}
              <div className="p-6 pt-0">
                {alert.buttonType === 'solid' ? (
                  <button
                    onClick={() => setSelectedAlertForMap(alert)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Map className="w-4 h-4" />
                    <span>Ver en el mapa</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedAlertForMap(alert)}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#0057d9] text-[#0057d9] hover:bg-blue-50 text-xs font-bold transition-colors flex items-center justify-center gap-2"
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

      {/* Guide Detail Modal (Aprender más) */}
      {selectedGuide && (() => {
        const guideRecs: KeyRecommendation[] = (selectedGuide.recommendations && selectedGuide.recommendations.length > 0)
          ? selectedGuide.recommendations
          : getRecommendationsForTopic(selectedGuide.id);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 text-slate-900 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                    {selectedGuide.badge || 'Seguridad Vial'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0a193b] mt-1">{selectedGuide.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Guide Image Banner */}
              {selectedGuide.image && (
                <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-xs">
                  <img
                    src={selectedGuide.image}
                    alt={selectedGuide.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full ${selectedGuide.id === 'senales' ? 'object-contain bg-white p-2' : 'object-cover'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-3.5 text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                    Guía Oficial VIANOVA • Ecosistema Inteligente
                  </span>
                </div>
              )}

              <p className="text-sm text-slate-600 leading-relaxed">{selectedGuide.description}</p>

              {/* Casilla: Recomendaciones Clave con Símbolos Viales Oficiales */}
              <div className="space-y-4 bg-gradient-to-b from-slate-50 to-blue-50/20 p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0066ff] animate-pulse"></span>
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0066ff]">
                      Recomendaciones Clave • Símbolos Viales
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200/90 shadow-2xs">
                    {guideRecs.length} símbolos oficiales
                  </span>
                </div>

                {/* Listado de Casillas con Logos */}
                <div className="grid grid-cols-1 gap-3.5">
                  {guideRecs.map((rec: KeyRecommendation, idx: number) => (
                    <div
                      key={rec.id || idx}
                      className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all flex flex-col sm:flex-row gap-3.5 items-start"
                    >
                      {/* Logo oficial de la recomendación */}
                      <RecommendationLogo
                        recommendation={rec}
                        size="lg"
                        index={idx}
                      />

                      {/* Contenido descriptivo */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.4]" />
                          <h5 className="text-xs sm:text-sm font-extrabold text-[#0a193b] leading-snug">
                            {rec.title}
                          </h5>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-6">
                          {rec.description}
                        </p>
                        {rec.highlight && (
                          <div className="pl-6 pt-1">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#0055d4] bg-blue-50/90 px-2.5 py-0.5 rounded-md border border-blue-200/60">
                              <span>💡</span>
                              <span>{rec.highlight}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedGuide(null)}
                className="w-full py-3.5 rounded-xl bg-[#0a193b] hover:bg-[#0055d4] text-white text-sm font-bold transition-colors shadow-sm cursor-pointer"
              >
                Cerrar Guía
              </button>
            </div>
          </div>
        );
      })()}

      {/* Alert Map Viewer Modal */}
      {selectedAlertForMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 text-slate-900 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                selectedAlertForMap.badgeType === 'red' ? 'bg-[#c0262b] text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {selectedAlertForMap.severityLabel}
              </span>
              <button
                onClick={() => setSelectedAlertForMap(null)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden h-40 border border-slate-100">
              <img
                src={selectedAlertForMap.image}
                alt={selectedAlertForMap.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">{selectedAlertForMap.title}</h3>
              <p className="text-xs text-slate-600 mt-1">{selectedAlertForMap.description}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
              <p className="text-slate-600"><strong>Ubicación:</strong> {selectedAlertForMap.location}</p>
              <p className="text-slate-600"><strong>Estado:</strong> {selectedAlertForMap.affectedLanes}</p>
              <p className="text-blue-700"><strong>Ruta sugerida:</strong> {selectedAlertForMap.alternativeRouteSuggestion}</p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  if (onNavigateToMapWithAlert) {
                    onNavigateToMapWithAlert(selectedAlertForMap);
                  }
                  setSelectedAlertForMap(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0057d9] hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Navegar al Mapa</span>
              </button>
              <button
                onClick={() => setSelectedAlertForMap(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs"
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
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Reportar Incidente Vial</h3>
                  <p className="text-xs text-slate-500">Avisa a la comunidad en tiempo real</p>
                </div>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">¡Reporte Enviado con Éxito!</h4>
                <p className="text-xs text-slate-500">Tu alerta ya está visible en la lista de movilidad.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateReport} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tipo de Incidente</label>
                  <select
                    value={reportType}
                    onChange={(e: any) => setReportType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="accidente">Accidente múltiple o simple</option>
                    <option value="obras">Mantenimiento de asfalto / Obras</option>
                    <option value="trafico">Congestión vehicular severa</option>
                    <option value="inundacion">Inundación en vía</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Título del incidente</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Colisión en vía principal"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Ubicación exacta</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Av. Regional con Calle 30"
                    value={reportLocation}
                    onChange={(e) => setReportLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Descripción</label>
                  <textarea
                    rows={3}
                    placeholder="Detalles de afectación de carriles o desvíos..."
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0057d9] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Publicar Alerta Inmediata
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
