import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {

  }

  logout() {
    this.router.navigate(['/landing']);
  }

  gotoSettingsPage() {
    this.router.navigate(['/settings']);
  }

  gotoEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

}
