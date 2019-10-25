import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsLogService } from 'src/app/services/admins-log.service';
// import { logreporteModel } from '../../../../models/logreporteModel';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Sweet alert
import Swal from 'sweetalert2';

// Excel

// PDF
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportDataService } from 'src/app/services/export-data.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})

export class DatatableComponent implements OnInit {

  title = 'Log de usuarios';
  // Paginacion
  pageActual = 1;

  // Contenedor de datos
  logAdmins: any = {};
  admins: any;

  // Buscar
  form: FormGroup;
  fechaInicio: Date;
  fechaFin: Date;

  @Input() paquetito: any;
  @Output() salida = new EventEmitter();

  // tslint:disable-next-line: variable-name
  constructor(private excelService: ExportDataService, private http: HttpClient, private _adminsLogService: AdminsLogService, private _router: Router) {
  // Validacion buscar
    this.form = new FormGroup({
       fechaInicio: new FormControl('', [Validators.required]),
       fechaFin: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.logReporte();
    console.log(this.paquetito.expree);
  }

  logReporte() {
    this._adminsLogService.logReporte().subscribe((data: any) => {
      this.admins = data.cont.log;
    });
  }

  compararFechas(fechaInicio: Date, fechaFin: Date) {
    if (fechaFin < fechaInicio) {
      const soporte = fechaFin;
      fechaFin = fechaInicio;
      fechaInicio = soporte;
      console.log(fechaInicio, soporte);
    }
    this._adminsLogService.logFilterDateReporte(fechaInicio, fechaFin).subscribe((data: any) => {
      this.admins = data.cont.log;
    });
  }

  funcionPrueba() {
    console.log(this.paquetito.expree);
    this.paquetito.expree = !this.paquetito.expree;
  }

  // Detalles de informacion
   viewLogDetails(id) {
    this._router.navigate(['/log-detailed', id]);
  }

  // Momento donde dan click
  ngClick(admin) {
    this.paquetito.expree = true;
    this.paquetito.data = admin;
    this.admins = admin;
    this.salida.emit(this.paquetito);
  }

  // Exportar Excel
  exportAsXLSX(): void {
    console.log(this.admins);
    if (this.admins.length !== 0) {
      this.excelService.exportAsExcelFile(this.admins, 'Log');
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error de exportacion',
        text: 'No hay ningun registro que exportar',
      });
    }
  }

  // Exportar PDF
  public exportPDF() {
    if (this.admins.length !== 0) {
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
