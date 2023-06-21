import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CallNumber } from "@awesome-cordova-plugins/call-number/ngx";
import { IonicModule } from '@ionic/angular';

import { ServiceDetailsPage } from './service-details.page';
import { DataService } from '../../shared/services/data.service';
import { RouterTestingModule } from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";


describe('ServiceDetailsPage', () => {
  let component: ServiceDetailsPage;
  let fixture: ComponentFixture<ServiceDetailsPage>;
  let httpMock: HttpTestingController;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, ServiceDetailsPage, TranslateModule.forRoot()],
      providers: [CallNumber, DataService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [],
    }).compileComponents();
  });

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
    const openTime = '0000';
    const closeTime = '2359';
    const expectedOptions = [];

    const startTime = parseInt(openTime.slice(0, 2)) * 60 + parseInt(openTime.slice(2));
    const endTime = parseInt(closeTime.slice(0, 2)) * 60 + parseInt(closeTime.slice(2));

    for (let i = startTime; i <= endTime; i += 30) {
      if (i >= 24 * 60) {
        break; // Salir del bucle si se superan las 24 horas
      }
      const hours = Math.floor(i / 60).toString().padStart(2, '0');
      const minutes = (i % 60).toString().padStart(2, '0');
      expectedOptions.push(`${hours}:${minutes}`);
    }

    const timeOptions = component.getTimeOptions(openTime, closeTime);

    expect(timeOptions).toEqual(expectedOptions);
  });

  it('should get dates between start and end date', () => {
    const startDate = new Date('2023-06-20');
    const endDate = new Date('2023-06-22');
    const expectedDates = [
      new Date('2023-06-20'),
      new Date('2023-06-21'),
      new Date('2023-06-22'),
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

    spyOn(console, 'log');
    component.callPlace(formattedPhoneNumber);

    expect(console.log).toHaveBeenCalledWith('calling place: ', formattedPhoneNumber);
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

    spyOn(dataService, 'setData').and.stub();

    component.selectedDate = selectedDate;
    component.selectedTime = selectedTime;

    component.onSubmit();

    expect(dataService.setData).toHaveBeenCalledWith(selectedTime, selectedDate, component.place?.result.name);
  });
});
