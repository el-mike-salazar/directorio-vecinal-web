import { Component, OnInit, Input } from '@angular/core';
import { CCrecerModel } from 'src/app/models/cCrecer.model';
import { CentrosCrecerService } from 'src/app/services/centros-crecer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-tabla-centros-crecer',
  templateUrl: './tabla-centros-crecer.component.html',
  styleUrls: ['./tabla-centros-crecer.component.css']
})
export class TablaCentrosCrecerComponent implements OnInit {


  @Input() paquetito: any;

  pageActual: number = 1;
  centros: CCrecerModel[] = [];

  constructor(  private _centrosCrecerService: CentrosCrecerService, private _router: Router ) { }

  ngOnInit() {
    this._centrosCrecerService.getCentrosCrecer().subscribe((datos: any) => {
     this.centros = datos.cont.ccDB;
    });
 }

 agregarCC() {
   this._router.navigate(['/agregarCentro']);
 }

 mostrarInfoCC(data: any) {
   this.paquetito.data = data;
   this.paquetito.editarCentroCrecerComponent = true;
   this.paquetito.tablaCentrosCrecerComponent = false;
 }

 eliminarCC(_id: string, nombre: string) {
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
       this._centrosCrecerService.deleteCentroCrecer(_id).
       subscribe(resp => {
         Toast.fire({
           type: 'warning',
           title: `${nombre} eliminado Exitosamente`
         });
         this.ngOnInit();
       });
     }
   });
 }

  exportToPDF() {

  }

  exportToEXEL() {

  }

}
