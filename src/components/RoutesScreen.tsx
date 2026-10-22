import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Shield, 
  GitFork, 
  MapPin, 
  ArrowUpDown,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';
import { AddressAutocompleteInput } from './AddressAutocompleteInput';
import { COLOMBIA_CITIES, ColombiaCity } from '../data/colombiaPlaces';
import { fetchAllRealtimeRoutes, CalculatedRouteSet } from '../services/routingService';
import { reverseGeocode } from '../services/geocodingService';

export const RoutesScreen: React.FC = () => {
  // Center default to Medellín
  const [currentCity] = useState<ColombiaCity>(COLOMBIA_CITIES[0]);
  
  // Clean inputs so user can enter any address
  const [originName, setOriginName] = useState('');
  const [originCoords, setOriginCoords] = useState<[number, number] | null>(null);
  
  const [destinationName, setDestinationName] = useState('');
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);
  
  const [selectedRouteId, setSelectedRouteId] = useState<'rapida' | 'segura' | 'alternativa'>('rapida');
  const [routeSet, setRouteSet] = useState<CalculatedRouteSet | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const hasRoute = !!(originCoords && destinationCoords);
  const currentRoute = routeSet ? routeSet[selectedRouteId] : null;

  // Real calculated distance and duration
  const baseDistance = currentRoute?.distanceKm || 0;
  const baseTime = currentRoute?.durationMinutes || 0;

  // Real route options with distinct real streets and times
  const routeOptions = routeSet ? [
    {
      id: 'rapida' as const,
      name: 'Rápida',
      tag: 'Más rápida',
      distance: `${routeSet.rapida.distanceKm} km`,
      traffic: '↘ El camino más rápido',
      time: `${routeSet.rapida.durationMinutes} min`,
      icon: Zap,
      description: 'Trayecto más rápido por vías principales',
      accentColor: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      id: 'segura' as const,
      name: 'Segura',
      tag: 'Ciclorruta y cámaras',
      distance: `${routeSet.segura.distanceKm} km`,
      traffic: routeSet.segura.trafficStatus,
      time: `${routeSet.segura.durationMinutes} min`,
      icon: Shield,
      description: 'Prioriza cicloinfraestructura, cámaras y vías monitoreadas',
      accentColor: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      id: 'alternativa' as const,
      name: 'Alternativa',
      tag: 'Vía alterna',
      distance: `${routeSet.alternativa.distanceKm} km`,
      traffic: routeSet.alternativa.trafficStatus,
      time: `${routeSet.alternativa.durationMinutes} min`,
      icon: GitFork,
      description: 'Ruta secundaria que esquiva el tráfico central',
      accentColor: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    },
  ] : [];

  // Fetch all 3 REAL distinct routes whenever coordinates change
  useEffect(() => {
    if (!originCoords || !destinationCoords) {
      setRouteSet(null);
      setIsCalculating(false);
      return;
    }

    let isCancelled = false;
    setIsCalculating(true);

    fetchAllRealtimeRoutes(originCoords, destinationCoords)
      .then((routes) => {
        if (!isCancelled) {
          setRouteSet(routes);
          setIsCalculating(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setIsCalculating(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [originCoords, destinationCoords]);

  // Handle setting point from map click
  const handleMapClickSetCoords = (type: 'origin' | 'destination', coords: [number, number], name: string) => {
    if (type === 'origin') {
      setOriginCoords(coords);
      setOriginName(name);
    } else {
      setDestinationCoords(coords);
      setDestinationName(name);
    }
  };

  // Swap Origin and Destination
  const handleSwapOriginDestination = () => {
    const tempName = originName;
    const tempCoords = originCoords;
    setOriginName(destinationName);
    setOriginCoords(destinationCoords);
    setDestinationName(tempName);
    setDestinationCoords(tempCoords);
  };

  // Get current device location via browser Geolocation API
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('La geolocalización no está disponible en este navegador.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setOriginCoords(coords);
        const resolved = await reverseGeocode(coords[0], coords[1]);
        setOriginName(resolved || 'Mi ubicación actual');
      },
      (error) => {
        console.warn('Geolocation error:', error);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="w-full bg-white border-b border-slate-200/80 px-0 animate-fade-in font-sans">
      <div className="w-full flex flex-col lg:flex-row min-h-[640px] lg:h-[calc(100vh-130px)] max-h-[920px]">
        
        {/* Left Panel: Planificar Ruta Form */}
        <div className="w-full lg:w-[440px] xl:w-[480px] p-6 sm:p-8 lg:pl-10 xl:pl-12 flex flex-col justify-between bg-white border-r border-slate-200 overflow-y-auto shrink-0 shadow-xs z-10">
          
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-xs font-black uppercase tracking-wider text-blue-600">Google Maps Navigation</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a193b] tracking-tight mt-1">
                Planificar Ruta
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Compara 3 caminos reales con tiempos y trayectos diferenciados
              </p>
            </div>

            {/* Inputs Section */}
            <div className="space-y-3 relative">
              
              {/* Origin Autocomplete Input */}
              <AddressAutocompleteInput
                id="origin-address-input"
                label="Punto de Partida (A)"
                badgeLetter="A"
                badgeColor="emerald"
                value={originName}
                placeholder="Escribe el punto de partida (ej. Cra 43A, Calle 50, Tu barrio...)"
                biasCoords={originCoords || currentCity.center}
                onChangeText={(text) => {
                  setOriginName(text);
                  if (!text.trim()) setOriginCoords(null);
                }}
                onSelectPlace={(place) => {
                  setOriginName(place.name);
                  setOriginCoords(place.coords);
                }}
                onUseCurrentLocation={handleUseCurrentLocation}
              />

              {/* Swap Origin & Destination Button */}
              <div className="flex justify-center -my-1 relative z-10">
                <button
                  type="button"
                  onClick={handleSwapOriginDestination}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 shadow-xs text-xs font-semibold text-slate-600 transition-all active:scale-95 cursor-pointer"
                  title="Invertir origen y destino"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600" />
                  <span>Invertir puntos</span>
                </button>
              </div>

              {/* Destination Autocomplete Input */}
              <AddressAutocompleteInput
                id="destination-address-input"
                label="Destino Final (B)"
                badgeLetter="B"
                badgeColor="navy"
                value={destinationName}
                placeholder="Escribe el destino (ej. Centro Comercial, Parque, Calle 10...)"
                biasCoords={originCoords || currentCity.center}
                onChangeText={(text) => {
                  setDestinationName(text);
                  if (!text.trim()) setDestinationCoords(null);
                }}
                onSelectPlace={(place) => {
                  setDestinationName(place.name);
                  setDestinationCoords(place.coords);
                }}
              />

              {/* Helper note */}
              <p className="text-xs text-slate-500 px-1 pt-1">
                💡 Escribe cualquier dirección y presiona Enter, o haz clic directamente sobre el mapa de Google Maps.
              </p>

            </div>

            {/* Suggested Options Section - Real Distinct Routes */}
            {hasRoute ? (
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>Caminos disponibles</span>
                    {isCalculating ? (
                      <span className="text-xs font-normal text-blue-600 animate-pulse">
                        Calculando trayectos reales...
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-500">
                        {routeOptions.length} rutas calculadas
                      </span>
                    )}
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {routeOptions.map((route) => {
                    const isSelected = selectedRouteId === route.id;
                    const Icon = route.icon;

                    return (
                      <div
                        key={route.id}
                        id={`route-card-${route.id}`}
                        onClick={() => setSelectedRouteId(route.id)}
                        className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-600/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                        }`}
                      >
                        {/* Left Icon Box */}
                        <div className="flex items-center gap-3.5">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                            isSelected 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>

                          {/* Middle Info */}
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-slate-900">
                                {route.name}
                              </h3>
                              <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                                isSelected ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {route.tag}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 font-medium mt-0.5">
                              {route.distance} • <span className={route.id === 'rapida' ? 'text-blue-700 font-semibold' : 'text-slate-600'}>{route.traffic}</span>
                            </p>
                          </div>
                        </div>

                        {/* Right Time */}
                        <div className="text-right shrink-0">
                          <span className={`text-lg font-black tracking-tight ${
                            isSelected ? 'text-blue-600' : 'text-slate-900'
                          }`}>
                            {route.time}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-medium">
                            {isSelected ? 'Seleccionada' : 'Ver camino'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  Ingresa origen y destino
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Escribe las direcciones en los campos de arriba o haz clic en el mapa de Google Maps para trazar y comparar 3 rutas reales.
                </p>
              </div>
            )}

          </div>

          {/* Resumen del Trayecto Seleccionado */}
          {hasRoute && currentRoute && (
            <div className="pt-4 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Resumen de Ruta Seleccionada
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Ruta {currentRoute.name}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">Distancia real:</span>
                  <span className="font-extrabold text-slate-900">{baseDistance} km</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">Tiempo estimado de llegada:</span>
                  <span className="font-extrabold text-blue-600 text-base">{baseTime} min</span>
                </div>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <span className="truncate">Vía: <strong className="text-slate-800">{currentRoute.summary}</strong></span>
                  <span className="text-blue-600 font-bold shrink-0">{currentRoute.tag}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Panel: Interactive Google Maps with live routes */}
        <div className="flex-1 w-full relative min-h-[500px]">
          <InteractiveMap
            selectedRouteId={selectedRouteId}
            onSelectRouteId={setSelectedRouteId}
            originCoords={originCoords}
            destinationCoords={destinationCoords}
            originName={originName}
            destinationName={destinationName}
            calculatedRoute={currentRoute}
            routeSet={routeSet}
            currentCity={currentCity}
            onMapClickSetCoords={handleMapClickSetCoords}
          />
        </div>

      </div>
    </div>
  );
};
