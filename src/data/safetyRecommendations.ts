// Dedicated rich data for Key Recommendations (Recomendaciones Clave) with realistic imagery

import signsImg from '../assets/images/traffic_signs_chart_1790078148438.jpg';
import rulesImg from '../assets/images/traffic_rules_signs_grid_1790078289383.jpg';
import preventionImg from '../assets/images/prevention_shield_hand_icon_1790078674267.jpg';
import responsibleDrivingImg from '../assets/images/no_phone_driving_silhouette_1790078748593.jpg';
import motorcyclistImg from '../assets/images/motorcyclist_silhouette_icon_1790079069842.jpg';
import pedestrianImg from '../assets/images/pedestrian_signs_four_grid_1790079168489.jpg';
import roundaboutImg from '../assets/images/roundabout_diagram_1788438648636.jpg';
import bikeLaneImg from '../assets/images/cyclists_green_bikeway_1788438597822.jpg';

export interface KeyRecommendation {
  id: string;
  title: string;
  description: string;
  image?: string;
  tag?: string;
  highlight?: string;
  logoIcon?: string;
  logoCode?: string;
  logoColor?: 'red' | 'amber' | 'blue' | 'emerald' | 'cyan' | 'purple' | 'orange' | 'slate';
}

export const TOPIC_RECOMMENDATIONS: Record<string, KeyRecommendation[]> = {
  // 1. SEÑALES (Traffic Signs)
  senales: [
    {
      id: 'rec_senales_1',
      title: 'Señales Reglamentarias (Rojas)',
      description: 'Notifican prohibiciones obligatorias, restricciones de paso, sentidos viales y límites máximos de velocidad. Su desacato acarrea sanciones.',
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&auto=format&fit=crop&q=80',
      tag: 'Obligatorias',
      highlight: 'Prioridad y Pare absoluto',
      logoIcon: 'OctagonAlert',
      logoCode: 'PARE / SR',
      logoColor: 'red'
    },
    {
      id: 'rec_senales_2',
      title: 'Señales Preventivas (Amarillas)',
      description: 'Advierten con anticipación sobre riesgos potenciales o condiciones geométricas de la vía: curvas pronunciadas, resaltos y cruces escolares.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
      tag: 'Advertencia',
      highlight: 'Reducir marcha y anticipar',
      logoIcon: 'AlertTriangle',
      logoCode: 'ALERTA / SP',
      logoColor: 'amber'
    },
    {
      id: 'rec_senales_3',
      title: 'Señales Informativas (Azules y Verdes)',
      description: 'Orientan al conductor hacia destinos clave, hospitales, servicios de emergencia, vías troncales y puntos de interés urbano.',
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&auto=format&fit=crop&q=80',
      tag: 'Orientación',
      highlight: 'Destinos y primeros auxilios',
      logoIcon: 'Info',
      logoCode: 'INFO / SI',
      logoColor: 'blue'
    },
    {
      id: 'rec_senales_4',
      title: 'Demarcación y Señalización Horizontal',
      description: 'Líneas continuas (prohibido adelantar), líneas discontinuas, flechas direccionales y cebras peatonales pintadas con microesferas reflectivas.',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=600&auto=format&fit=crop&q=80',
      tag: 'Calzada',
      highlight: 'Líneas y pasos de cebra',
      logoIcon: 'Layers',
      logoCode: 'LÍNEAS / SH',
      logoColor: 'cyan'
    }
  ],

  // 2. NORMAS (Rules & Regulations)
  normas: [
    {
      id: 'rec_normas_1',
      title: 'Límites de Velocidad Urbanos (50 km/h y 30 km/h)',
      description: 'Máximo 50 km/h en avenidas arterias principales y 30 km/h en zonas residenciales, escolares y hospitalarias para salvar vidas.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
      tag: 'Velocidad',
      highlight: '30 km/h en zonas de convivencia',
      logoIcon: 'Gauge',
      logoCode: '50 MAX',
      logoColor: 'red'
    },
    {
      id: 'rec_normas_2',
      title: 'Prioridad Absoluta en Glorietas y Rotondas',
      description: 'Los vehículos que ya están dentro del anillo circulatorio tienen siempre la prelación frente a quienes intentan ingresar.',
      image: roundaboutImg,
      tag: 'Prelación',
      highlight: 'Ceder el paso antes de entrar',
      logoIcon: 'RotateCw',
      logoCode: 'GLORIETA',
      logoColor: 'blue'
    },
    {
      id: 'rec_normas_3',
      title: 'Cinturón en Todas las Plazas y Casco Abrochado',
      description: 'El cinturón salva vidas tanto en asientos delanteros como traseros. Los motociclistas deben portar casco integral certificado abrochado.',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80',
      tag: 'Seguridad Pasiva',
      highlight: '100% de los ocupantes protegidos',
      logoIcon: 'ShieldCheck',
      logoCode: 'PROTECCIÓN',
      logoColor: 'emerald'
    },
    {
      id: 'rec_normas_4',
      title: 'Cero Tolerancia a Conducción bajo Sustancias',
      description: 'Prohibición estricta de conducir tras ingerir bebidas alcohólicas o estupefacientes. Entrega las llaves o utiliza transporte público.',
      image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=600&auto=format&fit=crop&q=80',
      tag: 'Cero Alcohol',
      highlight: 'Conductor elegido o taxi',
      logoIcon: 'Ban',
      logoCode: '0.0% ALCOHOL',
      logoColor: 'red'
    }
  ],

  // 3. PREVENCIÓN (Risk Prevention)
  prevencion: [
    {
      id: 'rec_prev_1',
      title: 'Inspección Preoperacional del Vehículo',
      description: 'Revisa periódicamente la presión de las llantas, nivel de líquido de frenos, aceite, limpiabrisas y funcionamiento de luces direccionales.',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80',
      tag: 'Mantenimiento',
      highlight: 'Llantas y frenos óptimos',
      logoIcon: 'Wrench',
      logoCode: 'REVISIÓN',
      logoColor: 'slate'
    },
    {
      id: 'rec_prev_2',
      title: 'Manejo en Asfalto Mojado y Clima Lluvioso',
      description: 'Con lluvia el asfalto pierde adherencia: reduce la velocidad un 30%, enciende luces bajas y duplica la distancia con el auto anterior.',
      image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
      tag: 'Lluvia',
      highlight: 'Evita el hidroplaneo o aquaplaning',
      logoIcon: 'CloudRain',
      logoCode: 'LLUVIA SOS',
      logoColor: 'cyan'
    },
    {
      id: 'rec_prev_3',
      title: 'Distancia de Seguridad (Regla de 3 Segundos)',
      description: 'Escoge un punto de referencia fijo; cuando el vehículo de adelante pase, deben transcurrir al menos 3 segundos antes de que tú lo alcances.',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80',
      tag: 'Distancia',
      highlight: 'Espacio de frenado reactivo',
      logoIcon: 'Timer',
      logoCode: '3 SEGUNDOS',
      logoColor: 'amber'
    },
    {
      id: 'rec_prev_4',
      title: 'Kit Reglamentario de Emergencias y Botiquín',
      description: 'Porta extintor vigente, dos triángulos reflectivos con soporte, linterna de alta potencia, caja de herramientas básica y botiquín dotado.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
      tag: 'Equipo SOS',
      highlight: 'Extintor y triángulos obligatorios',
      logoIcon: 'BriefcaseMedical',
      logoCode: 'KIT S.O.S.',
      logoColor: 'red'
    }
  ],

  // 4. CONDUCCIÓN RESPONSABLE (Responsible Driving)
  conduccion: [
    {
      id: 'rec_cond_1',
      title: 'Cero Distracciones con Dispositivos Móviles',
      description: 'Nunca leas mensajes, sostengas el celular ni mires videos mientras manejas. 2 segundos de distracción equivalen a recorrer 30 metros a ciegas.',
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80',
      tag: 'Atención Plena',
      highlight: 'Manos al volante, ojos en la vía',
      logoIcon: 'SmartphoneOff',
      logoCode: 'NO CELULAR',
      logoColor: 'red'
    },
    {
      id: 'rec_cond_2',
      title: 'Señalización Anticipada con Luces Direccionales',
      description: 'Indica cada giro, incorporación o adelantamiento con al menos 30 metros de anticipación para permitir la reacción de los demás actores.',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80',
      tag: 'Comunicación',
      highlight: 'Direccionales 30m antes',
      logoIcon: 'Radio',
      logoCode: '30 METROS',
      logoColor: 'amber'
    },
    {
      id: 'rec_cond_3',
      title: 'Distancia Mínima Lateral de 1.5 Metros con Ciclistas',
      description: 'Al sobrepasar a un ciclista o usuario de micromovilidad, respeta como mínimo 1.5 metros de separación lateral para no desestabilizarlo.',
      image: bikeLaneImg,
      tag: 'Convivencia',
      highlight: '1.5 metros de respeto vital',
      logoIcon: 'Bike',
      logoCode: '1.5 METROS',
      logoColor: 'emerald'
    },
    {
      id: 'rec_cond_4',
      title: 'Monitoreo de Espejos y Ángulos Muertos',
      description: 'Verifica los tres espejos retrovisores cada 5 a 8 segundos y haz un chequeo rápido de hombro antes de cambiar de carril.',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&auto=format&fit=crop&q=80',
      tag: 'Visibilidad',
      highlight: 'Retrovisores y chequeo de hombro',
      logoIcon: 'Eye',
      logoCode: 'ESPEJOS 360',
      logoColor: 'blue'
    }
  ],

  // 5. MOTOCICLISTAS (Motorcyclists)
  motociclistas: [
    {
      id: 'rec_moto_1',
      title: 'Casco Integral Certificado (ECE 22.06 / DOT)',
      description: 'El casco debe ser de cobertura total, ajustado a tu medida y correctamente abrochado con barboquejo en todo momento.',
      image: motorcyclistImg,
      tag: 'Casco Certificado',
      highlight: 'Protección craneal y facial completa',
      logoIcon: 'ShieldAlert',
      logoCode: 'CASCO DOT',
      logoColor: 'slate'
    },
    {
      id: 'rec_moto_2',
      title: 'Prendas de Alta Visibilidad y Guantes de Protección',
      description: 'Chaqueta resistente a la abrasión con reflectivos visibles a distancia y guantes con protecciones en nudillos y palmas.',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
      tag: 'Indumentaria',
      highlight: 'Hazte visible de día y de noche',
      logoIcon: 'Sparkles',
      logoCode: 'REFLECTIVOS',
      logoColor: 'amber'
    },
    {
      id: 'rec_moto_3',
      title: 'Posicionamiento Seguro en el Centro del Carril',
      description: 'Ocupa la huella central del carril. Evita transitar entre autos en marcha sobre las líneas divisorias de carril.',
      image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=600&auto=format&fit=crop&q=80',
      tag: 'Carril Propio',
      highlight: 'No adelantar entre vehículos en marcha',
      logoIcon: 'Car',
      logoCode: 'CARRIL 1',
      logoColor: 'blue'
    },
    {
      id: 'rec_moto_4',
      title: 'Evitar Puntos Ciegos de Buses y Vehículos de Carga',
      description: 'Si no puedes ver los espejos del conductor del camión o bus, ese conductor tampoco puede verte a ti. Aléjate de sus laterales.',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=80',
      tag: 'Puntos Ciegos',
      highlight: 'Distancia prudente de vehículos pesados',
      logoIcon: 'AlertTriangle',
      logoCode: 'PUNTO CIEGO',
      logoColor: 'orange'
    }
  ],

  // 6. PEATONES (Pedestrians)
  peatones: [
    {
      id: 'rec_peat_1',
      title: 'Cruce Exclusivo por Pasos de Cebra y Puentes',
      description: 'Cruza siempre por las líneas cebradas señalizadas, cruces semaforizados para peatones o puentes elevados peatonales.',
      image: pedestrianImg,
      tag: 'Paso Seguro',
      highlight: 'Semáforo peatonal en verde',
      logoIcon: 'Footprints',
      logoCode: 'PASO CEBRA',
      logoColor: 'emerald'
    },
    {
      id: 'rec_peat_2',
      title: 'Contacto Visual Seguro con los Conductores',
      description: 'Antes de pisar la calzada, haz contacto visual directo con quien conduce para confirmar que ha frenado completamente.',
      image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=80',
      tag: 'Contacto Visual',
      highlight: 'Verifica que el auto esté detenido',
      logoIcon: 'Eye',
      logoCode: 'CONTACTO',
      logoColor: 'cyan'
    },
    {
      id: 'rec_peat_3',
      title: 'Respeto a Carriles Exclusivos de Metroplús y Bicis',
      description: 'No camines sobre las ciclorrutas ni invadas los carriles segregados de buses de tránsito rápido; son para vehículos a velocidad constante.',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=80',
      tag: 'Carriles Especiales',
      highlight: 'Andenes amplios y despejados',
      logoIcon: 'Layers',
      logoCode: 'CARRIL BUS',
      logoColor: 'purple'
    },
    {
      id: 'rec_peat_4',
      title: 'Atención ante Vehículos Eléctricos Silenciosos',
      description: 'Los nuevos automóviles, buses y patinetas eléctricas circulan casi sin emitir ruido. Mira a ambos lados antes de avanzar.',
      image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=600&auto=format&fit=crop&q=80',
      tag: 'Vehículos Eléctricos',
      highlight: 'Alerta visual en intersecciones',
      logoIcon: 'Zap',
      logoCode: 'EV SILENTE',
      logoColor: 'amber'
    }
  ]
};

