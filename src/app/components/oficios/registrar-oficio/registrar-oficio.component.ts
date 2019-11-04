import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OficiosModel } from '../../../models/oficiosModel';
import { OficiosService } from '../../../services/oficios.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-registrar-oficio',
  templateUrl: './registrar-oficio.component.html',
  styleUrls: ['./registrar-oficio.component.css']
})
export class RegistrarOficioComponent implements OnInit {

  @Input() paquetito: any;
  @Output() salida = new EventEmitter();
  @ViewChild('forma', { static: true}) forma: NgForm;

  oficio: OficiosModel = new OficiosModel();
  oficios: OficiosModel[] = [];
  errores: any;

  constructor(private oficiosService: OficiosService, private http: HttpClient) {}

  ngOnInit() {
  }

  registrarOficio() {
    this.oficiosService.registrarOficio(this.paquetito.categoria._id, this.oficio).then( data => {
      Toast.fire({
        type: 'success',
        title: `${this.oficio.strNombre} guardado Exitosamente`
      });
      this.actualizarOficios();
    }).catch( err => {

      Toast.fire({
        type: 'error',
        title: err.error.msg
      });
      // Toast.fire({
      //   type: 'error',
      //   title: err.error.cont.err
      // });
    });
  }

  actualizarOficios() {
    this.oficiosService.obtenerOficios(this.paquetito.categoria._id).then(oficios => {
      this.oficios = oficios.cont.oficios;
      this.salida.emit(this.oficios);
      this.paquetito.registrarOficioComponent = false;
      setTimeout(() => {
        this.paquetito.registrarOficioComponent = true;
      }, 0);
    }).catch(err => {
      const errores = err.error;
      Toast.fire({
        type: 'error',
        title: errores.msg
      });
    });
  }

}
