import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from "@ngx-translate/core";
import { Router } from "@angular/router";

/**
 * Componente para la página de registro.
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class SignupPage {

  constructor(private _router: Router) { }

  /**
   * Navega a la página de inicio.
   */
  gotoHomePage() {
    this._router.navigate(['/tabs/home']);
  }

  /**
   * Navega a la página de inicio de sesión.
   */
  goToSignInPage() {
    this._router.navigate(['/signin']);
  }

  /**
   * Navega a la página de aterrizaje.
   */
  goToLandingPage() {
    this._router.navigate(['/landing']);
  }
}
