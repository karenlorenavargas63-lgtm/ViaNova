import { MobilityAlert, EducationCourse, SafetyCampaign, RouteOption, UserProfile, QuizQuestion } from '../types';

export const mockUserProfile: UserProfile = {
  id: 'usr_karen_lorena',
  name: 'Karen Lorena Vargas',
  role: 'Ciudadana Activa • Movilidad Inteligente',
  email: 'karenlorenavargas63@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  city: 'Medellín',
  country: 'Colombia',
  countryCode: '+57',
  countryFlag: '🇨🇴',
  phone: '300 123 4567',
  documentType: 'CC',
  documentNumber: '1020304050',
  vehiclePlate: 'ABC-12D',
  memberSince: 'Octubre 2026',
  authProvider: 'email',
  kmTraveled: 1240,
  safetyScore: 98,
  monthlyStats: {
    routesCompleted: 18,
    totalRoutesGoal: 20,
    educationalModules: 8,
    totalModulesGoal: 10,
    co2SavedKg: 42,
    cyclingKm: 180
  },
  badges: [
    {
      id: 'b1',
      name: 'Ciclista Responsable',
      icon: 'Bike',
      color: 'blue',
      description: 'Más de 100 km recorridos en ciclorrutas seguras.',
      unlockedAt: '15 Oct 2026'
    },
    {
      id: 'b2',
      name: 'Guardián Vial',
      icon: 'ShieldCheck',
      color: 'emerald',
      description: 'Reportó 5 alertas tempranas verificadas por la comunidad.',
      unlockedAt: '18 Oct 2026'
    }
  ]
};

export const mockRouteOptions: RouteOption[] = [
  {
    id: 'rapida',
    name: 'Rápida',
    distance: '4.2 km',
    time: '18 min',
    trafficStatus: 'Tráfico ligero',
    description: 'Recorrido optimizado por avenidas principales de flujo continuo.',
    badgeColor: 'blue',
    safetyRating: 88,
    lightingQuality: 'Alta',
    tollFree: true,
    color: '#2563eb',
    waypoints: [
      { lat: 6.2442, lng: -75.5812, name: 'Punto Origen' },
      { lat: 6.2480, lng: -75.5750, name: 'Av. Las Palmas' },
      { lat: 6.2520, lng: -75.5680, name: 'Punto Destino' }
    ],
    steps: [
      { instruction: 'Dirígete al norte por Av. Paseo Central durante 1.2 km', distance: '1.2 km', icon: 'ArrowUp' },
      { instruction: 'Gira a la derecha en la glorieta hacia Av. Las Palmas', distance: '800 m', icon: 'CornerUpRight' },
      { instruction: 'Continúa por el carril exclusivo de flujo rápido', distance: '1.8 km', icon: 'ArrowUp' },
      { instruction: 'Llegada a tu destino a mano derecha', distance: '400 m', icon: 'MapPin' }
    ]
  },
  {
    id: 'segura',
    name: 'Segura',
    distance: '5.1 km',
    time: '22 min',
    trafficStatus: 'Mayor iluminación y ciclovía protegida',
    description: 'Prioriza calles con alumbrado LED continuo, cámaras y ciclorrutas confinadas.',
    badgeColor: 'emerald',
    safetyRating: 98,
    lightingQuality: 'Alta',
    tollFree: true,
    color: '#059669',
    waypoints: [
      { lat: 6.2442, lng: -75.5812, name: 'Punto Origen' },
      { lat: 6.2460, lng: -75.5830, name: 'Ciclovía Laureles' },
      { lat: 6.2500, lng: -75.5720, name: 'Paseo Peatonal Seguro' },
      { lat: 6.2520, lng: -75.5680, name: 'Punto Destino' }
    ],
    steps: [
      { instruction: 'Incorporación a ciclovía segregada en Cll 33', distance: '1.5 km', icon: 'Bike' },
      { instruction: 'Cruce asistido por semáforo inteligente en Av. 80', distance: '200 m', icon: 'ShieldAlert' },
      { instruction: 'Sigue el corredor iluminado de Parque de los Pies Descalzos', distance: '2.4 km', icon: 'Sun' },
      { instruction: 'Destino alcanzado en zona peatonal segura', distance: '1 km', icon: 'MapPin' }
    ]
  },
  {
    id: 'alternativa',
    name: 'Alternativa',
    distance: '6.0 km',
    time: '26 min',
    trafficStatus: 'Evita obras y peajes',
    description: 'Trayecto periférico por vías secundarias con baja densidad vehicular.',
    badgeColor: 'indigo',
    safetyRating: 82,
    lightingQuality: 'Media',
    tollFree: true,
    color: '#4f46e5',
    waypoints: [
      { lat: 6.2442, lng: -75.5812, name: 'Punto Origen' },
      { lat: 6.2400, lng: -75.5780, name: 'Vía Conectora Sur' },
      { lat: 6.2540, lng: -75.5600, name: 'Punto Destino' }
    ],
    steps: [
      { instruction: 'Toma la variante perimetral para evitar la obra de Av. Insurgentes', distance: '2.5 km', icon: 'Compass' },
      { instruction: 'Mantente en el carril derecho con vista al corredor verde', distance: '2.5 km', icon: 'ArrowUp' },
      { instruction: 'Giro suave a la izquierda en Calle 10', distance: '1.0 km', icon: 'CornerUpLeft' }
    ]
  }
];

