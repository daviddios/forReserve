/**
 * Interfaz para los detalles de un lugar.
 */
export interface PlaceDetails {
  html_attributions: any[];
  result: Result;
  status: string;
}

/**
 * Interfaz para el resultado de un lugar.
 */
export interface Result {
  address_components: AddressComponent[];
  adr_address: string;
  business_status: string;
  current_opening_hours: CurrentOpeningHours;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  international_phone_number: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  rating: number;
  reference: string;
  reviews: Review[];
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
  wheelchair_accessible_entrance: boolean;
}

/**
 * Interfaz para el componente de dirección.
 */
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

/**
 * Interfaz para el horario de apertura actual.
 */
export interface CurrentOpeningHours {
  open_now: boolean;
  periods: CurrentOpeningHoursPeriod[];
  weekday_text: string[];
}

/**
 * Interfaz para el periodo de horario de apertura actual.
 */
export interface CurrentOpeningHoursPeriod {
  close: PurpleClose;
  open: PurpleClose;
}

/**
 * Interfaz para el cierre del horario de apertura actual.
 */
export interface PurpleClose {
  date: Date;
  day: number;
  time: string;
}

/**
 * Interfaz para la geometría.
 */
export interface Geometry {
  location: Location;
  viewport: Viewport;
}

/**
 * Interfaz para la ubicación.
 */
export interface Location {
  lat: number;
  lng: number;
}

/**
 * Interfaz para la vista del mapa.
 */
export interface Viewport {
  northeast: Location;
  southwest: Location;
}

/**
 * Interfaz para el horario de apertura.
 */
export interface OpeningHours {
  open_now: boolean;
  periods: OpeningHoursPeriod[];
  weekday_text: string[];
}

/**
 * Interfaz para el periodo de horario de apertura.
 */
export interface OpeningHoursPeriod {
  close: FluffyClose;
  open: FluffyClose;
}

/**
 * Interfaz para el cierre del horario de apertura.
 */
export interface FluffyClose {
  day: number;
  time: string;
}

/**
 * Interfaz para la foto de un lugar.
 */
export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

/**
 * Interfaz para el código adicional del lugar.
 */
export interface PlusCode {
  compound_code: string;
  global_code: string;
}

/**
 * Interfaz para la reseña de un lugar.
 */
export interface Review {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}
