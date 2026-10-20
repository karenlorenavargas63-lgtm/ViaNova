import React from 'react';
import { RouteOption, MobilityAlert } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { 
  Navigation, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Route, 
  ArrowRight, 
  Check, 
  AlertTriangle, 
  Clock, 
  Volume2, 
  VolumeX, 
  Compass, 
  Bike, 
  Sun, 
  CornerUpRight, 
  CornerUpLeft, 
  ArrowUp, 
  X,
  Sparkles
} from 'lucide-react';

interface RoutesViewProps {
  routeOptions: RouteOption[];
  alerts: MobilityAlert[];
  onSelectAlert: (alert: MobilityAlert) => void;
}

export const RoutesView: React.FC<RoutesViewProps> = ({
  routeOptions,
  alerts,
  onSelectAlert
}) => {
  const [origin, setOrigin] = React.useState('Av. Paseo de la Reforma 222');
  const [destination, setDestination] = React.useState('Polanco, Miguel Hidalgo');
  const [selectedRouteId, setSelectedRouteId] = React.useState<'rapida' | 'segura' | 'alternativa'>('rapida');
  const [isNavigating, setIsNavigating] = React.useState(false);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [voiceEnabled, setVoiceEnabled] = React.useState(true);
  const [transportMode, setTransportMode] = React.useState<'bici' | 'auto' | 'caminata'>('bici');

  const selectedRoute = routeOptions.find(r => r.id === selectedRouteId) || routeOptions[0];

  const handleStartNavigation = () => {
    setIsNavigating(true);
    setCurrentStepIndex(0);
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < selectedRoute.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsNavigating(false);
      alert('¡Has llegado a tu destino con éxito! Recorrido registrado en tu perfil VIANOVA.');
    }
  };

  return (
    <div id="vianova-routes-view" className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Top Banner Alert if any critical incident affects area */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 text-amber-900">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span>
            <strong>Alerta activa:</strong> Accidente reportado en Av. Insurgentes (+5 min de demora estimada).
          </span>
        </div>
        <button
          onClick={() => setSelectedRouteId('segura')}
          className="shrink-0 text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-xs transition"
        >
          Desviar a Ruta Segura
        </button>
      </div>

      {/* Main Grid: Left Controls (Planificar Ruta) + Right Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form & Alternatives (Page 5) */}
        <div className="lg:col-span-5 space-y-5 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Planificar Ruta
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Calcula trayectos optimizados por tiempo, seguridad o vías libres.
            </p>
          </div>

          {/* Transport mode selector */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setTransportMode('bici')}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                transportMode === 'bici' ? 'bg-white text-blue-600 shadow-xs' : 'hover:bg-slate-200'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Bicicleta</span>
            </button>
            <button
              onClick={() => setTransportMode('auto')}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                transportMode === 'auto' ? 'bg-white text-blue-600 shadow-xs' : 'hover:bg-slate-200'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>Automóvil</span>
            </button>
            <button
              onClick={() => setTransportMode('caminata')}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                transportMode === 'caminata' ? 'bg-white text-blue-600 shadow-xs' : 'hover:bg-slate-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Peatonal</span>
            </button>
          </div>

          {/* Origin & Destination Inputs */}
          <div className="space-y-3 relative">
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 w-3 h-3 rounded-full border-2 border-blue-600 bg-white"></span>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Lugar de origen..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-3.5 w-3 h-3 rounded-full bg-emerald-600"></span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Lugar de destino..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Route Options (Page 5: Rápida, Segura, Alternativa) */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Opciones sugeridas
            </h4>

            {routeOptions.map((route) => {
              const isSelected = selectedRouteId === route.id;
              return (
                <div
                  key={route.id}
                  id={`route-option-${route.id}`}
                  onClick={() => {
                    setSelectedRouteId(route.id);
                    if (isNavigating) setCurrentStepIndex(0);
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 relative ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        route.id === 'rapida' 
                          ? 'bg-blue-100 text-blue-700' 
                          : route.id === 'segura' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {route.id === 'rapida' && <Zap className="w-4 h-4" />}
                        {route.id === 'segura' && <ShieldCheck className="w-4 h-4" />}
                        {route.id === 'alternativa' && <Route className="w-4 h-4" />}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">{route.name}</h5>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {route.distance} • {route.trafficStatus}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-slate-900 font-display">
                        {route.time}
                      </span>
                    </div>
                  </div>

                  {/* Additional indicators */}
                  <div className="mt-2.5 flex items-center gap-3 text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Seguridad: <strong>{route.safetyRating}%</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Sun className="w-3 h-3 text-amber-500" />
                      Iluminación: <strong>{route.lightingQuality}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info note */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 text-center">
            <span>Ruta planificada y optimizada</span>
          </div>
        </div>

        {/* Right Map Canvas */}
        <div className="lg:col-span-7 h-[580px] sticky top-24">
          <InteractiveMap
            selectedRouteId={selectedRouteId}
            originCoords={null}
            destinationCoords={null}
            originName={origin}
            destinationName={destination}
            calculatedRoute={null}
            currentCity={{
              id: 'medellin',
              name: 'Medellín',
              department: 'Antioquia',
              center: [6.2442, -75.5812],
              zoom: 13,
              popularRoutes: []
            }}
          />
        </div>
      </div>
    </div>
  );
};
