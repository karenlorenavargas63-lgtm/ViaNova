export interface GeocodedPlace {
  id: string;
  name: string;
  displayName: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  coordinates: [number, number]; // [lat, lng]
  category?: string;
}

// Fallback known places for instant local offline lookup if network is slow
const LOCAL_FALLBACKS: GeocodedPlace[] = [
  {
    id: 'fb_1',
    name: 'Aeropuerto Internacional José María Córdova',
    displayName: 'Aeropuerto Internacional José María Córdova, Rionegro / Medellín',
    address: 'Vía Aeropuerto José María Córdova',
    city: 'Medellín',
    state: 'Antioquia',
    country: 'Colombia',
    coordinates: [6.1645, -75.4276]
  },
  {
    id: 'fb_2',
    name: 'Aeropuerto Internacional El Dorado',
    displayName: 'Aeropuerto Internacional El Dorado, Bogotá D.C.',
    address: 'Ac. 26 #103-9',
    city: 'Bogotá',
    state: 'Cundinamarca',
    country: 'Colombia',
    coordinates: [4.7016, -74.1469]
  },
  {
    id: 'fb_3',
    name: 'Terminal del Sur Medellín',
    displayName: 'Terminal del Sur Medellín',
    address: 'Cra. 65 #8B-91, Guayabal',
    city: 'Medellín',
    state: 'Antioquia',
    country: 'Colombia',
    coordinates: [6.2125, -75.5896]
  },
  {
    id: 'fb_4',
    name: 'Plaza Mayor Medellín / La Alpujarra',
    displayName: 'Plaza Mayor Convenciones / Centro Administrativo',
    address: 'Calle 41 #55-80, Medellín',
    city: 'Medellín',
    state: 'Antioquia',
    country: 'Colombia',
    coordinates: [6.2432, -75.5746]
  },
  {
    id: 'fb_5',
    name: 'Parque de la 93 Bogotá',
    displayName: 'Parque de la 93, Chapinero',
    address: 'Cl. 93A #11A-41, Bogotá',
    city: 'Bogotá',
    state: 'Cundinamarca',
    country: 'Colombia',
    coordinates: [4.6768, -74.0531]
  }
];

export async function searchAddress(
  query: string,
  biasCity?: string,
  biasCoords?: [number, number]
): Promise<GeocodedPlace[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  // Build query: if no country specified, we can prioritize Colombia
  let searchQuery = trimmed;
  if (!trimmed.toLowerCase().includes('colombia') && biasCity && !trimmed.toLowerCase().includes(biasCity.toLowerCase())) {
    searchQuery = `${trimmed}, ${biasCity}, Colombia`;
  } else if (!trimmed.toLowerCase().includes('colombia')) {
    searchQuery = `${trimmed}, Colombia`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(searchQuery)}&limit=7`;
    if (biasCoords) {
      url += `&lat=${biasCoords[0]}&lon=${biasCoords[1]}`;
    }

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        const places: GeocodedPlace[] = data.features.map((f: any, idx: number) => {
          const props = f.properties || {};
          const coords: [number, number] = [f.geometry.coordinates[1], f.geometry.coordinates[0]]; // [lat, lng]

          // Construct friendly name and address
          const primaryName = props.name || props.street || (props.housenumber ? `${props.street || 'Calle'} #${props.housenumber}` : trimmed);
          const parts = [
            props.housenumber ? `${props.street || ''} #${props.housenumber}` : props.street,
            props.district || props.suburb || props.locality,
            props.city,
            props.state,
            props.country || 'Colombia'
          ].filter(Boolean);

          const fullAddress = parts.join(', ') || primaryName;
          const display = primaryName !== fullAddress ? `${primaryName} — ${fullAddress}` : primaryName;

          return {
            id: `geo_${props.osm_id || idx}_${Date.now()}`,
            name: primaryName,
            displayName: display,
            address: fullAddress,
            city: props.city || props.district,
            state: props.state,
            country: props.country,
            coordinates: coords,
            category: props.osm_value || props.type || 'address'
          };
        });

        return places;
      }
    }
  } catch (err) {
    // Graceful fallback to search within local presets
  }

  // Fallback filter
  const qLow = trimmed.toLowerCase();
  const matched = LOCAL_FALLBACKS.filter(
    (fb) => fb.name.toLowerCase().includes(qLow) || fb.address.toLowerCase().includes(qLow) || fb.city?.toLowerCase().includes(qLow)
  );

  return matched;
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const url = `https://photon.komoot.io/reverse?lat=${lat}&lon=${lng}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        const p = data.features[0].properties || {};
        const parts = [
          p.name,
          p.street ? (p.housenumber ? `${p.street} #${p.housenumber}` : p.street) : null,
          p.district || p.locality || p.suburb,
          p.city || p.state
        ].filter(Boolean);

        if (parts.length > 0) {
          return parts.slice(0, 3).join(', ');
        }
      }
    }
  } catch (e) {
    // fallback
  }

  return `Ubicación (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
}
