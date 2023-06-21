import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '../../shared/interfaces/location.interface';
import { TranslateModule } from '@ngx-translate/core';
import {ToolbarComponent} from "../../shared/Components/toolbar/toolbar.component";

/**
 * Componente para la página de perfil.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule, ToolbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage {
  public locations: Location[] = [
    { id: '1', name: 'Vilagarcía de Arousa' },
    { id: '2', name: 'Pontevedra' },
    { id: '3', name: 'Ourense' }
  ];

  constructor(
    private router: Router
  ) { }

  /**
   * Cierra la sesión del usuario y navega a la página de aterrizaje.
   */
  public logout(): void {
    this.router.navigate(['/landing']);
  }
}
