import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map-editar-centro',
  templateUrl: './map-editar-centro.component.html',
  styleUrls: ['./map-editar-centro.component.css']
})
export class MapEditarCentroComponent implements OnInit {

  @Input() lat = 21.878684307210808;
  @Input() lng = -102.29706219929807;

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }


  constructor() { }

  ngOnInit() {
  }

}
