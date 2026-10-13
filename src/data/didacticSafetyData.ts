import { LucideIcon } from 'lucide-react';

export type VideoTopicType = 'Tráfico' | 'Tránsito' | 'Prevención' | 'Movilidad';

export interface DidacticVideo {
  id: string;
  title: string;
  topic: VideoTopicType;
  category: string;
  duration: string;
  sourceName: string;
  sourceBadge: string;
  youtubeId: string;
  embedUrl: string;
  thumbnail: string;
  summary: string;
  highlightTag: string;
  impactMetric: string;
  goldenRule: string;
  whyItHappens: string;
  solutionSteps: {
    stepNumber: string;
    title: string;
    desc: string;
  }[];
  doAndDont: {
    dos: string[];
    donts: string[];
  };
  keyTakeaways: string[];
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface DidacticInfographic {
  id: string;
  title: string;
  badge: string;
  category: 'infografia' | 'guia' | 'diagrama';
  summary: string;
  keyPoints: { title: string; desc: string; iconEmoji: string }[];
  accentColor: string;
  bannerType: 'pyramid' | 'blind_spots' | 'pas_protocol' | 'braking_distance' | 'helmets' | 'roundabout';
  fullText: string;
}

export interface RoadScenario {
  id: string;
  title: string;
  situation: string;
  contextTag: string;
  dangerLevel: 'Bajo' | 'Medio' | 'Crítico';
  role: 'Conductor de Auto' | 'Ciclista' | 'Motociclista' | 'Peatón';
  imageIllustration: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    consequence: string;
    advice: string;
  }[];
}

