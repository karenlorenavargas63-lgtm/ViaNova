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

// 1. VIDEOS DIDÁCTICOS REALES DE SEGURIDAD VIAL (YouTube embeds educativos verificados)
export const DIDACTIC_VIDEOS: DidacticVideo[] = [
  // --- PREVENCIÓN ---
  {
    id: 'vid_blind_spots',
    title: 'Los Puntos Ciegos en Vehículos Pesados: Cómo Evitarlos',
    topic: 'Prevención',
    category: 'Puntos Ciegos y Camiones',
    duration: '3:45 min',
    sourceName: 'Agencia Nacional de Seguridad Vial (ANSV)',
    sourceBadge: 'Campaña Oficial de Prevención',
    youtubeId: '7yV1E9t-rGE',
    embedUrl: 'https://www.youtube-nocookie.com/embed/7yV1E9t-rGE?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&auto=format&fit=crop&q=80',
    summary: 'Demostración didáctica que muestra los cuatro ángulos ciegos donde un conductor de autobús o camión no puede verte si vas en moto, bicicleta o a pie.',
    keyTakeaways: [
      'Si no puedes ver los espejos retrovisores del camión, el conductor definitivamente no te ve a ti.',
      'El lateral derecho es el punto ciego más amplio y peligroso en giros urbanos.',
      'Mantén una distancia mínima de 3 metros detrás de camiones articulados.',
      'Nunca rebases por la derecha a un vehículo de carga en esquinas o intersecciones.'
    ],
    quizQuestion: {
      question: '¿Cuál es la regla de oro para saber si un conductor de autobús puede verte en sus espejos?',
      options: [
        'Estar a menos de 50 cm de su puerta delantera',
        'Ver claramente el rostro o los espejos retrovisores del conductor',
        'Tocar la bocina constantemente mientras avanzas',
        'Acelerar rápidamente por su carril derecho'
      ],
      correctIndex: 1,
      explanation: 'Si tú no ves los espejos retrovisores laterales del vehículo de carga, el conductor tiene un punto ciego total sobre tu posición.'
    }
  },
  {
    id: 'vid_distraction',
    title: 'Distracciones al Volante y Celular: La Trampa de los 5 Segundos',
    topic: 'Prevención',
    category: 'Manejo Defensivo',
    duration: '3:15 min',
    sourceName: 'Fundación MAPFRE Movilidad Segura',
    sourceBadge: 'Prevención de Siniestros',
    youtubeId: 'W3_42T1tWk0',
    embedUrl: 'https://www.youtube-nocookie.com/embed/W3_42T1tWk0?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80',
    summary: 'A 50 km/h, mirar un mensaje de texto durante solo 5 segundos equivale a recorrer 70 metros completamente a ciegas.',
    keyTakeaways: [
      'Mirar el celular multiplica por 4 el riesgo de colisión o atropello peatonal.',
      'El "efecto túnel" impide ver señales laterales, ciclistas y pasos de cebra.',
      'Configura tu ruta antes de arrancar y coloca el dispositivo en modo no molestar.',
      'Si necesitas atender una llamada urgente, estaciónate en un lugar seguro autorizado.'
    ],
    quizQuestion: {
      question: 'A 50 km/h, ¿cuántos metros avanza un vehículo a ciegas si el conductor mira el celular por 5 segundos?',
      options: [
        'Aproximadamente 70 metros (casi una cuadra entera)',
        'Menos de 2 metros',
        'El auto se frena automáticamente',
        '10 metros solamente'
      ],
      correctIndex: 0,
      explanation: 'A 50 km/h se recorren 14 metros por cada segundo; en 5 segundos son 70 metros sin mirar el entorno vial.'
    }
  },
  {
    id: 'vid_pas_protocol',
    title: 'Protocolo P.A.S.: Proteger, Avisar y Socorrer en un Accidente',
    topic: 'Prevención',
    category: 'Primeros Auxilios Viales',
    duration: '3:20 min',
    sourceName: 'Cruz Roja & Emergencias 123',
    sourceBadge: 'Atención Oportuna',
    youtubeId: 'yqX7BvK86Z8',
    embedUrl: 'https://www.youtube-nocookie.com/embed/yqX7BvK86Z8?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    summary: 'Protocolo de actuación de tres pasos vitales que salva vidas en los primeros 10 minutos posteriores a una colisión en vía pública.',
    keyTakeaways: [
      'P - PROTEGER: Apaga motores, enciende luces de emergencia y asegura el área con triángulos a 50m.',
      'A - AVISAR: Llama a la línea 123 indicando ubicación exacta, número de heridos y estado.',
      'S - SOCORRER: Acompaña a las víctimas sin mover el cuello ni retirar cascos a motociclistas.',
      'Nunca des alimentos ni agua a heridos hasta que lleguen paramédicos calificados.'
    ],
    quizQuestion: {
      question: '¿Por qué NUNCA se debe retirar el casco a un motociclista accidentado?',
      options: [
        'Porque el casco es de propiedad privada',
        'Para evitar dañar o agravar una posible lesión cervical en la médula espinal',
        'Porque la policía de tránsito debe tomarle fotos primero',
        'Para que no sienta frío en la cabeza'
      ],
      correctIndex: 1,
      explanation: 'Retirar el casco sin técnica médica inmovilizadora puede causar parálisis irreversible o asfixia en caso de fractura cervical.'
    }
  },

  // --- TRÁFICO ---
  {
    id: 'vid_traffic_wave',
    title: 'La Ciencia del Tráfico: ¿Cómo se forman los Trancones Fantasma?',
    topic: 'Tráfico',
    category: 'Dinámica de Congestión',
    duration: '4:30 min',
    sourceName: 'Laboratorio de Movilidad Urbana & Tráfico',
    sourceBadge: 'Física del Tráfico',
    youtubeId: '7wm-pZgu_XI',
    embedUrl: 'https://www.youtube-nocookie.com/embed/7wm-pZgu_XI?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
    summary: 'Explicación interactiva sobre el "Efecto Acordeón": cómo el frenazo leve de un solo auto genera un embotellamiento de 5 kilómetros 20 minutos después.',
    keyTakeaways: [
      'Mantener una distancia constante con el auto de adelante disuelve las ondas de tráfico.',
      'Frenar bruscamente y acelerar a fondo amplifica la congestión en cadena.',
      'Evita cambiar continuamente de carril; eso causa frenazos innecesarios en ambos carriles.',
      'La velocidad fluida y uniforme mueve a más vehículos por hora que los picos rápidos y frenadas.'
    ],
    quizQuestion: {
      question: '¿Cuál es la forma más eficaz para un conductor individual de evitar que se formen trancones fantasma?',
      options: [
        'Acelerar y pegarse al vehículo de adelante para no dejar espacio',
        'Mantener una distancia prudente constante y frenar de forma muy suave y progresiva',
        'Cambiar de carril cada vez que el de al lado avance un metro',
        'Tocar la bocina en cada semáforo'
      ],
      correctIndex: 1,
      explanation: 'Mantener un colchón de espacio absorbe las desaceleraciones como un resorte elástico, evitando la onda de frenado hacia atrás.'
    }
  },
  {
    id: 'vid_smart_traffic_lights',
    title: 'Semaforización Inteligente y Olas Verdes en Corredores Urbanos',
    topic: 'Tráfico',
    category: 'Tecnología y Flujo',
    duration: '3:50 min',
    sourceName: 'Secretaría de Movilidad Urbana',
    sourceBadge: 'Gestión Inteligente de Vías',
    youtubeId: 'bA4yN9qYv4g',
    embedUrl: 'https://www.youtube-nocookie.com/embed/bA4yN9qYv4g?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    summary: 'Descubre cómo los sensores subterráneos y algoritmos adaptativos sincronizan semáforos para crear olas verdes y priorizar al transporte público.',
    keyTakeaways: [
      'Las olas verdes están calibradas para velocidades constantes de 40 a 50 km/h.',
      'Correr a exceso de velocidad te hará frenar en el siguiente semáforo en rojo.',
      'Los detectores dan prioridad a ambulancias y líneas troncales de autobuses.',
      'La luz amarilla fija dura entre 3 y 5 segundos y exige detenerse si es seguro hacerlo.'
    ],
    quizQuestion: {
      question: 'Si una vía está calibrada con "ola verde" a 45 km/h, ¿qué ocurre si conduces a 70 km/h?',
      options: [
        'Llegas más rápido sin interrupciones',
        'Llegas al siguiente semáforo antes de tiempo y te detienes forzosamente en luz roja',
        'El semáforo cambia a verde más rápido al detectarte',
        'Se activa una alarma sonora urbana'
      ],
      correctIndex: 1,
      explanation: 'La ola verde está sincronizada por tiempo y distancia. Exceder la velocidad destruye la sincronización y genera frenadas innecesarias.'
    }
  },

  // --- TRÁNSITO ---
  {
    id: 'vid_roundabouts',
    title: 'Cómo Circular Correctamente en Glorietas y Rotondas',
    topic: 'Tránsito',
    category: 'Normativa Vial',
    duration: '4:10 min',
    sourceName: 'Seguridad Vial y Tráfico DGT',
    sourceBadge: 'Guía Didáctica de Flujo Vial',
    youtubeId: 'k4q79JkU904',
    embedUrl: 'https://www.youtube-nocookie.com/embed/k4q79JkU904?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=800&auto=format&fit=crop&q=80',
    summary: 'Explicación animada paso a paso sobre prelación, uso de carriles interiores/exteriores y señalización de salida en glorietas urbanas.',
    keyTakeaways: [
      'La prioridad siempre la tienen los vehículos que ya circulan dentro del anillo.',
      'Para salir de la glorieta debes incorporarte con anticipación al carril exterior derecho.',
      'Nunca cortes trayectoria cruzando carriles directamente desde el interior para salir.',
      'Si pierdes tu salida, da otra vuelta completa con calma y seguridad.'
    ],
    quizQuestion: {
      question: '¿Desde qué carril se debe abandonar obligatoriamente una glorieta?',
      options: [
        'Desde el carril interior izquierdo más rápido',
        'Desde cualquier carril siempre que toques la bocina',
        'Únicamente desde el carril exterior derecho',
        'Cruzando transversalmente por el centro'
      ],
      correctIndex: 2,
      explanation: 'Para salir de una glorieta con seguridad debes situarte previamente en el carril exterior y señalizar con la direccional derecha.'
    }
  },

  // --- MOVILIDAD ---
  {
    id: 'vid_pedestrian_safety',
    title: 'Cruces Peatonales Seguros: Contacto Visual y Distancia de Parada',
    topic: 'Movilidad',
    category: 'Seguridad Peatonal',
    duration: '2:50 min',
    sourceName: 'Fundación MAPFRE Movilidad Segura',
    sourceBadge: 'Cultura del Peatón',
    youtubeId: '3GZqN7cKjYQ',
    embedUrl: 'https://www.youtube-nocookie.com/embed/3GZqN7cKjYQ?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=800&auto=format&fit=crop&q=80',
    summary: 'Aprende los factores biomecánicos del cruce peatonal: por qué el contacto visual con los conductores reduce el 85% de los atropellos.',
    keyTakeaways: [
      'Establece contacto visual con el conductor antes de poner un pie en la cebra peatonal.',
      'Evita usar auriculares con cancelación de ruido o mirar el teléfono al cruzar calzadas.',
      'En horario nocturno, una prenda clara o reflectiva multiplica tu visibilidad por 4.',
      'Respeta los tiempos del semáforo peatonal: la luz intermitente indica no iniciar el cruce.'
    ],
    quizQuestion: {
      question: '¿Cuál es el factor más efectivo para garantizar que un vehículo se detendrá en un paso de cebra?',
      options: [
        'Cruzar corriendo sin mirar',
        'Hacer contacto visual con el conductor y verificar que redujo la marcha',
        'Gritar al conductor para avisar',
        'Confiar ciegamente en que la pintura en el suelo te protege físicamente'
      ],
      correctIndex: 1,
      explanation: 'El contacto visual confirma que el conductor te ha visto conscientemente y ha iniciado la desaceleración del vehículo.'
    }
  },
  {
    id: 'vid_micromobility_coexistence',
    title: 'Convivencia Vial: Ciclorrutas, Patinetas y Distancia de 1.5 Metros',
    topic: 'Movilidad',
    category: 'Movilidad Activa',
    duration: '3:35 min',
    sourceName: 'Red de Ciudades por la Bicicleta',
    sourceBadge: 'Movilidad Sostenible',
    youtubeId: 'vQ2XG5s9l10',
    embedUrl: 'https://www.youtube-nocookie.com/embed/vQ2XG5s9l10?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80',
    summary: 'Cómo compartir el espacio público de forma respetuosa entre ciclistas, patinetas eléctricas, peatones y vehículos motorizados.',
    keyTakeaways: [
      'Los vehículos motorizados deben dejar al menos 1.5 metros al sobrepasar a un ciclista.',
      'Las bicicletas y patinetas nunca deben circular sobre aceras peatonales estrechas.',
      'Utiliza señales manuales con los brazos para indicar giros a la izquierda y derecha.',
      'En horario nocturno es obligatorio el uso de luz delantera blanca y luz trasera roja.'
    ],
    quizQuestion: {
      question: '¿Cuál es la distancia lateral mínima que debe dejar un auto al adelantar a un ciclista?',
      options: [
        '50 centímetros',
        '1.5 metros (metro y medio)',
        '3 metros obligatorios',
        'No hay distancia regulada'
      ],
      correctIndex: 1,
      explanation: 'La distancia de 1.5 metros previene que la masa de aire desestabilice al ciclista o que un bache provoque un roce.'
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
