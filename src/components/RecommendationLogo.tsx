import React from 'react';
import {
  OctagonAlert,
  AlertTriangle,
  Info,
  Layers,
  Gauge,
  RotateCw,
  ShieldCheck,
  Ban,
  Wrench,
  CloudRain,
  Timer,
  BriefcaseMedical,
  PhoneOff,
  Radio,
  Bike,
  Eye,
  ShieldAlert,
  Sparkles,
  Car,
  Footprints,
  Zap,
  Shield
} from 'lucide-react';
import { KeyRecommendation } from '../data/safetyRecommendations';

interface RecommendationLogoProps {
  recommendation: KeyRecommendation;
  size?: 'sm' | 'lg';
  index?: number;
  className?: string;
  isDark?: boolean;
}

// Map of icon names to Lucide components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  OctagonAlert,
  AlertTriangle,
  Info,
  Layers,
  Gauge,
  RotateCw,
  ShieldCheck,
  Ban,
  Wrench,
  CloudRain,
  Timer,
  BriefcaseMedical,
  SmartphoneOff: PhoneOff,
  PhoneOff,
  Radio,
  Bike,
  Eye,
  ShieldAlert,
  Sparkles,
  Car,
  Footprints,
  Zap,
  Shield
};

interface ColorTheme {
  bg: string;
  gradient: string;
  border: string;
  text: string;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  ring: string;
  glow: string;
  darkBg: string;
  darkBorder: string;
  darkText: string;
}

const COLOR_THEMES: Record<string, ColorTheme> = {
  red: {
    bg: 'bg-red-50/90',
    gradient: 'from-red-500 via-rose-600 to-red-700',
    border: 'border-red-300 hover:border-red-500',
    text: 'text-red-700',
    badgeBg: 'bg-red-600',
    badgeText: 'text-white',
    iconBg: 'bg-red-100 text-red-600 border-red-200',
    ring: 'ring-red-500/40',
    glow: 'shadow-red-500/25',
    darkBg: 'bg-red-950/60',
    darkBorder: 'border-red-500/50',
    darkText: 'text-red-300'
  },
  amber: {
    bg: 'bg-amber-50/90',
    gradient: 'from-amber-400 via-amber-500 to-orange-500',
    border: 'border-amber-300 hover:border-amber-500',
    text: 'text-amber-800',
    badgeBg: 'bg-amber-500',
    badgeText: 'text-slate-950',
    iconBg: 'bg-amber-100 text-amber-700 border-amber-200',
    ring: 'ring-amber-500/40',
    glow: 'shadow-amber-500/25',
    darkBg: 'bg-amber-950/60',
    darkBorder: 'border-amber-500/50',
    darkText: 'text-amber-300'
  },
  blue: {
    bg: 'bg-blue-50/90',
    gradient: 'from-blue-600 via-indigo-600 to-blue-800',
    border: 'border-blue-300 hover:border-blue-500',
    text: 'text-blue-700',
    badgeBg: 'bg-blue-600',
    badgeText: 'text-white',
    iconBg: 'bg-blue-100 text-blue-600 border-blue-200',
    ring: 'ring-blue-500/40',
    glow: 'shadow-blue-500/25',
    darkBg: 'bg-blue-950/60',
    darkBorder: 'border-blue-500/50',
    darkText: 'text-blue-300'
  },
  emerald: {
    bg: 'bg-emerald-50/90',
    gradient: 'from-emerald-500 via-teal-600 to-emerald-700',
    border: 'border-emerald-300 hover:border-emerald-500',
    text: 'text-emerald-800',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    iconBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    ring: 'ring-emerald-500/40',
    glow: 'shadow-emerald-500/25',
    darkBg: 'bg-emerald-950/60',
    darkBorder: 'border-emerald-500/50',
    darkText: 'text-emerald-300'
  },
  cyan: {
    bg: 'bg-cyan-50/90',
    gradient: 'from-cyan-500 via-sky-600 to-blue-600',
    border: 'border-cyan-300 hover:border-cyan-500',
    text: 'text-cyan-800',
    badgeBg: 'bg-cyan-600',
    badgeText: 'text-white',
    iconBg: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    ring: 'ring-cyan-500/40',
    glow: 'shadow-cyan-500/25',
    darkBg: 'bg-cyan-950/60',
    darkBorder: 'border-cyan-500/50',
    darkText: 'text-cyan-300'
  },
  purple: {
    bg: 'bg-purple-50/90',
    gradient: 'from-purple-600 via-violet-600 to-fuchsia-700',
    border: 'border-purple-300 hover:border-purple-500',
    text: 'text-purple-800',
    badgeBg: 'bg-purple-600',
    badgeText: 'text-white',
    iconBg: 'bg-purple-100 text-purple-700 border-purple-200',
    ring: 'ring-purple-500/40',
    glow: 'shadow-purple-500/25',
    darkBg: 'bg-purple-950/60',
    darkBorder: 'border-purple-500/50',
    darkText: 'text-purple-300'
  },
  orange: {
    bg: 'bg-orange-50/90',
    gradient: 'from-orange-500 via-amber-600 to-red-600',
    border: 'border-orange-300 hover:border-orange-500',
    text: 'text-orange-800',
    badgeBg: 'bg-orange-600',
    badgeText: 'text-white',
    iconBg: 'bg-orange-100 text-orange-700 border-orange-200',
    ring: 'ring-orange-500/40',
    glow: 'shadow-orange-500/25',
    darkBg: 'bg-orange-950/60',
    darkBorder: 'border-orange-500/50',
    darkText: 'text-orange-300'
  },
  slate: {
    bg: 'bg-slate-100/90',
    gradient: 'from-slate-700 via-slate-800 to-slate-950',
    border: 'border-slate-300 hover:border-slate-500',
    text: 'text-slate-800',
    badgeBg: 'bg-slate-800',
    badgeText: 'text-white',
    iconBg: 'bg-slate-200 text-slate-800 border-slate-300',
    ring: 'ring-slate-500/40',
    glow: 'shadow-slate-500/25',
    darkBg: 'bg-slate-900/80',
    darkBorder: 'border-slate-700',
    darkText: 'text-slate-200'
  }
};

