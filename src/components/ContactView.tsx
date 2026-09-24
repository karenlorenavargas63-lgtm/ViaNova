import React from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Share2, 
  ShieldCheck,
  Building,
  Sparkles
} from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';

export const ContactView: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('https://formsubmit.co/ajax/karenlorenavargas63@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `[VIANOVA] ${subject || 'Inquietud'} - De: ${name}`,
          nombre: name,
          correo: email,
          asunto: subject,
          mensaje: message
        })
      });
    } catch (_) {}
    setSubmitted(true);
  };

  return (
    <div id="vianova-contact-view" className="space-y-10 pb-16 animate-in fade-in duration-300">
      {/* Header (Page 19) */}
      <div className="max-w-2xl space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
          Contáctanos
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Estamos aquí para ayudarte a mejorar tu movilidad urbana. Escríbenos y nuestro equipo te responderá a la brevedad.
        </p>
      </div>

      {/* Main Grid: Left Direct Info & Map | Right Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Información Directa (Page 19 & 20) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-lg font-black text-slate-900 font-display border-b border-slate-100 pb-3">
              Información Directa
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Oficina Central</span>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Av. Movilidad 1234, Edificio SmartCity, Nivel 5. CDMX.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-black text-slate-950 block">Correo Electrónico</span>
                  <a href="mailto:karenlorenavargas63@gmail.com" className="text-blue-800 hover:text-blue-950 font-bold text-xs mt-0.5 block underline">
                    karenlorenavargas63@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Teléfono de Atención</span>
                  <p className="text-slate-600 text-xs mt-0.5">
                    +52 (55) 1234-5678 (Lunes a Viernes 08:00 - 18:00)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map (Page 19) */}
          <div className="h-56 rounded-3xl overflow-hidden shadow-sm border border-slate-200">
            <InteractiveMap interactive={false} />
          </div>
        </div>

        {/* Right Column: Contact Form (Page 19 & 20) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-display">
                ¡Mensaje Enviado con Éxito!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Gracias por escribirnos, <strong>{name}</strong>. Un especialista del equipo de movilidad de VIANOVA se pondrá en contacto contigo a través de <strong>{email}</strong> en menos de 24 horas hábiles.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
                className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                Enviar Otro Mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Ana Martínez"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ana@ejemplo.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Asunto
                </label>
                <select
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Selecciona un motivo</option>
                  <option value="consulta">Consulta general sobre la plataforma</option>
                  <option value="reporte">Reporte de falla en infraestructura vial</option>
                  <option value="institucional">Alianza institucional con ayuntamiento</option>
                  <option value="educacion">Talleres y cursos educativos para colegios</option>
                  <option value="soporte">Soporte técnico de la cuenta</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="¿Cómo podemos ayudarte?"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Privacy Disclaimer (Page 19 & 20) */}
              <p className="text-[11px] text-slate-400 leading-normal">
                Al enviar este formulario, aceptas nuestra <strong>Política de Privacidad</strong> y el tratamiento de datos de contacto institucional.
              </p>

              {/* Submit Button (Page 19 & 20) */}
              <button
                id="btn-send-contact"
                type="submit"
                className="w-full py-3.5 px-6 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 transition active:scale-98"
              >
                <span>Enviar Mensaje</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
