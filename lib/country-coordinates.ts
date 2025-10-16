// Real latitude and longitude coordinates for countries
export const countryLatLng: Record<string, { lat: number; lng: number }> = {
  // North America
  Mexico: { lat: 23.6345, lng: -102.5528 },
  "United States": { lat: 37.0902, lng: -95.7129 },
  Canada: { lat: 56.1304, lng: -106.3468 },

  // Central America
  "Costa Rica": { lat: 9.7489, lng: -83.7534 },
  Panama: { lat: 8.538, lng: -80.7821 },
  Guatemala: { lat: 15.7835, lng: -90.2308 },
  Belize: { lat: 17.1899, lng: -88.4976 },
  "El Salvador": { lat: 13.7942, lng: -88.8965 },
  Honduras: { lat: 15.2, lng: -86.2419 },
  Nicaragua: { lat: 12.8654, lng: -85.2072 },

  // South America
  Brazil: { lat: -14.235, lng: -51.9253 },
  Argentina: { lat: -38.4161, lng: -63.6167 },
  Peru: { lat: -9.19, lng: -75.0152 },
  Chile: { lat: -35.6751, lng: -71.543 },
  Colombia: { lat: 4.5709, lng: -74.2973 },
  Ecuador: { lat: -1.8312, lng: -78.1834 },
  Venezuela: { lat: 6.4238, lng: -66.5897 },
  Bolivia: { lat: -16.2902, lng: -63.5887 },
  Paraguay: { lat: -23.4425, lng: -58.4438 },
  Uruguay: { lat: -32.5228, lng: -55.7658 },

  // Europe
  Spain: { lat: 40.4637, lng: -3.7492 },
  France: { lat: 46.2276, lng: 2.2137 },
  Italy: { lat: 41.8719, lng: 12.5674 },
  Germany: { lat: 51.1657, lng: 10.4515 },
  "United Kingdom": { lat: 55.3781, lng: -3.436 },
  Greece: { lat: 39.0742, lng: 21.8243 },
  Portugal: { lat: 39.3999, lng: -8.2245 },
  Netherlands: { lat: 52.1326, lng: 5.2913 },
  Switzerland: { lat: 46.8182, lng: 8.2275 },
  Austria: { lat: 47.5162, lng: 14.5501 },
  Belgium: { lat: 50.5039, lng: 4.4699 },
  Poland: { lat: 51.9194, lng: 19.1451 },
  Sweden: { lat: 60.1282, lng: 18.6435 },
  Norway: { lat: 60.472, lng: 8.4689 },
  Denmark: { lat: 56.2639, lng: 9.5018 },
  Finland: { lat: 61.9241, lng: 25.7482 },
  Iceland: { lat: 64.9631, lng: -19.0208 },
  Ireland: { lat: 53.4129, lng: -8.2439 },
  Croatia: { lat: 45.1, lng: 15.2 },
  "Czech Republic": { lat: 49.8175, lng: 15.473 },

  // Asia
  Thailand: { lat: 15.87, lng: 100.9925 },
  Japan: { lat: 36.2048, lng: 138.2529 },
  China: { lat: 35.8617, lng: 104.1954 },
  India: { lat: 20.5937, lng: 78.9629 },
  Vietnam: { lat: 14.0583, lng: 108.2772 },
  Indonesia: { lat: -0.7893, lng: 113.9213 },
  "South Korea": { lat: 35.9078, lng: 127.7669 },
  Singapore: { lat: 1.3521, lng: 103.8198 },
  Malaysia: { lat: 4.2105, lng: 101.9758 },
  Philippines: { lat: 12.8797, lng: 121.774 },
  Cambodia: { lat: 12.5657, lng: 104.991 },
  Laos: { lat: 19.8563, lng: 102.4955 },
  Myanmar: { lat: 21.9162, lng: 95.956 },
  Nepal: { lat: 28.3949, lng: 84.124 },
  "Sri Lanka": { lat: 7.8731, lng: 80.7718 },
  Bangladesh: { lat: 23.685, lng: 90.3563 },
  Pakistan: { lat: 30.3753, lng: 69.3451 },
  Mongolia: { lat: 46.8625, lng: 103.8467 },
  Taiwan: { lat: 23.6978, lng: 120.9605 },

  // Middle East
  "United Arab Emirates": { lat: 23.4241, lng: 53.8478 },
  Turkey: { lat: 38.9637, lng: 35.2433 },
  Israel: { lat: 31.0461, lng: 34.8516 },
  Jordan: { lat: 30.5852, lng: 36.2384 },
  Lebanon: { lat: 33.8547, lng: 35.8623 },
  "Saudi Arabia": { lat: 23.8859, lng: 45.0792 },
  Qatar: { lat: 25.3548, lng: 51.1839 },
  Oman: { lat: 21.4735, lng: 55.9754 },
  Kuwait: { lat: 29.3117, lng: 47.4818 },
  Bahrain: { lat: 26.0667, lng: 50.5577 },

  // Africa
  Egypt: { lat: 26.8206, lng: 30.8025 },
  Morocco: { lat: 31.7917, lng: -7.0926 },
  "South Africa": { lat: -30.5595, lng: 22.9375 },
  Kenya: { lat: -0.0236, lng: 37.9062 },
  Tanzania: { lat: -6.369, lng: 34.8888 },
  Nigeria: { lat: 9.082, lng: 8.6753 },
  Ghana: { lat: 7.9465, lng: -1.0232 },
  Ethiopia: { lat: 9.145, lng: 40.4897 },
  Uganda: { lat: 1.3733, lng: 32.2903 },
  Tunisia: { lat: 33.8869, lng: 9.5375 },
  Algeria: { lat: 28.0339, lng: 1.6596 },
  Senegal: { lat: 14.4974, lng: -14.4524 },

  // Oceania
  Australia: { lat: -25.2744, lng: 133.7751 },
  "New Zealand": { lat: -40.9006, lng: 174.886 },
  Fiji: { lat: -17.7134, lng: 178.065 },
  "Papua New Guinea": { lat: -6.315, lng: 143.9555 },
}

