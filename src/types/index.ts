export type NavigationTab = 
  | 'inicio' 
  | 'rutas' 
  | 'seguridad' 
  | 'educacion' 
  | 'campanas' 
  | 'nosotros' 
  | 'perfil' 
  | 'contacto';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  city: string;
  country?: string;
  countryCode?: string;
  countryFlag?: string;
  memberSince: string;
  kmTraveled: number;
  safetyScore: number;
  monthlyStats: {
    routesCompleted: number;
    totalRoutesGoal: number;
    educationalModules: number;
    totalModulesGoal: number;
    co2SavedKg: number;
    cyclingKm: number;
  };
  badges: {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
    unlockedAt: string;
  }[];
}

export interface RouteOption {
  id: 'rapida' | 'segura' | 'alternativa';
  name: string;
  distance: string;
  time: string;
  trafficStatus: string;
  description: string;
  badgeColor: string;
  safetyRating: number;
  lightingQuality: 'Alta' | 'Media' | 'Básica';
  tollFree: boolean;
  color: string;
  waypoints: { lat: number; lng: number; name: string }[];
  steps: { instruction: string; distance: string; icon: string }[];
}

export interface MobilityAlert {
  id: string;
  type: 'accidente' | 'obras' | 'trafico' | 'inundacion';
  title: string;
  description: string;
  location: string;
  timeAgo: string;
  severity: 'critico' | 'obras' | 'denso' | 'moderado';
  severityLabel: string;
  badgeBg: string;
  coordinates: { x: number; y: number };
  verified: boolean;
  affectedLanes: string;
  alternativeRouteSuggestion: string;
  image: string;
}

export interface EducationCourse {
  id: string;
  title: string;
  description: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  category: 'Micromovilidad' | 'Seguridad Peatonal' | 'Normativa Urbana' | 'Respuesta';
  duration: string;
  progress: number;
  recommended?: boolean;
  lessonsCount: number;
  image: string;
  overview: string;
  topics: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswerId: string;
  explanation: string;
}

export interface SafetyCampaign {
  id: string;
  title: string;
  subtitle: string;
  targetCategory: string;
  targetType: 'peatones' | 'micromovilidad' | 'conductores' | 'escolar' | 'nocturno' | 'infraestructura';
  description: string;
  fullContent: string;
  recommendations: string[];
  image: string;
  stats: string;
}

export interface SafetyPillar {
  id: string;
  title: string;
  iconName: string;
  description: string;
  details: string[];
  color: string;
}
