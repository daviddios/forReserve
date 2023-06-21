import {Component, Input} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

/*
  Componente cabecera superior
*/
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule, FormsModule, RouterLink]
})
export class ToolbarComponent{
  /**
   * Título de la cabecera.
   */
  @Input() title: string = '';

  /**
   * Indicador de si se debe mostrar el botón de retroceso.
   */
  @Input() showBackButton: boolean = false;

  /**
   * Idioma actual.
   */
  public lang: string = 'es';

  constructor(private _translateService: TranslateService) {}

  /**
   * Cambia el idioma.
   * @param event - Evento del selector de idioma.
   */
  public switchLanguage(event: any): void {
    this._translateService.use(event.target.value);
  }
}
