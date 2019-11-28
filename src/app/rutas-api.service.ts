import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RutasApiModel } from '../models/rutas-api.model';

@Injectable({
    providedIn: 'root'
  })

  export class RutasApiService{

    selectRutasApi: RutasApiModel;
    searchText: string;
    urlCat = 'http://localhost:3000/api/categoriaApi';
    urlOf = 'http://localhost:3000/api/ruta';
   

   // /actualizar/:idCategoria/:idApi
    constructor(private http: HttpClient) {}
        // obtiene todas las apis de la categoria
        obtenerApis() {
            return this.http.get(`${this.urlCat}/obtener`).pipe( map( (data: any) => data)).toPromise();
        }
        // obtiene todas las api de una categoria en especifica
        obtenerApi(idCat: string) {
          return this.http.get(`${this.urlOf}/obtener/${idCat}`).pipe( map( (data: any) => data)).toPromise();
      }

        registrarApi(idCat: string, api: any) {
          return this.http.post(`${ this.urlOf }/registrar/${idCat}`, api).toPromise();
        }

        actualizarApi( idCat: string, idOf: string, api: any ){
          return this.http.put(`${this.urlOf}/actualizar/${idCat}/${idOf}`, api).toPromise();
        }
      
        // tslint:disable-next-line: variable-name
        eliminarApi(_id: string) {
          return this.http.delete(`${ this.urlCat }/eliminar/${_id}`).toPromise();
        }


  }