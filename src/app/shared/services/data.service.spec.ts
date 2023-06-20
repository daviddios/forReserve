import { TestBed } from '@angular/core/testing';
import { DataService, Appointment, Appointments } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set data', () => {
    const selectedTime = '10:30';
    const selectedDate = new Date('2023-06-20');
    const name = 'John Doe';

    service.setData(selectedTime, selectedDate, name);

    service.getData().subscribe((appointments: Appointments) => {
      const appointment: Appointment = appointments.appointments[0];
      expect(appointment.time).toEqual(selectedTime);
      expect(appointment.date).toEqual(selectedDate);
      expect(appointment.name).toEqual(name);
    });
  });
});
