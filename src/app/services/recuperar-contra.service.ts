import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecuperarContraService {

  url =  'http://localhost:3000/api/persona';

  constructor( private http: HttpClient) { }

  verificarToken(token) {
    return this.http.get(`${ this.url }/obtenerTokenPwd/${token}`).toPromise();
  }

  actualizacionPwd(id, cPwd: any) {
    return this.http.put(`${ this.url }/actualizarContra/${id}`, cPwd).toPromise();
  }
}
