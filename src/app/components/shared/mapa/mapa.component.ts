import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  
  @Input() paquetito;
  @Input() lat = 0;
  @Input() lng = 0;

  latAct = 0;
  lngAct = 0;

  @Input() marcadores: Marcador[];

  posicionSelec: Marcador = new Marcador();
  url = {
    url: '/assets/images/miposicion.png',
    scaledSize: {
      width: 20,
      height: 20
    }
  };

  urlCC = {
    url: '/assets/images/centrocrecer.png',
    scaledSize: {
      width: 40,
      height: 40
    }
  };

  urlPX = {
    url: '/assets/images/seleccion.png',
    scaledSize: {
      width: 20,
      height: 20
    }
  }

  @Output() salida = new EventEmitter();

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.posicionSelec.fltLatitud = this.lat;
    this.posicionSelec.fltLongitud = this.lng;

    let marcador: Marcador = new Marcador();

    marcador.fltLongitud = event.coords.lng;
    marcador.fltLatitud = event.coords.lat;

    this.salida.emit(marcador);
  }

  constructor() {
    this.obtenerPosicionActual();
  }

  ngOnInit() {}

  selecPosAct() {
    this.posicionSelec.fltLatitud = this.latAct;
    this.posicionSelec.fltLongitud = this.lngAct;
    this.lng = this.lngAct;
    this.lat = this.latAct;
  }

  obtenerPosicionActual() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.latAct = position.coords.latitude;
        this.lngAct = position.coords.longitude;

        this.posicionSelec.strNombre = 'Posición actual';
        this.posicionSelec.fltLatitud = this.paquetito ? this.paquetito.data.fltLatitud : this.latAct;
        this.posicionSelec.fltLongitud = this.paquetito ? this.paquetito.data.fltLongitud : this.lngAct;

        this.lat = this.posicionSelec.fltLatitud;
        this.lng = this.posicionSelec.fltLongitud;
      });
    }
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
