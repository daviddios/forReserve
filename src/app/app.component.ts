import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

register();
/**
 * El componente raíz de la aplicación.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, HttpClientModule],
})
export class AppComponent {

  constructor(private router: Router, private _translate: TranslateService) {
    this.initTranslateService();
  }

  /**
   * Inicializa el servicio de traducción con el idioma predeterminado y los idiomas disponibles.
   */
  private initTranslateService(): void {
    this._translate.setDefaultLang('es');
    this._translate.addLangs(['es', 'en']);
  }
}
