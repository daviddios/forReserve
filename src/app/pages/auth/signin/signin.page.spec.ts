import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { SigninComponent } from './signin.page';
import {importProvidersFrom} from "@angular/core";

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, IonicModule, TranslateModule.forRoot(), SigninComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');
    component.gotoHomePage();
    expect(routerSpy).toHaveBeenCalledWith(['/tabs/home']);
  });


  it('should navigate to forget password page', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');
    component.gotoForgetPasswordPage();
    expect(routerSpy).toHaveBeenCalledWith(['/forget-password']);
  });
});
