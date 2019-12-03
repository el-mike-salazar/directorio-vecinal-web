import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { PrestadorService } from '../../../services/prestador.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-tabla-prestador-servicios',
  templateUrl: './tabla-prestador-servicios.component.html',
  styleUrls: ['./tabla-prestador-servicios.component.css']
})

export class TablaPrestadorServiciosComponent implements OnInit {

  @Input() paquetito: any;

  pageActual: number = 1;
  prestadores: UsuarioModel[] = [];

  constructor( private _router: Router, private _prestadorService: PrestadorService ) { }


  ngOnInit() {
    console.log(this.prestadores);
    this.obtenerPrestadores();

 }

 obtenerPrestadores() {
  this._prestadorService.getPrestadorServicios().then((datos: any) => {
    this.prestadores = datos.cont.persona;
  }).catch( err => {
    console.log('Error');
    this.prestadores = [];
  });
 }

 agregarPS() {
   this._router.navigate(['/registrar-prestador']);
 }

 mostrarInfoPS(data: any) {
   this.paquetito.data = data;
   this.paquetito.actualizarPrestadorServiciosComponent = true;
   this.paquetito.tablaPrestadorServiciosComponent = false;
 }

 eliminarPS( _id: string, nombre: string) {
   Swal.fire({
     title: 'Estas a punto de eliminar a un prestador de servicios',
     text: `Estas realmente seguro que quieres eliminar a ${nombre}?`,
     type: 'error',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Continuar',
     cancelButtonText: 'Cancelar'
   }).then((result) => {
     if (result.value) {
       this._prestadorService.deletePrestadorServicios( _id )
       .then(resp => {
        Toast.fire({
          type: 'success',
          title: `${nombre} eliminado Exitosamente`
        });
        this.paquetito.tablaPrestadorServiciosComponent = false;
        setTimeout(() => {
          this.paquetito.tablaPrestadorServiciosComponent = true;
        }, 0);
        this.ngOnInit();
      }).catch( err => {
       console.log(err);
       });
     }
   });
 }

 catalogoNegocios( _id: string, nombre: string) {
  this._router.navigate(['/negocios']);
 }

  exportToPDF() {

  }

  exportToEXEL() {

  }


}
