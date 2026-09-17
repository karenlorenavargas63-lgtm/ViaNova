import React, { useState } from 'react';
import { UserProfile } from '../types';
import { saveActiveSession } from '../utils/session';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  User, 
  KeyRound,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Ciclista Urbano');
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isForgotPassword) {
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setIsForgotPassword(false);
      }, 2500);
      return;
    }

    // Check localStorage for registered user
    let userToLog: UserProfile | null = null;
    try {
      const stored = JSON.parse(localStorage.getItem('vianova_registered_users') || '[]');
      const matched = stored.find((u: any) => u.email?.toLowerCase() === email.trim().toLowerCase());
      if (matched) {
        const { password: _p, ...profile } = matched;
        userToLog = profile as UserProfile;
      }
    } catch (err) {
      console.error('Error buscando usuario registrado', err);
    }

    if (!userToLog) {
      // First-time login: clean zero-progress profile
      userToLog = {
        id: `usr_${Date.now()}`,
        name: isRegisterMode && name.trim() ? name.trim() : email.split('@')[0].replace(/[._]/g, ' ') || 'Usuario VIANOVA',
        role: isRegisterMode ? role : 'Ciudadano',
        email: email.trim().toLowerCase(),
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || email)}`,
        city: 'No especificada',
        memberSince: 'Septiembre 2026',
        kmTraveled: 0,
        safetyScore: 0,
        monthlyStats: {
          routesCompleted: 0,
          totalRoutesGoal: 20,
          educationalModules: 0,
          totalModulesGoal: 10,
          co2SavedKg: 0,
          cyclingKm: 0
        },
        badges: []
      };

      if (isRegisterMode) {
        try {
          const stored = JSON.parse(localStorage.getItem('vianova_registered_users') || '[]');
          stored.push({ ...userToLog, password });
          localStorage.setItem('vianova_registered_users', JSON.stringify(stored));
        } catch (err) {}
      }
    }

    saveActiveSession(userToLog);

    onLoginSuccess(userToLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-white/20 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 text-white">
        
        {/* Left Side: Brand Visual & Security Assurance (PDF Page 2 & 3) */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-8 bg-gradient-to-br from-indigo-900/60 to-slate-950/90 border-r border-white/10">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&auto=format&fit=crop&q=80"
              alt="Movilidad Urbana"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg">
                V
              </div>
              <span className="text-xl font-bold tracking-tight">VIANOVA</span>
            </div>
            <p className="text-xs text-indigo-200">Plataforma de Movilidad Urbana Inteligente</p>
          </div>

          {/* Transmitir seguridad y confianza (PDF Page 3) */}
          <div className="relative z-10 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Seguridad y Confianza</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Tus credenciales y datos de ubicación están protegidos mediante cifrado de punto a punto y protocolos de navegación segura.
            </p>
          </div>
        </div>

        {/* Right Side: Auth Form (PDF Page 2) */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 flex items-center justify-center text-indigo-400">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">VIANOVA ACCESO</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isForgotPassword ? (
            /* Forgot Password Flow (PDF Page 2) */
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-bold">Recuperar Contraseña</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ingresa tu correo institucional registrado y te enviaremos un enlace de restablecimiento seguro.
                </p>
              </div>

              {resetSent ? (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Enlace de recuperación enviado a tu bandeja de entrada.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      placeholder="nombre@institucion.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs sm:text-sm text-white shadow-lg"
                  >
                    Enviar Enlace de Recuperación
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="w-full text-center text-xs text-slate-400 hover:text-white"
                  >
                    ← Volver a Iniciar Sesión
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Login / Register Form (PDF Page 2) */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {isRegisterMode ? 'Crear Cuenta en VIANOVA' : 'Bienvenido de nuevo'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isRegisterMode
                    ? 'Regístrate para acceder a todas las funciones de movilidad inteligente.'
                    : 'Ingresa tus credenciales para acceder a la plataforma de movilidad segura.'}
                </p>
              </div>

              {isRegisterMode && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Tipo de Movilidad Principal</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Ciclista Urbano" className="bg-slate-900">🚲 Ciclista Urbano</option>
                      <option value="Peatón / Caminante" className="bg-slate-900">🚶 Peatón / Caminante</option>
                      <option value="Motociclista" className="bg-slate-900">🏍️ Motociclista</option>
                      <option value="Conductor de Automóvil" className="bg-slate-900">🚗 Conductor de Automóvil</option>
                      <option value="Pasajero de Transporte Público" className="bg-slate-900">🚌 Pasajero de Transporte Público (Metro / Bus)</option>
                      <option value="Scooter / Patineta Eléctrica" className="bg-slate-900">🛴 Scooter / Patineta Eléctrica</option>
                      <option value="Repartidor / Mensajería Urbana" className="bg-slate-900">📦 Repartidor / Mensajería Urbana</option>
                      <option value="Conductor de Taxi / Plataformas" className="bg-slate-900">🚕 Conductor de Taxi / Plataformas</option>
                      <option value="Patinador / Rollers / Skater" className="bg-slate-900">🛹 Patinador / Rollers / Skater</option>
                      <option value="Estudiante" className="bg-slate-900">🎒 Estudiante</option>
                      <option value="Conductor de Carga Pesada" className="bg-slate-900">🚚 Conductor de Carga Pesada</option>
                      <option value="Movilidad Reducida" className="bg-slate-900">♿ Movilidad Reducida / Silla de Ruedas</option>
                    </select>
                  </div>
                </>
              )}

              {/* Ingresar correo electrónico (PDF Page 2) */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Correo Electrónico</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Pon tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Ingresar contraseña con botón ver (PDF Page 2) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">Contraseña</label>
                  {!isRegisterMode && (
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-[11px] text-indigo-400 hover:underline"
                    >
                      ¿Olvidé mi contraseña?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Escribe tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Iniciar sesión / Registrarse button (PDF Page 2) */}
              <button
                type="submit"
                id="auth-submit-btn"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-900/40 border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>{isRegisterMode ? 'Crear Mi Cuenta' : 'Iniciar Sesión'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Crear una cuenta switch (PDF Page 2) */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  {isRegisterMode ? (
                    <span>¿Ya tienes una cuenta? <strong className="text-indigo-400 underline">Iniciar sesión</strong></span>
                  ) : (
                    <span>¿No tienes una cuenta en el sistema? <strong className="text-indigo-400 underline">Crear cuenta</strong></span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Platform Reference */}
          <div className="pt-4 border-t border-white/5 text-[10px] text-slate-400 text-center">
            VIANOVA • Movilidad Segura y Sostenible 2026
          </div>
        </div>

      </div>
    </div>
  );
};
