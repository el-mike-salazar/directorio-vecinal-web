import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-map-editar-centro',
  templateUrl: './map-editar-centro.component.html',
  styleUrls: ['./map-editar-centro.component.css']
})
export class MapEditarCentroComponent implements OnInit {

  @Input() paquetito;
  @Input() lat = null;
  @Input() lng = null;

  onChoseLocation(event) {

    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }


  constructor() { }

  ngOnInit() {
    this.lat = this.paquetito.data.fltLatitud;
    this.lng = this.paquetito.data.fltLongitud;
  }

}
