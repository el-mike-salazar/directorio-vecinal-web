import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MapAgregarCentroComponent } from './map-agregar-centro/map-agregar-centro.component';
import { CCrecerModel } from '../../../models/cCrecer.model';
import { CentrosCrecerService } from '../../../services/centros-crecer.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-agregar-centro-crecer',
  templateUrl: './agregar-centro-crecer.component.html',
  styleUrls: ['./agregar-centro-crecer.component.css']
})

export class AgregarCentroCrecerComponent implements OnInit {

   @ViewChild(MapAgregarCentroComponent, {static: true}) child: MapAgregarCentroComponent;
   lng: any;
   lat: any;
   img: any;
   selectedFile: File = null;

  // tslint:disable-next-line: variable-name
  constructor( private _router: Router,  private _centrosCrecerService: CentrosCrecerService) {
  }

  centro: CCrecerModel = new  CCrecerModel();

  // Obtiene los datos del formulario, si el formulario no es valido con sus campos no puede guardar los datos(boton GUARDAR)
  ngOnInit(): void {
    this.lng = this.child.lng;
    this.lat = this.child.lat;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck(): void {
    this.centro.fltLatitud = this.child.lat;
    this.centro.fltLongitud = this.child.lng;
  }

// Regresa al catalogo de   Centros Crecer (boton CANCELAR)
  regresarCatalogo() {
    this._router.navigate(['/catalogoCentros']);
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

  guardarCC() {
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

    this._centrosCrecerService.postCentroCrecer(fd).then( data => {
      console.log(data);
      this.regresarCatalogo();
      Toast.fire({
        type: 'success',
        title: `${this.centro.strNombre} guardado Exitosamente`
      });
    }).catch( err => {

      let errores;

      if (err.error.cont) {
        errores = err.error.cont.err.errors;

        if (errores.strNombre) {
          Toast.fire({
            type: 'error',
            title: errores.strNombre.message
          });
        }
        if (errores.strImagen) {
          Toast.fire({
            type: 'error',
            title: errores.strImagen.message
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
      } else {
        Toast.fire({
          type: 'error',
          title: err.error.message
        });
      }
    });
  }
}
