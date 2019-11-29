import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CCrecerModel } from '../models/CentroCrecer.model';

@Injectable({
  providedIn: 'root'
})
export class CentrosCrecerService {

  selectCCrecer: CCrecerModel;
  searchText: string;
  url = `http://localhost:3000/api/centro-crecer`;


  constructor(private http: HttpClient) {}

  getCentrosCrecer() {
    return this.http.get(`${this.url}/obtener`).pipe( map( (resp: any) => resp)).toPromise();
  }

  deleteCentroCrecer( _id: string ) {
    return this.http.delete(`${this.url}/eliminar/${_id}`).toPromise();
  }

  getCentroCrecerId( _id: string ) {
    return this.http.get(`${this.url}/obtener/${_id}`).toPromise();
  }

  postCentroCrecer( centroCrecer: FormData ) {
    return this.http.post(`${this.url}/registrar`, centroCrecer).toPromise();
  }

  putCentroCrecer( _id: string, centroCrecer: FormData ) {
    return this.http.put(`${this.url}/actualizar/${_id}`, centroCrecer).toPromise();
  }



}
