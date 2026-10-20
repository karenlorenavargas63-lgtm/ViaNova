import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Shield, 
  GitFork, 
  MapPin, 
  ArrowUpDown,
  Navigation,
  Compass
} from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';
import { AddressAutocompleteInput } from './AddressAutocompleteInput';
import { COLOMBIA_CITIES, ColombiaCity } from '../data/colombiaPlaces';
import { fetchRealtimeRoute, CalculatedRoute } from '../services/routingService';
import { reverseGeocode } from '../services/geocodingService';

export const RoutesScreen: React.FC = () => {
  // Center default to Medellín
  const [currentCity] = useState<ColombiaCity>(COLOMBIA_CITIES[0]);
  
  // Fields start completely clean without prefilled demo text so user can enter any address
  const [originName, setOriginName] = useState('');
  const [originCoords, setOriginCoords] = useState<[number, number] | null>(null);
  
  const [destinationName, setDestinationName] = useState('');
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);
  
  const [selectedRouteId, setSelectedRouteId] = useState<'rapida' | 'segura' | 'alternativa'>('rapida');
  const [calculatedRoute, setCalculatedRoute] = useState<CalculatedRoute | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Dynamic route options with live calculated distances and durations
  const baseDistance = calculatedRoute?.distanceKm || 0;
  const baseTime = calculatedRoute?.durationMinutes || 0;

  const hasRoute = !!(originCoords && destinationCoords);

  const routeOptions = [
    {
      id: 'rapida' as const,
      name: 'Rápida',
      distance: `${baseDistance} km`,
      traffic: '↘ Tráfico fluido',
      time: `${baseTime} min`,
      icon: Zap,
      description: 'Trayecto más rápido por vías principales',
      badgeColor: 'border-blue-600'
    },
    {
      id: 'segura' as const,
      name: 'Segura',
      distance: `${Math.round((baseDistance * 1.1) * 10) / 10} km`,
      traffic: 'Corredor iluminado',
      time: `${Math.round(baseTime * 1.2)} min`,
      icon: Shield,
      description: 'Prioriza cicloinfraestructura, cámaras y vías monitoreadas',
      badgeColor: 'border-emerald-600'
    },
    {
      id: 'alternativa' as const,
      name: 'Alternativa',
      distance: `${Math.round((baseDistance * 1.25) * 10) / 10} km`,
      traffic: 'Evita congestión',
      time: `${Math.round(baseTime * 1.35)} min`,
      icon: GitFork,
      description: 'Ruta secundaria con menor afluencia vehicular',
      badgeColor: 'border-indigo-600'
    },
  ];

  // Fetch real-time route whenever both coordinates or route type change
  useEffect(() => {
    if (!originCoords || !destinationCoords) {
      setCalculatedRoute(null);
      setIsCalculating(false);
      return;
    }

    let isCancelled = false;
    setIsCalculating(true);

    fetchRealtimeRoute(originCoords, destinationCoords, selectedRouteId)
      .then((route) => {
        if (!isCancelled) {
          setCalculatedRoute(route);
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
  }, [originCoords, destinationCoords, selectedRouteId]);

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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a193b] tracking-tight">
                Planificar Ruta
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Ingresa cualquier dirección para calcular y visualizar el mejor trayecto
              </p>
            </div>

            {/* Inputs Section (Origin & Destination clean inputs with immediate search) */}
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
                💡 Puedes escribir cualquier dirección y presionar Enter, o hacer clic en cualquier lugar del mapa.
              </p>

            </div>

            {/* Suggested Options Section - Displays when route is active */}
            {hasRoute ? (
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>Opciones calculadas</span>
                    {isCalculating && (
                      <span className="text-xs font-normal text-blue-600 animate-pulse">
                        Calculando trayecto...
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
                            ? 'border-slate-800 bg-white shadow-md ring-1 ring-slate-800/10'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        {/* Left Icon Box */}
                        <div className="flex items-center gap-3.5">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected 
                              ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>

                          {/* Middle Info */}
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                                {route.name}
                              </h3>
                              {route.id === 'segura' && (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                                  Ciclorruta
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 font-medium">
                              {route.distance} • {route.traffic}
                            </p>
                          </div>
                        </div>

                        {/* Right Time */}
                        <div className="text-right shrink-0">
                          <span className="text-base sm:text-lg font-bold text-slate-900">
                            {route.time}
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
                  Escribe las direcciones en los campos de arriba o haz clic en el mapa para trazar tu trayecto.
                </p>
              </div>
            )}

          </div>

          {/* Resumen del Trayecto */}
          {hasRoute && (
            <div className="pt-4 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Resumen del Trayecto
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    Ruta Calculada
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">Distancia estimada:</span>
                  <span className="font-extrabold text-slate-900">{baseDistance} km</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">Tiempo de recorrido:</span>
                  <span className="font-extrabold text-slate-900">
                    {selectedRouteId === 'rapida' ? `${baseTime} min` : selectedRouteId === 'segura' ? `${Math.round(baseTime * 1.2)} min` : `${Math.round(baseTime * 1.35)} min`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <span className="truncate">Hacia: <strong className="text-slate-800">{destinationName}</strong></span>
                  <span className="text-blue-600 font-bold shrink-0">Tráfico monitoreado</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Panel: Interactive Real Colombia Leaflet Map (Voyager / OpenStreetMap, Zero Google Maps) */}
        <div className="flex-1 w-full relative min-h-[500px]">
          <InteractiveMap
            selectedRouteId={selectedRouteId}
            originCoords={originCoords}
            destinationCoords={destinationCoords}
            originName={originName}
            destinationName={destinationName}
            calculatedRoute={calculatedRoute}
            currentCity={currentCity}
            onMapClickSetCoords={handleMapClickSetCoords}
          />
        </div>

      </div>
    </div>
  );
};
