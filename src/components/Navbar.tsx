import React, { useState } from 'react';
import { NavigationTab, UserProfile } from '../types';
import { 
  User as UserIcon,
  LogIn,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Calendar,
  Bike,
  ShieldCheck,
  Award,
  Leaf,
  Route,
  BookOpen,
  Edit3,
  LogOut,
  Mail,
  UserCheck,
  ExternalLink
} from 'lucide-react';
import { Logo } from './Logo';
import { UserProfileDropdown } from './UserProfileDropdown';

interface NavbarProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  user: UserProfile | null;
  isAuthenticated: boolean;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  isAuthenticated,
  onOpenAuthModal,
  onLogout,
  onUpdateUser,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileProfileExpanded, setIsMobileProfileExpanded] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'rutas', label: 'Rutas' },
    { id: 'seguridad', label: 'Seguridad vial' },
    { id: 'educacion', label: 'Educación' },
    { id: 'campanas', label: 'Campañas' },
    { id: 'nosotros', label: 'Nosotros' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 shadow-sm">
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
                  className={`relative py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-[#0057d9]'
                      : 'text-slate-700 hover:text-[#0057d9]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0057d9] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action / Profile Button with Unfolded Full User Info Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <UserProfileDropdown
                user={user}
                onUpdateUser={onUpdateUser}
                onLogout={onLogout}
                setCurrentTab={setCurrentTab}
                currentTab={currentTab}
              />
            ) : (
              <button
                id="nav-login-btn"
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0057d9] text-white font-bold text-sm hover:bg-[#0047b3] transition-all duration-200 shadow-md shadow-blue-500/20 hover:scale-[1.02]"
              >
                <LogIn className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
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
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg max-h-[85vh] overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-[#0057d9]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                {/* Mobile Button containing User Name: clicking expands all info */}
                <button
                  type="button"
                  onClick={() => setIsMobileProfileExpanded(!isMobileProfileExpanded)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#e0eaff] hover:bg-[#d0e0fc] text-[#003d99] font-bold text-sm transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full object-cover border border-white shrink-0" 
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#0057d9] text-white flex items-center justify-center text-xs font-black shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="text-left min-w-0">
                      <p className="truncate text-xs font-black text-[#0a193b]">{user.name || 'Usuario VIANOVA'}</p>
                      <p className="text-[10px] text-blue-700 font-medium truncate">{user.role || 'Ciudadano'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[11px] font-semibold text-blue-700">
                      {isMobileProfileExpanded ? 'Ocultar' : 'Ver datos'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileProfileExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Mobile Expanded Information */}
                {isMobileProfileExpanded && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 animate-fade-in text-xs text-slate-700">
                    {/* Identity Details */}
                    <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-600 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{user.email || 'No registrado'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{user.city || 'No especificada'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Miembro desde {user.memberSince || 'Septiembre 2026'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#0057d9] font-bold">
                        <Bike className="w-3.5 h-3.5 shrink-0" />
                        <span>{(user.kmTraveled ?? 0).toLocaleString()} km recorridos</span>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>Avance y Seguridad</span>
                        <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-[10px]">
                          Score: {user.safetyScore ?? 0}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 text-[11px]">
                        <span>Rutas completadas:</span>
                        <strong className="text-slate-900">{user.monthlyStats?.routesCompleted ?? 0} / {user.monthlyStats?.totalRoutesGoal ?? 20}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 text-[11px]">
                        <span>Módulos de educación:</span>
                        <strong className="text-slate-900">{user.monthlyStats?.educationalModules ?? 0} / {user.monthlyStats?.totalModulesGoal ?? 10}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 text-[11px]">
                        <span>CO₂ Ahorrado:</span>
                        <strong className="text-emerald-700">{user.monthlyStats?.co2SavedKg ?? 0} kg</strong>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="bg-white p-3 rounded-xl border border-slate-100">
                      <p className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        Insignias ({user.badges?.length || 0})
                      </p>
                      {(!user.badges || user.badges.length === 0) ? (
                        <p className="text-[11px] text-slate-400">Sin insignias aún. Completa trayectos para ganarlas.</p>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {user.badges.map(b => (
                            <span key={b.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                              <ShieldCheck className="w-3 h-3" /> {b.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex flex-col gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('perfil');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ver Pantalla Completa de Perfil</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full py-2.5 px-3 rounded-xl text-rose-600 bg-rose-50 font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0057d9] text-white font-bold text-sm shadow-md"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

