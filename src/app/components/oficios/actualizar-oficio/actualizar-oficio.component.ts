import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { OficiosModel } from '../../../models/oficiosModel';
import { OficiosService } from '../../../services/oficios.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000
});

@Component({
  selector: 'app-actualizar-oficio',
  templateUrl: './actualizar-oficio.component.html',
  styleUrls: ['./actualizar-oficio.component.css']
})
export class ActualizarOficioComponent implements OnInit {

  @Input() paquetito;
  @Output() salidaEditar = new EventEmitter();

  oficios: OficiosModel[] = [];
  oficio: OficiosModel;
  selectedFile: File = null;

  @Input() set cat(value: any) {
    this.oficio = new OficiosModel();
    this.oficio.strNombre = value.strNombre;
    this.oficio.strDesc = value.strDesc;
    this.oficio._id = value._id;
  }

  constructor(private oficiosService: OficiosService) {}

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = event;
  }

  cancelar() {
    this.paquetito.registrarOficioComponent = true;
    this.paquetito.actualizarOficioComponent = false;
  }

  actualizarOficios() {
    this.oficiosService.obtenerOficios(this.paquetito.categoria._id).then(oficios => {
      this.oficios = oficios.cont.oficios;
      this.salidaEditar.emit(this.oficios);
      this.cancelar();
    }).catch(err => {
      const errores = err.error;
      Toast.fire({
        type: 'error',
        title: errores.msg
      });
    });
  }

  actualizarOficio() {
    const fd = new FormData();
    fd.append('strNombre', this.oficio.strNombre);
    fd.append('strDesc', this.oficio.strDesc);
    if (this.selectedFile !== null) {
      fd.append('strImagen', this.selectedFile, this.selectedFile.name);
    }
    this.oficiosService.actualizarOficio(this.paquetito.categoria._id, this.paquetito.data._id, fd).then( data => {
      Toast.fire({
        type: 'success',
        title: `¡La información del ${this.oficio.strNombre} actualizado exitosamente!`
      });
      this.actualizarOficios();
    }).catch( err => {
      const errores = err.error.cont.err.errors;
      if (errores.strNombre) {
        Toast.fire({
          type: 'error',
          title: errores.strNombre.message
        });
      }
      if (errores.strDesc) {
        Toast.fire({
          type: 'error',
          title: errores.strDesc.message
        });
      }
    });
  }

}
