import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  AlertTriangle, 
  Layers, 
  Plus, 
  Minus, 
  Crosshair, 
  Navigation, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Compass, 
  ShieldCheck, 
  Info,
  Clock,
  Radio,
  Search,
  Loader2,
  X,
  ExternalLink
} from 'lucide-react';
import { REALTIME_COLOMBIA_INCIDENTS, RealtimeIncident, COLOMBIA_CITIES, ColombiaCity } from '../data/colombiaPlaces';
import { CalculatedRoute } from '../services/routingService';
import { reverseGeocode, searchAddress, GeocodedPlace } from '../services/geocodingService';

interface InteractiveMapProps {
  selectedRouteId: 'rapida' | 'segura' | 'alternativa';
  isNavigating: boolean;
  originCoords: [number, number]; // [lat, lng]
  destinationCoords: [number, number]; // [lat, lng]
  originName: string;
  destinationName: string;
  calculatedRoute: CalculatedRoute | null;
  currentCity: ColombiaCity;
  onSelectCity: (city: ColombiaCity) => void;
  onMapClickSetCoords?: (type: 'origin' | 'destination', coords: [number, number], name: string) => void;
}

export type GoogleMapLayerType = 'google-streets' | 'google-traffic' | 'google-hybrid' | 'google-terrain' | 'osm' | 'voyager';

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedRouteId,
  isNavigating,
  originCoords,
  destinationCoords,
  originName,
  destinationName,
  calculatedRoute,
  currentCity,
  onSelectCity,
  onMapClickSetCoords
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const originMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const commuterMarkerRef = useRef<L.Marker | null>(null);
  const incidentMarkersRef = useRef<L.Marker[]>([]);

  // Default to Google Maps Streets
  const [mapLayer, setMapLayer] = useState<GoogleMapLayerType>('google-streets');
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [showIncidents, setShowIncidents] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<RealtimeIncident | null>(null);
  const [clickedMapPoint, setClickedMapPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [clickedAddress, setClickedAddress] = useState<string>('');
  const [isGeocodingPoint, setIsGeocodingPoint] = useState(false);

  // Quick Map Address Search
  const [showMapSearchBar, setShowMapSearchBar] = useState(false);
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [mapSearchResults, setMapSearchResults] = useState<GeocodedPlace[]>([]);
  const [isSearchingMap, setIsSearchingMap] = useState(false);

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Reverse geocode whenever clickedMapPoint changes
  useEffect(() => {
    if (!clickedMapPoint) {
      setClickedAddress('');
      return;
    }
    setIsGeocodingPoint(true);
    reverseGeocode(clickedMapPoint.lat, clickedMapPoint.lng).then((addr) => {
      setClickedAddress(addr);
      setIsGeocodingPoint(false);
    });
  }, [clickedMapPoint]);

  // Debounced search for Map Search Bar
  useEffect(() => {
    if (!showMapSearchBar || mapSearchQuery.trim().length < 3) {
      setMapSearchResults([]);
      setIsSearchingMap(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingMap(true);
      const res = await searchAddress(mapSearchQuery, currentCity.name, currentCity.center);
      setMapSearchResults(res);
      setIsSearchingMap(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [mapSearchQuery, showMapSearchBar, currentCity]);
  
  // Real-time navigation simulation state
  const [navStepIndex, setNavStepIndex] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(24);
  const [liveDistanceKm, setLiveDistanceKm] = useState(calculatedRoute?.distanceKm || 4.2);
  const [liveDurationMin, setLiveDurationMin] = useState(calculatedRoute?.durationMinutes || 18);

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: currentCity.center,
        zoom: currentCity.zoom,
        zoomControl: false,
        attributionControl: false
      });

      // Default tile: Google Maps Streets (Standard)
      const tile = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        subdomains: '0123',
        attribution: '&copy; Google Maps'
      }).addTo(map);

      tileLayerRef.current = tile;
      mapInstanceRef.current = map;

      // Handle map clicks
      map.on('click', (e: L.LeafletMouseEvent) => {
        setClickedMapPoint({ lat: e.latlng.lat, lng: e.latlng.lng });
      });

      // Fix container resize on mount
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Change Tile Layer (Google Streets, Google Traffic, Google Satellite Hybrid, Google Terrain, OSM, Voyager)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    let subdomains = '0123';
    let maxZoom = 21;
    let attribution = '&copy; Google Maps';

    if (mapLayer === 'google-traffic') {
      url = 'https://mt{s}.google.com/vt/lyrs=m,traffic&x={x}&y={y}&z={z}';
      subdomains = '0123';
      maxZoom = 21;
      attribution = '&copy; Google Maps Tráfico';
    } else if (mapLayer === 'google-hybrid') {
      url = 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
      subdomains = '0123';
      maxZoom = 21;
      attribution = '&copy; Google Maps Satelital';
    } else if (mapLayer === 'google-terrain') {
      url = 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';
      subdomains = '0123';
      maxZoom = 21;
      attribution = '&copy; Google Maps Terreno';
    } else if (mapLayer === 'osm') {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      subdomains = 'abc';
      maxZoom = 19;
      attribution = '&copy; OpenStreetMap contributors';
    } else if (mapLayer === 'voyager') {
      url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      subdomains = 'abcd';
      maxZoom = 19;
      attribution = '&copy; CartoDB Voyager';
    }

    const newTile = L.tileLayer(url, {
      maxZoom,
      subdomains,
      attribution
    }).addTo(map);

    tileLayerRef.current = newTile;
  }, [mapLayer]);

  // 3. Move map when city changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo(currentCity.center, currentCity.zoom, { duration: 1.2 });
  }, [currentCity]);

  // 4. Update Route Polyline & Markers when route or coordinates change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // A. Origin Marker
    if (originMarkerRef.current) {
      map.removeLayer(originMarkerRef.current);
    }
    const originIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white font-black text-xs">
            A
          </div>
          <div class="absolute -bottom-1 w-2 h-2 bg-emerald-600 rotate-45"></div>
        </div>
      `,
      iconSize: [32, 36],
      iconAnchor: [16, 36]
    });

    const originMarker = L.marker(originCoords, { icon: originIcon }).addTo(map);
    originMarker.bindPopup(`
      <div style="font-family: sans-serif; padding: 4px;">
        <strong style="color: #059669; font-size: 13px;">Punto de Partida (A)</strong><br/>
        <span style="font-size: 12px; color: #334155;">${originName}</span>
      </div>
    `);
    originMarkerRef.current = originMarker;

    // B. Destination Marker
    if (destMarkerRef.current) {
      map.removeLayer(destMarkerRef.current);
    }
    const destIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-8 h-8 rounded-full bg-[#0a193b] border-2 border-white shadow-lg flex items-center justify-center text-white font-black text-xs">
            B
          </div>
          <div class="absolute -bottom-1 w-2 h-2 bg-[#0a193b] rotate-45"></div>
        </div>
      `,
      iconSize: [32, 36],
      iconAnchor: [16, 36]
    });

    const destMarker = L.marker(destinationCoords, { icon: destIcon }).addTo(map);
    destMarker.bindPopup(`
      <div style="font-family: sans-serif; padding: 4px;">
        <strong style="color: #0a193b; font-size: 13px;">Destino Final (B)</strong><br/>
        <span style="font-size: 12px; color: #334155;">${destinationName}</span>
      </div>
    `);
    destMarkerRef.current = destMarker;

    // C. Route Polyline
    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
    }

    const routeCoords = calculatedRoute?.coordinates || [originCoords, destinationCoords];
    
    // Choose color according to selectedRouteId
    const routeColor = 
      selectedRouteId === 'segura' 
        ? '#059669' 
        : selectedRouteId === 'alternativa' 
          ? '#6366f1' 
          : '#0055d4';

    const polyline = L.polyline(routeCoords, {
      color: routeColor,
      weight: 6,
      opacity: 0.9,
      lineJoin: 'round',
      lineCap: 'round',
      dashArray: selectedRouteId === 'alternativa' ? '8, 8' : undefined
    }).addTo(map);

    routePolylineRef.current = polyline;

    // Fit bounds smoothly to include both origin and destination
    try {
      const bounds = L.latLngBounds([originCoords, destinationCoords]);
      map.fitBounds(bounds, { padding: [80, 80], maxZoom: 15 });
    } catch (e) {
      // ignore
    }
  }, [originCoords, destinationCoords, originName, destinationName, calculatedRoute, selectedRouteId]);

  // 5. Realtime Incidents in Colombia
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old incident markers
    incidentMarkersRef.current.forEach(m => map.removeLayer(m));
    incidentMarkersRef.current = [];

    if (!showIncidents) return;

    // Filter incidents matching current area or all in Colombia
    const incidents = REALTIME_COLOMBIA_INCIDENTS;

    incidents.forEach(inc => {
      const isCritical = inc.severity === 'critico';
      const isWorks = inc.severity === 'obras';
      const isDense = inc.severity === 'denso';
      const isSafe = inc.severity === 'seguro';

      const bg = isCritical ? '#dc2626' : isWorks ? '#d97706' : isSafe ? '#059669' : '#475569';
      const symbol = isCritical ? '⚠️' : isWorks ? '🚧' : isSafe ? '🚲' : '🚗';

      const icon = L.divIcon({
        className: 'incident-pin',
        html: `
          <div class="relative group cursor-pointer">
            <div style="background-color: ${bg};" class="w-7 h-7 rounded-xl border-2 border-white shadow-md flex items-center justify-center text-xs text-white transform hover:scale-110 transition-transform">
              ${symbol}
            </div>
            ${isCritical ? '<span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-400 animate-ping"></span>' : ''}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([inc.lat, inc.lng], { icon }).addTo(map);
      marker.on('click', () => {
        setSelectedIncident(inc);
      });
      incidentMarkersRef.current.push(marker);
    });
  }, [showIncidents, currentCity]);

  // 6. Navigation Simulation (commuter marker traveling along route coordinates)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (!isNavigating) {
      if (commuterMarkerRef.current) {
        map.removeLayer(commuterMarkerRef.current);
        commuterMarkerRef.current = null;
      }
      setNavStepIndex(0);
      return;
    }

    const coords = calculatedRoute?.coordinates || [originCoords, destinationCoords];
    if (coords.length === 0) return;

    // Create commuter GPS marker if not exists
    if (!commuterMarkerRef.current) {
      const commuterIcon = L.divIcon({
        className: 'commuter-gps-pin',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute w-12 h-12 rounded-full bg-blue-500/30 animate-ping"></span>
            <div class="w-8 h-8 rounded-full bg-[#0055d4] border-2 border-white shadow-xl flex items-center justify-center text-white">
              <svg class="w-4 h-4 fill-white rotate-45" viewBox="0 0 24 24">
                <path d="M12 2L2 22l10-3 10 3L12 2z"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      commuterMarkerRef.current = L.marker(coords[0], { icon: commuterIcon }).addTo(map);
    }

    const interval = setInterval(() => {
      setNavStepIndex(prev => {
        const nextIndex = prev + 1 >= coords.length ? 0 : prev + 1;
        const currentCoord = coords[nextIndex];
        
        if (commuterMarkerRef.current) {
          commuterMarkerRef.current.setLatLng(currentCoord);
        }

        // Slight speed oscillation for realistic telemetry
        const simulatedSpeed = 22 + Math.floor(Math.sin(nextIndex) * 5);
        setCurrentSpeed(simulatedSpeed);

        // Update remaining stats
        const progress = nextIndex / Math.max(1, coords.length);
        const initialKm = calculatedRoute?.distanceKm || 4.2;
        const initialMin = calculatedRoute?.durationMinutes || 18;

        setLiveDistanceKm(Math.max(0.1, Math.round(initialKm * (1 - progress) * 10) / 10));
        setLiveDurationMin(Math.max(1, Math.round(initialMin * (1 - progress))));

        return nextIndex;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isNavigating, calculatedRoute, originCoords, destinationCoords]);

  // Handle locating user
  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);
          const map = mapInstanceRef.current;
          if (map) {
            map.flyTo(coords, 15, { duration: 1.5 });
            const userIcon = L.divIcon({
              className: 'user-loc-pin',
              html: `
                <div class="relative flex items-center justify-center">
                  <span class="absolute w-10 h-10 rounded-full bg-indigo-500/30 animate-ping"></span>
                  <div class="w-6 h-6 rounded-full bg-indigo-600 border-2 border-white shadow-md flex items-center justify-center text-white">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
              `,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            });
            L.marker(coords, { icon: userIcon })
              .addTo(map)
              .bindPopup('<strong style="color: #4f46e5;">Tu Ubicación Actual</strong>')
              .openPopup();
          }
        },
        (err) => {
          setIsLocating(false);
          // Fallback to Colombia city center
          const map = mapInstanceRef.current;
          if (map) {
            map.flyTo(currentCity.center, 14);
          }
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <div className="relative w-full h-full min-h-[580px] lg:min-h-[640px] bg-slate-100 overflow-hidden font-sans select-none">
      
      {/* 1. The Actual Leaflet Map Canvas */}
      <div 
        ref={mapContainerRef} 
        id="colombia-leaflet-map-canvas" 
        className="w-full h-full absolute inset-0 z-0" 
      />

      {/* 2. Top Bar: Colombia Real-Time Live Status Banner */}
      <div className="absolute top-4 left-4 right-16 sm:right-24 z-10 flex flex-wrap items-center gap-2 pointer-events-auto">
        
        {/* Real-time Indicator Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-xs font-semibold text-slate-800">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Red Vial Colombia</span>
          <span className="text-slate-300">•</span>
          <span className="text-blue-600 font-bold">{currentCity.name}</span>
        </div>

        {/* City Selector Quick Chips */}
        <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md">
          {COLOMBIA_CITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCity(c)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                currentCity.id === c.id
                  ? 'bg-[#0a193b] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Live Active Incident Pill (Clickable) */}
        <div 
          onClick={() => setShowIncidents(!showIncidents)}
          className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 shadow-sm text-xs font-semibold text-amber-900 transition-colors"
          title="Alternar alertas viales"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>{REALTIME_COLOMBIA_INCIDENTS.length} alertas</span>
        </div>

        {/* Search Any Address Button & Dropdown on Map */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMapSearchBar(!showMapSearchBar)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border transition-all cursor-pointer ${
              showMapSearchBar
                ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                : 'bg-white/95 hover:bg-white text-slate-700 border-slate-200/90'
            }`}
            title="Buscar cualquier dirección en el mapa"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Buscar dirección</span>
          </button>

          {showMapSearchBar && (
            <div className="absolute left-0 mt-2 w-72 sm:w-84 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 space-y-2 z-40 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={mapSearchQuery}
                  onChange={(e) => setMapSearchQuery(e.target.value)}
                  placeholder="Calle, carrera o lugar en Colombia..."
                  className="w-full bg-transparent text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  autoFocus
                />
                {isSearchingMap && <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />}
                {mapSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setMapSearchQuery('');
                      setMapSearchResults([]);
                    }}
                    className="text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {mapSearchResults.length > 0 && (
                <ul className="max-h-52 overflow-y-auto divide-y divide-slate-100 rounded-xl bg-white border border-slate-100 text-left">
                  {mapSearchResults.map((place) => (
                    <li key={place.id}>
                      <button
                        type="button"
                        onClick={() => {
                          const map = mapInstanceRef.current;
                          if (map) {
                            map.flyTo(place.coordinates, 16, { duration: 1.2 });
                          }
                          setClickedMapPoint({ lat: place.coordinates[0], lng: place.coordinates[1] });
                          setClickedAddress(`${place.name} — ${place.address}`);
                          setShowMapSearchBar(false);
                        }}
                        className="w-full p-2.5 hover:bg-blue-50/80 text-left flex items-start gap-2.5 group transition-colors cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700 truncate">
                            {place.name}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {place.address}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {mapSearchQuery.trim().length >= 3 && mapSearchResults.length === 0 && !isSearchingMap && (
                <p className="text-[11px] text-slate-500 text-center py-2">
                  No se encontraron resultados para esa dirección.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Top Right: Floating Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        
        {/* Layer Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="w-10 h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-md border border-slate-200/90 transition-transform active:scale-95"
            title="Cambiar capa de mapa (Google Maps, Satélite, Tráfico, Terreno)"
          >
            <Layers className="w-5 h-5 text-slate-700" />
          </button>

          {showLayerMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 space-y-1 text-xs font-semibold z-30 animate-in fade-in zoom-in-95">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>Capas de Google Maps</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">Activo</span>
              </div>

              <button
                onClick={() => { setMapLayer('google-streets'); setShowLayerMenu(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                  mapLayer === 'google-streets' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></span>
                  <span>Google Maps (Calles)</span>
                </div>
                {mapLayer === 'google-streets' && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
              </button>

              <button
                onClick={() => { setMapLayer('google-traffic'); setShowLayerMenu(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                  mapLayer === 'google-traffic' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]"></span>
                  <span>Google Maps (Tráfico en vivo)</span>
                </div>
                {mapLayer === 'google-traffic' && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
              </button>

              <button
                onClick={() => { setMapLayer('google-hybrid'); setShowLayerMenu(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                  mapLayer === 'google-hybrid' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]"></span>
                  <span>Google Maps (Satélite Híbrido)</span>
                </div>
                {mapLayer === 'google-hybrid' && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
              </button>

              <button
                onClick={() => { setMapLayer('google-terrain'); setShowLayerMenu(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                  mapLayer === 'google-terrain' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]"></span>
                  <span>Google Maps (Relieve / Terreno)</span>
                </div>
                {mapLayer === 'google-terrain' && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
              </button>

              <div className="my-1 border-t border-slate-100"></div>
              <div className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Otras capas alternativas
              </div>

              <button
                onClick={() => { setMapLayer('osm'); setShowLayerMenu(false); }}
                className={`w-full text-left px-3 py-1.5 rounded-xl flex items-center justify-between text-xs transition-colors ${
                  mapLayer === 'osm' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>OpenStreetMap</span>
                {mapLayer === 'osm' && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
              </button>

              <button
                onClick={() => { setMapLayer('voyager'); setShowLayerMenu(false); }}
                className={`w-full text-left px-3 py-1.5 rounded-xl flex items-center justify-between text-xs transition-colors ${
                  mapLayer === 'voyager' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>CartoDB Voyager</span>
                {mapLayer === 'voyager' && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
              </button>
            </div>
          )}
        </div>

        {/* Quick Launch in Google Maps */}
        <a
          href={`https://www.google.com/maps/dir/?api=1&origin=${originCoords[0]},${originCoords[1]}&destination=${destinationCoords[0]},${destinationCoords[1]}&travelmode=driving`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center shadow-md border border-slate-200/90 transition-transform active:scale-95 group cursor-pointer"
          title="Abrir esta ruta directamente en Google Maps"
        >
          <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </a>

        {/* Locate User in Colombia */}
        <button
          onClick={handleLocateMe}
          disabled={isLocating}
          className={`w-10 h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-md border border-slate-200/90 transition-transform active:scale-95 ${
            isLocating ? 'animate-pulse text-blue-600' : ''
          }`}
          title="Mi ubicación actual"
        >
          <Crosshair className="w-5 h-5 text-slate-700" />
        </button>

        {/* Zoom In & Out */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200/90 overflow-hidden flex flex-col">
          <button
            onClick={handleZoomIn}
            className="w-10 h-9 hover:bg-slate-50 text-slate-700 flex items-center justify-center border-b border-slate-100 transition-colors"
            title="Acercar"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-9 hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors"
            title="Alejar"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 4. Live Telemetry HUD during Navigation */}
      {isNavigating && (
        <div className="absolute top-20 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-20 animate-in slide-in-from-top-3">
          <div className="bg-[#0a193b]/95 backdrop-blur-md rounded-2xl p-4 text-white shadow-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  Navegación en Vivo
                </span>
              </div>
              <span className="text-xs font-bold text-slate-300">
                {currentSpeed} km/h
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-black tracking-tight">{liveDurationMin} min</div>
                <div className="text-[11px] text-slate-400">{liveDistanceKm} km restantes</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-blue-300">Ruta {selectedRouteId}</div>
                <div className="text-[11px] text-emerald-400">Tráfico fluido</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/10 text-xs font-medium flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-300 shrink-0" />
              <span className="truncate">Hacia: {destinationName}</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Click-to-Point Helper Modal */}
      {clickedMapPoint && onMapClickSetCoords && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-4 animate-in fade-in slide-in-from-bottom-3">
          <div className="bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 text-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {isGeocodingPoint ? (
                    <span className="flex items-center gap-1.5 text-blue-600">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Consultando dirección...
                    </span>
                  ) : (
                    clickedAddress || 'Punto en el mapa'
                  )}
                </h4>
              </div>
              <button 
                onClick={() => setClickedMapPoint(null)}
                className="text-xs text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Coordenadas: {clickedMapPoint.lat.toFixed(4)}, {clickedMapPoint.lng.toFixed(4)}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  const resolved = clickedAddress || `Punto (${clickedMapPoint.lat.toFixed(3)}, ${clickedMapPoint.lng.toFixed(3)})`;
                  onMapClickSetCoords('origin', [clickedMapPoint.lat, clickedMapPoint.lng], resolved);
                  setClickedMapPoint(null);
                }}
                className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-colors cursor-pointer"
              >
                Fijar como Origen (A)
              </button>
              <button
                onClick={() => {
                  const resolved = clickedAddress || `Punto (${clickedMapPoint.lat.toFixed(3)}, ${clickedMapPoint.lng.toFixed(3)})`;
                  onMapClickSetCoords('destination', [clickedMapPoint.lat, clickedMapPoint.lng], resolved);
                  setClickedMapPoint(null);
                }}
                className="py-2.5 px-3 rounded-xl bg-[#0a193b] hover:bg-[#0055d4] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Fijar como Destino (B)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Incident Details Modal when clicked */}
      {selectedIncident && (
        <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-4 sm:w-84 z-30 animate-in fade-in slide-in-from-bottom-3">
          <div className="bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 text-slate-800 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="text-xs font-extrabold uppercase text-slate-800">
                  {selectedIncident.title}
                </span>
              </div>
              <button 
                onClick={() => setSelectedIncident(null)}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedIncident.description}
            </p>

            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="font-semibold text-slate-700">{selectedIncident.location}</span>
              <span className="text-rose-600 font-bold">+{selectedIncident.delayMin} min</span>
            </div>
          </div>
        </div>
      )}

      {/* 7. Bottom Left: Google Maps Branding & Route Quick Launcher */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-0.5 font-black text-xs tracking-tight">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
            <span className="ml-1 text-slate-800 font-bold">Maps</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${originCoords[0]},${originCoords[1]}&destination=${destinationCoords[0]},${destinationCoords[1]}&travelmode=driving`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0055d4] hover:text-[#0040a8] flex items-center gap-1 text-[11px] font-bold hover:underline cursor-pointer"
            title="Abrir esta ruta en Google Maps"
          >
            <span>Ver en Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs text-[11px] text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>Origen</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0a193b]"></span>
            <span>Destino</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>Ruta Activa</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Alertas</span>
          </div>
        </div>
      </div>

    </div>
  );
};
