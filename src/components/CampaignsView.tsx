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
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-blue-950 text-xs sm:text-sm font-extrabold shadow-xs">
          <Megaphone className="w-4 h-4 text-blue-700" />
          <span>Conciencia Colectiva Urbana</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 font-display tracking-tight">
          Campañas de seguridad vial
        </h1>
        <p className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed">
          Iniciativas digitales para promover una movilidad más segura, consciente y conectada. Descubre nuestras últimas campañas e intégrate al movimiento por calles más inteligentes.
        </p>
      </div>

      {/* Grid of 6 Campaigns (Page 14 & 15) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            id={`campaign-card-${camp.id}`}
            className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-md hover:shadow-xl hover:border-blue-500 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={camp.image}
                  alt={camp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/10" />

                {/* Target Category Pill */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider text-cyan-300 shadow-md">
                  {camp.targetCategory}
                </div>

                <div className="absolute bottom-3 left-3 text-sm font-bold text-white drop-shadow-md">
                  {camp.subtitle}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3.5">
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display group-hover:text-blue-700 transition">
                  {camp.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-slate-900 leading-relaxed font-normal">
                  {camp.description}
                </p>

                <div className="pt-2 text-xs sm:text-sm font-bold text-emerald-950 bg-emerald-100/80 border border-emerald-200 p-3 rounded-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{camp.stats}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions: "Ver campaña" & Share Button (Page 14 & 15) */}
            <div className="p-6 pt-0 flex items-center gap-2.5">
              <button
                id={`btn-view-campaign-${camp.id}`}
                onClick={() => setSelectedCampaign(camp)}
                className="flex-1 py-3.5 px-4 bg-slate-950 hover:bg-blue-600 text-white rounded-xl text-sm font-black shadow-md flex items-center justify-center gap-2 transition duration-150"
              >
                <span>Ver campaña</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id={`btn-share-campaign-${camp.id}`}
                onClick={(e) => handleShare(camp, e)}
                className="p-3.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 hover:text-blue-600 transition relative"
                title="Compartir campaña"
              >
                {copiedId === camp.id ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                {copiedId === camp.id && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-xs font-bold px-2.5 py-1 rounded shadow-md whitespace-nowrap">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs sm:text-sm font-black uppercase text-blue-700 tracking-wider">
                  {selectedCampaign.targetCategory} • {selectedCampaign.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-display mt-1">
                  {selectedCampaign.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="p-2.5 text-slate-600 hover:text-slate-950 rounded-full hover:bg-slate-100 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <img
                src={selectedCampaign.image}
                alt={selectedCampaign.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                Objetivo de la Iniciativa
              </h4>
              <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-normal">
                {selectedCampaign.fullContent}
              </p>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                Recomendaciones Ciudadanas de Seguridad
              </h4>
              <ul className="space-y-2.5">
                {selectedCampaign.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-900 p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-sm sm:text-base text-blue-950 font-bold flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
              <span><strong>Métrica de impacto:</strong> {selectedCampaign.stats}</span>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                Cerrar
              </button>
              <button
                onClick={(e) => handleShare(selectedCampaign, e)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black shadow-md flex items-center gap-2"
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
