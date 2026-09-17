import React from 'react';
import { EducationCourse, NavigationTab } from '../types';
import { 
  GraduationCap, 
  Clock, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  HelpCircle,
  Play
} from 'lucide-react';

interface EducationViewProps {
  courses: EducationCourse[];
  onOpenQuizModal: () => void;
  onSelectTab: (tab: NavigationTab) => void;
}

export const EducationView: React.FC<EducationViewProps> = ({
  courses,
  onOpenQuizModal,
  onSelectTab
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('Todos los cursos');
  const [activeCourseModal, setActiveCourseModal] = React.useState<EducationCourse | null>(null);

  const categories = [
    'Todos los cursos',
    'Micromovilidad',
    'Seguridad Peatonal',
    'Normativa Urbana'
  ];

  const filteredCourses = courses.filter(course => {
    if (selectedCategory === 'Todos los cursos') return true;
    return course.category === selectedCategory;
  });

  return (
    <div id="vianova-education-view" className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Top Banner (Page 10) */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>Campus Virtual de Movilidad Sostenible</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Aprende mientras avanzas
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Mejora tu conocimiento sobre seguridad vial, micromovilidad y normativas urbanas. Completa los módulos para desbloquear beneficios en la plataforma.
          </p>
        </div>

        {/* Progreso Global Badge (Page 10: 34% Progreso Global, Nivel Intermedio) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 shrink-0">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-600"
                strokeDasharray="34, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute font-black text-sm text-slate-900 font-display">
              34%
            </span>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Progreso Global
            </span>
            <span className="text-base font-black text-slate-900 font-display">
              Nivel Intermedio
            </span>
            <span className="text-xs text-blue-600 font-semibold block mt-0.5">
              3 de 5 módulos activos
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills (Page 11) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid (Page 10 & 11) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            id={`course-card-${course.id}`}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10" />

                {course.recommended && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Recomendado</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-semibold">
                  <span className="px-2.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm">
                    {course.level}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-300" />
                    {course.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-black text-slate-900 font-display group-hover:text-blue-600 transition">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {course.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>Progreso</span>
                    <span className="text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button: Continuar / Iniciar Curso */}
            <div className="p-5 pt-0">
              <button
                id={`btn-course-action-${course.id}`}
                onClick={() => setActiveCourseModal(course)}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition duration-150"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{course.progress > 0 ? 'Continuar Curso' : 'Iniciar Curso'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Test Callout */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h3 className="text-xl font-bold font-display">Módulo de Evaluación de Conocimientos</h3>
          <p className="text-xs text-slate-400">
            Realiza el examen de 5 preguntas sobre señalización y normas de tránsito para validar tu certificación.
          </p>
        </div>
        <button
          onClick={onOpenQuizModal}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2 shrink-0"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Realizar Quiz de Señales</span>
        </button>
      </div>

      {/* Course Reader Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-blue-600">
                  {activeCourseModal.category} • {activeCourseModal.level}
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-display mt-0.5">
                  {activeCourseModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="relative h-48 rounded-2xl overflow-hidden">
              <img
                src={activeCourseModal.image}
                alt={activeCourseModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Resumen del Contenido
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeCourseModal.overview}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Lecciones del Módulo ({activeCourseModal.lessonsCount} Lecciones)
              </h4>
              <ul className="space-y-2">
                {activeCourseModal.topics.map((t, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 p-2.5 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Volver a cursos
              </button>
              <button
                onClick={() => {
                  setActiveCourseModal(null);
                  onOpenQuizModal();
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
              >
                <span>Hacer Evaluación Final</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
