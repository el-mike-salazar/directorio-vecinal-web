import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NegocioModel } from '../models/negocio.model';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  selectNegocio: NegocioModel;
  searchText: string;
  url = `http://localhost:3000/api/negocio/`;

  constructor( private http: HttpClient ) {}

  getNegocio() {
    return this.http.get(`${this.url}obtener`).pipe( map( (resp: any) => resp)).toPromise();
  }

  deleteNegocio( _id: string ) {
    return this.http.delete(`${this.url}eliminar/${_id}`).toPromise();
  }

  getNegocioId( _id: string ) {
    return this.http.get(`${this.url}obtener/${_id}`).toPromise();
  }

  postNegocio(_idPersona: string ,fd: FormData) {
    return this.http.post(`${this.url}registrar/${_idPersona}`, fd).toPromise();
  }

  putNegocio(_id: string, fd: FormData) {
    return this.http.put(`${this.url}actualizar/${_id}`, fd).toPromise();
  }

}
