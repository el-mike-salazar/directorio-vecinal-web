import { Component, OnInit, Input } from '@angular/core';
import { RutasApiModel } from '../../../models/rutas-api.model';
import { RutasApiService } from '../../../services/rutas-api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-actualizar-rutas',
  templateUrl: './actualizar-rutas.component.html',
  styleUrls: ['./actualizar-rutas.component.css']
})
export class ActualizarRutasComponent implements OnInit {

  @Input() paquetito: any;
  apiArr: RutasApiModel[] = [];
  modeloRutas: RutaModel = new RutaModel();

  constructor(private apiService: RutasApiService) { }

  pruebaSplit: any;
  ngOnInit() {
    this.pruebaSplit = this.paquetito.data.strRuta.split('/');


    this.modeloRutas._id = this.paquetito.data._id;
    this.modeloRutas.strRuta = '/' + this.pruebaSplit[1] + '/' + this.pruebaSplit[2];
    this.modeloRutas.strNombre = this.paquetito.data.strNombre;
    this.modeloRutas.strFuncion = this.pruebaSplit[3];

    // console.log('/' + this.pruebaSplit[1] + '/' + this.pruebaSplit[2]);
    // console.log('==============');
    // console.log('/' + this.pruebaSplit[1] + '/' + this.pruebaSplit[2] + '/' + this.pruebaSplit[3]);

  }

  actuaizarApis(){
    this.apiService.obtenerApi(this.paquetito.categoria._id).then(categoria => {
      this.apiArr = categoria.cont.resp;
    }).catch(err => {
      const errores = err.error;
      Toast.fire({
        type: 'error',
        title: errores.msg
      });
    });
  }

  actualizarApi() {

    this.modeloRutas.strRuta = this.modeloRutas.strRuta + '/' + this.modeloRutas.strFuncion;

    this.apiService.actualizarApi(this.paquetito.idCategoria, this.modeloRutas._id , this.modeloRutas).then( data => {
      this.paquetito.registrarRutasComponent = true;
      this.paquetito.actualizarRutasComponent = false;
      Toast.fire({
        type: 'success',
        title: `¡La información del ${this.modeloRutas.strNombre} actualizado exitosamente!`
      });
      

      this.apiService.obtenerApis().then((datos: any) => {
        this.apiArr = datos.cont.resp;

     }).catch( err => {
       console.log('Error');
       this.apiArr = [];
     });

    }).catch( err => {

      const errores = err.error.cont.err.errors;

      if (errores.strNombre) {
        Toast.fire({
          type: 'error',
          title: errores.strNombre.message
        });
      }

    });
    
  }

  cancelar(){
    this.paquetito.registrarRutasComponent = true;
    this.paquetito.actualizarRutasComponent = false;
  }

}

class RutaModel {
    blnActivo: boolean;
    _id: string;
    strNombre: string;
    strRuta: string;
    strFuncion: string;
}
