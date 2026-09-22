import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  subtitle?: string;
  category?: string;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  subtitle,
  category,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Reset zoom on open/close
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 2.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900/90 border-b border-white/10 text-white z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Maximize2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              {category && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
                  {category}
                </span>
              )}
              <span className="text-xs text-slate-400">Visualizador HD • Zoom {Math.round(zoomLevel * 100)}%</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h2>
          </div>
        </div>

        {/* Toolbar & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-white/10">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.75}
              title="Reducir zoom"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2 text-slate-300 font-bold min-w-[50px] text-center select-none">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2.8}
              title="Aumentar zoom"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Restablecer tamaño original (100%)"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 border-l border-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition-all cursor-pointer"
            title="Cerrar visor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main image viewer canvas */}
      <div 
        className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div 
          className="relative transition-transform duration-200 ease-out max-w-full flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img
            src={imageSrc}
            alt={title}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-2xl shadow-2xl bg-white p-3 sm:p-5 border border-white/20"
          />
        </div>
      </div>

      {/* Footer bar */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-900/90 border-t border-white/10 text-center text-xs text-slate-300 z-10 shrink-0 flex items-center justify-between">
        <span className="hidden sm:inline text-slate-400">
          {subtitle || 'Lámina oficial de señalización y normas viales VIANOVA'}
        </span>
        <span className="text-slate-400 mx-auto sm:mx-0">
          💡 Usa los botones de zoom para inspeccionar en detalle cada señal y símbolo.
        </span>
        <button
          onClick={onClose}
          className="hidden sm:inline-block px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium cursor-pointer border border-white/10"
        >
          Cerrar (Esc)
        </button>
      </div>
    </div>
  );
};
