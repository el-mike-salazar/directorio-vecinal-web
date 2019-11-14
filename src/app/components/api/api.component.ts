import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiModel } from '../../models/Api.model';
import { ApiService } from '../../services/api.service';
import { RolModel } from '../../models/Rol.model';
import { RolService } from '../../services/rol.service';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  @Input() paquetito;


  apis: ApiModel[] = [];
  arrRutas: any[] = [];
  rol: RolModel;
  check: boolean = false;

  constructor( private _apiService: ApiService, private _rolService: RolService) { }

  ngOnInit() {
    this.obtenerAPI();
    this.rol = this.paquetito.data;
  }

  obtenerAPI() {
    this._apiService.obtenerApi().then( (datos: any) => {

      this.apis = datos.cont.resp;
    }).catch( err => {
      this.apis = [];
    });
  }

  pushArray(id, event) {
    if (event.toElement.checked) {
      this.arrRutas.push(id);
    } else {

      let index = this.arrRutas.indexOf(id);

      if(index !== -1){ 
        this.arrRutas.splice(index, 1);
      }
    }
    this.rol.arrApi = this.arrRutas;
    console.log(this.paquetito.data._id);
    console.log(this.arrRutas);

    this._rolService.modificarArrApi(this.paquetito.data._id, this.rol).then( (data: any) => {

    });

  }

}
