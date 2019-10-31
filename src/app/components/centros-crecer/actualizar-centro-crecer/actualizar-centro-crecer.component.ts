import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CentrosCrecerService } from '../../../services/centros-crecer.service';
import { CCrecerModel } from '../../../models/CentroCrecer.model';
import Swal from 'sweetalert2';
import { MapaComponent } from '../../shared/mapa/mapa.component';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-actualizar-centro-crecer',
  templateUrl: './actualizar-centro-crecer.component.html',
  styleUrls: ['./actualizar-centro-crecer.component.css']
})
export class ActualizarCentroCrecerComponent implements OnInit {

  @Input() paquetito: any;
  cCrecer: CCrecerModel[] = [];
  @Output() salida = new EventEmitter();

  @ViewChild( MapaComponent, {static: true}) child: MapaComponent;
   lng: any;
   lat: any;


  img: any;
  selectedFile: File = null;

  // tslint:disable-next-line: variable-name
  constructor( private _centrosCrecerService: CentrosCrecerService) {}

  centro: CCrecerModel = new CCrecerModel();

  ngOnInit() {
    this.centro  = {
      strNombre: this.paquetito.data.strNombre,
      strDireccion: this.paquetito.data.strDireccion,
      strColonia: this.paquetito.data.strColonia,
      strDelegacion: this.paquetito.data.strDelegacion,
      strImagen: this.paquetito.data.strImagen,
      nmbCodigoPostal: this.paquetito.data.nmbCodigoPostal,
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
   this.paquetito.actualizarCentroCrecerComponent = false;
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
    fd.append('strNombre' , this.centro.strNombre);
    fd.append('fltLongitud', this.centro.fltLongitud);
    fd.append('fltLatitud', this.centro.fltLatitud);
    fd.append('strDireccion', this.centro.strDireccion);
    fd.append('strColonia', this.centro.strColonia);
    fd.append('strDelegacion', this.centro.strDelegacion);
    fd.append('strTelefono', this.centro.strTelefono);
    fd.append('nmbCodigoPostal', this.centro.nmbCodigoPostal);
    if (this.selectedFile !== null) {
      fd.append('strImagen', this.selectedFile, this.selectedFile.name);
    }

    this._centrosCrecerService.putCentroCrecer(this.paquetito.data._id, fd).then( data => {

        Toast.fire({
          type: 'success',
          title: `¡La información del ${this.centro.strNombre} actualizado exitosamente!`
        });

        this._centrosCrecerService.getCentrosCrecer().then( cCrecer => {
          this.cCrecer = cCrecer.centroC;
          this.salida.emit(this.cCrecer);
          this.regresarCatalogo();
        }).catch(err => {
          console.log(err);
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
