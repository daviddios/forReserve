import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  gotoHomePage() {
    this.router.navigate(['/tabs/home']);
  }

  gotoSignInPage() {
    this.router.navigate(['/signin']);
  }

  gotoSignUpPage() {
    this.router.navigate(['/signup']);
  }

}
