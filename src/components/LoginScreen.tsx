import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound,
  User,
  MapPin,
  Bike,
  UserPlus
} from 'lucide-react';
import { CrashHeroAnimation } from './CrashHeroAnimation';
import { UserProfile } from '../types';
import { Logo } from './Logo';
import { 
  validateCredentials, 
  registerNewUser,
  getRegisteredUsers,
  DEMO_CREDENTIALS
} from '../utils/session';

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  onRegisterSuccess?: (user: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onLoginSuccess 
}) => {
  // Mode: 'login' for registered users, 'register' for first-time users
  const [isFirstTime, setIsFirstTime] = useState<boolean>(false);

  // Login form fields
  const [email, setEmail] = useState<string>(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState<string>(DEMO_CREDENTIALS.password);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // First-time registration form fields
  const [regName, setRegName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');
  const [regRole, setRegRole] = useState<string>('Ciclista Urbano');
  const [regCity, setRegCity] = useState<string>('Medellín');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(true);

  // Status messages
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [unregisteredPrompt, setUnregisteredPrompt] = useState<boolean>(false);

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setUnregisteredPrompt(false);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail) {
      setErrorMessage('Por favor ingresa tu correo electrónico.');
      return;
    }

    if (!cleanPass) {
      setErrorMessage('Por favor ingresa tu contraseña.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Check if user is registered in database
      const registered = getRegisteredUsers();
      const userExists = registered.some((u) => u.email?.trim().toLowerCase() === cleanEmail);

      // If user has not registered yet and is entering for the first time, require registration
      if (!userExists) {
        setIsSubmitting(false);
        setUnregisteredPrompt(true);
        setErrorMessage('Este correo no se encuentra registrado en el sistema. Si vas a ingresar por primera vez, debes realizar tu registro.');
        return;
      }

      // Validate credentials for registered user
      const validation = validateCredentials(cleanEmail, cleanPass);

      if (!validation.success) {
        setIsSubmitting(false);
        setErrorMessage(validation.error || 'Contraseña incorrecta.');
        return;
      }

      setIsSubmitting(false);
      setSuccessMessage('¡Ingreso exitoso! Bienvenido a VIANOVA.');
      setTimeout(() => {
        if (validation.user) {
          onLoginSuccess(validation.user);
        }
      }, 300);
    }, 350);
  };

  // Handle First-time Registration submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanName = regName.trim();
    const cleanEmail = regEmail.trim().toLowerCase();
    const cleanPass = regPassword.trim();
    const cleanConfirm = regConfirmPassword.trim();

    if (!cleanName) {
      setErrorMessage('Por favor ingresa tu nombre completo.');
      return;
    }

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!cleanPass || cleanPass.length < 6) {
      setErrorMessage('La contraseña debe tener mínimo 6 caracteres.');
      return;
    }

    if (cleanPass !== cleanConfirm) {
      setErrorMessage('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }

    if (!acceptTerms) {
      setErrorMessage('Debes aceptar las normas de convivencia vial y términos de uso.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const regResult = registerNewUser(
        {
          name: cleanName,
          email: cleanEmail,
          city: regCity.trim() || 'Medellín',
          role: regRole || 'Ciclista Urbano',
        },
        cleanPass
      );

      if (!regResult.success) {
        setIsSubmitting(false);
        setErrorMessage(regResult.error || 'Error al completar el registro.');
        return;
      }

      setIsSubmitting(false);
      setSuccessMessage('¡Registro completado exitosamente! Ingresando a la plataforma...');
      setTimeout(() => {
        if (regResult.user) {
          onLoginSuccess(regResult.user);
        }
      }, 400);
    }, 400);
  };

  const handleSwitchToRegister = () => {
    setRegEmail(email);
    setErrorMessage('');
    setSuccessMessage('');
    setUnregisteredPrompt(false);
    setIsFirstTime(true);
  };

  const handleSwitchToLogin = () => {
    if (regEmail) {
      setEmail(regEmail);
    }
    setErrorMessage('');
    setSuccessMessage('');
    setUnregisteredPrompt(false);
    setIsFirstTime(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#b9e3fc] flex flex-col lg:flex-row text-slate-800 font-sans">
      
      {/* Left Visual Column: Cinematic Animation & Mobility Intelligence */}
      <div className="relative w-full lg:w-1/2 min-h-[420px] lg:min-h-screen bg-slate-950 overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-800">
        
        {/* Top Header inside Left Visual */}
        <div className="flex items-center justify-between z-10 mb-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-300 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
            <span>VIANOVA • Movilidad Urbana Inteligente</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Seguridad Vial Activa
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
            <span>Rutas Seguras y Conectividad Ciudadana</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Plataforma digital para la prevención de accidentes, monitoreo de cruces peatonales y navegación para ciclistas, peatones y conductores.
          </p>
        </div>
      </div>

      {/* Right Column: Dynamic Form (Login vs First-Time Registration) */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 lg:px-14 py-8 bg-[#b9e3fc]">
        <div className="w-full max-w-md space-y-6">
          
          {/* Top Brand Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Logo size="lg" showSubtitle={true} />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-sky-300 text-blue-900 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{isFirstTime ? 'Nuevo Registro' : 'Acceso Seguro'}</span>
              </div>
            </div>

            <div className="pt-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {isFirstTime ? 'Registro por Primera Vez' : 'Acceso a la Plataforma'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mt-1">
                {isFirstTime
                  ? 'Completa tus datos por primera vez para unirte a la red inteligente de movilidad VIANOVA.'
                  : 'Ingresa con tu correo y contraseña para acceder a la plataforma.'}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs sm:text-sm font-semibold space-y-2 animate-fade-in shadow-xs">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>

              {/* Actionable button if unregistered user needs to register */}
              {unregisteredPrompt && (
                <button
                  type="button"
                  onClick={handleSwitchToRegister}
                  className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Realizar mi registro por primera vez</span>
                </button>
              )}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fade-in shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* VIEW 1: LOGIN FORM (For registered users) */}
          {!isFirstTime ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Email Field */}
              <div className="space-y-1.5">
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
                    id="login-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:bg-[#d8effe] focus:outline-none text-slate-900 text-sm placeholder:text-slate-500 transition-colors font-semibold"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Contraseña *
                </label>
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
                    title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
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
                className="w-full py-3.5 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] disabled:bg-blue-400 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>{isSubmitting ? 'Validando acceso...' : 'Ingresar a VIANOVA'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {/* First Time Link */}
              <div className="pt-3 border-t border-sky-300 text-center space-y-1.5">
                <p className="text-xs text-slate-700">
                  ¿Vas a ingresar por primera vez a la plataforma?
                </p>
                <button
                  type="button"
                  onClick={handleSwitchToRegister}
                  className="text-xs sm:text-sm font-extrabold text-[#0047b3] hover:text-[#002f80] underline cursor-pointer inline-flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Haz tu registro aquí por primera vez</span>
                </button>
              </div>

            </form>
          ) : (
            /* VIEW 2: FIRST-TIME REGISTRATION FORM */
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
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Ej. Karen Lorena Vargas"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:bg-[#d8effe] focus:outline-none text-slate-900 text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Email */}
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
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="karenlorenavargas63@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:bg-[#d8effe] focus:outline-none text-slate-900 text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mínimo 6 carácteres"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:outline-none text-slate-900 text-xs sm:text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Confirmar Contraseña *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repite tu clave"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:outline-none text-slate-900 text-xs sm:text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Role & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Rol en la Vía *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Bike className="w-3.5 h-3.5" />
                    </div>
                    <select
                      value={regRole}
                      onChange={(e) => setRegRole(e.target.value)}
                      className="w-full pl-9 pr-2 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 text-slate-900 text-xs font-bold"
                    >
                      <option value="Ciclista Urbano">Ciclista Urbano</option>
                      <option value="Peatón Consciente">Peatón Consciente</option>
                      <option value="Conductor de Automóvil">Conductor de Automóvil</option>
                      <option value="Motociclista">Motociclista</option>
                      <option value="Usuario de Transporte Masivo">Transporte Masivo</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Ciudad *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      required
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      placeholder="Medellín"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#caeafc] border border-sky-400 focus:border-blue-600 focus:outline-none text-slate-900 text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-blue-600 rounded"
                />
                <span className="text-xs text-slate-700 leading-tight">
                  Acepto las normas de convivencia vial y términos de uso de VIANOVA.
                </span>
              </label>

              {/* Submit Registration */}
              <button
                type="submit"
                disabled={isSubmitting}
                id="register-submit-btn"
                className="w-full py-3.5 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] disabled:bg-blue-400 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isSubmitting ? 'Registrando usuario...' : 'Completar Registro e Ingresar'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {/* Back to Login Link */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleSwitchToLogin}
                  className="text-xs font-bold text-[#0047b3] hover:underline cursor-pointer"
                >
                  ← ¿Ya te has registrado antes? Inicia sesión con tu correo
                </button>
              </div>

            </form>
          )}

          {/* Bottom Security Note */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-slate-600 font-medium">
              Conexión cifrada con protocolo de seguridad vial y protección de datos ciudadana.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
