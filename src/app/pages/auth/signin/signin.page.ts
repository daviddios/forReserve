import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

/**
 * Componente para la página de inicio de sesión.
 */
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
  ]
})
export class SigninComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() { }

  /**
   * Navega a la página de inicio.
   */
  gotoHomePage() {
    this._router.navigate(['/tabs/home']);
  }

  /**
   * Navega a la página de olvidar contraseña.
   */
  gotoForgetPasswordPage() {
    this._router.navigate(['/forget-password']);
  }

  /**
   * Navega a la página de registro.
   */
  public goToSignUpPage() {
    this._router.navigate(['/signup']);
  }

  /**
   * Navega a la página de aterrizaje.
   */
  goToLandingPage() {
    this._router.navigate(['/landing']);
  }
}