/**
 * Mapping of Spanish country names to English names
 * This allows the system to work with Spanish country names from Sanity
 */
export const countryNameMapping: Record<string, string> = {
  // Spanish to English
  tailandia: "Thailand",
  mexico: "Mexico",
  méxico: "Mexico",
  españa: "Spain",
  francia: "France",
  italia: "Italy",
  alemania: "Germany",
  "reino unido": "United Kingdom",
  grecia: "Greece",
  portugal: "Portugal",
  "países bajos": "Netherlands",
  holanda: "Netherlands",
  suiza: "Switzerland",
  austria: "Austria",
  bélgica: "Belgium",
  belgica: "Belgium",
  polonia: "Poland",
  suecia: "Sweden",
  noruega: "Norway",
  dinamarca: "Denmark",
  finlandia: "Finland",
  islandia: "Iceland",
  irlanda: "Ireland",
  croacia: "Croatia",
  "república checa": "Czech Republic",
  japón: "Japan",
  japon: "Japan",
  china: "China",
  india: "India",
  vietnam: "Vietnam",
  indonesia: "Indonesia",
  "corea del sur": "South Korea",
  singapur: "Singapore",
  malasia: "Malaysia",
  filipinas: "Philippines",
  camboya: "Cambodia",
  laos: "Laos",
  birmania: "Myanmar",
  nepal: "Nepal",
  "sri lanka": "Sri Lanka",
  bangladés: "Bangladesh",
  bangladesh: "Bangladesh",
  pakistán: "Pakistan",
  pakistan: "Pakistan",
  mongolia: "Mongolia",
  taiwán: "Taiwan",
  taiwan: "Taiwan",
  "emiratos árabes unidos": "United Arab Emirates",
  "emiratos arabes unidos": "United Arab Emirates",
  turquía: "Turkey",
  turquia: "Turkey",
  israel: "Israel",
  jordania: "Jordan",
  líbano: "Lebanon",
  libano: "Lebanon",
  "arabia saudita": "Saudi Arabia",
  "arabia saudí": "Saudi Arabia",
  catar: "Qatar",
  omán: "Oman",
  oman: "Oman",
  kuwait: "Kuwait",
  baréin: "Bahrain",
  barein: "Bahrain",
  egipto: "Egypt",
  marruecos: "Morocco",
  sudáfrica: "South Africa",
  sudafrica: "South Africa",
  // sudáfrica: "South Africa",
  kenia: "Kenya",
  tanzania: "Tanzania",
  nigeria: "Nigeria",
  ghana: "Ghana",
  etiopía: "Ethiopia",
  etiopia: "Ethiopia",
  uganda: "Uganda",
  túnez: "Tunisia",
  tunez: "Tunisia",
  argelia: "Algeria",
  senegal: "Senegal",
  brasil: "Brazil",
  argentina: "Argentina",
  perú: "Peru",
  peru: "Peru",
  chile: "Chile",
  colombia: "Colombia",
  ecuador: "Ecuador",
  venezuela: "Venezuela",
  bolivia: "Bolivia",
  paraguay: "Paraguay",
  uruguay: "Uruguay",
  "costa rica": "Costa Rica",
  panamá: "Panama",
  panama: "Panama",
  guatemala: "Guatemala",
  belice: "Belize",
  "el salvador": "El Salvador",
  honduras: "Honduras",
  nicaragua: "Nicaragua",
  "estados unidos": "United States",
  canadá: "Canada",
  canada: "Canada",
  australia: "Australia",
  "nueva zelanda": "New Zealand",
  "nueva zelandia": "New Zealand",
  fiyi: "Fiji",
  "papúa nueva guinea": "Papua New Guinea",
  "papua nueva guinea": "Papua New Guinea",
}

