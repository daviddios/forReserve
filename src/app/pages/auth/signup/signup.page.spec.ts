import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { SignupPage } from './signup.page';

describe('SignupPage', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;
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
          SignupPage
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SignupPage);
      component = fixture.componentInstance;
      fixture.detectChanges();

      router = TestBed.inject(Router);
    })
  );

  it('should create the SignupPage', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to HomePage', () => {
    spyOn(router, 'navigate');
    component.gotoHomePage();
    expect(router.navigate).toHaveBeenCalledWith(['/tabs/home']);
  });

  it('should navigate to SignInPage', () => {
    spyOn(router, 'navigate');
    component.goToSignInPage();
    expect(router.navigate).toHaveBeenCalledWith(['/signin']);
  });

  it('should navigate to LandingPage', () => {
    spyOn(router, 'navigate');
    component.goToLandingPage();
    expect(router.navigate).toHaveBeenCalledWith(['/landing']);
  });
});
