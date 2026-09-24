import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { 
  X, 
  ExternalLink
} from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  setCurrentTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const [legalModalContent, setLegalModalContent] = useState<{ title: string; content: string } | null>(null);

  const openLegalDoc = (type: 'aviso' | 'privacidad' | 'terminos') => {
    if (type === 'aviso') {
      setLegalModalContent({
        title: 'Aviso Legal',
        content: 'VIANOVA opera bajo normativas de movilidad urbana abierta y fomento a la seguridad vial. Los datos cartográficos e incidencias provienen de sensores IoT de tránsito y reportes verificados de la comunidad ciudadana.'
      });
    } else if (type === 'privacidad') {
      setLegalModalContent({
        title: 'Política de Privacidad',
        content: 'En VIANOVA protegemos la privacidad de nuestros usuarios. La geolocalización solo se procesa localmente en el dispositivo durante sesiones de navegación activa y no se comercializa con terceros.'
      });
    } else {
      setLegalModalContent({
        title: 'Términos y Condiciones',
        content: 'El uso de VIANOVA implica el compromiso con el respeto mutuo en las vías públicas, la veracidad de los reportes viales y la promoción de la movilidad sostenible y la reducción de fatalidades.'
      });
    }
  };

  return (
    <footer className="w-full bg-[#051329] text-slate-300 text-xs mt-auto relative z-30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand & Copyright with Official Logo */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" textColor="light" showSubtitle={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              © 2024 VIANOVA. Innovación en Movilidad Urbana Segura y Sostenible.
            </p>
            <p className="text-[11px] text-blue-400 font-medium">
              Red Inteligente para la Convivencia y Seguridad Vial
            </p>
          </div>

          {/* Col 2: Navigation Links matching 99737.png */}
          <div className="lg:col-span-3 space-y-2.5">
            <p>
              <button
                onClick={() => setCurrentTab('contacto')}
                className="text-slate-300 hover:text-white font-medium transition-colors"
              >
                Contacto
              </button>
            </p>
            <p>
              <button
                onClick={() => openLegalDoc('aviso')}
                className="text-slate-300 hover:text-white font-medium transition-colors"
              >
                Aviso Legal
              </button>
            </p>
            <p>
              <button
                onClick={() => openLegalDoc('privacidad')}
                className="text-slate-300 hover:text-white font-medium transition-colors"
              >
                Privacidad
              </button>
            </p>
          </div>

          {/* Col 3: Terms matching 99737.png */}
          <div className="lg:col-span-4 space-y-2.5">
            <p>
              <button
                onClick={() => openLegalDoc('terminos')}
                className="text-slate-300 hover:text-white font-medium transition-colors"
              >
                Términos y Condiciones
              </button>
            </p>
          </div>

        </div>
      </div>

      {/* Legal Dialog Modal */}
      {legalModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-white">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-white/20 p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold">{legalModalContent.title}</h3>
              <button
                onClick={() => setLegalModalContent(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {legalModalContent.content}
            </p>
            <button
              onClick={() => setLegalModalContent(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </footer>
  );
};
