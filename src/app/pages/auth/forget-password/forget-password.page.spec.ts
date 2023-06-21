import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { ForgetPasswordPage } from './forget-password.page';

describe('ForgetPasswordPage', () => {
  let component: ForgetPasswordPage;
  let fixture: ComponentFixture<ForgetPasswordPage>;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [],
        imports: [
          IonicModule.forRoot(),
          CommonModule,
          FormsModule,
          TranslateModule.forRoot(),
          RouterTestingModule,
          ForgetPasswordPage
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ForgetPasswordPage);
      component = fixture.componentInstance;
      fixture.detectChanges();

      router = TestBed.inject(Router);
    })
  );

  it('should create the ForgetPasswordPage', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to LandingPage', () => {
    spyOn(router, 'navigate');
    component.goToLandingPage();
    expect(router.navigate).toHaveBeenCalledWith(['/signin']);
  });

  it('should navigate to SignUpPage', () => {
    spyOn(router, 'navigate');
    component.gotoSignUpPage();
    expect(router.navigate).toHaveBeenCalledWith(['/signup']);
  });

  it('should reset password', () => {
    spyOn(console, 'log');
    component.resetPassword();
    expect(console.log).toHaveBeenCalledWith('Reseting Password empty method');
  });
});
