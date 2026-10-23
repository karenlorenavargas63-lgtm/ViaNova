import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  Play, 
  Check, 
  X, 
  HelpCircle, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Timer, 
  Flame, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  ShieldCheck, 
  Car, 
  Bike, 
  Footprints, 
  AlertTriangle,
  Lightbulb,
  Award,
  ChevronRight,
  Shuffle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { gameAudio } from '../utils/gameAudio';

export type EducaplayGameType = 
  | 'ruleta' 
  | 'froggy' 
  | 'sopa' 
  | 'memorama' 
  | 'columnas' 
  | 'completar';

interface EducaplayGamesSuiteProps {
  initialGame?: EducaplayGameType;
  onPointsEarned?: (points: number) => void;
}

/* ========================================================================= */
/* DATA 1: RULETA DE PALABRAS VIAL (PASAPALABRA A-Z)                         */
/* ========================================================================= */
interface RuletaItem {
  letter: string;
  type: 'starts' | 'contains';
  question: string;
  answer: string;
  category: 'Tráfico' | 'Tránsito' | 'Prevención' | 'Movilidad';
  status: 'pending' | 'correct' | 'wrong' | 'skipped';
}

const INITIAL_RULETA_ITEMS: RuletaItem[] = [
  {
    letter: 'A',
    type: 'starts',
    question: 'Zona longitudinal de la vía urbana destinada exclusivamente a la circulación y protección de peatones.',
    answer: 'ACERA',
    category: 'Movilidad',
    status: 'pending'
  },
  {
    letter: 'B',
    type: 'starts',
    question: 'Vehículo ligero no motorizado de dos ruedas al cual los automóviles deben dejar al menos 1.5 metros al sobrepasarlo.',
    answer: 'BICICLETA',
    category: 'Movilidad',
    status: 'pending'
  },
  {
    letter: 'C',
    type: 'starts',
    question: 'Elemento de protección certificado reglamentario para motociclistas y ciclistas que previene traumas craneoencefálicos mortales.',
    answer: 'CASCO',
    category: 'Prevención',
    status: 'pending'
  },
  {
    letter: 'D',
    type: 'starts',
    question: 'Espacio de seguridad que debe mantenerse con el vehículo delantero para frenar sin colisionar (Regla de los 3 segundos).',
    answer: 'DISTANCIA',
    category: 'Prevención',
    status: 'pending'
  },
  {
    letter: 'E',
    type: 'starts',
    question: 'Luces intermitentes que deben encenderse obligatoriamente al detenerse en la vía por avería o siniestro.',
    answer: 'EMERGENCIA',
    category: 'Tránsito',
    status: 'pending'
  },
  {
    letter: 'F',
    type: 'starts',
    question: 'Acción mecánica de reducir la velocidad o detener la marcha del vehículo mediante pastillas y discos.',
    answer: 'FRENADO',
    category: 'Tránsito',
    status: 'pending'
  },
  {
    letter: 'G',
    type: 'starts',
    question: 'Intersección circular donde siempre tienen prioridad de paso los vehículos que ya están circulando dentro de su anillo.',
    answer: 'GLORIETA',
    category: 'Tránsito',
    status: 'pending'
  },
  {
    letter: 'H',
    type: 'starts',
    question: 'Pérdida peligrosa de contacto y adherencia de los neumáticos con el asfalto cuando hay una capa de agua por lluvia intensa.',
    answer: 'HIDROPLANEO',
    category: 'Prevención',
    status: 'pending'
  },
  {
    letter: 'I',
    type: 'starts',
    question: 'Luz direccional o señal luminosa parpadeante usada para advertir a otros conductores un cambio de carril o giro.',
    answer: 'INTERMITENTE',
    category: 'Tráfico',
    status: 'pending'
  },
  {
    letter: 'L',
    type: 'starts',
    question: 'Demarcación pintada en la calzada; cuando es continua prohíbe de forma tajante el adelantamiento.',
    answer: 'LINEA',
    category: 'Tránsito',
    status: 'pending'
  },
  {
    letter: 'M',
    type: 'starts',
    question: 'Desplazamiento ágil, seguro y sostenible de ciudadanos utilizando diferentes modos de transporte activo o público.',
    answer: 'MOVILIDAD',
    category: 'Movilidad',
    status: 'pending'
  },
  {
    letter: 'P',
    type: 'starts',
    question: 'Usuario más vulnerable de la vía pública que siempre tiene prelación absoluta en pasos de cebra y aceras.',
    answer: 'PEATON',
    category: 'Movilidad',
    status: 'pending'
  },
  {
    letter: 'R',
    type: 'starts',
    question: 'Material o prenda que devuelve la luz de los faros en la noche aumentando la visibilidad del ciclista o peatón hasta 4 veces.',
    answer: 'REFLECTIVO',
    category: 'Prevención',
    status: 'pending'
  },
  {
    letter: 'S',
    type: 'starts',
    question: 'Dispositivo óptico luminoso con luces roja, amarilla y verde que regula el tránsito en intersecciones.',
    answer: 'SEMAFORO',
    category: 'Tráfico',
    status: 'pending'
  },
  {
    letter: 'V',
    type: 'starts',
    question: 'Factor físico de riesgo: a 30 km/h la probabilidad de que un peatón sobreviva a un choque es del 90%.',
    answer: 'VELOCIDAD',
    category: 'Prevención',
    status: 'pending'
  },
  {
    letter: 'Z',
    type: 'starts',
    question: 'Tramo urbano cercano a colegios donde la velocidad máxima reglamentaria disminuye a 20 o 30 km/h.',
    answer: 'ZONA ESCOLAR',
    category: 'Prevención',
    status: 'pending'
  }
];

/* ========================================================================= */
/* DATA 2: FROGGY JUMPS / CRUCE SEGURO (7 CARRILES DE DESAFÍO)               */
/* ========================================================================= */
interface FroggyLane {
  id: number;
  laneTitle: string;
  laneType: 'sidewalk' | 'bikeway' | 'bus' | 'highway' | 'train' | 'roundabout' | 'park';
  scenario: string;
  question: string;
  options: { text: string; isCorrect: boolean; feedback: string }[];
}