export const mockAlerts: MobilityAlert[] = [
  {
    id: 'alt_1',
    type: 'accidente',
    title: 'Accidente múltiple',
    description: 'Colisión que involucra tres vehículos. Carril central y derecho bloqueados. Se esperan demoras significativas de 20 minutos.',
    location: 'Av. Principal esq. Calle 14',
    timeAgo: 'Hace 5 min',
    severity: 'critico',
    severityLabel: 'RIESGO CRÍTICO',
    badgeBg: 'bg-rose-600',
    coordinates: { x: 42, y: 35 },
    verified: true,
    affectedLanes: 'Carril central y derecho',
    alternativeRouteSuggestion: 'Desviar por Av. Circunvalar o Calle 10.',
    image: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'alt_2',
    type: 'obras',
    title: 'Mantenimiento de asfalto',
    description: 'Trabajos de repavimentación y señalización en curso. Reducción a un solo carril de circulación vehicular.',
    location: 'Blvd. de los Insurgentes, Norte',
    timeAgo: 'Hace 45 min',
    severity: 'obras',
    severityLabel: 'OBRAS VIALES',
    badgeBg: 'bg-amber-600',
    coordinates: { x: 68, y: 28 },
    verified: true,
    affectedLanes: 'Reducción de 3 a 1 carril',
    alternativeRouteSuggestion: 'Usar carril de servicio o Eje Central.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'alt_3',
    type: 'trafico',
    title: 'Congestión Vehicular',
    description: 'Avance muy lento debido al alto volumen de vehículos de hora pico. Velocidad promedio reducida a 12 km/h.',
    location: 'Autopista Sur, Km 15',
    timeAgo: 'Hace 15 min',
    severity: 'denso',
    severityLabel: 'TRÁFICO DENSO',
    badgeBg: 'bg-slate-700',
    coordinates: { x: 25, y: 70 },
    verified: true,
    affectedLanes: 'Todos los carriles hacia el norte',
    alternativeRouteSuggestion: 'Tomar la paralela o Metro línea A.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'alt_4',
    type: 'inundacion',
    title: 'Inundación en vía',
    description: 'Acumulación severa de agua pluvial tras tormenta. Paso inhabilitado para vehículos ligeros y ciclistas. Rutas alternas recomendadas.',
    location: 'Paso a desnivel, Centro Histórico',
    timeAgo: 'Hace 2 min',
    severity: 'critico',
    severityLabel: 'RIESGO CRÍTICO',
    badgeBg: 'bg-rose-600',
    coordinates: { x: 55, y: 62 },
    verified: true,
    affectedLanes: 'Calzada completa subterránea',
    alternativeRouteSuggestion: 'Puente superior elevado habilitado con precaución.',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=80'
  }
];

