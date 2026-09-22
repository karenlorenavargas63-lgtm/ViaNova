import React from 'react';
import { 
  FileText, 
  ShieldAlert, 
  Car, 
  Bike, 
  UserCheck, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  AlertTriangle, 
  BookOpen, 
  Compass, 
  Lightbulb, 
  ExternalLink 
} from 'lucide-react';
import { NavigationTab } from '../types';

import signsImg from '../assets/images/traffic_signs_chart_1790078148438.jpg';
import rulesImg from '../assets/images/traffic_rules_regulations_1788875981998.jpg';
import preventionImg from '../assets/images/accident_prevention_drive_1788875999075.jpg';
import responsibleDrivingImg from '../assets/images/responsible_car_driving_1788876017243.jpg';
import motorcyclistImg from '../assets/images/motorcyclist_safety_helmet_1788876032377.jpg';
import pedestrianImg from '../assets/images/pedestrian_safe_crosswalk_1788876049804.jpg';
import { getRecommendationsForTopic, KeyRecommendation } from '../data/safetyRecommendations';
import { RecommendationLogo } from './RecommendationLogo';

interface SafetyCultureViewProps {
  onSelectTab: (tab: NavigationTab) => void;
  onOpenQuizModal: () => void;
}

interface CultureTopic {
  id: string;
  title: string;
  category: string;
  icon: string;
  image: string;
  color: string;
  summary: string;
  details: {
    keyConcept: string;
    rules: string[];
    tips: string[];
    stat: string;
  };
}

