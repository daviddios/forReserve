/**
 * Interfaz para la respuesta de lugares.
 */
export interface PlaceInterface {
  /**
   * Atribuciones HTML.
   */
  html_attributions: any[];

  /**
   * Token de la siguiente página.
   */
  next_page_token: string;

  /**
   * Resultados de los lugares.
   */
  results: Result[];

  /**
   * Estado de la respuesta.
   */
  status: string;
}

/**
 * Interfaz para el resultado de un lugar.
 */
export interface Result {
  /**
   * Geometría del lugar.
   */
  geometry: Geometry;

  /**
   * Icono del lugar.
   */
  icon: string;

  /**
   * Color de fondo del icono.
   */
  icon_background_color: IconBackgroundColor;

  /**
   * URI base de la máscara del icono.
   */
  icon_mask_base_uri: string;

  /**
   * Nombre del lugar.
   */
  name: string;

  /**
   * Fotos del lugar.
   */
  photos: Photo[] | undefined;

  /**
   * ID del lugar.
   */
  place_id: string;

  /**
   * Referencia del lugar.
   */
  reference: string;

  /**
   * Alcance del lugar.
   */
  scope: Scope;

  /**
   * Tipos de lugar.
   */
  types: string[];

  /**
   * Dirección del lugar cercano.
   */
  vicinity: string | undefined;

  /**
   * Dirección formateada del lugar.
   */
  formatted_address: string;

  /**
   * Estado del negocio.
   */
  business_status?: BusinessStatus;

  /**
   * Código adicional del lugar.
   */
  plus_code?: PlusCode;

  /**
   * Calificación del lugar.
   */
  rating?: number;

  /**
   * Total de calificaciones del lugar.
   */
  user_ratings_total?: number;

  /**
   * Horarios de apertura del lugar.
   */
  opening_hours?: OpeningHours;

  /**
   * Indicador de cierre permanente del lugar.
   */
  permanently_closed?: boolean;

  /**
   * Nivel de precio del lugar.
   */
  price_level?: number;
}

/**
 * Enumerado para el estado del negocio.
 */
export enum BusinessStatus {
  ClosedTemporarily = "CLOSED_TEMPORARILY",
  Operational = "OPERATIONAL",
}

/**
 * Interfaz para la geometría.
 */
export interface Geometry {
  /**
   * Ubicación del lugar.
   */
  location: Location;

  /**
   * Vista del mapa.
   */
  viewport: Viewport;
}

/**
 * Interfaz para la ubicación.
 */
export interface Location {
  /**
   * Latitud de la ubicación.
   */
  lat: number;

  /**
   * Longitud de la ubicación.
   */
  lng: number;
}

/**
 * Interfaz para la vista del mapa.
 */
export interface Viewport {
  /**
   * Ubicación noreste.
   */
  northeast: Location;

  /**
   * Ubicación suroeste.
   */
  southwest: Location;
}

/**
 * Enumerado para el color de fondo del icono.
 */
export enum IconBackgroundColor {
  The4B96F3 = "#4B96F3",
  The7B9Eb0 = "#7B9EB0",
  The909Ce1 = "#909CE1",
}

/**
 * Interfaz para los horarios de apertura.
 */
export interface OpeningHours {
  /**
   * Indicador de apertura actual.
   */
  open_now: boolean;
}

/**
 * Interfaz para la foto de un lugar.
 */
export interface Photo {
  /**
   * Altura de la foto.
   */
  height: number;

  /**
   * Atribuciones HTML de la foto.
   */
  html_attributions: string[];

  /**
   * Referencia de la foto.
   */
  photo_reference: string;

  /**
   * Ancho de la foto.
   */
  width: number;
}

/**
 * Interfaz para el código adicional del lugar.
 */
export interface PlusCode {
  /**
   * Código compuesto del lugar.
   */
  compound_code: string;

  /**
   * Código global del lugar.
   */
  global_code: string;
}

/**
 * Enumerado para el alcance del lugar.
 */
export enum Scope {
  Google = "GOOGLE",
}
