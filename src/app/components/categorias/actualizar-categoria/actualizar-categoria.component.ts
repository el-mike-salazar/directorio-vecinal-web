import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from '../../../models/Categoria.model';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-actualizar-categoria',
  templateUrl: './actualizar-categoria.component.html',
  styleUrls: ['./actualizar-categoria.component.css']
})
export class ActualizarCategoriaComponent implements OnInit {

  @Input() paquetito;

  @Output() salidaEditar = new EventEmitter();

  categorias: Categoria[];
  categoria: Categoria;

  @Input() set cat(value: any) {

    this.categoria = new Categoria();
    this.categoria.strNombre = value.strNombre;
    this.categoria.strDesc = value.strDesc;
    this.categoria.strImagen = value.strImagen;
    this.categoria._id = value._id;

  }

  selectedFile: File = null;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit() {
  }

  cancelar() {
    this.paquetito.registrarCategoriaComponent = true;
    this.paquetito.actualizarCategoriaComponent = false;
  }

  actualizarCategorias() {
    this.categoriasService.obtenerCategorias().then(categorias => {
      this.categorias = categorias.cont.categorias;
      this.salidaEditar.emit(this.categorias);
      this.cancelar();
    }).catch(err => {
      const errores = err.error;
      Toast.fire({
        type: 'error',
        title: errores.msg
      });
    });
  }

  recibeInfoHijo(event) {
    this.selectedFile = event;
  }

  actualizarCategoria() {
    const fd = new FormData();
    fd.append('strNombre', this.categoria.strNombre);
    fd.append('strDesc', this.categoria.strDesc);

    if (this.selectedFile !== null) {
      fd.append('strImagen', this.selectedFile, this.selectedFile.name);
    }

    this.categoriasService.modificarCategoria(this.paquetito.data._id, fd).then( data => {

      Toast.fire({
        type: 'success',
        title: `¡La información del ${this.categoria.strNombre} actualizado exitosamente!`
      });
      this.actualizarCategorias();

    }).catch( err => {
      console.log(err);
      const errores = err.error.cont.err.errors;
      if (errores.strNombre) {
        Toast.fire({
          type: 'error',
          title: errores.strNombre.message
        });
      }
      if (errores.strDireccion) {
        Toast.fire({
          type: 'error',
          title: errores.strNombre.message
        });
      }
    });
  }

}
