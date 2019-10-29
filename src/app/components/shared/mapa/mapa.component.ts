import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  
  @Input() paquetito;
  @Input() lat = 21.878684307210808;
  @Input() lng = -102.29706219929807;

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  constructor() {

  }

  ngOnInit() {

    if (this.paquetito) {
      this.lat = this.paquetito.data.fltLatitud;
      this.lng = this.paquetito.data.fltLongitud;
    }
  }

}
