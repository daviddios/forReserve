import { Component, EnvironmentInjector, Inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
/*

Genera el menu de navegación principal
 */
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, TranslateModule],
})
export class TabsPage {
  public environmentInjector = Inject(EnvironmentInjector);

  constructor() {}
}
