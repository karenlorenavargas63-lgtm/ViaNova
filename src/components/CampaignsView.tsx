import React from 'react';
import { SafetyCampaign, NavigationTab } from '../types';
import { 
  Share2, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  Megaphone, 
  ArrowRight, 
  Check, 
  Copy,
  Users,
  ShieldCheck
} from 'lucide-react';

interface CampaignsViewProps {
  campaigns: SafetyCampaign[];
  onSelectTab: (tab: NavigationTab) => void;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({
  campaigns,
  onSelectTab
}) => {
  const [selectedCampaign, setSelectedCampaign] = React.useState<SafetyCampaign | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleShare = (campaign: SafetyCampaign, e: React.MouseEvent) => {
    e.stopPropagation();
    setCopiedId(campaign.id);
    navigator.clipboard?.writeText?.(window.location.href);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div id="vianova-campaigns-view" className="space-y-10 pb-16 animate-in fade-in duration-300">
      {/* Header Banner (Page 14) */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
          <Megaphone className="w-3.5 h-3.5 text-blue-600" />
          <span>Conciencia Colectiva Urbana</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
          Campañas de seguridad vial
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Iniciativas digitales para promover una movilidad más segura, consciente y conectada. Descubre nuestras últimas campañas e intégrate al movimiento por calles más inteligentes.
        </p>
      </div>

      {/* Grid of 6 Campaigns (Page 14 & 15) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            id={`campaign-card-${camp.id}`}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={camp.image}
                  alt={camp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10" />

                {/* Target Category Pill */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-800 shadow-md">
                  {camp.targetCategory}
                </div>

                <div className="absolute bottom-3 left-3 text-xs font-semibold text-white">
                  {camp.subtitle}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-black text-slate-900 font-display group-hover:text-blue-600 transition">
                  {camp.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {camp.description}
                </p>

                <div className="pt-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{camp.stats}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions: "Ver campaña" & Share Button (Page 14 & 15) */}
            <div className="p-5 pt-0 flex items-center gap-2">
              <button
                id={`btn-view-campaign-${camp.id}`}
                onClick={() => setSelectedCampaign(camp)}
                className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition duration-150"
              >
                <span>Ver campaña</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id={`btn-share-campaign-${camp.id}`}
                onClick={(e) => handleShare(camp, e)}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition relative"
                title="Compartir campaña"
              >
                {copiedId === camp.id ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                {copiedId === camp.id && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-md whitespace-nowrap">
                    ¡Enlace copiado!
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-blue-600">
                  {selectedCampaign.targetCategory} • {selectedCampaign.subtitle}
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-display mt-0.5">
                  {selectedCampaign.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="relative h-56 rounded-2xl overflow-hidden">
              <img
                src={selectedCampaign.image}
                alt={selectedCampaign.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Objetivo de la Iniciativa
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedCampaign.fullContent}
              </p>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Recomendaciones Ciudadanas de Seguridad
              </h4>
              <ul className="space-y-2">
                {selectedCampaign.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <span><strong>Métrica de impacto:</strong> {selectedCampaign.stats}</span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cerrar
              </button>
              <button
                onClick={(e) => handleShare(selectedCampaign, e)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir con la Comunidad</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
