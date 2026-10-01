import { UserProfile } from '../types';
import { mockUserProfile } from '../data/mockData';

const ACTIVE_USER_KEY = 'vianova_active_user';
const REGISTERED_USERS_KEY = 'vianova_registered_users';
const LOGGED_OUT_KEY = 'vianova_logged_out';
const CURRENT_TAB_KEY = 'vianova_current_tab';

/**
 * Verified base demo credentials for testing
 */
export const DEMO_CREDENTIALS = {
  name: 'Carlos Mendoza',
  email: 'carlos.mendoza@ciudad.gov.co',
  password: 'Vianova2026*',
  role: 'Ciclista Urbano',
  city: 'Medellín'
};

const INITIAL_DEMO_USER: UserProfile & { password?: string } = {
  id: 'usr_carlos_mendoza',
  name: DEMO_CREDENTIALS.name,
  role: DEMO_CREDENTIALS.role,
  email: DEMO_CREDENTIALS.email,
  password: DEMO_CREDENTIALS.password,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  city: DEMO_CREDENTIALS.city,
  country: 'Colombia',
  countryCode: '+57',
  countryFlag: '🇨🇴',
  phone: '300 123 4567',
  documentType: 'CC',
  documentNumber: '1020304050',
  vehiclePlate: 'ABC-12D',
  memberSince: 'Septiembre 2026',
  authProvider: 'email',
  kmTraveled: 1240,
  safetyScore: 94,
  monthlyStats: {
    routesCompleted: 18,
    totalRoutesGoal: 20,
    educationalModules: 8,
    totalModulesGoal: 10,
    co2SavedKg: 42,
    cyclingKm: 180,
  },
  badges: [
    {
      id: 'b1',
      name: 'Ciclista Responsable',
      icon: 'Bike',
      color: 'blue',
      description: 'Más de 100 km recorridos en ciclorrutas seguras.',
      unlockedAt: '15 Sep 2026'
    },
    {
      id: 'b2',
      name: 'Guardián Vial',
      icon: 'ShieldCheck',
      color: 'emerald',
      description: 'Reportó 5 alertas tempranas verificadas por la comunidad.',
      unlockedAt: '20 Sep 2026'
    }
  ]
};

/**
 * Retrieves the list of all registered users from the local database.
 * If empty, seeds the official initial user to guarantee baseline data.
 */
export function getRegisteredUsers(): Array<UserProfile & { password?: string }> {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY) || sessionStorage.getItem(REGISTERED_USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading registered users database', e);
  }

  // Seed default registered demo user
  const initial = [INITIAL_DEMO_USER];
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(initial));
    sessionStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(initial));
  } catch (e) {}

  return initial;
}

/**
 * Saves a new user or updates an existing one in the registered database.
 */
export function saveRegisteredUser(userWithPassword: UserProfile & { password?: string }) {
  try {
    const current = getRegisteredUsers();
    const filtered = current.filter(
      (u) => u.email?.trim().toLowerCase() !== userWithPassword.email?.trim().toLowerCase()
    );
    filtered.push(userWithPassword);
    
    const serialized = JSON.stringify(filtered);
    localStorage.setItem(REGISTERED_USERS_KEY, serialized);
    sessionStorage.setItem(REGISTERED_USERS_KEY, serialized);
  } catch (e) {
    console.error('Error saving user to database', e);
  }
}

/**
 * Registers a new user into the database after validating fields and uniqueness.
 */
