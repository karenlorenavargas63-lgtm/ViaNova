import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  Sparkles,
  MapPin,
  Bike,
  Info,
  X
} from 'lucide-react';
import { CrashHeroAnimation } from './CrashHeroAnimation';
import { UserProfile } from '../types';
import { Logo } from './Logo';
import { 
  validateCredentials, 
  registerNewUser, 
  loginOrRegisterWithGoogle, 
  DEMO_CREDENTIALS,
  getRegisteredUsers
} from '../utils/session';

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  onRegisterSuccess?: (user: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onLoginSuccess, 
  onRegisterSuccess 
}) => {
  // Mode: default MUST BE LOGIN ('login'), not register
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register form fields
  const [name, setName] = useState('');
  const [city, setCity] = useState('Medellín');
  const [role, setRole] = useState('Ciclista Urbano');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);

  // States
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [isCustomGoogle, setIsCustomGoogle] = useState(false);

  // Pre-configured quick Google accounts for testing
  const sampleGoogleAccounts = [
    {
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Elena Ríos',
      email: 'elena.rios.movilidad@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80'
    }
  ];

  // Helper to autofill demo credentials
  const handleFillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setErrorMessage('');
    setSuccessMessage('Credenciales de prueba cargadas correctamente. Haz clic en "Iniciar Sesión e Ingresar".');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  // Login submit handler with STRICT VALIDATION
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim()) {
      setErrorMessage('Por favor ingresa tu correo electrónico.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Por favor ingresa tu contraseña.');
      return;
    }

    setIsSubmitting(true);

    // STRICT VALIDATION AGAINST REGISTERED USERS DATABASE
    setTimeout(() => {
      const validation = validateCredentials(email, password);

      if (!validation.success) {
        setIsSubmitting(false);
        setErrorMessage(validation.error || 'Credenciales inválidas.');
        return;
      }

      setIsSubmitting(false);
      if (validation.user) {
        onLoginSuccess(validation.user);
      }
    }, 350);
  };

  // Register submit handler
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Por favor ingresa tu nombre completo.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!password.trim() || password.length < 6) {
      setErrorMessage('La contraseña debe tener mínimo 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    if (!acceptTerms) {
      setErrorMessage('Debes aceptar los términos y condiciones para continuar.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = registerNewUser(
        {
          name: name.trim(),
          email: email.trim(),
          city: city.trim() || 'Medellín',
          role: role || 'Ciclista Urbano',
        },
        password
      );

      setIsSubmitting(false);

      if (!result.success) {
        setErrorMessage(result.error || 'Error al registrar usuario.');
        return;
      }

      if (result.user) {
        if (onRegisterSuccess) {
          onRegisterSuccess(result.user);
        } else {
          onLoginSuccess(result.user);
        }
      }
    }, 400);
  };

  // Google Login execution
  const executeGoogleLogin = (googleAccount: { name: string; email: string; avatar?: string }) => {
    setShowGoogleModal(false);
    setIsSubmitting(true);

    setTimeout(() => {
      const loggedUser = loginOrRegisterWithGoogle(googleAccount);
      setIsSubmitting(false);
      onLoginSuccess(loggedUser);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-[#b9e3fc] flex flex-col lg:flex-row text-slate-800">
      
      {/* Left Visual Column: Cinematic Crash Animation & Futuristic ViaNova Reveal */}
      <div className="relative w-full lg:w-1/2 min-h-[440px] lg:min-h-screen bg-slate-950 overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-800">
        
        {/* Top Header inside Left Visual */}
        <div className="flex items-center justify-between z-10 mb-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-300 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
            <span>Plataforma de Movilidad Urbana Inteligente</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
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
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Inicia sesión para acceder a la red en tiempo real de movilidad segura: alertas tempranas de incidentes, trazado de rutas para ciclistas y peatones, y módulos educativos interactivos.
          </p>
        </div>
      </div>

      {/* Right Form Column: Iniciar Sesión / Registrarse */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 lg:px-14 py-8 bg-[#b9e3fc]">
        <div className="w-full max-w-md space-y-5">
          
          {/* Top Brand Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Logo size="lg" showSubtitle={true} />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-sky-300 text-blue-900 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Acceso Seguro</span>
              </div>
            </div>

            {/* TAB SELECTOR: Iniciar Sesión (Default) vs Registrarse */}
            <div className="flex p-1 rounded-2xl bg-sky-200/70 border border-sky-300 mt-2">
              <button
                type="button"
                id="tab-iniciar-sesion"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#0057d9] text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </button>

              <button
                type="button"
                id="tab-registrarse"
                onClick={() => {
                  setMode('register');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'register'
                    ? 'bg-[#0057d9] text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Registrarse</span>
              </button>
            </div>

            <div className="pt-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {mode === 'login' ? 'Bienvenido a VIANOVA' : 'Crear Cuenta en VIANOVA'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mt-1">
                {mode === 'login'
                  ? 'Ingresa tus credenciales autorizadas para acceder a la plataforma de movilidad.'
                  : 'Completa tus datos para unirte a la red inteligente de ciclistas, peatones y conductores.'}
              </p>
            </div>
          </div>

          {/* GOOGLE SIGN-IN BUTTON (Prominently featured) */}
          <div className="space-y-3">
            <button
              type="button"
              id="google-signin-btn"
              onClick={() => setShowGoogleModal(true)}
              style={{ backgroundColor: '#ffffff', color: '#1f2937' }}
              className="w-full py-3.5 px-4 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm shadow-sm transition-all duration-200 hover:shadow flex items-center justify-center gap-3 cursor-pointer group hover:bg-slate-50"
            >
              {/* Google Official G SVG */}
              <svg className="w-5 h-5 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{mode === 'login' ? 'Iniciar sesión con Google' : 'Registrarse con Google'}</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-sky-300 w-full"></div>
              <span className="bg-[#b9e3fc] px-3 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                o con correo electrónico
              </span>
              <div className="border-t border-sky-300 w-full"></div>
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-100/90 border border-red-300 text-red-800 text-xs sm:text-sm font-semibold flex flex-col gap-2 animate-fade-in shadow-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              {mode === 'login' && errorMessage.includes('no se encuentra registrado') && (
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMessage('');
                  }}
                  className="self-start text-xs font-bold text-blue-800 underline hover:text-blue-950 pl-7 cursor-pointer"
                >
                  → Crear una cuenta nueva ahora con este correo
                </button>
              )}
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fade-in shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 1. MODO INICIAR SESIÓN (DEFAULT)                                          */}
          {/* ========================================================================= */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Correo Electrónico Registrado *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    id="login-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@ciudad.gov.co"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:bg-[#d8effe] focus:outline-none text-slate-900 text-sm placeholder:text-slate-500 transition-colors font-semibold"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    Contraseña *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      alert('Para recuperar tu contraseña, utiliza las credenciales registradas o contacta al administrador.');
                    }}
                    className="text-xs font-bold text-[#0057d9] hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    id="login-password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:bg-[#d8effe] focus:outline-none text-slate-900 text-sm placeholder:text-slate-500 transition-colors font-semibold tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                id="login-submit-btn"
                className="w-full py-3.5 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] disabled:bg-blue-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Validando credenciales...' : 'Iniciar Sesión e Ingresar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Verified Demo Credentials Box for Evaluation */}
              <div 
                style={{ backgroundColor: '#ffffff' }}
                className="mt-4 p-3.5 rounded-xl border border-sky-300 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span>Credenciales registradas de prueba (Demo)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                    Verificado
                  </span>
                </div>
                
                <div className="text-xs text-slate-600 space-y-0.5 font-mono">
                  <p><strong className="text-slate-800 font-sans">Correo:</strong> {DEMO_CREDENTIALS.email}</p>
                  <p><strong className="text-slate-800 font-sans">Contraseña:</strong> {DEMO_CREDENTIALS.password}</p>
                </div>

                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="w-full py-2 px-3 rounded-lg bg-sky-100 hover:bg-sky-200 text-blue-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Autocompletar credenciales de prueba</span>
                </button>
              </div>

            </form>
          )}

          {/* ========================================================================= */}
          {/* 2. MODO REGISTRARSE                                                       */}
          {/* ========================================================================= */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    id="register-name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Andrés Ramírez"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:bg-[#d8effe] focus:outline-none text-slate-900 text-sm placeholder:text-slate-500 transition-colors font-semibold"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Correo Electrónico *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    id="register-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="andres.ramirez@correo.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:bg-[#d8effe] focus:outline-none text-slate-900 text-sm placeholder:text-slate-500 transition-colors font-semibold"
                  />
                </div>
              </div>

              {/* City & Role */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Medellín"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:bg-[#d8effe] focus:outline-none text-slate-900 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Tipo de Movilidad
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-2 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:bg-[#d8effe] focus:outline-none text-slate-900 text-xs font-semibold"
                  >
                    <option value="Ciclista Urbano">🚲 Ciclista Urbano</option>
                    <option value="Peatón / Caminante">🚶 Peatón</option>
                    <option value="Motociclista">🏍️ Motociclista</option>
                    <option value="Conductor de Automóvil">🚗 Conductor Auto</option>
                    <option value="Pasajero de Transporte Público">🚌 Transporte Público</option>
                    <option value="Scooter / Patineta Eléctrica">🛴 Patineta Eléctrica</option>
                    <option value="Repartidor / Mensajería">📦 Repartidor / Delivery</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Contraseña (mínimo 6 caracteres) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    id="register-password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:bg-[#d8effe] focus:outline-none text-slate-900 text-sm placeholder:text-slate-500 transition-colors font-semibold tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">
                  Confirmar Contraseña *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    id="register-confirm-password-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:bg-[#d8effe] focus:outline-none text-slate-900 text-sm placeholder:text-slate-500 transition-colors font-semibold tracking-wider"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-700 leading-snug font-medium">
                  Acepto los términos de servicio, política de privacidad y compromiso de movilidad segura de VIANOVA.
                </span>
              </label>

              {/* Submit Register */}
              <button
                type="submit"
                disabled={isSubmitting}
                id="register-submit-btn"
                className="w-full py-3.5 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] disabled:bg-blue-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Registrando cuenta...' : 'Completar Registro e Ingresar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Bottom Switcher Note */}
          <div className="text-center pt-2 border-t border-sky-300">
            <p className="text-xs text-slate-700 font-medium">
              {mode === 'login' ? '¿Aún no tienes una cuenta registrada?' : '¿Ya tienes una cuenta en VIANOVA?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className="font-bold text-[#0057d9] hover:underline ml-1 cursor-pointer"
              >
                {mode === 'login' ? 'Crear cuenta aquí' : 'Iniciar sesión aquí'}
              </button>
            </p>
          </div>

          {/* Platform Footer Note */}
          <div className="pt-1 text-center">
            <p className="text-[11px] text-slate-600 font-medium">
              VIANOVA • Plataforma Inteligente de Movilidad Urbana Segura y Sostenible
            </p>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* GOOGLE ACCOUNT SELECTION MODAL                                            */}
      {/* ========================================================================= */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div 
            style={{ backgroundColor: '#ffffff', color: '#1e293b' }}
            className="rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden relative p-6 sm:p-7 space-y-5 animate-scale-in"
          >
            
            {/* Close button */}
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Google Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center mx-auto">
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-slate-900">
                Iniciar sesión con Google
              </h2>
              <p className="text-xs text-slate-500">
                Selecciona una cuenta para continuar en <strong className="text-blue-600">VIANOVA</strong>
              </p>
            </div>

            {/* Account List */}
            <div className="space-y-2 divide-y divide-slate-100">
              {sampleGoogleAccounts.map((acc, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => executeGoogleLogin(acc)}
                  className="w-full pt-2 pb-2 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={acc.avatar} 
                      alt={acc.name} 
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 group-hover:ring-2 group-hover:ring-blue-500 transition-all"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{acc.name}</p>
                      <p className="text-xs text-slate-500">{acc.email}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}

              {/* Option to use custom Google account */}
              {!isCustomGoogle ? (
                <button
                  type="button"
                  onClick={() => setIsCustomGoogle(true)}
                  className="w-full pt-3 pb-1 px-3 flex items-center gap-3 text-left hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-blue-600 hover:underline">
                    Usar otra cuenta de Google
                  </span>
                </button>
              ) : (
                <div className="pt-3 space-y-2">
                  <p className="text-xs font-bold text-slate-700">Ingresa tus datos de Google:</p>
                  <input
                    type="text"
                    placeholder="Tu Nombre en Google"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
                  />
                  <input
                    type="email"
                    placeholder="tu.cuenta@gmail.com"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
                  />
                  <button
                    type="button"
                    disabled={!customGoogleEmail.includes('@')}
                    onClick={() => {
                      executeGoogleLogin({
                        name: customGoogleName.trim() || customGoogleEmail.split('@')[0],
                        email: customGoogleEmail.trim().toLowerCase(),
                      });
                    }}
                    className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Continuar con esta cuenta
                  </button>
                </div>
              )}
            </div>

            {/* Google privacy footer */}
            <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100">
              Para continuar, Google compartirá tu nombre, dirección de correo electrónico y foto de perfil con VIANOVA.
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
