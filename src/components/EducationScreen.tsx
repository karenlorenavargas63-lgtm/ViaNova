import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Trophy, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Check,
  BookOpen,
  X,
  Award,
  PlayCircle,
  Video,
  FileText,
  Compass,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Maximize2,
  Bike,
  Footprints,
  Scale,
  Zap,
  RotateCw,
  Gamepad2,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

import cyclistsGreenBikeway from '../assets/images/cyclists_green_bikeway_1788438597822.jpg';
import scooterBikewayPov from '../assets/images/scooter_bikeway_pov_1788438617913.jpg';
import pedestrianSignDusk from '../assets/images/pedestrian_sign_dusk_1788438631922.jpg';
import roundaboutDiagram from '../assets/images/roundabout_diagram_1788438648636.jpg';
import incidentResponseAgent from '../assets/images/incident_response_agent_1788438663707.jpg';
import pedestrianSafeCrosswalk from '../assets/images/pedestrian_safe_crosswalk_1788876049804.jpg';

import { 
  DIDACTIC_VIDEOS, 
  DidacticVideo, 
  VideoTopicType,
  DIDACTIC_INFOGRAPHICS, 
  DidacticInfographic, 
  ROAD_SCENARIOS, 
  RoadScenario 
} from '../data/didacticSafetyData';
import { EducaplayGamesSuite } from './EducaplayGamesSuite';

// Educational Navigation Modes
export type DidacticSectionType = 'juegos' | 'videos' | 'cursos' | 'infografias' | 'simulador' | 'evaluacion';

// Categories Configuration for Courses
export type CourseCategoryType = 'micromovilidad' | 'peatonal' | 'normativa';

export interface CategoryTabItem {
  id: CourseCategoryType;
  label: string;
  badge: string;
  description: string;
}

export const CATEGORY_TABS: CategoryTabItem[] = [
  {
    id: 'micromovilidad',
    label: 'Micromovilidad',
    badge: 'Bicis y Patinetas',
    description: 'Cursos específicos para ciclorrutas, movilidad ligera, puntos ciegos y convivencia segura.',
  },
  {
    id: 'peatonal',
    label: 'Seguridad Peatonal',
    badge: 'Peatones y Cruces Seguros',
    description: 'Capacitación dedicada a pasos de cebra, visibilidad del peatón y protocolo PAS de respuesta a incidentes.',
  },
  {
    id: 'normativa',
    label: 'Normativa Urbana',
    badge: 'Leyes y Señalización',
    description: 'Normativa de tránsito, semaforización adaptativa, zonas 30 y jerarquía vial.',
  },
];

// Base Course Information
export interface CourseItem {
  id: string;
  title: string;
  categoryKey: CourseCategoryType;
  categoryLabel: string;
  level: string;
  duration: string;
  description: string;
  image: string;
  recommended?: boolean;
  featured?: boolean;
  lessons: string[];
}

export const COURSES_DATA: CourseItem[] = [
  {
    id: 'course_1',
    title: 'Navegación Urbana Segura',
    categoryKey: 'micromovilidad',
    categoryLabel: 'Micromovilidad',
    level: 'Básico',
    duration: '2.5 hrs',
    description: 'Aprende los fundamentos para moverte por la ciudad en bicicleta o patineta minimizando riesgos y compartiendo la vía.',
    image: cyclistsGreenBikeway,
    recommended: true,
    featured: true,
    lessons: [
      'Identificación de puntos ciegos vehiculares',
      'Uso correcto de luces y cascos certificados',
      'Convivencia con transporte público masivo',
      'Anticipación a puertas de autos estacionados'
    ]
  },
  {
    id: 'course_2',
    title: 'Dominio de Ciclovías',
    categoryKey: 'micromovilidad',
    categoryLabel: 'Micromovilidad',
    level: 'Intermedio',
    duration: '45 min',
    description: 'Conoce las normativas técnicas de circulación en ciclorrutas, señalización de giros con los brazos y respeto a pasos de cebra.',
    image: scooterBikewayPov,
    lessons: [
      'Señales manuales de viraje y frenado',
      'Velocidades máximas en carriles bici (25 km/h)',
      'Prioridad al peatón en intersecciones de ciclorrutas',
      'Mantenimiento básico de frenos y presión de llantas'
    ]
  },
  {
    id: 'course_3',
    title: 'Señales Inteligentes',
    categoryKey: 'normativa',
    categoryLabel: 'Normativa Urbana',
    level: 'Básico',
    duration: '1.5 hrs',
    description: 'Aprende a interpretar la semaforización adaptativa, señales dinámicas LED y sistemas de cruce con detección de presencia.',
    image: pedestrianSignDusk,
    lessons: [
      'Semáforos peatonales con cuenta regresiva',
      'Señalización de carriles reversibles',
      'Zonas escolares y reducción obligatoria a 20 km/h',
      'Marcas viales termoplásticas y su significado con lluvia'
    ]
  },
  {
    id: 'course_4',
    title: 'Prioridad y Flujo Vial',
    categoryKey: 'normativa',
    categoryLabel: 'Normativa Urbana',
    level: 'Avanzado',
    duration: '3 hrs',
    description: 'Estructura de jerarquía vial según la pirámide de movilidad urbana y protocolos de paso en rotondas complejas.',
    image: roundaboutDiagram,
    lessons: [
      'Pirámide de la movilidad urbana sostenible',
      'Reglas de ingreso y permanencia en glorietas',
      'Carriles preferenciales para buses de tránsito rápido (BRT)',
      'Resolución pacífica de conflictos viales'
    ]
  },
  {
    id: 'course_5',
    title: 'Respuesta a Incidentes y Primeros Auxilios',
    categoryKey: 'peatonal',
    categoryLabel: 'Seguridad Peatonal',
    level: 'Intermedio',
    duration: '1.2 hrs',
    description: 'Protocolo PAS (Proteger, Avisar, Socorrer) y uso de la plataforma digital para emitir alertas georreferenciadas con precisión.',
    image: incidentResponseAgent,
    lessons: [
      'Protocolo PAS en la vía pública',
      'Cómo asegurar el perímetro del siniestro',
      'Uso del botón de auxilio y SOS en VIANOVA',
      'Documentación fotográfica para peritajes viales'
    ]
  },
  {
    id: 'course_6',
    title: 'Cruces Seguros y Prioridad Peatonal',
    categoryKey: 'peatonal',
    categoryLabel: 'Seguridad Peatonal',
    level: 'Básico',
    duration: '1.0 hr',
    description: 'Normas de paso en cebras peatonales, interacción en esquinas, visibilidad nocturna y protección en zonas escolares.',
    image: pedestrianSafeCrosswalk,
    recommended: true,
    lessons: [
      'Derecho de paso y prioridad en pasos peatonales',
      'Interacción segura en cruces sin semáforo',
      'Uso de prendas reflectivas y visibilidad en horario nocturno',
      'Zonas escolares y protección a personas con movilidad reducida'
    ]
  }
];

