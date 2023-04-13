import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }

  sendSymptoms(val:any):Observable<any[]> {
    return this.http.post<any[]>("http://127.0.0.1:8000/"+"/herbs/",val);
  }
}


