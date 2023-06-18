import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, ModalController, PopoverController, ToastController} from '@ionic/angular';
import { AnulationModalComponent } from "../../shared/Components/modals/anulation/anulation.component";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AnulationModalComponent]
})
export class AppointmentsPage {
  appointments: any[]; // Array para almacenar las citas

  constructor(
    private popoverController: PopoverController,
    private toastController: ToastController
  ) {
    this.appointments = this.generateAppointments(); // Generar citas al inicializar el componente
  }

  generateAppointments() {
    const appointments = [];

    // Generar citas ficticias
    for (let i = 0; i < 10; i++) {
      const appointment = {
        id: i + 1,
        siteName: `Sitio ${i + 1}`,
        serviceType: `Tipo de servicio ${i + 1}`,
        date: this.getRandomDate(),
        time: this.getRandomTime()
      };

      appointments.push(appointment);
    }

    return appointments;
  }

  getRandomDate() {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30); // Generar citas para los próximos 30 días

    const randomDate = new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    );

    return randomDate;
  }

  getRandomTime() {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  gotoAppointmentDetails(appointment: any) {
    // Lógica para navegar a la página de detalles de la cita
    console.log('Mostrando detalles de la cita:', appointment);
    // Aquí puedes redirigir a la página de detalles de la cita pasando el ID o los datos necesarios
  }

  changeAppointment(appointment: any) {
    // Lógica para cambiar la cita
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
      const index = this.appointments.findIndex((a) => a.id === item.id);
      if (index !== -1) {
        this.appointments.splice(index, 1);
      }
      this.presentToast('La cita ha sido anulada');
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
}
