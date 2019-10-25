import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-map-agregar-centro',
  templateUrl: './map-agregar-centro.component.html',
  styleUrls: ['./map-agregar-centro.component.css']
})
export class MapAgregarCentroComponent implements OnInit {

  @Input() lat = 21.878684307210808;
  @Input() lng = -102.29706219929807;

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  constructor() {

  }

  ngOnInit() {}


}
