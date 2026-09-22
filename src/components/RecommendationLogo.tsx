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
  border: string;
  text: string;
  badgeBg: string;
  badgeText: string;
  ring: string;
  darkBg: string;
  darkBorder: string;
  darkText: string;
}

const COLOR_THEMES: Record<string, ColorTheme> = {
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    badgeBg: 'bg-red-600',
    badgeText: 'text-white',
    ring: 'ring-red-500/30',
    darkBg: 'bg-red-950/40',
    darkBorder: 'border-red-500/40',
    darkText: 'text-red-400'
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-600',
    badgeBg: 'bg-amber-500',
    badgeText: 'text-slate-900',
    ring: 'ring-amber-500/30',
    darkBg: 'bg-amber-950/40',
    darkBorder: 'border-amber-500/40',
    darkText: 'text-amber-400'
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-[#0055d4]',
    badgeBg: 'bg-[#0055d4]',
    badgeText: 'text-white',
    ring: 'ring-blue-500/30',
    darkBg: 'bg-blue-950/40',
    darkBorder: 'border-blue-500/40',
    darkText: 'text-blue-400'
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-600',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    ring: 'ring-emerald-500/30',
    darkBg: 'bg-emerald-950/40',
    darkBorder: 'border-emerald-500/40',
    darkText: 'text-emerald-400'
  },
  cyan: {
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-600',
    badgeBg: 'bg-cyan-600',
    badgeText: 'text-white',
    ring: 'ring-cyan-500/30',
    darkBg: 'bg-cyan-950/40',
    darkBorder: 'border-cyan-500/40',
    darkText: 'text-cyan-300'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    badgeBg: 'bg-purple-600',
    badgeText: 'text-white',
    ring: 'ring-purple-500/30',
    darkBg: 'bg-purple-950/40',
    darkBorder: 'border-purple-500/40',
    darkText: 'text-purple-400'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-600',
    badgeBg: 'bg-orange-600',
    badgeText: 'text-white',
    ring: 'ring-orange-500/30',
    darkBg: 'bg-orange-950/40',
    darkBorder: 'border-orange-500/40',
    darkText: 'text-orange-400'
  },
  slate: {
    bg: 'bg-slate-100',
    border: 'border-slate-300',
    text: 'text-slate-700',
    badgeBg: 'bg-slate-700',
    badgeText: 'text-white',
    ring: 'ring-slate-400/30',
    darkBg: 'bg-slate-900/60',
    darkBorder: 'border-slate-700',
    darkText: 'text-slate-300'
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

  // Small logo (for 4-column card preview grid)
  if (size === 'sm') {
    return (
      <div
        className={`group/thumb relative h-13 rounded-xl border flex flex-col items-center justify-between p-1.5 transition-all duration-200 select-none ${
          isDark
            ? `${theme.darkBg} ${theme.darkBorder} hover:border-cyan-400/60`
            : `${theme.bg} ${theme.border} hover:shadow-xs hover:border-blue-400`
        } ${className}`}
        title={`${recommendation.title}: ${recommendation.description}`}
      >
        {/* Top Logo Code */}
        <div className="w-full flex items-center justify-between">
          <span
            className={`text-[7.5px] font-black tracking-wider uppercase px-1 py-0.2 rounded-xs ${
              isDark ? 'bg-black/50 text-white' : `${theme.badgeBg} ${theme.badgeText}`
            }`}
          >
            {code}
          </span>
          <span className={`text-[8px] font-extrabold ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
            0{index + 1}
          </span>
        </div>

        {/* Center Logo Icon */}
        <div className="flex items-center justify-center my-auto">
          <IconComponent
            className={`w-5 h-5 transition-transform duration-200 group-hover/thumb:scale-115 ${
              isDark ? theme.darkText : theme.text
            }`}
          />
        </div>

        {/* Subtle emblem footer line */}
        <div className="w-full h-0.5 rounded-full bg-current opacity-20" />
      </div>
    );
  }

  // Large logo (for recommendation detail modal)
  return (
    <div
      className={`relative h-32 sm:h-30 w-full sm:w-36 rounded-2xl border-2 shrink-0 flex flex-col items-center justify-between p-2.5 select-none transition-all duration-200 shadow-xs ${
        isDark
          ? `${theme.darkBg} ${theme.darkBorder}`
          : `${theme.bg} ${theme.border}`
      } ${className}`}
    >
      {/* Top Header Row: Símbolo Badge and Index */}
      <div className="w-full flex items-center justify-between gap-1">
        <span
          className={`text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-2xs truncate max-w-[82%] ${
            isDark ? 'bg-black/70 text-cyan-300 border border-cyan-500/30' : `${theme.badgeBg} ${theme.badgeText}`
          }`}
        >
          {recommendation.tag || 'SÍMBOLO'}
        </span>
        <span className={`text-[10px] font-black ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          #{index + 1}
        </span>
      </div>

      {/* Central Geometric Traffic Symbol Emblem */}
      <div className="my-auto flex flex-col items-center justify-center">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-transform duration-300 hover:scale-105 shadow-sm ${
            isDark
              ? 'bg-slate-900/90 border-cyan-400/30'
              : 'bg-white border-slate-300/80 shadow-xs'
          }`}
        >
          <IconComponent
            className={`w-7 h-7 stroke-[2.4] ${isDark ? theme.darkText : theme.text}`}
          />
        </div>
      </div>

      {/* Bottom Road Safety Symbol Code Label */}
      <div className="w-full text-center">
        <span
          className={`text-[9.5px] font-black uppercase tracking-wider block truncate ${
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
