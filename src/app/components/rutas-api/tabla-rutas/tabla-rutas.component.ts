import { Component, OnInit, Input, Output, EventEmitter, NgModule} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { RutasApiService } from 'src/app/services/rutas-api.service';
import { RutasApiModel } from '../../../models/rutas-api.model';
import { ExportDataService } from 'src/app/services/export-data.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-tabla-rutas',
  templateUrl: './tabla-rutas.component.html',
  styleUrls: ['./tabla-rutas.component.css']
})
export class TablaRutasComponent implements OnInit {

  title = 'Agregar Rutas';
  pageActual = 1;
  @Input() paquetito: any;
  datoArr: RutasApiModel;
  idCategoria: string;

  apis: RutasApiModel[];

  constructor(private router: Router, private rutasApiService: RutasApiService, private excelService: ExportDataService, private activedRoute: ActivatedRoute) { 
    this.idCategoria = this.activedRoute.snapshot.params.idCat;
  }

  ngOnInit() {
    this.obtenerApis(this.idCategoria);
  }

  obtenerApis(idApi: string){
    console.log(idApi);
    this.rutasApiService.obtenerApi(idApi).then((datos: any) => {
      this.apis = datos.cont.rutas;
      console.log(this.apis);
   }).catch( err => {
     console.log('Error');
     this.apis = [];
   });
 }

mostrarRegistro(index: number, ruta: any){
  this.paquetito.tablaRutasComponent = true;
  this.paquetito.registrarRutasComponent = false;
  this.paquetito.actualizarRutasComponent = true;
  this.paquetito.pos = index;
  this.datoArr = this.paquetito.pos;
  this.paquetito.data = ruta;
  this.paquetito.idCategoria = this.idCategoria;
} 

agregarRuta(){
  this.paquetito.registrarRutasComponent = true;
  this.paquetito.actualizarRutasComponent = false;
}


 // EXPORTAR A EXCEL
 public exportAsXLSX(): void {
  if (this.apis.length !== 0) {
    this.excelService.exportAsExcelFile(this.apis, 'Agregar Rutas');
  } else {
    Swal.fire({
      type: 'error',
      title: 'Error de exportación',
      text: 'No hay ningún registro que exportar',
    });
  }
}
 // EXPORTAR A PDF
public exportPDF() {
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
