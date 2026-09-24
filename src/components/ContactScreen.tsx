import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Building,
  Clock
} from 'lucide-react';

export const ContactScreen: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Reporte de movilidad o incidente');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFullName('');
        setEmail('');
        setMessage('');
      }, 3500);
    }, 800);
  };

  return (
    <div className="space-y-10 py-6 pb-20 animate-fade-in text-slate-950">
      
      {/* Header con letras negras y nítidas */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-blue-950 text-xs font-black uppercase tracking-wider shadow-sm">
          <MessageSquare className="w-4 h-4 text-blue-800" />
          <span>Atención Ciudadana y Alianzas</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          Contáctanos
        </h1>
        <p className="text-slate-900 font-semibold text-base sm:text-lg leading-relaxed">
          Estamos aquí para ayudarte a mejorar tu movilidad urbana. Escríbenos y nuestro equipo te responderá a la brevedad.
        </p>
      </div>

      {/* Main Grid: Direct Info + Form con fondo claro y letras negras */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        
        {/* Left Column: Información Directa */}
        <div className="lg:col-span-5 rounded-3xl bg-white border-2 border-sky-300 p-8 space-y-8 shadow-xl">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-950 border-b-2 border-slate-100 pb-3">
              Información Directa
            </h2>

            <div className="space-y-5 text-sm text-slate-950">
              
              {/* Correo Electrónico (karenlorenavargas63@gmail.com) */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50/80 border-2 border-blue-200 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-blue-600 border border-blue-700 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-black text-slate-950 text-sm">Correo Electrónico</p>
                  <a 
                    href="mailto:karenlorenavargas63@gmail.com" 
                    className="text-blue-800 hover:text-blue-950 font-bold text-sm sm:text-base mt-1 block break-all underline decoration-blue-500 hover:decoration-blue-950 transition-colors"
                  >
                    karenlorenavargas63@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-700 font-semibold mt-0.5">
                    Respuesta rápida garantizada
                  </p>
                </div>
              </div>

              {/* Oficina Central */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-900 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black text-slate-950 text-sm">Oficina Central</p>
                  <p className="text-slate-900 font-semibold text-xs mt-1 leading-relaxed">
                    Av. Movilidad 1234, Edificio SmartCity, Nivel 5. Centro de Gestión Urbana.
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-900 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black text-slate-950 text-sm">Teléfono de Atención</p>
                  <p className="text-slate-900 font-bold text-xs mt-1">
                    +52 (55) 1234-5678 / +57 (4) 444-9090
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    <span>Lunes a Viernes 08:00 - 18:00</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Map Graphic (PDF Page 19 & 20) */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-black uppercase tracking-wider text-slate-950">Ubicación Satelital</p>
            {/* Simulated Location Map Snapshot */}
            <div className="rounded-2xl overflow-hidden border-2 border-slate-200 h-40 relative mt-2 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80"
                alt="Mapa de ubicación sede VIANOVA"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/25 flex items-center justify-center">
                <div className="px-4 py-2 rounded-full bg-slate-950 text-white text-xs font-black flex items-center gap-2 shadow-2xl border border-white/20">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Sede VIANOVA SmartCity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Formulario de Contacto con Tipografía Negra */}
        <div className="lg:col-span-7 rounded-3xl bg-white border-2 border-sky-300 p-8 sm:p-10 shadow-xl relative">
          {isSubmitted ? (
            <div className="py-16 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md border-2 border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-950">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-sm text-slate-900 font-semibold max-w-md mx-auto">
                Gracias por comunicarte con VIANOVA. Tu mensaje fue enviado correctamente a <span className="font-black text-blue-900">karenlorenavargas63@gmail.com</span> y nuestro equipo te responderá a la brevedad.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-950">Envíanos un Mensaje</h3>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold mt-1">
                  Completa los campos para canalizar tu solicitud al área correspondiente.
                </p>
              </div>

              {/* Nombre Completo */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block">
                  Nombre Completo <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ana Martínez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-4 py-3 text-sm text-slate-950 font-bold placeholder-slate-500 focus:outline-none focus:border-blue-700 focus:bg-white transition-all shadow-sm"
                />
              </div>

              {/* Correo Electrónico */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block">
                  Tu Correo Electrónico <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-4 py-3 text-sm text-slate-950 font-bold placeholder-slate-500 focus:outline-none focus:border-blue-700 focus:bg-white transition-all shadow-sm"
                />
              </div>

              {/* Seleccionar el motivo de contacto (Asunto) */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block">
                  Asunto del Mensaje
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-4 py-3 text-sm text-slate-950 font-bold focus:outline-none focus:border-blue-700 focus:bg-white transition-all shadow-sm"
                >
                  <option value="Reporte de movilidad o incidente" className="text-slate-950 font-bold">Reporte de movilidad o incidente</option>
                  <option value="Alianza institucional / Ayuntamiento" className="text-slate-950 font-bold">Alianza institucional / Ayuntamiento</option>
                  <option value="Soporte técnico de la plataforma" className="text-slate-950 font-bold">Soporte técnico de la plataforma</option>
                  <option value="Prensa, conferencias y divulgación" className="text-slate-950 font-bold">Prensa, conferencias y divulgación</option>
                  <option value="Sugerencia de nueva ciclovía" className="text-slate-950 font-bold">Sugerencia de nueva ciclovía</option>
                </select>
              </div>

              {/* Mensaje */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block">
                  Mensaje <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="¿Cómo podemos ayudarte? Escribe aquí los detalles..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-4 py-3 text-sm text-slate-950 font-bold placeholder-slate-500 focus:outline-none focus:border-blue-700 focus:bg-white transition-all resize-none shadow-sm"
                />
              </div>

              {/* Botón Enviar Mensaje */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-base shadow-xl shadow-blue-700/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Send className={`w-5 h-5 ${isSubmitting ? 'animate-bounce' : ''}`} />
                <span>{isSubmitting ? 'Enviando Solicitud...' : 'Enviar Mensaje a VIANOVA'}</span>
              </button>

              {/* Política de privacidad */}
              <p className="text-center text-xs text-slate-900 font-bold">
                Al enviar este formulario, aceptas nuestra <span className="text-blue-800 hover:underline cursor-pointer font-black">Política de Privacidad</span> y el tratamiento de tus datos para atención vial.
              </p>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
