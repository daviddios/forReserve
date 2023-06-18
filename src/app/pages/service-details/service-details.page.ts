
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlaceDetails } from '../../shared/interfaces/place-details.interface';
import { hiddenChips, hiddenServices } from '../../shared/constants/hiddens';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CallNumber } from "@awesome-cordova-plugins/call-number/ngx";


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
  public dateAndHoursList: {date: Date, open: string, close: string}[] = [];
  public selectedDate: Date | null = null;
  public timeOptions: string[] = [];
  public dayValues: string = ''
  public selectedTime: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private callNumber: CallNumber) { }

  ngOnInit(): void {
    // Obtener el ID del lugar de la URL
    this.placeId = this.route.snapshot.paramMap.get('place_id');

    // Realizar la solicitud a la API Place Details de Google
    this.http.get<PlaceDetails>(`/maps/api/place/details/json?place_id=${this.placeId}&key=AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw`)
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
  public shouldShowChip(chip: string): boolean {
    return !hiddenChips.includes(chip);
  }
  selectTime(time: string) {
    this.selectedTime = time;
  }
  createDayValues(dateAndHoursList: {date: Date, open: string, close: string}[]): string {
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


  getTimeOptions(openTime: string, closeTime: string): string[] {
    const open = parseInt(openTime.split(':')[0]);
    const close = parseInt(closeTime.split(':')[0]);
    const options: string[] = [];
    for(let i=open; i<=close; i++) {
      options.push(('0' + i).slice(-2) + ':00');
      options.push(('0' + i).slice(-2) + ':30');
    }
    return options;
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
  getPhotoUrl(photo_reference: string | undefined) {
    const apiKey: string = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw'
    const maxWidth: number = 800;
    const photoUrl: string = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photo_reference}&key=${apiKey}`;
    return photoUrl;

  }


  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }

  callPlace(formatted_phone_number: string | undefined) {
    if(formatted_phone_number !== undefined){
      this.callNumber.callNumber(formatted_phone_number, true)
        .then( res => console.log('Calling', res))
        .catch( () => console.log('Call error'))
    }
  }

  public redirectURLImage(profile_photo_url: string): string {
    if (profile_photo_url !== null){
      return profile_photo_url.replace('https://lh3.googleusercontent.com', '/googleImages');
    }
    return '/';
  }
}
