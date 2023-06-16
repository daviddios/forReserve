import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { IonicModule, IonicSlides } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SliderInterface } from '../../interfaces/slider.interface';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { LocationService } from '../../services/location.service';
import { Geolocation } from '@capacitor/geolocation';

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
  public slideOpts: SliderInterface = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2.2,
    spaceBetween: 10,
    loop: true,
    effect: 'slide',
  };
  constructor(
    private router: Router,
    private readonly dataService: DataService,
    private readonly _userLocation: LocationService
  ) {
    this.currentLocation = '';
  }
  ngOnInit() {
    this._getLocation();
    this._userLocation.getUserLocation();
    this.getPopularHotels();
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
}
