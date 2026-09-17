import React from 'react';
import { mockQuizQuestions } from '../data/mockData';
import { QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Trophy, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles,
  Award
} from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuizPassed?: (scorePercent: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onQuizPassed
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<Record<number, { selectedId: string; isSubmitted: boolean; isCorrect: boolean }>>({});
  const [isCompleted, setIsCompleted] = React.useState(false);

  if (!isOpen) return null;

  const currentQuestion: QuizQuestion = mockQuizQuestions[currentIndex] || mockQuizQuestions[0];
  const isLastQuestion = currentIndex === mockQuizQuestions.length - 1;
  const currentAnswer = userAnswers[currentIndex];
  const selectedOptionId = currentAnswer?.selectedId || null;
  const hasSubmitted = currentAnswer?.isSubmitted || false;
  const score = (Object.values(userAnswers) as Array<{ isCorrect: boolean }>).filter((a) => a.isCorrect).length;

  const handleSelectOption = (optionId: string) => {
    if (hasSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: {
        selectedId: optionId,
        isSubmitted: false,
        isCorrect: false
      }
    }));
  };

  const handleAnswerSubmit = () => {
    if (!selectedOptionId) return;
    const isCorrect = selectedOptionId === currentQuestion.correctAnswerId;
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: {
        selectedId: selectedOptionId,
        isSubmitted: true,
        isCorrect
      }
    }));
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      const correctCount = (Object.values(userAnswers) as Array<{ isCorrect: boolean }>).filter((a) => a.isCorrect).length;
      const finalPercent = Math.round((correctCount / mockQuizQuestions.length) * 100);
      onQuizPassed?.(finalPercent);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-slate-100 relative max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition"
        >
          ✕
        </button>

        {!isCompleted ? (
          <div className="space-y-6">
            {/* Top Subtitle and Question Counter (Page 12) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  MÓDULO 1: SEÑALIZACIÓN BÁSICA
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Evaluación de Conocimientos
                </h3>
              </div>

              {/* Direct Question Pills for quick navigation and returning */}
              <div className="flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto">
                <span className="text-[11px] font-bold text-slate-500 px-2">Pregunta:</span>
                {mockQuizQuestions.map((q, idx) => {
                  const ans = userAnswers[idx];
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-xs scale-105'
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

            {/* Progress Bar (Page 13) */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / mockQuizQuestions.length) * 100}%` }}
              />
            </div>

            {/* Center Question Graphic and Title */}
            <div className="text-center py-2 space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center border border-rose-100">
                <RotateCcw className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display max-w-lg mx-auto">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Multiple Choice Options (A, B, C, D) (Page 12 & 13) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrect = option.id === currentQuestion.correctAnswerId;

                let cardStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-800';
                if (isSelected) {
                  cardStyle = 'border-blue-600 bg-blue-50/60 text-blue-900 shadow-sm ring-1 ring-blue-600';
                }
                if (hasSubmitted) {
                  if (isCorrect) {
                    cardStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-medium ring-2 ring-rose-500';
                  }
                }

                return (
                  <button
                    key={option.id}
                    id={`quiz-option-${option.id}`}
                    type="button"
                    disabled={hasSubmitted}
                    onClick={() => handleSelectOption(option.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-150 flex items-start gap-3 relative cursor-pointer ${cardStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {option.id}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-snug">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Educational Feedback Box (Page 13) */}
            {hasSubmitted && (
              <div className={`p-4 rounded-2xl border text-xs sm:text-sm animate-in fade-in space-y-1 ${
                selectedOptionId === currentQuestion.correctAnswerId
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="font-bold flex items-center gap-1.5">
                  {selectedOptionId === currentQuestion.correctAnswerId ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>¡Correcto! Excelente respuesta.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Respuesta incorrecta.</span>
                    </>
                  )}
                </div>
                <p className="text-slate-700 text-xs leading-relaxed pt-1">
                  <strong>Explicación:</strong> {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Bottom Actions and Helper Text */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Botón Volver / Anterior si la persona se quiere devolver */}
              <button
                id="btn-quiz-modal-prev"
                type="button"
                onClick={handlePrevQuestion}
                disabled={currentIndex === 0}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
                  currentIndex > 0
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer border border-slate-200'
                    : 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed opacity-50'
                }`}
                title={currentIndex > 0 ? "Volver a la pregunta anterior" : "Primera pregunta"}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Pregunta Anterior</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {!hasSubmitted ? (
                  <button
                    id="btn-quiz-submit"
                    type="button"
                    disabled={!selectedOptionId}
                    onClick={handleAnswerSubmit}
                    className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <span>Responder</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    id="btn-quiz-next"
                    type="button"
                    onClick={handleNextQuestion}
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <span>{isLastQuestion ? 'Ver Resultados' : 'Siguiente Pregunta'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Quiz Results Completion Screen */
          <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white mx-auto flex items-center justify-center shadow-xl shadow-blue-500/25">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                ¡Módulo Completado!
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-display">
                Certificación de Señalización Básica
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Has demostrado un excelente dominio de las normas de prioridad y convivencia vial.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 inline-block text-center min-w-[240px]">
              <span className="text-xs font-bold text-slate-400 uppercase">Puntuación Final</span>
              <p className="text-4xl font-black text-blue-600 font-display mt-1">
                {score} / {mockQuizQuestions.length}
              </p>
              <span className="text-xs text-emerald-600 font-bold">
                +{Math.round((score / mockQuizQuestions.length) * 10)} Puntos de Certificación
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Repetir Quiz
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                Guardar en Perfil y Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
