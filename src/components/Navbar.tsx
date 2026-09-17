import React from 'react';
import { NavigationTab, UserProfile } from '../types';
import { 
  User as UserIcon,
  LogIn,
  Menu,
  X
} from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  user: UserProfile | null;
  isAuthenticated: boolean;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  isAuthenticated,
  onOpenAuthModal,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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

          {/* Right Action / Profile Button matching 99737.png */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                id="nav-profile-btn"
                onClick={() => setCurrentTab('perfil')}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                  currentTab === 'perfil'
                    ? 'bg-[#0057d9] text-white shadow-md shadow-blue-500/25'
                    : 'bg-[#e0eaff] hover:bg-[#d0e0fc] text-[#003d99]'
                }`}
              >
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-6 h-6 rounded-full object-cover border border-white/80 shrink-0" 
                  />
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
                <span className="truncate max-w-[120px]">{user?.name ? user.name.split(' ')[0] : 'Perfil'}</span>
              </button>
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
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg">
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
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setCurrentTab('perfil');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2.5 p-3 rounded-xl bg-[#e0eaff] text-[#003d99] font-bold text-sm"
              >
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-6 h-6 rounded-full object-cover border border-white shrink-0" 
                  />
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
                <span>Mi Perfil ({user?.name || 'Usuario'})</span>
              </button>
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
