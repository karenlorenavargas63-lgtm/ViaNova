import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { 
  Cpu, 
  Bus, 
  Bike, 
  PersonStanding, 
  Car, 
  Building2, 
  X, 
  CheckCircle2, 
  Target
} from 'lucide-react';
import { AnimatedUrbanMobility } from './AnimatedUrbanMobility';

interface AboutScreenProps {
  setCurrentTab: (tab: NavigationTab) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ setCurrentTab }) => {
  const [isVisionModalOpen, setIsVisionModalOpen] = useState(false);

  return (
    <div id="vianova-about-page" className="w-full font-sans text-slate-800">
      
      {/* 1. Hero Section: Conoce VIANOVA */}
      <section className="w-full bg-[#b9e3fc] py-12 sm:py-16 md:py-20 border-b border-sky-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0a193b] tracking-tight leading-tight">
                Conoce VIANOVA
              </h1>

              <p className="text-slate-700 text-base sm:text-[1.05rem] leading-relaxed max-w-xl">
                Transformamos la movilidad urbana combinando infraestructura tecnológica de vanguardia con plataformas digitales accesibles. Nuestro objetivo es crear ciudades más seguras, eficientes y conectadas.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="btn-about-vision"
                  onClick={() => setIsVisionModalOpen(true)}
                  className="px-8 py-3.5 rounded-xl bg-[#0055d4] hover:bg-[#0046b8] text-white font-semibold text-sm transition-all duration-200 shadow-sm"
                >
                  Nuestra Visión
                </button>

                <button
                  id="btn-about-contact"
                  onClick={() => setCurrentTab('contacto')}
                  className="px-8 py-3.5 rounded-xl bg-[#caeafc] hover:bg-[#a8d8fc] text-[#0055d4] border border-[#0055d4] font-semibold text-sm transition-all duration-200 shadow-xs"
                >
                  Contacto
                </button>
              </div>
            </div>

            {/* Right: Modern Smart City Urban Mobility Visual */}
            <div className="lg:col-span-6">
              <AnimatedUrbanMobility />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Nuestros Pilares Section */}
      <section className="w-full bg-[#a8d8fc] py-16 sm:py-20 border-b border-sky-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a193b] tracking-tight">
              Nuestros Pilares
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Abordamos la movilidad desde un enfoque integral, asegurando que la tecnología sirva a las personas y a la ciudad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-14">
            
            {/* Pilar 1: Tecnología */}
            <div className="bg-[#caeafc] border border-sky-300 rounded-3xl p-8 sm:p-9 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-[#0a193b] flex items-center justify-center text-white mb-6 shrink-0 shadow-sm">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a193b] mb-3">
                Tecnología
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Implementamos sensores inteligentes y análisis de datos en tiempo real para optimizar los flujos de tráfico y reducir emisiones. Nuestra plataforma se integra con la infraestructura existente para una gestión urbana proactiva.
              </p>
            </div>

            {/* Pilar 2: Movilidad */}
            <div className="bg-[#caeafc] border border-sky-300 rounded-3xl p-8 sm:p-9 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-[#0055d4] flex items-center justify-center text-white mb-6 shrink-0 shadow-sm">
                <Bus className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a193b] mb-3">
                Movilidad
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Diseñamos rutas eficientes y promovemos alternativas de transporte sostenible. Fomentamos la intermodalidad para que los ciudadanos puedan moverse de forma fluida y segura.
              </p>
            </div>

            {/* Pilar 3: Educación */}
            <div className="bg-[#caeafc] border border-sky-300 rounded-3xl p-8 sm:p-9 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col">
              <h3 className="text-xl font-bold text-[#0a193b] mb-3 pt-1">
                Educación
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Creemos en la formación cívica como pilar de la seguridad vial. Desarrollamos campañas y módulos educativos interactivos para concientizar a peatones, ciclistas y conductores.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Dirigido a Section */}
      <section className="w-full bg-[#b9e3fc] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a193b] tracking-tight">
              Dirigido a
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Soluciones diseñadas para todos los actores del ecosistema urbano.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-14">
            
            {/* Ciclistas */}
            <div className="bg-[#caeafc] hover:bg-[#a8d8fc] border border-sky-300 rounded-2xl py-8 px-4 flex flex-col items-center justify-center text-center transition-colors duration-200">
              <Bike className="w-9 h-9 text-[#0055d4] mb-3" strokeWidth={2.2} />
              <span className="font-bold text-sm text-[#0a193b]">
                Ciclistas
              </span>
            </div>

            {/* Peatones */}
            <div className="bg-[#caeafc] hover:bg-[#a8d8fc] border border-sky-300 rounded-2xl py-8 px-4 flex flex-col items-center justify-center text-center transition-colors duration-200">
              <PersonStanding className="w-9 h-9 text-[#0055d4] mb-3" strokeWidth={2.2} />
              <span className="font-bold text-sm text-[#0a193b]">
                Peatones
              </span>
            </div>

            {/* Conductores */}
            <div className="bg-[#caeafc] hover:bg-[#a8d8fc] border border-sky-300 rounded-2xl py-8 px-4 flex flex-col items-center justify-center text-center transition-colors duration-200">
              <Car className="w-9 h-9 text-[#0055d4] mb-3" strokeWidth={2.2} />
              <span className="font-bold text-sm text-[#0a193b]">
                Conductores
              </span>
            </div>

            {/* Ayuntamientos */}
            <div className="bg-[#caeafc] hover:bg-[#a8d8fc] border border-sky-300 rounded-2xl py-8 px-4 flex flex-col items-center justify-center text-center transition-colors duration-200">
              <Building2 className="w-9 h-9 text-[#0055d4] mb-3" strokeWidth={2.2} />
              <span className="font-bold text-sm text-[#0a193b]">
                Ayuntamientos
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Vision Modal */}
      {isVisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#caeafc] border border-sky-300 p-6 sm:p-8 text-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0055d4]">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0a193b]">Nuestra Visión 2030</h3>
                  <p className="text-xs text-slate-500">Objetivos y Proyección de VIANOVA</p>
                </div>
              </div>
              <button
                onClick={() => setIsVisionModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              VIANOVA aspira a liderar la transformación hacia ciudades con cero siniestros viales evitables, interconectando infraestructura física, datos en tiempo real y cultura ciudadana para una convivencia pacífica y armónica.
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0055d4]">Compromisos Fundamentales</h4>
              <div className="space-y-2.5">
                {[
                  'Despliegue de sensores de flujo y priorización de semáforos para ciclovías y peatones.',
                  'Educación vial interactiva accesible para todas las edades.',
                  'Herramientas predictivas para evitar congestiones y mitigar la huella de carbono urbana.',
                  'Colaboración estrecha con entidades y ayuntamientos para una planeación territorial basada en datos.'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsVisionModalOpen(false)}
              className="w-full py-3 rounded-xl bg-[#0055d4] hover:bg-[#0046b8] font-bold text-sm text-white transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
