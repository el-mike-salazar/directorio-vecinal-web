import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CCrecerModel } from '../models/cCrecer.model';

@Injectable({
  providedIn: 'root'
})
export class CentrosCrecerService {

  selectCCrecer: CCrecerModel;
  searchText:string;
  url = `http://localhost:3000/api`;


  constructor(private http: HttpClient, private router: Router) {}

  getCentrosCrecer() {
    return this.http.get(`${this.url}/verCentrosCrecer`).pipe( map( (resp: any) => resp));
  }

  deleteCentroCrecer( _id: string ) {
    return this.http.delete(`${this.url}/eliminaCentroCrecer/${_id}`);
  }

  getCentroCrecerId( _id: string ) {
    return this.http.get(`${this.url}/verCentroCrecer/${_id}`);
  }

  postCentroCrecer(centroCrecer: FormData) {
    // console.log(centroCrecer);
    return this.http.post(`${this.url}/registrarCentroCrecer`, centroCrecer).toPromise();
  }

  putCentroCrecer(_id: string, centroCrecer: FormData) {
    // console.log(centroCrecer);
    return this.http.put(`${this.url}/editaCentroCrecer/${_id}`, centroCrecer).toPromise();
  }

}
