import { Component, OnInit } from '@angular/core';
import { CentrosCrecerService } from '../../../services/centros-crecer.service';
import { CCrecerModel } from '../../../models/CentroCrecer.model';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.css']
})
export class GeolocalizacionComponent implements OnInit {

  centrosCrecer: CCrecerModel[] = [];
  marcadores: Marcador[] = [];

  constructor(private centrosCrecerService: CentrosCrecerService) { }

  ngOnInit() {

    this.centrosCrecerService.getCentrosCrecer().then( (datos: any) => {
      this.centrosCrecer =  datos.cont.ccDB;

      this.centrosCrecer.forEach(cc => {
        const marcador = new Marcador();

        marcador.strNombre = cc.strNombre;
        marcador.fltLatitud = cc.fltLatitud;
        marcador.fltLongitud =  cc.fltLongitud;

        this.marcadores.push(marcador);

      });

    }).catch( (err: any) => {
      console.log(err);
    });
  }

  obtenerDistancias(event){
    this.marcadores.forEach(marcador => {
        let d = this.calcularDistancia(event, marcador);
        console.log(marcador.strNombre, d);
    });
  }

  calcularDistancia(p1: Marcador, p2: Marcador) {
    if (!p1 || !p2) {
      return 0;
    }
    const R = 6371000; // radio de la tierra
    const dLat = (p2.fltLatitud - p1.fltLatitud) * Math.PI / 180;
    const dLon = (p2.fltLongitud - p1.fltLongitud) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.fltLatitud * Math.PI / 180) * Math.cos(p2.fltLatitud * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Math.round(d);
  }

}

class Marcador {
  strNombre: string;
  fltLatitud: number;
  fltLongitud: number;
  nmbDistancia: string;
}
