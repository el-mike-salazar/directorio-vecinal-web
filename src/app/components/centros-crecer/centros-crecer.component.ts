import { Component } from '@angular/core';
import { CCrecerModel } from 'src/app/models/CentroCrecer.model';

@Component({
  selector: 'app-centros-crecer',
  templateUrl: './centros-crecer.component.html',
  styleUrls: ['./centros-crecer.component.css']
})
export class CentrosCrecerComponent {

  centro: CCrecerModel;
  cCrecer: CCrecerModel[] = [];

  paquetito = {
    actualizarCentroCrecerComponent: false,
    tablaCentrosCrecerComponent: true,
    data: {}
  };


  constructor() {
  }

  actCCrecer(cCrecer) {
    this.cCrecer = cCrecer;
  }

}
