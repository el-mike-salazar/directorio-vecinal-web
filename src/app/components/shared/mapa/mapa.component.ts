import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  
  @Input() paquetito;
  @Input() lat = 21.878684307210808;
  @Input() lng = -102.29706219929807;

  @Input() marcadores: Marcador[];

  posicionActual: Marcador = new Marcador();

  @Output() salida = new EventEmitter();

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;

    let marcador: Marcador = new Marcador();

    marcador.fltLongitud = event.coords.lng;
    marcador.fltLatitud = event.coords.lat;

    this.salida.emit(marcador);
  }

  constructor() {
    this.obtenerPosicionActual();
  }

  ngOnInit() {
    if (this.paquetito) {
      this.lat = this.paquetito.data.fltLatitud;
      this.lng = this.paquetito.data.fltLongitud;
    }
  }

  obtenerPosicionActual() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.posicionActual.strNombre = 'Posición actual';
        this.posicionActual.fltLongitud = this.lng;
        this.posicionActual.fltLatitud = this.lat;
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