// 1. VIDEOS DIDÁCTICOS OFICIALES DE SEGURIDAD VIAL VIANOVA: EXACTAMENTE 3 VIDEOS DIFERENTES
export const DIDACTIC_VIDEOS: DidacticVideo[] = [
  // VIDEO 1: VIANOVA GESTIÓN Y FÍSICA DEL TRÁFICO URBANO (TRANCONES FANTASMA Y FLUJO INTELIGENTE)
  {
    id: 'vid_vianova_traffic_flow',
    title: 'VIANOVA Tráfico: Física del Flujo y Cómo Neutralizar los Trancones en Cadena',
    topic: 'Tráfico',
    category: 'Ingeniería de Flujo y Tráfico VIANOVA',
    duration: '4:30 min',
    sourceName: 'VIANOVA Centro de Control de Tráfico Urbano',
    sourceBadge: 'VIANOVA Tráfico Inteligente',
    youtubeId: '7wm-pZgu_XI',
    embedUrl: 'https://www.youtube-nocookie.com/embed/7wm-pZgu_XI?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
    summary: 'Aprende cómo opera la física del tráfico en VIANOVA: por qué una frenada brusca genera un efecto acordeón de 5 km y cómo conservar un flujo continuo sin detenciones.',
    highlightTag: '⚡ DINÁMICA DE TRÁFICO',
    impactMetric: '⏳ Reduce 35% de Retrasos en Vía',
    goldenRule: 'COLCHÓN AMORTIGUADOR CONSTANTE: Mantén 3 segundos con el auto que te precede para absorber las desaceleraciones y disolver trancones en cadena.',
    whyItHappens: 'Cuando un auto frena inesperadamente, el conductor detrás reacciona con retraso y frena aún más fuerte. Hacia el décimo vehículo, la velocidad cae a cero absoluto.',
    solutionSteps: [
      { stepNumber: '1', title: 'Velocidad Uniforme', desc: 'No aceleres hacia la cola del trancón; modera la marcha con antelación para mantener el movimiento.' },
      { stepNumber: '2', title: 'Espacio de Seguridad', desc: 'Deja una distancia equivalente a dos o tres vehículos para evitar tocar el pedal de freno en seco.' },
      { stepNumber: '3', title: 'Cero Zigzagueo', desc: 'Cambiar de carril compulsivamente crea nuevas ondas de choque y ralentiza ambos carriles.' }
    ],
    doAndDont: {
      dos: [
        'Conducir a velocidad moderada uniforme (permite que pasen 25% más vehículos por carril/hora).',
        'Mirar 4 vehículos adelante en la vía para anticipar frenadas lejanas sin sobresaltos.'
      ],
      donts: [
        'Pegarse a la defensa trasera del vehículo de adelante ("cola de auto").',
        'Acelerar a fondo en tramos cortos para frenar bruscamente en el siguiente semáforo.'
      ]
    },
    keyTakeaways: [
      'Mantener distancia constante neutraliza las ondas de choque hacia atrás.',
      'El zigzagueo entre carriles empeora el atasco para todos los usuarios de la vía.',
      'La fluidez continua transporta más personas por hora que la velocidad intermitente.',
      'Frenar suavemente con motor evita colisiones múltiples por alcance.'
    ],
    quizQuestion: {
      question: 'Según la física del tráfico en VIANOVA, ¿cuál es la causa principal de los trancones fantasma?',
      options: [
        'Que la calle se reduce sin avisar',
        'Reacciones en cadena por frenadas bruscas al no guardar distancia de seguridad',
        'Que los autos pesados van más despacio',
        'Fallas aleatorias de los semáforos'
      ],
      correctIndex: 1,
      explanation: 'El efecto acordeón se genera cuando la falta de distancia obliga a frenadas sucesivas cada vez más intensas hasta detener por completo el tráfico vehicular.'
    }
  },

  // VIDEO 2: VIANOVA MOVILIDAD SOSTENIBLE Y CONVIVENCIA EN CALZADA (BICIS, PATINETAS Y PEATONES)
  {
    id: 'vid_vianova_micromobility',
    title: 'VIANOVA Movilidad: Convivencia Activa, Ciclorrutas y el 1.5m de Respeto',
    topic: 'Movilidad',
    category: 'Movilidad Sostenible y Multimodal',
    duration: '3:35 min',
    sourceName: 'VIANOVA Plataforma de Movilidad Sostenible',
    sourceBadge: 'VIANOVA Movilidad Activa',
    youtubeId: 'vQ2XG5s9l10',
    embedUrl: 'https://www.youtube-nocookie.com/embed/vQ2XG5s9l10?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80',
    summary: 'La guía VIANOVA para compartir armónicamente la calzada: distancia legal obligatoria de 1.5 metros al sobrepasar ciclistas, prioridad peatonal y técnica holandesa.',
    highlightTag: '🚲 CONVIVENCIA MULTIMODAL',
    impactMetric: '🚴‍♀️ +90% Seguridad Ciclista',
    goldenRule: 'DEJA AL MENOS 1.5 METROS AL SOBREPASAR: La masa de aire desplazada por un auto puede succionar y hacer caer a bicicletas y patinetas.',
    whyItHappens: 'El paso de un vehículo veloz a menos de 1 metro genera un vórtice de baja presión aerodinámica que desestabiliza el manubrio de usuarios vulnerables.',
    solutionSteps: [
      { stepNumber: '1', title: 'Sobrepaso Amplio', desc: 'Cambia de carril si es necesario para adelantar a ciclistas garantizando el margen de 1.5 metros.' },
      { stepNumber: '2', title: 'Luces Activas', desc: 'Bicicletas y patinetas deben llevar luz blanca fija adelante y roja intermitente atrás siempre.' },
      { stepNumber: '3', title: 'Técnica Holandesa', desc: 'Abre la puerta del auto con la mano contraria para girar el torso y mirar hacia atrás.' }
    ],
    doAndDont: {
      dos: [
        'Respetar las ciclorrutas y carriles exclusivos sin invadirlos con autos ni motocicletas.',
        'Usar casco reglamentario abrochado y prendas de alta visibilidad reflectiva.'
      ],
      donts: [
        'Circular en patineta o bicicleta a alta velocidad sobre andenes peatonales estrechos.',
        'Abrir la puerta del vehículo sin verificar previamente el retrovisor exterior.'
      ]
    },
    keyTakeaways: [
      '1.5 metros es la distancia legal obligatoria para rebasar a cualquier ciclista.',
      'Las aceras pertenecen exclusivamente al peatón, garantizando accesibilidad total.',
      'La técnica de la puerta holandesa previene miles de colisiones con ciclistas.',
      'Los vehículos de micromovilidad deben señalizar sus maniobras con los brazos.'
    ],
    quizQuestion: {
      question: '¿Cuál es la distancia lateral mínima que debe dejar un vehículo motorizado al sobrepasar a un ciclista según VIANOVA?',
      options: [
        '30 centímetros',
        '1.5 metros (metro y medio)',
        '3 metros de distancia',
        'No existe distancia reglamentada'
      ],
      correctIndex: 1,
      explanation: 'El margen de 1.5 metros evita el efecto de succión por la masa de aire y protege al ciclista de caídas ante desniveles o baches en el asfalto.'
    }
  },

  // VIDEO 3: VIANOVA SEGURIDAD, FÍSICA DE FRENADO Y VELOCIDAD URBANA
  {
    id: 'vid_vianova_defensive_speed',
    title: 'VIANOVA Seguridad: Distancia de Frenado, Velocidad Urbana y Conducción Preventiva',
    topic: 'Prevención',
    category: 'Velocidad Segura y Reacción Vial VIANOVA',
    duration: '4:15 min',
    sourceName: 'VIANOVA Laboratorio de Seguridad y Física Vial',
    sourceBadge: 'VIANOVA Seguridad Crítica',
    youtubeId: 'oVqM1vA-r3M',
    embedUrl: 'https://www.youtube-nocookie.com/embed/oVqM1vA-r3M?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80',
    summary: 'Por qué la energía cinética se cuadruplica al duplicar la velocidad: cálculo de metros de detención total, percepción humana y cómo la moderación a 30-50 km/h salva vidas en zonas residenciales.',
    highlightTag: '🛑 FRENADO & ENERGÍA CINÉTICA',
    impactMetric: '⏱️ -65% Distancia de Detención',
    goldenRule: 'REGLA DE LOS 3 SEGUNDOS EN SECO Y 5 EN MOJADO: La distancia de frenado no es lineal; a 50 km/h necesitas casi 28 metros para detenerte por completo.',
    whyItHappens: 'El tiempo de reacción humana promedio es de 1 segundo (en el que recorres 14 metros a 50 km/h) ANTES de que el pie toque el freno mecánico.',
    solutionSteps: [
      { stepNumber: '1', title: 'Percepción Anticipada', desc: 'Escanea el entorno 15 segundos adelante para identificar frenados y desvíos antes de que sucedan.' },
      { stepNumber: '2', title: 'Zona 30 en Barrios', desc: 'A 30 km/h la probabilidad de supervivencia peatonal es del 90%; a 60 km/h cae a menos del 15%.' },
      { stepNumber: '3', title: 'Condiciones Climáticas', desc: 'En pavimento mojado o con lluvia, duplica la distancia de seguridad obligatoria de inmediato.' }
    ],
    doAndDont: {
      dos: [
        'Mantener neumáticos con presión adecuada y verificar el labrado periódicamente.',
        'Aumentar la distancia de seguimiento a 5 segundos cuando llueve o hay niebla.'
      ],
      donts: [
        'Conducir pegado al vehículo delantero asumiendo reflejos instantáneos.',
        'Acelerar para cruzar en luz amarilla cuando se aproxima la intersección.'
      ]
    },
    keyTakeaways: [
      'A 50 km/h recorres 14 metros antes siquiera de presionar el freno por reflejo neurológico.',
      'El suelo mojado duplica la distancia requerida para detener el vehículo.',
      'Reducir la velocidad urbana de 50 a 30 km/h reduce en 80% las colisiones con heridos.',
      'La anticipación visual previene frenadas de emergencia y desgaste innecesario.'
    ],
    quizQuestion: {
      question: '¿Por qué la distancia de frenado se cuadruplica si duplicas tu velocidad según el laboratorio de física vial VIANOVA?',
      options: [
        'Porque los frenos se calientan instantáneamente',
        'Porque la energía cinética aumenta con el cuadrado de la velocidad (E = 1/2 m·v²)',
        'Porque el peso del vehículo aumenta al acelerar',
        'Porque los neumáticos pierden contacto con el suelo'
      ],
      correctIndex: 1,
      explanation: 'La física demuestra que la energía que deben disipar los frenos es cuadrática: duplicar la velocidad multiplica por 4 la energía cinética y la distancia de frenado.'
    }
  }
];

