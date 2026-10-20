import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X, Crosshair, ArrowRight } from 'lucide-react';
import { searchAddress, geocodeSingleAddress, GeocodedPlace } from '../services/geocodingService';

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
    if (query.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const results = await searchAddress(query, cityContext, biasCoords);
      setSuggestions(results);
      setIsLoading(false);
    }, 250);

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

  // Immediate resolve on Enter or Search Click
  const handleImmediateSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
      return;
    }

    setIsLoading(true);
    const place = await geocodeSingleAddress(trimmed, biasCoords);
    setIsLoading(false);

    if (place) {
      handleSelect(place);
    } else {
      // Fallback place
      const coords = biasCoords || [6.2442, -75.5812];
      handleSelect({
        id: `manual_${Date.now()}`,
        name: trimmed,
        displayName: trimmed,
        address: trimmed,
        coordinates: coords,
        category: 'address'
      });
    }
  };

  const isEmerald = badgeColor === 'emerald';

  return (
    <div ref={containerRef} className="relative w-full space-y-1">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isEmerald ? 'bg-emerald-500' : 'bg-[#0a193b]'}`}></span>
          {label}
        </label>

        {onUseCurrentLocation && (
          <button
            type="button"
            onClick={onUseCurrentLocation}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Usar mi ubicación GPS actual"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Mi ubicación actual</span>
          </button>
        )}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2.5">
        {/* Badge Icon */}
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-black text-sm shadow-2xs ${
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
              if (e.key === 'Enter') {
                e.preventDefault();
                handleImmediateSearch();
              }
            }}
            placeholder={placeholder}
            className="w-full pl-4 pr-20 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm sm:text-base font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-2xs transition-all"
            autoComplete="off"
          />

          {/* Right Action Icons (Loading / Clear / Search Action) */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {isLoading && (
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin mr-1" />
            )}

            {query.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="w-7 h-7 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Borrar texto"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={handleImmediateSearch}
              className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs active:scale-95"
              title="Buscar y fijar dirección"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Resultados de direcciones</span>
            <span className="text-blue-600 font-semibold">Presiona Enter o selecciona</span>
          </div>

          {isLoading ? (
            <div className="p-4 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
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
                    className="w-full px-4 py-2.5 hover:bg-blue-50/80 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-blue-100 text-slate-500 group-hover:text-blue-600 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-800 group-hover:text-blue-700 truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">
                        {item.address}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 shrink-0 self-center" />
                  </button>
                </li>
              ))}
            </ul>
          ) : query.trim().length >= 2 ? (
            <div className="p-3 text-center space-y-1.5">
              <p className="text-xs font-semibold text-slate-700">Presiona Enter o Buscar para usar:</p>
              <button
                type="button"
                onClick={handleImmediateSearch}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
              >
                <span>Usar &ldquo;{query}&rdquo;</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="p-3 text-center text-xs text-slate-400">
              Escribe cualquier calle, carrera o lugar
            </div>
          )}
        </div>
      )}
    </div>
  );
};
