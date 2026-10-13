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

// 1. VIDEOS DIDÁCTICOS OFICIALES DE SEGURIDAD VIAL: LLAMATIVOS Y EXPLICADOS EN DETALLE
export const DIDACTIC_VIDEOS: DidacticVideo[] = [
  // --- TRÁFICO (AMARILLO / NARANJA VIBRANTE: FÍSICA Y FLUJO VEHICULAR) ---
  {
    id: 'vid_traffic_wave',
    title: 'La Ciencia del Tráfico: ¿Por qué Ocurren los Trancones Fantasma?',
    topic: 'Tráfico',
    category: 'Física y Dinámica de Flujo',
    duration: '4:30 min',
    sourceName: 'Laboratorio de Movilidad Urbana & Dinámica Vial',
    sourceBadge: 'Ciencia del Tráfico',
    youtubeId: '7wm-pZgu_XI',
    embedUrl: 'https://www.youtube-nocookie.com/embed/7wm-pZgu_XI?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
    summary: 'El frenazo leve de un solo conductor desencadena una onda de choque hacia atrás de 5 km. Conoce la explicación matemática del "Efecto Oruga" o "Acordeón".',
    highlightTag: '⚡ FÍSICA DEL TRÁFICO',
    impactMetric: '⏳ Ahorra hasta 35 min de trancón',
    goldenRule: 'MANTÉN UN COLCHÓN CONSTANTE: Deja 3 segundos de distancia; amortiguarás las frenadas en cadena como un resorte elástico.',
    whyItHappens: 'Cuando un auto frena bruscamente, el de atrás frena un poco más fuerte por demora en el tiempo de reacción (1 segundo humano). Hacia el décimo vehículo, la velocidad cae a cero absoluto.',
    solutionSteps: [
      { stepNumber: '1', title: 'Velocidad Constante', desc: 'No aceleres hacia la cola de autos; reduce suavemente la marcha con anticipación.' },
      { stepNumber: '2', title: 'Distancia de Amortiguación', desc: 'Deja espacio equivalente a dos o tres vehículos para no tocar el pedal de freno.' },
      { stepNumber: '3', title: 'Cero Cambios Inútiles', desc: 'Cambiar de carril zigzagueando crea 2 ondas de frenado adicionales en la vía.' }
    ],
    doAndDont: {
      dos: [
        'Conducir a velocidad moderada uniforme (mueve 25% más autos por carril/hora).',
        'Mirar 4 vehículos hacia adelante para anticipar frenadas lejanas.'
      ],
      donts: [
        'Pegarse a la defensa delantera del vehículo que te precede ("cola de auto").',
        'Acelerar a fondo para frenar en seco 50 metros más adelante.'
      ]
    },
    keyTakeaways: [
      'Mantener distancia constante neutraliza las ondas de choque hacia atrás.',
      'El zigzagueo entre carriles empeora el atasco para todos los usuarios.',
      'La fluidez continua transporta más personas por hora que la velocidad intermitente.',
      'Frenar suavemente con motor evita que los que vienen detrás generen un choque múltiple.'
    ],
    quizQuestion: {
      question: '¿Cuál es la causa principal de que se forme un "trancón fantasma" sin que haya ningún accidente?',
      options: [
        'Que la carretera se hace más angosta de repente',
        'La reacción en cadena por frenadas bruscas debido a no guardar distancia de seguridad',
        'Que los autos modernos pesan más que los antiguos',
        'Que los semáforos fallan de forma aleatoria'
      ],
      correctIndex: 1,
      explanation: 'El efecto acordeón se genera cuando la falta de distancia obliga a frenadas sucesivas cada vez más intensas hasta detener por completo el tráfico.'
    }
  },
  {
    id: 'vid_smart_traffic_lights',
    title: 'Semaforización Inteligente: Olas Verdes y Algoritmos Adaptativos',
    topic: 'Tráfico',
    category: 'Ingeniería de Tráfico',
    duration: '3:50 min',
    sourceName: 'Secretaría de Movilidad & Sistemas Inteligentes de Transporte',
    sourceBadge: 'Ingeniería y Tecnología',
    youtubeId: 'bA4yN9qYv4g',
    embedUrl: 'https://www.youtube-nocookie.com/embed/bA4yN9qYv4g?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    summary: 'Cómo los sensores subterráneos y algoritmos sincronizan cruces para crear "olas verdes" a 40-50 km/h y dar prelación al transporte masivo.',
    highlightTag: '🚦 SINCRONIZACIÓN URBANA',
    impactMetric: '📉 -40% Detenciones en Corredores',
    goldenRule: 'CALIBRA TU VELOCIDAD: Correr a 70 km/h rompe la ola verde y te obligará a esperar detenido en el semáforo rojo siguiente.',
    whyItHappens: 'Los semáforos modernos calculan la velocidad media de diseño (45 km/h). Quien acelera antes de tiempo llega cuando el semáforo aún está en fase roja, gastando combustible inútilmente.',
    solutionSteps: [
      { stepNumber: '1', title: 'Mantener Ritmo de Vía', desc: 'Circula a la velocidad recomendada (40-50 km/h) para empalmar verdes consecutivos.' },
      { stepNumber: '2', title: 'Luz Amarilla Preventiva', desc: 'Indica despejar la intersección o detenerse si la distancia de frenado es segura.' },
      { stepNumber: '3', title: 'Prioridad Transporte Masivo', desc: 'No bloquees la caja de intersección cuando los buses articulados tengan fase verde.' }
    ],
    doAndDont: {
      dos: [
        'Respetar la demarcación amarilla antibloqueo en la mitad de la intersección.',
        'Anticipar el arranque suave cuando la fase peatonal termine su ciclo.'
      ],
      donts: [
        'Acelerar a fondo al ver la luz amarilla para "alcanzar a pasar".',
        'Quedar detenido cruzado en medio del cruce impidiendo el flujo transversal.'
      ]
    },
    keyTakeaways: [
      'Las olas verdes funcionan a velocidades constantes de 40 a 50 km/h.',
      'La caja amarilla antibloqueo debe quedar siempre 100% libre.',
      'Los detectores dan paso prioritario a ambulancias y transporte masivo.',
      'Acelerar a exceso de velocidad solo aumenta el desgaste de frenos en cada cruce.'
    ],
    quizQuestion: {
      question: 'Si una avenida tiene calibrada una "ola verde" a 45 km/h, ¿qué ocurre si un auto corre a 80 km/h?',
      options: [
        'Llega 20 minutos antes sin contratiempos',
        'Llegará antes de que abra el ciclo y se detendrá forzosamente en el siguiente semáforo rojo',
        'El sistema inteligente le abrirá el semáforo para no interrumpirlo',
        'Recibirá un bono de eficiencia vial'
      ],
      correctIndex: 1,
      explanation: 'La sincronización depende del tiempo y la distancia calculados. Exceder la velocidad descalibra el avance y genera detenciones constantes.'
    }
  },

  // --- TRÁNSITO (AZUL ELÉCTRICO / ÍNDIGO: REGLAS, GLORIETAS Y PRELACIÓN) ---
  {
    id: 'vid_roundabouts',
    title: 'Glorietas y Rotondas: Prioridades, Carril de Salida e Intermitentes',
    topic: 'Tránsito',
    category: 'Normativa Vial Internacional',
    duration: '4:10 min',
    sourceName: 'Seguridad Vial y Tráfico DGT Oficial',
    sourceBadge: 'Normativa Estricta',
    youtubeId: 'k4q79JkU904',
    embedUrl: 'https://www.youtube-nocookie.com/embed/k4q79JkU904?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=800&auto=format&fit=crop&q=80',
    summary: 'Guía visual definitiva: quién tiene la prioridad al ingresar, qué carril tomar para girar y por qué NUNCA debes salir cruzando desde el carril interior.',
    highlightTag: '🚸 PRELACIÓN Y GIROS',
    impactMetric: '🛡️ Elimina el 80% de Choques Laterales',
    goldenRule: 'SALIDA EXCLUSIVA POR CARRIL EXTERIOR: Para abandonar la glorieta debes estar posicionado con antelación en el carril derecho exterior.',
    whyItHappens: 'El 70% de los siniestros en glorietas ocurren cuando un conductor en el carril interior corta transversalmente el paso de quien circula correctamente por el exterior.',
    solutionSteps: [
      { stepNumber: '1', title: 'Ceda el Paso al Ingresar', desc: 'La prioridad SIEMPRE la tiene el vehículo que ya circula dentro del anillo.' },
      { stepNumber: '2', title: 'Elección de Carril', desc: 'Usa el interior si vas a dar vuelta o salir en las últimas salidas; exterior si vas a salir pronto.' },
      { stepNumber: '3', title: 'Salida Señalizada', desc: 'Pásate al carril exterior antes de tu salida y enciende la direccional derecha.' }
    ],
    doAndDont: {
      dos: [
        'Dar otra vuelta al anillo con calma si no pudiste pasar al carril exterior a tiempo.',
        'Señalizar el cambio de carril interno con la direccional correspondiente.'
      ],
      donts: [
        'Cortar la trayectoria en diagonal desde el carril central o interior para salir.',
        'Ingresar a la rotonda asumiendo que los que están adentro deben frenar por ti.'
      ]
    },
    keyTakeaways: [
      'Prioridad absoluta al vehículo que ya está circulando dentro del anillo.',
      'La salida se realiza única y exclusivamente desde el carril exterior derecho.',
      'Si pierdes tu salida, dar otra vuelta completa es 100% legal y seguro.',
      'Usa las direccionales para avisar cambios de carril y salida definitiva.'
    ],
    quizQuestion: {
      question: '¿Qué debes hacer si estás en el carril interior de una glorieta y se aproxima tu salida pero el carril exterior está ocupado?',
      options: [
        'Frenar en seco en medio de la rotonda y esperar a que te den paso',
        'Tocar la bocina y cruzar atravesando el vehículo del carril derecho',
        'Dar otra vuelta completa al anillo y ubicarse con tiempo en el carril exterior',
        'Retroceder en reversa con cuidado'
      ],
      correctIndex: 2,
      explanation: 'Nunca se debe cortar el paso de otro vehículo. Dar otra vuelta a la glorieta permite posicionarse correctamente en el carril exterior sin peligro.'
    }
  },
  {
    id: 'vid_intersections_rules',
    title: 'Intersecciones Urbanas: Señal de PARE, Ceda el Paso y Regla de la Derecha',
    topic: 'Tránsito',
    category: 'Jerarquía de Vías',
    duration: '3:40 min',
    sourceName: 'Agencia Nacional de Tránsito y Movilidad',
    sourceBadge: 'Reglas de Oro',
    youtubeId: 'Fh5Q56C1e4E',
    embedUrl: 'https://www.youtube-nocookie.com/embed/Fh5Q56C1e4E?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&auto=format&fit=crop&q=80',
    summary: 'Aprende a diferenciar la detención absoluta de la señal octogonal de PARE frente al Ceda el Paso, y quién pasa primero en cruces no semaforizados.',
    highlightTag: '🛑 DETENCIÓN TOTAL',
    impactMetric: '🚨 Evita el 95% de Colisiones en T',
    goldenRule: 'EL PARE NO ES SUGERENCIA: La señal de PARE exige DETENCIÓN TOTAL a 0 km/h detrás de la línea de parada, aunque no veas vehículos.',
    whyItHappens: 'Muchos conductores hacen un "pare rodante" a 10 km/h sin detenerse, tiempo insuficiente para detectar peatones cruzando o ciclistas en velocidad de descenso.',
    solutionSteps: [
      { stepNumber: '1', title: 'Detención a Cero (0 km/h)', desc: 'Ruedas totalmente quietas detrás de la demarcación antes de avanzar.' },
      { stepNumber: '2', title: 'Mirada Doble', desc: 'Mira izquierda, luego derecha, y nuevamente a la izquierda antes de iniciar.' },
      { stepNumber: '3', title: 'Prioridad de la Derecha', desc: 'En intersecciones sin señalizar ni semáforos, el vehículo que viene por tu derecha tiene prelación.' }
    ],
    doAndDont: {
      dos: [
        'Detenerte por completo en la señal de PARE y contar mentalmente 2 segundos.',
        'Ceder el paso a peatones que ya hayan iniciado el cruce de la calzada.'
      ],
      donts: [
        'Hacer "pare rodante" pasando sin frenar por completo.',
        'Avanzar asumiendo que tu vía es principal si no hay señal que lo certifique.'
      ]
    },
    keyTakeaways: [
      'La señal octogonal de PARE exige velocímetro en 0 km/h obligatoriamente.',
      'El "Ceda el Paso" permite continuar si la vía está despejada sin frenar a cero.',
      'En cruces sin señales, la prelación pertenece al vehículo proveniente de la derecha.',
      'Los peatones siempre tienen prelación en intersecciones sobre giros vehiculares.'
    ],
    quizQuestion: {
      question: '¿Cuál es la diferencia legal fundamental entre la señal de PARE y la señal de CEDA EL PASO?',
      options: [
        'No hay ninguna diferencia, significan lo mismo',
        'El PARE exige detención absoluta obligatoria a 0 km/h; el Ceda el Paso solo si vienen vehículos',
        'El Ceda el Paso solo aplica para camiones pesados',
        'El PARE solo es obligatorio en horario nocturno'
      ],
      correctIndex: 1,
      explanation: 'La señal octogonal de PARE obliga a frenar totalmente las ruedas a 0 km/h, mientras que el Ceda el Paso permite pasar con precaución si la vía está despejada.'
    }
  },

  // --- PREVENCIÓN (ROJO INTENSO / CARMESÍ: PUNTOS CIEGOS, DISTRACCIONES Y PROTOCOLO P.A.S.) ---
  {
    id: 'vid_blind_spots',
    title: 'Puntos Ciegos en Vehículos Pesados: Dónde NUNCA Debes Ubicarte',
    topic: 'Prevención',
    category: 'Manejo Defensivo y Camiones',
    duration: '3:45 min',
    sourceName: 'Agencia Nacional de Seguridad Vial (ANSV)',
    sourceBadge: 'Campaña Oficial de Prevención',
    youtubeId: '7yV1E9t-rGE',
    embedUrl: 'https://www.youtube-nocookie.com/embed/7yV1E9t-rGE?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&auto=format&fit=crop&q=80',
    summary: 'Demostración de los 4 ángulos ciegos críticos donde un conductor de tractomula o autobús tiene invisibilidad total de ciclistas, motos y peatones.',
    highlightTag: '⚠️ ALERTA DE PUNTO CIEGO',
    impactMetric: '🚨 -88% de Atropellos por Giro',
    goldenRule: 'SI NO VES SUS ESPEJOS, ÉL NO TE VE: Si no alcanzas a ver los espejos laterales del camión, eres 100% invisible para el conductor.',
    whyItHappens: 'La cabina elevada de un vehículo pesado crea zonas de sombra óptica que abarcan hasta 12 metros detrás y 3 metros en el lateral derecho durante maniobras.',
    solutionSteps: [
      { stepNumber: '1', title: 'Ubicación Visible', desc: 'Posiciónate donde puedas ver la cara del conductor en su retrovisor exterior.' },
      { stepNumber: '2', title: 'Cero Adelantos por Derecha', desc: 'Nunca te metas por el costado derecho de un camión cerca de esquinas.' },
      { stepNumber: '3', title: 'Distancia Posterior', desc: 'Conserva al menos 4 metros de separación detrás de buses y camiones de carga.' }
    ],
    doAndDont: {
      dos: [
        'Esperar detrás del camión en intersecciones con paciencia sin adelantarte.',
        'Hacer ráfagas de luz o aviso sonoro breve si necesitas sobrepasarlo por la izquierda.'
      ],
      donts: [
        'Filtrar por la derecha cuando un autobús o camión se prepara para girar.',
        'Pararte justo debajo de la trompa delantera de un camión en el semáforo.'
      ]
    },
    keyTakeaways: [
      'El lateral derecho es el punto ciego más letal en giros urbanos.',
      'Un camión articulado necesita abrirse a la izquierda para poder girar a la derecha.',
      'Si no ves los ojos del conductor en su espejo, asume que no sabe que estás ahí.',
      'Mantén siempre espacio de escape si vas en motocicleta o bicicleta.'
    ],
    quizQuestion: {
      question: '¿Cuál es el ángulo ciego más amplio y peligroso en un camión pesado de carga urbana?',
      options: [
        'El techo del camión',
        'El lateral derecho, que se amplifica cuando el camión va a realizar un giro',
        'La llanta de repuesto',
        'El guardabarros izquierdo'
      ],
      correctIndex: 1,
      explanation: 'El costado derecho del camión tiene un área ciega masiva debido a la distancia con respecto a la cabina del piloto en vehículos con volante a la izquierda.'
    }
  },
  {
    id: 'vid_distraction',
    title: 'Distracciones al Volante y Celular: La Trampa Mortal de los 5 Segundos',
    topic: 'Prevención',
    category: 'Comportamiento y Reflejos',
    duration: '3:15 min',
    sourceName: 'Fundación MAPFRE Movilidad Segura',
    sourceBadge: 'Prevención Crítica',
    youtubeId: 'W3_42T1tWk0',
    embedUrl: 'https://www.youtube-nocookie.com/embed/W3_42T1tWk0?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80',
    summary: 'A 50 km/h, mirar una notificación durante 5 segundos equivale a conducir una cuadra entera (70 metros) con los ojos completamente vendados.',
    highlightTag: '📱 CERO DISTRACCIONES',
    impactMetric: '📉 Multiplica por 4 el Riesgo de Choque',
    goldenRule: 'MODO CONDUCCIÓN O SILENCIO: Ningún mensaje de WhatsApp o llamada telefónica vale más que tu vida o la de un peatón en la vía.',
    whyItHappens: 'El cerebro humano sufre "ceguera por falta de atención": aun mirando de reojo, la mente tarda hasta 3 segundos en procesar un peatón en la trayectoria.',
    solutionSteps: [
      { stepNumber: '1', title: 'Configura la Ruta Antes', desc: 'Programa el GPS en tu destino antes de poner la llave o encender el motor.' },
      { stepNumber: '2', title: 'Modo Auto Silencioso', desc: 'Activa el modo conducción en tu teléfono para no recibir alertas sonoras.' },
      { stepNumber: '3', title: 'Estacionar para Atender', desc: 'Si es una llamada urgente, oríllate en una bahía autorizada y segura.' }
    ],
    doAndDont: {
      dos: [
        'Colocar el teléfono fuera del alcance visual (guantera o soporte fijo con pantalla apagada).',
        'Pedir al copiloto que responda mensajes o revise mapas si viajas acompañado.'
      ],
      donts: [
        'Escribir mensajes de texto o enviar audios mientras esperas el semáforo en rojo.',
        'Manejar manipulando auriculares con cancelación de ruido.'
      ]
    },
    keyTakeaways: [
      'A 50 km/h se avanzan 14 metros por segundo completamente desatendidos.',
      'El uso de manos libres también reduce el 20% de la capacidad de reacción cerebral.',
      'La distracción por celular es hoy la principal causa de siniestros viales en ciudad.',
      'Los peatones atropellados por conductores distraídos no tienen aviso previo de frenada.'
    ],
    quizQuestion: {
      question: 'A una velocidad moderada de 50 km/h, ¿qué distancia recorre un auto a ciegas si el conductor revisa el celular 5 segundos?',
      options: [
        'Menos de 5 metros',
        'Aproximadamente 70 metros (casi una cuadra entera)',
        '30 centímetros',
        'El auto se frena solo automáticamente'
      ],
      correctIndex: 1,
      explanation: 'A 50 km/h se recorren 14 metros por segundo. Multiplicado por 5 segundos da 70 metros recorridos con cero atención al entorno.'
    }
  },
  {
    id: 'vid_pas_protocol',
    title: 'Protocolo P.A.S.: Proteger, Avisar y Socorrer en un Accidente Vial',
    topic: 'Prevención',
    category: 'Primeros Auxilios Viales',
    duration: '3:20 min',
    sourceName: 'Cruz Roja Internacional & Emergencias 123',
    sourceBadge: 'Rescate y Emergencia',
    youtubeId: 'yqX7BvK86Z8',
    embedUrl: 'https://www.youtube-nocookie.com/embed/yqX7BvK86Z8?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    summary: 'La regla de oro internacional que salva vidas en los primeros 10 minutos post-accidente: cómo asegurar la escena sin provocar una tragedia mayor.',
    highlightTag: '🆘 PROTOCOLO DE VIDA',
    impactMetric: '❤️ Salva Vidas en los 10 Minutos Clave',
    goldenRule: 'NUNCA RETIRES EL CASCO A UN MOTORIZADO: Podrías causar una lesión medular o parálisis irreversible. Espera al personal médico.',
    whyItHappens: 'El caos de un siniestro empuja a actuar sin pensar; el 30% de los socorristas inexpertos terminan siendo atropellados por no proteger el área primero.',
    solutionSteps: [
      { stepNumber: '1', title: 'P - PROTEGER', desc: 'Pon balizas o triángulos a 50 metros, enciende luces de emergencia y apaga motores.' },
      { stepNumber: '2', title: 'A - AVISAR', desc: 'Llama al 123 dando ubicación precisa, número de heridos y posibles derrames de gasolina.' },
      { stepNumber: '3', title: 'S - SOCORRER', desc: 'Habla con las víctimas para mantenerlas conscientes, sin mover el cuello ni darles agua.' }
    ],
    doAndDont: {
      dos: [
        'Asegurar tu propia integridad física antes de aproximarte a los vehículos siniestrados.',
        'Brindar apoyo emocional a los heridos diciendo que la ayuda profesional ya viene en camino.'
      ],
      donts: [
        'Mover a los heridos del interior de los autos a menos que haya riesgo inminente de fuego.',
        'Ofrecer agua, comida o medicamentos a las víctimas en estado de shock.'
      ]
    },
    keyTakeaways: [
      'Proteger la zona evita que autos a alta velocidad embistan el accidente.',
      'Llamar al 123 con precisión acelera la llegada de ambulancias medicalizadas.',
      'No retirar cascos a motociclistas bajo ninguna circunstancia.',
      'Mantener la calma es el primer acto de salvamento en una vía pública.'
    ],
    quizQuestion: {
      question: '¿Por qué está estrictamente contraindicado quitarle el casco a un motociclista accidentado en la calle?',
      options: [
        'Porque el casco es costoso y puede rayarse',
        'Porque cualquier movimiento no inmovilizado puede seccionar la médula espinal o causar tetraplejia',
        'Porque la policía debe tomarle fotos primero con el casco puesto',
        'Porque el casco mantiene la temperatura corporal'
      ],
      correctIndex: 1,
      explanation: 'La manipulación del cuello sin collarín ni técnica de inmovilización en bloque puede agravar fracturas de vértebras cervicales con consecuencias fatales.'
    }
  },

  // --- MOVILIDAD (VERDE ESMERALDA VIBRANTE / TEAL: PEATONES, CICLISTAS Y CONVIVENCIA) ---
  {
    id: 'vid_pedestrian_safety',
    title: 'Cruces Peatonales Seguros: Contacto Visual y Distancia de Frenado',
    topic: 'Movilidad',
    category: 'Seguridad Peatonal Activa',
    duration: '2:50 min',
    sourceName: 'Fundación MAPFRE & Seguridad Peatonal',
    sourceBadge: 'Cultura del Peatón',
    youtubeId: '3GZqN7cKjYQ',
    embedUrl: 'https://www.youtube-nocookie.com/embed/3GZqN7cKjYQ?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=800&auto=format&fit=crop&q=80',
    summary: 'La pintura de la cebra no frena autos físicamente: descubre cómo el contacto visual cara a cara y la visibilidad nocturna previenen el 85% de los siniestros.',
    highlightTag: '🚶 CONTACTO VISUAL VITAL',
    impactMetric: '👁️ -85% de Riesgo de Atropello',
    goldenRule: 'MIRA A LOS OJOS DEL CONDUCTOR: No cruces hasta que veas que el conductor te miró y sus neumáticos han disminuido su marcha visiblemente.',
    whyItHappens: 'El peatón asume que porque tiene luz verde o está sobre la cebra el auto frenará de inmediato, olvidando la física: a 50 km/h un auto necesita 25 metros para frenar.',
    solutionSteps: [
      { stepNumber: '1', title: 'Pausa en la Acera', desc: 'Detén el paso al borde de la acera y asoma la vista en ambos sentidos de la calzada.' },
      { stepNumber: '2', title: 'Contacto Visual Directo', desc: 'Busca los ojos del conductor para asegurarte de que te registró conscientemente.' },
      { stepNumber: '3', title: 'Cruce Recto y Seguro', desc: 'Cruza en línea recta sin detenerte ni distraerte con auriculares o el celular.' }
    ],
    doAndDont: {
      dos: [
        'Llevar prendas claras o elementos reflectivos si caminas de noche en la ciudad.',
        'Esperar a que el semáforo peatonal esté en verde fijo antes de bajar a la calle.'
      ],
      donts: [
        'Cruzar mirando la pantalla del celular con auriculares de música puestos.',
        'Salir intempestivamente entre dos autos estacionados que te ocultan de la vista.'
      ]
    },
    keyTakeaways: [
      'El contacto visual confirma que el conductor ha comenzado a frenar.',
      'La distancia total de frenado incluye 1 segundo de reacción + 15m de arrastre.',
      'De noche, un peatón con ropa oscura solo es visible a 18 metros; con reflectivo a 150m.',
      'Los niños deben ir siempre tomados firmemente de la mano al cruzar.'
    ],
    quizQuestion: {
      question: '¿Cuál es la acción más efectiva para cerciorarse de que un automóvil se detendrá en un paso de cebra?',
      options: [
        'Bajar la mirada y cruzar a paso rápido',
        'Hacer contacto visual con el conductor y verificar que redujo la marcha',
        'Gritar fuerte para avisar a los autos',
        'Confiar en que las líneas pintadas en el suelo tienen barrera física'
      ],
      correctIndex: 1,
      explanation: 'El contacto visual directo garantiza que el conductor te ha detectado en su campo visual y ha iniciado la desaceleración del vehículo.'
    }
  },
  {
    id: 'vid_micromobility_coexistence',
    title: 'Convivencia Vial: Ciclorrutas, Patinetas Eléctricas y Distancia de 1.5m',
    topic: 'Movilidad',
    category: 'Movilidad Sostenible y Micromovilidad',
    duration: '3:35 min',
    sourceName: 'Red de Ciudades por la Bicicleta & Movilidad Activa',
    sourceBadge: 'Convivencia Ciudadana',
    youtubeId: 'vQ2XG5s9l10',
    embedUrl: 'https://www.youtube-nocookie.com/embed/vQ2XG5s9l10?rel=0',
    thumbnail: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80',
    summary: 'Aprende las claves para compartir pacíficamente la calzada: el metro y medio obligatorio al adelantar, uso de luces y señales de brazo en bicicleta.',
    highlightTag: '🚲 METRO Y MEDIO DE RESPETO',
    impactMetric: '🚴‍♀️ +90% Seguridad en Adelantamientos',
    goldenRule: 'DEJA AL MENOS 1.5 METROS AL SOBREPASAR: La turbulencia del aire de un auto puede desestabilizar a ciclistas y patinetas.',
    whyItHappens: 'El roce o proximidad excesiva (menos de 1 metro) genera el "efecto succión", desequilibrando la rueda delantera de bicis y patinetas hacia la calzada.',
    solutionSteps: [
      { stepNumber: '1', title: 'Distancia Lateral Amplia', desc: 'Cambia de carril si es necesario para adelantar a ciclistas dejando 1.5m de margen.' },
      { stepNumber: '2', title: 'Luces Reglamentarias', desc: 'Bicicletas y patinetas deben usar luz blanca fija delantera y roja intermitente trasera.' },
      { stepNumber: '3', title: 'Señales con los Brazos', desc: 'Extiende el brazo horizontalmente para avisar giros con 30 metros de anticipación.' }
    ],
    doAndDont: {
      dos: [
        'Respetar las ciclorrutas exclusivas sin invadirlas con motos ni automóviles.',
        'Llevar casco reglamentario abrochado en cualquier vehículo de micromovilidad.'
      ],
      donts: [
        'Circular en patineta o bicicleta sobre andenes y aceras peatonales estrechas.',
        'Abrir la puerta del auto sin aplicar la técnica holandesa (mirar con la mano opuesta).'
      ]
    },
    keyTakeaways: [
      '1.5 metros es la distancia legal obligatoria para adelantar a un ciclista.',
      'Las aceras pertenecen exclusivamente al peatón, no a las patinetas de alta velocidad.',
      'La técnica de la puerta holandesa salva a miles de ciclistas de ser golpeados.',
      'Los ciclistas deben usar señales con los brazos para comunicar su rumbo.'
    ],
    quizQuestion: {
      question: '¿Cuál es la distancia lateral mínima que debe dejar un vehículo motorizado al sobrepasar a un ciclista en la calzada?',
      options: [
        '30 centímetros',
        '1.5 metros (metro y medio)',
        '3 metros de distancia',
        'No existe distancia regulada'
      ],
      correctIndex: 1,
      explanation: 'El margen de 1.5 metros evita el efecto de succión por masa de aire y protege al ciclista de caídas ante desniveles o baches en el asfalto.'
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
