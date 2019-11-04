import { Component, OnInit } from '@angular/core';
import { OficiosModel } from 'src/app/models/oficiosModel';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';
import { Categoria } from '../../models/Categoria.model';
import { OficiosService } from 'src/app/services/oficios.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-oficios',
  templateUrl: './oficios.component.html',
  styleUrls: ['./oficios.component.css']
})
export class OficiosComponent implements OnInit {

  Oficios: OficiosModel[] = [];
  categoria: Categoria = new Categoria();

  paquetito: any = {
    registrarOficioComponent: true,
    actualizarOficioComponent: false,
    categoria: {},
    data: {}
  };

  constructor(private oficiosService: OficiosService, private activeRoute: ActivatedRoute, private categoriasService: CategoriasService, private router: Router) {
    this.categoriasService.obtenerCategoria(this.activeRoute.snapshot.params.id).then( (categoria: any) => {
      this.categoria = categoria.cont.categoria[0];
      this.paquetito.categoria = this.categoria;
      this.obtenerOficios();

    }).catch( (err => {
        this.router.navigate(['/categoria']);
        Toast.fire({
          type: 'error',
          title: err.error.msg
        });
    }));
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

  ngOnInit() {

  }


  actualizarOficio( oficio: any ) {
    this.Oficios = oficio;
  }

  actualizarPaquetito( paquetito: any ) {
    this.paquetito = paquetito;
  }

}
