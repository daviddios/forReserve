import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Router} from "@angular/router";
import {MockService} from "../../shared/services/mock.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Location, Locations} from "../../shared/interfaces/location.interface";
import {first, firstValueFrom, lastValueFrom, Observable, timeout} from "rxjs";
import {PlaceInterface} from "../../shared/interfaces/place.interface";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage implements OnInit {
  public locations: Location[] = [
    {id: '1', name: 'Vilagarcía de Arousa'},
    {id: '2', name: 'Pontevedra'},
    {id: '3', name: 'Ourense'}
  ];


  constructor(
    private router: Router,
    private _http: HttpClient,
    private readonly _mockService: MockService,
    private _cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/landing']);
  }

  signout() {

  }
}
