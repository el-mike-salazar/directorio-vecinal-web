import { Component } from '@angular/core';
import { NegocioModel } from '../../models/negocio.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PrestadorService } from '../../services/prestador.service';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css']
})
export class NegocioComponent {

  negocio: NegocioModel;
  negocios: NegocioModel[] = [];

  paquetito = {
    actualizarNegocioComponent: false,
    tablaNegociosComponent: true,
    prestador: null,
    data: {}
  };

  constructor( private _prestadorService: PrestadorService, private router: ActivatedRoute) {


    this._prestadorService.getPrestadorServiciosId( router.snapshot.params.id).then( (prestador: any) => {
      this.paquetito.prestador = prestador.cont.persona[0];
    });
  }

  actNegocio(n) {
    this.negocios = n;
  }


}