const FROGGY_LANES: FroggyLane[] = [
  {
    id: 1,
    laneTitle: 'Carril 1: Acera Peatonal y Garaje',
    laneType: 'sidewalk',
    scenario: 'Vas caminando por la acera y un auto sale marcha atrás de un garaje con visibilidad limitada.',
    question: '¿Qué acción de seguridad debes realizar para cruzar?',
    options: [
      { text: 'Acelerar el paso corriendo detrás del auto para ganarle la salida.', isCorrect: false, feedback: '¡Peligro! El conductor tiene un punto ciego posterior y podría atropellarte.' },
      { text: 'Detenerte, hacer contacto visual o esperar que el auto frene antes de pasar.', isCorrect: true, feedback: '¡Excelente! El contacto visual garantiza que el conductor te ve antes de avanzar.' },
      { text: 'Bajar a la calzada con tráfico vehicular rápido para esquivarlo.', isCorrect: false, feedback: '¡Incorrecto! Salir intempestivamente a la calle te expone a ser arrollado.' }
    ]
  },
  {
    id: 2,
    laneTitle: 'Carril 2: Ciclorruta de Doble Sentido',
    laneType: 'bikeway',
    scenario: 'Vas a cruzar una ciclorruta segregada donde transitan bicicletas y patinetas a 20 km/h.',
    question: '¿Hacia qué lado debes mirar antes de poner un pie en la pista?',
    options: [
      { text: 'Mirar a ambos lados (izquierda y derecha), ya que es bidireccional.', isCorrect: true, feedback: '¡Correcto! En ciclorrutas de doble sentido el tráfico viene de ambas direcciones.' },
      { text: 'Mirar solo hacia la izquierda como si fuera un carril de autos tradicional.', isCorrect: false, feedback: '¡Cuidado! Puedes recibir un impacto de un ciclista que viene por la derecha.' },
      { text: 'Cruzar mirando el teléfono celular porque los ciclistas tienen que frenar.', isCorrect: false, feedback: '¡Grave distracción! El celular reduce el campo de visión en un 80%.' }
    ]
  },
  {
    id: 3,
    laneTitle: 'Carril 3: Carril Exclusivo de Buses (BRT)',
    laneType: 'bus',
    scenario: 'Un autobús articulado de 18 metros se aproxima a la estación a velocidad moderada.',
    question: '¿Por qué nunca debes cruzar por delante de un bus cuando está detenido?',
    options: [
      { text: 'Porque el bus bloquea la visibilidad de los vehículos que vienen por el carril contiguo.', isCorrect: true, feedback: '¡Brillante! El bus genera un muro ciego y el carril continuo no puede verte.' },
      { text: 'Porque los buses tienen sensores magnéticos que emiten calor.', isCorrect: false, feedback: 'El verdadero riesgo es el punto ciego y la falta de visión cruzada.' },
      { text: 'Porque el chofer siempre arranca sin mirar los espejos.', isCorrect: false, feedback: 'El factor crítico es la falta de ángulo visual con otros carriles activos.' }
    ]
  },
  {
    id: 4,
    laneTitle: 'Carril 4: Avenida Principal Urbana (Zona 50)',
    laneType: 'highway',
    scenario: 'El semáforo vehicular acaba de cambiar a amarillo y los autos vienen a 45 km/h.',
    question: 'Como peatón o ciclista en la esquina, ¿cuándo debes iniciar el cruce?',
    options: [
      { text: 'Apenas veas la luz amarilla para no perder tiempo.', isCorrect: false, feedback: '¡Riesgo extremo! Autos aceleran para no quedar en rojo y pueden embestirte.' },
      { text: 'Cuando el semáforo peatonal esté en verde y los vehículos se hayan detenido totalmente.', isCorrect: true, feedback: '¡Perfecto! Esperar la detención física completa protege tu integridad.' },
      { text: 'Cuando un conductor toque la bocina.', isCorrect: false, feedback: 'La bocina no garantiza vía libre.' }
    ]
  },
  {
    id: 5,
    laneTitle: 'Carril 5: Intersección con Vía de Tren / Tranvía',
    laneType: 'train',
    scenario: 'Se activan las luces rojas intermitentes y la campana de paso a nivel.',
    question: '¿A cuántos metros de distancia se debe esperar la detención?',
    options: [
      { text: 'A menos de medio metro de la vía para sentir la ráfaga de aire.', isCorrect: false, feedback: '¡Peligro letal! El efecto succión y salientes de vagones pueden atraparte.' },
      { text: 'Detrás de la barrera de seguridad o al menos a 5 metros del riel.', isCorrect: true, feedback: '¡Exacto! El tren requiere hasta 400 metros para frenar y tiene gálibo ancho.' },
      { text: 'Correr y saltar sobre los rieles antes de que baje la barrera.', isCorrect: false, feedback: '¡Imprudencia mortal! Nunca compitas contra un convoy ferroviario.' }
    ]
  },
  {
    id: 6,
    laneTitle: 'Carril 6: Glorieta de Alto Flujo Vehicular',
    laneType: 'roundabout',
    scenario: 'Un camión de carga circula por el anillo exterior y activa su direccional para salir.',
    question: '¿Dónde está ubicado su punto ciego más peligroso?',
    options: [
      { text: 'En el lateral derecho a lo largo de toda la carrocería del camión.', isCorrect: true, feedback: '¡Acertaste! El costado derecho de un camión tiene un ángulo ciego de más de 4 metros.' },
      { text: 'Directamente en el techo del vehículo de carga.', isCorrect: false, feedback: 'El punto ciego lateral derecho es el responsable del 70% de atropellos en giros.' },
      { text: 'Los camiones modernos no tienen puntos ciegos.', isCorrect: false, feedback: 'Falso. Todo vehículo pesado tiene 4 puntos ciegos gigantes.' }
    ]
  },
  {
    id: 7,
    laneTitle: 'Meta: Parque de Movilidad Sostenible',
    laneType: 'park',
    scenario: '¡Llegaste al centro urbano protegido! Ahora puedes moverte libremente.',
    question: '¿Cuál es el orden jerárquico de prioridad en la movilidad moderna?',
    options: [
      { text: '1° Peatón, 2° Ciclista, 3° Transporte Público, 4° Carga, 5° Auto Particular.', isCorrect: true, feedback: '¡MÁXIMA CALIFICACIÓN! Conoces y respetas la Pirámide de la Movilidad Sostenible.' },
      { text: '1° Auto Particular, 2° Transporte Público, 3° Peatón.', isCorrect: false, feedback: 'La jerarquía vial moderna protege primero a los más vulnerables.' },
      { text: 'Quien vaya más rápido siempre tiene la prioridad.', isCorrect: false, feedback: 'La velocidad no da derechos de vía; la vida y la vulnerabilidad sí.' }
    ]
  }
];

/* ========================================================================= */
/* DATA 3: SOPA DE LETRAS VIAL (12x12 DISPERSA Y SIN COLISIONES)             */
/* ========================================================================= */
interface WordSearchDef {
  word: string;
  hint: string;
  coords: { r: number; c: number }[];
  color: string;
}

