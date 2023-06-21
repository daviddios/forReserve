import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlaceDetails } from '../../shared/interfaces/place-details.interface';
import { hiddenChips } from '../../shared/constants/hiddens';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DataService } from "../../shared/services/data.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import {ToolbarComponent} from "../../shared/Components/toolbar/toolbar.component";


@Component({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterLink,
    TranslateModule,
    ToolbarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-service-details',
  standalone: true,
  styleUrls: ['./service-details.page.scss'],
  templateUrl: './service-details.page.html'
})
export class ServiceDetailsPage implements OnInit {

  /**
   * Indica si se está cargando la información.
   */
  public isLoading: boolean = true;

  /**
   * Indica si el lugar está marcado como "me gusta".
   */
  public isLiked: boolean = false;

  /**
   * ID del lugar. Puede ser nulo.
   */
  public placeId!: string | null;

  /**
   * Objeto que representa la información del lugar.
   * Puede ser nulo si no se ha cargado la información del lugar.
   */
  public place: PlaceDetails | null = null;

  /**
   * Lista de fechas y horarios disponibles.
   */
  public dateAndHoursList: { date: Date, open: string, close: string }[] = [];

  /**
   * Fecha seleccionada.
   * Puede ser nulo si no se ha seleccionado ninguna fecha.
   */
  public selectedDate: Date | null = null;

  /**
   * Opciones de tiempo disponibles.
   */
  public timeOptions: string[] = [];

  /**
   * Valores de días seleccionados en formato de cadena.
   */
  public dayValues: string = '';

  /**
   * Tiempo seleccionado en formato de cadena.
   */
  public selectedTime: string = '';

  /**
   * Hora de apertura del lugar.
   */
  public open: string = '';

  /**
   * Hora de cierre del lugar.
   */
  public close: string = '';

