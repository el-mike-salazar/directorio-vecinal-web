import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CentrosCrecerService } from '../../../services/centros-crecer.service';
import { CCrecerModel } from '../../../models/cCrecer.model';
import Swal from 'sweetalert2';
import { MapEditarCentroComponent } from './map-editar-centro/map-editar-centro.component';

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

  @ViewChild( MapEditarCentroComponent, {static: true}) child: MapEditarCentroComponent;
   lng: any;
   lat: any;


  img: any;
  selectedFile: File = null;

  constructor( private _centrosCrecerService: CentrosCrecerService) {}

  centro: CCrecerModel = new CCrecerModel();

  ngOnInit() {
    this.centro  = {
      strNombre: this.paquetito.data.strNombre,
      strDireccion: this.paquetito.data.strDireccion,
      strColonia: this.paquetito.data.strColonia,
      strDelegacion: this.paquetito.data.strDelegacion,
      strImagen: this.paquetito.data.strImagen,
      intCodigoPostal: this.paquetito.data.intCodigoPostal,
      strTelefono: this.paquetito.data.strTelefono,
      fltLatitud: this.child.lat,
      fltLongitud: this.child.lng
    };
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck(): void {
    this.centro.fltLatitud = this.child.lat;
    this.centro.fltLongitud = this.child.lng;
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
    this.selectedFile = event;
  }

  actualizarCC() {
    const fd = new FormData();
    fd.append('nombre', this.centro.strNombre);
    fd.append('longitud', this.centro.fltLongitud);
    fd.append('latitud', this.centro.fltLatitud);
    fd.append('direccion', this.centro.strDireccion);
    fd.append('colonia', this.centro.strColonia);
    fd.append('delegacion', this.centro.strDelegacion);
    fd.append('telefono', this.centro.strTelefono);
    fd.append('codigoPostal', this.centro.intCodigoPostal);
    if (this.selectedFile !== null) {
      fd.append('img', this.selectedFile, this.selectedFile.name);
    }

    this._centrosCrecerService.putCentroCrecer(this.paquetito.data._id, fd).then( data => {

        Toast.fire({
          type: 'success',
          title: `¡La información del ${this.centro.strNombre} actualizado exitosamente!`
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
