import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServiceDetailsPage implements OnInit {
  placeId!: string | null;
  place: any; // Aquí puedes definir una interfaz o tipo adecuado para la respuesta de la API

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Obtener el ID del lugar de la URL
    this.placeId = this.route.snapshot.paramMap.get('place_id');

    // Realizar la solicitud a la API Place Details de Google
    this.http.get<HttpClient>(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&key=AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw`)
      .subscribe((response) => {
        this.place = response;
        console.log(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&key=AIzaSyDObktwCoCKAWnwnz9yvQnt92jtdPBYgLw`)
      });
  }


}
