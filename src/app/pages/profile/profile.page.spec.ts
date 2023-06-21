import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import {TranslateModule} from "@ngx-translate/core";

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePage, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
