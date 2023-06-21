import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, PopoverController, ToastController } from '@ionic/angular';
import { AnulationModalComponent } from "../../shared/Components/modals/anulation/anulation.component";
import { Appointment, DataService } from "../../shared/services/data.service";
import { Subscription } from "rxjs";
import { TranslateModule } from "@ngx-translate/core";
import {ToolbarComponent} from "../../shared/Components/toolbar/toolbar.component";

/**
 * Componente para la página de citas.
 */
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AnulationModalComponent, TranslateModule, ToolbarComponent]
})
export class AppointmentsPage implements OnInit, OnDestroy {
  /** Array de citas del usuario. */
  public userAppointments: Appointment[] = [];
  /** Suscripción a los datos del servicio. */
  public dataSubscription: Subscription | undefined;

  constructor(
    public popoverController: PopoverController,
    public toastController: ToastController,
    private _dataService: DataService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.dataSubscription = this._dataService.getData().subscribe((data) => {
      this.userAppointments = data.appointments;
    });
  }

  /**
   * Método para cambiar una cita.
   * @param appointment La cita a cambiar.
   */
  public changeAppointment(appointment: Appointment): void {
    console.log('Cambiando cita:', appointment);
  }

  /**
   * Método para cancelar una cita.
   * @param item La cita a cancelar.
   */
  public async cancelAppointment(item: any): Promise<void> {
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

  /**
   * Método para mostrar un toast.
   * @param message El mensaje del toast.
   */
  public async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
