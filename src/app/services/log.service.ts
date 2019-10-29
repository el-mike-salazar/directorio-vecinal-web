import { Injectable, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  searchText: string;
  admins = {};
  logAdmins = [];

  urlData = 'http://localhost:3000/api/log/obtener';
  expree: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  getOnlyAdminLog(id: number) {
    return this.logAdmins[id];
  }

  logReporte( ) {
    return this.http.get(this.urlData);
  }

  logFilterDateReporte(fechaInicio: Date, fechaFin: Date) { // datosLog: Logreporte
    console.log(`primer fecha ${fechaInicio} segunda fecha ${fechaFin}`);
    return this.http.get(this.urlData + '/' + fechaInicio + '/' + fechaFin);
  }

}
