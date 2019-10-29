import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/Categoria.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];

  paquetito = {
    formularioComponent: true,
    formularioEditarComponent: false,
    data: {}
  };

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit() {}

  actualizarCat(categorias) {
    this.categorias = categorias;
  }

  actPaquetito(paquetito) {
  this.paquetito = paquetito;

  }

}
