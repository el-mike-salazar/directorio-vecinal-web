import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { PrestadorService } from '../../../services/prestador.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-registrar-prestador-servicios',
  templateUrl: './registrar-prestador-servicios.component.html',
  styleUrls: ['./registrar-prestador-servicios.component.css']
})
export class RegistrarPrestadorServiciosComponent implements OnInit {

 img: any;
 selectedFile: File = null;

 constructor( private router: Router,  private _prestadorService: PrestadorService) {
 }

 prestador: UsuarioModel = new UsuarioModel();

 ngOnInit() {}

 regresarCatalogo() {
   this.router.navigate(['/prestadores']);
 }

 resetForm( form?: NgForm ) {
   if (form) {
     form.reset();
     this._prestadorService.seletcPrestador = new UsuarioModel();
   }
 }

 onFileSelected(event) {
  this.selectedFile = event;
 }

 guardarPS() {
   const fd = new FormData();
   fd.append('strNombre', this.prestador.strNombre);
   fd.append('strColonia', this.prestador.strColonia);
   fd.append('strTelefono', this.prestador.strTelefono);
   fd.append('numCodigoPostal', this.prestador.nmbCodigoPostal);
   fd.append('strPrimerApellido', this.prestador.strPrimerApellido);
   fd.append('strSegundoApellido', this.prestador.strSegundoApellido);
   fd.append('strCorreo', this.prestador.strCorreo);
   fd.append('strPassword', this.prestador.strPassword);
   fd.append('strCalle', this.prestador.strCalle);
   fd.append('strCentrocrecer', this.prestador.strCentroCrecer);

   if (this.selectedFile !== null) {
     fd.append('strImagen', this.selectedFile, this.selectedFile.name);
   }

   this._prestadorService.postPrestadorServicios(fd).then( (data: any) => {
    this._prestadorService.getPrestadorServiciosId(data.cont.persona._id);
    this.router.navigate(['/negocios', data.cont.persona._id]);

    Toast.fire({
      type: 'success',
      title: `${this.prestador.strNombre} guardado Exitosamente`
    });

   }).catch( err => {
      console.log(err);
      let errores;

      if (err.error.cont) {
        errores = err.error.cont.err.errors;

        if (errores.strNombre) {
          Toast.fire({
            type: 'error',
            title: errores.strNombre.message `Error nombre`
          });
        }
        if (errores.strImagen) {
          Toast.fire({
            type: 'error',
            title: errores.strImagen.message `Error imagen`
          });
        }
        if (errores.strColonia) {
          Toast.fire({
            type: 'error',
            title: errores.strColonia.message `Error colonia`
          });
        }
        if (errores.strTelefono) {
          Toast.fire({
            type: 'error',
            title: errores.strTelefono.message `Error telefono`
          });
        }
        if (errores.nmbCodigoPostal) {
          Toast.fire({
            type: 'error',
            title: errores.nmbCodigoPostal.message `Error codigo postal`
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

