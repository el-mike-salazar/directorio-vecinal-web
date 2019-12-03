import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cargar-imagenes',
  templateUrl: './cargar-imagenes.component.html',
  styleUrls: ['./cargar-imagenes.component.css']
})
export class CargarImagenesComponent implements OnInit {

  @Output() salida = new EventEmitter();
  nombreImg = 'Seleccione sus Imagenes';
  selectedFiles: File[] = null;

  constructor() { }

  ngOnInit() {
  }

  mandaInfoPapa(event) {
    console.log(event.target.files);
    this.selectedFiles = null;
    this.selectedFiles = event.target.files as File[];
    this.nombreImg = `${event.target.files.length} imágenes seleccionadas`;
    this.salida.emit(this.selectedFiles);
  }

}
