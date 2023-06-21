import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Componente para la página de aterrizaje.
 */
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule],
})
export class LandingPage {

  constructor(public router: Router) { }

  /**
   * Navega a la página de inicio de sesión.
   */
  public gotoSignInPage(): void {
    this.router.navigate(['/signin']);
  }

  /**
   * Navega a la página de registro.
   */
  public gotoSignUpPage(): void {
    this.router.navigate(['/signup']);
  }

}
