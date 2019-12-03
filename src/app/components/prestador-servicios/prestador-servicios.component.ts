import { Component} from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-prestadores-servicios',
  templateUrl: './prestador-servicios.component.html',
  styleUrls: ['./prestador-servicios.component.css']
})
export class PrestadorServiciosComponent {

  usuario: UsuarioModel;
  usuarios: UsuarioModel[] = [];

  paquetito = {
    actualizarPrestadorServiciosComponent: false,
    tablaPrestadorServiciosComponent: true,
    data: {}
  };

  constructor() { }

  actPrestador(pServicios) {
    this.usuarios = pServicios;
  }

}
