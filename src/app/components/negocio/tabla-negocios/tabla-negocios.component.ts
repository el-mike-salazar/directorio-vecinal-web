import { Component, OnInit, Input } from '@angular/core';
import { NegocioModel } from '../../../models/negocio.model';
import { Router } from '@angular/router';
import { NegocioService } from '../../../services/negocio.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-tabla-negocios',
  templateUrl: './tabla-negocios.component.html',
  styleUrls: ['./tabla-negocios.component.css']
})
export class TablaNegociosComponent implements OnInit {

  @Input() paquetito: any;

  pageActual: number = 1;
  negocios: NegocioModel[] = [];

  constructor(private _router: Router, private _negocioService: NegocioService) {
  }

  ngOnInit() {
    this.obtenerNegocios();
  }

  obtenerNegocios() {
    this._negocioService.getNegocio().then((datos: any) => {
      this.negocios = datos.cont.negocio;
    }).catch( err => {
      console.log('Error');
      this.negocios = [];
    });
  }

  agregarTienda() {
    this._router.navigate(['/agregar-negocio']);
  }

  mostrarInfoNegocio(data: any) {
    this.paquetito.data = data;
    this.paquetito.actualizarNegocioComponent = true;
    this.paquetito.tablaNegociosComponent = false;
  }

  eliminarNegocio( _id: string, nombre: string) {
    Swal.fire({
      title: 'Estas a punto de eliminar a un negocio',
      text: `¿Estas realmente seguro que quieres eliminarlo?`,
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._negocioService.deleteNegocio( _id )
        .then(resp => {
         Toast.fire({
           type: 'success',
           title: `El negocio '${nombre}' fue eliminado Exitosamente`
         });
         this.paquetito.tablaNegociosComponent = false;
         setTimeout(() => {
           this.paquetito.tablaNegociosComponent = true;
         }, 0);
         this.ngOnInit();
       }).catch( err => {
        console.log(err);
        });
      }
    });
  }

   exportToPDF() {

   }

   exportToEXEL() {

   }

}