export const SafetyCultureView: React.FC<SafetyCultureViewProps> = ({
  onSelectTab,
  onOpenQuizModal
}) => {
  const [selectedTopic, setSelectedTopic] = React.useState<CultureTopic | null>(null);

  const topics: CultureTopic[] = [
    {
      id: 'senales',
      title: 'Señales',
      category: 'Reglamentarias y Preventivas',
      icon: 'FileText',
      image: signsImg,
      color: 'blue',
      summary: 'Conoce el significado y la importancia de la señalización vertical y horizontal en el entorno urbano para una navegación predictiva.',
      details: {
        keyConcept: 'Las señales regulan el orden de circulación, alertan sobre peligros inminentes y guían a todos los actores viales.',
        rules: [
          'Señales Reglamentarias (Rojas/Circulares): De cumplimiento obligatorio (ej. PARE, Ceda el Paso, Límite de velocidad).',
          'Señales Preventivas (Amarillas/Rombos): Alertan peligros geométricos o condiciones de vía (ej. Curva pronunciada, Zona escolar).',
          'Señales Informativas (Azules/Verdes): Orientan destinos, servicios médicos y estaciones intermodales.',
          'Marcas Viales en Pavimento: Línea continua blanca o amarilla (prohibido rebasar), pasos de cebra y cajas antibloqueo.'
        ],
        tips: [
          'Respeta siempre la línea de detención previa al cruce peatonal.',
          'Interpreta los semáforos peatonales con segunderos dinámicos.'
        ],
        stat: 'El 85% de los choques en esquinas ocurren por ignorar señales de prioridad (PARE/CEDA).'
      }
    },
    {
      id: 'normas',
      title: 'Normas',
      category: 'Reglamento y Código Nacional',
      icon: 'BookOpen',
      image: rulesImg,
      color: 'indigo',
      summary: 'Accede al reglamento de tránsito actualizado. Reglas claras estructuran un flujo vehicular ordenado y previenen incidentes.',
      details: {
        keyConcept: 'El Código Nacional de Tránsito establece los derechos, deberes y sanciones para garantizar la convivencia segura.',
        rules: [
          'Prioridad absoluta al peatón en pasos de cebra y giros vehiculares.',
          'Límites de velocidad urbanos: 50 km/h en avenidas principales, 30 km/h en barrios residenciales y 20 km/h en colegios.',
          'Prohibición total del uso de dispositivos móviles mientras se conduce sin manos libres homologado.',
          'Obligatoriedad del cinturón de seguridad en todas las plazas del vehículo.'
        ],
        tips: [
          'Conserva la distancia de seguimiento: mínimo 3 segundos respecto al vehículo precedente.',
          'Utiliza direccionales al menos 30 metros antes de efectuar cualquier viraje.'
        ],
        stat: 'Respetar los 30 km/h en zonas urbanas reduce el riesgo de muerte de un peatón en un 80%.'
      }
    },
    {
      id: 'prevencion',
      title: 'Prevención',
      category: 'Gestión Proactiva del Riesgo',
      icon: 'ShieldAlert',
      image: preventionImg,
      color: 'emerald',
      summary: 'Estrategias proactivas para identificar riesgos potenciales en tu ruta y actuar antes de que ocurran contratiempos.',
      details: {
        keyConcept: 'La prevención vial consiste en anticipar los errores ajenos y las condiciones meteorológicas adversas.',
        rules: [
          'Escanear el entorno visual 15 segundos adelante en tu trayectoria.',
          'Reducción de velocidad inmediata ante asfalto mojado o lluvia torrencial.',
          'Mantenimiento preventivo: neumáticos, frenos, luces y limpiaparabrisas al día.',
          'Evitar circular en el ángulo muerto de camiones y autobuses articulados.'
        ],
        tips: [
          'Si no ves los espejos retrovisores del conductor del camión, él no puede verte a ti.',
          'Revisa la app VIANOVA antes de iniciar tu viaje para conocer incidentes viales activos.'
        ],
        stat: '9 de cada 10 siniestros viales son evitables mediante conducción preventiva y atención plena.'
      }
    },
    {
      id: 'conduccion',
      title: 'Conducción responsable',
      category: 'Manejo Defensivo y Empatía',
      icon: 'Car',
      image: responsibleDrivingImg,
      color: 'sky',
      summary: 'Técnicas de manejo defensivo, mantenimiento de la atención y respeto por los límites de velocidad del sistema.',
      details: {
        keyConcept: 'Conducir con responsabilidad implica entender que el vehículo es una herramienta que interactúa con vidas humanas.',
        rules: [
          'Tolerancia Cero con el alcohol y sustancias psicoactivas al volante.',
          'Ceder el paso en glorietas a los vehículos que ya circulan por el anillo interior.',
          'Respeto irrestricto de las bahías exclusivas de autobuses y corredores BRT.',
          'Distancia lateral de 1.5 metros al adelantar a cualquier ciclista.'
        ],
        tips: [
          'Aplica la técnica de "Apertura a la Holandesa" para abrir la puerta del coche con la mano opuesta y ver si viene un ciclista.',
          'Nunca utilices el claxon para apurar a peatones o personas mayores.'
        ],
        stat: 'La distracción con el móvil incrementa por 4 la probabilidad de sufrir un accidente grave.'
      }
    },
    {
      id: 'motociclistas',
      title: 'Motociclistas',
      category: 'Protección y Equipamiento',
      icon: 'Bike',
      image: motorcyclistImg,
      color: 'amber',
      summary: 'Protocolos de seguridad específicos, equipamiento obligatorio y posicionamiento estratégico en la calzada.',
      details: {
        keyConcept: 'El motociclista carece de carrocería; el equipamiento certificado y la visibilidad son su escudo protector vital.',
        rules: [
          'Uso obligatorio de casco integral o abatible con certificación DOT / ECE 22.06 debidamente abrochado.',
          'Prendas con protecciones en codos, hombros y espalda, además de guantes antideslizantes.',
          'Circular siempre en el centro de su carril, nunca zigzaguear entre autos en movimiento.',
          'Luces encendidas las 24 horas del día para garantizar visibilidad constante.'
        ],
        tips: [
          'Evita frenar sobre las marcas viales pintadas en el suelo cuando estén húmedas.',
          'Mantén una distancia de frenado mayor que la de un automóvil estándar.'
        ],
        stat: 'Un casco certificado reduce en un 42% el riesgo de muerte y en un 69% el de traumatismo craneoencefálico.'
      }
    },
    {
      id: 'peatones',
      title: 'Peatones',
      category: 'Seguridad y Convivencia',
      icon: 'UserCheck',
      image: pedestrianImg,
      color: 'purple',
      summary: 'Zonas seguras, cruces inteligentes y cómo interactuar de manera segura con el flujo vehicular motorizado.',
      details: {
        keyConcept: 'Como usuario prioritario, el peatón debe cuidar su visibilidad y transitar por los espacios diseñados para su resguardo.',
        rules: [
          'Cruzar siempre por los pasos de cebra, semáforos peatonales o puentes elevados.',
          'Hacer contacto visual con los conductores antes de bajar de la acera a la calzada.',
          'Caminar por el andén o acera, nunca por el carril vehicular ni ciclovías.',
          'En carreteras sin acera, caminar de frente al tráfico en el arcén izquierdo.'
        ],
        tips: [
          'Retirar los auriculares con cancelación de ruido al cruzar avenidas congestionadas.',
          'Caminar de la mano con niños pequeños manteniéndolos en el lado interior de la acera.'
        ],
        stat: 'El uso del teléfono móvil al caminar reduce en un 60% la percepción del entorno periférico.'
      }
    }
  ];

  return (
    <div id="vianova-safety-view" className="space-y-10 pb-16 animate-in fade-in duration-300">
      {/* Header Section (Page 6) */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Guía Integral de Educación Ciudadana</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
          Cultura y Seguridad Vial
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          La seguridad en nuestras vías es responsabilidad de todos. Explora nuestras guías, normativas y consejos prácticos para garantizar trayectos seguros e inteligentes en el ecosistema urbano.
        </p>
      </div>

      {/* Grid of 6 Key Topics (Page 6 & 7) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => {
          return (
            <div
              key={topic.id}
              id={`safety-card-${topic.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Topic Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={topic.image}
                    alt={topic.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full ${topic.id === 'senales' ? 'object-contain bg-white p-1.5' : 'object-cover'} group-hover:scale-105 transition-transform duration-500 ease-out`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                  {/* Top Icon Badge */}
                  <div className="absolute top-3.5 right-3.5 w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md text-blue-600 flex items-center justify-center shadow-md">
                    {topic.id === 'senales' && <FileText className="w-5 h-5" />}
                    {topic.id === 'normas' && <BookOpen className="w-5 h-5" />}
                    {topic.id === 'prevencion' && <ShieldAlert className="w-5 h-5" />}
                    {topic.id === 'conduccion' && <Car className="w-5 h-5" />}
                    {topic.id === 'motociclistas' && <Bike className="w-5 h-5" />}
                    {topic.id === 'peatones' && <UserCheck className="w-5 h-5" />}
                  </div>

                  <span className="absolute bottom-3 left-3.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                    {topic.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 font-display group-hover:text-blue-600 transition">
                    {topic.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {topic.summary}
                  </p>
                </div>
              </div>

              {/* Action Button: Aprender más */}
              <div className="p-6 pt-0">
                <button
                  id={`btn-learn-more-${topic.id}`}
                  onClick={() => setSelectedTopic(topic)}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition duration-150 cursor-pointer"
                >
                  <span>Aprender más y ver símbolos clave</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Quiz Callout Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider text-blue-200">
            Evaluación Oficial VIANOVA
          </span>
          <h3 className="text-2xl font-black font-display tracking-tight">
            ¿Listo para poner a prueba tus conocimientos?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Realiza el test de señalización básica, suma puntos para tu Certificación de Seguridad vial y desbloquea insignias en tu perfil.
          </p>
        </div>

        <button
          onClick={onOpenQuizModal}
          className="px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 rounded-2xl text-sm font-black shadow-lg shadow-black/10 flex items-center gap-2 transition hover:scale-105 shrink-0"
        >
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Iniciar Evaluación Interactiva</span>
        </button>
      </div>

      {/* Interactive "Aprender Más" Detail Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    {selectedTopic.category}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 font-display">
                    {selectedTopic.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedTopic(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Image Banner */}
            <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden border border-slate-100 bg-white">
              <img
                src={selectedTopic.image}
                alt={selectedTopic.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full ${selectedTopic.id === 'senales' ? 'object-contain bg-white p-2' : 'object-cover'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg">
                {selectedTopic.category}
              </span>
            </div>

            {/* Key Concept */}
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs sm:text-sm text-blue-900 font-medium">
              💡 {selectedTopic.details.keyConcept}
            </div>

            {/* Casilla: Recomendaciones Clave con Logos Oficiales */}
            <div className="space-y-4 bg-gradient-to-b from-slate-50 to-blue-50/20 p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-blue-600">
                    Recomendaciones Clave • Símbolos Viales
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {getRecommendationsForTopic(selectedTopic.id).length} símbolos oficiales
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {getRecommendationsForTopic(selectedTopic.id).map((rec: KeyRecommendation, idx: number) => (
                  <div
                    key={rec.id || idx}
                    className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col sm:flex-row gap-3.5 items-start"
                  >
                    {/* Logo oficial de la recomendación */}
                    <RecommendationLogo
                      recommendation={rec}
                      size="lg"
                      index={idx}
                    />

                    {/* Contenido descriptivo */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {rec.title}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-6">
                        {rec.description}
                      </p>
                      {rec.highlight && (
                        <div className="pl-6 pt-0.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            💡 {rec.highlight}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat & Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  Consejo Práctico
                </h5>
                <p className="text-xs text-slate-600">{selectedTopic.details.tips[0]}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                <h5 className="text-xs font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                  Impacto en Seguridad
                </h5>
                <p className="text-xs text-emerald-800">{selectedTopic.details.stat}</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={() => setSelectedTopic(null)}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setSelectedTopic(null);
                  onOpenQuizModal();
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
              >
                <span>Hacer Evaluación de este tema</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
