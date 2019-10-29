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
  @Output() salida = new EventEmitter();

  @ViewChild('forma', { static: true}) forma: NgForm;

  categoria: Categoria = new Categoria();

  categorias: Categoria[] = [];
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
      fd.append('nameImg', this.selectedFile, this.selectedFile.name);
    }
    this.categoriasService.registrarCategoria(fd).then( data => {
      Toast.fire({
        type: 'success',
        title: `${this.categoria.strNombre} guardado Exitosamente`
      });
      this.actualizarCategorias();

      this.paquetito.formularioComponent = false;
      setTimeout(() => {
        this.paquetito.formularioComponent = true;
      }, 0);
    }).catch( err => {
      Toast.fire({
        type: 'error',
        title: err.error.cont.err
      });
    });
  }

  actualizarCategorias() {
    this.categoriasService.obtenerCategorias().then(categorias => {
      this.categorias = categorias.cont.categorias;
      this.salida.emit(this.categorias);
    }).catch(err => {
      const errores = err.error;
      Toast.fire({
        type: 'error',
        title: errores.msg
      });
    });
  }

}
