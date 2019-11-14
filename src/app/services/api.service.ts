import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiModel } from '../models/Api.model';

@Injectable({
    providedIn: 'root'
  })

  export class ApiService {

    selectRutasApi: ApiModel;
    searchText: string;
    url = 'http://localhost:3000/api/categoriaApi';

    constructor(private http: HttpClient) {}

        obtenerApi() {
            return this.http.get(`${this.url}/obtener`).pipe( map( (resp: any) => resp)).toPromise();
        }

        registrarApi(categoriaApi: any) {
          return this.http.post(`${ this.url }/registrar`, categoriaApi).toPromise();
        }

        modificarApi(id: string, categoriaApi: ApiModel) {
          return this.http.put(`${ this.url }/actualizar/${id}`, categoriaApi).toPromise();
        }

      // tslint:disable-next-line: variable-name
        eliminarApi(_id: string) {
          return this.http.delete(`${ this.url }/eliminar/${_id}`).toPromise();
        }


  }