export function registerNewUser(
  userData: {
    name: string;
    email: string;
    city?: string;
    role?: string;
    phone?: string;
  },
  password: string
): { success: boolean; user?: UserProfile; error?: string } {
  const cleanEmail = userData.email.trim().toLowerCase();
  const cleanName = userData.name.trim();
  const cleanPassword = password.trim();

  if (!cleanName) {
    return { success: false, error: 'Por favor ingresa tu nombre completo.' };
  }
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Por favor ingresa un correo electrónico válido.' };
  }
  if (!cleanPassword || cleanPassword.length < 6) {
    return { success: false, error: 'La contraseña debe tener al menos 6 caracteres.' };
  }

  const registeredUsers = getRegisteredUsers();
  const alreadyExists = registeredUsers.some(
    (u) => u.email?.trim().toLowerCase() === cleanEmail
  );

  if (alreadyExists) {
    return {
      success: false,
      error: 'Este correo electrónico ya se encuentra registrado. Por favor inicia sesión con tus credenciales.'
    };
  }

  const newUser: UserProfile = {
    id: `usr_${Date.now()}`,
    name: cleanName,
    role: userData.role || 'Ciclista Urbano',
    email: cleanEmail,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}`,
    city: userData.city?.trim() || 'Medellín',
    country: 'Colombia',
    countryCode: '+57',
    countryFlag: '🇨🇴',
    phone: userData.phone || '',
    memberSince: 'Octubre 2026',
    authProvider: 'email',
    kmTraveled: 0,
    safetyScore: 100,
    monthlyStats: {
      routesCompleted: 0,
      totalRoutesGoal: 20,
      educationalModules: 0,
      totalModulesGoal: 10,
      co2SavedKg: 0,
      cyclingKm: 0,
    },
    badges: [
      {
        id: 'b_welcome',
        name: 'Nuevo Miembro VIANOVA',
        icon: 'ShieldCheck',
        color: 'blue',
        description: 'Bienvenido a la comunidad de movilidad urbana inteligente.',
        unlockedAt: 'Hoy'
      }
    ],
  };

  saveRegisteredUser({ ...newUser, password: cleanPassword });
  saveActiveSession(newUser);

  return { success: true, user: newUser };
}

/**
 * Strict validation of user credentials against the registered database.
 * Does NOT permit login if the user is not previously registered or password mismatch.
 */
export function validateCredentials(
  email: string, 
  password: string
): { success: boolean; user?: UserProfile; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanEmail) {
    return { success: false, error: 'Por favor ingresa tu correo electrónico.' };
  }

  if (!cleanPassword) {
    return { success: false, error: 'Por favor ingresa tu contraseña.' };
  }

  const registeredUsers = getRegisteredUsers();
  const matched = registeredUsers.find(
    (u) => u.email?.trim().toLowerCase() === cleanEmail
  );

  // 1. Check if user exists in registered database
  if (!matched) {
    return {
      success: false,
      error: 'El usuario no se encuentra registrado en el sistema. Debes crear una cuenta antes de iniciar sesión.'
    };
  }

  // 2. Validate password
  if (matched.password && matched.password !== cleanPassword) {
    return {
      success: false,
      error: 'Contraseña incorrecta. Por favor verifica tus credenciales e intenta nuevamente.'
    };
  }

  // Credentials are valid: Return clean user profile without password
  const { password: _p, ...cleanProfile } = matched;
  return {
    success: true,
    user: cleanProfile as UserProfile
  };
}

/**
 * Handles Google OAuth Single Sign-On (SSO):
 * Registers the user in the database if new, or retrieves existing Google user profile.
 */
export function loginOrRegisterWithGoogle(googleData: {
  email: string;
  name: string;
  avatar?: string;
}): UserProfile {
  const cleanEmail = googleData.email.trim().toLowerCase();
  const registeredUsers = getRegisteredUsers();
  const existing = registeredUsers.find((u) => u.email?.trim().toLowerCase() === cleanEmail);

  if (existing) {
    const { password: _p, ...cleanProfile } = existing;
    const updated: UserProfile = {
      ...cleanProfile,
      name: googleData.name || cleanProfile.name,
      avatar: googleData.avatar || cleanProfile.avatar,
      authProvider: 'google',
    };
    saveActiveSession(updated);
    saveRegisteredUser({ ...existing, ...updated });
    return updated;
  }

  // Create new registered user with Google provider
  const newUser: UserProfile & { password?: string } = {
    id: `usr_g_${Date.now()}`,
    name: googleData.name.trim() || 'Usuario Google',
    role: 'Ciudadano Conectado',
    email: cleanEmail,
    avatar: googleData.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(googleData.name)}`,
    city: 'Medellín',
    country: 'Colombia',
    countryCode: '+57',
    countryFlag: '🇨🇴',
    memberSince: 'Octubre 2026',
    authProvider: 'google',
    kmTraveled: 0,
    safetyScore: 100,
    monthlyStats: {
      routesCompleted: 0,
      totalRoutesGoal: 20,
      educationalModules: 0,
      totalModulesGoal: 10,
      co2SavedKg: 0,
      cyclingKm: 0,
    },
    badges: [
      {
        id: 'bg_google',
        name: 'Cuenta Google Verificada',
        icon: 'ShieldCheck',
        color: 'emerald',
        description: 'Autenticación certificada con Google Identity.',
        unlockedAt: 'Hoy'
      }
    ],
  };

  saveRegisteredUser(newUser);
  const { password: _p, ...cleanNewProfile } = newUser;
  saveActiveSession(cleanNewProfile);
  return cleanNewProfile;
}

