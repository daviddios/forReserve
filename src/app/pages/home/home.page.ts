import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  Renderer2
} from '@angular/core';
import {IonicModule, Platform} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {hiddenChips, hiddenServices} from '../../shared/constants/hiddens';
import {Router} from '@angular/router';
import {DataService} from '../../shared/services/data.service';
import {PlaceInterface} from '../../shared/interfaces/place.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ToolbarComponent} from "../../shared/Components/toolbar/toolbar.component";
import {FlexCardComponent} from "../../shared/Components/flex-card/flex-card.component";

/**
 * Componente para la página de inicio.
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, TranslateModule, ToolbarComponent, FlexCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})


export class HomePage implements OnInit {

  /**
   * Lista de items.
   */
  public items: any;

  /**
   * Ubicación actual.
   */
  public currentLocation: string = '';

  /**
   * Lugares populares.
   */
  public popularPlaces: PlaceInterface;

  /**
   * Coordenadas.
   */
  public coordinates: string = '';

  /**
   * Constructor.
   */
  constructor(
    public router: Router,
    private readonly dataService: DataService,
    private _http: HttpClient,
    private _translateService: TranslateService,
    private _platform: Platform,
    private _renderer: Renderer2,
    private _cdr: ChangeDetectorRef
  ) {
    this.popularPlaces = {
      html_attributions: [],
      next_page_token: '',
      results: [],
      status: 'string',
    }
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this._getLocation();
    this.getNearbyPopularServices();
  }

  /**
   * Comprueba si debe mostrar un chip.
   * @param chip - Nombre del chip.
   * @returns Retorna true si debe mostrar el chip, false en caso contrario.
   */
  public shouldShowChip(chip: string): boolean {
    return !hiddenChips.includes(chip);
  }

  /**
   * Obtiene la ubicación actual del dispositivo.
   */
  private _getLocation(): void {
    if (!sessionStorage.getItem('coordinates')) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const coordinates = `${latitude}, ${longitude}`;
            sessionStorage.setItem('coordinates', coordinates);
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

  /**
   * Obtiene los servicios populares cercanos.
   * @returns Una promesa que se resuelve con los servicios populares.
   */
  public getNearbyPopularServices(): Promise<PlaceInterface> {

    return new Promise<PlaceInterface>((resolve, reject) => {
      this.getPopularServices().subscribe({
        next: (resp) => {
          this.popularPlaces = resp;
          resolve(resp);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  /**
   * Obtiene los servicios populares.
   * @returns Un observable que emite los servicios populares.
   */
  public getPopularServices(): Observable<PlaceInterface> {
    const apiKey: string = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw'
    const url: string = `/maps/api/place/nearbysearch/json?location=${sessionStorage.getItem(
      'coordinates'
    )}&radius=5000&type=&key=${apiKey}`;
    return this._http.get<PlaceInterface>(url);
  }

  /**
   * Comprueba si hay chips ocultos para los tipos de servicios.
   * @param types - Tipos de servicios.
   * @returns Retorna true si hay algún tipo de servicio oculto, false en caso contrario.
   */
  public checkHiddenChips(types: string[]): boolean {
    return types.some((type) => hiddenServices.includes(type));
  }

  /**
   * Busca servicios.
   * @param event - Evento del campo de búsqueda.
   */
  public searchServices(event: any): void {
    console.log(event.target.value);
    const apiKey: string = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw'
    const url = `/maps/api/place/textsearch/json?query=${event.target.value}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.popularPlaces = data;
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