export const mockCourses: EducationCourse[] = [
  {
    id: 'course_1',
    title: 'Navegación Urbana Segura',
    description: 'Aprende los fundamentos para moverte por la ciudad minimizando riesgos. Ideal para nuevos usuarios de micromovilidad y peatones.',
    level: 'Básico',
    category: 'Micromovilidad',
    duration: '2.5 hrs',
    progress: 0,
    recommended: true,
    lessonsCount: 6,
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&auto=format&fit=crop&q=80',
    overview: 'Domina los ángulos ciegos de autobuses, la distancia de frenado segura, la vestimenta de alta visibilidad y el uso de ciclovías compartidas.',
    topics: [
      'Identificación de puntos ciegos vehiculares',
      'Uso correcto de luces y cascos certificados',
      'Convivencia con transporte público masivo',
      'Anticipación a puertas de autos estacionados'
    ]
  },
  {
    id: 'course_2',
    title: 'Dominio de Ciclovías',
    description: 'Conoce las normativas técnicas de circulación en ciclorrutas, señalización de giros con los brazos y respeto a pasos de cebra.',
    level: 'Intermedio',
    category: 'Micromovilidad',
    duration: '45 min',
    progress: 0,
    recommended: false,
    lessonsCount: 4,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80',
    overview: 'Todo lo que necesitas saber para circular en pelotón o solitario con fluidez y cortesía.',
    topics: [
      'Señales manuales de viraje y frenado',
      'Velocidades máximas en carriles bici (25 km/h)',
      'Prioridad al peatón en intersecciones',
      'Mantenimiento básico de frenos y presión de llantas'
    ]
  },
  {
    id: 'course_3',
    title: 'Señales Inteligentes',
    description: 'Aprende a interpretar la semaforización adaptativa, señales dinámicas LED y sistemas de cruce con detección de presencia.',
    level: 'Básico',
    category: 'Normativa Urbana',
    duration: '1.5 hrs',
    progress: 0,
    recommended: false,
    lessonsCount: 5,
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop&q=80',
    overview: 'Descifra la simbología moderna de movilidad sostenible y las zonas 30 en urbes del futuro.',
    topics: [
      'Semáforos peatonales con cuenta regresiva',
      'Señalización de carriles reversibles',
      'Zonas escolares y reducción obligatoria a 20 km/h',
      'Marcas viales termoplásticas y su significado con lluvia'
    ]
  },
  {
    id: 'course_4',
    title: 'Prioridad y Flujo',
    description: 'Estructura de jerarquía vial según la pirámide de movilidad urbana y protocolos de paso en rotondas complejas.',
    level: 'Avanzado',
    category: 'Normativa Urbana',
    duration: '3 hrs',
    progress: 0,
    recommended: false,
    lessonsCount: 8,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&auto=format&fit=crop&q=80',
    overview: 'Comprende cómo los algoritmos de tráfico y la ingeniería vial organizan el derecho de paso en megaciudades.',
    topics: [
      'Pirámide de la movilidad urbana sostenible',
      'Reglas de ingreso y permanencia en glorietas',
      'Carriles preferenciales para buses de tránsito rápido (BRT)',
      'Resolución pacífica de conflictos viales'
    ]
  },
  {
    id: 'course_5',
    title: 'Respuesta a Incidentes',
    description: 'Protocolo PAS (Proteger, Avisar, Socorrer) y uso de la plataforma digital para emitir alertas georreferenciadas con precisión.',
    level: 'Intermedio',
    category: 'Seguridad Peatonal',
    duration: '1.2 hrs',
    progress: 0,
    recommended: false,
    lessonsCount: 4,
    image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=600&auto=format&fit=crop&q=80',
    overview: 'Guía de primeros auxilios viales y comunicación eficaz con los servicios de emergencia de la ciudad.',
    topics: [
      'Protocolo PAS en la vía pública',
      'Cómo asegurar el perímetro del siniestro',
      'Uso del botón de auxilio y SOS en VIANOVA',
      'Documentación fotográfica para peritajes viales'
    ]
  }
];

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Cuál es la primera prioridad en la Pirámide de la Movilidad Urbana?',
    options: [
      { id: 'A', text: 'Vehículos de carga y logística' },
      { id: 'B', text: 'Transporte público masivo' },
      { id: 'C', text: 'Peatones y personas con movilidad reducida' },
      { id: 'D', text: 'Automóviles particulares eléctricos' }
    ],
    correctAnswerId: 'C',
    explanation: 'Los peatones y personas con movilidad reducida se sitúan en la cúspide de la pirámide por ser los usuarios más vulnerables del entorno urbano.'
  },
  {
    id: 2,
    question: 'Al circular en bicicleta o scooter de noche, ¿cuál es la configuración de luces obligatoria?',
    options: [
      { id: 'A', text: 'Luz blanca delantera y luz roja trasera fija o parpadeante' },
      { id: 'B', text: 'Solo chaleco reflectante, las luces son opcionales' },
      { id: 'C', text: 'Luz amarilla en ambos extremos' },
      { id: 'D', text: 'Linterna manual sostenida por el conductor' }
    ],
    correctAnswerId: 'A',
    explanation: 'La normativa internacional exige luz blanca o amarilla frontal para iluminar el camino y luz roja posterior para ser visto por vehículos que se aproximan.'
  },
  {
    id: 3,
    question: '¿Qué debes hacer cuando encuentras una señal de PARE?',
    options: [
      { id: 'A', text: 'Disminuir la velocidad y continuar si no viene nadie por la vía transversal.' },
      { id: 'B', text: 'Tocar la bocina para alertar a otros conductores que vas a cruzar la intersección.' },
      { id: 'C', text: 'Ceder el paso exclusivamente a los vehículos que se aproximan por la derecha.' },
      { id: 'D', text: 'Detenerse por completo antes de la línea de pare o cruce peatonal.' }
    ],
    correctAnswerId: 'D',
    explanation: 'La señal de PARE exige detención total y absoluta de las ruedas del vehículo detrás de la línea de parada para verificar el flujo antes de avanzar.'
  },
  {
    id: 4,
    question: '¿A qué distancia lateral mínima debe adelantar un automóvil a un ciclista en la vía?',
    options: [
      { id: 'A', text: '0.50 metros' },
      { id: 'B', text: '1.50 metros' },
      { id: 'C', text: '3.00 metros' },
      { id: 'D', text: 'No existe distancia reglamentaria' }
    ],
    correctAnswerId: 'B',
    explanation: 'El metro y medio (1.50 m) de distancia de seguridad protege al ciclista de corrientes de succión de aire y desestabilizaciones repentinas.'
  },
  {
    id: 5,
    question: '¿Cuál es la velocidad máxima permitida comúnmente en zonas escolares y hospitalarias?',
    options: [
      { id: 'A', text: '50 km/h' },
      { id: 'B', text: '60 km/h si no hay niños a la vista' },
      { id: 'C', text: '20 km/h o 30 km/h según la reglamentación local' },
      { id: 'D', text: '80 km/h con luces intermitentes' }
    ],
    correctAnswerId: 'C',
    explanation: 'Las zonas escolares exigen reducción a 20 o 30 km/h debido al tiempo de reacción necesario y la impredecibilidad de infantes.'
  }
];

