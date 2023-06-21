import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {hiddenChips, hiddenServices} from "../../constants/hiddens";
/**
 * Componente para la tarjeta flexible.
 */
@Component({
  selector: 'app-flex-card',
  templateUrl: './flex-card.component.html',
  styleUrls: ['./flex-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule]
})
export class FlexCardComponent {
  /**
   * Objeto de datos para cada tarjeta.
   */
  @Input() item: any;
  /*
   * Constructor
   */
  constructor(private _router: Router) { }
  /**
   * Navega a la página de detalles del servicio.
   * @param place_id - ID del lugar/servicio.
   */
  public goToServicePage(place_id: string): void {
    this._router.navigate(['/tabs/service-details', place_id]);
  }
  /**
   * Obtiene la URL de la foto del lugar.
   * @param photo_reference - Referencia de la foto.
   * @returns La URL de la foto.
   */
  public getPhotoUrl(photo_reference: string | undefined): string {
    const apiKey: string = 'AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw'
    const maxWidth: number = 800; // Tamaño máximo deseado para la imagen
    const photoUrl: string = `/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photo_reference}&key=${apiKey}`;
    return photoUrl;
  }
  /**
   * Comprueba si debe mostrar un chip.
   * @param chip - Nombre del chip.
   * @returns Retorna true si debe mostrar el chip, false en caso contrario.
   */
  public shouldShowChip(chip: string): boolean {
    return !hiddenChips.includes(chip);
  }
  /**
   * Comprueba si hay chips ocultos para los tipos de servicios.
   * @param types - Tipos de servicios.
   * @returns Retorna true si hay algún tipo de servicio oculto, false en caso contrario.
   */
  public checkHiddenChips(types: string[]): boolean {
    return types.some((type) => hiddenServices.includes(type));
  }
}
