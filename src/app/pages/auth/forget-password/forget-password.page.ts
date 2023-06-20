import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class ForgetPasswordPage implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  public goToLandingPage() {
    this._router.navigate(['/signin'])
  }

  public gotoSignUpPage() {
    this._router.navigate(['/signup'])
  }

  public resetPassword() {
    console.log('Reseting Password empty method')
  }

}
