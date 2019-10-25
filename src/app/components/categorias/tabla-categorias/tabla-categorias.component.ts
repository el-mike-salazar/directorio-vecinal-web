import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../models/Categoria';
import Swal from 'sweetalert2';
import { ExportDataService } from '../../../services/export-data.service';

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

@Input() paquetito: any;
pageActual = 1;
@Input() categorias: Categoria[] = [];
@Output() salida = new EventEmitter();

  constructor(private categoriasService: CategoriasService, private excelService: ExportDataService) { }

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().then( (datos: any) => {
      this.categorias = datos.cont.categorias;
    }).catch( err => {
      console.log('Error');
      this.categorias = [];
    });
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
          console.log(err);
        });
      }

    });
  }

  seleccionar(categoria: Categoria) {
    this.paquetito.data = categoria;
    this.paquetito.formularioComponent = false;
    this.paquetito.formularioEditarComponent = true;
  }

  exportAsXLSX(): void {
    if (this.categorias.length !== 0) {
      this.excelService.exportAsExcelFile(this.categorias, 'Log');
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error de exportación',
        text: 'No hay ningún registro que exportar',
      });
    }
  }

}

