import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from "@ngx-translate/core";
import { Router } from "@angular/router";

/**
 * Componente para la página de recuperación de contraseña.
 */
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class ForgetPasswordPage {

  constructor(private _router: Router) { }

  /**
   * Navega a la página de inicio de sesión.
   */
  public goToLandingPage(): void {
    this._router.navigate(['/signin']);
  }

  /**
   * Navega a la página de registro.
   */
  public gotoSignUpPage(): void {
    this._router.navigate(['/signup']);
  }

  /**
   * Método para restablecer la contraseña.
   */
  public resetPassword(): void {
    console.log('Reseting Password empty method');
  }

}
