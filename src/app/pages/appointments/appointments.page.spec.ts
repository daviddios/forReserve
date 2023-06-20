import { of } from 'rxjs';
import { PopoverController, ToastController } from '@ionic/angular';
import { AppointmentsPage } from './appointments.page';
import { DataService, Appointment, Appointments } from '../../shared/services/data.service';
import {AnulationModalComponent} from "../../shared/Components/modals/anulation/anulation.component";
import {ComponentFixture} from "@angular/core/testing";

let component: AppointmentsPage;
let fixture: ComponentFixture<AppointmentsPage>;
describe('AppointmentsPage', () => {
  let component: AppointmentsPage;
  let mockPopoverController: any;
  let mockToastController: any;
  let mockDataService: any;
  let mockModal: any;

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj('DataService', ['getData']);
    mockPopoverController = jasmine.createSpyObj('PopoverController', ['create']);
    mockToastController = jasmine.createSpyObj('ToastController', ['create']);
    mockModal = jasmine.createSpyObj('Modal', ['present', 'onDidDismiss']);

    component = new AppointmentsPage(
      mockPopoverController,
      mockToastController,
      mockDataService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user appointments on init', () => {
    const mockAppointments = [
      { name: 'appointment1', date: new Date(), time: '10:00' },
      { name: 'appointment2', date: new Date(), time: '11:00' }
    ];
    mockDataService.getData.and.returnValue(of({ appointments: mockAppointments }));

    component.ngOnInit();

    expect(component.userAppointments).toEqual(mockAppointments);
  });

  it('should cancel appointment', async () => {
    const appointment: Appointment = { time: '10:00', date: new Date(), name: 'John Doe' };
    component.userAppointments = [appointment];

    const popover = await component.popoverController.create({
      component: AnulationModalComponent,
      componentProps: { appointment: appointment },
      cssClass: 'popover'
    });

    spyOn(popover, 'onDidDismiss').and.returnValue(Promise.resolve({
      data: { confirmed: true },
    }));

    spyOn(component.popoverController, 'create').and.returnValue(Promise.resolve(popover));

    spyOn(component.toastController, 'create').and.returnValue(Promise.resolve({
      present: () => {},
    } as any));

    await component.cancelAppointment(appointment);

    fixture.whenStable().then(() => {
      expect(component.userAppointments.length).toBe(0);
      expect(component.toastController.create).toHaveBeenCalledWith({
        message: 'La cita ha sido anulada',
        duration: 2000,
        position: 'bottom',
      });
    });
  });


  it('should present toast after appointment cancellation', async () => {
    const mockAppointment = { name: 'appointment1', date: new Date(), time: '10:00' };
    mockModal.onDidDismiss.and.returnValue(Promise.resolve({ data: { confirmed: true } }));
    mockPopoverController.create.and.returnValue({
      present: () => Promise.resolve(),
      onDidDismiss: () => Promise.resolve({ data: { confirmed: true } }),
    });    mockToastController.create.and.returnValue(Promise.resolve(mockModal));

    await component.cancelAppointment(mockAppointment);

    expect(mockPopoverController.create).toHaveBeenCalledWith({
      component: AnulationModalComponent,
      componentProps: { appointment: mockAppointment },
      cssClass: 'popover'
    });
    expect(mockModal.present).toHaveBeenCalled();
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: 'La cita ha sido anulada',
      duration: 2000,
      position: 'bottom'
    });
    expect(mockModal.present).toHaveBeenCalled();
  });
});
