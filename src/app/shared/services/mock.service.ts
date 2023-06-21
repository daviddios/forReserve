import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Location} from "../interfaces/location.interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockService {
  constructor(private http: HttpClient) {}

}
