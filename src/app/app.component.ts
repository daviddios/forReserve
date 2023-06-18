import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { Router, RouterLink } from '@angular/router';
import { SplashScreenWeb } from '@capacitor/splash-screen/dist/esm/web';
import { StatusBarPlugin } from '@capacitor/status-bar';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from "@angular/common/http";

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, HttpClientModule],
})
export class AppComponent {
  menus: any = [
    {
      title: 'Inicio',
      url: '/inicio',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person'
    },
    {
      title: 'Ajustes',
      url: '/ajustes',
      icon: 'settings'
    }];
  selectedMenu: any;

  constructor(private router: Router) {
    this.initializeApp();
  }

  initializeApp() {}
  signout() {
    this.router.navigate(['/signin']);
  }
}
