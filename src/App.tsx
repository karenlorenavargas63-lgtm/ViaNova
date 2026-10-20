import React, { useState } from 'react';
import { NavigationTab, UserProfile } from './types';
import { mockUserProfile } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { RoutesScreen } from './components/RoutesScreen';
import { SafetyScreen } from './components/SafetyScreen';
import { EducationScreen } from './components/EducationScreen';
import { CampaignsScreen } from './components/CampaignsScreen';
import { AboutScreen } from './components/AboutScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ContactScreen } from './components/ContactScreen';
import { LoginScreen } from './components/LoginScreen';
import { Footer } from './components/Footer';
import { Sun, Moon } from 'lucide-react';
import {
  getInitialSession,
  saveActiveSession,
  clearActiveSession,
  deleteAccountSession,
  getSavedTab,
  saveCurrentTab
} from './utils/session';

export default function App() {
  const initialSession = getInitialSession();
  const [currentTab, setCurrentTabState] = useState<NavigationTab>(() => getSavedTab() as NavigationTab);
  const [user, setUser] = useState<UserProfile>(initialSession.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialSession.isAuthenticated);

  // App-wide Theme: Modo Claro / Modo Oscuro
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('vianova_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return 'light';
    } catch {
      return 'light';
    }
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('vianova_theme', next);
      } catch {}
      return next;
    });
  };

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setCurrentTab = (tab: NavigationTab) => {
    setCurrentTabState(tab);
    saveCurrentTab(tab);
  };

  const handleLoginSuccess = (loggedUser: UserProfile) => {
    setUser(loggedUser);
    saveActiveSession(loggedUser);
    setIsAuthenticated(true);
    setCurrentTab('inicio');
  };

  const handleLogout = () => {
    clearActiveSession();
    setUser(mockUserProfile);
    setIsAuthenticated(false);
    setCurrentTab('inicio');
  };

  const handleDeleteAccount = () => {
    deleteAccountSession(user?.email);
    setUser(mockUserProfile);
    setIsAuthenticated(false);
    setCurrentTab('inicio');
  };

  const handleUpdateUser = (updated: UserProfile) => {
    setUser(updated);
    saveActiveSession(updated);
  };

  // Direct login with registered email and password (without confusing tabs)
  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLoginSuccess={handleLoginSuccess}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col relative overflow-x-hidden transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-[#070e20] text-slate-100 selection:bg-blue-500 selection:text-white dark'
        : 'bg-[#b9e3fc] text-slate-900 selection:bg-blue-600 selection:text-white'
    }`}>
      
      {/* Ambient Accents */}
      {theme === 'dark' ? (
        <>
          <div className="fixed top-[-10%] left-[-5%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
          <div className="fixed bottom-[-10%] right-[-5%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
        </>
      ) : (
        <>
          <div className="fixed top-[-10%] left-[-5%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-blue-400/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
          <div className="fixed bottom-[-10%] right-[-5%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-indigo-400/5 rounded-full blur-[160px] pointer-events-none z-0"></div>
        </>
      )}

      {/* Main Top Navigation with Modo Claro / Oscuro */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        isAuthenticated={isAuthenticated}
        onOpenAuthModal={() => setCurrentTab('perfil')}
        onLogout={handleLogout}
        onUpdateUser={handleUpdateUser}
        onDeleteAccount={handleDeleteAccount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Primary Dynamic Main Content View */}
      <main className={`flex-1 w-full z-10 relative ${currentTab === 'rutas' || currentTab === 'nosotros' ? 'max-w-full px-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        {currentTab === 'inicio' && (
          <HomeScreen
            setCurrentTab={setCurrentTab}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}

        {currentTab === 'rutas' && (
          <RoutesScreen />
        )}

        {currentTab === 'seguridad' && (
          <SafetyScreen 
            onNavigateToEducation={() => setCurrentTab('educacion')}
          />
        )}

        {currentTab === 'educacion' && (
          <EducationScreen />
        )}

        {currentTab === 'campanas' && (
          <CampaignsScreen onNavigate={setCurrentTab} />
        )}

        {currentTab === 'nosotros' && (
          <AboutScreen
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'perfil' && (
          <ProfileScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onLogout={handleLogout}
            onDeleteAccount={handleDeleteAccount}
            setCurrentTab={setCurrentTab}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}

        {currentTab === 'contacto' && (
          <ContactScreen />
        )}
      </main>

      {/* Floating Quick Switcher: Modo Claro / Modo Oscuro (Always Visible) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={toggleTheme}
          id="floating-theme-toggle-btn"
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-2xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md ${
            theme === 'dark'
              ? 'bg-slate-900/95 border-amber-400 text-amber-300 hover:bg-slate-800 shadow-amber-500/10'
              : 'bg-white/95 border-[#0057d9] text-[#0057d9] hover:bg-slate-50 shadow-blue-500/15'
          }`}
          title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black tracking-wide">☀️ Modo Claro</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-black tracking-wide">🌙 Modo Oscuro</span>
            </>
          )}
        </button>
      </div>

      {/* Persistent Footer */}
      <Footer setCurrentTab={setCurrentTab} />

    </div>
  );
}
