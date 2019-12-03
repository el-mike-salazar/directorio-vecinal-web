import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mostrar-imagenes',
  templateUrl: './mostrar-imagenes.component.html',
  styleUrls: ['./mostrar-imagenes.component.css']
})
export class MostrarImagenesComponent implements OnInit {

  @Input() rutaImagen;
  @Input() imagenes: [] = [];

  constructor() { }

  ngOnInit() {
  }

}
