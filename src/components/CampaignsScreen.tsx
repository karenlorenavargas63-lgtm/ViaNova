import React, { useState } from 'react';
import { SafetyCampaign } from '../types';
import { mockCampaigns } from '../data/mockData';
import { getCampaignRecommendations, KeyRecommendation } from '../data/safetyRecommendations';
import { RecommendationLogo } from './RecommendationLogo';
import { 
  Megaphone, 
  Share2, 
  Eye, 
  CheckCircle2, 
  Footprints, 
  Bike, 
  Car, 
  GraduationCap, 
  Moon, 
  Cpu, 
  X, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CampaignsScreen: React.FC = () => {
  const [campaigns] = useState<SafetyCampaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<SafetyCampaign | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = (campaign: SafetyCampaign) => {
    navigator.clipboard?.writeText?.(
      `Conoce la campaña de seguridad vial "${campaign.title}" en la plataforma VIANOVA: ${window.location.href}`
    );
    setCopiedId(campaign.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getCampaignIcon = (type: string) => {
    switch (type) {
      case 'peatones':
        return Footprints;
      case 'micromovilidad':
        return Bike;
      case 'conductores':
        return Car;
      case 'escolar':
        return GraduationCap;
      case 'nocturno':
        return Moon;
      default:
        return Cpu;
    }
  };

  return (
    <div className="space-y-12 py-4 pb-20 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-950 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xs">
          <Megaphone className="w-4 h-4 text-cyan-700" />
          Concientización y Acción Ciudadana
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight">
          Campañas de seguridad vial
        </h1>
        <p className="text-slate-900 text-base sm:text-lg leading-relaxed font-medium">
          Iniciativas digitales para promover una movilidad más segura, consciente y conectada. Descubre nuestras últimas campañas e intégrate al movimiento por calles más inteligentes.
        </p>
      </div>

      {/* 6 Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {campaigns.map((camp) => {
          const Icon = getCampaignIcon(camp.targetType);
          const isCopied = copiedId === camp.id;

          return (
            <div
              key={camp.id}
              className="group rounded-3xl bg-white border-2 border-slate-200/90 shadow-lg shadow-slate-200/60 overflow-hidden flex flex-col justify-between hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                {/* Image & Category Tag */}
                <div className="h-48 w-full relative overflow-hidden">
                  <img
                    src={camp.image}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-xs font-black text-cyan-300 shadow-md">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{camp.targetCategory}</span>
                  </div>
                </div>

                {/* Card Content: Text is much blacker and larger */}
                <div className="p-6 space-y-3.5">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 group-hover:text-cyan-700 transition-colors tracking-tight leading-snug">
                      {camp.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-800 font-bold mt-1">
                      {camp.subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-[15px] text-slate-900 leading-relaxed font-normal">
                    {camp.description}
                  </p>
                </div>
              </div>

              {/* Actions: Ver Campaña + Compartir */}
              <div className="p-6 pt-0 flex items-center gap-2.5">
                <button
                  onClick={() => setSelectedCampaign(camp)}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-black transition-all shadow-md flex items-center justify-center gap-2 hover:shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver campaña</span>
                </button>

                <button
                  onClick={() => handleShare(camp)}
                  title="Compartir campaña"
                  className={`p-3.5 rounded-xl border transition-colors shadow-xs ${
                    isCopied
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 hover:text-slate-950'
                  }`}
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border-2 border-slate-200 p-6 sm:p-8 text-slate-950 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs sm:text-sm text-cyan-700 font-black uppercase tracking-wider">
                  Campaña • {selectedCampaign.targetCategory}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight mt-0.5">
                  {selectedCampaign.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-800 font-bold mt-0.5">
                  {selectedCampaign.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-56 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <img
                src={selectedCampaign.image}
                alt={selectedCampaign.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                Propósito de la Iniciativa
              </h4>
              <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-normal">
                {selectedCampaign.fullContent}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-950 text-sm sm:text-base font-bold flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-cyan-700 shrink-0" />
              <span><strong>Impacto Medido:</strong> {selectedCampaign.stats}</span>
            </div>

            {/* Casilla: Recomendaciones Clave con Logos Oficiales */}
            <div className="space-y-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-cyan-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse"></span>
                  Recomendaciones Clave
                </h4>
                <span className="text-xs text-cyan-800 font-bold">Logos oficiales</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {getCampaignRecommendations(selectedCampaign.id).map((rec: KeyRecommendation, i: number) => (
                  <div
                    key={rec.id || i}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row gap-3 items-start hover:border-cyan-500 transition-all shadow-xs"
                  >
                    {/* Logo oficial de la recomendación */}
                    <RecommendationLogo
                      recommendation={rec}
                      size="lg"
                      index={i}
                      isDark={false}
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <h5 className="text-sm sm:text-base font-black text-slate-950 leading-snug">
                          {rec.title}
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed pl-6">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => handleShare(selectedCampaign)}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir Campaña con Amigos</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
