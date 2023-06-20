import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from '../../shared/services/data.service';
import {of} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule, HomePage, TranslateModule.forRoot()],
      providers: [DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should fetch nearby popular services', () => {
    // Simular la respuesta de la solicitud HTTP
    const mockResponse = {
      html_attributions: [],
      result: {
        address_components: [
          {
            long_name: '19',
            short_name: '19',
            types: ['street_number']
          },
          {
            long_name: 'Rúa Irmáns Villar',
            short_name: 'Rúa Irmáns Villar',
            types: ['route']
          },
          {
            long_name: 'Ourense',
            short_name: 'Ourense',
            types: ['locality', 'political']
          },
          {
            long_name: 'Ourense',
            short_name: 'OR',
            types: ['administrative_area_level_2', 'political']
          },
          {
            long_name: 'Galicia',
            short_name: 'GA',
            types: ['administrative_area_level_1', 'political']
          },
          {
            long_name: 'España',
            short_name: 'ES',
            types: ['country', 'political']
          },
          {
            long_name: '32005',
            short_name: '32005',
            types: ['postal_code']
          }
        ],
        adr_address: 'Rúa Irmáns Villar, 19, 32005 Ourense, España',
        business_status: 'OPERATIONAL',
        editorial_summary: {
          language: 'en',
          overview: 'Unassuming rooms, a lounge & modern artwork in a down-to-earth hotel set in a stone building.'
        },
        formatted_address: 'Rúa Irmáns Villar, 19, 32005 Ourense, España',
        formatted_phone_number: '988 23 00 08',
        geometry: {
          location: {
            lat: 42.3375784,
            lng: -7.8641995
          },
          viewport: {
            northeast: {
              lat: 42.3388381802915,
              lng: -7.863317300000003
            },
            southwest: {
              lat: 42.3361402197085,
              lng: -7.866788499999998
            }
          }
        },
        icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
        icon_background_color: '#909CE1',
        icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet',
        international_phone_number: '+34 988 23 00 08',
        name: 'Hotel Zarampallo',
        photos: [
          {
            height: 2250,
            html_attributions: ['<a href="https://maps.google.com/maps/contrib/109117504668544040072">Rafael Boluda</a>'],
            photo_reference: 'AZose0mr0GRDOQy0ieGp78JURLQvHQzKOCl8S4p2kvOp_XJUdlK6GqT1NmuYcuSCEpBamEMu1bMKqnghfO_g-q6FXXpitlRTcEDVzdBe6E5AwODPHqLCMfuasQfcDh1FOeB-qJE_p5ZFX8f53pSlyfBTQoyxCoQ5u_Lyj0AeoX-vA6ZwX3HD',
            width: 4000
          },
          {
            height: 3024,
            html_attributions: ['<a href="https://maps.google.com/maps/contrib/105426842035362773837">Marcos</a>'],
            photo_reference: 'AZose0nN_DEmU86TXh2wcmN-h8d0odY3HAGMlQW1dOePX7R5omES4f1PBLTde1XjI8fHpFvBxFfGtN7e0BoglozPNFHTGHZPO_JpfAtXJU2xW5840KT2hucv_C_YatbPNpAOtpwaKBO1LCMbhORj6xeS9xxpUJJ3Aj52YLlU8Ocx5_mW9jhL',
            width: 4032
          }
          // ... Agregar más elementos de photos aquí ...
        ],
        place_id: 'ChIJi0QEA8n-Lw0Rur0BK7Akhrc',
        plus_code: {
          compound_code: '84QP+28 Ourense, España',
          global_code: '8CJJ84QP+28'
        },
        rating: 4.2,
        reference: 'ChIJi0QEA8n-Lw0Rur0BK7Akhrc',
        reviews: [
          {
            author_name: 'Maria Rodriguez',
            author_url: 'https://www.google.com/maps/contrib/107140607039230593436/reviews',
            language: 'es',
            original_language: 'es',
            profile_photo_url: 'https://lh3.googleusercontent.com/a-/AD_cMMRtYQWsPlkqIsrn6Fpmr_v6SdKgpruRHnPLfeFo7g=s128-c0x00000000-cc-rp-mo',
            rating: 5,
            relative_time_description: 'Hace 2 meses',
            text: 'Texto de ejemplo de reseña.',
            time: 1680944176,
            translated: false
          },
          {
            author_name: 'Vanesa Pena',
            author_url: 'https://www.google.com/maps/contrib/101997603665257113511/reviews',
            language: 'es',
            original_language: 'es',
            profile_photo_url: 'https://lh3.googleusercontent.com/a-/AD_cMMSTPClBGSj_zaGGNO3GTit-tDok_Gv_-Wf_vZbaNQ=s128-c0x00000000-cc-rp-mo-ba5',
            rating: 5,
            relative_time_description: 'Hace 3 meses',
            text: 'Texto de ejemplo de reseña.',
            time: 1678729240,
            translated: false
          },
        ],
        types: ['lodging', 'point_of_interest', 'establishment'],
        url: 'https://maps.google.com/?cid=13224297694874418618',
        user_ratings_total: 298,
        utc_offset: 120,
        vicinity: 'Rúa Irmáns Villar, 19, Ourense',
        website: 'http://www.zarampallo.com/'
      },
      status: 'OK'
    };

    // Llamar al método que realiza la solicitud
    const promise = component.getNearbyPopularServices();

    // Esperar la solicitud HTTP y proporcionar una respuesta simulada
    const req = httpMock.expectOne((request) => {
      const url = request.url.replace('http://localhost:4200', '');
      return url === '/maps/api/place/nearbysearch/json';
    });
    req.flush(mockResponse);

    // Verificar que la promesa se resuelva con la respuesta simulada
    return promise.then((response) => {
      expect(response).toEqual(jasmine.objectContaining(mockResponse));
    });

});
})
