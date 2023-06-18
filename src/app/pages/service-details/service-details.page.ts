
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlaceDetails} from '../../shared/interfaces/place-details.interface';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ]
})
export class ServiceDetailsPage implements OnInit {
  public isLoading: boolean = true;
  public isLiked: boolean = false;
  public placeId!: string | null;
  public place: PlaceDetails | null = null;
  public selectedDay: string = '';
  public dateList: Date[] = [];  // Aquí almacenaremos las fechas
  public dateAndHoursList: {date: Date, open: string, close: string}[] = [];
  public selectedDate: Date | null = null;
  public timeOptions: string[] = [];
  public dayValues: string = ''

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Obtener el ID del lugar de la URL
    this.placeId = this.route.snapshot.paramMap.get('place_id');

    // Realizar la solicitud a la API Place Details de Google
    this.http.get<PlaceDetails>(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&key=AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw`)
      .subscribe((response) => {
        this.place = response;

        let periods = this.place?.result.current_opening_hours?.periods;
        if(periods){
          if(periods[0].open.time === "0000" && periods[0].close.time === "2359"){
            // Si está abierto 24/7, generar la lista de fechas
            let dates = this.getDatesBetween(new Date(periods[0].open.date), new Date(periods[0].close.date));
            for(let date of dates){
              this.dateAndHoursList.push({date: date, open: '00:00', close: '23:59'});
            }
          } else {
            // Si hay horarios específicos para cada día
            for(let period of periods){
              this.dateAndHoursList.push({
                date: new Date(period.open.date),
                open: period.open.time.slice(0,2) + ':' + period.open.time.slice(2),
                close: period.close.time.slice(0,2) + ':' + period.close.time.slice(2)
              });
            }
          }

          // Crear la lista de días para ion-datetime después de procesar los períodos
          this.dayValues = this.createDayValues(this.dateAndHoursList);
          console.log(this.dayValues)
        }

        this.isLoading = false;
        console.log(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&key=AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw`)
      });
  }
  createDayValues(dateAndHoursList: {date: Date, open: string, close: string}[]): string {
    let dayValuesSet = new Set<number>();

    // Añadir el día de cada fecha a un conjunto para eliminar duplicados
    for (let item of dateAndHoursList) {
      dayValuesSet.add(item.date.getDate());
    }

    // Convertir el conjunto a una cadena y devolverlo
    return Array.from(dayValuesSet).join(',');
  }
  onDateChanged(event: any): void {
    this.selectedDate = new Date(event.detail.value);

    let matchedItem = this.dateAndHoursList.find(item => {
      return item.date.getDate() === this.selectedDate?.getDate() &&
        item.date.getMonth() === this.selectedDate?.getMonth() &&
        item.date.getFullYear() === this.selectedDate?.getFullYear();
    });

    if(matchedItem) {
      this.timeOptions = this.getTimeOptions(matchedItem.open, matchedItem.close);
    }
  }

  getTimeOptions(openTime: string, closeTime: string): string[] {
    let open = parseInt(openTime.split(':')[0]);
    let close = parseInt(closeTime.split(':')[0]);
    let options: string[] = [];
    for(let i=open; i<=close; i++) {
      options.push(('0' + i).slice(-2) + ':00');
      options.push(('0' + i).slice(-2) + ':15');
      options.push(('0' + i).slice(-2) + ':30');
      options.push(('0' + i).slice(-2) + ':45');
    }
    return options;
  }
  getDatesBetween(startDate: Date, endDate: Date): Date[] {
    let dateArray: Date[] = [];
    let currentDate: Date = startDate;

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));  // Asegúrate de que sea una copia del objeto de la fecha
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }
  getPhotoUrl(photo_reference: string | undefined) {
    const apiKey: string = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw'
    const maxWidth: number = 800; // Tamaño máximo deseado para la imagen
    const photoUrl: string = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photo_reference}&key=${apiKey}`;
    return photoUrl;

  }


  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }

}
