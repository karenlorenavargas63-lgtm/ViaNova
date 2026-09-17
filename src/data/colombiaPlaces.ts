export interface ColombiaPlace {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  category: 'landmark' | 'transit' | 'park' | 'avenue' | 'center';
}

export interface ColombiaCity {
  id: string;
  name: string;
  department: string;
  center: [number, number];
  zoom: number;
  popularRoutes: {
    origin: ColombiaPlace;
    destination: ColombiaPlace;
    name: string;
  }[];
}

export const COLOMBIA_CITIES: ColombiaCity[] = [
  {
    id: 'medellin',
    name: 'Medellín',
    department: 'Antioquia',
    center: [6.2442, -75.5812],
    zoom: 13,
    popularRoutes: [
      {
        name: 'El Poblado ➔ Plaza Mayor',
        origin: {
          id: 'med_poblado',
          name: 'Parque de El Poblado',
          address: 'Cra. 43A con Calle 9, El Poblado',
          city: 'Medellín',
          lat: 6.2088,
          lng: -75.5678,
          category: 'landmark'
        },
        destination: {
          id: 'med_plazamayor',
          name: 'Plaza Mayor / La Alpujarra',
          address: 'Calle 41 #55-80, Centro',
          city: 'Medellín',
          lat: 6.2432,
          lng: -75.5746,
          category: 'center'
        }
      },
      {
        name: 'Laureles ➔ Jardín Botánico',
        origin: {
          id: 'med_laureles',
          name: 'Primer Parque de Laureles',
          address: 'Circular 4 con Cra. 73',
          city: 'Medellín',
          lat: 6.2458,
          lng: -75.5925,
          category: 'park'
        },
        destination: {
          id: 'med_botanico',
          name: 'Jardín Botánico de Medellín',
          address: 'Calle 73 #51D-14',
          city: 'Medellín',
          lat: 6.2708,
          lng: -75.5638,
          category: 'park'
        }
      },
      {
        name: 'Envigado ➔ Ciudad del Río',
        origin: {
          id: 'med_envigado',
          name: 'Parque Principal de Envigado',
          address: 'Cra. 42 #37 Sur',
          city: 'Medellín',
          lat: 6.1706,
          lng: -75.5872,
          category: 'landmark'
        },
        destination: {
          id: 'med_ciudadrio',
          name: 'Parque Ciudad del Río',
          address: 'Calle 19A #44-25',
          city: 'Medellín',
          lat: 6.2235,
          lng: -75.5744,
          category: 'park'
        }
      }
    ]
  },
  {
    id: 'bogota',
    name: 'Bogotá D.C.',
    department: 'Cundinamarca',
    center: [4.6533, -74.0836],
    zoom: 12,
    popularRoutes: [
      {
        name: 'Parque de la 93 ➔ Plaza de Bolívar',
        origin: {
          id: 'bog_93',
          name: 'Parque de la 93',
          address: 'Calle 93A #11A-41, Chapinero',
          city: 'Bogotá',
          lat: 4.6768,
          lng: -74.0531,
          category: 'park'
        },
        destination: {
          id: 'bog_bolivar',
          name: 'Plaza de Bolívar / Centro Histórico',
          address: 'Carrera 7 con Calle 11',
          city: 'Bogotá',
          lat: 4.5981,
          lng: -74.0758,
          category: 'center'
        }
      },
      {
        name: 'Usaquén ➔ Corferias',
        origin: {
          id: 'bog_usaquen',
          name: 'Parque de Usaquén',
          address: 'Cra. 6A con Calle 119',
          city: 'Bogotá',
          lat: 4.6975,
          lng: -74.0322,
          category: 'landmark'
        },
        destination: {
          id: 'bog_corferias',
          name: 'Centro Internacional Corferias',
          address: 'Cra. 37 #24-67',
          city: 'Bogotá',
          lat: 4.6294,
          lng: -74.0898,
          category: 'center'
        }
      }
    ]
  },
  {
    id: 'cali',
    name: 'Cali',
    department: 'Valle del Cauca',
    center: [3.4516, -76.5320],
    zoom: 13,
    popularRoutes: [
      {
        name: 'Granada ➔ San Antonio',
        origin: {
          id: 'cali_granada',
          name: 'Zona Rosa Granada',
          address: 'Av. 9 Norte',
          city: 'Cali',
          lat: 3.4598,
          lng: -76.5328,
          category: 'avenue'
        },
        destination: {
          id: 'cali_sanantonio',
          name: 'Colina de San Antonio',
          address: 'Cra. 10 con Calle 1 Oeste',
          city: 'Cali',
          lat: 3.4475,
          lng: -76.5412,
          category: 'landmark'
        }
      }
    ]
  },
  {
    id: 'barranquilla',
    name: 'Barranquilla',
    department: 'Atlántico',
    center: [10.9685, -74.7813],
    zoom: 13,
    popularRoutes: [
      {
        name: 'El Prado ➔ Gran Malecón del Río',
        origin: {
          id: 'baq_prado',
          name: 'Barrio El Prado',
          address: 'Cra. 54 con Calle 58',
          city: 'Barranquilla',
          lat: 10.9984,
          lng: -74.7955,
          category: 'landmark'
        },
        destination: {
          id: 'baq_malecon',
          name: 'Gran Malecón del Río Magdalena',
          address: 'Vía 40 con Calle 79',
          city: 'Barranquilla',
          lat: 11.0182,
          lng: -74.7885,
          category: 'park'
        }
      }
    ]
  },
  {
    id: 'bucaramanga',
    name: 'Bucaramanga',
    department: 'Santander',
    center: [7.1193, -73.1227],
    zoom: 13,
    popularRoutes: [
      {
        name: 'Cabecera ➔ Centro Histórico',
        origin: {
          id: 'bga_cabecera',
          name: 'Cabecera del Llano',
          address: 'Cra. 33 con Calle 48',
          city: 'Bucaramanga',
          lat: 7.1165,
          lng: -73.1112,
          category: 'center'
        },
        destination: {
          id: 'bga_centro',
          name: 'Parque Santander / Centro',
          address: 'Calle 36 con Cra. 19',
          city: 'Bucaramanga',
          lat: 7.1245,
          lng: -73.1258,
          category: 'landmark'
        }
      }
    ]
  }
];

