import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, ModalController, PopoverController, ToastController} from '@ionic/angular';
import { AnulationModalComponent } from "../../shared/Components/modals/anulation/anulation.component";
import {Appointment, Appointments, DataService} from "../../shared/services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AnulationModalComponent]
})
export class AppointmentsPage implements OnInit, OnDestroy{
  public userAppointments: Appointment[] = [];
  public dataSubscription: Subscription | undefined

  constructor(
    public popoverController: PopoverController,
    public toastController: ToastController,
    private _dataService: DataService
  ) {

  }

  ngOnInit(): void {
    this.dataSubscription = this._dataService.getData().subscribe((data)=> {
      this.userAppointments = data.appointments
    })
  }

  changeAppointment(appointment: any) {
    console.log('Cambiando cita:', appointment);
  }


  async cancelAppointment(item: any) {
    const popover = await this.popoverController.create({
      component: AnulationModalComponent,
      componentProps: { appointment: item },
      cssClass: 'popover'
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (data && data.confirmed) {
      const index = this.userAppointments.findIndex((a) => a.name === item.name);
      if (index !== -1) {
        this.userAppointments.splice(index, 1);
        this.presentToast('La cita ha sido anulada');
      }
    }
    console.log('Cancelando cita:', item);
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
