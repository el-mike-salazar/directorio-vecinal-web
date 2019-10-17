import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CentrosCrecerService } from '../../../../services/centros-crecer.service';
import { CCrecerModel } from '../../../../models/cCrecer.model';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-editar-centro-crecer',
  templateUrl: './editar-centro-crecer.component.html',
  styleUrls: ['./editar-centro-crecer.component.css']
})
export class EditarCentroCrecerComponent implements OnInit {

  @Input() paquetito: any;
  cCrecer: CCrecerModel[] = [];
  @Output() salida = new EventEmitter();

  img: any;
  selectedFile: File = null;

  constructor( private _router: Router, private _centrosCrecerService: CentrosCrecerService) {}

  centro: any;

  ngOnInit() {
    this.centro  = {
      nombre: this.paquetito.data.strNombre,
      direccion: this.paquetito.data.strDireccion,
      colonia: this.paquetito.data.strColonia,
      delegacion: this.paquetito.data.strDelegacion,
      codigoPostal: this.paquetito.data.intCodigoPostal,
      telefono: this.paquetito.data.strTelefono,
      latitud: this.paquetito.data.fltLatitud,
      altitud: this.paquetito.data.fltAltitud
    };
  }

  regresarCatalogo() {
   this.paquetito.editarCentroCrecerComponent = false;
   this.paquetito.tablaCentrosCrecerComponent = true;
  }

  resetForm( form?: NgForm ) {
    if (form) {
      form.reset();
      this._centrosCrecerService.selectCCrecer = new CCrecerModel();
    }
  }

  onFileSelected(event) {
    this.selectedFile = null;
    this.selectedFile = event.target.files[0] as File;
    this.centro.img = this.selectedFile;
  }

  actualizarCC() {
    const fd = new FormData();
    fd.append('nombre', this.centro.nombre);
    fd.append('altitud', this.centro.altitud);
    fd.append('latitud', this.centro.latitud);
    fd.append('direccion', this.centro.direccion);
    fd.append('colonia', this.centro.colonia);
    fd.append('delegacion', this.centro.delegacion);
    fd.append('telefono', this.centro.telefono);
    fd.append('codigoPostal', this.centro.codigoPostal);
    if (this.selectedFile !== null) {
      fd.append('img', this.selectedFile, this.selectedFile.name);
    }

    this._centrosCrecerService.putCentroCrecer(this.paquetito.data._id, fd).then( data => {

        Toast.fire({
          type: 'success',
          title: `¡La información del ${this.centro.nombre} actualizado exitosamente!`
        });

        this._centrosCrecerService.getCentrosCrecer().subscribe( cCrecer => {
          this.cCrecer = cCrecer.centroC;
          this.salida.emit(this.cCrecer);
          this.regresarCatalogo();
        });
    }).catch( err => {

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
            title: errores.strDireccion.message
          });
        }
        if (errores.strColonia) {
          Toast.fire({
            type: 'error',
            title: errores.strColonia.message
          });
        }
        if (errores.strDelegacion) {
          Toast.fire({
            type: 'error',
            title: errores.strDelegacion.message
          });
        }
        if (errores.strTelefono) {
          Toast.fire({
            type: 'error',
            title: errores.strTelefono.message
          });
        }
        if (errores.intCodigoPostal) {
          Toast.fire({
            type: 'error',
            title: errores.intCodigoPostal.message
          });
        }

      });

    }
  }