export interface RealtimeIncident {
  id: string;
  type: 'accidente' | 'obras' | 'trafico' | 'ciclovia' | 'clima';
  city: string;
  title: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  timeAgo: string;
  severity: 'critico' | 'obras' | 'denso' | 'seguro';
  delayMin: number;
}

export const REALTIME_COLOMBIA_INCIDENTS: RealtimeIncident[] = [
  {
    id: 'inc_med_1',
    type: 'obras',
    city: 'Medellín',
    title: 'Obras de repavimentación y ciclorruta',
    description: 'Trabajos de mantenimiento en calzada lateral. Carril derecho restringido con paso regulado.',
    location: 'Av. Las Vegas con Calle 10, El Poblado',
    lat: 6.2095,
    lng: -75.5715,
    timeAgo: 'Hace 8 min',
    severity: 'obras',
    delayMin: 6
  },
  {
    id: 'inc_med_2',
    type: 'trafico',
    city: 'Medellín',
    title: 'Congestión en Autopista Sur',
    description: 'Tráfico denso en sentido norte-sur por alta afluencia vehicular en hora pico.',
    location: 'Autopista Sur altura Puente Guayabal',
    lat: 6.2220,
    lng: -75.5840,
    timeAgo: 'Hace 4 min',
    severity: 'denso',
    delayMin: 12
  },
  {
    id: 'inc_med_3',
    type: 'ciclovia',
    city: 'Medellín',
    title: 'Corredor Ciclovía Segura Activo',
    description: 'Ciclovía con monitoreo en tiempo real, agentes viales de VIANOVA y puntos de hidratación.',
    location: 'Corredor Verde Av. El Poblado (Cra 43A)',
    lat: 6.2280,
    lng: -75.5710,
    timeAgo: 'En vivo',
    severity: 'seguro',
    delayMin: 0
  },
  {
    id: 'inc_med_4',
    type: 'accidente',
    city: 'Medellín',
    title: 'Colisión vehicular menor',
    description: 'Agentes de tránsito en el lugar atendiendo despeje de vía. Se recomienda desvío por Calle 33.',
    location: 'San Juan (Calle 44) con Cra. 65',
    lat: 6.2485,
    lng: -75.5860,
    timeAgo: 'Hace 15 min',
    severity: 'critico',
    delayMin: 10
  },
  {
    id: 'inc_bog_1',
    type: 'obras',
    city: 'Bogotá',
    title: 'Obras de infraestructura Metro Línea 1',
    description: 'Desvíos señalizados por calzada oriental en Av. Caracas.',
    location: 'Av. Caracas con Calle 45',
    lat: 4.6342,
    lng: -74.0675,
    timeAgo: 'Hace 20 min',
    severity: 'obras',
    delayMin: 15
  },
  {
    id: 'inc_bog_2',
    type: 'ciclovia',
    city: 'Bogotá',
    title: 'Ciclorruta Segura Carrera 7ma',
    description: 'Corredor preferencial para ciclistas con patrullaje y conteo inteligente de flujo.',
    location: 'Carrera 7 con Calle 72',
    lat: 4.6560,
    lng: -74.0560,
    timeAgo: 'En vivo',
    severity: 'seguro',
    delayMin: 0
  },
  {
    id: 'inc_cali_1',
    type: 'trafico',
    city: 'Cali',
    title: 'Tráfico pesado Calle 5ta',
    description: 'Flujo vehicular lento en inmediaciones de estación Manzana del Saber.',
    location: 'Calle 5ta con Cra. 15',
    lat: 3.4420,
    lng: -76.5380,
    timeAgo: 'Hace 10 min',
    severity: 'denso',
    delayMin: 8
  }
];
