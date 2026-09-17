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
      
      {/* Header (PDF Page 14) */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          <Megaphone className="w-3.5 h-3.5" />
          Concientización y Acción Ciudadana
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Campañas de seguridad vial
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Iniciativas digitales para promover una movilidad más segura, consciente y conectada. Descubre nuestras últimas campañas e intégrate al movimiento por calles más inteligentes.
        </p>
      </div>

      {/* 6 Grid Cards (Exact from PDF Pages 14 & 15) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => {
          const Icon = getCampaignIcon(camp.targetType);
          const isCopied = copiedId === camp.id;

          return (
            <div
              key={camp.id}
              className="group rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/40"
            >
              <div>
                {/* Image & Category Tag */}
                <div className="h-44 w-full relative overflow-hidden">
                  <img
                    src={camp.image}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-bold text-cyan-300">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{camp.targetCategory}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {camp.title}
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">{camp.subtitle}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {camp.description}
                  </p>
                </div>
              </div>

              {/* Actions: Ver Campaña + Compartir */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setSelectedCampaign(camp)}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver campaña</span>
                </button>

                <button
                  onClick={() => handleShare(camp)}
                  title="Compartir campaña"
                  className={`p-3 rounded-xl border transition-colors ${
                    isCopied
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/20 p-6 sm:p-8 text-white shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  Campaña • {selectedCampaign.targetCategory}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{selectedCampaign.title}</h3>
                <p className="text-xs text-slate-400">{selectedCampaign.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-52 w-full rounded-2xl overflow-hidden border border-white/10">
              <img
                src={selectedCampaign.image}
                alt={selectedCampaign.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Propósito de la Iniciativa</h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedCampaign.fullContent}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs font-semibold flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
              <span><strong>Impacto Medido:</strong> {selectedCampaign.stats}</span>
            </div>

            {/* Casilla: Recomendaciones Clave con Logos Oficiales */}
            <div className="space-y-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  Recomendaciones Clave
                </h4>
                <span className="text-[10px] text-cyan-400/80 font-bold">Logos oficiales</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {getCampaignRecommendations(selectedCampaign.id).map((rec: KeyRecommendation, i: number) => (
                  <div
                    key={rec.id || i}
                    className="p-3 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row gap-3 items-start hover:border-cyan-500/40 transition-all"
                  >
                    {/* Logo oficial de la recomendación */}
                    <RecommendationLogo
                      recommendation={rec}
                      size="lg"
                      index={i}
                      isDark={true}
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <h5 className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {rec.title}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pl-6">
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
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
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
