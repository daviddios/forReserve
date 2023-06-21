import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FlexCardComponent } from './flex-card.component';

describe('FlexCardComponent', () => {
  let component: FlexCardComponent;
  let fixture: ComponentFixture<FlexCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FlexCardComponent, IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to service details page', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');

    const placeId = '12345';
    component.goToServicePage(placeId);

    expect(routerSpy).toHaveBeenCalledWith(['/tabs/service-details', placeId]);
  });

  it('should return the photo URL', () => {
    const photoReference = 'AZose0kHC9hdw7T3usfU0DI2165HaBfIsBPqce-z8t1ZDVL9ILUBKlj5j7_qBGynn6q-N_8MJl8NsGmvPImN_k02wAm2xtqu3UOWgjtg8T3nguiAGyZufCACs1khRJqYcdxYhwJuVBntzKbllvTJNSY4kRnq2lde7w-hE-jdD8uCcvdAjhw0';
    const maxWidth: number = 800;
    const expectedUrl = `/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw`;

    const url = component.getPhotoUrl(photoReference);

    expect(url).toEqual(expectedUrl);
  });

  it('should show chip', () => {
    const chip = 'restaurant';
    const shouldShow = component.shouldShowChip(chip);

    expect(shouldShow).toBeTruthy();
  });

  it('should check hidden chips', () => {
    const types = ['restaurant', 'park', 'museum'];

    const hasHiddenChips = component.checkHiddenChips(types);

    expect(hasHiddenChips).toBeFalsy();
  });
});
