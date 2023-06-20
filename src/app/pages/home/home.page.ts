import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { IonicModule, IonicSlides } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { hiddenChips, hiddenServices } from '../../shared/constants/hiddens';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Geolocation } from '@capacitor/geolocation';
import {PlaceInterface} from "../../shared/interfaces/place.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit{
  SwiperModules = [IonicSlides];
  public items: any;
  public currentLocation: string;
  public popularPlaces: PlaceInterface | null = null;
  public coordinates: string = ''

  constructor(
    public router: Router,
    private readonly dataService: DataService,
    private _http: HttpClient
  ) {
    this.currentLocation = '';
  }
  ngOnInit() {
    this._getLocation();
    this.getNearbyPopularServices()
  }
   public shouldShowChip(chip: string): boolean {
    return !hiddenChips.includes(chip);
  }


  private _getLocation() {
    if(!sessionStorage.getItem('coordinates')){

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const coordinates = (`${latitude}, ${longitude}`)
          sessionStorage.setItem('coordinates', coordinates)
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported');
    }
    }
  }

  public getNearbyPopularServices(): Promise<PlaceInterface> {
    return new Promise<PlaceInterface>((resolve, reject) => {
      this.getPopularServices().subscribe({
        next: (resp) => {
          this.popularPlaces = resp;
          resolve(resp);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  public getPopularServices(): Observable<PlaceInterface> {
    const apiKey = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw'
    const url = `/maps/api/place/nearbysearch/json?location=${sessionStorage.getItem('coordinates')}&radius=5000&type=&key=${apiKey}`
    return this._http.get<PlaceInterface>(url);
  }

  getPhotoUrl(photo_reference: string | undefined) {
    const apiKey = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw'
    const maxWidth = 800; // Tamaño máximo deseado para la imagen
    const photoUrl = `/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photo_reference}&key=${apiKey}`;
    return photoUrl;

  }
  goToServicePage(place_id: string) {
    this.router.navigate(['/tabs/service-details', place_id])
  }

  public checkHiddenChips(types: string[]) {
    return types.some(type => hiddenServices.includes(type));
  }
}
