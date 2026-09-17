import React, { useState, useRef } from 'react';
import { NavigationTab, UserProfile } from '../types';
import { 
  MapPin, 
  Calendar, 
  Bike, 
  Settings, 
  Pencil, 
  Trophy, 
  Leaf, 
  ShieldCheck, 
  Award, 
  X, 
  Check, 
  LogOut,
  Sparkles,
  User as UserIcon,
  Camera,
  Upload,
  FolderUp,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import defaultAvatarImg from '../assets/images/profile_user_portrait_1788443574080.jpg';

interface ProfileScreenProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout?: () => void;
  setCurrentTab?: (tab: NavigationTab) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  user, 
  onUpdateUser, 
  onLogout, 
  setCurrentTab 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);

  // File picker references for computer file explorer
  const cardFileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDraggingOverModal, setIsDraggingOverModal] = useState(false);

  // Form states
  const [editName, setEditName] = useState(user.name);
  const [editRole, setEditRole] = useState(user.role);
  const [editCity, setEditCity] = useState(user.city || 'Medellín');
  const [editAvatar, setEditAvatar] = useState(user.avatar || defaultAvatarImg);

  const handleOpenEditModal = () => {
    setEditName(user.name);
    setEditRole(user.role);
    setEditCity(user.city || 'Medellín');
    setEditAvatar(user.avatar || defaultAvatarImg);
    setIsEditing(true);
  };

  // Helper to read and compress/optimize any uploaded image file from computer
  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('El archivo seleccionado debe ser una imagen válida (JPG, PNG, WEBP, GIF, etc.).'));
        return;
      }

      // Check max size (15MB ceiling for safety)
      if (file.size > 15 * 1024 * 1024) {
        reject(new Error('La imagen es demasiado pesada. Elige una foto menor a 15MB.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const rawResult = e.target?.result as string;
        if (!rawResult) {
          reject(new Error('No se pudo leer la imagen seleccionada.'));
          return;
        }

        // Scale down cleanly with canvas to max 600x600 for optimal UI performance and memory
        const img = new Image();
        img.onload = () => {
          const MAX_SIZE = 600;
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
            const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
            resolve(canvas.toDataURL(mimeType, 0.9));
          } else {
            resolve(rawResult);
          }
        };

        img.onerror = () => resolve(rawResult);
        img.src = rawResult;
      };

      reader.onerror = () => reject(new Error('Error al acceder a los archivos del computador.'));
      reader.readAsDataURL(file);
    });
  };

  // Direct card upload handler: instantly selects from computer and updates user
  const handleCardFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    setUploadError(null);
    try {
      const dataUrl = await processImageFile(file);
      onUpdateUser({
        ...user,
        avatar: dataUrl,
      });
      setEditAvatar(dataUrl);
      setUploadSuccessMsg('¡Foto de perfil actualizada desde tus archivos del computador!');
      setTimeout(() => setUploadSuccessMsg(null), 4000);
    } catch (err: any) {
      setUploadError(err.message || 'Error al procesar la foto');
      setTimeout(() => setUploadError(null), 4000);
    } finally {
      setIsUploadingPhoto(false);
      if (e.target) e.target.value = '';
    }
  };

  // Modal file picker handler
  const handleModalFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    setUploadError(null);
    try {
      const dataUrl = await processImageFile(file);
      setEditAvatar(dataUrl);
      setUploadSuccessMsg('Foto cargada correctamente. Recuerda presionar "Guardar Cambios".');
      setTimeout(() => setUploadSuccessMsg(null), 3500);
    } catch (err: any) {
      setUploadError(err.message || 'Error al procesar la foto');
    } finally {
      setIsUploadingPhoto(false);
      if (e.target) e.target.value = '';
    }
  };

  // Drag and drop handler in modal
  const handleDropModalFile = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOverModal(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    setUploadError(null);
    try {
      const dataUrl = await processImageFile(file);
      setEditAvatar(dataUrl);
    } catch (err: any) {
      setUploadError(err.message || 'Error al procesar la foto');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: editName.trim() || user.name,
      role: editRole,
      city: editCity.trim() || user.city,
      avatar: editAvatar,
    });
    setIsEditing(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    if (onLogout) {
      onLogout();
    }
    if (setCurrentTab) {
      setCurrentTab('inicio');
    }
  };

  // Avatar presets
  const avatarPresets = [
    defaultAvatarImg,
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
  ];

  // Calculated values based on user data
  const safetyScore = user.safetyScore ?? 0;
  const routesCompleted = user.monthlyStats?.routesCompleted ?? 24;
  const routesGoal = user.monthlyStats?.totalRoutesGoal ?? 30;
  const modulesCompleted = user.monthlyStats?.educationalModules ?? 8;
  const modulesGoal = user.monthlyStats?.totalModulesGoal ?? 10;
  const routesPercentage = Math.min(100, Math.round((routesCompleted / Math.max(1, routesGoal)) * 100));
  const modulesPercentage = Math.min(100, Math.round((modulesCompleted / Math.max(1, modulesGoal)) * 100));

  return (
    <div id="vianova-profile-view" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in font-sans">
      
      {/* Header bar with title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a193b] tracking-tight">
            Perfil de Usuario
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gestiona tu información personal, certificaciones viales y estado de movilidad
          </p>
        </div>
      </div>

      {/* 3-Column Layout Matching the Uploaded Design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Profile Card + Insignias Card */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: User Identity Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-slate-200/70 text-center flex flex-col items-center">
            
            {/* Hidden Native File Input for computer file explorer */}
            <input
              ref={cardFileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/*"
              className="hidden"
              onChange={handleCardFileChange}
            />

            {/* Avatar with click-to-upload and hover effect */}
            <div className="relative inline-block mb-2">
              <div 
                onClick={() => cardFileInputRef.current?.click()}
                className="w-28 h-28 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm bg-slate-100 relative group cursor-pointer"
                title="Haz clic para abrir los archivos de tu computador y subir cualquier foto"
              >
                <img
                  src={user.avatar || defaultAvatarImg}
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to default asset
                    (e.target as HTMLImageElement).src = defaultAvatarImg;
                  }}
                />
                <div className="absolute inset-0 bg-[#0a193b]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold leading-tight">Cambiar foto</span>
                </div>
                {isUploadingPhoto && (
                  <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center text-white">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                  </div>
                )}
              </div>
              
              {/* Floating Camera Button opening computer files */}
              <button
                id="btn-edit-avatar-camera"
                type="button"
                onClick={() => cardFileInputRef.current?.click()}
                title="Elegir foto desde los archivos de tu computador"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#0a193b] hover:bg-[#0055d4] text-white flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Button to open computer file picker */}
            <div className="flex items-center gap-2 mb-4">
              <button
                id="btn-upload-computer-photo"
                type="button"
                onClick={() => cardFileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0055d4] border border-blue-200/80 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Abrir explorador de archivos del computador"
              >
                <FolderUp className="w-3.5 h-3.5" />
                <span>Elegir foto del computador</span>
              </button>
              <button
                id="btn-edit-avatar"
                type="button"
                onClick={() => setIsEditing(true)}
                title="Editar datos del perfil"
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Success and Error messages */}
            {uploadSuccessMsg && (
              <div className="mb-4 w-full px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-left leading-tight">{uploadSuccessMsg}</span>
              </div>
            )}
            {uploadError && (
              <div className="mb-4 w-full px-3 py-2 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-left leading-tight">{uploadError}</span>
              </div>
            )}

            {/* User Name & Role */}
            <h2 className="text-2xl font-bold text-[#0a193b] tracking-tight">
              {user.name}
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-normal">
              {user.role}
            </p>

            {/* Subtle Divider */}
            <div className="w-full border-t border-slate-100 my-5"></div>

            {/* Meta Info List */}
            <div className="space-y-3.5 w-full text-left text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{user.city || 'Medellín'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Miembro desde {user.memberSince || 'Marzo 2024'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Bike className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{(user.kmTraveled ?? 1245).toLocaleString()} km recorridos</span>
              </div>
            </div>

            {/* Action Buttons: Editar perfil & Cerrar sesión */}
            <div className="mt-7 w-full space-y-2.5">
              <button
                id="btn-open-edit-profile"
                type="button"
                onClick={handleOpenEditModal}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0a193b] hover:bg-[#0055d4] text-white font-semibold text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                <span>Editar perfil</span>
              </button>

              <button
                id="btn-profile-card-logout"
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl border border-rose-200/90 bg-rose-50/60 hover:bg-rose-100/80 hover:border-rose-300 text-rose-700 font-semibold text-sm transition-all duration-200 shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>

          {/* Card 2: Insignias Card (Under User Profile Card) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/70">
            <h3 className="text-lg font-bold text-[#0a193b] mb-4">
              Insignias
            </h3>

            <div className="grid grid-cols-3 gap-3">
              
              {/* Insignia 1: Ruta Segura */}
              <button
                type="button"
                onClick={() => setSelectedBadge({
                  name: 'Ruta Segura',
                  desc: 'Has completado múltiples trayectos sin incidentes reportados en la red vial.'
                })}
                className="p-3 rounded-2xl bg-[#f4f5f8] hover:bg-[#eceef2] flex flex-col items-center justify-center text-center transition-colors min-h-[96px] group"
              >
                <div className="w-7 h-7 mb-2 flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5 text-slate-600" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 leading-tight">
                  Ruta Segura
                </span>
              </button>

              {/* Insignia 2: Pionera */}
              <button
                type="button"
                onClick={() => setSelectedBadge({
                  name: 'Pionera',
                  desc: 'Formas parte de la comunidad inicial comprometida con la movilidad vial segura y sostenible.'
                })}
                className="p-3 rounded-2xl bg-[#f4f5f8] hover:bg-[#eceef2] flex flex-col items-center justify-center text-center transition-colors min-h-[96px] group"
              >
                <div className="w-7 h-7 mb-2 flex items-center justify-center text-[#0055d4] group-hover:scale-110 transition-transform">
                  <Trophy className="w-5 h-5 text-[#0055d4]" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 leading-tight">
                  Pionera
                </span>
              </button>

              {/* Insignia 3: Eco Master */}
              <button
                type="button"
                onClick={() => setSelectedBadge({
                  name: 'Eco Master',
                  desc: 'Has contribuido a la reducción activa de emisiones de CO2 mediante transporte sostenible.'
                })}
                className="p-3 rounded-2xl bg-[#f4f5f8] hover:bg-[#eceef2] flex flex-col items-center justify-center text-center transition-colors min-h-[96px] group"
              >
                <div className="w-7 h-7 mb-2 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                  <Leaf className="w-5 h-5 text-slate-400" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 leading-tight">
                  Eco Master
                </span>
              </button>

            </div>
          </div>

        </div>

        {/* Right Section: 2 Wide Cards (Certificación de Seguridad & Estadísticas Mensuales) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 3: Certificación de Seguridad */}
          <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-xs border border-slate-200/70 flex flex-col justify-between items-center text-center min-h-[390px]">
            
            <h3 className="text-lg sm:text-xl font-bold text-[#0a193b] w-full text-left">
              Certificación de Seguridad
            </h3>

            {/* Circular Donut Gauge with Marker on Top */}
            <div className="relative w-48 h-48 sm:w-52 sm:h-52 my-6 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 160 160">
                {/* Background Ring Track (thick light grey #e6e8ec) */}
                <circle
                  cx="80"
                  cy="80"
                  r="62"
                  fill="none"
                  stroke="#e6e8ec"
                  strokeWidth="16"
                />

                {/* Progress arc if safetyScore > 0 */}
                {safetyScore > 0 && (
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    fill="none"
                    stroke="#0055d4"
                    strokeWidth="16"
                    strokeDasharray={2 * Math.PI * 62}
                    strokeDashoffset={2 * Math.PI * 62 * (1 - safetyScore / 100)}
                    strokeLinecap="round"
                    transform="rotate(-90 80 80)"
                  />
                )}
                
                {/* Accent Dot at top center */}
                <circle
                  cx="80"
                  cy="18"
                  r="6.5"
                  fill={safetyScore > 0 ? "#0055d4" : "#cbd5e1"}
                />
              </svg>

              {/* Centered Large Bold Percentage */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl font-bold text-[#0a193b] tracking-tight">
                  {safetyScore}%
                </span>
                {safetyScore === 0 && (
                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                    Sin iniciar
                  </span>
                )}
              </div>
            </div>

            {/* Subtitle Below Gauge */}
            <p className="text-sm font-semibold text-slate-500 tracking-wide pb-1">
              {safetyScore === 0 ? 'Nivel Inicial (0%)' : safetyScore >= 80 ? 'Nivel Avanzado' : 'Nivel Intermedio'}
            </p>

          </div>

          {/* Card 4: Estadísticas Mensuales */}
          <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-xs border border-slate-200/70 flex flex-col justify-between min-h-[390px]">
            
            <h3 className="text-lg sm:text-xl font-bold text-[#0a193b]">
              Estadísticas Mensuales
            </h3>

            {/* Progress Bars Section */}
            <div className="space-y-8 my-auto pt-2">
              
              {/* Metric 1: Rutas Completadas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-700">
                  <span>Rutas Completadas</span>
                  <span className="font-semibold text-slate-800">
                    {routesCompleted}/{routesGoal}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#e6e8ec] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0055d4] rounded-full transition-all duration-500"
                    style={{ width: `${routesPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Metric 2: Módulos Educativos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-700">
                  <span>Módulos Educativos</span>
                  <span className="font-semibold text-slate-800">
                    {modulesCompleted}/{modulesGoal}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#e6e8ec] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0055d4] rounded-full transition-all duration-500"
                    style={{ width: `${modulesPercentage}%` }}
                  ></div>
                </div>
              </div>

            </div>

            {/* Subtle bottom note / extra space matching layout */}
            <div className="pt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
              <span>Actualización en tiempo real</span>
            </div>

          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 text-slate-800 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0055d4]">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0a193b]">Editar Perfil</h3>
                  <p className="text-xs text-slate-500">Personaliza tus datos en la plataforma</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              
              {/* Hidden File Input for Modal */}
              <input
                ref={modalFileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/*"
                className="hidden"
                onChange={handleModalFileChange}
              />

              {/* Choose or Upload Avatar from Computer */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                    Foto de perfil
                  </label>
                  {editAvatar !== defaultAvatarImg && (
                    <button
                      type="button"
                      onClick={() => setEditAvatar(defaultAvatarImg)}
                      className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Restablecer foto original"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Restaurar original</span>
                    </button>
                  )}
                </div>

                {/* Drag and Drop Zone or Direct Button */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingOverModal(true);
                  }}
                  onDragLeave={() => setIsDraggingOverModal(false)}
                  onDrop={handleDropModalFile}
                  className={`p-3.5 rounded-2xl border-2 border-dashed transition-all flex flex-col sm:flex-row items-center gap-3.5 ${
                    isDraggingOverModal
                      ? 'border-[#0055d4] bg-blue-50/70 scale-[1.01]'
                      : 'border-slate-200 hover:border-blue-400 bg-slate-50/70'
                  }`}
                >
                  {/* Large Avatar Preview */}
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                      <img
                        src={editAvatar}
                        alt="Vista previa"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isUploadingPhoto && (
                      <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                      </div>
                    )}
                  </div>

                  {/* Actions inside drag box */}
                  <div className="flex-1 text-center sm:text-left space-y-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800">
                      Sube cualquier foto desde tu computador
                    </p>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Arrastra tu imagen aquí o haz clic para explorar los archivos de tu equipo (JPG, PNG, WEBP).
                    </p>
                    <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <button
                        type="button"
                        onClick={() => modalFileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0055d4] hover:bg-[#0046b8] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <FolderUp className="w-3.5 h-3.5" />
                        <span>Abrir archivos del computador</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Preset Avatars */}
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                    O selecciona un avatar predeterminado:
                  </span>
                  <div className="flex items-center gap-2.5">
                    {avatarPresets.map((preset, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setEditAvatar(preset)}
                        className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                          editAvatar === preset ? 'border-[#0055d4] ring-2 ring-blue-400/40 scale-105' : 'border-slate-200 hover:opacity-80'
                        }`}
                        title={`Avatar alternativo ${index + 1}`}
                      >
                        <img src={preset} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-[#f8f9fa] text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#0055d4]"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Mobility Role */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Tipo de Movilidad / Rol</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-[#f8f9fa] text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#0055d4]"
                >
                  <option value="Ciclista Urbano">🚲 Ciclista Urbano</option>
                  <option value="Peatón / Caminante">🚶 Peatón / Caminante</option>
                  <option value="Motociclista">🏍️ Motociclista</option>
                  <option value="Conductor de Automóvil">🚗 Conductor de Automóvil</option>
                  <option value="Pasajero de Transporte Público">🚌 Pasajero de Transporte Público (Metro / Bus)</option>
                  <option value="Scooter / Patineta Eléctrica">🛴 Scooter / Patineta Eléctrica</option>
                  <option value="Repartidor / Mensajería Urbana">📦 Repartidor / Mensajería Urbana</option>
                  <option value="Conductor de Taxi / Plataformas">🚕 Conductor de Taxi / Plataformas</option>
                  <option value="Patinador / Rollers / Skater">🛹 Patinador / Rollers / Skater</option>
                  <option value="Estudiante">🎒 Estudiante</option>
                  <option value="Conductor de Carga Pesada">🚚 Conductor de Carga Pesada</option>
                  <option value="Movilidad Reducida">♿ Movilidad Reducida / Silla de Ruedas</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Ciudad / Municipio
                </label>
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-[#f8f9fa] text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#0055d4]"
                  placeholder="Ej. Medellín, Bogotá, Cali..."
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#0055d4] hover:bg-[#0046b8] text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  Guardar Cambios
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-[#0055d4]">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#0a193b]">{selectedBadge.name}</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{selectedBadge.desc}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2.5 rounded-xl bg-[#0a193b] text-white text-xs font-semibold hover:bg-[#0055d4] transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#0a193b]">¿Cerrar Sesión?</h4>
              <p className="text-xs text-slate-500 mt-1">Podrás volver a ingresar en cualquier momento con tus credenciales.</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
