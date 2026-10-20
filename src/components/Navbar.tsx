import React, { useState } from 'react';
import { NavigationTab, UserProfile } from '../types';
import { 
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Edit3,
  LogOut,
  Trash2,
  AlertTriangle,
  Sun,
  Moon
} from 'lucide-react';
import { Logo } from './Logo';
import { UserProfileDropdown } from './UserProfileDropdown';

interface NavbarProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  user: UserProfile | null;
  isAuthenticated?: boolean;
  onOpenAuthModal?: () => void;
  onLogout: () => void;
  onUpdateUser?: (updated: UserProfile) => void;
  onDeleteAccount?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  isAuthenticated,
  onOpenAuthModal,
  onLogout,
  onUpdateUser,
  onDeleteAccount,
  theme = 'light',
  onToggleTheme,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileProfileExpanded, setIsMobileProfileExpanded] = useState(false);
  const [isMobileDeleteConfirmOpen, setIsMobileDeleteConfirmOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'rutas', label: 'Rutas' },
    { id: 'seguridad', label: 'Seguridad vial' },
    { id: 'educacion', label: 'Educación' },
    { id: 'campanas', label: 'Campañas' },
    { id: 'nosotros', label: 'Nosotros' },
  ];

  return (
    <header className={`sticky top-2 sm:top-3 z-40 w-[96%] max-w-7xl mx-auto rounded-2xl sm:rounded-3xl backdrop-blur-xl border transition-all duration-300 mb-3 ${
      theme === 'dark'
        ? 'bg-[#0d1733]/95 border-slate-700/80 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.7)] text-slate-100 hover:shadow-[0_16px_44px_-4px_rgba(0,0,0,0.9)]'
        : 'bg-[#caeafc]/95 border-sky-300 shadow-[0_12px_36px_-6px_rgba(0,87,217,0.2)] text-slate-900 hover:shadow-[0_16px_44px_-4px_rgba(0,87,217,0.28)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Official ViaNova Emblem */}
          <button
            onClick={() => setCurrentTab('inicio')}
            className="flex items-center gap-2.5 group focus:outline-none text-left"
            id="nav-brand-btn"
          >
            <Logo size="md" showText={true} />
          </button>

          {/* Desktop Navigation Links matching 99737.png */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative py-2 text-[15px] sm:text-base font-semibold transition-all duration-200 ${
                    isActive
                      ? theme === 'dark' ? 'text-sky-400 font-bold' : 'text-[#0057d9]'
                      : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-[#0057d9]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                      theme === 'dark' ? 'bg-sky-400' : 'bg-[#0057d9]'
                    }`}></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action / Profile Button with Unfolded Full User Info Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button: Modo Claro / Modo Oscuro */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                id="theme-toggle-btn"
                title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 border-slate-700 text-amber-300 hover:bg-slate-700 shadow-sm'
                    : 'bg-white/80 border-sky-300 text-slate-800 hover:bg-white shadow-xs'
                }`}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-amber-200">Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-slate-700">Modo Oscuro</span>
                  </>
                )}
              </button>
            )}

            {user ? (
              <UserProfileDropdown
                user={user}
                onUpdateUser={onUpdateUser}
                onLogout={onLogout}
                onDeleteAccount={onDeleteAccount}
                setCurrentTab={setCurrentTab}
                currentTab={currentTab}
              />
            ) : (
              <button
                id="nav-profile-btn"
                onClick={() => setCurrentTab('perfil')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0057d9] text-white font-bold text-sm hover:bg-[#0047b3] transition-all duration-200 shadow-md shadow-blue-500/20 hover:scale-[1.02]"
              >
                <UserIcon className="w-4 h-4" />
                <span>Mi Perfil VIANOVA</span>
              </button>
            )}
          </div>

          {/* Mobile Actions: Theme Toggle + Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-amber-300'
                    : 'bg-white border-sky-300 text-slate-700'
                }`}
                title={theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl transition-colors ${
                theme === 'dark' ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              id="mobile-menu-toggle"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-3 pb-6 space-y-2 shadow-lg max-h-[85vh] overflow-y-auto ${
          theme === 'dark'
            ? 'bg-[#0a1228] border-slate-800 text-slate-100'
            : 'bg-[#b9e3fc] border-sky-300 text-slate-800'
        }`}>
          {/* Mobile Theme Toggle Banner */}
          {onToggleTheme && (
            <div className="pb-2">
              <button
                type="button"
                onClick={onToggleTheme}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-amber-300'
                    : 'bg-white border-sky-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
                  <span className="text-sm font-bold">
                    {theme === 'dark' ? 'Modo Oscuro Activo' : 'Modo Claro Activo'}
                  </span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
                  theme === 'dark' ? 'bg-amber-400/20 text-amber-300' : 'bg-blue-100 text-blue-800'
                }`}>
                  {theme === 'dark' ? 'Cambiar a Claro ☀️' : 'Cambiar a Oscuro 🌙'}
                </span>
              </button>
            </div>
          )}

          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-blue-950/70 text-sky-400 border border-blue-800'
                      : 'bg-blue-100 text-[#0057d9] border border-sky-300'
                    : theme === 'dark'
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-700 hover:bg-[#a8d8fc]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 space-y-3">
            {/* Theme Toggle Button Mobile */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border font-bold text-sm transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-amber-300'
                    : 'bg-white border-sky-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
                  <span>{theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${
                  theme === 'dark' ? 'bg-amber-400/20 text-amber-200' : 'bg-indigo-50 text-indigo-700'
                }`}>
                  {theme === 'dark' ? 'Oscuro activo' : 'Claro activo'}
                </span>
              </button>
            )}

            {user ? (
              <div className="space-y-2">
                {/* Mobile Button containing User Name */}
                <button
                  type="button"
                  onClick={() => setIsMobileProfileExpanded(!isMobileProfileExpanded)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#e0eaff] hover:bg-[#d0e0fc] text-[#003d99] font-bold text-base transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-9 h-9 rounded-full object-cover border border-white shrink-0" 
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#0057d9] text-white flex items-center justify-center text-sm font-black shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="text-left min-w-0">
                      <p className="truncate text-sm font-black text-[#0a193b]">{user.name || 'Usuario VIANOVA'}</p>
                      <p className="text-xs text-blue-700 font-medium truncate">{user.role || 'Ciudadano'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs font-semibold text-blue-700">
                      {isMobileProfileExpanded ? 'Ocultar' : 'Opciones'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileProfileExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Mobile Expanded 4 Options */}
                {isMobileProfileExpanded && (
                  <div className="p-2 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 animate-fade-in text-sm">
                    {/* 1. Ver la cuenta */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTab('perfil');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0057d9] flex items-center justify-center shrink-0">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-800 leading-tight">Ver la cuenta</p>
                        <p className="text-xs text-slate-500 font-normal">Detalles, estadísticas e insignias</p>
                      </div>
                    </button>

                    {/* 2. Editar perfil */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTab('perfil');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Edit3 className="w-4 h-4" />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-800 leading-tight">Editar perfil</p>
                        <p className="text-xs text-slate-500 font-normal">Modificar nombre, rol, ciudad y foto</p>
                      </div>
                    </button>

                    {/* 3. Cerrar sesión / Reiniciar */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                        <LogOut className="w-4 h-4" />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800 leading-tight">Restablecer datos</p>
                        <p className="text-[10px] text-slate-500 font-normal">Reiniciar sesión ciudadana</p>
                      </div>
                    </button>

                    {/* 4. Eliminar cuenta */}
                    <button
                      type="button"
                      onClick={() => setIsMobileDeleteConfirmOpen(true)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-rose-50/60 hover:bg-rose-100/70 text-rose-700 font-bold transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className="text-xs font-bold text-rose-600 leading-tight">Eliminar cuenta</p>
                        <p className="text-[10px] text-rose-500/80 font-normal">Borrar datos de usuario e historial</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setCurrentTab('perfil');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0057d9] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                <span>Mi Perfil VIANOVA</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal: Confirmación Eliminar Cuenta (Mobile) */}
      {isMobileDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0a193b]">¿Eliminar cuenta definitivamente?</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Esta acción eliminará de forma irreversible tu cuenta de usuario, rutas e insignias en VIANOVA.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsMobileDeleteConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileDeleteConfirmOpen(false);
                  setIsMobileMenuOpen(false);
                  if (onDeleteAccount) {
                    onDeleteAccount();
                  } else {
                    onLogout();
                  }
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm inline-flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

