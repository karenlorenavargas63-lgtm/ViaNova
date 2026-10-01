import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  validateCredentials, 
  registerNewUser, 
  loginOrRegisterWithGoogle, 
  saveActiveSession
} from '../utils/session';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  AlertCircle,
  User, 
  KeyRound
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
  const [errorMessage, setErrorMessage] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const user = loginOrRegisterWithGoogle({
        name: 'Carlos Mendoza',
        email: 'carlos.mendoza@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
      });
      setIsLoading(false);
      onLoginSuccess(user);
      onClose();
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (isForgotPassword) {
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setIsForgotPassword(false);
      }, 2500);
      return;
    }

    setIsLoading(true);

    if (isRegisterMode) {
      setTimeout(() => {
        const res = registerNewUser(
          {
            name: name.trim(),
            email: email.trim(),
            role: role
          },
          password
        );
        setIsLoading(false);

        if (!res.success) {
          setErrorMessage(res.error || 'Error al registrar usuario.');
          return;
        }

        if (res.user) {
          onLoginSuccess(res.user);
          onClose();
        }
      }, 350);
    } else {
      // Login mode: STRICT VALIDATION
      setTimeout(() => {
        const res = validateCredentials(email, password);
        setIsLoading(false);

        if (!res.success) {
          setErrorMessage(res.error || 'Credenciales inválidas.');
          return;
        }

        if (res.user) {
          saveActiveSession(res.user);
          onLoginSuccess(res.user);
          onClose();
        }
      }, 350);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-white/20 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 text-white">
        
        {/* Left Side: Brand Visual & Security Assurance */}
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
              <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg">
                V
              </div>
              <span className="text-2xl font-bold tracking-tight">VIANOVA</span>
            </div>
            <p className="text-sm text-indigo-200">Plataforma de Movilidad Urbana Inteligente</p>
          </div>

          {/* Transmitir seguridad y confianza */}
          <div className="relative z-10 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Seguridad y Confianza</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Validación segura contra base de datos registrada. Tus credenciales y datos de movilidad están protegidos con cifrado de punto a punto.
            </p>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 flex items-center justify-center text-indigo-400">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">VIANOVA ACCESO</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isForgotPassword ? (
            /* Forgot Password Flow */
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">Recuperar Contraseña</h3>
                <p className="text-sm text-slate-400 mt-1.5">
                  Ingresa tu correo institucional registrado y te enviaremos un enlace de restablecimiento seguro.
                </p>
              </div>

              {resetSent ? (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Enlace de recuperación enviado a tu bandeja de entrada.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-200">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      placeholder="nombre@ciudad.gov.co"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm sm:text-base text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm sm:text-base text-white shadow-lg cursor-pointer"
                  >
                    Enviar Enlace de Recuperación
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="w-full text-center text-sm text-slate-400 hover:text-white cursor-pointer"
                  >
                    ← Volver a Iniciar Sesión
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Login / Register Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {isRegisterMode ? 'Crear Cuenta en VIANOVA' : 'Iniciar Sesión'}
                </h3>
                <p className="text-sm text-slate-400 mt-1.5">
                  {isRegisterMode
                    ? 'Regístrate para acceder a todas las funciones de movilidad inteligente.'
                    : 'Ingresa tus credenciales autorizadas para acceder a la plataforma.'}
                </p>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continuar con Google</span>
              </button>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-slate-700 w-full"></div>
                <span className="bg-slate-900 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  o con correo
                </span>
                <div className="border-t border-slate-700 w-full"></div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {isRegisterMode && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Andrés Ramírez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">Tipo de Movilidad Principal</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Ciclista Urbano" className="bg-slate-900">🚲 Ciclista Urbano</option>
                      <option value="Peatón / Caminante" className="bg-slate-900">🚶 Peatón / Caminante</option>
                      <option value="Motociclista" className="bg-slate-900">🏍️ Motociclista</option>
                      <option value="Conductor de Automóvil" className="bg-slate-900">🚗 Conductor de Automóvil</option>
                      <option value="Transporte Público" className="bg-slate-900">🚌 Pasajero de Transporte Público</option>
                    </select>
                  </div>
                </>
              )}

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Correo Electrónico</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="carlos.mendoza@ciudad.gov.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200">Contraseña</label>
                  {!isRegisterMode && (
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-xs text-indigo-400 hover:underline cursor-pointer"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 tracking-wider"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                id="auth-submit-btn"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-bold text-sm shadow-xl border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <span>{isLoading ? 'Verificando...' : isRegisterMode ? 'Crear Mi Cuenta' : 'Iniciar Sesión'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Switch link */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(!isRegisterMode);
                    setErrorMessage('');
                  }}
                  className="text-xs text-slate-300 hover:text-white cursor-pointer"
                >
                  {isRegisterMode ? (
                    <span>¿Ya tienes una cuenta? <strong className="text-indigo-400 underline">Iniciar sesión</strong></span>
                  ) : (
                    <span>¿No tienes una cuenta registrada? <strong className="text-indigo-400 underline">Crear cuenta</strong></span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Platform Reference */}
          <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 text-center">
            VIANOVA • Movilidad Segura y Sostenible 2026
          </div>
        </div>

      </div>
    </div>
  );
};