const SOPA_GRID: string[][] = [
  ['A', 'S', 'E', 'M', 'A', 'F', 'O', 'R', 'O', 'G', 'Z', 'P'],
  ['C', 'M', 'S', 'M', 'C', 'L', 'S', 'V', 'E', 'B', 'T', 'F'],
  ['P', 'C', 'M', 'Z', 'A', 'F', 'C', 'E', 'B', 'R', 'A', 'M'],
  ['R', 'S', 'C', 'Z', 'S', 'E', 'A', 'P', 'A', 'E', 'R', 'H'],
  ['E', 'R', 'I', 'O', 'C', 'O', 'A', 'R', 'F', 'L', 'I', 'P'],
  ['L', 'L', 'N', 'E', 'O', 'F', 'P', 'E', 'A', 'T', 'O', 'N'],
  ['A', 'L', 'T', 'L', 'L', 'V', 'O', 'R', 'D', 'B', 'H', 'P'],
  ['C', 'E', 'U', 'V', 'T', 'M', 'R', 'B', 'H', 'E', 'T', 'D'],
  ['I', 'T', 'R', 'V', 'E', 'L', 'O', 'C', 'I', 'D', 'A', 'D'],
  ['O', 'M', 'O', 'H', 'Z', 'L', 'I', 'A', 'E', 'O', 'L', 'C'],
  ['N', 'M', 'N', 'P', 'O', 'I', 'B', 'C', 'T', 'B', 'A', 'C'],
  ['C', 'B', 'I', 'C', 'I', 'C', 'L', 'E', 'T', 'A', 'R', 'P'],
];

const SOPA_WORDS: WordSearchDef[] = [
  {
    word: 'SEMAFORO',
    hint: 'Regula el tráfico por luces de colores',
    coords: [
      { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 0, c: 3 }, { r: 0, c: 4 },
      { r: 0, c: 5 }, { r: 0, c: 6 }, { r: 0, c: 7 }, { r: 0, c: 8 }
    ],
    color: '#3b82f6'
  },
  {
    word: 'CASCO',
    hint: 'Protege tu cabeza en bici o moto',
    coords: [
      { r: 1, c: 4 }, { r: 2, c: 4 }, { r: 3, c: 4 }, { r: 4, c: 4 }, { r: 5, c: 4 }
    ],
    color: '#10b981'
  },
  {
    word: 'CEBRA',
    hint: 'Paso peatonal rayado en el suelo',
    coords: [
      { r: 2, c: 6 }, { r: 2, c: 7 }, { r: 2, c: 8 }, { r: 2, c: 9 }, { r: 2, c: 10 }
    ],
    color: '#f59e0b'
  },
  {
    word: 'PRELACION',
    hint: 'Derecho preferente de paso',
    coords: [
      { r: 2, c: 0 }, { r: 3, c: 0 }, { r: 4, c: 0 }, { r: 5, c: 0 },
      { r: 6, c: 0 }, { r: 7, c: 0 }, { r: 8, c: 0 }, { r: 9, c: 0 }, { r: 10, c: 0 }
    ],
    color: '#06b6d4'
  },
  {
    word: 'PEATON',
    hint: 'Quien camina por la acera y cruces',
    coords: [
      { r: 5, c: 6 }, { r: 5, c: 7 }, { r: 5, c: 8 }, { r: 5, c: 9 }, { r: 5, c: 10 }, { r: 5, c: 11 }
    ],
    color: '#8b5cf6'
  },
  {
    word: 'CINTURON',
    hint: 'Sistema de retención que salva vidas en autos',
    coords: [
      { r: 3, c: 2 }, { r: 4, c: 2 }, { r: 5, c: 2 }, { r: 6, c: 2 },
      { r: 7, c: 2 }, { r: 8, c: 2 }, { r: 9, c: 2 }, { r: 10, c: 2 }
    ],
    color: '#ef4444'
  },
  {
    word: 'VELOCIDAD',
    hint: 'Razón de distancia y tiempo en la vía',
    coords: [
      { r: 8, c: 3 }, { r: 8, c: 4 }, { r: 8, c: 5 }, { r: 8, c: 6 },
      { r: 8, c: 7 }, { r: 8, c: 8 }, { r: 8, c: 9 }, { r: 8, c: 10 }, { r: 8, c: 11 }
    ],
    color: '#ec4899'
  },
  {
    word: 'BICICLETA',
    hint: 'Vehículo limpio de dos ruedas',
    coords: [
      { r: 11, c: 1 }, { r: 11, c: 2 }, { r: 11, c: 3 }, { r: 11, c: 4 },
      { r: 11, c: 5 }, { r: 11, c: 6 }, { r: 11, c: 7 }, { r: 11, c: 8 }, { r: 11, c: 9 }
    ],
    color: '#14b8a6'
  },
];

/* ========================================================================= */
/* DATA 4: MEMORAMA DE SEÑALES DE TRÁNSITO (8 PAREJAS = 16 CARTAS)           */
/* ========================================================================= */
interface MemoryCardItem {
  id: number;
  pairId: string;
  type: 'sign' | 'meaning';
  symbol: string;
  name: string;
  badge: 'Reglamentaria' | 'Preventiva' | 'Informativa';
  badgeColor: string;
}

const MEMORY_BASE_PAIRS = [
  { pairId: 'pare', symbol: '🛑', name: 'Señal de PARE', meaning: 'Detención total obligatoria antes de la línea', badge: 'Reglamentaria', badgeColor: 'bg-red-500' },
  { pairId: 'no_adelantar', symbol: '🚫', name: 'Prohibido Adelantar', meaning: 'Prohibición de invadir el carril contrario', badge: 'Reglamentaria', badgeColor: 'bg-red-500' },
  { pairId: 'curva', symbol: '⚠️', name: 'Curva Peligrosa', meaning: 'Reducción anticipada de velocidad por viraje', badge: 'Preventiva', badgeColor: 'bg-amber-500' },
  { pairId: 'escolar', symbol: '🚸', name: 'Zona Escolar', meaning: 'Prioridad de paso infantil y límite a 30 km/h', badge: 'Preventiva', badgeColor: 'bg-amber-500' },
  { pairId: 'ciclorruta', symbol: '🚴', name: 'Vía Exclusiva Bicis', meaning: 'Carril exclusivo para ciclistas y patinetas', badge: 'Informativa', badgeColor: 'bg-blue-500' },
  { pairId: 'cebra', symbol: '🚶', name: 'Paso Peatonal Cebra', meaning: 'Cruce protegido con máxima prioridad al peatón', badge: 'Informativa', badgeColor: 'bg-blue-500' },
  { pairId: 'contravia', symbol: '⛔', name: 'Sentido Prohibido', meaning: 'No ingresar en contravía bajo ninguna circunstancia', badge: 'Reglamentaria', badgeColor: 'bg-red-500' },
  { pairId: 'auxilio', symbol: '🏥', name: 'Puesto de Auxilio / SOS', meaning: 'Atención médica y asistencia en carretera', badge: 'Informativa', badgeColor: 'bg-blue-500' },
];

