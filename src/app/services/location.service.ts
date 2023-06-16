import { Injectable } from '@angular/core';
import {GeolocationWeb} from "@capacitor/geolocation/dist/esm/web";


@Injectable({
  providedIn: 'root',
})
export class LocationService {
  public userLocation?: [number, number];

  constructor() {}
  public getUserLocation() {}
}
