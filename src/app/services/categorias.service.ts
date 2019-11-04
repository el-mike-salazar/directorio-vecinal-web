import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  url =  'http://localhost:3000/api/categoria';

  searchText: string;

  constructor( private http: HttpClient) { }

  obtenerCategorias() {
    return this.http.get(`${ this.url }/obtener`).pipe( map( (data: any) => data)).toPromise();
  }

  // tslint:disable-next-line: variable-name
  obtenerCategoria(_id: string) {
    return this.http.get(`${ this.url }/obtener/${_id}`).toPromise();
  }

  registrarCategoria(categoria: any) {
    return this.http.post(`${ this.url }/registrar`, categoria).toPromise();
  }

  modificarCategoria(id: string, categoria: FormData) {
    return this.http.put(`${ this.url }/actualizar/${id}`, categoria).toPromise();
  }

  // tslint:disable-next-line: variable-name
  eliminarCategoria(_id: string) {
    return this.http.delete(`${ this.url }/eliminar/${_id}`).toPromise();
  }
}
