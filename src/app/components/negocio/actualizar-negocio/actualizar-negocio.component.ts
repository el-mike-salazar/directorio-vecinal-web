import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { NegocioModel } from 'src/app/models/negocio.model';
import { NegocioService } from '../../../services/negocio.service';
import { NgForm } from '@angular/forms';
import { MapaComponent } from '../../shared/mapa/mapa.component';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-actualizar-negocio',
  templateUrl: './actualizar-negocio.component.html',
  styleUrls: ['./actualizar-negocio.component.css']
})
export class ActualizarNegocioComponent implements OnInit {

  @Input() paquetito: any;
  usuarioModel: NegocioModel[] = [];
  @Output() salida = new EventEmitter();

  @ViewChild( MapaComponent, {static: true}) child: MapaComponent;
   lng: any;
   lat: any;

  img: any;
  selectedFile: File[] = null;

  constructor(private _negocioService: NegocioService) { }

  negocio: any;

  ngOnInit() {
    this.negocio = {
      strNombre: this.paquetito.data.strNombre,
      fltLatitud: this.paquetito.fltLatitud,
      fltLongitud: this.paquetito.fltLongitud,
      strColonia: this.paquetito.data.strColonia,
      strCalle : this.paquetito.data.strCalle,
      nmbCodigoPostal: this.paquetito.data.nmbCodigoPostal,
      strTelefono: this.paquetito.data.strTelefono,
      strCorreo: this.paquetito.data.strCorreo,
      aJsnCarrusel: this.paquetito.data.aJsnCarrusel
    };
console.log(this.negocio);
    console.log(this.paquetito);
  }

  ngDoCheck(): void {
    this.negocio.fltLatitud = this.child.lat;
    this.negocio.fltLongitud = this.child.lng;
  }

  regresarCatalogo() {
    this.paquetito.actualizarNegocioComponent = false;
    this.paquetito.tablaNegociosComponent = true;
   }

   resetForm( form?: NgForm ) {
     if (form) {
       form.reset();
       this._negocioService.selectNegocio = new NegocioModel();
     }
   }

   onFileSelected(event) {
    this.selectedFile = event;
   }

   actualizarNegocio() {
    const fd = new FormData();
    fd.append('strNombre', this.negocio.strNombre);
    fd.append('fltLongitud', this.negocio.fltLongitud);
    fd.append('fltLatitud', this.negocio.fltLatitud);
    fd.append('strColonia', this.negocio.strColonia);
    fd.append('strTelefono', this.negocio.strTelefono);
    fd.append('nmbCodigoPostal', this.negocio.nmbCodigoPostal);
    fd.append('strCalle', this.negocio.strCalle);

    if (this.selectedFile !== null) {

      // tslint:disable-next-line: prefer-for-of
      for ( let image = 0; image < this.selectedFile.length; image++ ) {
        fd.append(this.selectedFile[image].name, this.selectedFile[image], this.selectedFile[image].name);
      }
    }


    this._negocioService.putNegocio(this.paquetito.data._id, fd).then( data => {

        Toast.fire({
          type: 'success',
          title: `¡El negocio "${this.negocio.strNombre}" fue actualizado exitosamente!`
        });

        this._negocioService.getNegocio().then( neg => {
          this.usuarioModel = neg;
          this.salida.emit(this.usuarioModel);
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
      if (errores.strPrimerApellido) {
        Toast.fire({
          type: 'error',
          title: errores.strPrimerApellido.message
        });
      }
      if (errores.strSegundoApellido) {
        Toast.fire({
          type: 'error',
          title: errores.strSegundoApellido.message
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
      if (errores.nmbCodigoPostal) {
        Toast.fire({
          type: 'error',
          title: errores.intCodigoPostal.message
        });
      }

      });
   }

}

