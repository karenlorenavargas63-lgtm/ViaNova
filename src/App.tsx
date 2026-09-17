import React, { useState } from 'react';
import { NavigationTab, UserProfile, MobilityAlert } from './types';
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
import { RegisterScreen } from './components/RegisterScreen';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('inicio');
  const [user, setUser] = useState<UserProfile>(mockUserProfile);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const handleRegisterSuccess = (newUser: UserProfile) => {
    setUser(newUser);
    setIsAuthenticated(true);
    setCurrentTab('inicio');
  };

  const handleLoginSuccess = (loggedUser: UserProfile) => {
    setUser(loggedUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setCurrentTab('inicio');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentTab('inicio');
  };

  const handleUpdateUser = (updated: UserProfile) => {
    setUser(updated);
  };

  // Require registration / authentication before entering the app
  if (!isAuthenticated) {
    return (
      <RegisterScreen
        onRegisterSuccess={handleRegisterSuccess}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col relative overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Soft Ambient Accents */}
      <div className="fixed top-[-10%] left-[-5%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-blue-400/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-indigo-400/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Main Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        isAuthenticated={isAuthenticated}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
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
          <SafetyScreen />
        )}

        {currentTab === 'educacion' && (
          <EducationScreen />
        )}

        {currentTab === 'campanas' && (
          <CampaignsScreen />
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
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'contacto' && (
          <ContactScreen />
        )}
      </main>

      {/* Auth / Login / Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Persistent Footer */}
      <Footer setCurrentTab={setCurrentTab} />

    </div>
  );
}
