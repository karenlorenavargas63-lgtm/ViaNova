import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { CrashHeroAnimation } from './CrashHeroAnimation';
import { UserProfile } from '../types';
import { Logo } from './Logo';
import { saveActiveSession } from '../utils/session';

interface RegisterScreenProps {
  onRegisterSuccess: (user: UserProfile) => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ 
  onRegisterSuccess, 
  onLoginSuccess 
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState('Ciclista Urbano');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Por favor ingresa tu correo electrónico.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Por favor escribe tu contraseña.');
      return;
    }

    if (isRegisterMode) {
      if (!name.trim()) {
        setErrorMessage('Por favor escribe tu nombre completo.');
        return;
      }
      if (confirmPassword && password !== confirmPassword) {
        setErrorMessage('Las contraseñas no coinciden.');
        return;
      }
      if (!acceptTerms) {
        setErrorMessage('Debes aceptar los términos y condiciones de movilidad.');
        return;
      }

      setIsSubmitting(true);

      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        role: role || 'Ciclista Urbano',
        email: email.trim().toLowerCase(),
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}`,
        city: city.trim() || 'No especificada',
        memberSince: 'Septiembre 2026',
        kmTraveled: 0,
        safetyScore: 0,
        monthlyStats: {
          routesCompleted: 0,
          totalRoutesGoal: 20,
          educationalModules: 0,
          totalModulesGoal: 10,
          co2SavedKg: 0,
          cyclingKm: 0,
        },
        badges: [],
      };

      try {
        const stored = JSON.parse(localStorage.getItem('vianova_registered_users') || '[]');
        const filtered = stored.filter((u: any) => u.email?.toLowerCase() !== email.trim().toLowerCase());
        filtered.push({ ...newUser, password });
        localStorage.setItem('vianova_registered_users', JSON.stringify(filtered));
        sessionStorage.setItem('vianova_registered_users', JSON.stringify(filtered));
      } catch (err) {
        console.error('Error guardando usuario en almacenamiento local', err);
      }

      saveActiveSession(newUser);

      setTimeout(() => {
        setIsSubmitting(false);
        onRegisterSuccess(newUser);
      }, 400);

    } else {
      // Login mode
      setIsSubmitting(true);

      let loggedUser: UserProfile | null = null;
      try {
        const stored = JSON.parse(localStorage.getItem('vianova_registered_users') || '[]');
        const matched = stored.find((u: any) => u.email?.toLowerCase() === email.trim().toLowerCase());
        if (matched) {
          const { password: _p, ...profile } = matched;
          loggedUser = profile as UserProfile;
        }
      } catch (err) {
        console.error('Error leyendo usuarios de almacenamiento local', err);
      }

      if (!loggedUser) {
        loggedUser = {
          id: `usr_${Date.now()}`,
          name: email.split('@')[0].replace(/[._]/g, ' ') || 'Usuario VIANOVA',
          role: 'Ciudadano',
          email: email.trim().toLowerCase(),
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`,
          city: city.trim() || 'No especificada',
          memberSince: 'Septiembre 2026',
          kmTraveled: 0,
          safetyScore: 0,
          monthlyStats: {
            routesCompleted: 0,
            totalRoutesGoal: 20,
            educationalModules: 0,
            totalModulesGoal: 10,
            co2SavedKg: 0,
            cyclingKm: 0,
          },
          badges: [],
        };
      }

      saveActiveSession(loggedUser);

      setTimeout(() => {
        setIsSubmitting(false);
        onLoginSuccess(loggedUser!);
      }, 400);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#b9e3fc] flex flex-col lg:flex-row text-slate-800">
      
      {/* Left Visual Column: Cinematic Crash Animation & Futuristic ViaNova Reveal */}
      <div className="relative w-full lg:w-1/2 min-h-[420px] lg:min-h-screen bg-slate-950 overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-800">
        {/* Top Header inside Left Visual */}
        <div className="flex items-center justify-between z-10 mb-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-300 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
            <span>Plataforma de Movilidad Urbana Inteligente</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Full HD • 60 FPS
          </span>
        </div>

        {/* The Animated Scene */}
        <div className="w-full my-auto py-2">
          <CrashHeroAnimation variant="full" />
        </div>

        {/* Informative Safety Banner */}
        <div className="relative z-10 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-sky-500/20 text-white shadow-xl">
          <div className="flex items-center gap-2 text-[#00ff88] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
            <span>Prevención Vial y Rutas Inteligentes VIANOVA</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            El exceso de velocidad y la invasión de carril provocan miles de siniestros evitables. Regístrate para acceder al sistema inteligente de navegación segura, alertas en tiempo real y asistencia vial.
          </p>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-10 bg-[#b9e3fc]">
        <div className="w-full max-w-md space-y-6">
          
          {/* Logo VIANOVA */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Logo size="lg" showSubtitle={true} />
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 shrink-0">
                {isRegisterMode ? 'Registro Requerido' : 'Iniciar Sesión'}
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {isRegisterMode ? 'Regístrate para ingresar' : 'Bienvenido de nuevo'}
              </h1>
              <p className="text-sm text-slate-500 font-normal leading-relaxed">
                {isRegisterMode
                  ? 'Crea tu cuenta para acceder a la pantalla de inicio y a todas las herramientas de movilidad urbana.'
                  : 'Ingresa tus credenciales registradas para ingresar a la plataforma.'}
              </p>
            </div>
          </div>

          {/* Registration / Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Name Input (Register mode) */}
            {isRegisterMode && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa tu nombre completo"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-500 focus:bg-[#d8effe] focus:outline-none text-slate-800 text-sm placeholder:text-slate-500 transition-colors font-medium"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Correo Electrónico *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Pon tu correo electrónico"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-500 focus:bg-[#d8effe] focus:outline-none text-slate-800 text-sm placeholder:text-slate-500 transition-colors font-medium"
                />
              </div>
            </div>

            {/* City & Role (Register Mode) */}
            {isRegisterMode && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej. Medellín, Bogotá, Cali..."
                    className="w-full px-3 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-500 focus:bg-[#d8effe] focus:outline-none text-slate-800 text-xs font-medium transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Tipo de Movilidad
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-500 focus:bg-[#d8effe] focus:outline-none text-slate-800 text-xs font-medium transition-colors"
                  >
                    <option value="Ciclista Urbano">🚲 Ciclista Urbano</option>
                    <option value="Peatón / Caminante">🚶 Peatón / Caminante</option>
                    <option value="Motociclista">🏍️ Motociclista</option>
                    <option value="Conductor de Automóvil">🚗 Conductor de Automóvil</option>
                    <option value="Pasajero de Transporte Público">🚌 Transporte Público</option>
                    <option value="Scooter / Patineta Eléctrica">🛴 Patineta Eléctrica</option>
                    <option value="Repartidor / Mensajería Urbana">📦 Repartidor / Envíos</option>
                    <option value="Conductor de Taxi / Plataformas">🚕 Taxi / Conductor</option>
                    <option value="Patinador / Roller / Skater">🛹 Roller / Skater</option>
                    <option value="Estudiante">🎒 Estudiante</option>
                    <option value="Conductor de Carga Pesada">🚚 Carga Pesada</option>
                    <option value="Movilidad Reducida">♿ Movilidad Reducida</option>
                  </select>
                </div>
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  Contraseña *
                </label>
                {!isRegisterMode && (
                  <button
                    type="button"
                    onClick={() => alert('Se ha enviado un enlace de recuperación temporal a tu correo.')}
                    className="text-xs font-semibold text-[#0057d9] hover:underline"
                  >
                    ¿Olvidé mi contraseña?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Escribe tu contraseña"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-500 focus:bg-[#d8effe] focus:outline-none text-slate-800 text-sm placeholder:text-slate-500 transition-colors font-medium tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register mode) */}
            {isRegisterMode && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-500 focus:bg-[#d8effe] focus:outline-none text-slate-800 text-sm placeholder:text-slate-500 transition-colors font-medium tracking-wider"
                  />
                </div>
              </div>
            )}

            {/* Terms checkbox for register */}
            {isRegisterMode && (
              <label className="flex items-start gap-2 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  Acepto los términos de servicio, política de privacidad y compromiso de movilidad segura de VIANOVA.
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="auth-submit-action-btn"
              className="w-full py-4 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] disabled:bg-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 mt-3 cursor-pointer"
            >
              <span>
                {isSubmitting
                  ? 'Registrando e ingresando...'
                  : isRegisterMode
                  ? 'Completar Registro e Ingresar al Inicio'
                  : 'Iniciar Sesión e Ingresar'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle between Register and Login */}
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-600">
              {isRegisterMode ? '¿Ya estás registrado en VIANOVA?' : '¿Aún no tienes una cuenta?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setErrorMessage('');
                }}
                className="font-bold text-[#0057d9] hover:underline ml-1 cursor-pointer"
              >
                {isRegisterMode ? 'Iniciar sesión aquí' : 'Registrarse ahora'}
              </button>
            </p>
          </div>

          {/* Platform Note */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              VIANOVA • Plataforma Inteligente de Movilidad Urbana Segura y Sostenible
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
