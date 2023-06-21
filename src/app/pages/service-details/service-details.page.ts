import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlaceDetails } from '../../shared/interfaces/place-details.interface';
import { hiddenChips, hiddenServices } from '../../shared/constants/hiddens';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CallNumber } from "@awesome-cordova-plugins/call-number/ngx";
import { DataService } from "../../shared/services/data.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {window} from "rxjs";


@Component({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterLink,
    TranslateModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-service-details',
  standalone: true,
  styleUrls: ['./service-details.page.scss'],
  templateUrl: './service-details.page.html'
})
export class ServiceDetailsPage implements OnInit {

  public isLoading: boolean = true;
  public isLiked: boolean = false;
  public placeId!: string | null;
  public place: PlaceDetails | null = null;
  public dateAndHoursList: { date: Date, open: string, close: string }[] = [];
  public selectedDate: Date | null = null;
  public timeOptions: string[] = [];
  public dayValues: string = ''
  public selectedTime: string = '';
  public open: string = '';
  public close: string = ''
  lang: any;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private _dataService: DataService,
              private _translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.placeId = this.route.snapshot.paramMap.get('place_id');

    this.http.get<PlaceDetails>(`/maps/api/place/details/json?place_id=${this.placeId}&key=AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw`)
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

  public shouldShowChip(chip: string): boolean {
    return !hiddenChips.includes(chip);
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  createDayValues(dateAndHoursList: { date: Date, open: string, close: string }[]): string {
    const dayValuesSet = new Set<number>();
    for (let item of dateAndHoursList) {
      dayValuesSet.add(item.date.getDate());
    }

    // Convertir el conjunto a una cadena y devolverlo
    return Array.from(dayValuesSet).join(',');
  }

  onDateChange(event: any) {
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

  public getPhotoUrl(photo_reference: string | undefined): string {
    const apiKey: string = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw';
    const maxWidth: number = 800;
    const photoUrl: string = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photo_reference}&key=${apiKey}`;
    return photoUrl;
  }

  getDatesBetween(startDate: Date, endDate: Date): Date[] {
    const dateArray: Date[] = [];
    const currentDate: Date = startDate;

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));  // Asegúrate de que sea una copia del objeto de la fecha
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }

  callPlace(formatted_phone_number: string | undefined) {
    console.log('calling place: ', formatted_phone_number)
  }

  public redirectURLImage(profile_photo_url: string): string {
    if (profile_photo_url !== null) {
      return profile_photo_url.replace('https://lh3.googleusercontent.com', '/googleImages');
    }
    return '/';
  }

  public onSubmit() {
    if (this.selectedDate) {
      this._dataService.setData(this.selectedTime, this.selectedDate, this.place?.result.name);
      console.log(this._dataService.getData())
    }
  }

  protected readonly window = window;
}
