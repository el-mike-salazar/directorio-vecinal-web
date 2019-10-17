import { Injectable } from '@angular/core';
// import { PrestadorServiciosModel } from '../models/prestadorServicios.model';
import { HttpClient } from 'selenium-webdriver/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  // seletcPrestador: PrestadorServiciosModel;
  searchText: string;
  url = `http://localhost:3000/api`;


  constructor(private http: HttpClient, private router: Router) {}

  getPrestadorServicios() {
    // return this.http.get(`${this.url}/verPrestadorServicios`).pipe( map( (resp: any) => resp));
  }

  deletePrestadorServicios( _id: string ) {
    // return this.http.delete(`${this.url}/eliminaPrestadorServivios/${_id}`);
  }

  getPrestadorServiciosId( _id: string ) {
    // return this.http.get(`${this.url}/verPrestadorServivios/${_id}`);
  }

  postPrestadorServicios(centroCrecer: FormData) {
    // console.log(centroCrecer);
    // return this.http.post(`${this.url}/registrarPrestadorServivios`, centroCrecer).toPromise();
  }

  putPrestadorServicios(_id: string, centroCrecer: FormData) {
    // console.log(centroCrecer);
    // return this.http.put(`${this.url}/editaPrestadorServivios/${_id}`, centroCrecer).toPromise();
  }

}
