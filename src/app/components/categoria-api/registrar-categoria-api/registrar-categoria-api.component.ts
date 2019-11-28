import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-registrar-categoria-api',
  templateUrl: './registrar-categoria-api.component.html',
  styleUrls: ['./registrar-categoria-api.component.css']
})
export class RegistrarCategoriaApiComponent implements OnInit {

  @Input() paquetito: any;

  constructor() { }

  ngOnInit() {
  }

}
