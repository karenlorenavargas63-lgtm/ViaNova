import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react';
import transitHubImg from '../assets/images/smart_transit_hub_1788276142198.jpg';
import { UserProfile } from '../types';
import { Logo } from './Logo';

interface RegisterScreenProps {
  onRegisterSuccess: (user: UserProfile) => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ 
  onRegisterSuccess, 
  onLoginSuccess 
}) => {
  // Default to Registration mode as requested ("que cuando cualquier persona ingrese le pida un registro antes")
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Medellín');
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
        email: email.trim(),
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}`,
        city: city.trim() || 'Medellín',
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
        badges: [
          {
            id: 'badge_welcome',
            name: 'Bienvenido a VIANOVA',
            icon: 'ShieldCheck',
            color: 'emerald',
            description: 'Registro completado en la red inteligente de movilidad urbana.',
            unlockedAt: 'Hoy',
          },
        ],
      };

      setTimeout(() => {
        setIsSubmitting(false);
        onRegisterSuccess(newUser);
      }, 400);

    } else {
      // Login mode
      setIsSubmitting(true);
      const loggedUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0] || 'Usuario VIANOVA',
        role: 'Ciudadano Activo',
        email: email.trim(),
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`,
        city: city.trim() || 'Medellín',
        memberSince: '2026',
        kmTraveled: 120,
        safetyScore: 0,
        monthlyStats: {
          routesCompleted: 5,
          totalRoutesGoal: 20,
          educationalModules: 2,
          totalModulesGoal: 10,
          co2SavedKg: 12.5,
          cyclingKm: 34,
        },
        badges: [],
      };

      setTimeout(() => {
        setIsSubmitting(false);
        onLoginSuccess(loggedUser);
      }, 400);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row text-slate-800">
      
      {/* Left Visual Column matching VIANOVA style */}
      <div className="relative w-full lg:w-1/2 min-h-[260px] sm:min-h-[380px] lg:min-h-screen bg-slate-900 overflow-hidden flex flex-col justify-end p-6 sm:p-10">
        <img
          src={transitHubImg}
          alt="Centro de Movilidad VIANOVA"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate-950/40"></div>

        {/* Informative overlay card */}
        <div className="relative z-10 p-5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 text-white max-w-md hidden sm:block">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
            <span>Acceso a la Red Inteligente VIANOVA</span>
          </div>
          <p className="text-base font-bold text-white mb-1">
            Tu portal de movilidad segura y rutas inteligentes
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Regístrate para planificar trayectos en tiempo real en Medellín, recibir alertas viales instantáneas y monitorear tu impacto ambiental.
          </p>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-10 bg-white">
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f1f3f5] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 text-sm placeholder:text-slate-400 transition-colors font-medium"
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f1f3f5] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 text-sm placeholder:text-slate-400 transition-colors font-medium"
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
                    placeholder="Ej. Medellín"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f1f3f5] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 text-xs font-medium transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Tipo de Movilidad
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f1f3f5] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 text-xs font-medium transition-colors"
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
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#f1f3f5] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 text-sm placeholder:text-slate-400 transition-colors font-medium tracking-wider"
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
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#f1f3f5] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 text-sm placeholder:text-slate-400 transition-colors font-medium tracking-wider"
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
              className="w-full py-4 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] disabled:bg-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 mt-3"
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
                className="font-bold text-[#0057d9] hover:underline ml-1"
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