  /*
  * Constructor
  */
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private _dataService: DataService,
    private _translateService: TranslateService,
  ) { }
  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.placeId = this.route.snapshot.paramMap.get('place_id');
    const apiKey: string = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw';

    this.http.get<PlaceDetails>(`/maps/api/place/details/json?place_id=${this.placeId}&key=${apiKey}`)
      .subscribe((response) => {
        this.place = response;

        let periods = this.place?.result.current_opening_hours?.periods;
        if (periods) {
          if (periods[0].open.time === "0000" && periods[0].close.time === "2359") {
            // Si está abierto 24/7, generar la lista de fechas
            let dates = this.getDatesBetween(new Date(periods[0].open.date), new Date(periods[0].close.date));
            for (let date of dates) {
              this.dateAndHoursList.push({ date: date, open: '00:00', close: '23:59' });
            }
          } else {
            for (let period of periods) {
              this.dateAndHoursList.push({
                date: new Date(period.open.date),
                open: period.open.time.slice(0, 2) + ':' + period.open.time.slice(2),
                close: period.close.time.slice(0, 2) + ':' + period.close.time.slice(2)
              });
            }
          }

          this.dayValues = this.createDayValues(this.dateAndHoursList);
        }

        this.isLoading = false;
      });
    this._translateService.get('__Abierto').subscribe((translation: string) => {
      this.open = translation;
    });

    this._translateService.get('__Cerrado').subscribe((translation: string) => {
      this.close = translation;
    });
  }

  /**
   * Comprueba si se debe mostrar un chip en función de su nombre.
   * @param chip - El nombre del chip.
   * @returns `true` si el chip no está oculto, de lo contrario `false`.
   */
  public shouldShowChip(chip: string): boolean {
    return !hiddenChips.includes(chip);
  }

  /**
   * Selecciona una hora.
   * @param time - La hora seleccionada.
   */
  public selectTime(time: string): void {
    this.selectedTime = time;
  }

  /**
   * Crea una cadena de valores de día a partir de la lista de fechas y horas.
   * @param dateAndHoursList - La lista de fechas y horas.
   * @returns La cadena de valores de día.
   */
  public createDayValues(dateAndHoursList: { date: Date, open: string, close: string }[]): string {
    const dayValuesSet = new Set<number>();
    for (let item of dateAndHoursList) {
      dayValuesSet.add(item.date.getDate());
    }

    // Convertir el conjunto a una cadena y devolverlo
    return Array.from(dayValuesSet).join(',');
  }

  /**
   * Se ejecuta cuando se cambia la fecha seleccionada.
   * @param event - El evento de cambio de fecha.
   */
  public onDateChange(event: any): void {
    // Convertir la fecha seleccionada a un objeto Date
    const selectedDateObj = new Date(event.detail.value);

    // Buscar el objeto de fecha y horas que corresponde a la fecha seleccionada
    const matchingDateAndHours = this.dateAndHoursList.find(x => {
      const dateObj = new Date(x.date);
      return dateObj.getDate() === selectedDateObj.getDate() &&
        dateObj.getMonth() === selectedDateObj.getMonth() &&
        dateObj.getFullYear() === selectedDateObj.getFullYear();
    });

    // Generar la lista de horas disponibles
    if (matchingDateAndHours) {
      this.timeOptions = this.getTimeOptions(matchingDateAndHours.open, matchingDateAndHours.close);
    } else {
      this.timeOptions = [];
    }
  }

  /**
   * Obtiene la lista de opciones de hora entre la hora de apertura y cierre.
   * @param openTime - Hora de apertura en formato HH:mm.
   * @param closeTime - Hora de cierre en formato HH:mm.
   * @returns La lista de opciones de hora.
   */
  public getTimeOptions(openTime: string, closeTime: string): string[] {
    const open = parseInt(openTime.slice(0, 2));
    const close = parseInt(closeTime.slice(0, 2));
    const options: string[] = [];

    for (let i = open; i <= close; i++) {
      if (i < 24) {
        const hours = i.toString().padStart(2, '0');
        options.push(`${hours}:00`);
        options.push(`${hours}:30`);
      }
    }

    return options;
  }

  /**
   * Obtiene la URL de la foto utilizando la referencia de la foto.
   * @param photo_reference - La referencia de la foto.
   * @returns La URL de la foto.
   */
  public getPhotoUrl(photo_reference: string | undefined): string {
    const apiKey: string = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw';
    const maxWidth: number = 800;
    const photoUrl: string = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photo_reference}&key=${apiKey}`;
    return photoUrl;
  }

  /**
   * Obtiene las fechas entre una fecha de inicio y una fecha de fin.
   * @param startDate - La fecha de inicio.
   * @param endDate - La fecha de fin.
   * @returns La lista de fechas entre la fecha de inicio y la fecha de fin.
   */
  public getDatesBetween(startDate: Date, endDate: Date): Date[] {
    const dateArray: Date[] = [];
    const currentDate: Date = startDate;

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));  // Asegúrate de que sea una copia del objeto de la fecha
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }

  /**
   * Alterna el estado de "Me gusta" del lugar.
   */
  public toggleLike(): void {
    this.isLiked = !this.isLiked;
  }

  /**
   * Realiza una llamada telefónica al lugar.
   * @param formatted_phone_number - El número de teléfono formateado.
   */
  public callPlace(formatted_phone_number: string | undefined): void {
    console.log('calling place: ', formatted_phone_number);
  }

  /**
   * Redirige la URL de la imagen.
   * @param profile_photo_url - La URL de la imagen del perfil.
   * @returns La URL redirigida de la imagen.
   */
  public redirectURLImage(profile_photo_url: string): string {
    if (profile_photo_url !== null) {
      return profile_photo_url.replace('https://lh3.googleusercontent.com', '/googleImages');
    }
    return '/';
  }

  /**
   * Se ejecuta cuando se envía el formulario.
   */
  public onSubmit(): void {
    if (this.selectedDate) {
      this._dataService.setData(this.selectedTime, this.selectedDate, this.place?.result.name);
      console.log(this._dataService.getData());
    }
  }
}