function buildShuffledMemoryCards(): MemoryCardItem[] {
  const cards: MemoryCardItem[] = [];
  let id = 1;
  MEMORY_BASE_PAIRS.forEach((item) => {
    // Card A (Symbol + Name)
    cards.push({
      id: id++,
      pairId: item.pairId,
      type: 'sign',
      symbol: item.symbol,
      name: item.name,
      badge: item.badge as any,
      badgeColor: item.badgeColor
    });
    // Card B (Meaning)
    cards.push({
      id: id++,
      pairId: item.pairId,
      type: 'meaning',
      symbol: item.symbol,
      name: item.meaning,
      badge: item.badge as any,
      badgeColor: item.badgeColor
    });
  });
  return cards.sort(() => Math.random() - 0.5);
}

/* ========================================================================= */
/* DATA 5: EMPAREJAR COLUMNAS (RELACIONAR CONCEPTOS)                         */
/* ========================================================================= */
interface MatchPairItem {
  id: string;
  leftTitle: string;
  leftCategory: string;
  rightMeaning: string;
}

const MATCH_PAIRS_DATA: MatchPairItem[] = [
  { id: '1', leftTitle: 'Línea Continua Amarilla', leftCategory: 'Normativa', rightMeaning: 'Prohíbe terminantemente adelantar en ambos sentidos de la calzada' },
  { id: '2', leftTitle: 'Regla de los 3 Segundos', leftCategory: 'Prevención', rightMeaning: 'Distancia mínima de seguridad con respecto al vehículo delantero' },
  { id: '3', leftTitle: 'Puntos Ciegos de Camiones', leftCategory: 'Tráfico', rightMeaning: 'Zonas laterales donde los espejos no detectan ciclistas ni motos' },
  { id: '4', leftTitle: 'Efecto Túnel al Conducir', leftCategory: 'Prevención', rightMeaning: 'Pérdida severa de visión periférica provocada por exceso de velocidad' },
  { id: '5', leftTitle: 'Prelación en Glorieta', leftCategory: 'Tránsito', rightMeaning: 'Prioridad de paso que tiene quien ya circula dentro del anillo' },
  { id: '6', leftTitle: 'Zona 30 Residencial', leftCategory: 'Movilidad', rightMeaning: 'Límite de velocidad donde la supervivencia del peatón alcanza el 90%' }
];

