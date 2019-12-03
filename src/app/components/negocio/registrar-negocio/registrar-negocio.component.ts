import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NegocioService } from '../../../services/negocio.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { NegocioModel } from 'src/app/models/negocio.model';
import { MapaComponent } from '../../shared/mapa/mapa.component';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { PrestadorService } from '../../../services/prestador.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-registrar-negocio',
  templateUrl: './registrar-negocio.component.html',
  styleUrls: ['./registrar-negocio.component.css']
})
export class RegistrarNegocioComponent implements OnInit {

  @ViewChild(MapaComponent, {static: true}) mapa: MapaComponent;
  lng: any;
  lat: any;
  img: any;
  selectedFile: File[] = null;
  prestador: UsuarioModel = new UsuarioModel();

  constructor(private router: Router, private activeRoute: ActivatedRoute,  private _negocioService: NegocioService, private _usuarioService: PrestadorService) {

    this._usuarioService.getPrestadorServiciosId(activeRoute.snapshot.params.id).then( (prestador: any) => {
      this.prestador = prestador.cont.persona[0];
    }).catch( err => {
        router.navigate(['prestadores']);
    });
   }

  negocio: NegocioModel = new NegocioModel();

  ngOnInit(): void {
    this.lng = this.mapa.lng;
    this.lat = this.mapa.lat;
  }

  ngDoCheck(): void {
    this.negocio.fltLatitud = this.mapa.lat;
    this.negocio.fltLongitud = this.mapa.lng;
  }

  regresarCatalogo() {
    this.router.navigate(['/negocios', this.prestador._id]);
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

  guardarNegocio() {
    const fd = new FormData();
    fd.append('strNombre', this.negocio.strNombre);
    fd.append('fltLongitud', this.negocio.fltLongitud);
    fd.append('fltLatitud', this.negocio.fltLatitud);
    fd.append('strColonia', this.negocio.strColonia);
    fd.append('strTelefono', this.negocio.strTelefono);
    fd.append('nmbCodigoPostal', this.negocio.nmbCodigoPostal);
    fd.append('strCalle', this.negocio.strCalle);

    if (this.selectedFile !== null) {
      for ( let image = 0; image < this.selectedFile.length; image++ ) {
        fd.append('aJsnCarrusel', this.selectedFile[image], this.selectedFile[image].name);
      }
    }

    this._negocioService.postNegocio(this.prestador._id, fd).then( data => {
      this.router.navigate(['/prestadores']);
      Toast.fire({
        type: 'success',
        title: `El negocio "${this.negocio.strNombre}" fue guardado Exitosamente`
      });
    }).catch( err => {
      let errores;
      console.log(err);


      if (err.error.cont) {

        errores = err.error.cont.err.errors;

        if (errores.strNombre) {
          console.log( errores.strNombre );

          Toast.fire({
            type: 'error',
            title: errores.strNombre.message
          });
        }
        if (errores.aJsnCarrusel) {
          Toast.fire({
            type: 'error',
            title: errores.aJsnCarrusel.message
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
        if (errores.strCalle) {
          Toast.fire({
            type: 'error',
            title: errores.strCalle.message
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