export const mockCampaigns: SafetyCampaign[] = [
  {
    id: 'camp_1',
    title: 'Pasos Inteligentes VIANOVA',
    subtitle: 'Infraestructura de Cruces con Sensores y Balizas LED',
    targetCategory: 'Peatones',
    targetType: 'peatones',
    brandTag: 'VIANOVA SafeCross™',
    hashtag: '#CrucesSegurosVIANOVA',
    description: 'Detección anticipada de peatones en calzada mediante visión artificial y balizas LED dinámicas conectadas a la red de tráfico VIANOVA.',
    fullContent: 'Más del 42% de los incidentes urbanos ocurren en intersecciones peatonales con visibilidad reducida o giros ciegos. El sistema VIANOVA SafeCross activa balizas lumínicas embebidas en el asfalto cuando un peatón ingresa al radio de aproximación, alertando a los vehículos a 100 metros de distancia para garantizar una desaceleración suave y segura.',
    recommendations: [
      'Verifica contacto visual con los conductores antes de descender del andén.',
      'Sigue la trayectoria de las balizas LED activas en la cebra peatonal.',
      'Evita distracciones con pantallas móviles o audífonos al cruzar calzadas activas.',
      'En horario nocturno, aprovecha los tótems de iluminación reactiva VIANOVA.'
    ],
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1000&auto=format&fit=crop&q=80',
    stats: '-54% de siniestros peatonales en cruces intervenidos por VIANOVA',
    signage: {
      code: 'SP-33',
      name: 'Paso Peatonal Cebra',
      type: 'Preventiva',
      description: 'Advierte la proximidad de un cruce peatonal regulado donde el peatón tiene prelación absoluta.',
      meaning: 'Obliga al conductor a reducir la velocidad a 30 km/h o detenerse por completo para ceder el paso.',
      fineInfo: 'Infracción C32 por no ceder el paso preferencial a peatones en cruces demarcados.'
    },
    infographic: {
      headline: 'Impacto de la Detección Activa de Peatones VIANOVA',
      keyMetric: '-54%',
      metricLabel: 'Reducción de atropellos en intersecciones monitoreadas',
      beforeVianova: 'Tiempo de reacción promedio del conductor: 2.8 segundos sin alerta anticipada.',
      afterVianova: 'Tiempo de alerta previa: 4.5 segundos antes de que el peatón pise la línea de carril.',
      reductionPercentage: 54,
      steps: [
        { number: '01', title: 'Detección Sensor IoT', desc: 'Cámaras térmicas y sensores de presión en el bordillo detectan el peatón.' },
        { number: '02', title: 'Balizas LED en Asfalto', desc: 'Se encienden destellos perimetrales sincronizados que alertan a los conductores.' },
        { number: '03', title: 'Cruce Seguro y Monitoreado', desc: 'El algoritmo VIANOVA reporta cruce despejado y reanuda el ciclo semafórico.' }
      ]
    },
    audiovisual: {
      title: 'Cápsula Digital VIANOVA: Cruces Viales Inteligentes',
      duration: '1:45 min',
      summary: 'Descubre en 105 segundos cómo la sincronización de sensores de aproximación salva la vida de más de 300 caminantes al año.',
      scriptAudio: 'En VIANOVA la prioridad es el actor más vulnerable: el peatón. Nuestras balizas de asfalto y radares de velocidad en tiempo real eliminan los puntos ciegos urbanos.',
      simulatedVideoThumb: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1000&auto=format&fit=crop&q=80',
      youtubeId: 'b78K700z3d0'
    },
    simulator: {
      type: 'crosswalk',
      title: 'Simulador de Cruce Inteligente',
      prompt: 'Activa el sensor peatonal para encender las balizas LED y detener el flujo vehicular en la simulación.'
    },
    cta: {
      primary: 'Activar Alertas de Cruce en mi Ruta',
      secondary: 'Firmar Pacto Peatón Seguro',
      actionType: 'crosswalk_demo',
      commitmentPrompt: 'Me comprometo a cruzar siempre por la cebra peatonal y no usar el celular en la calzada.'
    }
  },
  {
    id: 'camp_2',
    title: 'Rueda Seguro: Micromovilidad y Ciclovías VIANOVA',
    subtitle: 'Convivencia Pacífica y Distancia Mínima de 1.5 Metros',
    targetCategory: 'Micromovilidad',
    targetType: 'micromovilidad',
    brandTag: 'VIANOVA VeloShield™',
    hashtag: '#RespetaEl1yMedio',
    description: 'Protocolos de protección para ciclistas y usuarios de scooters eléctricos en corredores compartidos con el tráfico automotor.',
    fullContent: 'El crecimiento de la micromovilidad exige carriles exclusivos demarcados y una estricta cultura de convivencia. La plataforma VIANOVA mapea en tiempo real el aforo ciclista, alertando a los conductores sobre la presencia de bicicletas en curvas y exigiendo el cumplimiento del margen de 1.5 metros al rebasar.',
    recommendations: [
      'Usa siempre casco abrochado homologado y prendas reflectantes de alta luminosidad.',
      'Exige y respeta el radio de 1.5 metros de distancia lateral al adelantar.',
      'Circula exclusivamente por cicloinfraestructura habilitada, nunca por andenes.',
      'Señaliza tus maniobras de giro con el brazo con al menos 3 segundos de anticipación.'
    ],
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1000&auto=format&fit=crop&q=80',
    stats: '+38% en aforo ciclista seguro y -46% de invasión de ciclorrutas',
    signage: {
      code: 'SP-40',
      name: 'Ciclistas en la Vía / Vía Compartida',
      type: 'Preventiva',
      description: 'Informa la presencia constante de bicicletas y vehículos de micromovilidad en la calzada o cruces adyacentes.',
      meaning: 'Exige mantener 1.5 metros de distancia mínima lateral al adelantar y ceder prelación en cambios de carril.',
      fineInfo: 'Infracción C14 por adelantar a ciclistas sin respetar el metro y medio de distancia de seguridad.'
    },
    infographic: {
      headline: 'Espacio Vital y Pacificación de Ciclovías',
      keyMetric: '1.5 m',
      metricLabel: 'Distancia lateral mínima legal para proteger al ciclista',
      beforeVianova: 'Adelantamientos a menos de 60 cm provocaban caídas por efecto de succión aerodinámica.',
      afterVianova: 'Sensores de proximidad VIANOVA notifican a conductores en tiempo real al aproximarse a una ciclorruta.',
      reductionPercentage: 46,
      steps: [
        { number: '01', title: 'Carril Confinado', desc: 'Separadores táctiles y pintura reflectiva verde de alta adherencia.' },
        { number: '02', title: 'Radar de Distancia 1.5 m', desc: 'Dispositivos IoT alertan a buses y carros que invaden el radio protector.' },
        { number: '03', title: 'Semáforo Bici Preferente', desc: 'Fase semafórica de 5 segundos de anticipación para ciclistas en cruces.' }
      ]
    },
    audiovisual: {
      title: 'Cápsula Digital VIANOVA: El 1.5 Metros que Salva Vidas',
      duration: '2:10 min',
      summary: 'La física detrás del rebase a ciclistas y cómo la infraestructura protegida de VIANOVA previene siniestros graves.',
      scriptAudio: 'Una bicicleta no tiene carrocería de protección. Cuando un vehículo rebasa sin respetar 1.5 metros, la masa de aire puede desestabilizar al conductor.',
      simulatedVideoThumb: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1000&auto=format&fit=crop&q=80',
      youtubeId: 'W3_K203jW10'
    },
    simulator: {
      type: 'bike_distance',
      title: 'Simulador de Distancia Lateral 1.5m',
      prompt: 'Ajusta el margen de rebase de tu vehículo para verificar si cumples la distancia legal de seguridad vial.'
    },
    cta: {
      primary: 'Explorar Rutas Ciclistas Protegidas',
      secondary: 'Firmar Compromiso 1.5 Metros',
      actionType: 'cycle_routes',
      commitmentPrompt: 'Me comprometo a respetar siempre 1.5 metros de distancia lateral con los ciclistas al rebasar.'
    }
  },
  {
    id: 'camp_3',
    title: 'Visión Cero: Cero Pantallas al Volante VIANOVA',
    subtitle: 'La Física de la Distracción y los Metros a Ciegas',
    targetCategory: 'Conductores',
    targetType: 'conductores',
    brandTag: 'VIANOVA FocusDrive™',
    hashtag: '#CeroCelularAlVolante',
    description: 'Concientización activa sobre los metros recorridos a ciegas al mirar el celular y tecnología de radar de velocidad urbana.',
    fullContent: 'Revisar una notificación o mensaje en el celular toma en promedio 5 segundos. A 60 km/h, ese lapso significa desplazarse 83.3 metros —casi una cancha de fútbol completa— sin mirar la vía ni anticipar peatones o frenadas repentinas. VIANOVA promueve el Modo Conducción Silencioso y las alertas sonoras predictivas.',
    recommendations: [
      'Coloca tu teléfono en el soporte del tablero y activa el Modo Conducción VIANOVA.',
      'Configura tu destino y música antes de poner el vehículo en marcha.',
      'Si debes responder una llamada o mensaje urgente, estaciónate en un lugar seguro.',
      'Mantén siempre al menos 3 segundos de distancia con el vehículo que te antecede.'
    ],
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1000&auto=format&fit=crop&q=80',
    stats: '-62% de choques por alcance en conductores que activan Modo Concentrado',
    signage: {
      code: 'SR-28',
      name: 'Prohibido Dispositivos Móviles al Conducir',
      type: 'Reglamentaria',
      description: 'Prohíbe terminantemente la manipulación de teléfonos móviles o dispositivos manuales mientras el vehículo esté en movimiento.',
      meaning: 'Cualquier interacción táctil con pantallas multiplica por 23 la probabilidad de colisión.',
      fineInfo: 'Infracción C38: Multa de 15 salarios mínimos diarios legales y retención del vehículo.'
    },
    infographic: {
      headline: 'Metros Recorridos a Ciegas por Segundos de Distracción',
      keyMetric: '83.3 m',
      metricLabel: 'Distancia recorrida a ciegas en 5 segundos a 60 km/h',
      beforeVianova: '8 de cada 10 colisiones urbanas son causadas por distracción digital al volante.',
      afterVianova: 'El asistente VIANOVA bloquea notificaciones emergentes durante desplazamientos vehiculares.',
      reductionPercentage: 62,
      steps: [
        { number: '01', title: '0 a 2 Segundos', desc: 'Pérdida de la visión periférica; el cerebro no procesa las luces de freno del vehículo precedente.' },
        { number: '02', title: '3 a 4 Segundos', desc: 'Desvío involuntario del carril y aumento del 400% en la distancia total de detención.' },
        { number: '03', title: '5 Segundos', desc: 'Equivalente a atravesar un cruce semaforizado completo con los ojos cerrados.' }
      ]
    },
    audiovisual: {
      title: 'Cápsula Digital VIANOVA: Metros a Ciegas',
      duration: '2:30 min',
      summary: 'Demostración práctica de cómo los reflejos humanos colapsan ante una distracción con pantalla a velocidad urbana.',
      scriptAudio: 'Mirar tu celular un instante para leer un mensaje equivale a cruzar una avenida transitada a ciegas. Ningún mensaje vale una vida.',
      simulatedVideoThumb: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1000&auto=format&fit=crop&q=80',
      youtubeId: 'oVqM1vA-r3M'
    },
    simulator: {
      type: 'distraction_calc',
      title: 'Calculadora de Distracción y Metros a Ciegas',
      prompt: 'Elige tu velocidad de circulación y segundos de distracción para ver cuántos metros recorres totalmente a ciegas.'
    },
    cta: {
      primary: 'Calcular Mi Distancia a Ciegas',
      secondary: 'Activar Modo Conducción Segura',
      actionType: 'calc_distraction',
      commitmentPrompt: 'Me comprometo a no tocar el celular mientras conduzco y a mantener mi vista 100% en el camino.'
    }
  },
  {
    id: 'camp_4',
    title: 'Perímetros Escolares Seguros 20 km/h VIANOVA',
    subtitle: 'Protección Integral en Entornos Educativos y Guarderías',
    targetCategory: 'Entorno Escolar',
    targetType: 'escolar',
    brandTag: 'VIANOVA SchoolShield™',
    hashtag: '#EscuelaSegura20kmh',
    description: 'Pacificación de velocidad a 20 km/h y señalización fotoluminiscente en accesos escolares monitoreados por radares pedagógicos.',
    fullContent: 'Los niños y jóvenes tienen menor estatura y un campo de visión periférica un 30% más reducido que un adulto. A 20 km/h, la probabilidad de que un niño sobreviva a un impacto vial es del 98%; sin embargo, a 60 km/h esa posibilidad se desploma al 15%. VIANOVA despliega radares pedagógicos solares en 84 colegios con límites de velocidad dinámicos.',
    recommendations: [
      'Reduce la velocidad obligatoriamente a 20 km/h al ingresar al cuadrante escolar.',
      'Respeta a los monitores de tránsito y agentes escolares de cruce infantil.',
      'Queda terminantemente prohibido estacionar en doble fila en las puertas de las escuelas.',
      'Acompaña a los estudiantes siempre por el andén tomados de la mano.'
    ],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&auto=format&fit=crop&q=80',
    stats: '0 fatalidades en las 84 zonas escolares intervenidas con perímetro VIANOVA',
    signage: {
      code: 'SP-53',
      name: 'Zona Escolar / Niños Jugando',
      type: 'Preventiva',
      description: 'Advierte la proximidad de un centro escolar o parque infantil donde puede haber menores transitando.',
      meaning: 'Velocidad máxima reglamentaria de 20 km/h durante jornadas de entrada y salida académica.',
      fineInfo: 'Infracción C29: Exceso de velocidad en zonas escolares acarrea la máxima penalización legal.'
    },
    infographic: {
      headline: 'Probabilidad de Supervivencia Infantil según la Velocidad',
      keyMetric: '98%',
      metricLabel: 'Supervivencia a 20 km/h frente a solo 15% a 60 km/h',
      beforeVianova: 'Vehículos transitaban a 50 km/h por frentes de colegios con frenadas sobre el paso cebra.',
      afterVianova: 'Corredores escolares pacificados con reductores trapezoidales y radares pedagógicos dinámicos.',
      reductionPercentage: 83,
      steps: [
        { number: '01', title: 'A 20 km/h', desc: 'Distancia de frenado de solo 6 metros. 98% de probabilidad de sobrevivir sin secuelas.' },
        { number: '02', title: 'A 40 km/h', desc: 'Distancia de frenado sube a 18 metros. El riesgo de lesiones severas se cuadruplica.' },
        { number: '03', title: 'A 60 km/h', desc: 'Distancia de frenado supera los 35 metros. Impacto devastador con 85% de letalidad.' }
      ]
    },
    audiovisual: {
      title: 'Cápsula Digital VIANOVA: 20 km/h por Nuestros Niños',
      duration: '1:55 min',
      summary: 'Por qué bajar de 50 a 20 km/h marca la diferencia entre un susto menor y una tragedia irreversible frente a un colegio.',
      scriptAudio: 'En una zona escolar, cada kilómetro por hora adicional cuesta vidas. En VIANOVA protegemos a los más pequeños reduciendo la velocidad a 20 km/h.',
      simulatedVideoThumb: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&auto=format&fit=crop&q=80',
      youtubeId: 'X94gG2H9T6E'
    },
    simulator: {
      type: 'school_speed',
      title: 'Simulador de Frenado en Zona Escolar',
      prompt: 'Compara la distancia de detención de un vehículo a 20 km/h frente a 50 km/h cuando un niño cruza la vía.'
    },
    cta: {
      primary: 'Ver Zonas Escolares Pacificadas',
      secondary: 'Firmar Pacto Conductor Escolar',
      actionType: 'school_zones',
      commitmentPrompt: 'Me comprometo a reducir a 20 km/h la velocidad siempre que transite frente a un colegio o parque infantil.'
    }
  },
  {
    id: 'camp_5',
    title: 'Luz y Movimiento 360°: Visibilidad Nocturna VIANOVA',
    subtitle: 'Tecnología Retrorreflectiva y Detección Térmica en Tránsito',
    targetCategory: 'Nocturno',
    targetType: 'nocturno',
    brandTag: 'VIANOVA NightBeam™',
    hashtag: '#HazteVisibleDeNoche',
    description: 'Protocolos de visibilidad 360° para ciclistas, motociclistas y peatones con prendas reflectivas y faros de alta luminancia.',
    fullContent: 'Durante la noche y la lluvia, el ojo humano pierde hasta un 70% de su capacidad para percibir contrastes y profundidad. Un conductor con luces bajas que viaja a 50 km/h divisa a un peatón con ropa oscura a escasos 25 metros (menos de 2 segundos de reacción). Con prendas reflectantes certificadas y el sensor NightBeam de VIANOVA, la distancia de visibilidad aumenta a 150 metros.',
    recommendations: [
      'Viste chalecos o bandas reflectivas en extremidades (tobillos y brazos) para reflejar movimiento.',
      'Equipa tu bicicleta o scooter con luz delantera blanca fija y luz trasera roja destellante.',
      'Verifica la alineación e intensidad de las luces de tu vehículo para no encandilar.',
      'Reporta en la app VIANOVA los puntos ciegos urbanos con luminarias públicas averiadas.'
    ],
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&auto=format&fit=crop&q=80',
    stats: '5 veces mayor distancia de detección para ciclistas con prendas reflectivas 360°',
    signage: {
      code: 'SP-37',
      name: 'Zona Iluminada / Tránsito Nocturno',
      type: 'Preventiva',
      description: 'Alerta sobre la transición a vías con iluminación variable y presencia de peatones y ciclistas nocturnos.',
      meaning: 'Obliga al uso ininterrumpido de luces reglamentarias y a moderar la velocidad ante menor campo de visión.',
      fineInfo: 'Infracción C24: Transitar de noche sin luces reglamentarias o reflectivos homologados.'
    },
    infographic: {
      headline: 'Distancia de Reconocimiento Visual Nocturno',
      keyMetric: '150 m',
      metricLabel: 'Distancia de visibilidad con reflectivos frente a 25 m con ropa oscura',
      beforeVianova: 'Peatones vestidos de oscuro divisados a 25 metros: colisión casi inevitable a 50 km/h.',
      afterVianova: 'Reflectivos activos + sensores térmicos VIANOVA en cruces: detección garantizada a 150 metros.',
      reductionPercentage: 75,
      steps: [
        { number: '01', title: 'Ropa Oscura (25 m)', desc: 'Menos de 1.8 segundos para reaccionar. 80% de probabilidad de atropello.' },
        { number: '02', title: 'Ropa Blanca (55 m)', desc: 'Apenas 3.5 segundos. Frenada brusca con riesgo de choque por alcance.' },
        { number: '03', title: 'Reflectivo 360° (150 m)', desc: 'Más de 10 segundos para desacelerar con suavidad y seguridad absoluta.' }
      ]
    },
    audiovisual: {
      title: 'Cápsula Digital VIANOVA: Física de la Visibilidad Nocturna',
      duration: '2:05 min',
      summary: 'Experimento óptico de campo: cómo ven los conductores la calzada de noche con y sin elementos reflectivos.',
      scriptAudio: 'La noche engaña a los ojos. En VIANOVA iluminamos las vías y enseñamos el poder salvavidas del material retrorreflectivo.',
      simulatedVideoThumb: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&auto=format&fit=crop&q=80',
      youtubeId: 'qR_K9M1xX2Q'
    },
    simulator: {
      type: 'night_toggle',
      title: 'Simulador de Visibilidad Nocturna',
      prompt: 'Alterna entre el modo con reflectivo y sin reflectivo para experimentar la perspectiva real del conductor de noche.'
    },
    cta: {
      primary: 'Probar Simulador Nocturno',
      secondary: 'Firmar Pacto de Visibilidad 360°',
      actionType: 'night_demo',
      commitmentPrompt: 'Me comprometo a utilizar prendas reflectivas y luces operativas siempre que transite de noche.'
    }
  },
  {
    id: 'camp_6',
    title: 'Red de Semáforos Inteligentes IoT VIANOVA',
    subtitle: 'Gestión de Tráfico Adaptativo, Onda Verde y Menos Emisiones',
    targetCategory: 'Infraestructura',
    targetType: 'infraestructura',
    brandTag: 'VIANOVA FlowMatrix™',
    hashtag: '#TránsitoFluidoVIANOVA',
    description: 'Controladores semafóricos sincronizados con inteligencia artificial para priorizar transporte público y despejar trancones.',
    fullContent: 'Los trancones generan pérdidas millonarias y aumentan el estrés y la agresividad al volante. La red VIANOVA FlowMatrix interconecta más de 450 intersecciones semaforizadas con algoritmos de onda verde adaptativa que ajustan los tiempos de luz verde según la densidad real del flujo vehicular medida por sensores ópticos y radares doppler.',
    recommendations: [
      'Respeta rigurosamente las marcas de zona antibloqueo (malla amarilla en intersección).',
      'Mantén la velocidad sugerida por los paneles viales para ingresar en la onda verde continua.',
      'No aceleres ante la luz amarilla; prepárate para detenerte con antelación.',
      'Cede el paso al transporte masivo y vehículos de emergencia que cuentan con prioridad semafórica.'
    ],
    image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=1000&auto=format&fit=crop&q=80',
    stats: '-34% en tiempos de espera en trancones y -28% en emisiones contaminantes por ralentí',
    signage: {
      code: 'SP-34',
      name: 'Semáforo Próximo / Intersección Conectada',
      type: 'Preventiva',
      description: 'Indica la cercanía a una intersección regulada por semáforos inteligentes de ciclo dinámico.',
      meaning: 'Advierte anticipadamente los cambios de fase y regula el cruce ordenado de los diferentes flujos viales.',
      fineInfo: 'Infracción D04: Pasarse un semáforo en rojo o amarillo genera fotomulta y suspensión preventiva.'
    },
    infographic: {
      headline: 'Eficiencia de la Onda Verde Inteligente VIANOVA',
      keyMetric: '-34%',
      metricLabel: 'Reducción de demoras por congestión en corredores principales',
      beforeVianova: 'Semáforos con temporizadores fijos causaban trancones en calzadas vacías en contrasentido.',
      afterVianova: 'Algoritmos IoT de tiempo real ajustan la duración del verde dinámicamente según la demanda vehicular.',
      reductionPercentage: 34,
      steps: [
        { number: '01', title: 'Medición de Aforo IoT', desc: 'Radares doppler miden el volumen de vehículos por carril segundo a segundo.' },
        { number: '02', title: 'Cálculo de Onda Verde', desc: 'La central VIANOVA calcula la velocidad óptima para sincronizar luces en secuencia.' },
        { number: '03', title: 'Fluidez y Menor Emisión', desc: 'Los vehículos avanzan a velocidad constante reduciendo el arranque y frenada continua.' }
      ]
    },
    audiovisual: {
      title: 'Cápsula Digital VIANOVA: Cómo Funciona la Onda Verde IoT',
      duration: '2:15 min',
      summary: 'Visualiza la red neuronal urbana de VIANOVA y cómo la sincronización de semáforos elimina las colas de tráfico.',
      scriptAudio: 'Un semáforo tradicional solo cuenta segundos. Los semáforos VIANOVA leen la ciudad, escuchan la demanda y crean corredores verdes ininterrumpidos.',
      simulatedVideoThumb: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=1000&auto=format&fit=crop&q=80',
      youtubeId: 'pS41FqG8c2w'
    },
    simulator: {
      type: 'smart_signals',
      title: 'Simulador de Onda Verde de Semáforos',
      prompt: 'Activa la sincronización adaptativa VIANOVA para coordinar 3 intersecciones y despejar el atasco vehicular.'
    },
    cta: {
      primary: 'Probar Simulador de Onda Verde',
      secondary: 'Consultar Estado de Corredores',
      actionType: 'traffic_matrix',
      commitmentPrompt: 'Me comprometo a nunca bloquear la malla amarilla de una intersección semaforizada.'
    }
  }
];