/* ========================================================================= */
/* COMPONENTE PRINCIPAL: SUITE DE JUEGOS EDUCAPLAY                           */
/* ========================================================================= */
export const EducaplayGamesSuite: React.FC<EducaplayGamesSuiteProps> = ({
  initialGame = 'ruleta',
  onPointsEarned
}) => {
  const [activeGame, setActiveGame] = useState<EducaplayGameType>(initialGame);
  const [totalScore, setTotalScore] = useState<number>(() => {
    try {
      const s = localStorage.getItem('vianova_game_score');
      return s ? parseInt(s, 10) : 0;
    } catch (_) {
      return 0;
    }
  });
  const [isMuted, setIsMuted] = useState<boolean>(() => gameAudio.getMuted());

  const addScore = (pts: number) => {
    setTotalScore((prev) => {
      const updated = prev + pts;
      try {
        localStorage.setItem('vianova_game_score', updated.toString());
      } catch (_) {}
      return updated;
    });
    if (onPointsEarned) onPointsEarned(pts);
  };

  const handleToggleMute = () => {
    const muted = gameAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="w-full space-y-8 animate-fade-in text-slate-800">
      
      {/* ===================================================================== */}
      {/* CABECERA ESTILO EDUCAPLAY: CONTADORES, SONIDO Y SELECTOR DE JUEGOS    */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-[#0a193b] via-[#0b2b63] to-[#0057d9] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-black tracking-wide border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ZONA DE JUEGOS Y RETOS VIALES • APRENDIZAJE INTERACTIVO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Aprende Jugando: Tráfico, Tránsito y Prevención
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Juegos interactivos y dinámicos para entrenar tus reflejos viales. Gana puntos, desbloquea insignias y conviértete en un conductor y peatón modelo.
            </p>
          </div>

          {/* Widgets de Estadísticas y Control */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap">
            {/* Puntos acumulados */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-black">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-200 block">Puntaje Total</span>
                <span className="text-xl font-black text-white">{totalScore} pts</span>
              </div>
            </div>

            {/* Sonido Toggle */}
            <button
              onClick={handleToggleMute}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer flex items-center justify-center shadow-xs"
              title={isMuted ? 'Activar sonido de los juegos' : 'Silenciar sonido'}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-rose-300" /> : <Volume2 className="w-5 h-5 text-emerald-300" />}
            </button>
          </div>
        </div>

        {/* SELECTOR DE ACTIVIDADES EDUCAPLAY (6 Juegos Didácticos) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mt-6 pt-6 border-t border-white/10">
          {[
            { id: 'ruleta', label: 'Ruleta Vial', subtitle: 'Pasapalabra A-Z', icon: '🎡', color: 'from-amber-500/20 to-orange-500/20' },
            { id: 'froggy', label: 'Cruce Seguro', subtitle: 'Froggy Jumps', icon: '🐸', color: 'from-emerald-500/20 to-teal-500/20' },
            { id: 'sopa', label: 'Sopa de Letras', subtitle: '12x12 Dispersa', icon: '🔍', color: 'from-blue-500/20 to-indigo-500/20' },
            { id: 'memorama', label: 'Memorama', subtitle: 'Señales de Tránsito', icon: '🃏', color: 'from-purple-500/20 to-pink-500/20' },
            { id: 'columnas', label: 'Emparejar', subtitle: 'Unir Columnas', icon: '🔗', color: 'from-cyan-500/20 to-blue-500/20' },
            { id: 'completar', label: 'Completar', subtitle: 'Frases de Vida', icon: '✍️', color: 'from-rose-500/20 to-red-500/20' },
          ].map((game) => {
            const isSelected = activeGame === game.id;
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => {
                  setActiveGame(game.id as EducaplayGameType);
                  gameAudio.playFlip();
                }}
                className={`p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white text-slate-950 font-black shadow-lg scale-[1.03] border-white'
                    : 'bg-white/10 hover:bg-white/15 text-white border-white/10'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xl">{game.icon}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">{game.label}</h4>
                  <p className={`text-[10px] ${isSelected ? 'text-slate-600 font-semibold' : 'text-blue-200'}`}>
                    {game.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ÁREA DE JUEGO DINÁMICA                                                */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-sm p-4 sm:p-8 overflow-hidden">
        {activeGame === 'ruleta' && (
          <GameRuletaPasapalabra onScore={addScore} />
        )}
        {activeGame === 'froggy' && (
          <GameFroggyCruce onScore={addScore} />
        )}
        {activeGame === 'sopa' && (
          <GameSopaDeLetras onScore={addScore} />
        )}
        {activeGame === 'memorama' && (
          <GameMemoramaSenales onScore={addScore} />
        )}
        {activeGame === 'columnas' && (
          <GameEmparejarColumnas onScore={addScore} />
        )}
        {activeGame === 'completar' && (
          <GameCompletarFrases onScore={addScore} />
        )}
      </div>

    </div>
  );
};

/* ========================================================================= */
/* 1. JUEGO: RULETA DE PALABRAS VIAL (PASAPALABRA A-Z)                       */
/* ========================================================================= */
function GameRuletaPasapalabra({ onScore }: { onScore: (pts: number) => void }) {
  const [items, setItems] = useState<RuletaItem[]>(INITIAL_RULETA_ITEMS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    if (timeLeft <= 0) {
      handleFinishGame();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, isGameOver, timeLeft]);

  // Focus input
  useEffect(() => {
    if (isPlaying && !isGameOver) {
      inputRef.current?.focus();
    }
  }, [currentIndex, isPlaying, isGameOver]);

  const currentItem = items[currentIndex];

  const handleFinishGame = () => {
    setIsGameOver(true);
    setIsPlaying(false);
    const correctCount = items.filter((i) => i.status === 'correct').length;
    if (correctCount >= 10) {
      gameAudio.playWin();
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch (_) {}
    }
  };

  const handleCheckAnswer = () => {
    if (!userInput.trim() || isGameOver) return;

    const normalize = (str: string) => 
      str.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const isMatch = normalize(userInput) === normalize(currentItem.answer);

    const updated = [...items];
    if (isMatch) {
      updated[currentIndex].status = 'correct';
      gameAudio.playCorrect();
      onScore(20);
      setFeedbackMsg({ text: `¡Correcto! ${currentItem.answer}`, isCorrect: true });
    } else {
      updated[currentIndex].status = 'wrong';
      gameAudio.playError();
      setFeedbackMsg({ text: `Incorrecto. La respuesta era: ${currentItem.answer}`, isCorrect: false });
    }

    setItems(updated);
    setUserInput('');

    // Advance to next pending/skipped letter
    setTimeout(() => {
      setFeedbackMsg(null);
      moveToNextUnresolved(updated, currentIndex);
    }, 1200);
  };

  const handlePasapalabra = () => {
    if (isGameOver) return;
    const updated = [...items];
    if (updated[currentIndex].status === 'pending') {
      updated[currentIndex].status = 'skipped';
    }
    setItems(updated);
    setUserInput('');
    gameAudio.playFlip();
    moveToNextUnresolved(updated, currentIndex);
  };

  const moveToNextUnresolved = (currentList: RuletaItem[], fromIdx: number) => {
    const unresolvedIndices: number[] = [];
    currentList.forEach((it, idx) => {
      if (it.status === 'pending' || it.status === 'skipped') {
        unresolvedIndices.push(idx);
      }
    });

    if (unresolvedIndices.length === 0) {
      handleFinishGame();
      return;
    }

    // Find next index after fromIdx
    const nextIdx = unresolvedIndices.find((idx) => idx > fromIdx) ?? unresolvedIndices[0];
    setCurrentIndex(nextIdx);
  };

  const handleRestart = () => {
    setItems(INITIAL_RULETA_ITEMS.map((it) => ({ ...it, status: 'pending' })));
    setCurrentIndex(0);
    setUserInput('');
    setTimeLeft(180);
    setIsPlaying(true);
    setIsGameOver(false);
    setFeedbackMsg(null);
  };

  const correctCount = items.filter((i) => i.status === 'correct').length;
  const wrongCount = items.filter((i) => i.status === 'wrong').length;

  return (
    <div className="space-y-6">
      {/* Bar Top: Timer, Acertadas, Errores */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-blue-100 text-blue-700 text-xs font-black flex items-center gap-1.5">
            <Timer className="w-4 h-4" />
            <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">
            Palabra {currentIndex + 1} de {items.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{correctCount} Aciertos</span>
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-rose-700">
            <X className="w-4 h-4 text-rose-600" />
            <span>{wrongCount} Errores</span>
          </span>
          <button
            onClick={handleRestart}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
            title="Reiniciar Ruleta"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isGameOver ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* RULETA CIRCULAR DE LETRAS */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-4">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center border-4 border-slate-100 shadow-inner bg-slate-50/60">
              {/* Center Letter Avatar */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#0a193b] to-[#0057d9] text-white flex flex-col items-center justify-center shadow-2xl border-4 border-white">
                <span className="text-xs font-black text-cyan-300 uppercase tracking-widest">
                  {currentItem?.type === 'starts' ? 'Empieza con' : 'Contiene'}
                </span>
                <span className="text-4xl sm:text-5xl font-black">{currentItem?.letter}</span>
                <span className="text-[10px] text-blue-200 font-semibold">{currentItem?.category}</span>
              </div>

              {/* Ring of Letter Badges */}
              {items.map((item, idx) => {
                const total = items.length;
                const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
                const radius = 110; // Radius in px
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isCurrent = idx === currentIndex;

                let badgeColor = 'bg-slate-200 text-slate-700';
                if (item.status === 'correct') badgeColor = 'bg-emerald-500 text-white ring-2 ring-emerald-300';
                if (item.status === 'wrong') badgeColor = 'bg-rose-500 text-white ring-2 ring-rose-300';
                if (item.status === 'skipped') badgeColor = 'bg-amber-400 text-slate-900';
                if (isCurrent) badgeColor = 'bg-blue-600 text-white scale-125 ring-4 ring-blue-300 animate-pulse';

                return (
                  <div
                    key={item.letter}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all shadow-md ${badgeColor}`}
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                  >
                    {item.letter}
                  </div>
                );
              })}
            </div>
          </div>

          {/* TARJETA DE DEFINICIÓN Y ENTRADA DE RESPUESTA */}
          <div className="lg:col-span-6 space-y-5 bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider inline-block">
                Definición Vial • {currentItem?.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {currentItem?.question}
              </h3>
            </div>

            {/* Feedback alert */}
            {feedbackMsg && (
              <div className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fade-in ${
                feedbackMsg.isCorrect
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                {feedbackMsg.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
                <span>{feedbackMsg.text}</span>
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckAnswer();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Escribe tu respuesta:
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={`Palabra que ${currentItem?.type === 'starts' ? 'empieza con' : 'contiene'} ${currentItem?.letter}...`}
                  className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-slate-900 font-bold text-base outline-none uppercase transition-all"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#0057d9] hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>

                <button
                  type="button"
                  onClick={handlePasapalabra}
                  className="py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Pasapalabra</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      ) : (
        /* PANTALLA FINAL DE RULETA */
        <div className="text-center py-10 space-y-6 max-w-md mx-auto animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-lg">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">¡Juego Completado!</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Acertaste <strong className="text-emerald-600">{correctCount}</strong> de {items.length} palabras del vocabulario vial.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-around">
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase">Aciertos</span>
              <p className="text-2xl font-black text-emerald-600">{correctCount}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase">Puntos</span>
              <p className="text-2xl font-black text-blue-600">+{correctCount * 20} pts</p>
            </div>
          </div>
          <button
            onClick={handleRestart}
            className="w-full py-3.5 rounded-xl bg-[#0a193b] hover:bg-[#0057d9] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar Nueva Partida</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* 2. JUEGO: FROGGY JUMPS / CRUCE SEGURO                                      */
/* ========================================================================= */
function GameFroggyCruce({ onScore }: { onScore: (pts: number) => void }) {
  const [currentLaneIdx, setCurrentLaneIdx] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const lane = FROGGY_LANES[currentLaneIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted || isGameOver || isWon) return;
    setSelectedOptionIdx(idx);
    setIsAnswerSubmitted(true);

    const chosen = lane.options[idx];
    if (chosen.isCorrect) {
      gameAudio.playJump();
      onScore(25);
      // Wait and advance
      setTimeout(() => {
        if (currentLaneIdx + 1 < FROGGY_LANES.length) {
          setCurrentLaneIdx((prev) => prev + 1);
          setSelectedOptionIdx(null);
          setIsAnswerSubmitted(false);
        } else {
          setIsWon(true);
          gameAudio.playWin();
          try {
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
          } catch (_) {}
        }
      }, 1500);
    } else {
      gameAudio.playError();
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        setTimeout(() => {
          setIsGameOver(true);
        }, 1500);
      }
    }
  };

  const handleRestart = () => {
    setCurrentLaneIdx(0);
    setLives(3);
    setSelectedOptionIdx(null);
    setIsAnswerSubmitted(false);
    setIsWon(false);
    setIsGameOver(false);
  };

  return (
    <div className="space-y-6">
      {/* HUD Header */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vidas:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((heart) => (
              <Heart
                key={heart}
                className={`w-5 h-5 transition-all ${
                  heart <= lives ? 'text-rose-500 fill-rose-500 scale-105' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-xl">
            Calzada {currentLaneIdx + 1} de {FROGGY_LANES.length}
          </span>
          <button
            onClick={handleRestart}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
            title="Reiniciar Cruce Seguro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isGameOver && !isWon ? (
        <div className="space-y-6">
          {/* ANIMATED HIGHWAY LANES PROGRESSION */}
          <div className="relative bg-slate-900 rounded-3xl p-5 overflow-hidden shadow-inner border-2 border-slate-800">
            {/* Visual Lanes Track */}
            <div className="space-y-2">
              {FROGGY_LANES.map((l, idx) => {
                const isCurrent = idx === currentLaneIdx;
                const isPassed = idx < currentLaneIdx;
                return (
                  <div
                    key={l.id}
                    className={`h-9 rounded-xl flex items-center justify-between px-4 transition-all ${
                      isCurrent
                        ? 'bg-amber-400/20 border-2 border-amber-400 text-amber-300'
                        : isPassed
                        ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-800/60 text-slate-500 border border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-black">{idx + 1}</span>
                      <span className="text-xs font-bold truncate max-w-xs">{l.laneTitle}</span>
                    </div>

                    {isCurrent && (
                      <div className="flex items-center gap-1.5 text-xs font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md animate-bounce">
                        <span>🐸 ¡Cruza Aquí!</span>
                      </div>
                    )}
                    {isPassed && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SITUATION & DECISION CARD */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider inline-block">
                {lane.laneTitle}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                <strong>Situación en vía:</strong> {lane.scenario}
              </p>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-1">
                {lane.question}
              </h3>
            </div>

            {/* Decision Buttons */}
            <div className="space-y-3 pt-2">
              {lane.options.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                let btnStyle = 'bg-white border-slate-200 hover:border-blue-400 text-slate-800';

                if (isAnswerSubmitted) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500 font-bold';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-500';
                  } else {
                    btnStyle = 'bg-slate-100 opacity-60 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {isAnswerSubmitted && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                      <X className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback text */}
            {isAnswerSubmitted && selectedOptionIdx !== null && (
              <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed animate-fade-in ${
                lane.options[selectedOptionIdx].isCorrect
                  ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                  : 'bg-rose-100 text-rose-950 border border-rose-300'
              }`}>
                {lane.options[selectedOptionIdx].feedback}
              </div>
            )}
          </div>
        </div>
      ) : isWon ? (
        /* PANTALLA DE VICTORIA */
        <div className="text-center py-10 space-y-6 max-w-md mx-auto animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-lg">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">¡Cruzaste con Éxito Todas las Calzadas!</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Demostraste reflejos y criterio de seguridad preventiva en zonas complejas y glorietas.
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar de Nuevo</span>
          </button>
        </div>
      ) : (
        /* PANTALLA DE GAME OVER */
        <div className="text-center py-10 space-y-6 max-w-md mx-auto animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto border-2 border-rose-300 shadow-lg">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">¡Te quedaste sin vidas!</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              En la vía real no hay segundas oportunidades. Repasa las reglas de contacto visual y puntos ciegos.
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="w-full py-3.5 rounded-xl bg-[#0a193b] hover:bg-[#0057d9] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Intentar de Nuevo</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* 3. JUEGO: SOPA DE LETRAS VIAL (12x12 DISPERSA)                            */
/* ========================================================================= */
function GameSopaDeLetras({ onScore }: { onScore: (pts: number) => void }) {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [revealedHintWord, setRevealedHintWord] = useState<string | null>(null);

  const handleCellClick = (r: number, c: number) => {
    gameAudio.playFlip();
    const alreadySelected = selectedCells.some((cell) => cell.r === r && cell.c === c);
    let nextCells = alreadySelected
      ? selectedCells.filter((cell) => !(cell.r === r && cell.c === c))
      : [...selectedCells, { r, c }];

    setSelectedCells(nextCells);

    // Check if nextCells form any unfound word
    const matchedWord = SOPA_WORDS.find((sw) => {
      if (foundWords.includes(sw.word)) return false;
      if (sw.coords.length !== nextCells.length) return false;
      return sw.coords.every((sc) => nextCells.some((nc) => nc.r === sc.r && nc.c === sc.c));
    });

    if (matchedWord) {
      gameAudio.playCorrect();
      onScore(30);
      setFoundWords((prev) => [...prev, matchedWord.word]);
      setSelectedCells([]);
      if (foundWords.length + 1 === SOPA_WORDS.length) {
        gameAudio.playWin();
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch (_) {}
      }
    }
  };

  const handleHint = () => {
    const unfound = SOPA_WORDS.find((w) => !foundWords.includes(w.word));
    if (unfound) {
      setRevealedHintWord(unfound.word);
      setTimeout(() => setRevealedHintWord(null), 3000);
    }
  };

  const handleRestart = () => {
    setFoundWords([]);
    setSelectedCells([]);
  };

  return (
    <div className="space-y-6">
      {/* HUD Header */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Palabras Encontradas:</span>
          <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-xs font-black">
            {foundWords.length} / {SOPA_WORDS.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleHint}
            className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Pista</span>
          </button>
          <button
            onClick={handleRestart}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
            title="Reiniciar Sopa"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {revealedHintWord && (
        <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs font-bold animate-fade-in flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span>Pista: Busca la palabra <strong>"{revealedHintWord}"</strong>. {SOPA_WORDS.find(w => w.word === revealedHintWord)?.hint}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 12x12 LETTER GRID */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="grid grid-cols-12 gap-1 p-2 sm:p-3.5 bg-slate-900 rounded-3xl border-4 border-slate-800 shadow-xl max-w-sm sm:max-w-md w-full">
            {SOPA_GRID.map((row, rIdx) =>
              row.map((letter, cIdx) => {
                const isSelected = selectedCells.some((c) => c.r === rIdx && c.c === cIdx);

                // Check if belongs to a found word
                const foundWordDef = SOPA_WORDS.find(
                  (sw) => foundWords.includes(sw.word) && sw.coords.some((co) => co.r === rIdx && co.c === cIdx)
                );

                let cellClass = 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white';
                const cellStyle: React.CSSProperties = {};

                if (foundWordDef) {
                  cellClass = 'text-white font-black shadow-md scale-105 ring-1 ring-white/40';
                  cellStyle.backgroundColor = foundWordDef.color;
                } else if (isSelected) {
                  cellClass = 'bg-blue-600 text-white font-black ring-2 ring-blue-300 scale-105';
                }

                return (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    type="button"
                    onClick={() => handleCellClick(rIdx, cIdx)}
                    style={cellStyle}
                    className={`aspect-square rounded-md sm:rounded-lg text-[10px] sm:text-xs md:text-sm font-black flex items-center justify-center transition-all cursor-pointer select-none ${cellClass}`}
                  >
                    {letter}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* WORD BANK LIST */}
        <div className="lg:col-span-5 space-y-3 bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-200">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
            Banco de Palabras Viales ({SOPA_WORDS.length}):
          </h4>
          <div className="space-y-2">
            {SOPA_WORDS.map((w) => {
              const isFound = foundWords.includes(w.word);
              return (
                <div
                  key={w.word}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                    isFound
                      ? 'bg-slate-100 border-slate-300 text-slate-500 line-through opacity-85'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-xs ring-1 ring-black/10"
                      style={{ backgroundColor: w.color }}
                      title={`Color: ${w.word}`}
                    />
                    <div>
                      <span className="font-black tracking-wide block text-slate-900">{w.word}</span>
                      <span className="text-[10px] text-slate-500 no-underline">{w.hint}</span>
                    </div>
                  </div>
                  {isFound ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ========================================================================= */
/* 4. JUEGO: MEMORAMA DE SEÑALES DE TRÁNSITO                                  */
/* ========================================================================= */
function GameMemoramaSenales({ onScore }: { onScore: (pts: number) => void }) {
  const [cards, setCards] = useState<MemoryCardItem[]>(() => buildShuffledMemoryCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);

  const handleCardClick = (cardId: number, pairId: string) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId)) return;
    if (matchedPairs.includes(pairId)) return;

    gameAudio.playFlip();
    const nextFlipped = [...flippedCards, cardId];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const cardA = cards.find((c) => c.id === nextFlipped[0]);
      const cardB = cards.find((c) => c.id === nextFlipped[1]);

      if (cardA && cardB && cardA.pairId === cardB.pairId) {
        // Matched!
        gameAudio.playCorrect();
        onScore(35);
        setMatchedPairs((prev) => [...prev, cardA.pairId]);
        setFlippedCards([]);

        if (matchedPairs.length + 1 === MEMORY_BASE_PAIRS.length) {
          gameAudio.playWin();
          try {
            confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
          } catch (_) {}
        }
      } else {
        // Not matched
        gameAudio.playError();
        setTimeout(() => {
          setFlippedCards([]);
        }, 1100);
      }
    }
  };

  const handleRestart = () => {
    setCards(buildShuffledMemoryCards());
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
  };

  const isCompleted = matchedPairs.length === MEMORY_BASE_PAIRS.length;

  return (
    <div className="space-y-6">
      {/* HUD Header */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase">Parejas Halladas:</span>
          <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-xs font-black">
            {matchedPairs.length} / {MEMORY_BASE_PAIRS.length}
          </span>
          <span className="text-xs font-semibold text-slate-500">({moves} Intentos)</span>
        </div>

        <button
          onClick={handleRestart}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
          title="Reiniciar Memorama"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {!isCompleted ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((card) => {
            const isFlipped = flippedCards.includes(card.id) || matchedPairs.includes(card.pairId);
            const isMatched = matchedPairs.includes(card.pairId);

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(card.id, card.pairId)}
                className={`h-28 sm:h-36 rounded-2xl p-3 border-2 text-center transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                  isFlipped
                    ? isMatched
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                      : 'bg-white border-blue-500 shadow-md ring-2 ring-blue-100'
                    : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white hover:border-slate-600'
                }`}
              >
                {isFlipped ? (
                  <div className="space-y-1.5 animate-fade-in flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl">{card.symbol}</span>
                    <span className="text-[11px] sm:text-xs font-black line-clamp-2 leading-tight">
                      {card.name}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 font-extrabold text-slate-600">
                      {card.badge}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 opacity-70">
                    <HelpCircle className="w-7 h-7 text-blue-400" />
                    <span className="text-[10px] font-bold text-slate-400">VIANOVA</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 space-y-6 max-w-md mx-auto animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-lg">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">¡Memoria Vial Impecable!</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Emparejaste las 8 señales reglamentarias, preventivas e informativas en {moves} intentos.
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="w-full py-3.5 rounded-xl bg-[#0a193b] hover:bg-[#0057d9] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar Nueva Partida</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* 5. JUEGO: EMPAREJAR COLUMNAS (RELACIONAR CONCEPTOS VIALES)                */
/* ========================================================================= */
function GameEmparejarColumnas({ onScore }: { onScore: (pts: number) => void }) {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [shuffledRight] = useState(() => [...MATCH_PAIRS_DATA].sort(() => Math.random() - 0.5));

  const handleLeftClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    gameAudio.playFlip();
    setSelectedLeftId(id);
    if (selectedRightId) checkMatch(id, selectedRightId);
  };

  const handleRightClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    gameAudio.playFlip();
    setSelectedRightId(id);
    if (selectedLeftId) checkMatch(selectedLeftId, id);
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      gameAudio.playCorrect();
      onScore(20);
      setMatchedIds((prev) => [...prev, leftId]);
      setSelectedLeftId(null);
      setSelectedRightId(null);

      if (matchedIds.length + 1 === MATCH_PAIRS_DATA.length) {
        gameAudio.playWin();
        try {
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        } catch (_) {}
      }
    } else {
      gameAudio.playError();
      setTimeout(() => {
        setSelectedLeftId(null);
        setSelectedRightId(null);
      }, 700);
    }
  };

  const handleRestart = () => {
    setMatchedIds([]);
    setSelectedLeftId(null);
    setSelectedRightId(null);
  };

  const isCompleted = matchedIds.length === MATCH_PAIRS_DATA.length;

  return (
    <div className="space-y-6">
      {/* HUD Header */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Parejas Relacionadas:</span>
          <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-xs font-black">
            {matchedIds.length} / {MATCH_PAIRS_DATA.length}
          </span>
        </div>

        <button
          onClick={handleRestart}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
          title="Reiniciar Emparejamiento"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {!isCompleted ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* COLUMNA IZQUIERDA: CONCEPTOS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Columna A • Conceptos Viales:
            </h4>
            {MATCH_PAIRS_DATA.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedLeftId === item.id;
              let style = 'bg-white border-slate-200 hover:border-blue-400 text-slate-800';

              if (isMatched) {
                style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold opacity-80';
              } else if (isSelected) {
                style = 'bg-blue-600 border-blue-600 text-white font-bold ring-2 ring-blue-200';
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleLeftClick(item.id)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${style}`}
                >
                  <div>
                    <span className="block font-bold">{item.leftTitle}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                      {item.leftCategory}
                    </span>
                  </div>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* COLUMNA DERECHA: SIGNIFICADOS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Columna B • Norma o Significado:
            </h4>
            {shuffledRight.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedRightId === item.id;
              let style = 'bg-white border-slate-200 hover:border-blue-400 text-slate-800';

              if (isMatched) {
                style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold opacity-80';
              } else if (isSelected) {
                style = 'bg-blue-600 border-blue-600 text-white font-bold ring-2 ring-blue-200';
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleRightClick(item.id)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${style}`}
                >
                  <span className="leading-snug">{item.rightMeaning}</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

        </div>
      ) : (
        <div className="text-center py-10 space-y-6 max-w-md mx-auto animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-lg">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">¡Conceptos Conectados!</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Comprendes a cabalidad las normas de adelantamiento, zonas residenciales y visibilidad vial.
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="w-full py-3.5 rounded-xl bg-[#0a193b] hover:bg-[#0057d9] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar de Nuevo</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* 6. JUEGO: COMPLETAR FRASES VIALES                                         */
/* ========================================================================= */
interface SentenceItem {
  id: number;
  textBefore: string;
  missingWord: string;
  textAfter: string;
  options: string[];
  explanation: string;
}

const SENTENCES_DATA: SentenceItem[] = [
  {
    id: 1,
    textBefore: 'Al adelantar a un ciclista en vía urbana o carretera, se debe mantener una distancia lateral mínima obligatoria de',
    missingWord: '1.5 metros',
    textAfter: 'para evitar desestabilizarlo por la estela de viento.',
    options: ['1.5 metros', '30 centímetros', '5 metros', 'ninguna distancia'],
    explanation: 'El artículo reglamentario protege a ciclistas del efecto turbulencia al exigir al menos 1.5 metros.'
  },
  {
    id: 2,
    textBefore: 'En una glorieta o rotonda urbana, la prioridad de paso pertenece siempre a los vehículos que',
    missingWord: 'ya circulan dentro del anillo',
    textAfter: 'y no a quienes intentan ingresar.',
    options: ['ya circulan dentro del anillo', 'tocan la bocina con fuerza', 'vienen por la avenida más ancha', 'tienen mayor velocidad'],
    explanation: 'Ceder el paso al ingresar a la glorieta garantiza fluidez continua y previene choques de costado.'
  },
  {
    id: 3,
    textBefore: 'La probabilidad de que un peatón sobreviva a un atropello es del 90% si el vehículo viaja a',
    missingWord: '30 km/h',
    textAfter: 'mientras que a 50 km/h la probabilidad cae al 50%.',
    options: ['30 km/h', '80 km/h', '100 km/h', '60 km/h'],
    explanation: 'A 30 km/h la energía cinética se reduce drásticamente, salvando vidas en zonas residenciales y escolares.'
  }
];

function GameCompletarFrases({ onScore }: { onScore: (pts: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const sentence = SENTENCES_DATA[currentIdx];

  const handleSelectWord = (word: string) => {
    if (isAnswered) return;
    setSelectedWord(word);
    setIsAnswered(true);

    if (word === sentence.missingWord) {
      gameAudio.playCorrect();
      onScore(25);
    } else {
      gameAudio.playError();
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < SENTENCES_DATA.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedWord(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      gameAudio.playWin();
      try {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      } catch (_) {}
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedWord(null);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* HUD Header */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-xs font-black">
          Frase {currentIdx + 1} de {SENTENCES_DATA.length}
        </span>
        <button
          onClick={handleRestart}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
          title="Reiniciar Frases"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* SENTENCE CARD WITH BLANK SPOT */}
          <div className="p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
              Completa la norma de prevención vital:
            </span>

            <p className="text-base sm:text-xl font-medium text-slate-800 leading-relaxed">
              {sentence.textBefore}{' '}
              <span className={`inline-block px-3 py-1 rounded-xl border-2 font-black transition-all ${
                isAnswered
                  ? selectedWord === sentence.missingWord
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                    : 'bg-rose-100 border-rose-500 text-rose-950 line-through'
                  : 'bg-white border-dashed border-blue-400 text-blue-600'
              }`}>
                {selectedWord || '[ ... ? ... ]'}
              </span>{' '}
              {sentence.textAfter}
            </p>
          </div>

          {/* WORD CHIP OPTIONS */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Selecciona la palabra o término correcto:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sentence.options.map((opt) => {
                const isSelected = selectedWord === opt;
                let style = 'bg-white border-slate-200 hover:border-blue-400 text-slate-800';

                if (isAnswered) {
                  if (opt === sentence.missingWord) {
                    style = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500 font-bold';
                  } else if (isSelected) {
                    style = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-500';
                  } else {
                    style = 'bg-slate-100 opacity-60 text-slate-400';
                  }
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectWord(opt)}
                    className={`p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer disabled:cursor-default ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation & Next */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
              <p className="text-xs text-blue-900 leading-relaxed font-medium">
                <strong>¿Por qué?</strong> {sentence.explanation}
              </p>
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-[#0a193b] hover:bg-[#0057d9] text-white text-xs font-bold transition flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs"
              >
                <span>Siguiente Frase</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 space-y-6 max-w-md mx-auto animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-lg">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">¡Frases Completadas con Éxito!</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Has asimilado principios claves de distancia lateral, glorietas y límites salvavidas.
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="w-full py-3.5 rounded-xl bg-[#0a193b] hover:bg-[#0057d9] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar de Nuevo</span>
          </button>
        </div>
      )}
    </div>
  );
}
