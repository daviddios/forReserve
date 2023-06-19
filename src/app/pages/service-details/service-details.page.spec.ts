import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CallNumber } from "@awesome-cordova-plugins/call-number/ngx";
import { IonicModule } from '@ionic/angular';

import { ServiceDetailsPage } from './service-details.page';
import { DataService } from '../../shared/services/data.service';

describe('ServiceDetailsPage', () => {
  let component: ServiceDetailsPage;
  let fixture: ComponentFixture<ServiceDetailsPage>;
  let httpMock: HttpTestingController;
  let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceDetailsPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [CallNumber, DataService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailsPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    dataService = TestBed.inject(DataService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch place details and process opening hours', () => {
    const placeId = 'sample-place-id';
    const placeDetailsMock = {
      result: {
        current_opening_hours: {
          periods: [
            {
              open: { date: '2023-06-20T08:00:00', time: '0800' },
              close: { date: '2023-06-20T18:00:00', time: '1800' },
            },
            {
              open: { date: '2023-06-21T09:00:00', time: '0900' },
              close: { date: '2023-06-21T17:00:00', time: '1700' },
            },
          ],
        },
      },
    };

    fixture.detectChanges();

    const req = httpMock.expectOne(`/maps/api/place/details/json?place_id=${placeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(placeDetailsMock);

    expect(component.isLoading).toBe(false);
    expect(component.dateAndHoursList.length).toBe(2);
    expect(component.dayValues).toBe('20,21');
  });


  it('should create day values from date and hours list', () => {
    const dateAndHoursList = [
      { date: new Date('2023-06-20'), open: '0800', close: '1800' },
      { date: new Date('2023-06-21'), open: '0900', close: '1700' },
    ];

    const dayValues = component.createDayValues(dateAndHoursList);
    expect(dayValues).toBe('20,21');
  });

  it('should set time options based on selected date', () => {
    const matchingDateAndHours = { date: new Date('2023-06-20'), open: '0800', close: '1800' };
    component.dateAndHoursList = [matchingDateAndHours];

    component.onDateChange({ detail: { value: '2023-06-20' } });

    expect(component.timeOptions.length).toBeGreaterThan(0);
  });

  it('should get time options between open and close time', () => {
    const openTime = '0800';
    const closeTime = '1800';
    const expectedOptions = ['08:00', '08:30', '09:00', '09:30', '10:00'];

    const timeOptions = component.getTimeOptions(openTime, closeTime);

    expect(timeOptions).toEqual(expectedOptions);
  });

  it('should get dates between start and end date', () => {
    const startDate = new Date('2023-06-20');
    const endDate = new Date('2023-06-22');
    const expectedDates = [
      new Date('2023-06-20T00:00:00'),
      new Date('2023-06-21T00:00:00'),
      new Date('2023-06-22T00:00:00'),
    ];

    const dates = component.getDatesBetween(startDate, endDate);

    expect(dates).toEqual(expectedDates);
  });

  it('should toggle like status', () => {
    component.isLiked = false;

    component.toggleLike();

    expect(component.isLiked).toBe(true);

    component.toggleLike();

    expect(component.isLiked).toBe(false);
  });

  it('should call place number', () => {
    const formattedPhoneNumber = '123456789';

    spyOn(component.callNumber, 'callNumber').and.stub();

    component.callPlace(formattedPhoneNumber);

    expect(component.callNumber.callNumber).toHaveBeenCalledWith(formattedPhoneNumber, true);
  });

  it('should redirect image URL', () => {
    const profilePhotoUrl = 'https://lh3.googleusercontent.com/abc123';
    const expectedRedirectedUrl = '/googleImages/abc123';

    const redirectedUrl = component.redirectURLImage(profilePhotoUrl);

    expect(redirectedUrl).toBe(expectedRedirectedUrl);
  });

  it('should save selected date and time to data service', () => {
    const selectedDate = new Date('2023-06-20');
    const selectedTime = '10:00';

    spyOn(dataService, 'setData').and.callThrough();

    component.selectedDate = selectedDate;
    component.selectedTime = selectedTime;

    component.onSubmit();

    expect(dataService.setData).toHaveBeenCalledWith(selectedTime, selectedDate, component.place?.result.name);
  });
});