// Campaign specific recommendations with logos
export const CAMPAIGN_RECOMMENDATIONS_WITH_IMAGES: Record<string, KeyRecommendation[]> = {
  camp_1: [
    {
      id: 'c1_1',
      title: 'Cruza siempre por la cebra o puentes peatonales',
      description: 'Usa las zonas demarcadas para garantizar tu visibilidad y derecho de vía ante el tráfico.',
      image: pedestrianImg,
      tag: 'Paso Peatonal',
      logoIcon: 'Footprints',
      logoCode: 'PASO CEBRA',
      logoColor: 'emerald'
    },
    {
      id: 'c1_2',
      title: 'Evita usar el celular mientras caminas por intersecciones',
      description: 'El uso de audífonos y pantallas nubla los sentidos auditivos y visuales en esquinas críticas.',
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80',
      tag: 'Cero Pantallas',
      logoIcon: 'SmartphoneOff',
      logoCode: 'SIN PANTALLA',
      logoColor: 'red'
    },
    {
      id: 'c1_3',
      title: 'Haz contacto visual con los conductores antes de cruzar',
      description: 'Asegúrate de que te han visto y han iniciado el proceso de desaceleración total.',
      image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=80',
      tag: 'Seguridad Activa',
      logoIcon: 'Eye',
      logoCode: 'CONTACTO',
      logoColor: 'cyan'
    }
  ],
  camp_2: [
    {
      id: 'c2_1',
      title: 'Usa casco certificado y elementos reflectivos',
      description: 'Protege tu integridad con equipo certificado y sé visible a más de 100 metros en la noche.',
      image: motorcyclistImg,
      tag: 'Equipo Vital',
      logoIcon: 'ShieldCheck',
      logoCode: 'CASCO VITAL',
      logoColor: 'emerald'
    },
    {
      id: 'c2_2',
      title: 'Transita por ciclorrutas habilitadas y no por andenes',
      description: 'Los andenes son espacio exclusivo para caminantes. Mantén la bicicleta en la ciclo-infraestructura.',
      image: bikeLaneImg,
      tag: 'Ciclorrutas',
      logoIcon: 'Bike',
      logoCode: 'CICLORRUTA',
      logoColor: 'blue'
    },
    {
      id: 'c2_3',
      title: 'Respeta la señalización y los semáforos en rojo',
      description: 'Detente ante la luz roja y señaliza giros con tus brazos anticipadamente.',
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&auto=format&fit=crop&q=80',
      tag: 'Semáforos',
      logoIcon: 'OctagonAlert',
      logoCode: 'SEMÁFORO',
      logoColor: 'red'
    }
  ],
  camp_3: [
    {
      id: 'c3_1',
      title: 'Respeta el límite de 50 km/h en vías urbanas principales',
      description: 'Mantener la velocidad reglamentaria reduce el riesgo de colisiones fatales en más de un 60%.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
      tag: '50 km/h',
      logoIcon: 'Gauge',
      logoCode: '50 KM/H',
      logoColor: 'red'
    },
    {
      id: 'c3_2',
      title: 'Reduce la velocidad a 30 km/h en zonas escolares y residenciales',
      description: 'En presencia de niños y adultos mayores, 30 km/h otorga tiempo suficiente de frenado de emergencia.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
      tag: 'Zona 30',
      logoIcon: 'Gauge',
      logoCode: '30 ZONA',
      logoColor: 'amber'
    },
    {
      id: 'c3_3',
      title: 'Mantén la distancia prudente con el vehículo precedente',
      description: 'Espacia al menos 3 segundos de distancia para reaccionar ante frenadas repentinas.',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80',
      tag: 'Distancia 3s',
      logoIcon: 'Timer',
      logoCode: '3 SEGUNDOS',
      logoColor: 'blue'
    }
  ],
  camp_4: [
    {
      id: 'c4_1',
      title: 'Respeta los límites de 30 km/h en proximidad a colegios',
      description: 'Las zonas escolares exigen velocidad mínima y atención constante ante el tránsito de menores.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
      tag: 'Colegios',
      logoIcon: 'AlertTriangle',
      logoCode: 'ZONA ESCOLAR',
      logoColor: 'amber'
    },
    {
      id: 'c4_2',
      title: 'Cede el paso a niños y cuidadores en todo momento',
      description: 'Los escolares tienen prelación de paso absoluta en pasos peatonales y paraderos.',
      image: pedestrianImg,
      tag: 'Prelación',
      logoIcon: 'Footprints',
      logoCode: 'PRELACIÓN',
      logoColor: 'emerald'
    },
    {
      id: 'c4_3',
      title: 'Nunca te estaciones en doble fila obstruyendo la visibilidad',
      description: 'Estacionar en doble fila crea puntos ciegos mortales donde los niños no ven los autos aproximarse.',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=600&auto=format&fit=crop&q=80',
      tag: 'No Doble Fila',
      logoIcon: 'Ban',
      logoCode: 'NO PARQUEO',
      logoColor: 'red'
    }
  ],
  camp_5: [
    {
      id: 'c5_1',
      title: 'Usa prendas con bandas reflectivas visibles a más de 100m',
      description: 'Las prendas de alta visibilidad permiten que los conductores te distingan en la penumbra.',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
      tag: 'Reflectivos',
      logoIcon: 'Sparkles',
      logoCode: 'REFLECTIVOS',
      logoColor: 'amber'
    },
    {
      id: 'c5_2',
      title: 'Mantén encendidas las luces frontales y traseras reglamentarias',
      description: 'Luz blanca delantera y luz roja trasera destellante o fija para bicicletas y motos.',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80',
      tag: 'Luces Activas',
      logoIcon: 'Radio',
      logoCode: 'LUCES ON',
      logoColor: 'cyan'
    },
    {
      id: 'c5_3',
      title: 'Reduce la velocidad ante menor visibilidad o lluvia nocturna',
      description: 'En la noche el campo visual se contrae; reduce la velocidad para ampliar tu horizonte reactivo.',
      image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
      tag: 'Visibilidad',
      logoIcon: 'CloudRain',
      logoCode: 'LLUVIA NOCHE',
      logoColor: 'blue'
    }
  ],
  camp_6: [
    {
      id: 'c6_1',
      title: 'Activa el modo no molestar o conducción antes de arrancar',
      description: 'Silencia llamadas y notificaciones para evitar distracciones en momentos críticos.',
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80',
      tag: 'Modo Auto',
      logoIcon: 'SmartphoneOff',
      logoCode: 'MODO AUTO',
      logoColor: 'red'
    },
    {
      id: 'c6_2',
      title: 'Si necesitas contestar una llamada urgente, estaciónate',
      description: 'Búscate un punto autorizado y seguro fuera del flujo vehicular para atender llamadas.',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&auto=format&fit=crop&q=80',
      tag: 'Parada Segura',
      logoIcon: 'Car',
      logoCode: 'PARADA OK',
      logoColor: 'blue'
    },
    {
      id: 'c6_3',
      title: 'Usa comandos de voz con manos libres si es estrictamente necesario',
      description: 'Nunca despegues las dos manos del volante ni desvíes la vista de la calzada.',
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80',
      tag: 'Manos Libres',
      logoIcon: 'Radio',
      logoCode: 'VOZ / SOS',
      logoColor: 'purple'
    }
  ]
};

// Fallback helper to retrieve recommendations with images
export function getRecommendationsForTopic(topicId: string): KeyRecommendation[] {
  if (TOPIC_RECOMMENDATIONS[topicId]) {
    return TOPIC_RECOMMENDATIONS[topicId];
  }
  return TOPIC_RECOMMENDATIONS.senales;
}

export function getCampaignRecommendations(campaignId: string): KeyRecommendation[] {
  if (CAMPAIGN_RECOMMENDATIONS_WITH_IMAGES[campaignId]) {
    return CAMPAIGN_RECOMMENDATIONS_WITH_IMAGES[campaignId];
  }
  return CAMPAIGN_RECOMMENDATIONS_WITH_IMAGES.camp_1;
}
