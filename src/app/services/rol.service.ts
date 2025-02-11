import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RolModel } from '../models/Rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url =  'http://localhost:3000/api/rol';

  searchText: string;

  constructor( private http: HttpClient) { }

  obtenerRoles() {
    return this.http.get(`${ this.url }/obtener`).pipe( map( (data: any) => data)).toPromise();
  }

  // tslint:disable-next-line: variable-name
  obtenerRol(_id: number) {
    return this.http.get(`${ this.url }/obtener/${_id}`).toPromise();
  }

  registrarRol(rol: RolModel) {
    return this.http.post(`${ this.url }/registrar`, rol).toPromise();
  }

  modificarRol(id: string, rol: RolModel) {
    return this.http.put(`${ this.url }/actualizar/${id}`, rol).toPromise();
  }

  modificarArrApi(id: string, rol: RolModel) {
    return this.http.put(`${ this.url }/actualizarArrApi/${id}`, rol).toPromise();
  }

  // tslint:disable-next-line: variable-name
  eliminarRol(_id: string, ) {
    return this.http.delete(`${ this.url }/eliminar/${_id}`).toPromise();
  }
}