export const mockPillars = [
  {
    id: 'tecnologia',
    title: 'Tecnología',
    iconName: 'Cpu',
    description: 'Implementamos sensores inteligentes y análisis de datos en tiempo real para optimizar los flujos de tráfico y reducir emisiones. Nuestra plataforma se integra con la infraestructura existente para una gestión urbana proactiva.',
    color: 'from-blue-600 to-indigo-600',
    details: [
      'Sensores IoT de conteo y velocidad en vías clave',
      'Algoritmos predictivos de descongestión',
      'Detección automática de incidentes y baches',
      'Integración abierta con sistemas de emergencia 911 / 123'
    ]
  },
  {
    id: 'movilidad',
    title: 'Movilidad',
    iconName: 'Navigation',
    description: 'Diseñamos rutas eficientes y promovemos alternativas de transporte sostenible. Fomentamos la intermodalidad para que los ciudadanos puedan moverse de forma fluida y segura.',
    color: 'from-emerald-600 to-teal-600',
    details: [
      'Cálculo de rutas multimodales (Metro + Bici + A pie)',
      'Mapas de seguridad con índice de iluminación y ciclovías',
      'Monitor de tiempos de espera de transporte en vivo',
      'Calculadora de huella de carbono y ahorro de combustible'
    ]
  },
  {
    id: 'educacion',
    title: 'Educación',
    iconName: 'GraduationCap',
    description: 'Creemos en la formación cívica como pilar de la seguridad vial. Desarrollamos campañas y módulos educativos interactivos para concientizar a peatones, ciclistas y conductores.',
    color: 'from-amber-500 to-orange-600',
    details: [
      'Cursos certificados por niveles (Básico a Avanzado)',
      'Evaluaciones interactivas con casos reales',
      'Campañas de concientización ciudadana segmentadas',
      'Insignias y recompensas gamificadas para usuarios responsables'
    ]
  }
];
