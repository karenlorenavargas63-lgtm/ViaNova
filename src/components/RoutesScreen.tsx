import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Shield, 
  GitFork, 
  Navigation, 
  Crosshair, 
  MapPin, 
  Check, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  Sparkles,
  Map,
  Compass,
  Building2,
  RotateCcw,
  ArrowUpDown,
  Search,
  ExternalLink
} from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';
import { AddressAutocompleteInput } from './AddressAutocompleteInput';
import { COLOMBIA_CITIES, ColombiaCity, ColombiaPlace } from '../data/colombiaPlaces';
import { fetchRealtimeRoute, CalculatedRoute } from '../services/routingService';
import { reverseGeocode } from '../services/geocodingService';

export const RoutesScreen: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<ColombiaCity>(COLOMBIA_CITIES[0]); // Medellín
  
  // Default origin & destination in Colombia (Medellín)
  const defaultRoute = currentCity.popularRoutes[0];
  const [originName, setOriginName] = useState(defaultRoute.origin.name);
  const [originCoords, setOriginCoords] = useState<[number, number]>([defaultRoute.origin.lat, defaultRoute.origin.lng]);
  
  const [destinationName, setDestinationName] = useState(defaultRoute.destination.name);
  const [destinationCoords, setDestinationCoords] = useState<[number, number]>([defaultRoute.destination.lat, defaultRoute.destination.lng]);
  
  const [selectedRouteId, setSelectedRouteId] = useState<'rapida' | 'segura' | 'alternativa'>('rapida');
  const [calculatedRoute, setCalculatedRoute] = useState<CalculatedRoute | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const [isNavigating, setIsNavigating] = useState(false);
  const [voiceAssistance, setVoiceAssistance] = useState(true);

  // Dynamic route options with live calculated distances and durations
  const baseDistance = calculatedRoute?.distanceKm || 4.2;
  const baseTime = calculatedRoute?.durationMinutes || 18;

  const routeOptions = [
    {
      id: 'rapida' as const,
      name: 'Rápida',
      distance: `${baseDistance} km`,
      traffic: '↘ Tráfico fluido',
      time: `${baseTime} min`,
      icon: Zap,
      description: 'Trayecto más rápido por vías principales de Colombia',
      badgeColor: 'border-blue-600'
    },
    {
      id: 'segura' as const,
      name: 'Segura',
      distance: `${Math.round((baseDistance * 1.1) * 10) / 10} km`,
      traffic: 'Corredor iluminado',
      time: `${Math.round(baseTime * 1.2)} min`,
      icon: Shield,
      description: 'Prioriza cicloinfraestructura, cámaras y zonas monitoreadas',
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

  // Fetch real-time route whenever coordinates or route type change
  useEffect(() => {
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

  // Handle City Change
  const handleSelectCity = (city: ColombiaCity) => {
    setCurrentCity(city);
    if (city.popularRoutes.length > 0) {
      const pop = city.popularRoutes[0];
      setOriginName(pop.origin.name);
      setOriginCoords([pop.origin.lat, pop.origin.lng]);
      setDestinationName(pop.destination.name);
      setDestinationCoords([pop.destination.lat, pop.destination.lng]);
    }
  };

  // Handle Popular Colombia Preset Route Selection
  const handleSelectPresetRoute = (route: { origin: ColombiaPlace; destination: ColombiaPlace; name: string }) => {
    setOriginName(route.origin.name);
    setOriginCoords([route.origin.lat, route.origin.lng]);
    setDestinationName(route.destination.name);
    setDestinationCoords([route.destination.lat, route.destination.lng]);
  };

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
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('La geolocalización no está disponible en este navegador.');
      return;
    }
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setOriginCoords(coords);
        const resolved = await reverseGeocode(coords[0], coords[1]);
        setOriginName(resolved || 'Mi ubicación actual');
        setIsGettingLocation(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Voice announcements on navigation start
  const handleToggleNavigation = () => {
    const nextState = !isNavigating;
    setIsNavigating(nextState);

    if (nextState && voiceAssistance && 'speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(
          `Iniciando navegación en tiempo real hacia ${destinationName}. Distancia estimada ${baseDistance} kilómetros. Buen viaje.`
        );
        utterance.lang = 'es-CO';
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        // speech synthesis not supported or blocked
      }
    }
  };

  return (
    <div className="w-full bg-white border-b border-slate-200/80 px-0 animate-fade-in font-sans">
      <div className="w-full flex flex-col lg:flex-row min-h-[640px] lg:h-[calc(100vh-130px)] max-h-[900px]">
        
        {/* Left Panel: Planificar Ruta Form */}
        <div className="w-full lg:w-[440px] xl:w-[480px] p-6 sm:p-8 lg:pl-10 xl:pl-12 flex flex-col justify-between bg-white border-r border-slate-200 overflow-y-auto shrink-0 shadow-xs z-10">
          
          <div className="space-y-6">
            
            {/* Header & Colombia Badge */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a193b] tracking-tight">
                  Planificar Ruta
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Navegación inteligente y segura en Colombia
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>En vivo</span>
              </div>
            </div>

            {/* City Preset Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Ciudad en Colombia
              </label>
              <div className="grid grid-cols-3 gap-2">
                {COLOMBIA_CITIES.slice(0, 3).map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                      currentCity.id === city.id
                        ? 'bg-[#0a193b] border-[#0a193b] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Section (Origin & Destination in Colombia with Autocomplete & Search) */}
            <div className="space-y-2 relative">
              
              {/* Origin Autocomplete Input */}
              <AddressAutocompleteInput
                id="origin-address-input"
                label="Punto de Partida (A)"
                badgeLetter="A"
                badgeColor="emerald"
                value={originName}
                placeholder={`Ej: Cra 43A, El Poblado, ${currentCity.name}...`}
                cityContext={currentCity.name}
                biasCoords={currentCity.center}
                onChangeText={(text) => setOriginName(text)}
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
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 shadow-xs text-[11px] font-semibold text-slate-500 transition-all active:scale-95 cursor-pointer"
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
                placeholder={`Ej: Calle 50, Centro, Plaza Mayor, ${currentCity.name}...`}
                cityContext={currentCity.name}
                biasCoords={originCoords || currentCity.center}
                onChangeText={(text) => setDestinationName(text)}
                onSelectPlace={(place) => {
                  setDestinationName(place.name);
                  setDestinationCoords(place.coords);
                }}
              />

              {/* Quick info note */}
              <p className="text-[11px] text-slate-400 px-1 pt-0.5">
                💡 Puedes escribir cualquier dirección, calle o sitio de Colombia, o hacer clic en el mapa.
              </p>

              {/* Popular Routes Quick Dropdown */}
              {currentCity.popularRoutes.length > 0 && (
                <div className="pt-1">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
                    <span className="text-[11px] font-semibold text-slate-400 shrink-0">Rutas clave:</span>
                    {currentCity.popularRoutes.map((r, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectPresetRoute(r)}
                        className="px-2.5 py-1 rounded-lg bg-blue-50/80 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold border border-blue-100 shrink-0 transition-colors"
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Suggested Options Section */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>Opciones sugeridas</span>
                  {isCalculating && (
                    <span className="text-[11px] font-normal text-blue-600 animate-pulse">
                      Calculando en vivo...
                    </span>
                  )}
                </h2>
                {isNavigating && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Navegando
                  </span>
                )}
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
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected 
                            ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Middle Info */}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900">
                              {route.name}
                            </h3>
                            {route.id === 'segura' && (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                Ciclorruta
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            {route.distance} • {route.traffic}
                          </p>
                        </div>
                      </div>

                      {/* Right Time */}
                      <div className="text-right shrink-0">
                        <span className="text-sm sm:text-base font-bold text-slate-900">
                          {route.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Bottom Action Button */}
          <div className="pt-6 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                id="start-navigation-cta"
                onClick={handleToggleNavigation}
                className={`flex-1 py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md cursor-pointer ${
                  isNavigating
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-[#0a193b] hover:bg-[#0055d4] text-white hover:scale-[1.01]'
                }`}
              >
                <Navigation className="w-4 h-4 fill-white rotate-45" />
                <span>{isNavigating ? 'Detener Navegación' : 'Iniciar Navegación en Vivo'}</span>
              </button>

              <a
                id="open-google-maps-cta"
                href={`https://www.google.com/maps/dir/?api=1&origin=${originCoords[0]},${originCoords[1]}&destination=${destinationCoords[0]},${destinationCoords[1]}&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-blue-50 text-slate-800 border-2 border-slate-200 hover:border-blue-400 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 shrink-0"
                title="Abrir la ruta directamente en la app oficial de Google Maps"
              >
                <span className="flex items-center font-black text-xs">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
                <span className="text-slate-700 font-semibold">Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              </a>
            </div>

            {isNavigating && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between text-xs text-blue-900 font-medium animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  <span className="truncate">Ruta guiada en vivo hacia {destinationName}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setVoiceAssistance(!voiceAssistance)}
                  className="text-blue-700 hover:text-blue-900 p-1 cursor-pointer"
                  title="Asistencia por voz"
                >
                  {voiceAssistance ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            )}

            <p className="text-[11px] text-center text-slate-400">
              💡 Puedes hacer clic en cualquier punto del mapa para fijar nuevo origen o destino
            </p>
          </div>

        </div>

        {/* Right Panel: Interactive Real Colombia Leaflet Map */}
        <div className="flex-1 w-full relative min-h-[500px]">
          <InteractiveMap
            selectedRouteId={selectedRouteId}
            isNavigating={isNavigating}
            originCoords={originCoords}
            destinationCoords={destinationCoords}
            originName={originName}
            destinationName={destinationName}
            calculatedRoute={calculatedRoute}
            currentCity={currentCity}
            onSelectCity={handleSelectCity}
            onMapClickSetCoords={handleMapClickSetCoords}
          />
        </div>

      </div>
    </div>
  );
};
