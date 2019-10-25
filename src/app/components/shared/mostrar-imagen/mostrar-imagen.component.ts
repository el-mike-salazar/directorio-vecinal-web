import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mostrar-imagen',
  templateUrl: './mostrar-imagen.component.html',
  styleUrls: ['./mostrar-imagen.component.css']
})
export class MostrarImagenComponent implements OnInit {

  @Input() rutaImagen;
  @Input() nombreImagen;

  constructor() { }

  ngOnInit() {}

}
