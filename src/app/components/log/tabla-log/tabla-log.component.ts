import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportDataService } from 'src/app/services/export-data.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-tabla-log',
  templateUrl: './tabla-log.component.html',
  styleUrls: ['./tabla-log.component.css']
})

export class TablaLogComponent implements OnInit {

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
  constructor(private excelService: ExportDataService, private _adminsLogService: LogService) {
  // Validacion buscar
    this.form = new FormGroup({
       fechaInicio: new FormControl('', [Validators.required]),
       fechaFin: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.logReporte();
  }

  logReporte() {
    this._adminsLogService.logReporte().subscribe((data: any) => {
      this.admins = data.cont.log;
    });
  }

  compararFechas(fechaInicio: Date, fechaFin: Date) {
    if ( !fechaInicio || !fechaFin) {
      Toast.fire({
        type: 'warning',
        title: 'No se seleccionó correctamente una Fecha de inicio y/o Fecha de fin de rango'
      });
     } else {
      if (fechaFin < fechaInicio) {
        this._adminsLogService.logFilterDateReporte(fechaFin, fechaInicio).subscribe((data: any) => {
          this.admins = data.cont.log;
        });
      } else {
        this._adminsLogService.logFilterDateReporte(fechaInicio, fechaFin).subscribe((data: any) => {
          this.admins = data.cont.log;
        });

      }


    }
  }

  ngClick(admin) {
    this.paquetito.expree = true;
    this.paquetito.data = admin;
    this.admins = admin;
    this.salida.emit(this.paquetito);
  }

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
