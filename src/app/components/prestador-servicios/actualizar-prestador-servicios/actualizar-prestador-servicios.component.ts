import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { PrestadorService } from '../../../services/prestador.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-actualizar-prestador-servicios',
  templateUrl: './actualizar-prestador-servicios.component.html',
  styleUrls: ['./actualizar-prestador-servicios.component.css']
})
export class ActualizarPrestadorServiciosComponent implements OnInit {


  @Input() paquetito: any;
  prestadorS: UsuarioModel[] = [];
  @Output() salida = new EventEmitter();




  img: any;
  selectedFile: File = null;

  constructor( private _prestadorService: PrestadorService) { }

  prestador: any;

  ngOnInit() {

    this.paquetito.data.arrRol = '5da8cdcdba5cd22b58036a23';
    this.prestador  = {
    strNombre: this.paquetito.data.strNombre,
    strPrimerApellido: this.paquetito.data.strPrimerApellido,
    strSegundoApellido: this.paquetito.data.strSegundoApellido,
    strTelefono: this.paquetito.data.strTelefono,
    strCorreo: this.paquetito.data.strCorreo,
    strColonia: this.paquetito.data.strColonia,
    strCalle: this.paquetito.data.strCalle,
    nmbCodigoPostal: this.paquetito.data.nmbCodigoPostal,
    strImagen: this.paquetito.data.strImagen,
    arrRol: this.paquetito.data.arrRol
    };
    console.log(this.prestador);
  }

  regresarCatalogo() {
    this.paquetito.actualizarPrestadorServiciosComponent = false;
    this.paquetito.tablaPrestadorServiciosComponent = true;
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

  actualizarPS() {

    const fd = new FormData();
    fd.append('strNombre', this.prestador.strNombre);
    fd.append('strPrimerApellido', this.prestador.strPrimerApellido);
    fd.append('strSegundoApellido', this.prestador.strSegundoApellido);
    fd.append('strCorreo', this.prestador.strCorreo);
    fd.append('strColonia', this.prestador.strColonia);
    fd.append('strTelefono', this.prestador.strTelefono);
    fd.append('nmbCodigoPostal', this.prestador.nmbCodigoPostal);
    fd.append('strCalle', this.prestador.strCalle);
    fd.append('strPassword', this.prestador.strPassword);
    fd.append('arrRol', this.prestador.arrRol);

    if (this.selectedFile !== null) {
      fd.append('strImagen', this.selectedFile, this.selectedFile.name);
    }


    this._prestadorService.putPrestadorServicios(this.paquetito.data._id, fd).then( data => {

        Toast.fire({
          type: 'success',
          title: `¡La información de ${this.prestador.strNombre} actualizado exitosamente!`
        });

        this._prestadorService.getPrestadorServicios().then( prestadorS => {
          this.prestadorS = prestadorS;
          this.salida.emit(this.prestadorS);
          this.regresarCatalogo();
        }).catch(err => {
          console.log(err);
        });
    }).catch( err => {

      console.log(err);

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
      if (errores.strColonia) {
        Toast.fire({
          type: 'error',
          title: errores.strColonia.message
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
          title: errores.nmbCodigoPostal.message
        });
      }

    });

  }

}
