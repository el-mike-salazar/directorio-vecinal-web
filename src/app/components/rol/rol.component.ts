import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent {

  roles: RolComponent[] = [];

  paquetito = {
    actualizarRolComponent: false,
    registrarRolComponent: true,
    apiComponent: false,
    tablaRolesComponent: true,
    data: {}
  };


  constructor() {
  }

  actualizarRol(roles) {
    this.roles = roles;
  }

  actPaquetito(paquetito) {
    this.paquetito = paquetito;
  }
  regresarRol() {
    this.paquetito.registrarRolComponent = true;
    this.paquetito.tablaRolesComponent = true;
    this.paquetito.apiComponent = false;
  }


}
