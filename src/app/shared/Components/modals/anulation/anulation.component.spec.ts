import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { AnulationModalComponent } from './anulation.component';

describe('AnulationComponent', () => {
  let component: AnulationModalComponent;
  let fixture: ComponentFixture<AnulationModalComponent>;
  let popoverController: PopoverController;
  let popoverSpy: jasmine.SpyObj<PopoverController>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [],
      imports: [IonicModule.forRoot(), AnulationModalComponent],
      providers: [{ provide: PopoverController, useValue: popoverSpy }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnulationModalComponent);
    component = fixture.componentInstance;
    popoverController = TestBed.inject(PopoverController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss modal on dismissModal call', () => {
    const dismissSpy = spyOn(popoverController, 'dismiss');
    component.dismissModal();
    expect(dismissSpy).toHaveBeenCalled();
  });

});
