import { Component } from '@angular/core';
import {IonicModule, PopoverController} from "@ionic/angular";
import { CommonModule } from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

/**

  Componente del modal de anulación.
*/
@Component({
  selector: 'app-anulation',
  templateUrl: './anulation.component.html',
  styleUrls: ['./anulation.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule]
})
export class AnulationModalComponent {

  /**

   Crea una instancia del componente AnulationModalComponent.
   @param popoverController - Controlador del popover.
   */
  constructor(private popoverController: PopoverController) { }

  /**

   Cierra el modal.
   */
  public dismissModal(): void {
    this.popoverController.dismiss();
  }

  /**

   Confirma la cancelación de la cita.
   */
  public cancelAppointmentConfirmed(): void {
    this.popoverController.dismiss({ confirmed: true });
  }
}