// 2. INFOGRAFÍAS DIDÁCTICAS INTERACTIVAS
export const DIDACTIC_INFOGRAPHICS: DidacticInfographic[] = [
  {
    id: 'info_pyramid',
    title: 'La Pirámide de la Jerarquía Vial Urbana',
    badge: 'Prioridad y Convivencia',
    category: 'infografia',
    bannerType: 'pyramid',
    accentColor: '#0066ff',
    summary: 'La ley de tránsito y el urbanismo moderno establecen que los usuarios más vulnerables tienen la máxima prioridad de protección y paso en la vía pública.',
    keyPoints: [
      {
        title: 'Nivel 1: Peatones y personas con movilidad reducida',
        desc: 'Tienen prioridad absoluta en cruces, aceras y zonas escolares. Vulnerabilidad máxima ante cualquier impacto físico.',
        iconEmoji: '🚶'
      },
      {
        title: 'Nivel 2: Ciclistas y Micromovilidad',
        desc: 'Usuarios no motorizados o ligeros. Requieren 1.5 metros de distancia mínima de sobrepaso seguro.',
        iconEmoji: '🚲'
      },
      {
        title: 'Nivel 3: Transporte Público Masivo (Buses, Metro)',
        desc: 'Mueven al mayor número de ciudadanos optimizando el espacio vial por pasajero transportado.',
        iconEmoji: '🚌'
      },
      {
        title: 'Nivel 4: Transporte de Carga y Logística Urbana',
        desc: 'Abastecen la economía y víveres esenciales. Tienen horarios y carriles designados con amplios puntos ciegos.',
        iconEmoji: '🚛'
      },
      {
        title: 'Nivel 5: Autos y Motos Particulares',
        desc: 'Deben circular a velocidades moderadas (30-50 km/h) asumiendo la mayor responsabilidad civil por su potencial lesivo.',
        iconEmoji: '🚗'
      }
    ],
    fullText: 'La jerarquía vial invierte la vieja pirámide donde el automóvil dominaba. Hoy la vida y la vulnerabilidad física dictan la prelación en cada esquina y semáforo.'
  },
  {
    id: 'info_braking_distance',
    title: 'Distancia de Reacción vs Frenado: ¿Por qué 30 y 50 km/h?',
    badge: 'Física y Supervivencia',
    category: 'diagrama',
    bannerType: 'braking_distance',
    accentColor: '#e11d48',
    summary: 'Un auto no se detiene instantáneamente. La distancia total de parada se compone de la distancia recorrida mientras el cerebro reacciona (1 segundo) más el frenado mecánico.',
    keyPoints: [
      {
        title: 'A 30 km/h (Zonas Residenciales / Escolares)',
        desc: 'Distancia total de frenado: ~13 metros. Probabilidad de supervivencia del peatón en impacto: 90%.',
        iconEmoji: '🟢'
      },
      {
        title: 'A 50 km/h (Avenidas Urbanas)',
        desc: 'Distancia total de frenado: ~27 metros (más del doble). Probabilidad de supervivencia del peatón: 50%.',
        iconEmoji: '🟡'
      },
      {
        title: 'A 80 km/h (Corredores Rápidos / Autopistas)',
        desc: 'Distancia total de frenado: ~58 metros. Probabilidad de supervivencia del peatón: menor al 10%.',
        iconEmoji: '🔴'
      },
      {
        title: 'Efecto Pavimento Mojado',
        desc: 'Con lluvia o asfalto resbaladizo, la distancia de detención se incrementa hasta en un 70%.',
        iconEmoji: '🌧️'
      }
    ],
    fullText: 'Aumentar tan solo 10 km/h duplica la energía cinética del impacto. En zonas de alta afluencia peatonal, respetar los 30 km/h es la diferencia directa entre la vida y la muerte.'
  },
  {
    id: 'info_helmets_gear',
    title: 'Guía Visual del Casco y Equipo de Protección Certificado',
    badge: 'Indumentaria de Vida',
    category: 'guia',
    bannerType: 'helmets',
    accentColor: '#059669',
    summary: 'No todos los cascos protegen igual. La resolución colombiana exige certificación oficial y uso ajustado en todo momento.',
    keyPoints: [
      {
        title: 'Norma ECE 22.06 / DOT Certificado',
        desc: 'Verifica la etiqueta cosida en la correa o serigrafiada en la nuca. Resiste impactos rotacionales y perforaciones.',
        iconEmoji: '🪖'
      },
      {
        title: 'Abrochado y Ajuste Milimétrico',
        desc: 'Un casco sin abrochar sale despedido en el primer segundo del choque. La correa debe permitir solo un dedo de holgura.',
        iconEmoji: '🔒'
      },
      {
        title: 'Visor Transparente y Limpio',
        desc: 'En horario nocturno el visor debe ser 100% transparente sin polarizados oscuros que impidan ver baches o peatones.',
        iconEmoji: '👓'
      },
      {
        title: 'Chaqueta y Calzado Antifricción',
        desc: 'Protección con refuerzos en hombros, codos y calzado cerrado por encima del tobillo.',
        iconEmoji: '🧥'
      }
    ],
    fullText: 'El casco absorbe la deceleración del cráneo. Si tu casco sufrió una caída fuerte o tiene más de 5 años de uso, sus polímeros internos ya no absorben energía y debe reemplazarse.'
  }
];

