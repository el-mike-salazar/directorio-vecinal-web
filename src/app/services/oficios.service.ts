import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class OficiosService {
  url =  'http://localhost:3000/api/oficio';

  searchText: string;

  constructor( private http: HttpClient) { }

  obtenerOficios( idCat: string ) {
    return this.http.get(`${ this.url }/obtener/${idCat}`).pipe( map( (data: any) => data)).toPromise();
  }

  obtenerOficio( idCat: string, idOficio: string ) {
    return this.http.get(`${ this.url }/obtener/${idCat}/${idOficio}`).toPromise();
  }

  registrarOficio( idCat: string, oficio: FormData ) {
    return this.http.post(`${ this.url }/registrar/${idCat}`, oficio).toPromise();
  }

  actualizarOficio( idCat: string, idOficio: string, oficio: FormData ) {
    return this.http.put(`${ this.url }/actualizar/${idCat}/${idOficio}`, oficio).toPromise();
  }

  eliminarOficio( idCat: string, idOficio: string ) {
    return this.http.delete(`${ this.url }/eliminar/${idCat}/${idOficio}`).toPromise();
  }
}
