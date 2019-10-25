import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cargar-imagen',
  templateUrl: './cargar-imagen.component.html',
  styleUrls: ['./cargar-imagen.component.css']
})
export class CargarImagenComponent implements OnInit {

  @Output() salida = new EventEmitter();
  nombreImg = 'Seleccione una Imagen';
  selectedFile: File = null;

  constructor() { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = null;
    this.selectedFile = event.target.files[0] as File;
    this.nombreImg = this.selectedFile.name;
    this.salida.emit(this.selectedFile);
  }

}
