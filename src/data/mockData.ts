import { MobilityAlert, EducationCourse, SafetyCampaign, RouteOption, UserProfile, QuizQuestion } from '../types';

export const mockUserProfile: UserProfile = {
  id: 'usr_new',
  name: '',
  role: 'Ciudadano',
  email: '',
  avatar: '',
  city: '',
  memberSince: 'Septiembre 2026',
  kmTraveled: 0,
  safetyScore: 0,
  monthlyStats: {
    routesCompleted: 0,
    totalRoutesGoal: 20,
    educationalModules: 0,
    totalModulesGoal: 10,
    co2SavedKg: 0,
    cyclingKm: 0
  },
  badges: []
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
      { id: 'B', text: 'Peatones y personas con movilidad reducida' },
      { id: 'C', text: 'Transporte público masivo' },
      { id: 'D', text: 'Automóviles particulares eléctricos' }
    ],
    correctAnswerId: 'B',
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
      { id: 'B', text: 'Detenerse por completo antes de la línea de pare o cruce peatonal.' },
      { id: 'C', text: 'Tocar la bocina para alertar a otros conductores que vas a cruzar la intersección.' },
      { id: 'D', text: 'Ceder el paso exclusivamente a los vehículos que se aproximan por la derecha.' }
    ],
    correctAnswerId: 'B',
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
      { id: 'A', text: '20 km/h o 30 km/h según la reglamentación local' },
      { id: 'B', text: '50 km/h' },
      { id: 'C', text: '60 km/h si no hay niños a la vista' },
      { id: 'D', text: '80 km/h con luces intermitentes' }
    ],
    correctAnswerId: 'A',
    explanation: 'Las zonas escolares exigen reducción a 20 o 30 km/h debido al tiempo de reacción necesario y la impredecibilidad de infantes.'
  }
];

