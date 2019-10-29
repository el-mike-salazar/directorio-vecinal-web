import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CCrecerModel } from '../../../models/CentroCrecer.model';
import { CentrosCrecerService } from '../../../services/centros-crecer.service';
import Swal from 'sweetalert2';
import { MapaComponent } from '../../shared/mapa/mapa.component';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-registrar-centro-crecer',
  templateUrl: './registrar-centro-crecer.component.html',
  styleUrls: ['./registrar-centro-crecer.component.css']
})

export class RegistrarCentroCrecerComponent implements OnInit {

   @ViewChild(MapaComponent, {static: true}) mapa: MapaComponent;
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
    this.lng = this.mapa.lng;
    this.lat = this.mapa.lat;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck(): void {
    this.centro.fltLatitud = this.mapa.lat;
    this.centro.fltLongitud = this.mapa.lng;
  }

// Regresa al catalogo de   Centros Crecer (boton CANCELAR)
  regresarCatalogo() {
    this._router.navigate(['/centros-crecer']);
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
    fd.append('strNombre', this.centro.strNombre);
    fd.append('fltLongitud', this.centro.fltLongitud);
    fd.append('fltLatitud', this.centro.fltLatitud);
    fd.append('strDireccion', this.centro.strDireccion);
    fd.append('strColonia', this.centro.strColonia);
    fd.append('strDelegacion', this.centro.strDelegacion);
    fd.append('strTelefono', this.centro.strTelefono);
    fd.append('nmbCodigoPostal', this.centro.nmbCodigoPostal);

    if (this.selectedFile !== null) {
      fd.append('strImg', this.selectedFile, this.selectedFile.name);
    }

    this._centrosCrecerService.postCentroCrecer(fd).then( data => {
      console.log(data);
      this.regresarCatalogo();
      Toast.fire({
        type: 'success',
        title: `${this.centro.strNombre} Guardado Exitosamente`
      });
    }).catch( err => {
      console.log(err);
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
