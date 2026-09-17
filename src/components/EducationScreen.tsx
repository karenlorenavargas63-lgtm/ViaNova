import React, { useState } from 'react';
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
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

import cyclistsGreenBikeway from '../assets/images/cyclists_green_bikeway_1788438597822.jpg';
import scooterBikewayPov from '../assets/images/scooter_bikeway_pov_1788438617913.jpg';
import pedestrianSignDusk from '../assets/images/pedestrian_sign_dusk_1788438631922.jpg';
import roundaboutDiagram from '../assets/images/roundabout_diagram_1788438648636.jpg';
import incidentResponseAgent from '../assets/images/incident_response_agent_1788438663707.jpg';

export const EducationScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  
  // Interactive Quiz State: Módulo 1 (Señalización Básica)
  // Starts from question 1 (index 0) with no pre-completed questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, { selectedOption: string | null; isSubmitted: boolean; isCorrect: boolean }>>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Módulo 1 quiz questions list (5 questions starting from question 1)
  const quizQuestions = [
    {
      number: 1,
      category: 'MÓDULO 1: SEÑALIZACIÓN BÁSICA',
      title: 'Evaluación de Conocimientos',
      question: '¿Cuál es la primera prioridad en la Pirámide de la Movilidad Urbana?',
      options: [
        {
          id: 'A',
          text: 'Vehículos de carga y logística urbana.',
        },
        {
          id: 'B',
          text: 'Peatones y personas con movilidad reducida.',
          isCorrect: true,
        },
        {
          id: 'C',
          text: 'Transporte público masivo y buses escolares.',
        },
        {
          id: 'D',
          text: 'Automóviles particulares y vehículos eléctricos.',
        },
      ],
      correctExplanation: 'Los peatones y personas con movilidad reducida se sitúan en la cúspide de la pirámide por ser los usuarios más vulnerables con máxima prioridad de paso.',
    },
    {
      number: 2,
      category: 'MÓDULO 1: SEÑALIZACIÓN BÁSICA',
      title: 'Evaluación de Conocimientos',
      question: '¿Qué indica una línea continua pintada en el centro de la calzada?',
      options: [
        {
          id: 'A',
          text: 'Está permitido adelantar con precaución si no vienen vehículos.',
        },
        {
          id: 'B',
          text: 'Prohibición estricta de adelantar o invadir el carril en sentido opuesto.',
          isCorrect: true,
        },
        {
          id: 'C',
          text: 'Carril exclusivo para bicicletas los fines de semana.',
        },
        {
          id: 'D',
          text: 'Zona habilitada para detenerse brevemente.',
        },
      ],
      correctExplanation: 'La línea continua longitudinal prohíbe de forma terminante invadir el carril contrario o realizar maniobras de adelantamiento.',
    },
    {
      number: 3,
      category: 'MÓDULO 1: SEÑALIZACIÓN BÁSICA',
      title: 'Evaluación de Conocimientos',
      question: '¿Qué debes hacer cuando encuentras una señal de PARE?',
      options: [
        {
          id: 'A',
          text: 'Disminuir la velocidad y continuar si no viene nadie por la vía transversal.',
        },
        {
          id: 'B',
          text: 'Detenerse por completo antes de la línea de pare o cruce peatonal.',
          isCorrect: true,
        },
        {
          id: 'C',
          text: 'Tocar la bocina para alertar a otros conductores que vas a cruzar la intersección.',
        },
        {
          id: 'D',
          text: 'Ceder el paso exclusivamente a los vehículos que se aproximan por la derecha.',
        },
      ],
      correctExplanation: 'La señal reglamentaria de PARE (R1) exige detención total y obligatoria antes de la demarcación o cruce, sin excepción, verificando ambos sentidos de circulación.',
    },
    {
      number: 4,
      category: 'MÓDULO 1: SEÑALIZACIÓN BÁSICA',
      title: 'Evaluación de Conocimientos',
      question: '¿Cuál es la distancia lateral mínima que debe guardar un vehículo al adelantar a un ciclista?',
      options: [
        { id: 'A', text: '50 centímetros de separación.' },
        { id: 'B', text: '1.5 metros de distancia lateral.', isCorrect: true },
        { id: 'C', text: 'Solo la distancia del retrovisor.' },
        { id: 'D', text: 'No se requiere distancia si el carril es amplio.' },
      ],
      correctExplanation: 'Por normativa y seguridad vital, todo automotor debe respetar un margen mínimo de 1.5 metros al adelantar a un usuario de bicicleta.',
    },
    {
      number: 5,
      category: 'MÓDULO 1: SEÑALIZACIÓN BÁSICA',
      title: 'Evaluación de Conocimientos',
      question: '¿Qué significa la luz amarilla fija en el semáforo vehicular?',
      options: [
        { id: 'A', text: 'Acelerar antes de que el semáforo cambie a luz roja.' },
        { id: 'B', text: 'Advertencia de cambio inminente a rojo; detenerse de manera segura.', isCorrect: true },
        { id: 'C', text: 'Paso libre preferencial para motocicletas.' },
        { id: 'D', text: 'Giro obligatorio a la derecha sin parar.' },
      ],
      correctExplanation: 'La luz amarilla advierte la conclusión inminente del derecho de paso; se debe detener el vehículo antes de la línea de detención salvo que no pueda hacerse con seguridad.',
    },
  ];

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
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        selectedOption,
        isSubmitted: true,
        isCorrect: correct,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
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
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizCompleted(false);
  };

  const scrollToQuiz = () => {
    const el = document.getElementById('evaluacion-conocimientos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-8 sm:py-12 space-y-20 animate-fade-in text-slate-800">
      
      {/* ========================================================================= */}
      {/* 1. PRIMERA SECCIÓN: APRENDE MIENTRAS AVANZAS (Exactamente como Imagen 1)  */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto space-y-8">
        
        {/* Header with Title and Global Progress Widget */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a193b] tracking-tight">
              Aprende mientras avanzas
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Mejora tu conocimiento sobre seguridad vial, micromovilidad y normativas urbanas. Completa los módulos para desbloquear beneficios en la plataforma.
            </p>
          </div>

          {/* Top Right Radial Progress Widget matching Image 1 */}
          <div className="shrink-0 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4">
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
                  className="text-[#0066ff]"
                  strokeDasharray="34, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-black text-slate-900">34%</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Progreso Global</p>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">Nivel Intermedio</h4>
            </div>
          </div>
        </div>

        {/* Filter Pills matching Image 1 */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          {[
            { id: 'todos', label: 'Todos los cursos' },
            { id: 'micromovilidad', label: 'Micromovilidad' },
            { id: 'peatonal', label: 'Seguridad Peatonal' },
            { id: 'normativa', label: 'Normativa Urbana' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#0a193b] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Grid matching Image 1 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          
          {/* Card 1: Featured Large Card (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 bg-white rounded-[24px] border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col sm:flex-row hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300">
            {/* Left Image half with Recomendado Badge */}
            <div className="relative sm:w-1/2 min-h-[220px] sm:min-h-full overflow-hidden bg-slate-100">
              <img
                src={cyclistsGreenBikeway}
                alt="Navegación Urbana Segura"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#0066ff] text-[11px] font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" />
                <span>Recomendado</span>
              </div>
            </div>

            {/* Right Content half */}
            <div className="sm:w-1/2 p-6 sm:p-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066ff] text-xs font-bold">
                    Básico
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    2.5 hrs
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Navegación Urbana Segura
                </h3>
                
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                  Aprende los fundamentos para moverte por la ciudad minimizando riesgos. Ideal para nuevos usuarios de micromovilidad y...
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Progreso</span>
                    <span className="text-[#0066ff] font-bold">60%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0066ff] rounded-full w-[60%]"></div>
                  </div>
                </div>

                {/* Continuar Curso button */}
                <button
                  onClick={scrollToQuiz}
                  className="w-full py-3 px-4 rounded-xl bg-[#0a193b] hover:bg-[#07132c] text-white text-xs font-bold transition-all shadow-sm"
                >
                  Continuar Curso
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Dominio de Ciclovías (Top Right) */}
          <div className="bg-white rounded-[24px] border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300">
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={scooterBikewayPov}
                  alt="Dominio de Ciclovías"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066ff] text-xs font-bold">
                    Intermedio
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    45 min
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Dominio de Ciclovías
                </h3>

                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Progreso</span>
                    <span className="text-[#0066ff] font-bold">15%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0066ff] rounded-full w-[15%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Señales Inteligentes (Bottom Left) */}
          <div className="bg-white rounded-[24px] border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300">
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={pedestrianSignDusk}
                  alt="Señales Inteligentes"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066ff] text-xs font-bold">
                    Básico
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    1.5 hrs
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Señales Inteligentes
                </h3>

                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Progreso</span>
                    <span className="text-slate-400 font-bold">0%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-200 rounded-full w-[0%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Prioridad y Flujo (Bottom Middle) */}
          <div className="bg-white rounded-[24px] border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300">
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={roundaboutDiagram}
                  alt="Prioridad y Flujo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066ff] text-xs font-bold">
                    Avanzado
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    3 hrs
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Prioridad y Flujo
                </h3>

                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Progreso</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-200 rounded-full w-[0%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Respuesta a Incidentes (Bottom Right) */}
          <div className="bg-white rounded-[24px] border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300">
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={incidentResponseAgent}
                  alt="Respuesta a Incidentes"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0066ff] text-xs font-bold">
                    Intermedio
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    1.2 hrs
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Respuesta a Incidentes
                </h3>

                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Progreso</span>
                    <span className="text-[#0066ff] font-bold">40%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0066ff] rounded-full w-[40%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#0066ff] rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Central Assessment Container matching Image 2 */}
        <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-10 lg:p-12 relative space-y-8">
          
          {!quizCompleted ? (
            <div className="space-y-8">
              
              {/* Center Pink/Red Circular Icon & Question Headline */}
              <div className="text-center space-y-4 max-w-xl mx-auto">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mx-auto shadow-sm">
                  <RotateCcw className="w-5 h-5" />
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* 4 Option Cards in 2x2 Grid matching Image 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {currentQ.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const isCorrect = option.isCorrect;

                  let borderStyle = "border-slate-200 hover:border-slate-300 bg-white text-slate-700";
                  let badgeStyle = "bg-slate-100 text-slate-600";

                  if (isSelected && !isAnswerSubmitted) {
                    borderStyle = "border-[#0066ff] bg-blue-50/40 text-[#0066ff] shadow-sm";
                    badgeStyle = "bg-[#0066ff] text-white";
                  } else if (isAnswerSubmitted) {
                    if (isCorrect) {
                      borderStyle = "border-emerald-500 bg-emerald-50 text-emerald-800";
                      badgeStyle = "bg-emerald-600 text-white";
                    } else if (isSelected && !isCorrect) {
                      borderStyle = "border-rose-500 bg-rose-50 text-rose-800";
                      badgeStyle = "bg-rose-600 text-white";
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      disabled={isAnswerSubmitted}
                      className={`p-5 sm:p-6 rounded-2xl border text-left flex items-start gap-4 transition-all duration-200 min-h-[96px] cursor-pointer ${borderStyle}`}
                    >
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${badgeStyle}`}>
                        {option.id}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback explanation if submitted */}
              {isAnswerSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-fade-in ${
                  selectedOption === currentQ.options.find(o => o.isCorrect)?.id
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                  <p className="font-bold mb-1">
                    {selectedOption === currentQ.options.find(o => o.isCorrect)?.id ? '✓ ¡Respuesta Correcta!' : '✕ Respuesta Incorrecta'}
                  </p>
                  <p className="text-xs text-slate-600">{currentQ.correctExplanation}</p>
                </div>
              )}

              {/* Navigation Actions: Volver si se quiere devolver + Responder / Siguiente */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Botón Volver / Anterior si la persona se quiere devolver */}
                <button
                  id="btn-quiz-prev-question"
                  type="button"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    currentQuestionIndex > 0
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer shadow-2xs border border-slate-200'
                      : 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed opacity-60'
                  }`}
                  title={currentQuestionIndex > 0 ? "Devolverse a la pregunta anterior" : "Estás en la primera pregunta"}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Pregunta Anterior</span>
                </button>

                <div className="flex items-center gap-3">
                  {!isAnswerSubmitted ? (
                    <button
                      id="btn-quiz-submit-answer"
                      type="button"
                      onClick={handleAnswerSubmit}
                      disabled={!selectedOption}
                      className={`py-3 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                        selectedOption
                          ? 'bg-[#0057d9] hover:bg-[#0047b3] text-white shadow-md cursor-pointer'
                          : 'bg-[#718296] text-white cursor-not-allowed opacity-90'
                      }`}
                    >
                      <span>Responder</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      id="btn-quiz-next-question"
                      type="button"
                      onClick={handleNextQuestion}
                      className="py-3 px-6 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>{currentQuestionIndex === totalQuestions - 1 ? 'Finalizar Evaluación' : 'Siguiente Pregunta'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Instructional note matching Image 2 */}
              {!selectedOption && !isAnswerSubmitted && (
                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>Selecciona una opción para responder o usa las preguntas anteriores para revisar.</span>
                  </p>
                </div>
              )}

            </div>
          ) : (
            /* Quiz Completed View */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 text-[#0066ff] flex items-center justify-center mx-auto shadow-sm">
                <Trophy className="w-8 h-8 text-amber-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-[#0a193b]">¡Evaluación Completada!</h3>
                <p className="text-slate-600 text-sm">
                  Has obtenido {(Object.values(userAnswers) as Array<{ isCorrect: boolean }>).filter((a) => a.isCorrect).length} de {totalQuestions} respuestas correctas en Señalización Básica.
                </p>
                <div className="inline-block mt-2 px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  Insignia Desbloqueada: Conductor Preventivo Nivel 1
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs cursor-pointer"
                >
                  Repetir Evaluación
                </button>
              </div>
            </div>
          )}

        </div>

      </section>

    </div>
  );
};
