import { Component } from '@angular/core';
import { CCrecerModel } from 'src/app/models/cCrecer.model';

@Component({
  selector: 'app-catalogo-centros-crecer',
  templateUrl: './catalogo-centros-crecer.component.html',
  styleUrls: ['./catalogo-centros-crecer.component.css']
})
export class CatalogoCentrosCrecerComponent {

  centro: CCrecerModel;
  cCrecer: CCrecerModel[] = [];

  paquetito = {
    editarCentroCrecerComponent: false,
    tablaCentrosCrecerComponent: true,
    data: {}
  };


  constructor() {
  }

  actCCrecer(cCrecer) {
    this.cCrecer = cCrecer;
  }

}
