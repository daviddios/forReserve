export interface PlaceInterface {
  html_attributions: any[];
  next_page_token:   string;
  results:           Result[];
  status:            string;
}

export interface Result {
  geometry:              Geometry;
  icon:                  string;
  icon_background_color: IconBackgroundColor;
  icon_mask_base_uri:    string;
  name:                  string;
  photos:                Photo[] | undefined;
  place_id:              string;
  reference:             string;
  scope:                 Scope;
  types:                 string[];
  vicinity:              string;
  business_status?:      BusinessStatus;
  plus_code?:            PlusCode;
  rating?:               number;
  user_ratings_total?:   number;
  opening_hours?:        OpeningHours;
  permanently_closed?:   boolean;
  price_level?:          number;
}

export enum BusinessStatus {
  ClosedTemporarily = "CLOSED_TEMPORARILY",
  Operational = "OPERATIONAL",
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export enum IconBackgroundColor {
  The4B96F3 = "#4B96F3",
  The7B9Eb0 = "#7B9EB0",
  The909Ce1 = "#909CE1",
}

export interface OpeningHours {
  open_now: boolean;
}

export interface Photo {
  height:            number;
  html_attributions: string[];
  photo_reference:   string;
  width:             number;
}

export interface PlusCode {
  compound_code: string;
  global_code:   string;
}

export enum Scope {
  Google = "GOOGLE",
}
