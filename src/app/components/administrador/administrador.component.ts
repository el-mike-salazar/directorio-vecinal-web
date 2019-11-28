import { Component } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./adminmistrador.component.css']
})
export class AdministradorComponent {

  paquetito = {
    tablaAdministradorComponent: true,
    actualizarAdministradorComponent: false,
    data: {},
    arrayAdmin: []
  };

  constructor() { }
}
