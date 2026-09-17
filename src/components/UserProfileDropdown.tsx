import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, NavigationTab } from '../types';
import {
  User as UserIcon,
  ChevronDown,
  MapPin,
  Calendar,
  Bike,
  ShieldCheck,
  Award,
  Leaf,
  Route,
  BookOpen,
  Edit3,
  LogOut,
  Camera,
  X,
  Check,
  ExternalLink,
  Mail,
  UserCheck
} from 'lucide-react';

interface UserProfileDropdownProps {
  user: UserProfile;
  onUpdateUser?: (updated: UserProfile) => void;
  onLogout: () => void;
  setCurrentTab: (tab: NavigationTab) => void;
  currentTab: NavigationTab;
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  user,
  onUpdateUser,
  onLogout,
  setCurrentTab,
  currentTab
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states for inline editing
  const [editName, setEditName] = useState(user.name);
  const [editRole, setEditRole] = useState(user.role);
  const [editCity, setEditCity] = useState(user.city || '');
  const [editAvatar, setEditAvatar] = useState(user.avatar || '');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Sync edit form when user changes or modal opens
  useEffect(() => {
    setEditName(user.name);
    setEditRole(user.role);
    setEditCity(user.city || '');
    setEditAvatar(user.avatar || '');
  }, [user, isEditing]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsEditing(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsEditing(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsEditing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida (JPG, PNG, WEBP).');
      return;
    }

    setIsUploadingPhoto(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawResult = event.target?.result as string;
      if (!rawResult) {
        setIsUploadingPhoto(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        const MAX_SIZE = 500;
        let { width, height } = img;
        if (width > MAX_SIZE || height > MAX_SIZE) {
          if (width > height) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setEditAvatar(compressed);
          if (onUpdateUser) {
            onUpdateUser({
              ...user,
              avatar: compressed
            });
          }
        }
        setIsUploadingPhoto(false);
      };
      img.src = rawResult;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateUser) return;

    const updatedUser: UserProfile = {
      ...user,
      name: editName.trim() || user.name,
      role: editRole,
      city: editCity.trim(),
      avatar: editAvatar || user.avatar
    };

    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  const displayName = user.name?.trim() ? user.name : 'Usuario VIANOVA';
  const shortName = displayName.split(' ')[0];
  const userRole = user.role || 'Ciudadano';
  const userCity = user.city?.trim() ? user.city : 'No especificada';
  const userEmail = user.email || 'No registrado';
  const memberSince = user.memberSince || 'Septiembre 2026';
  const kmTraveled = user.kmTraveled ?? 0;
  const safetyScore = user.safetyScore ?? 0;

  const routesCompleted = user.monthlyStats?.routesCompleted ?? 0;
  const routesGoal = user.monthlyStats?.totalRoutesGoal ?? 20;
  const modulesCompleted = user.monthlyStats?.educationalModules ?? 0;
  const modulesGoal = user.monthlyStats?.totalModulesGoal ?? 10;
  const co2Saved = user.monthlyStats?.co2SavedKg ?? 0;
  const cyclingKm = user.monthlyStats?.cyclingKm ?? 0;

  const routesPercent = routesGoal > 0 ? Math.min(100, Math.round((routesCompleted / routesGoal) * 100)) : 0;
  const modulesPercent = modulesGoal > 0 ? Math.min(100, Math.round((modulesCompleted / modulesGoal) * 100)) : 0;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Hidden file input for uploading profile picture */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Main Button with User Name & Avatar */}
      <button
        id="nav-profile-btn"
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-xs select-none ${
          isOpen
            ? 'bg-[#0057d9] text-white ring-2 ring-blue-400/40 shadow-md'
            : currentTab === 'perfil'
            ? 'bg-[#0057d9] text-white shadow-md shadow-blue-500/20'
            : 'bg-[#e0eaff] hover:bg-[#d0e0fc] text-[#003d99]'
        }`}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={displayName}
            className="w-6 h-6 rounded-full object-cover border border-white/80 shrink-0"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-[#0057d9] text-white flex items-center justify-center text-[10px] font-black shrink-0">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="truncate max-w-[130px] font-bold">{shortName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Unfolded Dropdown with All User Information */}
      {isOpen && (
        <div
          id="user-profile-dropdown-panel"
          className="absolute right-0 mt-2.5 w-[340px] sm:w-[390px] max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200/90 z-50 animate-fade-in p-5 text-slate-800 focus:outline-none divide-y divide-slate-100"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 transparent'
          }}
        >
          {/* Section 1: Header / Profile identity */}
          <div className="pb-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3.5">
                <div className="relative group">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={displayName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0057d9] to-[#0a193b] text-white flex items-center justify-center text-xl font-black shadow-md">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Cambiar foto de perfil"
                    className="absolute -bottom-1 -right-1 p-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                </div>

                <div className="min-w-0">
                  <h4 className="text-base font-extrabold text-[#0a193b] leading-tight truncate">
                    {displayName}
                  </h4>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-1 rounded-full bg-blue-50 text-[#0057d9] text-[11px] font-bold border border-blue-100">
                    <UserCheck className="w-3 h-3" />
                    <span>{userRole}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Email, City, Member Since, Km */}
            <div className="mt-3.5 space-y-2 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{userEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate font-medium">{userCity}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Miembro desde {memberSince}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#0057d9] font-bold">
                <Bike className="w-3.5 h-3.5 shrink-0" />
                <span>{kmTraveled.toLocaleString()} km recorridos</span>
              </div>
            </div>
          </div>

          {/* Section 2: Progress & Statistics (0 for new user) */}
          <div className="py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Avance Vial y Métricas
              </span>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                Seguridad: {safetyScore}%
              </span>
            </div>

            {/* Rutas Completadas */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Route className="w-3.5 h-3.5 text-[#0057d9]" />
                  <span>Rutas completadas</span>
                </div>
                <span className="text-slate-500 font-medium">
                  <strong className="text-slate-900">{routesCompleted}</strong> / {routesGoal}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0057d9] rounded-full transition-all duration-300"
                  style={{ width: `${routesPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Módulos Educativos */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Módulos de educación</span>
                </div>
                <span className="text-slate-500 font-medium">
                  <strong className="text-slate-900">{modulesCompleted}</strong> / {modulesGoal}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${modulesPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Quick counters grid */}
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs">
                <p className="text-[10px] text-emerald-700 font-medium flex items-center justify-center gap-1">
                  <Leaf className="w-3 h-3" /> CO₂ ahorrado
                </p>
                <p className="text-sm font-extrabold text-emerald-800 mt-0.5">{co2Saved} kg</p>
              </div>
              <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100 text-xs">
                <p className="text-[10px] text-blue-700 font-medium flex items-center justify-center gap-1">
                  <Bike className="w-3 h-3" /> En bicicleta
                </p>
                <p className="text-sm font-extrabold text-blue-800 mt-0.5">{cyclingKm} km</p>
              </div>
            </div>
          </div>

          {/* Section 3: Insignias */}
          <div className="py-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                Insignias Obtenidas
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                {user.badges?.length || 0}
              </span>
            </div>

            {(!user.badges || user.badges.length === 0) ? (
              <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
                Aún no tienes insignias. Completa tus primeros trayectos y cuestionarios para desbloquearlas.
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {user.badges.map((b) => (
                  <span
                    key={b.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0057d9] text-[11px] font-bold border border-blue-100"
                  >
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    {b.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Edit Form (Inline toggle) */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="py-4 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-[#0a193b] uppercase tracking-wider">
                  Editar Datos
                </h5>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Cancelar
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Nombre</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-none"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Rol de movilidad</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="Ciclista Urbano">🚲 Ciclista Urbano</option>
                  <option value="Peatón Consciente">🚶 Peatón Consciente</option>
                  <option value="Conductor Preventivo">🚗 Conductor Preventivo</option>
                  <option value="Usuario de Transporte Público">🚌 Transporte Público</option>
                  <option value="Motociclista">🛵 Motociclista</option>
                  <option value="Ciudadano">👤 Ciudadano</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Ciudad</label>
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-none"
                  placeholder="Ej. Medellín, Bogotá..."
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Guardar Cambios
                </button>
              </div>
            </form>
          ) : null}

          {/* Section 5: Action Buttons */}
          <div className="pt-3.5 flex flex-col gap-2">
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Información del Perfil</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setCurrentTab('perfil');
                setIsOpen(false);
              }}
              className="w-full py-2.5 px-3.5 rounded-xl bg-blue-50 hover:bg-blue-100/70 text-[#0057d9] text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Perfil en Pantalla Completa</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full py-2.5 px-3.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
