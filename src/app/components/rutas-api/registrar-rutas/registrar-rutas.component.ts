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
  selector: 'app-registrar-rutas',
  templateUrl: './registrar-rutas.component.html',
  styleUrls: ['./registrar-rutas.component.css']
})
export class RegistrarRutasComponent implements OnInit {
 
  @Input() paquetito: any;
  apiArr: RutasApiModel[] = [];
  modeloRutas: RutaModel = new RutaModel();
  datoArr: RutasApiModel;
  idCategoria: string;

  constructor(private apiService: RutasApiService, private activeRoute: ActivatedRoute) {
console.log();
  }
  
  pruebaSplit: any;
  ngOnInit() {
    this.apiService.obtenerApis().then( (categorias: any) => {

      categorias.cont.resp.forEach(cat => {
        if(cat._id === this.activeRoute.snapshot.params.idCat) {
          this.datoArr = cat;
          this.datoArr.strNombre = this.datoArr.strNombre.toLowerCase();
        }
      })
    });
  }

  cancelar(){
    this.paquetito.registrarRutasComponent = false;
    this.paquetito.actualizarRutasComponent = false;
}


  registrarRuta(){
    this.modeloRutas.strNombre = this.modeloRutas.strNombre;
    this.modeloRutas.strRuta = '/api/'+this.datoArr.strNombre+'/'+this.modeloRutas.strFuncion;
    console.log(this.modeloRutas);
    this.apiService.registrarApi(this.activeRoute.snapshot.params.idCat, this.modeloRutas).then(data => {

      Toast.fire({
        type: 'success',
        title: `¡La información del ${this.modeloRutas.strNombre} actualizado exitosamente!`
      });

    });

  }

}

class RutaModel {
  blnActivo: boolean;
  _id: string;
  strNombre: string;
  strRuta: string;
  strFuncion: string;
}
