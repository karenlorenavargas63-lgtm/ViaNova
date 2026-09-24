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
  CheckSquare,
  Square,
  PlayCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

import cyclistsGreenBikeway from '../assets/images/cyclists_green_bikeway_1788438597822.jpg';
import scooterBikewayPov from '../assets/images/scooter_bikeway_pov_1788438617913.jpg';
import pedestrianSignDusk from '../assets/images/pedestrian_sign_dusk_1788438631922.jpg';
import roundaboutDiagram from '../assets/images/roundabout_diagram_1788438648636.jpg';
import incidentResponseAgent from '../assets/images/incident_response_agent_1788438663707.jpg';
import pedestrianSafeCrosswalk from '../assets/images/pedestrian_safe_crosswalk_1788876049804.jpg';

// Categories Configuration
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
      'Anticipación a puertas de autos estacionados',
      'Evaluación práctica de conocimientos viales'
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

// Módulo 1 base quiz questions with designated correct and incorrect choices
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
    question: '¿Qué significa la luz amarilla fija en el semáforo vehicular?',
    correctText: 'Advertencia de cambio inminente a rojo; detenerse de manera segura.',
    incorrectTexts: [
      'Acelerar antes de que el semáforo cambie a luz roja.',
      'Paso libre preferencial para motocicletas.',
      'Giro obligatorio a la derecha sin parar.',
    ],
    correctExplanation: 'La luz amarilla advierte la conclusión inminente del derecho de paso; se debe detener el vehículo antes de la línea de detención salvo que no pueda hacerse con seguridad.',
  },
];

// Generates randomized options distributed across A, B, C, D (ensuring questions are never all B)
const getRandomizedQuizQuestions = (): QuizQuestionItem[] => {
  const letters = ['A', 'B', 'C', 'D'];
  const targetPositions = [0, 1, 2, 3, Math.floor(Math.random() * 4)].sort(() => Math.random() - 0.5);

  return BASE_QUIZ_QUESTIONS.map((base, idx) => {
    const targetIdx = targetPositions[idx % targetPositions.length];
    const shuffledIncorrect = [...base.incorrectTexts].sort(() => Math.random() - 0.5);

    const options: QuizOptionItem[] = [];
    let incIdx = 0;

    for (let i = 0; i < 4; i++) {
      if (i === targetIdx) {
        options.push({
          id: letters[i],
          text: base.correctText,
          isCorrect: true,
        });
      } else {
        options.push({
          id: letters[i],
          text: shuffledIncorrect[incIdx++],
          isCorrect: false,
        });
      }
    }

    return {
      number: base.number,
      category: base.category,
      title: base.title,
      question: base.question,
      options,
      correctExplanation: base.correctExplanation,
    };
  });
};

