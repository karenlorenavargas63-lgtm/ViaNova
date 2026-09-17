import { UserProfile } from '../types';
import { mockUserProfile } from '../data/mockData';

const ACTIVE_USER_KEY = 'vianova_active_user';
const REGISTERED_USERS_KEY = 'vianova_registered_users';
const LOGGED_OUT_KEY = 'vianova_logged_out';
const CURRENT_TAB_KEY = 'vianova_current_tab';

/**
 * Helper to get a cookie value by name
 */
function getCookie(name: string): string | null {
  try {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
  } catch (e) {
    // Ignore cookie read error
  }
  return null;
}

/**
 * Helper to set a cookie with 1 year expiration
 */
function setCookie(name: string, value: string) {
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
  } catch (e) {
    // Ignore cookie write error
  }
}

/**
 * Helper to remove a cookie
 */
function removeCookie(name: string) {
  try {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
  } catch (e) {
    // Ignore
  }
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
  } catch (e) {
    console.warn('localStorage not available', e);
  }

  try {
    sessionStorage.setItem(ACTIVE_USER_KEY, serialized);
    sessionStorage.removeItem(LOGGED_OUT_KEY);
  } catch (e) {
    console.warn('sessionStorage not available', e);
  }

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
 * Deletes user account and associated session
 */
export function deleteAccountSession(email?: string) {
  try {
    const stored = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
    const filtered = stored.filter((u: any) => u.email?.toLowerCase() !== email?.toLowerCase());
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(filtered));
  } catch (e) {}

  try {
    const storedSession = JSON.parse(sessionStorage.getItem(REGISTERED_USERS_KEY) || '[]');
    const filteredSession = storedSession.filter((u: any) => u.email?.toLowerCase() !== email?.toLowerCase());
    sessionStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(filteredSession));
  } catch (e) {}

  clearActiveSession();
}

/**
 * Retrieves the initial session on app boot or page reload.
 * Guaranteed to keep the user logged in if they have already registered
 * and did not explicitly log out.
 */
export function getInitialSession(): { user: UserProfile; isAuthenticated: boolean } {
  // Check if the user explicitly clicked "Cerrar sesión"
  let isExplicitlyLoggedOut = false;
  try {
    if (localStorage.getItem(LOGGED_OUT_KEY) === 'true' || sessionStorage.getItem(LOGGED_OUT_KEY) === 'true') {
      isExplicitlyLoggedOut = true;
    }
  } catch (e) {}

  if (isExplicitlyLoggedOut) {
    return { user: mockUserProfile, isAuthenticated: false };
  }

  // 1. Try reading active user from localStorage
  try {
    const raw = localStorage.getItem(ACTIVE_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.email || parsed.name)) {
        return { user: parsed, isAuthenticated: true };
      }
    }
  } catch (e) {}

  // 2. Try reading active user from sessionStorage
  try {
    const raw = sessionStorage.getItem(ACTIVE_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.email || parsed.name)) {
        // Sync back to localStorage
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
      if (parsed && (parsed.email || parsed.name)) {
        saveActiveSession(parsed);
        return { user: parsed, isAuthenticated: true };
      }
    }
  } catch (e) {}

  // 4. If active user wasn't found directly, check registered users:
  // "que cundo el usuario ya se aya resgistrado, al recargar la pagina no sierre la secion del usuario"
  try {
    const registeredList = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || sessionStorage.getItem(REGISTERED_USERS_KEY) || '[]');
    if (Array.isArray(registeredList) && registeredList.length > 0) {
      const lastUser = registeredList[registeredList.length - 1];
      if (lastUser) {
        const { password: _p, ...cleanProfile } = lastUser;
        const profileToRestore: UserProfile = cleanProfile as UserProfile;
        saveActiveSession(profileToRestore);
        return { user: profileToRestore, isAuthenticated: true };
      }
    }
  } catch (e) {}

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
