import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { OficiosService } from '../../../services/oficios.service';
import { OficiosModel } from 'src/app/models/oficiosModel';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-tabla-oficio',
  templateUrl: './tabla-oficio.component.html',
  styleUrls: ['./tabla-oficio.component.css']
})

export class TablaOficioComponent implements OnInit {

  @Input() paquetito: any;
  @Input() Oficios: OficiosModel[] = [];
  @Output() salida = new EventEmitter();

  constructor( private oficiosService: OficiosService, private router: Router ) { 
  }

  ngOnInit() {
  }

  obtenerOficios() {
    this.oficiosService.obtenerOficios(this.paquetito.categoria._id).then( (datos: any) => {
      this.Oficios = datos.cont.oficios;
    }).catch( err => {

      if (err.error.cont.count === 0) {
        Toast.fire({
          type: 'error',
          title: err.error.msg
        });
      } else {
        this.router.navigate(['/categoria']);
      }
      this.Oficios = [];
    });
  }

  eliminar( oficio: OficiosModel ) {
    Swal.fire({
      title: `Estas a punto de eliminar la categoría: ${oficio.strNombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.oficiosService.eliminarOficio(this.paquetito.categoria._id, oficio._id).then(resp => {
          Toast.fire({
            type: 'success',
            title: `${oficio.strNombre} eliminado Exitosamente`
          });
          this.obtenerOficios();
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }

  seleccionar(oficio: OficiosModel) {
    this.paquetito.data = oficio;
    this.paquetito.registrarOficioComponent = false;
    this.paquetito.actualizarOficioComponent = true;
  }

}
