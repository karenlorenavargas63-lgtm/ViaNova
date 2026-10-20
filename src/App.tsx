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
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#b9e3fc] text-slate-900 font-sans flex flex-col relative overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Soft Ambient Accents */}
      <div className="fixed top-[-10%] left-[-5%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-blue-400/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-indigo-400/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Main Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        isAuthenticated={isAuthenticated}
        onOpenAuthModal={() => setCurrentTab('perfil')}
        onLogout={handleLogout}
        onUpdateUser={handleUpdateUser}
        onDeleteAccount={handleDeleteAccount}
      />

      {/* Primary Dynamic Main Content View */}
      <main className={`flex-1 w-full z-10 relative ${currentTab === 'rutas' || currentTab === 'nosotros' ? 'max-w-full px-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        {currentTab === 'inicio' && (
          <HomeScreen
            setCurrentTab={setCurrentTab}
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
          />
        )}

        {currentTab === 'contacto' && (
          <ContactScreen />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer setCurrentTab={setCurrentTab} />

    </div>
  );
}
