import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import transitHubImg from '../assets/images/smart_transit_hub_1788276142198.jpg';
import { Logo } from './Logo';

interface LoginScreenProps {
  onLogin: () => void;
  onExploreAsGuest?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onExploreAsGuest }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Por favor ingresa tu correo y contraseña.');
      return;
    }
    setErrorMessage('');
    onLogin();
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row text-slate-800">
      
      {/* Left Visual Column matching image.png */}
      <div className="relative w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-screen bg-slate-900 overflow-hidden flex flex-col justify-end p-6 sm:p-10">
        <img
          src={transitHubImg}
          alt="Centro de Movilidad VIANOVA"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate-950/40"></div>

        {/* Ambient overlay badge */}
        <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 text-white max-w-sm hidden sm:block">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>Red Inteligente Activa</span>
          </div>
          <p className="text-sm font-semibold text-white">
            Monitoreo en tiempo real, seguridad vial y gestión urbana.
          </p>
        </div>
      </div>

      {/* Right Form Column matching image.png */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Logo VIANOVA in Bold Navy with official emblem */}
          <div className="space-y-6">
            <Logo size="lg" showSubtitle={true} />

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {isRegisterMode ? 'Crear cuenta nueva' : 'Bienvenido de nuevo'}
              </h2>
              <p className="text-sm text-slate-500 font-normal leading-relaxed">
                {isRegisterMode
                  ? 'Completa tus datos para unirte a la red de movilidad inteligente.'
                  : 'Ingresa tus credenciales para acceder a la plataforma de movilidad segura.'}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {isRegisterMode && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#f1f3f5] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 text-sm placeholder:text-slate-400 transition-colors"
                />
              </div>
            )}

            {/* Email Field matching image.png */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Pon tu correo electrónico"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#f1f3f5] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 text-sm placeholder:text-slate-400 transition-colors font-medium"
                />
              </div>
            </div>

            {/* Password Field matching image.png */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  Contraseña
                </label>
                {!isRegisterMode && (
                  <button
                    type="button"
                    onClick={() => alert('Se ha enviado un enlace de recuperación a tu correo.')}
                    className="text-xs font-semibold text-[#0057d9] hover:underline"
                  >
                    ¿Olvidé mi contraseña?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Escribe tu contraseña"
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-[#f1f3f5] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 text-sm placeholder:text-slate-400 transition-colors font-medium tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="login-submit-btn"
              className="w-full py-4 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 mt-4"
            >
              <span>{isRegisterMode ? 'Registrarse en VIANOVA' : 'Iniciar Sesión'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch Login / Register link matching image.png */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-600">
              {isRegisterMode ? '¿Ya tienes una cuenta registrada?' : '¿No tienes una cuenta en el sistema?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setErrorMessage('');
                }}
                className="font-bold text-[#0057d9] hover:underline"
              >
                {isRegisterMode ? 'Iniciar sesión' : 'Crear cuenta'}
              </button>
            </p>
          </div>

          {/* Quick Access / Guest Mode */}
          {onExploreAsGuest && (
            <div className="pt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={onExploreAsGuest}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                O continuar como visitante a la plataforma →
              </button>
            </div>
          )}

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
