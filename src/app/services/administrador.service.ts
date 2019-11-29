import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CCrecerModel } from '../models/CentroCrecer.model';


@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  searchText: string;
  selectAdmin: UsuarioModel;
  url = `http://localhost:3000/api`;



  constructor( private http: HttpClient, private router: Router  ) { }


// Obtiene todos los usuarios
  getAdmin() {
    return this.http.get(`${this.url}/persona/obtener`).pipe( map( (resp: any) => resp));
  }

  // Obtiene todos los usuarios por id
   // tslint:disable-next-line: variable-name
   getAdminId( _id: string ) {
    return this.http.get(`${this.url}/persona/obtener/:id${_id}`);
  }

  // Agrega Usuario
  postAdmin(persona: FormData) {
    console.log(persona);

    return this.http.post(`${this.url}/persona/registrar`, persona).toPromise();
  }

  // Actualiza Usuario
  // tslint:disable-next-line: variable-name
  putAdmin(_id: string, persona: FormData) {

    return this.http.put(`${this.url}/persona/actualizar/ ${_id}`, persona).toPromise();
  }

  // Elimina Usuario
  // tslint:disable-next-line: variable-name
  deleteAdmin( _id: string ) {
    return this.http.delete(`${this.url}/persona/eliminar/${_id}`);
  }

  putArrAdmin(id: string, idPersona: string) {
    return this.http.put(`${this.url}/centro-crecer/actualizar/${id}/${idPersona}`).toPromise();
  }




}
