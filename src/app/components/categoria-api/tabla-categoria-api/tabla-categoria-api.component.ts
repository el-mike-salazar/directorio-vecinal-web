import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExportDataService } from '../../../services/export-data.service';
import * as jspdf from 'jspdf';
import { RutasApiService } from 'src/app/services/rutas-api.service';
import { RutasApiModel } from '../../../models/rutas-api.model';
import html2canvas from 'html2canvas';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-tabla-categoria-api',
  templateUrl: './tabla-categoria-api.component.html',
  styleUrls: ['./tabla-categoria-api.component.css']
})
export class TablaCategoriaApiComponent implements OnInit {
  title = 'Rutas API´s';

  @Input() paquetito: any;
  @Input() apis: RutasApiModel[] = [];
  @Output() salida = new EventEmitter();

// pageActual = 1;
constructor(private router: Router, private rutasApiService: RutasApiService, private excelService: ExportDataService) { }

ngOnInit() {
   this.obtenerApis();
  
}

   // obtiene todas las apis existentes en la BD
   obtenerApis(){
    this.rutasApiService.obtenerApis().then((datos: any) => {
     this.apis = datos.cont.resp;
     console.log(this.apis);
   }).catch( err => {

     if (err.error.cont.count === 0) {
       Toast.fire({
         type: 'error',
         title: err.error.msg
       });
     } else {
       this.router.navigate(['/rutas-api']);
     }
     this.apis = [];
   });
 }

 eliminar(api: RutasApiModel) {

   Swal.fire({
     title: `Estas a punto de eliminar la API: ${api.strNombre}`,
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Continuar',
     cancelButtonText: 'Cancelar'
   }).then((result) => {

     if (result.value) {
       this.rutasApiService.eliminarApi(api._id)
       .then(resp => {
         Toast.fire({
           type: 'success',
           title: `${api.strNombre} eliminado Exitosamente`
         });
         this.obtenerApis();
         this.paquetito.tablaRutasComponent = false;
         setTimeout(() => {
           this.paquetito.tablaRutasComponent = true;
         }, 0);
         this.ngOnInit();
       }).catch( err => {
        console.log(err);
       });
     }

   });
 }

 mostrarApi(index: number){
   this.paquetito.tablaRutasComponent = false;
   this.paquetito.tablaAgregarRutasComponent = true;
   this.paquetito.registrarRutasComponent = true;
   this.paquetito.actualizarRutasComponent = false;
   this.paquetito.pos = index;
 }

  // poner el dato en la tabla de agregar rutas
  actualizarCategoria(api: RutasApiModel){
   
    console.log('actualizar categoria :) ');
    
    console.log(api.strNombre);
    
  }


 seleccionar(api: RutasApiModel) {
   this.paquetito.data = api;
   this.paquetito.tablaAgregarRutasComponent = true;
 }

 // Exportar a Excel
 exportarAExcel(): void {
   if (this.apis.length !== 0) {
     this.excelService.exportAsExcelFile(this.apis, 'Apis');
   } else {
     Swal.fire({
       type: 'error',
       title: 'Error de exportación',
       text: 'No hay ningún registro que exportar',
     });
   }
 }


  // Exportar PDF
  public exportarPDF() {
   if (this.apis.length !== 0) {
     const data = document.getElementById('PDFTable');
     html2canvas(data).then(canvas => {
       const imgWidth = 200;
       const imgHeight = canvas.height * imgWidth / canvas.width;
       const contentDataURL = canvas.toDataURL('image/png');
       const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
       const position = 0;
       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
       pdf.save(`${this.title}.pdf`);
     });
     } else {
     Swal.fire({
       type: 'error',
       title: 'Error de exportacion',
       text: 'No hay ningun registro que exportar',
     });
   }
 }

}
