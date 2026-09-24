import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Share2, 
  MessageSquare,
  Sparkles,
  Building,
  ShieldCheck
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
    <div className="space-y-12 py-4 pb-20 animate-fade-in">
      
      {/* Header (PDF Page 19) */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          Atención Ciudadana y Alianzas
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contáctanos
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Estamos aquí para ayudarte a mejorar tu movilidad urbana. Escríbenos y nuestro equipo te responderá a la brevedad.
        </p>
      </div>

      {/* Main Grid: Direct Info + Form (PDF Pages 19 & 20) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        
        {/* Left Column: Información Directa */}
        <div className="lg:col-span-5 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl p-8 space-y-8 shadow-2xl">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Información Directa</h2>

            <div className="space-y-5 text-xs sm:text-sm text-slate-300">
              
              {/* Oficina Central */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">Oficina Central</p>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                    Av. Movilidad 1234, Edificio SmartCity, Nivel 5. Centro de Gestión Urbana.
                  </p>
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">Correo Electrónico</p>
                  <a href="mailto:contacto@vianova.com" className="text-indigo-400 hover:underline text-xs mt-0.5 block">
                    contacto@vianova.com
                  </a>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">Teléfono de Atención</p>
                  <p className="text-slate-400 text-xs mt-0.5">+52 (55) 1234-5678 / +57 (4) 444-9090</p>
                </div>
              </div>

            </div>
          </div>

          {/* Map Graphic (PDF Page 19 & 20) */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            {/* Simulated Location Map Snapshot */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-36 relative mt-4">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80"
                alt="Mapa de ubicación sede VIANOVA"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <div className="px-3 py-1.5 rounded-full bg-indigo-600/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sede VIANOVA SmartCity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Formulario de Contacto (PDF Page 19 & 20) */}
        <div className="lg:col-span-7 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl relative">
          {isSubmitted ? (
            <div className="py-16 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Gracias por comunicarte con VIANOVA. Un especialista de movilidad urbana responderá a tu solicitud en las próximas 24 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Envíanos un Mensaje</h3>
                <p className="text-xs text-slate-400 mt-1">Completa los campos para canalizar tu solicitud al área correspondiente.</p>
              </div>

              {/* Nombre Completo */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ana Martínez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Correo Electrónico */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="Pon tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Seleccionar el motivo de contacto (Asunto) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Asunto</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                >
                  <option value="Reporte de movilidad o incidente" className="bg-slate-900 text-white">Reporte de movilidad o incidente</option>
                  <option value="Alianza institucional / Ayuntamiento" className="bg-slate-900 text-white">Alianza institucional / Ayuntamiento</option>
                  <option value="Soporte técnico de la plataforma" className="bg-slate-900 text-white">Soporte técnico de la plataforma</option>
                  <option value="Prensa, conferencias y divulgación" className="bg-slate-900 text-white">Prensa, conferencias y divulgación</option>
                  <option value="Sugerencia de nueva ciclovía" className="bg-slate-900 text-white">Sugerencia de nueva ciclovía</option>
                </select>
              </div>

              {/* Mensaje */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Mensaje</label>
                <textarea
                  rows={4}
                  required
                  placeholder="¿Cómo podemos ayudarte?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all resize-none"
                />
              </div>

              {/* Botón Enviar Mensaje (PDF Page 19 & 20) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-indigo-900/40 border border-white/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Send className={`w-4 h-4 ${isSubmitting ? 'animate-bounce' : ''}`} />
                <span>{isSubmitting ? 'Enviando Solicitud...' : 'Enviar Mensaje'}</span>
              </button>

              {/* Política de privacidad (PDF Page 19 & 20) */}
              <p className="text-center text-[11px] text-slate-400">
                Al enviar este formulario, aceptas nuestra <span className="text-indigo-400 hover:underline cursor-pointer">Política de Privacidad</span> y el tratamiento responsable de tus datos.
              </p>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
