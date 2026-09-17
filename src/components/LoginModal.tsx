import React from 'react';
import { Lock, Mail, KeyRound, Eye, EyeOff, ShieldCheck, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  defaultUser: UserProfile;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  defaultUser
}) => {
  const [mode, setMode] = React.useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = React.useState('elena.rios@smartmobility.org');
  const [password, setPassword] = React.useState('••••••••');
  const [name, setName] = React.useState('Elena Ríos');
  const [showPassword, setShowPassword] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'forgot') {
        setStatusMessage('Te hemos enviado un enlace seguro para restablecer tu contraseña a tu correo electrónico.');
      } else {
        onLoginSuccess({
          ...defaultUser,
          name: mode === 'register' ? name : defaultUser.name,
          email: email || defaultUser.email
        });
        onClose();
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition z-10"
        >
          ✕
        </button>

        {/* Header Visual Banner */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-sky-600 p-6 text-white text-center relative overflow-hidden">
          <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-inner border border-white/20">
            {mode === 'login' && <Lock className="w-7 h-7 text-white" />}
            {mode === 'register' && <UserPlus className="w-7 h-7 text-white" />}
            {mode === 'forgot' && <KeyRound className="w-7 h-7 text-white" />}
          </div>
          <h2 className="text-2xl font-black font-display tracking-tight">
            {mode === 'login' ? 'VIANOVA' : mode === 'register' ? 'Crear Cuenta' : 'Recuperar Contraseña'}
          </h2>
          <p className="text-xs text-blue-100 mt-1 max-w-xs mx-auto">
            {mode === 'login'
              ? 'Bienvenido de nuevo. Ingresa tus credenciales para acceder a la plataforma de movilidad segura.'
              : mode === 'register'
              ? 'Únete a la red inteligente de ciclistas, peatones y conductores seguros.'
              : 'Ingresa tu correo para recibir instrucciones de recuperación.'}
          </p>

          {/* Security badge indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-semibold mt-3 text-white/90">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Acceso Cifrado 256-bit</span>
          </div>
        </div>

        {/* Body Form */}
        <div className="p-6 sm:p-8">
          {statusMessage ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-700 font-medium">{statusMessage}</p>
              <button
                onClick={() => {
                  setStatusMessage(null);
                  setMode('login');
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md transition"
              >
                Volver a Iniciar Sesión
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
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
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Pon tu correo electrónico"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Contraseña
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-xs text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                      >
                        ¿Olvidé mi contraseña?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                id="btn-auth-submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition active:scale-98 disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <span>Verificando...</span>
                ) : (
                  <>
                    <span>
                      {mode === 'login' ? 'Iniciar Sesión' : mode === 'register' ? 'Registrarme' : 'Recuperar Acceso'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Bottom Switch Mode */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            {mode === 'login' ? (
              <p>
                ¿No tienes una cuenta en el sistema?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Crear cuenta
                </button>
              </p>
            ) : (
              <p>
                ¿Ya tienes una cuenta registrada?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Iniciar sesión
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
