import { Component, OnInit, Input} from '@angular/core';
import { ApiModel } from '../../models/Api.model';
import { ApiService } from '../../services/api.service';
import { RolModel } from '../../models/Rol.model';
import { RolService } from '../../services/rol.service';
import Swal from 'sweetalert2';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  @Input() paquetito;


  apis: ApiModel[] = [];
  rol: RolModel;
  check: boolean = false;
  band: boolean;

  constructor( private _apiService: ApiService, private _rolService: RolService) { }

  ngOnInit() {
    this.obtenerAPI();
    this.rol = this.paquetito.data;
    console.log(this.rol);
  }

  obtenerAPI() {
    this._apiService.obtenerApi().then( (datos: any) => {

      this.apis = datos.cont.resp;
    }).catch( err => {
      this.apis = [];
    });
  }

  pushArray(ruta, event) {

    
    let banApi = false;
    if (event.toElement.checked) {
      this.rol.arrApi.push(ruta._id);
      banApi = true;
    } else {

      let index = this.rol.arrApi.indexOf(ruta._id);

      if(index !== -1){ 
        this.rol.arrApi.splice(index, 1);
      }
      banApi = false;
    }
    this._rolService.modificarArrApi(this.paquetito.data._id, this.rol).then( (data: any) => {

      if (banApi) {
        Toast.fire({
          type: 'success',
          title: `La función "${ruta.strNombre}" se ha agregado al rol "${this.paquetito.data.strNombre}" exitosamente`
        });
      } else {
        Toast.fire({
          type: 'warning',
          title: `La función "${ruta.strNombre}" se ha quitado del rol "${this.paquetito.data.strNombre}" exitosamente`
        });
      }


    });
  }

  chequeo(id: string) {

    let existe = false;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.rol.arrApi.length; i++) {
      existe = id === this.rol.arrApi[i];

      if (existe) {
        break;
      }
    }
    return existe;
  }

}
