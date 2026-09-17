import React from 'react';
import { MobilityAlert, NavigationTab } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { 
  Filter, 
  RefreshCw, 
  MapPin, 
  AlertTriangle, 
  Clock, 
  PlusCircle, 
  CheckCircle2, 
  Radio, 
  ShieldAlert, 
  Send,
  Navigation,
  Eye
} from 'lucide-react';

interface AlertsViewProps {
  alerts: MobilityAlert[];
  onAddAlert: (newAlert: MobilityAlert) => void;
  onSelectTab: (tab: NavigationTab) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  onAddAlert,
  onSelectTab
}) => {
  const [filterType, setFilterType] = React.useState<string>('todos');
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [selectedMapAlert, setSelectedMapAlert] = React.useState<MobilityAlert | null>(null);
  const [showReportModal, setShowReportModal] = React.useState(false);

  // New report form state
  const [reportTitle, setReportTitle] = React.useState('');
  const [reportType, setReportType] = React.useState<'accidente' | 'obras' | 'trafico' | 'inundacion'>('accidente');
  const [reportLocation, setReportLocation] = React.useState('');
  const [reportDescription, setReportDescription] = React.useState('');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: MobilityAlert = {
      id: `alt_${Date.now()}`,
      type: reportType,
      title: reportTitle,
      description: reportDescription,
      location: reportLocation,
      timeAgo: 'Justo ahora',
      severity: reportType === 'accidente' || reportType === 'inundacion' ? 'critico' : reportType === 'obras' ? 'obras' : 'denso',
      severityLabel: reportType === 'accidente' || reportType === 'inundacion' ? 'RIESGO CRÍTICO' : reportType === 'obras' ? 'OBRAS VIALES' : 'TRÁFICO DENSO',
      badgeBg: reportType === 'accidente' || reportType === 'inundacion' ? 'bg-rose-600' : reportType === 'obras' ? 'bg-amber-600' : 'bg-slate-700',
      coordinates: { x: Math.floor(Math.random() * 60) + 20, y: Math.floor(Math.random() * 60) + 20 },
      verified: true,
      affectedLanes: 'Carriles principales',
      alternativeRouteSuggestion: 'Usar vías secundarias reportadas en VIANOVA.',
      image: reportType === 'accidente' 
        ? 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=500&auto=format&fit=crop&q=80'
        : reportType === 'obras'
        ? 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=500&auto=format&fit=crop&q=80'
    };

    onAddAlert(newAlert);
    setShowReportModal(false);
    setReportTitle('');
    setReportLocation('');
    setReportDescription('');
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterType === 'todos') return true;
    if (filterType === 'critico') return alert.severity === 'critico';
    if (filterType === 'obras') return alert.type === 'obras';
    if (filterType === 'trafico') return alert.type === 'trafico';
    if (filterType === 'inundacion') return alert.type === 'inundacion';
    return true;
  });

  return (
    <div id="vianova-alerts-view" className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header (Page 8) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Centro de Monitoreo Urbano</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
            Alertas de movilidad
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Información en tiempo real sobre incidentes, obras y estado del tráfico en tu área.
          </p>
        </div>

        {/* Action Controls (Filtrar, Actualizar, Reportar) */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-refresh-alerts"
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>

          <button
            id="btn-report-alert"
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Reportar Incidente</span>
          </button>
        </div>
      </div>

      {/* Filter Category Tabs (Page 9) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-bold flex items-center gap-1 pr-2">
          <Filter className="w-3.5 h-3.5" />
          Filtrar:
        </span>
        {[
          { id: 'todos', label: 'Todos los incidentes' },
          { id: 'critico', label: 'Riesgo Crítico' },
          { id: 'obras', label: 'Obras Viales' },
          { id: 'trafico', label: 'Tráfico Denso' },
          { id: 'inundacion', label: 'Inundaciones' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setFilterType(filter.id)}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
              filterType === filter.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid of Alert Cards (Page 8 & 9) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            id={`alert-card-${alert.id}`}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Photo Banner with floating tags */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={alert.image}
                  alt={alert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10" />

                {/* Severity Badge (Page 8) */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-wider shadow-md ${alert.badgeBg}`}>
                    {alert.severityLabel}
                  </span>
                </div>

                {/* Time Ago pill */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-300" />
                  <span>{alert.timeAgo}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-black text-slate-900 font-display group-hover:text-blue-600 transition">
                  {alert.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {alert.description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold pt-1">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">{alert.location}</span>
                </div>
              </div>
            </div>

            {/* Bottom Button: Ver en el mapa */}
            <div className="p-5 pt-0">
              <button
                id={`btn-view-map-${alert.id}`}
                onClick={() => setSelectedMapAlert(alert)}
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white rounded-xl text-xs font-bold border border-slate-200 hover:border-transparent flex items-center justify-center gap-2 transition duration-150"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver en el mapa</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Focus Alert Map Modal */}
      {selectedMapAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-black text-white uppercase ${selectedMapAlert.badgeBg}`}>
                  {selectedMapAlert.severityLabel}
                </span>
                <h3 className="text-xl font-black text-slate-900 font-display mt-1">
                  {selectedMapAlert.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  {selectedMapAlert.location} • {selectedMapAlert.timeAgo}
                </p>
              </div>
              <button
                onClick={() => setSelectedMapAlert(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Interactive Map focusing this alert */}
            <div className="h-72 w-full rounded-2xl overflow-hidden">
              <InteractiveMap
                alerts={alerts}
                highlightedAlertId={selectedMapAlert.id}
                onSelectAlert={(a) => setSelectedMapAlert(a)}
              />
            </div>

            {/* Suggested alternative detour */}
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 flex items-start gap-2">
              <Navigation className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Recomendación vial de VIANOVA:</strong> {selectedMapAlert.alternativeRouteSuggestion}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedMapAlert(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setSelectedMapAlert(null);
                  onSelectTab('rutas');
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Trazar ruta alternativa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Citizen Incident Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 font-display">
                Reportar Nuevo Incidente Vial
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-700 p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tipo de Alerta
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="accidente">Accidente vehicular</option>
                  <option value="obras">Obras viales / Mantenimiento</option>
                  <option value="trafico">Congestión vehicular severa</option>
                  <option value="inundacion">Inundación / Vía inhabilitada</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Título del Reporte
                </label>
                <input
                  type="text"
                  required
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="Ej. Choque en intersección"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Ubicación Exacta
                </label>
                <input
                  type="text"
                  required
                  value={reportLocation}
                  onChange={(e) => setReportLocation(e.target.value)}
                  placeholder="Ej. Calle 50 con Carrera 65"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Detalles y carriles afectados
                </label>
                <textarea
                  rows={3}
                  required
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Describe la situación para alertar a otros conductores y peatones..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar Alerta</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
