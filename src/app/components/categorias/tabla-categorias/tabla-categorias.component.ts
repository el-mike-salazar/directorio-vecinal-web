import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../models/Categoria.model';
import Swal from 'sweetalert2';
import { ExportDataService } from '../../../services/export-data.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });


@Component({
  selector: 'app-tabla-categorias',
  templateUrl: './tabla-categorias.component.html',
  styleUrls: ['./tabla-categorias.component.css']
})

export class TablaCategoriasComponent implements OnInit {

  title = 'Catálogo de Categorías';

  @Input() paquetito: any;
  pageActual = 1;
  @Input() categorias: Categoria[];
  @Output() salida = new EventEmitter();

  constructor(private categoriasService: CategoriasService, private excelService: ExportDataService) { }

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().then( (datos: any) => {
      this.categorias = datos.cont.categorias;
    }).catch( err => {});
  }

  eliminar(categoria: Categoria) {

    Swal.fire({
      title: `Estas a punto de eliminar la categoría: ${categoria.strNombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
        this.categoriasService.eliminarCategoria(categoria._id).then(resp => {
          this.ngOnInit();
          Toast.fire({
            type: 'success',
            title: `${categoria.strNombre} eliminado Exitosamente`
          });

        }).catch(err => {
          Toast.fire({
            type: 'error',
            title: err.message
          });
        });
      }

    });
  }

  seleccionar(categoria: Categoria) {
    this.paquetito.data = categoria;
    this.paquetito.registrarCategoriaComponent = false;
    this.paquetito.actualizarCategoriaComponent = true;
  }

  exportAsXLSX(): void {
    if (this.categorias.length !== 0) {
      this.excelService.exportAsExcelFile(this.categorias, 'Categorías');
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error de exportación',
        text: 'No hay ningún registro que exportar',
      });
    }
  }

    // Exportar PDF
    public exportPDF() {
      if (this.categorias.length !== 0) {
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

