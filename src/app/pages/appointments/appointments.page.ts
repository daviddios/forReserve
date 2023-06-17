import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AppointmentsPage implements OnInit {


  hotels: any = [];

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.getHotelList();
  }

  getHotelList() {
    this.hotels = this.dataService.getPopularServices();
    console.log(this.hotels)
  }

  gotoHotelDetails() {
    this.router.navigate(['/hotel-details']);
  }

}