/**
 * Normalize country name to find a match
 * Handles case-insensitive matching and Spanish translations
 */
function normalizeCountryName(country: string): string {
  const normalized = country.toLowerCase().trim()

  // Check if there's a mapping for this name
  if (countryNameMapping[normalized]) {
    return countryNameMapping[normalized]
  }

  // Try to find case-insensitive match in countryLatLng
  const exactMatch = Object.keys(countryLatLng).find((key) => key.toLowerCase() === normalized)

  if (exactMatch) {
    return exactMatch
  }

  // Return original if no match found
  return country
}

/**
 * Converts latitude and longitude to 3D Cartesian coordinates on a sphere
 * @param lat Latitude in degrees (-90 to 90)
 * @param lng Longitude in degrees (-180 to 180)
 * @param radius Radius of the sphere (default: 2 to match globe size)
 * @returns [x, y, z] coordinates
 */
export function latLngToVector3(lat: number, lng: number, radius = 2): [number, number, number] {
  // Convert to radians
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  // Calculate 3D coordinates
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return [x, y, z]
}

/**
 * Get 3D coordinates for a country by name
 * @param country Country name (English or Spanish)
 * @returns [x, y, z] coordinates or default position if country not found
 */
export function getCountryCoordinates(country: string): [number, number, number] {
  const normalizedCountry = normalizeCountryName(country)
  const coords = countryLatLng[normalizedCountry]

  if (!coords) {
    console.warn(
      `[v0] Country "${country}" (normalized: "${normalizedCountry}") not found in coordinates map, using default position`,
    )
    return [0, 0, 2] // Default position (front of globe)
  }

  return latLngToVector3(coords.lat, coords.lng)
}

// Instructions for manually adding coordinates
/**
 * INSTRUCCIONES PARA AGREGAR COORDENADAS MANUALMENTE:
 *
 * 1. Activa el "Coordinate Picker" en el globo
 * 2. Haz clic en el país donde quieres colocar el pin
 * 3. Copia las coordenadas [x, y, z] que aparecen
 * 4. Agrégalas directamente en el objeto manualCoordinates abajo
 *
 * Ejemplo:
 * "Mexico": [1.23, 0.45, -0.67],
 *
 * Las coordenadas manuales tienen prioridad sobre las calculadas automáticamente.
 */