// Módulo 1 base quiz questions
interface QuizOptionItem {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface QuizQuestionItem {
  number: number;
  category: string;
  title: string;
  question: string;
  options: QuizOptionItem[];
  correctExplanation: string;
}

const BASE_QUIZ_QUESTIONS = [
  {
    number: 1,
    category: 'MÓDULO 1: SEÑALIZACIÓN BÁSICA',
    title: 'Evaluación de Conocimientos',
    question: '¿Cuál es la primera prioridad en la Pirámide de la Movilidad Urbana?',
    correctText: 'Peatones y personas con movilidad reducida.',
    incorrectTexts: [
      'Vehículos de carga y logística urbana.',
      'Transporte público masivo y buses escolares.',
      'Automóviles particulares y vehículos eléctricos.',
    ],
    correctExplanation: 'Los peatones y personas con movilidad reducida se sitúan en la cúspide de la pirámide por ser los usuarios más vulnerables con máxima prioridad de paso.',
  },
  {
    number: 2,
    category: 'MÓDULO 1: SEÑALIZACIÓN BÁSICA',
    title: 'Evaluación de Conocimientos',
    question: '¿Qué indica una línea continua pintada en el centro de la calzada?',
    correctText: 'Prohibición estricta de adelantar o invadir el carril en sentido opuesto.',
    incorrectTexts: [
      'Está permitido adelantar con precaución si no vienen vehículos.',
      'Carril exclusivo para bicicletas los fines de semana.',
      'Zona habilitada para detenerse brevemente.',
    ],
    correctExplanation: 'La línea continua longitudinal prohíbe de forma terminante invadir el carril contrario o realizar maniobras de adelantamiento.',
  },
  {
    number: 3,
    category: 'MÓDULO 1: SEÑALIZACIÓN BÁSICA',
    title: 'Evaluación de Conocimientos',
    question: '¿Qué debes hacer cuando encuentras una señal de PARE?',
    correctText: 'Detenerse por completo antes de la línea de pare o cruce peatonal.',
    incorrectTexts: [
      'Disminuir la velocidad y continuar si no viene nadie por la vía transversal.',
      'Tocar la bocina para alertar a otros conductores que vas a cruzar la intersección.',
      'Ceder el paso exclusivamente a los vehículos que se aproximan por la derecha.',
    ],
    correctExplanation: 'La señal reglamentaria de PARE (R1) exige detención total y obligatoria antes de la demarcación o cruce, sin excepción, verificando ambos sentidos de circulación.',
  },
  {
    number: 4,
    category: 'MÓDULO 1: SEÑALIZACIÓN BÁSICA',
    title: 'Evaluación de Conocimientos',
    question: '¿Cuál es la distancia lateral mínima que debe guardar un vehículo al adelantar a un ciclista?',
    correctText: '1.5 metros de distancia lateral.',
    incorrectTexts: [
      '50 centímetros de separación.',
      'Solo la distancia del retrovisor.',
      'No se requiere distancia si el carril es amplio.',
    ],
    correctExplanation: 'Por normativa y seguridad vital, todo automotor debe respetar un margen mínimo de 1.5 metros al adelantar a un usuario de bicicleta.',
  },
  {
    number: 5,
    category: 'MÓDULO 1: SEÑALIZACIÓN BÁSICA',
    title: 'Evaluación de Conocimientos',
    question: '¿En una glorieta o rotonda, quién tiene la prelación o derecho de paso?',
    correctText: 'El vehículo que ya se encuentra circulando dentro del anillo de la glorieta.',
    incorrectTexts: [
      'El vehículo que ingresa a mayor velocidad.',
      'Siempre el vehículo que viene por la izquierda en la vía de acceso.',
      'Los vehículos de transporte pesado independientemente de su posición.',
    ],
    correctExplanation: 'La regla universal de tránsito otorga prioridad total a los vehículos que ya están dentro de la glorieta para mantener el flujo continuo.',
  },
];

function buildRandomizedQuestions(): QuizQuestionItem[] {
  return BASE_QUIZ_QUESTIONS.map((item) => {
    const rawOptions = [
      { text: item.correctText, isCorrect: true },
      ...item.incorrectTexts.map((txt) => ({ text: txt, isCorrect: false })),
    ];
    for (let i = rawOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rawOptions[i], rawOptions[j]] = [rawOptions[j], rawOptions[i]];
    }
    const letters = ['A', 'B', 'C', 'D'];
    const options: QuizOptionItem[] = rawOptions.map((opt, idx) => ({
      id: letters[idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));
    return {
      number: item.number,
      category: item.category,
      title: item.title,
      question: item.question,
      options,
      correctExplanation: item.correctExplanation,
    };
  });
}

export const EducationScreen: React.FC = () => {
  // Navigation tabs for didactic formats
  const [activeTab, setActiveTab] = useState<DidacticSectionType>('juegos');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategoryType>('micromovilidad');
  const [videoTopicFilter, setVideoTopicFilter] = useState<'Todos' | VideoTopicType>('Todos');

  // Track progress of courses
  const [coursesProgress, setCoursesProgress] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('vianova_courses_progress');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      course_1: 0,
      course_2: 0,
      course_3: 0,
      course_4: 0,
      course_5: 0,
      course_6: 0,
    };
  });

  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('vianova_completed_lessons');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {};
  });

  // Modals for Interactive Content
  const [activeCourseModal, setActiveCourseModal] = useState<CourseItem | null>(null);
  const [selectedVideoModal, setSelectedVideoModal] = useState<DidacticVideo | null>(null);
  const [selectedInfographicModal, setSelectedInfographicModal] = useState<DidacticInfographic | null>(null);

  // Video mini-quiz state
  const [videoQuizSelectedOpt, setVideoQuizSelectedOpt] = useState<number | null>(null);
  const [videoQuizAnswered, setVideoQuizAnswered] = useState<boolean>(false);

  // Road Simulator state
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [scenarioSelectedOpt, setScenarioSelectedOpt] = useState<string | null>(null);
  const [scenarioSubmitted, setScenarioSubmitted] = useState<boolean>(false);
  const [scenarioScore, setScenarioScore] = useState<number>(0);

  // Knowledge Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionItem[]>(() => buildRandomizedQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, { selectedId: string; isCorrect: boolean; isSubmitted: boolean }>>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Compute Global Progress
  const totalCourses = COURSES_DATA.length;
  const progressSum = (Object.values(coursesProgress) as number[]).reduce((acc: number, curr: number) => acc + (curr || 0), 0);
  const globalProgress = Math.round(progressSum / totalCourses);
  const completedCoursesCount = (Object.values(coursesProgress) as number[]).filter((p) => p === 100).length;

  const updateCourseProgress = (courseId: string, percentage: number) => {
    setCoursesProgress((prev) => {
      const next = { ...prev, [courseId]: percentage };
      try {
        localStorage.setItem('vianova_courses_progress', JSON.stringify(next));
      } catch (_) {}
      return next;
    });
  };

  const getGlobalLevel = (pct: number) => {
    if (pct >= 85) return 'Experto en Movilidad Vial';
    if (pct >= 50) return 'Conductor / Ciclista Avanzado';
    if (pct >= 25) return 'Nivel Intermedio en Vía';
    if (pct > 0) return 'Nivel Inicial en Progreso';
    return 'Principiante';
  };

  // Lesson toggle handler
  const handleToggleLesson = (courseId: string, lessonTitle: string, totalCount: number) => {
    setCompletedLessons((prev) => {
      const current = prev[courseId] || [];
      const isAlreadyDone = current.includes(lessonTitle);
      const updated = isAlreadyDone
        ? current.filter((item) => item !== lessonTitle)
        : [...current, lessonTitle];

      const pct = Math.round((updated.length / totalCount) * 100);
      updateCourseProgress(courseId, pct);

      if (!isAlreadyDone && updated.length === totalCount) {
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } catch (_) {}
      }

      const nextState = { ...prev, [courseId]: updated };
      try {
        localStorage.setItem('vianova_completed_lessons', JSON.stringify(nextState));
      } catch (_) {}
      return nextState;
    });
  };

  const handleCompleteAllLessons = (course: CourseItem) => {
    setCompletedLessons((prev) => ({
      ...prev,
      [course.id]: [...course.lessons],
    }));
    updateCourseProgress(course.id, 100);
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (_) {}
  };

  // Video Quiz Handlers
  const handleAnswerVideoQuiz = (optIdx: number, correctIdx: number) => {
    setVideoQuizSelectedOpt(optIdx);
    setVideoQuizAnswered(true);
    if (optIdx === correctIdx) {
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch (_) {}
    }
  };

  // Simulator Handlers
  const currentScenario = ROAD_SCENARIOS[scenarioIndex];
  const handleSelectScenarioOption = (optId: string) => {
    if (scenarioSubmitted) return;
    setScenarioSelectedOpt(optId);
  };

  const handleSubmitScenarioDecision = () => {
    if (!scenarioSelectedOpt) return;
    setScenarioSubmitted(true);
    const chosen = currentScenario.options.find((o) => o.id === scenarioSelectedOpt);
    if (chosen?.isCorrect) {
      setScenarioScore((prev) => prev + 1);
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      } catch (_) {}
    }
  };

  const handleNextScenario = () => {
    setScenarioSubmitted(false);
    setScenarioSelectedOpt(null);
    setScenarioIndex((prev) => (prev + 1) % ROAD_SCENARIOS.length);
  };

  // Knowledge Quiz Handlers
  const currentQ = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  const handleSelectOption = (id: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(id);
  };

  const handleAnswerSubmit = () => {
    if (!selectedOption) return;
    const opt = currentQ.options.find((o) => o.id === selectedOption);
    const isCorrect = !!opt?.isCorrect;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        selectedId: selectedOption,
        isCorrect,
        isSubmitted: true,
      },
    }));
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      try {
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });
      } catch (_) {}
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      const existing = userAnswers[nextIdx];
      setSelectedOption(existing?.selectedId || null);
      setIsAnswerSubmitted(!!existing?.isSubmitted);
    } else {
      setQuizCompleted(true);
      updateCourseProgress('course_1', 100);
      try {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      } catch (_) {}
    }
  };

  const handleRestartQuiz = () => {
    setQuizQuestions(buildRandomizedQuestions());
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setQuizCompleted(false);
  };

  const filteredCourses = COURSES_DATA.filter((c) => c.categoryKey === selectedCategory);
  const activeCategoryInfo = CATEGORY_TABS.find((tab) => tab.id === selectedCategory);

  return (
    <div className="w-full py-8 sm:py-12 space-y-14 animate-fade-in text-slate-800">
      
      {/* ========================================================================= */}
      {/* ENCABEZADO PRINCIPAL DIDÁCTICO & WIDGET DE PROGRESO GLOBAL                */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-[#0057d9] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aprende de forma interactiva y práctica</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a193b] tracking-tight">
              Educación y Cultura Vial
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Material interactivo diseñado para todos los actores de la vía: videos didácticos reales, infografías explicativas, simulador de toma de decisiones y cursos prácticos.
            </p>
          </div>

          {/* Radial Progress Widget */}
          <div className="shrink-0 bg-white rounded-3xl p-5 border-2 border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center gap-4 transition-all">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#0066ff] transition-all duration-700 ease-out"
                  strokeDasharray={`${globalProgress}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-black text-slate-900 transition-all">
                {globalProgress}%
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Progreso Global</p>
                {globalProgress > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">{getGlobalLevel(globalProgress)}</h4>
              <p className="text-[11px] text-slate-500 font-medium">
                {completedCoursesCount} de {totalCourses} módulos completados
              </p>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN DIDÁCTICA POR FORMATO (Zero aburrimiento, alta interacción) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80 pt-2">
          {[
            { id: 'juegos', label: '🎮 Juegos Educaplay', icon: Gamepad2, count: '6 Juegos', isSpecial: true },
            { id: 'videos', label: 'Videoteca Vial', icon: Video, count: `${DIDACTIC_VIDEOS.length} Videos` },
            { id: 'cursos', label: 'Cursos & Módulos', icon: BookOpen, count: `${COURSES_DATA.length} Cursos` },
            { id: 'infografias', label: 'Infografías & Guías', icon: FileText, count: `${DIDACTIC_INFOGRAPHICS.length} Guías` },
            { id: 'simulador', label: 'Simulador "¿Qué harías?"', icon: Compass, count: `${ROAD_SCENARIOS.length} Casos` },
            { id: 'evaluacion', label: 'Evaluación Rápida', icon: Award, count: 'Test 5 Qs' }
          ].map((item) => {
            const Icon = item.icon;
            const isCurrent = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as DidacticSectionType)}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isCurrent
                    ? 'bg-[#0a193b] text-white shadow-md scale-[1.02]'
                    : item.isSpecial
                    ? 'bg-amber-50 text-amber-900 border-2 border-amber-300 hover:bg-amber-100 hover:border-amber-400 font-black'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-amber-300' : item.isSpecial ? 'text-amber-600' : 'text-blue-600'}`} />
                <span>{item.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isCurrent 
                    ? 'bg-white/20 text-white' 
                    : item.isSpecial 
                    ? 'bg-amber-200 text-amber-900' 
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* VISTA 0: JUEGOS DIDÁCTICOS ESTILO EDUCAPLAY (Tráfico, Tránsito, Prevención) */}
      {/* ========================================================================= */}
      {activeTab === 'juegos' && (
        <section className="max-w-6xl mx-auto space-y-7 animate-fade-in">
          <EducaplayGamesSuite />
        </section>
      )}

      {/* ========================================================================= */}
      {/* VISTA 1: CURSOS & MÓDULOS DE APRENDIZAJE                                   */}
      {/* ========================================================================= */}
      {activeTab === 'cursos' && (
        <section className="max-w-6xl mx-auto space-y-7 animate-fade-in">
          {/* Category Tabs: Micromovilidad, Seguridad Peatonal, Normativa Urbana */}
          <div className="space-y-3.5">
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {CATEGORY_TABS.map((tab) => {
                const isSelected = selectedCategory === tab.id;
                const count = COURSES_DATA.filter((c) => c.categoryKey === tab.id).length;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-[#0057d9] text-white shadow-md scale-[1.02]'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {count} cursos
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Context notice */}
            {activeCategoryInfo && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between gap-4 text-xs text-blue-900 animate-fade-in">
                <div className="flex items-center gap-2.5">
                  <Info className="w-4 h-4 text-[#0066ff] shrink-0" />
                  <span className="font-medium text-slate-700">{activeCategoryInfo.description}</span>
                </div>
                <span className="text-[11px] font-bold text-[#0066ff] shrink-0 hidden sm:inline">
                  Cursos de {activeCategoryInfo.label}
                </span>
              </div>
            )}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            {filteredCourses.map((course) => {
              const progress = coursesProgress[course.id] || 0;
              return (
                <div
                  key={course.id}
                  className="flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {course.recommended && (
                      <div className="absolute top-3 left-3 bg-[#0a193b] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span>Recomendado</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4 flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066ff] text-xs font-bold">
                          {course.level}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                          {course.categoryLabel}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500 text-xs font-medium ml-auto">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                        {course.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {course.description}
                      </p>

                      {/* Micro lessons checklist */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Temario práctico ({course.lessons.length} lecciones):
                        </span>
                        {course.lessons.slice(0, 2).map((les, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span className="truncate">{les}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Bar & Actions */}
                    <div className="space-y-3 pt-2">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-500">Avance de lecciones</span>
                          <span className={progress === 100 ? 'text-emerald-600 font-bold' : 'text-slate-800'}>
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              progress === 100 ? 'bg-emerald-500' : 'bg-[#0066ff]'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveCourseModal(course)}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                          progress === 100
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                            : progress > 0
                            ? 'bg-[#0a193b] hover:bg-[#07132c] text-white'
                            : 'bg-[#0057d9] hover:bg-blue-700 text-white'
                        }`}
                      >
                        {progress === 0 ? (
                          <span>Iniciar Lecciones Prácticas</span>
                        ) : progress < 100 ? (
                          <span>Continuar Módulo ({progress}%)</span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-emerald-800">
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span>Módulo Completado • Repasar</span>
                          </span>
                        )}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* VISTA 2: VIDEOTECA DIDÁCTICA REAL (YOUTUBE EMBEDS Y CÁPSULAS VIALES)      */}
      {/* ========================================================================= */}
      {activeTab === 'videos' && (() => {
        const filteredVideos = DIDACTIC_VIDEOS.filter((video) => {
          if (videoTopicFilter === 'Todos') return true;
          return video.topic === videoTopicFilter;
        });

        const topicBadges: { id: 'Todos' | VideoTopicType; label: string; icon: string; count: number }[] = [
          { id: 'Todos', label: 'Todos los Videos', icon: '🎬', count: DIDACTIC_VIDEOS.length },
          { id: 'Tráfico', label: 'Tráfico & Congestión', icon: '🚦', count: DIDACTIC_VIDEOS.filter(v => v.topic === 'Tráfico').length },
          { id: 'Tránsito', label: 'Tránsito & Normativa', icon: '🚸', count: DIDACTIC_VIDEOS.filter(v => v.topic === 'Tránsito').length },
          { id: 'Prevención', label: 'Prevención & Reflejos', icon: '🛡️', count: DIDACTIC_VIDEOS.filter(v => v.topic === 'Prevención').length },
          { id: 'Movilidad', label: 'Movilidad Sostenible', icon: '🚲', count: DIDACTIC_VIDEOS.filter(v => v.topic === 'Movilidad').length },
        ];

        return (
          <section className="max-w-6xl mx-auto space-y-7 animate-fade-in">
            {/* Header */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <span className="text-xs font-black text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4" />
                  <span>Videoteca Oficial de Tráfico, Tránsito y Prevención</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Cápsulas en Video de Movilidad y Prevención
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Material didáctico verificado de la Agencia Nacional de Seguridad Vial, DGT y organismos internacionales. Cada video incluye puntos clave y un mini-quiz interactivo para sumar puntos.
                </p>
              </div>

              <div className="px-4 py-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black flex items-center gap-2 shrink-0">
                <Video className="w-4 h-4 text-rose-600" />
                <span>{DIDACTIC_VIDEOS.length} Videos Disponibles</span>
              </div>
            </div>

            {/* Topic Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {topicBadges.map((badge) => {
                const isSelected = videoTopicFilter === badge.id;
                return (
                  <button
                    key={badge.id}
                    type="button"
                    onClick={() => setVideoTopicFilter(badge.id)}
                    className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#0a193b] text-white border-[#0a193b] shadow-md scale-[1.02]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{badge.icon}</span>
                    <span>{badge.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {badge.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
                >
                  <div>
                    {/* Thumbnail with Video Play Overlay */}
                    <div
                      onClick={() => {
                        setSelectedVideoModal(video);
                        setVideoQuizSelectedOpt(null);
                        setVideoQuizAnswered(false);
                      }}
                      className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-900 cursor-pointer"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/30 to-transparent" />
                      
                      {/* Floating Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-rose-700 transition-all">
                          <PlayCircle className="w-10 h-10 fill-white/20" />
                        </div>
                      </div>

                      {/* Topic Pill */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className={`px-3 py-1 rounded-full text-white text-[11px] font-black shadow-md ${
                          video.topic === 'Tráfico' ? 'bg-amber-600' :
                          video.topic === 'Tránsito' ? 'bg-blue-600' :
                          video.topic === 'Prevención' ? 'bg-rose-600' : 'bg-emerald-600'
                        }`}>
                          {video.topic}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold hidden sm:inline">
                          {video.category}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-300" />
                        <span>{video.duration}</span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-xs font-bold text-white/90 truncate flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        <span>{video.sourceBadge} • {video.sourceName}</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {video.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {video.summary}
                      </p>

                      {/* Key takeaways pills */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                          Puntos Clave del Video:
                        </span>
                        {video.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-2 leading-relaxed">{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Action: 100% In-App */}
                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedVideoModal(video);
                        setVideoQuizSelectedOpt(null);
                        setVideoQuizAnswered(false);
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#0a193b] hover:bg-[#0057d9] text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md"
                    >
                      <PlayCircle className="w-4 h-4 text-rose-400" />
                      <span>Ver Video en Pantalla & Responder Mini-Quiz</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ========================================================================= */}
      {/* VISTA 3: INFOGRAFÍAS DIDÁCTICAS & AFICHES VIALES VISUALES                  */}
      {/* ========================================================================= */}
      {activeTab === 'infografias' && (
        <section className="max-w-6xl mx-auto space-y-8 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Material Didáctico Visual</span>
              <h2 className="text-2xl font-black text-slate-900">Infografías y Guías Gráficas de Supervivencia Vial</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Gráficos claros y estructurados para memorizar con rapidez las reglas de la vía, distancias de frenado y jerarquía urbana.
              </p>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold flex items-center gap-2 shrink-0">
              <FileText className="w-4 h-4" />
              <span>{DIDACTIC_INFOGRAPHICS.length} Guías Visuales</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIDACTIC_INFOGRAPHICS.map((info) => (
              <div
                key={info.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div>
                  {/* Colored Header Banner */}
                  <div 
                    className="p-6 text-white space-y-2 relative overflow-hidden"
                    style={{ backgroundColor: info.accentColor }}
                  >
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider inline-block">
                      {info.badge}
                    </span>
                    <h3 className="text-lg font-black leading-snug">
                      {info.title}
                    </h3>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {info.summary}
                    </p>

                    {/* Step by step points */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      {info.keyPoints.slice(0, 3).map((pt, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                          <span className="text-lg shrink-0 mt-0.5">{pt.iconEmoji}</span>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 leading-tight">{pt.title}</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{pt.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Open Full Screen Button */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => setSelectedInfographicModal(info)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#0057d9] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Ver Infografía Completa y Detalles</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* VISTA 4: SIMULADOR DE DECISIONES VIALES ("¿QUÉ HARÍAS TÚ?")               */}
      {/* ========================================================================= */}
      {activeTab === 'simulador' && (
        <section className="max-w-4xl mx-auto space-y-7 animate-fade-in">
          {/* Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Simulador de Toma de Decisiones</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">¿Qué harías tú en esta situación real?</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Ponte a prueba en escenarios críticos de tráfico: glorietas, lluvia, ángulos ciegos y pasos peatonales.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-center shrink-0">
              <span className="text-[10px] font-bold uppercase text-blue-800 block">Aciertos</span>
              <span className="text-2xl font-black text-[#0057d9]">{scenarioScore} / {ROAD_SCENARIOS.length}</span>
            </div>
          </div>

          {/* Interactive Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-9 space-y-7">
            {/* Scenario Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold">
                  Caso {scenarioIndex + 1} de {ROAD_SCENARIOS.length}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  Rol: {currentScenario.role}
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black uppercase ${
                currentScenario.dangerLevel === 'Crítico' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
              }`}>
                Peligro: {currentScenario.dangerLevel}
              </span>
            </div>

            {/* Scenario Image Banner */}
            <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={currentScenario.imageIllustration}
                alt={currentScenario.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold text-blue-300 uppercase block tracking-wider">
                  {currentScenario.contextTag}
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  {currentScenario.title}
                </h3>
              </div>
            </div>

            {/* Situation Narrative */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              {currentScenario.situation}
            </div>

            {/* Decision Options */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Selecciona la acción defensiva correcta:
              </span>

              {currentScenario.options.map((opt) => {
                const isSelected = scenarioSelectedOpt === opt.id;
                let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                if (scenarioSubmitted) {
                  if (opt.isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50/70 text-rose-950 ring-2 ring-rose-500';
                  } else {
                    btnStyle = 'border-slate-200 bg-slate-50 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-[#0057d9] bg-blue-50/60 ring-2 ring-[#0057d9] text-blue-950';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={scenarioSubmitted}
                    onClick={() => handleSelectScenarioOption(opt.id)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected ? 'bg-[#0057d9] text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="text-sm font-semibold pt-1 flex-1 leading-snug">
                      {opt.text}
                    </span>
                    {scenarioSubmitted && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Educational Feedback */}
            {scenarioSubmitted && (() => {
              const chosen = currentScenario.options.find((o) => o.id === scenarioSelectedOpt);
              const isWin = chosen?.isCorrect;

              return (
                <div className={`p-5 rounded-2xl border text-sm animate-fade-in space-y-2 ${
                  isWin ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <div className="flex items-center gap-2">
                    {isWin ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                    <h5 className="font-black text-base">
                      {isWin ? '¡Decisión Acertada! Salvaste la vida en la vía' : '¡Decisión Incorrecta o Peligrosa!'}
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed pl-7">
                    {chosen?.consequence}
                  </p>
                  <div className="pl-7 pt-1 text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Consejo de oro: {chosen?.advice}</span>
                  </div>
                </div>
              );
            })()}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                Caso {scenarioIndex + 1} de {ROAD_SCENARIOS.length}
              </span>

              {!scenarioSubmitted ? (
                <button
                  type="button"
                  disabled={!scenarioSelectedOpt}
                  onClick={handleSubmitScenarioDecision}
                  className="px-6 py-2.5 rounded-xl bg-[#0057d9] hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Confirmar mi Decisión
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextScenario}
                  className="px-6 py-2.5 rounded-xl bg-[#0a193b] hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Siguiente Caso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* VISTA 5: EVALUACIÓN DE CONOCIMIENTOS (QUIZ INTERACTIVO MEJORADO)          */}
      {/* ========================================================================= */}
      {activeTab === 'evaluacion' && (
        <section className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Header Bar */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0066ff]">
                  {currentQ.category}
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a193b] tracking-tight">
                  {currentQ.title}
                </h2>
              </div>

              {/* Question indicators */}
              <div className="flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto">
                <span className="text-[11px] font-bold text-slate-500 px-2">Pregunta:</span>
                {quizQuestions.map((q, idx) => {
                  const ans = userAnswers[idx];
                  const isCurrent = idx === currentQuestionIndex;
                  return (
                    <button
                      key={q.number}
                      type="button"
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'bg-[#0066ff] text-white shadow-xs scale-105'
                          : ans?.isSubmitted
                          ? ans.isCorrect
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                          : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span>Pregunta {currentQuestionIndex + 1} de {totalQuestions}</span>
                <span className="text-[#0066ff] font-bold">
                  Progreso Global: {globalProgress}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#0066ff] rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Assessment Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-10 space-y-8">
            {!quizCompleted ? (
              <>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Pregunta {currentQuestionIndex + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((opt) => {
                    const isSelected = selectedOption === opt.id;
                    const isSubmitted = isAnswerSubmitted;
                    const isCorrect = opt.isCorrect;

                    let borderClass = 'border-slate-200 hover:border-slate-300 bg-white';
                    let badgeClass = 'bg-slate-100 text-slate-700';

                    if (isSubmitted) {
                      if (isCorrect) {
                        borderClass = 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500';
                        badgeClass = 'bg-emerald-600 text-white';
                      } else if (isSelected && !isCorrect) {
                        borderClass = 'border-rose-500 bg-rose-50/60 ring-1 ring-rose-500';
                        badgeClass = 'bg-rose-600 text-white';
                      } else {
                        borderClass = 'border-slate-200 bg-slate-50/50 opacity-60';
                      }
                    } else if (isSelected) {
                      borderClass = 'border-[#0066ff] bg-blue-50/40 ring-1 ring-[#0066ff]';
                      badgeClass = 'bg-[#0066ff] text-white';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 cursor-pointer disabled:cursor-default ${borderClass}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${badgeClass}`}>
                            {opt.id}
                          </span>
                          <span className="text-sm sm:text-base font-medium text-slate-900">
                            {opt.text}
                          </span>
                        </div>
                        {isSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {isAnswerSubmitted && (
                  <div className={`p-4 rounded-2xl border text-sm animate-fade-in ${
                    userAnswers[currentQuestionIndex]?.isCorrect 
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                      : 'bg-rose-50/80 border-rose-200 text-rose-900'
                  }`}>
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold">
                          {userAnswers[currentQuestionIndex]?.isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
                        </h5>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {currentQ.correctExplanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentQuestionIndex > 0) {
                        const prevIdx = currentQuestionIndex - 1;
                        setCurrentQuestionIndex(prevIdx);
                        const existing = userAnswers[prevIdx];
                        setSelectedOption(existing?.selectedId || null);
                        setIsAnswerSubmitted(!!existing?.isSubmitted);
                      }
                    }}
                    disabled={currentQuestionIndex === 0}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      currentQuestionIndex > 0
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer shadow-xs'
                        : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>

                  {!isAnswerSubmitted ? (
                    <button
                      type="button"
                      disabled={!selectedOption}
                      onClick={handleAnswerSubmit}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0066ff] hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <span>Comprobar Respuesta</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0a193b] hover:bg-[#07132c] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <span>{currentQuestionIndex === totalQuestions - 1 ? 'Finalizar Evaluación' : 'Siguiente Pregunta'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Quiz Finished */
              <div className="text-center py-8 space-y-6 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md border-2 border-emerald-300">
                  <Trophy className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                    Módulo de Evaluación Completado
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a193b]">
                    ¡Excelente trabajo, Evaluación Aprobada!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Has completado las preguntas clave del módulo con éxito. Tu progreso global se ha actualizado.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleRestartQuiz}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Repetir Evaluación</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('videos')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0066ff] hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <Video className="w-4 h-4" />
                    <span>Explorar Videoteca Didáctica</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: REPRODUCTOR DIDÁCTICO DE VIDEO (YOUTUBE EMBED + PREGUNTA)        */}
      {/* ========================================================================= */}
      {selectedVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Video className="w-5 h-5 text-rose-500" />
                <div>
                  <h3 className="text-sm sm:text-base font-black truncate max-w-md">
                    {selectedVideoModal.title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    <span className="text-rose-400 font-bold">{selectedVideoModal.topic}</span> • {selectedVideoModal.category} • {selectedVideoModal.sourceName} • {selectedVideoModal.duration}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideoModal(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player 16:9 */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={selectedVideoModal.embedUrl}
                title={selectedVideoModal.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Content & Mini Quiz */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
                <h4 className="text-xs font-extrabold uppercase text-blue-900 tracking-wider">
                  Lo que debes recordar de esta cápsula:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {selectedVideoModal.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comprehension Quiz */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Pregunta rápida de refuerzo:
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 leading-snug">
                  {selectedVideoModal.quizQuestion.question}
                </h5>

                <div className="space-y-2 pt-1">
                  {selectedVideoModal.quizQuestion.options.map((opt, idx) => {
                    const isSelected = videoQuizSelectedOpt === idx;
                    const isCorrect = idx === selectedVideoModal.quizQuestion.correctIndex;
                    let style = 'bg-white border-slate-200 hover:border-blue-300 text-slate-800';

                    if (videoQuizAnswered) {
                      if (isCorrect) {
                        style = 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-1 ring-emerald-500 font-bold';
                      } else if (isSelected && !isCorrect) {
                        style = 'bg-rose-50 border-rose-400 text-rose-950 font-medium';
                      } else {
                        style = 'bg-slate-100 border-slate-200 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={videoQuizAnswered}
                        onClick={() => handleAnswerVideoQuiz(idx, selectedVideoModal.quizQuestion.correctIndex)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-2 cursor-pointer disabled:cursor-default ${style}`}
                      >
                        <span>{opt}</span>
                        {videoQuizAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {videoQuizAnswered && (
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                    <strong>Explicación:</strong> {selectedVideoModal.quizQuestion.explanation}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedVideoModal(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#0057d9] text-white text-xs font-bold transition cursor-pointer"
              >
                Cerrar Reproductor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: VISOR DE INFOGRAFÍA COMPLETA                                     */}
      {/* ========================================================================= */}
      {selectedInfographicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div 
              className="p-6 text-white flex items-center justify-between"
              style={{ backgroundColor: selectedInfographicModal.accentColor }}
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider inline-block">
                  {selectedInfographicModal.badge}
                </span>
                <h3 className="text-xl font-black mt-1">
                  {selectedInfographicModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInfographicModal(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {selectedInfographicModal.summary}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Desglose Detallado de la Guía:
                </h4>
                {selectedInfographicModal.keyPoints.map((pt, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                    <span className="text-2xl shrink-0 mt-0.5">{pt.iconEmoji}</span>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">{pt.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                <strong>Conclusión Didáctica:</strong> {selectedInfographicModal.fullText}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedInfographicModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0a193b] hover:bg-[#0057d9] text-white text-xs font-bold transition cursor-pointer"
              >
                Entendido • Cerrar Guía
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ESTUDIO INTERACTIVO DE CURSOS Y LECCIONES                        */}
      {/* ========================================================================= */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="relative h-40 w-full overflow-hidden bg-slate-900">
              <img
                src={activeCourseModal.image}
                alt={activeCourseModal.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              
              <button
                type="button"
                onClick={() => setActiveCourseModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/90 text-white text-[11px] font-bold">
                  {activeCourseModal.categoryLabel} • {activeCourseModal.level}
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  {activeCourseModal.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-800">
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeCourseModal.description}
              </p>

              {/* Progress Summary */}
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-900 uppercase">Progreso del Módulo</span>
                  <p className="text-2xl font-black text-blue-950">
                    {coursesProgress[activeCourseModal.id] || 0}%
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-medium">Progreso Global Actual</span>
                  <p className="text-lg font-bold text-[#0066ff]">
                    {globalProgress}%
                  </p>
                </div>
              </div>

              {/* Lessons Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Lecciones del Curso (Marca cada una para avanzar)
                </h4>

                <div className="space-y-2">
                  {activeCourseModal.lessons.map((lesson, idx) => {
                    const isDone = (completedLessons[activeCourseModal.id] || []).includes(lesson);

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          handleToggleLesson(activeCourseModal.id, lesson, activeCourseModal.lessons.length)
                        }
                        className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                          isDone
                            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                            isDone ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white text-transparent'
                          }`}>
                            <Check className="w-4 h-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold">
                            {idx + 1}. {lesson}
                          </span>
                        </div>
                        <span className={`text-[11px] font-bold ${isDone ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {isDone ? 'Completada' : 'Pendiente'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleCompleteAllLessons(activeCourseModal)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Completar Todas las Lecciones
              </button>

              <button
                type="button"
                onClick={() => setActiveCourseModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0a193b] hover:bg-[#07132c] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Cerrar y Ver Progreso
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
