import { Component, OnInit } from '@angular/core';
import { RutasApiModel } from 'src/app/models/rutas-api.model';

@Component({
  selector: 'app-categoria-api',
  templateUrl: './categoria-api.component.html',
  styleUrls: ['./categoria-api.component.css']
})
export class CategoriaApiComponent implements OnInit {

  Apis: RutasApiModel[] = [];

  paquetito: any = {
    actualizarCategoriaApiComponent: false,
    registrarCategoriaApiComponent: true,
    tablaCategoriaApiComponent: true,
    data: {},
    pos: 0
  }

  constructor() { }

  ngOnInit() {
  }

}
