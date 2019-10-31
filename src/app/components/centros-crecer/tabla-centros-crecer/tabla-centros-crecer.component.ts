import { Component, OnInit, Input } from '@angular/core';
import { CCrecerModel } from 'src/app/models/CentroCrecer.model';
import { CentrosCrecerService } from 'src/app/services/centros-crecer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { ExportDataService } from 'src/app/services/export-data.service';

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

  title = 'Catálogo de Centros Crecer';
  @Input() paquetito: any;

  pageActual = 1;
  centros: CCrecerModel[] = [];

  // tslint:disable-next-line: variable-name
  constructor(  private _centrosCrecerService: CentrosCrecerService, private _router: Router, private excelService: ExportDataService ) { }

  ngOnInit() {
    this.obtenerCentrosCrecer();
  }

  obtenerCentrosCrecer() {
    this._centrosCrecerService.getCentrosCrecer().then((datos: any) => {
      this.centros = datos.cont.ccDB;
    }).catch( err => {
      console.log('Error');
      this.centros = [];
    });
  }

 agregarCC() {
   this._router.navigate(['/registra-centro']);
 }

 mostrarInfoCC(data: any) {
   this.paquetito.data = data;
   this.paquetito.actualizarCentroCrecerComponent = true;
   this.paquetito.tablaCentrosCrecerComponent = false;
 }

 // tslint:disable-next-line: variable-name
 eliminarCC(_id: string, nombre: string) {
   Swal.fire({
     title: 'Estas a punto de eliminar un Centro Crecer',
     text: `Estas realmente seguro que quieres eliminar ${nombre}?`,
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Continuar',
     cancelButtonText: 'Cancelar'
   }).then((result) => {
     if (result.value) {
       this._centrosCrecerService.deleteCentroCrecer(_id)
       .then(resp => {
         Toast.fire({
           type: 'success',
           title: `${nombre} eliminado Exitosamente`
         });
         this.paquetito.tablaCentrosCrecerComponent = false;
         setTimeout(() => {
           this.paquetito.tablaCentrosCrecerComponent = true;
         }, 0);
         this.ngOnInit();
       }).catch( err => {
        console.log(err);
       });
     }
   });
 }

  public exportAsXLSX(): void {
    if (this.centros.length !== 0) {
      this.excelService.exportAsExcelFile(this.centros, 'Centros Crecer');
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error de exportación',
        text: 'No hay ningún registro que exportar',
      });
    }
  }

  public exportPDF() {
    if (this.centros.length !== 0) {
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