export const EducationScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategoryType>('micromovilidad');

  // Track progress of each course in state and localStorage
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

  // Track completed lessons inside each course
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('vianova_completed_lessons');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {};
  });

  // Active modal for studying a course module
  const [activeCourseModal, setActiveCourseModal] = useState<CourseItem | null>(null);

  // Quiz evaluation state (Module 1)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionItem[]>(() => getRandomizedQuizQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, { selectedOption: string | null; isSubmitted: boolean; isCorrect: boolean }>>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Sync courses progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vianova_courses_progress', JSON.stringify(coursesProgress));
    } catch (_) {}
  }, [coursesProgress]);

  // Sync completed lessons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vianova_completed_lessons', JSON.stringify(completedLessons));
    } catch (_) {}
  }, [completedLessons]);

  // Helper to update progress of any course
  const updateCourseProgress = (courseId: string, progress: number) => {
    const clamped = Math.min(100, Math.max(0, Math.round(progress)));
    setCoursesProgress((prev) => ({
      ...prev,
      [courseId]: clamped,
    }));
  };

  // Calculate Global Progress based on the average of all courses
  const totalCourses = COURSES_DATA.length;
  const globalProgress = Math.round(
    COURSES_DATA.reduce((sum, c) => sum + (coursesProgress[c.id] || 0), 0) / totalCourses
  );

  const completedCoursesCount = COURSES_DATA.filter((c) => (coursesProgress[c.id] || 0) >= 100).length;

  const getGlobalLevel = (progress: number) => {
    if (progress === 0) return 'Nivel Inicial';
    if (progress < 25) return 'Nivel Principiante';
    if (progress < 50) return 'Nivel Aprendiz';
    if (progress < 75) return 'Nivel Intermedio';
    if (progress < 100) return 'Nivel Avanzado';
    return 'Experto Vial Certificado';
  };

  // Scroll to Módulo 1 Quiz smoothly
  const scrollToQuiz = () => {
    const el = document.getElementById('evaluacion-conocimientos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Starting Course 1 (Navegación Urbana Segura)
  const handleStartCourse1 = () => {
    // If not started yet, advance to 15% immediately so user sees immediate progress
    if (!coursesProgress['course_1'] || coursesProgress['course_1'] === 0) {
      updateCourseProgress('course_1', 15);
    }
    scrollToQuiz();
  };

  // Handle Quiz Answers & Auto Progression
  const totalQuestions = quizQuestions.length;
  const currentQ = quizQuestions[currentQuestionIndex] || quizQuestions[0];
  const currentAnswer = userAnswers[currentQuestionIndex];
  const selectedOption = currentAnswer?.selectedOption || null;
  const isAnswerSubmitted = currentAnswer?.isSubmitted || false;

  const handleSelectOption = (optionId: string) => {
    if (!isAnswerSubmitted) {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: {
          selectedOption: optionId,
          isSubmitted: false,
          isCorrect: false,
        },
      }));
    }
  };

  const handleAnswerSubmit = () => {
    if (!selectedOption) return;
    const correct = currentQ.options.find((o) => o.id === selectedOption)?.isCorrect || false;
    const updated = {
      ...userAnswers,
      [currentQuestionIndex]: {
        selectedOption,
        isSubmitted: true,
        isCorrect: correct,
      },
    };
    setUserAnswers(updated);

    // Dynamic progression: each answered question increases Course 1 and Global Progress
    const answeredCount = Object.keys(updated).filter((k) => updated[Number(k)]?.isSubmitted).length;
    // 1 answered: 32%, 2: 49%, 3: 66%, 4: 83%, 5: 95% (or 100% when finished)
    const newCourseProgress = Math.min(95, Math.max(15, 15 + answeredCount * 17));
    updateCourseProgress('course_1', newCourseProgress);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      // Course 1 is 100% completed
      updateCourseProgress('course_1', 100);
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Fallback
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestartQuiz = () => {
    setQuizQuestions(getRandomizedQuizQuestions());
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizCompleted(false);
    updateCourseProgress('course_1', 15);
  };

  // Toggle a lesson as completed inside the modal
  const handleToggleLesson = (courseId: string, lessonTitle: string, totalCourseLessons: number) => {
    const currentList = completedLessons[courseId] || [];
    const isAlreadyDone = currentList.includes(lessonTitle);

    let updatedList: string[];
    if (isAlreadyDone) {
      updatedList = currentList.filter((l) => l !== lessonTitle);
    } else {
      updatedList = [...currentList, lessonTitle];
    }

    setCompletedLessons((prev) => ({
      ...prev,
      [courseId]: updatedList,
    }));

    // Calculate new progress for this course
    const newPercent = Math.round((updatedList.length / totalCourseLessons) * 100);
    updateCourseProgress(courseId, newPercent);

    if (newPercent === 100) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (_) {}
    }
  };

  // Mark an entire module as 100% completed
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

  // Filtered courses based strictly on selected category
  const filteredCourses = COURSES_DATA.filter((course) => course.categoryKey === selectedCategory);
  const activeCategoryInfo = CATEGORY_TABS.find((tab) => tab.id === selectedCategory);

  return (
    <div className="w-full py-8 sm:py-12 space-y-20 animate-fade-in text-slate-800">
      
      {/* ========================================================================= */}
      {/* 1. PRIMERA SECCIÓN: APRENDE MIENTRAS AVANZAS                              */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto space-y-8">
        
        {/* Header with Title and Global Progress Widget */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a193b] tracking-tight">
              Aprende mientras avanzas
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Mejora tu conocimiento sobre seguridad vial, micromovilidad y normativas urbanas. A medida que inicias y avanzas en tus cursos, tu progreso global se actualiza en tiempo real.
            </p>
          </div>

          {/* Top Right Radial Progress Widget: Dynamic & Animated */}
          <div className="shrink-0 bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center gap-4 transition-all">
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
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Progreso activo" />
                )}
              </div>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">{getGlobalLevel(globalProgress)}</h4>
              <p className="text-[11px] text-slate-500 font-medium">
                {completedCoursesCount} de {totalCourses} módulos completados
              </p>
            </div>
          </div>
        </div>

        {/* Category Tabs: Specific Categories Only (Micromovilidad, Seguridad Peatonal, Normativa Urbana) */}
        <div className="space-y-3.5 pt-1">
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
                      ? 'bg-[#0a193b] text-white shadow-md ring-2 ring-[#0a193b]/20 scale-[1.02]'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count} {count === 1 ? 'curso' : 'cursos'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Description Notice */}
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

        {/* Courses Grid: Displays only the courses that concord with the selected category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {filteredCourses.map((course) => {
            const progress = coursesProgress[course.id] || 0;

            return (
              <div
                key={course.id}
                className="flex flex-col justify-between bg-white rounded-[24px] border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300"
              >
                {/* Image section */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.recommended && (
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#0066ff] text-[11px] font-bold shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" />
                      <span>Recomendado</span>
                    </div>
                  )}
                  {progress === 100 && (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-md">
                      <Check className="w-3.5 h-3.5" />
                      <span>Completado</span>
                    </div>
                  )}
                </div>

                {/* Content section */}
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
                    
                    <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Dynamic Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Progreso</span>
                        <span className={`font-bold transition-colors ${progress > 0 ? 'text-[#0066ff]' : 'text-slate-400'}`}>
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0066ff] rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Interactive Action Button */}
                    {course.id === 'course_1' ? (
                      <button
                        onClick={handleStartCourse1}
                        className="w-full py-3 px-4 rounded-xl bg-[#0a193b] hover:bg-[#07132c] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                      >
                        {progress === 0 ? (
                          <span>Iniciar Curso</span>
                        ) : progress < 100 ? (
                          <span>Continuar Curso ({progress}%)</span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-emerald-300">
                            <Check className="w-4 h-4" /> Módulo Completado
                          </span>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (progress === 0) {
                            updateCourseProgress(course.id, 25);
                          }
                          setActiveCourseModal(course);
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-[#0a193b] hover:bg-[#07132c] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                      >
                        {progress === 0 ? (
                          <span>Iniciar Curso</span>
                        ) : progress < 100 ? (
                          <span>Continuar Lecciones ({progress}%)</span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-emerald-300">
                            <Check className="w-4 h-4" /> Lecciones Completadas
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SEGUNDA SECCIÓN: EVALUACIÓN DE CONOCIMIENTOS (Exactamente como Imagen 2) */}
      {/* ========================================================================= */}
      <section id="evaluacion-conocimientos" className="max-w-4xl mx-auto space-y-8 pt-8 border-t border-slate-200/80">
        
        {/* Module Header Bar */}
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

            {/* Question indicators / Direct jump pills */}
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
                    title={`Ir a pregunta ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Module Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
              <span>Pregunta {currentQuestionIndex + 1} de {totalQuestions}</span>
              <span className="text-[#0066ff] font-bold">
                Curso: {coursesProgress['course_1'] || 0}% | Global: {globalProgress}%
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

        {/* Assessment Card (Matching Image 2 Layout) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-10 space-y-8">
          
          {!quizCompleted ? (
            <>
              {/* Question Text */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Pregunta {currentQuestionIndex + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options List */}
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

              {/* Feedback and Explanation */}
              {isAnswerSubmitted && (
                <div className={`p-4 rounded-2xl border text-sm animate-fade-in ${
                  currentAnswer?.isCorrect 
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                    : 'bg-rose-50/80 border-rose-200 text-rose-900'
                }`}>
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold">
                        {currentAnswer?.isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
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
                  id="btn-quiz-prev-question"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    currentQuestionIndex > 0
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer shadow-xs'
                      : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'
                  }`}
                  title={currentQuestionIndex > 0 ? "Devolverse a la pregunta anterior" : "Estás en la primera pregunta"}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Pregunta Anterior</span>
                </button>

                {!isAnswerSubmitted ? (
                  <button
                    type="button"
                    id="btn-quiz-submit-answer"
                    disabled={!selectedOption}
                    onClick={handleAnswerSubmit}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0066ff] hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    <span>Comprobar Respuesta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    id="btn-quiz-next-question"
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
            /* Quiz Completed View */
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md border-2 border-emerald-300">
                <Trophy className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                  Módulo 1 Completado
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a193b]">
                  ¡Felicidades, Evaluación Completada!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Has completado las 5 preguntas del módulo. Tu progreso global ahora refleja tu avance en la plataforma.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                  <span className="text-xs text-blue-700 font-bold block uppercase">Curso Navegación</span>
                  <span className="text-3xl font-black text-blue-900">100%</span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-xs text-emerald-700 font-bold block uppercase">Progreso Global</span>
                  <span className="text-3xl font-black text-emerald-900">{globalProgress}%</span>
                </div>
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
                  onClick={() => {
                    const el = document.getElementById('evaluacion-conocimientos');
                    if (el) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0066ff] hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explorar Otros Cursos</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MODAL DE ESTUDIO INTERACTIVO PARA CUALQUIER CURSO                      */}
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
