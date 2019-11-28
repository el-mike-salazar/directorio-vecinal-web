import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actualizar-categoria-api',
  templateUrl: './actualizar-categoria-api.component.html',
  styleUrls: ['./actualizar-categoria-api.component.css']
})
export class ActualizarCategoriaApiComponent implements OnInit {

  @Input() paquetito: any;


   actualizaDato: any;
  @Output() salida = new EventEmitter();

  constructor( ) { }

  ngOnInit() {


  }

}


