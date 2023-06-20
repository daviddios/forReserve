import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { LandingPage } from './landing.page';

describe('LandingPage', () => {
  let component: LandingPage;
  let fixture: ComponentFixture<LandingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        LandingPage
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    component.gotoHomePage();
    expect(routerSpy).toHaveBeenCalledWith(['/tabs/home']);
  });

  it('should navigate to signin page', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    component.gotoSignInPage();
    expect(routerSpy).toHaveBeenCalledWith(['/signin']);
  });

});
