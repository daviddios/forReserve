import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { IonicModule, IonicSlides } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { hiddenChips, hiddenServices } from '../../shared/constants/hiddens';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { LocationService } from '../../shared/services/location.service';
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

  constructor(
    private router: Router,
    private readonly dataService: DataService,
    private readonly _userLocation: LocationService,
    private _http: HttpClient
  ) {
    this.currentLocation = '';
  }
  ngOnInit() {
    this._getLocation();
    this.getNearbyPopularServices()
    this._userLocation.getUserLocation();
    this.getPopularHotels();
  }
   public shouldShowChip(chip: string): boolean {
    return !hiddenChips.includes(chip);
  }


  gotoSearchPage() {
    this.router.navigate(['/filters']);
  }

  gotoHotelList() {
    this.router.navigate(['/hotel-list']);
  }

  getPopularHotels() {
    this.items = this.dataService.getPopularServices();
  }
  private _getLocation() {
    const coordinates = Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
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
    return this._http.get<PlaceInterface>(
      '../assets/mocks/googleApiSearchCall.json'
    );
  }

  getPhotoUrl(photo_reference: string | undefined) {
    const apiKey = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw'
    const maxWidth = 800; // Tamaño máximo deseado para la imagen
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photo_reference}&key=${apiKey}`;
    return photoUrl;

  }


  goToServicePage(place_id: string) {
    this.router.navigate(['/tabs/service-details', place_id])
  }

  public checkHiddenChips(types: string[]) {
    return types.some(type => hiddenServices.includes(type));
  }
}
