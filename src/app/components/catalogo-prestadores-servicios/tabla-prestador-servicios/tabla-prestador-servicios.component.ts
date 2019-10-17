import { Component, OnInit, Input } from '@angular/core';
import { PrestadorService } from '../../../services/prestador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { PrestadorServiciosModel } from '../../../models/prestadorServicios.model';

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
  // centros: PrestadorServiciosModel[] = [];

  constructor(  private _prestadorService: PrestadorService, private _router: Router ) { }

  ngOnInit() {
    this._prestadorService.getPrestadorServicios().subscribe((datos: any) => {
     this.centros = datos.centroC;
   });
 }

 agregarPS() {
   this._router.navigate(['/agregarCentro']);
 }

 mostrarInfoPS(data: any) {
   this.paquetito.data = data;
   this.paquetito.editarCentroCrecerComponent = true;
   this.paquetito.tablaCentrosCrecerComponent = false;
 }

 eliminarPS(_id: string, nombre: string) {
   Swal.fire({
     title: 'Estas a punto de eliminar un Centro Crecer',
     text: `Estas realmente seguro que quieres eliminar ${nombre}?`,
     type: 'error',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Continuar',
     cancelButtonText: 'Cancelar'
   }).then((result) => {
     if (result.value) {
       this._prestadorService.deletePrestadorServicios(_id).
       subscribe(resp => {
         this.ngOnInit();
         Toast.fire({
           type: 'success',
           title: `${nombre} eliminado Exitosamente`
         });
       });
     }
   });
 }

  exportToPDF() {

  }

  exportToEXEL() {

  }


}