export const RecommendationLogo: React.FC<RecommendationLogoProps> = ({
  recommendation,
  size = 'lg',
  index = 0,
  className = '',
  isDark = false
}) => {
  const iconKey = recommendation.logoIcon || 'Shield';
  const IconComponent = ICON_MAP[iconKey] || Shield;
  const colorKey = recommendation.logoColor || 'blue';
  const theme = COLOR_THEMES[colorKey] || COLOR_THEMES.blue;
  const code = recommendation.logoCode || recommendation.tag || `R-${index + 1}`;

  // Small logo (for 4-column card preview grid: llamativo y de alto impacto)
  if (size === 'sm') {
    return (
      <div
        className={`group/thumb relative rounded-xl border-2 flex flex-col items-center justify-between p-1.5 transition-all duration-200 select-none shadow-xs hover:scale-105 hover:shadow-md cursor-pointer ${
          isDark
            ? `${theme.darkBg} ${theme.darkBorder} hover:border-cyan-400/80`
            : `${theme.bg} ${theme.border} hover:border-blue-500`
        } ${className}`}
        title={`${recommendation.title}: ${recommendation.description}`}
      >
        {/* Top Logo Code */}
        <div className="w-full flex items-center justify-between gap-1">
          <span
            className={`text-[8px] font-black tracking-wider uppercase px-1 py-0.5 rounded shadow-2xs truncate max-w-[80%] ${
              isDark ? 'bg-black/70 text-white' : `${theme.badgeBg} ${theme.badgeText}`
            }`}
          >
            {code}
          </span>
          <span className={`text-[8px] font-black ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            0{index + 1}
          </span>
        </div>

        {/* Center Logo Icon with vibrant circular emblem */}
        <div className="flex items-center justify-center my-1.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-xs border transition-transform duration-200 group-hover/thumb:scale-110 ${theme.iconBg}`}>
            <IconComponent className="w-4.5 h-4.5 stroke-[2.4]" />
          </div>
        </div>

        {/* Bottom indicator bar in strong color */}
        <div className={`w-full h-1 rounded-full bg-gradient-to-r ${theme.gradient} opacity-90`} />
      </div>
    );
  }

  // Large logo (for recommendation detail modal: emblemático, 3D y súper llamativo)
  return (
    <div
      className={`relative rounded-2xl border-2 shrink-0 flex flex-col items-center justify-between p-3 select-none transition-all duration-300 shadow-md hover:shadow-lg ${
        isDark
          ? `${theme.darkBg} ${theme.darkBorder}`
          : `${theme.bg} ${theme.border}`
      } ${className}`}
    >
      {/* Top Header Row: Símbolo Badge and Index */}
      <div className="w-full flex items-center justify-between gap-1.5 mb-1">
        <span
          className={`text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs truncate max-w-[85%] ${
            isDark ? 'bg-black/80 text-cyan-300 border border-cyan-500/40' : `${theme.badgeBg} ${theme.badgeText}`
          }`}
        >
          {recommendation.tag || 'SÍMBOLO VIAL'}
        </span>
        <span className={`text-[11px] font-black ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          #{index + 1}
        </span>
      </div>

      {/* Central Geometric Traffic Symbol Emblem */}
      <div className="my-auto py-1 flex flex-col items-center justify-center">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 hover:scale-110 shadow-md ${
            isDark
              ? 'bg-slate-900/90 border-cyan-400/40'
              : 'bg-white border-slate-300/90 shadow-sm'
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${theme.gradient} text-white shadow-md`}>
            <IconComponent className="w-6 h-6 stroke-[2.6]" />
          </div>
        </div>
      </div>

      {/* Bottom Road Safety Symbol Code Label */}
      <div className="w-full text-center mt-1 pt-1.5 border-t border-slate-200/80">
        <span
          className={`text-[10px] font-black uppercase tracking-wider block truncate ${
            isDark ? theme.darkText : theme.text
          }`}
        >
          {code}
        </span>
      </div>
    </div>
  );
};

export default RecommendationLogo;
