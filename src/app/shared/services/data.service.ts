import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
export interface Appointment{
  time: string,
  date: Date;
  name: string | undefined;
}
export interface Appointments{
  appointments: Appointment[]
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  public appointments = new BehaviorSubject<Appointments>({appointments: []})
  constructor() { }

  public setData(selectedTime: string, selectDate: Date | null, name: string | undefined) {
    if (selectDate){

    const appointment: Appointment = {
      time: selectedTime,
      date: selectDate,
      name: name
    };
    const currentData: Appointments = this.appointments.getValue()
      currentData.appointments.push(appointment)
    this.appointments.next(currentData);
  }
    }
  public getData(): Observable<Appointments>{
    return this.appointments.asObservable()
  }

}
