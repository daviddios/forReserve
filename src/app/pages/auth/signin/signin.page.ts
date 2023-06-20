import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

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

  constructor(private router: Router) { }

  ngOnInit() { }

  gotoHomePage() {
    this.router.navigate(['/tabs/home']);
  }

  gotoForgetPasswordPage() {
    this.router.navigate(['/forget-password']);
  }

}

