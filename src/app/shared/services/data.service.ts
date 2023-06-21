import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Interfaz para una cita.
 */
export interface Appointment {
  time: string;
  date: Date;
  name: string | undefined;
}

/**
 * Interfaz para las citas.
 */
export interface Appointments {
  appointments: Appointment[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public appointments = new BehaviorSubject<Appointments>({ appointments: [] });

  constructor() {}

  /**
   * Establece los datos de una cita.
   * @param selectedTime La hora seleccionada.
   * @param selectDate La fecha seleccionada.
   * @param name El nombre (opcional).
   */
  public setData(selectedTime: string, selectDate: Date | null, name: string | undefined) {
    if (selectDate) {
      const appointment: Appointment = {
        time: selectedTime,
        date: selectDate,
        name: name,
      };
      const currentData: Appointments = this.appointments.getValue();
      currentData.appointments.push(appointment);
      this.appointments.next(currentData);
    }
  }

  /**
   * Obtiene los datos de las citas como un observable.
   * @returns Un observable de los datos de las citas.
   */
  public getData(): Observable<Appointments> {
    return this.appointments.asObservable();
  }
}
