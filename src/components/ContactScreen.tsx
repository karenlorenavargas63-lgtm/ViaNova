import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Clock,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export const ContactScreen: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Reporte de movilidad o incidente');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentDetails, setSentDetails] = useState<{
    name: string;
    senderEmail: string;
    subject: string;
    message: string;
    mailtoUrl: string;
    gmailUrl: string;
  } | null>(null);

  const TARGET_EMAIL = 'karenlorenavargas63@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const mailSubject = `[VIANOVA] ${subject} - De: ${fullName}`;
    const mailBody = `Hola equipo de VIANOVA,\n\nHas recibido un nuevo mensaje desde el portal oficial de contacto:\n\n• Nombre: ${fullName}\n• Correo del remitente: ${email}\n• Asunto: ${subject}\n• Fecha: ${new Date().toLocaleDateString('es-CO')} ${new Date().toLocaleTimeString('es-CO')}\n\nMensaje:\n"${message}"\n\n--\nEnviado desde el sistema de movilidad y convivencia vial VIANOVA`;

    const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    // Guardar detalles del envío para la confirmación
    setSentDetails({
      name: fullName,
      senderEmail: email,
      subject,
      message,
      mailtoUrl,
      gmailUrl,
    });

    // Abrir automáticamente el cliente de correo predeterminado
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.error('Error al invocar mailto:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setMessage('');
    setSentDetails(null);
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
          Estamos aquí para ayudarte a mejorar tu movilidad urbana. Escríbenos y tu mensaje será enviado directamente a nuestro correo oficial.
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
              
              {/* Correo Electrónico Destino Oficial */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50/90 border-2 border-blue-300 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-blue-700 border border-blue-800 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-black text-slate-950 text-sm">Correo de Contacto Oficial</p>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-200 text-blue-900">Destino</span>
                  </div>
                  <a 
                    href={`mailto:${TARGET_EMAIL}`} 
                    className="text-blue-900 hover:text-blue-950 font-black text-sm sm:text-base mt-1 block break-all underline decoration-blue-600 hover:decoration-blue-950 transition-colors"
                  >
                    {TARGET_EMAIL}
                  </a>
                  <p className="text-[11px] text-slate-800 font-bold mt-1">
                    Todos los mensajes del formulario se dirigen a este correo.
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
          {isSubmitted && sentDetails ? (
            <div className="py-8 text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md border-2 border-emerald-300">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">¡Mensaje Preparado para Enviar!</h3>
                <p className="text-sm sm:text-base text-slate-900 font-semibold max-w-lg mx-auto">
                  Tu mensaje ha sido generado con destino directo a <span className="font-black text-blue-900 underline">{TARGET_EMAIL}</span>.
                </p>
              </div>

              {/* Resumen del Mensaje */}
              <div className="text-left bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 space-y-2 text-xs sm:text-sm text-slate-950">
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-200 pb-2 gap-1">
                  <span className="font-bold text-slate-600">Para:</span>
                  <span className="font-black text-blue-900">{TARGET_EMAIL}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-200 pb-2 gap-1">
                  <span className="font-bold text-slate-600">Remitente:</span>
                  <span className="font-black">{sentDetails.name} ({sentDetails.senderEmail})</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-200 pb-2 gap-1">
                  <span className="font-bold text-slate-600">Asunto:</span>
                  <span className="font-black">{sentDetails.subject}</span>
                </div>
                <div className="pt-2">
                  <span className="font-bold text-slate-600 block mb-1">Mensaje:</span>
                  <p className="bg-white p-3 rounded-xl border border-slate-200 text-slate-900 font-medium italic">
                    "{sentDetails.message}"
                  </p>
                </div>
              </div>

              {/* Botones de acción directa */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={sentDetails.gmailUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Enviar desde Gmail Web</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={sentDetails.mailtoUrl}
                    className="py-3.5 px-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-sm shadow-lg shadow-blue-700/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Abrir App de Correo</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-slate-600" />
                  <span>Redactar otro mensaje</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-950">Envíanos un Mensaje</h3>
                  <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
                    Destino: {TARGET_EMAIL}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold mt-1">
                  Al pulsar el botón, tu mensaje se dirigirá automáticamente a <strong className="text-blue-950 font-black">{TARGET_EMAIL}</strong>.
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

              {/* Correo Electrónico del Usuario */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block">
                  Tu Correo Electrónico (Remitente) <span className="text-red-600">*</span>
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
                className="w-full py-4 px-6 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-base shadow-xl shadow-blue-700/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
              >
                <Send className={`w-5 h-5 ${isSubmitting ? 'animate-bounce' : ''}`} />
                <span>{isSubmitting ? 'Preparando Correo...' : 'Enviar Mensaje a VIANOVA'}</span>
              </button>

              {/* Nota de destino transparente */}
              <p className="text-center text-xs text-slate-900 font-bold">
                Al enviar este mensaje, se remitirá directamente al buzón oficial de <span className="text-blue-900 underline font-black">{TARGET_EMAIL}</span>.
              </p>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
