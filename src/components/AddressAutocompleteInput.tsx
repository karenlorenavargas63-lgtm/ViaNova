import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X, Navigation, Crosshair } from 'lucide-react';
import { searchAddress, GeocodedPlace } from '../services/geocodingService';

interface AddressAutocompleteInputProps {
  id: string;
  label: string;
  badgeLetter: 'A' | 'B';
  badgeColor: 'emerald' | 'navy';
  value: string;
  placeholder: string;
  cityContext?: string;
  biasCoords?: [number, number];
  onChangeText: (text: string) => void;
  onSelectPlace: (place: { name: string; coords: [number, number]; address: string }) => void;
  onUseCurrentLocation?: () => void;
}

export const AddressAutocompleteInput: React.FC<AddressAutocompleteInputProps> = ({
  id,
  label,
  badgeLetter,
  badgeColor,
  value,
  placeholder,
  cityContext,
  biasCoords,
  onChangeText,
  onSelectPlace,
  onUseCurrentLocation
}) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<GeocodedPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!isOpen) return;
    if (query.trim().length < 3) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const results = await searchAddress(query, cityContext, biasCoords);
      setSuggestions(results);
      setIsLoading(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [query, isOpen, cityContext, biasCoords]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onChangeText(val);
    setIsOpen(true);
  };

  const handleSelect = (place: GeocodedPlace) => {
    setQuery(place.name);
    onChangeText(place.name);
    onSelectPlace({
      name: place.name,
      coords: place.coordinates,
      address: place.address
    });
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    onChangeText('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const isEmerald = badgeColor === 'emerald';

  return (
    <div ref={containerRef} className="relative w-full space-y-1">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isEmerald ? 'bg-emerald-500' : 'bg-[#0a193b]'}`}></span>
          {label}
        </label>

        {onUseCurrentLocation && (
          <button
            type="button"
            onClick={onUseCurrentLocation}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
            title="Usar mi ubicación GPS actual"
          >
            <Crosshair className="w-3 h-3" />
            <span>Mi ubicación</span>
          </button>
        )}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2.5">
        {/* Badge Icon */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-xs shadow-2xs ${
            isEmerald
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'bg-[#0a193b] text-white'
          }`}
        >
          {badgeLetter}
        </div>

        {/* Input container */}
        <div className="relative flex-1">
          <input
            id={id}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => {
              if (query.trim().length >= 2) setIsOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && suggestions.length > 0) {
                e.preventDefault();
                handleSelect(suggestions[0]);
              }
            }}
            placeholder={placeholder}
            className="w-full pl-3.5 pr-14 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-2xs transition-all"
            autoComplete="off"
          />

          {/* Right Action Icons (Loading / Clear / Search) */}
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
            ) : query.length > 0 ? (
              <button
                type="button"
                onClick={handleClear}
                className="w-6 h-6 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
          <div className="px-3.5 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Resultados de direcciones en Colombia</span>
            {cityContext && <span className="text-blue-600 font-semibold">{cityContext}</span>}
          </div>

          {isLoading ? (
            <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span>Buscando dirección...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto divide-y divide-slate-100 text-left">
              {suggestions.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="w-full px-3.5 py-2.5 hover:bg-blue-50/80 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-blue-100 text-slate-500 group-hover:text-blue-600 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700 truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {item.address}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : query.trim().length >= 3 ? (
            <div className="p-4 text-center text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">No encontramos coincidencias exactas.</p>
              <p className="text-[11px] text-slate-400">Intenta agregando el nombre del barrio o ciudad (ej. Calle 10 Poblado).</p>
            </div>
          ) : (
            <div className="p-3 text-center text-xs text-slate-400">
              Escribe al menos 3 letras para buscar cualquier calle, carrera o lugar
            </div>
          )}
        </div>
      )}
    </div>
  );
};
