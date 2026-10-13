export interface LiveTrafficAlert {
  id: string;
  title: string;
  description: string;
  location: string;
  city: 'Medellín' | 'Bogotá' | 'Cali' | 'Barranquilla' | 'Bucaramanga';
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'accidente' | 'obras' | 'trafico' | 'inundacion' | 'peligro_vial';
  severity: 'critico' | 'obras' | 'denso' | 'moderado';
  severityLabel: string;
  badgeBg: string;
  source: 'both' | 'waze' | 'google_maps';
  sourceLabel: string;
  wazeConfirmations: number;
  googleTrafficStatus: 'fluido' | 'moderado' | 'pesado' | 'detenido';
  googleDelayMinutes: number;
  currentSpeedKmH: number;
  usualSpeedKmH: number;
  timeAgo: string;
  affectedLanes: string;
  alternativeRoute: string;
  image: string;
  wazeUrl: string;
  googleMapsUrl: string;
  verified: boolean;
}

export const LIVE_TRAFFIC_ALERTS: LiveTrafficAlert[] = [
  {
    id: 'wz_med_1',
    title: 'Accidente múltiple y bloqueo parcial',
    description: 'Colisión entre dos vehículos particulares y una motocicleta. Reportado y confirmado por múltiples conductores en Waze y verificado por capa de tráfico de Google Maps.',
    location: 'Autopista Sur altura Puente Guayabal (Cra 50 con Cll 10)',
    city: 'Medellín',
    coordinates: {
      lat: 6.2185,
      lng: -75.5835
    },
    type: 'accidente',
    severity: 'critico',
    severityLabel: 'RIESGO CRÍTICO',
    badgeBg: 'bg-rose-600',
    source: 'both',
    sourceLabel: 'Google Maps & Waze en vivo',
    wazeConfirmations: 24,
    googleTrafficStatus: 'detenido',
    googleDelayMinutes: 26,
    currentSpeedKmH: 7,
    usualSpeedKmH: 50,
    timeAgo: 'Hace 4 min',
    affectedLanes: 'Carriles central e izquierdo bloqueados',
    alternativeRoute: 'Desviar hacia Av. El Poblado (Cra 43A) o Av. Guayabal por Calle 10.',
    image: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=600&auto=format&fit=crop&q=80',
    wazeUrl: 'https://www.waze.com/ul?ll=6.2185,-75.5835&navigate=yes',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=6.2185,-75.5835',
    verified: true
  },
  {
    id: 'wz_med_2',
    title: 'Obras viales y reducción de carril',
    description: 'Mantenimiento de carpeta asfáltica y adecuación de separador verde. Google Maps reporta tramo en color naranja con avance a paso lento.',
    location: 'Av. Las Vegas (Cra 48) con Calle 10, El Poblado',
    city: 'Medellín',
    coordinates: {
      lat: 6.2095,
      lng: -75.5715
    },
    type: 'obras',
    severity: 'obras',
    severityLabel: 'OBRAS VIALES',
    badgeBg: 'bg-amber-600',
    source: 'google_maps',
    sourceLabel: 'Google Maps Tráfico',
    wazeConfirmations: 12,
    googleTrafficStatus: 'pesado',
    googleDelayMinutes: 14,
    currentSpeedKmH: 15,
    usualSpeedKmH: 45,
    timeAgo: 'Hace 18 min',
    affectedLanes: 'Calzada occidental reducida a 1 carril',
    alternativeRoute: 'Utilizar vía paralela Av. Regional o Calle 14.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80',
    wazeUrl: 'https://www.waze.com/ul?ll=6.2095,-75.5715&navigate=yes',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=6.2095,-75.5715',
    verified: true
  },
  {
    id: 'wz_bog_1',
    title: 'Congestión extrema y encharcamiento pluvial',
    description: 'Fuerte aguacero generó acumulación de agua pluvial en calzada rápida. Waze reporta más de 38 alertas de usuarios y velocidad promedio por debajo de 10 km/h.',
    location: 'Autopista Norte con Calle 170 (sentido Sur-Norte)',
    city: 'Bogotá',
    coordinates: {
      lat: 4.7520,
      lng: -74.0450
    },
    type: 'inundacion',
    severity: 'critico',
    severityLabel: 'RIESGO CRÍTICO',
    badgeBg: 'bg-rose-600',
    source: 'both',
    sourceLabel: 'Google Maps & Waze en vivo',
    wazeConfirmations: 38,
    googleTrafficStatus: 'detenido',
    googleDelayMinutes: 34,
    currentSpeedKmH: 6,
    usualSpeedKmH: 60,
    timeAgo: 'Hace 6 min',
    affectedLanes: 'Calzada central sumergida parcialmente',
    alternativeRoute: 'Tomar Carrera 7ma o Carrera 9na hacia el norte.',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
    wazeUrl: 'https://www.waze.com/ul?ll=4.7520,-74.0450&navigate=yes',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=4.7520,-74.0450',
    verified: true
  },
  {
    id: 'wz_bog_2',
    title: 'Obras de infraestructura Metro Línea 1',
    description: 'Cierres programados y desvíos por izaje de vigas. Monitoreado en tiempo real con agentes de tránsito distritales.',
    location: 'Av. Caracas con Calle 45, Chapinero',
    city: 'Bogotá',
    coordinates: {
      lat: 4.6342,
      lng: -74.0675
    },
    type: 'obras',
    severity: 'obras',
    severityLabel: 'OBRAS VIALES',
    badgeBg: 'bg-amber-600',
    source: 'google_maps',
    sourceLabel: 'Google Maps Tráfico',
    wazeConfirmations: 19,
    googleTrafficStatus: 'pesado',
    googleDelayMinutes: 18,
    currentSpeedKmH: 12,
    usualSpeedKmH: 40,
    timeAgo: 'Hace 25 min',
    affectedLanes: 'Calzadas mixtas cerradas, paso exclusivo TransMilenio',
    alternativeRoute: 'Desvíos señalizados por Carrera 13 y Carrera 7ma.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&auto=format&fit=crop&q=80',
    wazeUrl: 'https://www.waze.com/ul?ll=4.6342,-74.0675&navigate=yes',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=4.6342,-74.0675',
    verified: true
  },
  {
    id: 'wz_cali_1',
    title: 'Tráfico lento por aforo en corredor masivo',
    description: 'Congestión vehicular densa reportada por conductores en Waze. Flujo lento en inmediaciones de estación Manzana del Saber.',
    location: 'Calle 5ta con Carrera 15, Sector San Fernando',
    city: 'Cali',
    coordinates: {
      lat: 3.4420,
      lng: -76.5380
    },
    type: 'trafico',
    severity: 'denso',
    severityLabel: 'TRÁFICO DENSO',
    badgeBg: 'bg-slate-700',
    source: 'waze',
    sourceLabel: 'Reportado en Waze (17 conductores)',
    wazeConfirmations: 17,
    googleTrafficStatus: 'pesado',
    googleDelayMinutes: 11,
    currentSpeedKmH: 14,
    usualSpeedKmH: 45,
    timeAgo: 'Hace 8 min',
    affectedLanes: 'Todos los carriles en sentido sur',
    alternativeRoute: 'Tomar Calle 6ta o Av. Roosevelt.',
    image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=600&auto=format&fit=crop&q=80',
    wazeUrl: 'https://www.waze.com/ul?ll=3.4420,-76.5380&navigate=yes',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=3.4420,-76.5380',
    verified: true
  },
  {
    id: 'wz_med_3',
    title: 'Derrame de aceite y calzada resbaladiza',
    description: 'Alerta crítica de la comunidad en Waze para motociclistas y ciclistas. Bomberos y defensa civil en ruta para aplicación de material absorbente.',
    location: 'Vía Las Palmas Km 7, Sector Chuscalito',
    city: 'Medellín',
    coordinates: {
      lat: 6.2120,
      lng: -75.5450
    },
    type: 'peligro_vial',
    severity: 'critico',
    severityLabel: 'RIESGO CRÍTICO',
    badgeBg: 'bg-rose-600',
    source: 'waze',
    sourceLabel: 'Reportado en Waze (15 alertas)',
    wazeConfirmations: 15,
    googleTrafficStatus: 'pesado',
    googleDelayMinutes: 9,
    currentSpeedKmH: 18,
    usualSpeedKmH: 60,
    timeAgo: 'Hace 2 min',
    affectedLanes: 'Carril de descenso hacia Medellín',
    alternativeRoute: 'Descender por la Loma del Escobero o Vía Santa Elena con precaución.',
    image: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=600&auto=format&fit=crop&q=80',
    wazeUrl: 'https://www.waze.com/ul?ll=6.2120,-75.5450&navigate=yes',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=6.2120,-75.5450',
    verified: true
  }
];
