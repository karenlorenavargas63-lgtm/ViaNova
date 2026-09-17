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
  Trash2,
  Camera,
  X,
  Check,
  AlertTriangle,
  Upload,
  UserCheck,
  ArrowRight
} from 'lucide-react';

interface UserProfileDropdownProps {
  user: UserProfile;
  onUpdateUser?: (updated: UserProfile) => void;
  onLogout: () => void;
  onDeleteAccount?: () => void;
  setCurrentTab: (tab: NavigationTab) => void;
  currentTab: NavigationTab;
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  user,
  onUpdateUser,
  onLogout,
  onDeleteAccount,
  setCurrentTab,
  currentTab
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states for editing
  const [editName, setEditName] = useState(user.name);
  const [editRole, setEditRole] = useState(user.role);
  const [editCity, setEditCity] = useState(user.city || '');
  const [editAvatar, setEditAvatar] = useState(user.avatar || '');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Sync edit form with user data
  useEffect(() => {
    setEditName(user.name);
    setEditRole(user.role);
    setEditCity(user.city || '');
    setEditAvatar(user.avatar || '');
  }, [user, isEditModalOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
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
    setIsOpen(prev => !prev);
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
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    if (onDeleteAccount) {
      onDeleteAccount();
    } else {
      onLogout();
    }
  };

  const displayName = user.name?.trim() ? user.name : 'Usuario VIANOVA';
  const shortName = displayName.split(' ')[0];
  const userRole = user.role || 'Ciudadano';
  const userEmail = user.email || 'No especificado';
  const userCity = user.city?.trim() ? user.city : 'No especificada';
  const memberSince = user.memberSince || 'Septiembre 2026';
  const kmTraveled = user.kmTraveled ?? 0;
  const safetyScore = user.safetyScore ?? 0;

  const routesCompleted = user.monthlyStats?.routesCompleted ?? 0;
  const routesGoal = user.monthlyStats?.totalRoutesGoal ?? 20;
  const modulesCompleted = user.monthlyStats?.educationalModules ?? 0;
  const modulesGoal = user.monthlyStats?.totalModulesGoal ?? 10;
  const co2Saved = user.monthlyStats?.co2SavedKg ?? 0;
  const cyclingKm = user.monthlyStats?.cyclingKm ?? 0;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Button containing user name: clicking it displays the dropdown options */}
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

      {/* Dropdown Menu with Requested User Options: Ver la cuenta, Editar perfil, Cerrar sesión, Eliminar cuenta */}
      {isOpen && (
        <div
          id="user-profile-dropdown-menu"
          className="absolute right-0 mt-2.5 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 animate-fade-in overflow-hidden py-1 divide-y divide-slate-100"
        >
          {/* Header preview of the user */}
          <div className="px-4 py-3 bg-slate-50/70">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="w-10 h-10 rounded-full object-cover border border-white shadow-sm shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#0057d9] text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-[#0a193b] truncate leading-tight">
                  {displayName}
                </p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {userEmail}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#0057d9] text-[10px] font-bold border border-blue-100 truncate">
                  {userRole}
                </span>
              </div>
            </div>
          </div>

          {/* Action List of the 4 requested options */}
          <div className="p-1.5 space-y-0.5">
            {/* 1. Ver la cuenta */}
            <button
              id="dropdown-opt-view-account"
              type="button"
              onClick={() => {
                setIsOpen(false);
                setCurrentTab('perfil');
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-slate-100 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0057d9] flex items-center justify-center shrink-0 group-hover:bg-[#0057d9] group-hover:text-white transition-colors">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 leading-tight">Ver la cuenta</p>
                <p className="text-[10px] text-slate-500 leading-tight">Detalles del perfil, progreso y estadísticas</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0057d9] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* 2. Editar perfil */}
            <button
              id="dropdown-opt-edit-profile"
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsEditModalOpen(true);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-slate-100 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Edit3 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 leading-tight">Editar perfil</p>
                <p className="text-[10px] text-slate-500 leading-tight">Modificar nombre, rol, ciudad y foto</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* 3. Cerrar sesión */}
            <button
              id="dropdown-opt-logout"
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsLogoutModalOpen(true);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-slate-100 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-slate-700 group-hover:text-white transition-colors">
                <LogOut className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 leading-tight">Cerrar sesión</p>
                <p className="text-[10px] text-slate-500 leading-tight">Finalizar tu sesión en este dispositivo</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* 4. Eliminar cuenta */}
            <button
              id="dropdown-opt-delete-account"
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsDeleteModalOpen(true);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-rose-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Trash2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-rose-600 leading-tight">Eliminar cuenta</p>
                <p className="text-[10px] text-rose-500/80 leading-tight">Borrar datos de usuario y progreso vial</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-rose-300 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>
      )}

      {/* Modal: Editar Perfil */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0a193b]">Editar Perfil</h3>
                  <p className="text-xs text-slate-500">Actualiza tus datos personales en VIANOVA</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-5 space-y-4">
              {/* Photo preview and upload */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="relative shrink-0">
                  {editAvatar ? (
                    <img
                      src={editAvatar}
                      alt={editName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-[#0057d9] text-white flex items-center justify-center text-lg font-black shadow-sm">
                      {editName ? editName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  {isUploadingPhoto && (
                    <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center text-white text-[10px]">
                      ...
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-800">Foto de perfil</p>
                  <p className="text-[11px] text-slate-500 mb-2">Sube una foto desde tu computador</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Seleccionar archivo</span>
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nombre completo</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#f8f9fa] text-slate-800 text-xs font-medium focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Ej. Karen Vargas"
                  required
                />
              </div>

              {/* Mobility Role */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Rol de movilidad</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#f8f9fa] text-slate-800 text-xs font-medium focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="Ciclista Urbano">🚲 Ciclista Urbano</option>
                  <option value="Peatón Consciente">🚶 Peatón Consciente</option>
                  <option value="Conductor Preventivo">🚗 Conductor Preventivo</option>
                  <option value="Usuario de Transporte Público">🚌 Usuario de Transporte Público</option>
                  <option value="Motociclista">🛵 Motociclista</option>
                  <option value="Scooter / Patineta Eléctrica">🛴 Scooter / Patineta Eléctrica</option>
                  <option value="Ciudadano">👤 Ciudadano</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Ciudad / Municipio</label>
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#f8f9fa] text-slate-800 text-xs font-medium focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Ej. Medellín, Bogotá, Cali..."
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] text-white text-xs font-bold transition-colors shadow-sm inline-flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirmación Cerrar Sesión */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-[#0057d9]">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0a193b]">¿Cerrar Sesión?</h4>
              <p className="text-xs text-slate-500 mt-1">Podrás volver a ingresar en cualquier momento con tus credenciales.</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  onLogout();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0057d9] hover:bg-[#0047b3] text-white text-xs font-bold shadow-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirmación Eliminar Cuenta */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#0a193b]">¿Eliminar cuenta definitivamente?</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Esta acción eliminará de forma irreversible tu cuenta de usuario, tus rutas completadas, módulos educativos e historial de movilidad en la plataforma VIANOVA.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 text-left text-xs text-rose-800 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                Se borrarán los siguientes datos:
              </p>
              <ul className="list-disc pl-5 text-[11px] text-rose-700/90 space-y-0.5">
                <li>Perfil y credenciales asociadas a {userEmail}</li>
                <li>Progreso vial y certificaciones acumuladas</li>
                <li>Insignias y preferencias de movilidad</li>
              </ul>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm inline-flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Sí, Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
