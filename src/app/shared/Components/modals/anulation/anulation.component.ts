import { Component, OnInit } from '@angular/core';
import {IonicModule, PopoverController} from "@ionic/angular";
import { CommonModule } from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({

  selector: 'app-anulation',
  templateUrl: './anulation.component.html',
  styleUrls: ['./anulation.component.scss'],
  standalone: true,
  imports: [
    IonicModule, CommonModule, TranslateModule
  ]
})
export class AnulationModalComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() { }

  dismissModal() {
    this.popoverController.dismiss().then();
  }

  cancelAppointmentConfirmed() {
    // Lógica para anular la cita
    this.popoverController.dismiss({ confirmed: true }).then();
  }
}