export const manualCoordinates: Record<string, [number, number, number]> = {
  // Agrega tus coordenadas manuales aquí
  // Ejemplo:
  // "Mexico": [0.85, 0.78, -1.52],
  // "Thailand": [-1.45, 0.55, 1.23],
}

/**
 * Get coordinates with manual override support
 * @param country Country name (English or Spanish)
 * @returns [x, y, z] coordinates (manual if available, otherwise calculated)
 */
export function getCountryCoordinatesWithManual(country: string): [number, number, number] {
  const normalizedCountry = normalizeCountryName(country)

  // Check if manual coordinates exist for normalized name
  if (manualCoordinates[normalizedCountry]) {
    console.log(
      `[v0] Using manual coordinates for "${country}" (${normalizedCountry}):`,
      manualCoordinates[normalizedCountry],
    )
    return manualCoordinates[normalizedCountry]
  }

  // Also check original country name in case user added it that way
  if (manualCoordinates[country]) {
    console.log(`[v0] Using manual coordinates for "${country}":`, manualCoordinates[country])
    return manualCoordinates[country]
  }

  // Fall back to calculated coordinates
  return getCountryCoordinates(country)
}

export const countryCodeMap: Record<string, string> = {
  Mexico: "MX",
  "United States": "US",
  Canada: "CA",
  "Costa Rica": "CR",
  Panama: "PA",
  Guatemala: "GT",
  Belize: "BZ",
  "El Salvador": "SV",
  Honduras: "HN",
  Nicaragua: "NI",
  Brazil: "BR",
  Argentina: "AR",
  Peru: "PE",
  Chile: "CL",
  Colombia: "CO",
  Ecuador: "EC",
  Venezuela: "VE",
  Bolivia: "BO",
  Paraguay: "PY",
  Uruguay: "UY",
  Spain: "ES",
  France: "FR",
  Italy: "IT",
  Germany: "DE",
  "United Kingdom": "GB",
  Greece: "GR",
  Portugal: "PT",
  Netherlands: "NL",
  Switzerland: "CH",
  Austria: "AT",
  Belgium: "BE",
  Poland: "PL",
  Sweden: "SE",
  Norway: "NO",
  Denmark: "DK",
  Finland: "FI",
  Iceland: "IS",
  Ireland: "IE",
  Croatia: "HR",
  "Czech Republic": "CZ",
  Thailand: "TH",
  Japan: "JP",
  China: "CN",
  India: "IN",
  Vietnam: "VN",
  Indonesia: "ID",
  "South Korea": "KR",
  Singapore: "SG",
  Malaysia: "MY",
  Philippines: "PH",
  Cambodia: "KH",
  Laos: "LA",
  Myanmar: "MM",
  Nepal: "NP",
  "Sri Lanka": "LK",
  Bangladesh: "BD",
  Pakistan: "PK",
  Mongolia: "MN",
  Taiwan: "TW",
  "United Arab Emirates": "AE",
  Turkey: "TR",
  Israel: "IL",
  Jordan: "JO",
  Lebanon: "LB",
  "Saudi Arabia": "SA",
  Qatar: "QA",
  Oman: "OM",
  Kuwait: "KW",
  Bahrain: "BH",
  Egypt: "EG",
  Morocco: "MA",
  "South Africa": "ZA",
  Kenya: "KE",
  Tanzania: "TZ",
  Nigeria: "NG",
  Ghana: "GH",
  Ethiopia: "ET",
  Uganda: "UG",
  Tunisia: "TN",
  Algeria: "DZ",
  Senegal: "SN",
  Australia: "AU",
  "New Zealand": "NZ",
  Fiji: "FJ",
  "Papua New Guinea": "PG",
}

export function getCountryCode(country: string): string | undefined {
  const normalized = normalizeCountryName(country)
  return countryCodeMap[normalized]
}
