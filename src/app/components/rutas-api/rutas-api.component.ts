import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RutasApiModel } from '../../models/rutas-api.model';
import { RutasApiService } from '../../services/rutas-api.service';
import { ActivatedRoute, Router } from '@angular/router';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-rutas-api',
  templateUrl: './rutas-api.component.html',
  styleUrls: ['./rutas-api.component.css']
})
export class RutasApiComponent implements OnInit {

  Apis: RutasApiModel[] = [];

  paquetito: any = {
    tablaRutasComponent: true,
    registrarRutasComponent: true,
    actualizarRutasComponent: false,
    data: {},
    pos: 0
  };

  constructor(private apisService: RutasApiService, private activeRoute: ActivatedRoute, private router: Router) {
    this.paquetito.pos = this.activeRoute.snapshot.params.id;
   }

    obtenerApis(){
      this.apisService.obtenerApis().then( (datos: any) => {

        this.Apis = datos.cont.resp;
      }).catch( err => {
  
        if (err.error.cont.count === 0) {
          Toast.fire({
            type: 'error',
            title: err.error.msg
          });
        } else {
          this.router.navigate(['/menu']);
        }
        this.Apis = [];
      });
    }

  ngOnInit() {

  }

}