/**
 * Helper to get a cookie value by name
 */
function getCookie(name: string): string | null {
  try {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
  } catch (e) {}
  return null;
}

/**
 * Helper to set a cookie with 1 year expiration
 */
function setCookie(name: string, value: string) {
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
  } catch (e) {}
}

/**
 * Helper to remove a cookie
 */
function removeCookie(name: string) {
  try {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
  } catch (e) {}
}

/**
 * Saves the active session to localStorage, sessionStorage, and cookies.
 * Clears any explicit "logged out" flag.
 */
export function saveActiveSession(user: UserProfile) {
  const serialized = JSON.stringify(user);
  
  try {
    localStorage.setItem(ACTIVE_USER_KEY, serialized);
    localStorage.removeItem(LOGGED_OUT_KEY);
  } catch (e) {}

  try {
    sessionStorage.setItem(ACTIVE_USER_KEY, serialized);
    sessionStorage.removeItem(LOGGED_OUT_KEY);
  } catch (e) {}

  setCookie(ACTIVE_USER_KEY, serialized);
  removeCookie(LOGGED_OUT_KEY);
}

/**
 * Clears the active session and marks explicit logout.
 */
export function clearActiveSession() {
  try {
    localStorage.removeItem(ACTIVE_USER_KEY);
    localStorage.setItem(LOGGED_OUT_KEY, 'true');
  } catch (e) {}

  try {
    sessionStorage.removeItem(ACTIVE_USER_KEY);
    sessionStorage.setItem(LOGGED_OUT_KEY, 'true');
  } catch (e) {}

  removeCookie(ACTIVE_USER_KEY);
  setCookie(LOGGED_OUT_KEY, 'true');
}

/**
 * Deletes user account and associated session from database
 */
export function deleteAccountSession(email?: string) {
  if (email) {
    try {
      const cleanEmail = email.toLowerCase();
      const stored = getRegisteredUsers();
      const filtered = stored.filter((u) => u.email?.toLowerCase() !== cleanEmail);
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(filtered));
      sessionStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(filtered));
    } catch (e) {}
  }

  clearActiveSession();
}

/**
 * Retrieves the initial session on app boot or page reload.
 * Strictly checks for an active authenticated session.
 * Does NOT auto-authenticate users who haven't logged in.
 */
export function getInitialSession(): { user: UserProfile; isAuthenticated: boolean } {
  // Check if the user explicitly clicked "Cerrar sesión"
  try {
    if (localStorage.getItem(LOGGED_OUT_KEY) === 'true' || sessionStorage.getItem(LOGGED_OUT_KEY) === 'true') {
      return { user: mockUserProfile, isAuthenticated: false };
    }
  } catch (e) {}

  // 1. Try reading active user from localStorage
  try {
    const raw = localStorage.getItem(ACTIVE_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.email || parsed.id)) {
        return { user: parsed, isAuthenticated: true };
      }
    }
  } catch (e) {}

  // 2. Try reading active user from sessionStorage
  try {
    const raw = sessionStorage.getItem(ACTIVE_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.email || parsed.id)) {
        saveActiveSession(parsed);
        return { user: parsed, isAuthenticated: true };
      }
    }
  } catch (e) {}

  // 3. Try reading active user from cookies
  try {
    const raw = getCookie(ACTIVE_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.email || parsed.id)) {
        saveActiveSession(parsed);
        return { user: parsed, isAuthenticated: true };
      }
    }
  } catch (e) {}

  // User is not authenticated; require login / validation
  return { user: mockUserProfile, isAuthenticated: false };
}

/**
 * Get and save active navigation tab
 */
export function getSavedTab(): any {
  try {
    const saved = localStorage.getItem(CURRENT_TAB_KEY) || sessionStorage.getItem(CURRENT_TAB_KEY);
    if (saved) return saved;
  } catch (e) {}
  return 'inicio';
}

export function saveCurrentTab(tab: string) {
  try {
    localStorage.setItem(CURRENT_TAB_KEY, tab);
    sessionStorage.setItem(CURRENT_TAB_KEY, tab);
  } catch (e) {}
}
