import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../models/Categoria.model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.css']
})
export class RegistrarCategoriaComponent implements OnInit {

  @Input() paquetito: any;
  @Output() salidaReg = new EventEmitter();

  @ViewChild('forma', { static: true}) forma: NgForm;

  categoria: Categoria = new Categoria();

  categorias: Categoria[];
  selectedFile: File = null;
  errores: any;

  constructor(private categoriasService: CategoriasService, private http: HttpClient) {}

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = event;
  }

  registrarCategoria() {
    const fd = new FormData();
    fd.append('strNombre', this.categoria.strNombre);
    fd.append('strDesc', this.categoria.strDesc);
    if (this.selectedFile !== null) {
      fd.append('strImagen', this.selectedFile, this.selectedFile.name);
    }
    this.categoriasService.registrarCategoria(fd).then( data => {
      Toast.fire({
        type: 'success',
        title: `${this.categoria.strNombre} guardado Exitosamente`
      });
      this.actualizarCategorias();
    }).catch( err => {

      if (err.error) {

        if (err.error.message) {
          Toast.fire({
            type: 'error',
            title: err.error.message
          });
        }

        if (err.error.msg) {
          Toast.fire({
            type: 'error',
            title: err.error.msg
          });
        }
      }

    });
  }

  actualizarCategorias() {
    this.categoriasService.obtenerCategorias().then(categorias => {
      this.categorias = categorias.cont.categorias;
      this.salidaReg.emit(this.categorias);
      this.paquetito.registrarCategoriaComponent = false;
      setTimeout(() => {
        this.paquetito.registrarCategoriaComponent = true;
      }, 0);
    }).catch(err => {
      const errores = err.error;
      Toast.fire({
        type: 'error',
        title: errores.msg
      });
    });
  }

}
