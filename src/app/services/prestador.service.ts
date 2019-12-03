import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  seletcPrestador: UsuarioModel;
  searchText: string;
  url = `http://localhost:3000/api`;


  constructor(private http: HttpClient ) {}

  getPrestadorServicios() {
    return this.http.get(`${this.url}/persona/obtener`).pipe( map( (resp: any) => resp)).toPromise();
  }

  deletePrestadorServicios( _id: string ) {
    return this.http.delete(`${this.url}/persona/eliminar/${_id}`).toPromise();
  }

  getPrestadorServiciosId( _id: string ) {
    return this.http.get(`${this.url}/persona/obtener/${_id}`).toPromise();
  }

  postPrestadorServicios( prestadorServicios: FormData) {
    return this.http.post(`${this.url}/persona/registrar`, prestadorServicios).toPromise();
  }

  putPrestadorServicios(_id: string, prestadorServicios: FormData) {
    return this.http.put(`${this.url}/persona/actualizar/${_id}`, prestadorServicios).toPromise();
  }
}