export const mockCampaigns: SafetyCampaign[] = [
  {
    id: 'camp_1',
    title: 'Pasos Inteligentes',
    subtitle: 'Infraestructura y Conciencia en Cruces',
    targetCategory: 'Peatones',
    targetType: 'peatones',
    description: 'Promoviendo la atención compartida en cruces peatonales de alta densidad. Conoce cómo la infraestructura iluminada salva vidas.',
    fullContent: 'El 40% de los incidentes viales urbanos involucran peatones en cruces no regulados. A través de sensores de proximidad y balizas LED dinámicas que se encienden cuando un peatón pisa la calzada, reducimos drásticamente los atropellos.',
    recommendations: [
      'Haz contacto visual con el conductor antes de cruzar.',
      'Evita mirar la pantalla del celular al atravesar la calzada.',
      'Utiliza siempre el paso de cebra o los puentes peatonales.',
      'Si cruzas de noche, viste alguna prenda con elementos reflectantes.'
    ],
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop&q=80',
    stats: '-38% de accidentes en intersecciones con señalización activa'
  },
  {
    id: 'camp_2',
    title: 'Rueda Seguro',
    subtitle: 'Micromovilidad Responsable',
    targetCategory: 'Micromovilidad',
    targetType: 'micromovilidad',
    description: 'Reglas claras y mejores prácticas para usuarios de scooters y bicicletas eléctricas en carriles confinados.',
    fullContent: 'Los vehículos de movilidad personal transforman las ciudades, pero requieren disciplina vial. Esta campaña fomenta el uso de casco reglamentario, el respeto de límites de velocidad (máximo 25 km/h) y el estacionamiento ordenado en bahías designadas.',
    recommendations: [
      'Usa siempre casco abrochado y en buen estado.',
      'Nunca circules sobre las aceras peatonales.',
      'Indica tus giros con anticipación mediante señales de brazo.',
      'Revisa la presión de los neumáticos y el estado de los frenos semanalmente.'
    ],
    image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=600&auto=format&fit=crop&q=80',
    stats: 'Más de 15,000 ciclistas capacitados en 2024'
  },
  {
    id: 'camp_3',
    title: 'Visión Cero',
    subtitle: 'Cero Distracciones al Volante',
    targetCategory: 'Conductores',
    targetType: 'conductores',
    description: 'Desconéctate del móvil y conéctate con tu entorno. Una campaña sobre los riesgos letales de la conducción distraída.',
    fullContent: 'Mirar el teléfono celular durante 5 segundos a 60 km/h equivale a recorrer una cancha de fútbol completa a ciegas. La estrategia Visión Cero se compromete a que ninguna muerte o lesión grave por tráfico sea aceptable ni inevitable.',
    recommendations: [
      'Guarda tu teléfono en el soporte o modo "No Molestar al Conducir".',
      'Configura tu ruta en el navegador antes de encender el motor.',
      'Respeta religiosamente la distancia de seguridad con otros vehículos.',
      'Recuerda que los ciclistas y peatones no tienen carrocería protectora.'
    ],
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80',
    stats: 'Meta 2030: Reducción del 50% en fatalidades urbanas'
  },
  {
    id: 'camp_4',
    title: 'Rutas Seguras Escolares',
    subtitle: 'Protección en Entornos Educativos',
    targetCategory: 'Entorno Escolar',
    targetType: 'escolar',
    description: 'Protegiendo el trayecto de los más pequeños. Implementación de límites de velocidad dinámicos en zonas escolares.',
    fullContent: 'Generamos perímetros escolares pacificados con zonas 20 km/h durante los horarios de entrada y salida de colegios. El proyecto involucra agentes de tránsito comunitarios y balizas preventivas intermitentes.',
    recommendations: [
      'Reduce la velocidad a 20 km/h al avistar un colegio o parque.',
      'No estaciones en doble fila obstruyendo la visibilidad de los niños.',
      'Fomenta el "Camino Escolar Seguro" a pie o en bicicleta acompañada.',
      'Sé paciente ante el descenso de pasajeros de rutas escolares.'
    ],
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80',
    stats: '84 colegios integrados con perímetros de tráfico pacificado'
  },
  {
    id: 'camp_5',
    title: 'Luz y Movimiento',
    subtitle: 'Visibilidad Nocturna Total',
    targetCategory: 'Nocturno',
    targetType: 'nocturno',
    description: 'Estrategias de visibilidad para ciclistas y peatones durante la noche. La tecnología al servicio de tu seguridad.',
    fullContent: 'De noche, el riesgo de siniestros viales se triplica por falta de contraste visual. Promovemos el uso de prendas retrorreflectivas de 360 grados y sistemas de iluminación activa de alto lumen.',
    recommendations: [
      'Utiliza bandas reflectantes en tobillos y muñecas (zonas de movimiento).',
      'Verifica que tus luces traseras rojas sean visibles a mínimo 150 metros.',
      'Evita cruzar por tramos oscuros o esquinas sin luminarias operativas.',
      'Reporta en VIANOVA las luminarias públicas dañadas en tu sector.'
    ],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80',
    stats: 'Un peatón con reflectivos es visible a 150 m vs 30 m sin ellos'
  },
  {
    id: 'camp_6',
    title: 'Cruces Conectados',
    subtitle: 'Infraestructura Vial del Futuro',
    targetCategory: 'Infraestructura',
    targetType: 'infraestructura',
    description: 'Nuestra red de semáforos inteligentes optimiza el flujo y prioriza al transporte público y peatones en tiempo real.',
    fullContent: 'Integración de controladores IoT y algoritmos de sincronización de onda verde para transporte público masivo, reduciendo tiempos de espera y contaminación por ralentí en los cruces neurálgicos.',
    recommendations: [
      'Observa las pantallas de velocidad sugerida para sincronía de onda verde.',
      'Nunca bloquees la intersección si no hay espacio para salir de ella.',
      'Respeta las cajas amarillas antibloqueo en todos los cruces.',
      'Confía en los sensores de demanda que detectan ciclistas en espera.'
    ],
    image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=80',
    stats: '+22% de fluidez en corredores intervenidos con semáforos IoT'
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