// 3. SIMULADOR DE DECISIONES VIALES INTERACTIVO ("¿Qué harías tú?")
export const ROAD_SCENARIOS: RoadScenario[] = [
  {
    id: 'scen_1',
    title: 'Autobús girando a la derecha en cruce urbano',
    contextTag: 'Punto Ciego y Convivencia',
    role: 'Ciclista',
    dangerLevel: 'Crítico',
    situation: 'Vas en tu bicicleta por el carril derecho a 20 km/h. Un autobús urbano te sobrepasa lentamente e inmediatamente activa su luz direccional derecha para entrar a una calle transversal a 15 metros delante de ti.',
    imageIllustration: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&auto=format&fit=crop&q=80',
    options: [
      {
        id: 'A',
        text: 'Acelerar a fondo para adelantarlo por su costado derecho antes de que termine el giro.',
        isCorrect: false,
        consequence: '¡Riesgo inminente de aplastamiento! El autobús se cierra hacia el andén y su punto ciego derecho te deja atrapado entre las ruedas traseras.',
        advice: 'Nunca compitas con un giro a la derecha de un vehículo pesado. Su radio de giro reduce el espacio a cero.'
      },
      {
        id: 'B',
        text: 'Frenar con anticipación, colocarte detrás del autobús y esperar que complete su maniobra.',
        isCorrect: true,
        consequence: '¡Excelente decisión defensiva! Te mantienes en el campo visual del conductor y evitas la trampa del punto ciego.',
        advice: 'La paciencia salva vidas. 5 segundos de espera previenen una colisión de alto impacto.'
      },
      {
        id: 'C',
        text: 'Cruzar velozmente sobre la acera peatonal para esquivarlo sin frenar.',
        isCorrect: false,
        consequence: '¡Infracción peligrosa! Pones en grave riesgo a peatones en la acera y puedes chocar con bolardos o postes.',
        advice: 'Las aceras son territorio exclusivo peatonal. No traslades el peligro a otros usuarios.'
      }
    ]
  },
  {
    id: 'scen_2',
    title: 'Semáforo en amarillo y peatón en paso de cebra',
    contextTag: 'Prioridad Peatonal y Dilema de Tiempo',
    role: 'Conductor de Auto',
    dangerLevel: 'Medio',
    situation: 'Vas conduciendo a 40 km/h. A 25 metros de la esquina, el semáforo cambia a amarillo. Al mismo tiempo, observas a una madre con coche de bebé a punto de iniciar el paso en la cebra peatonal.',
    imageIllustration: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80',
    options: [
      {
        id: 'A',
        text: 'Acelerar para pasar antes de que el semáforo se ponga en rojo y tocar la bocina.',
        isCorrect: false,
        consequence: '¡Peligro extremo! Acelerar en luz amarilla es una de las principales causas de atropello urbano e invasión de cruces.',
        advice: 'La luz amarilla advierte detención obligatoria salvo que una frenada cause una colisión por alcance demostrable.'
      },
      {
        id: 'B',
        text: 'Aplicar frenado progresivo y detener el vehículo completamente antes de la línea de pare.',
        isCorrect: true,
        consequence: '¡Decisión perfecta! Te detienes con seguridad, permites el cruce peatonal tranquilo y respetas el ciclo semafórico.',
        advice: 'Proteger la vida humana en el paso de cebra tiene prelación superior sobre cualquier prisa.'
      },
      {
        id: 'C',
        text: 'Frenar encima de las líneas del paso de cebra bloqueando el cruce.',
        isCorrect: false,
        consequence: 'Infracción por invasión de paso peatonal. Obligas a los peatones a esquivar tu auto saliendo al carril contiguo.',
        advice: 'La línea de pare está diseñada para dejar un margen visual seguro para peatones y personas en silla de ruedas.'
      }
    ]
  },
  {
    id: 'scen_3',
    title: 'Lluvia repentina y asfalto brillante ("Efecto jabón")',
    contextTag: 'Adherencia y Clima Adverso',
    role: 'Motociclista',
    dangerLevel: 'Crítico',
    situation: 'Acaban de caer las primeras gotas de lluvia tras semanas de sequía. El asfalto luce aceitoso y brillante. Te aproximas a una curva pronunciada donde hay líneas de pintura blanca en el pavimento.',
    imageIllustration: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
    options: [
      {
        id: 'A',
        text: 'Reducir la velocidad gradualmente con motor antes de la curva y evitar pisar la pintura blanca inclinando la moto.',
        isCorrect: true,
        consequence: '¡Maniobra magistral! Las primeras gotas mezcladas con aceite forman una película jabonosa, y la pintura mojada reduce el agarre un 80%.',
        advice: 'Toda frenada debe hacerse con la moto vertical antes de entrar a la curva, nunca inclinada sobre pintura mojada.'
      },
      {
        id: 'B',
        text: 'Frenar fuerte con el freno delantero mientras estás inclinado sobre las líneas de pintura.',
        isCorrect: false,
        consequence: '¡Pérdida de tracción frontal y caída inmediata! La rueda delantera se bloquea sobre la pintura húmeda y la moto desliza.',
        advice: 'En piso resbaladizo, usa 70% freno trasero suave y compresión de motor para evitar bloqueos.'
      },
      {
        id: 'C',
        text: 'Mantener la misma velocidad inclinando más el cuerpo para contrarrestar la fuerza centrífuga.',
        isCorrect: false,
        consequence: 'Derrape lateral descontrolado por exceder el límite de adherencia química del neumático.',
        advice: 'Con lluvia, reduce la velocidad entre un 30% y 50% de inmediato y duplica la distancia con el vehículo precedente.'
      }
    ]
  }
];
