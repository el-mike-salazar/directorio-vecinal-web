import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/services/menu.service';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-cards-padre',
  templateUrl: './cards-padre.component.html',
  styleUrls: ['./cards-padre.component.css']
})
export class CardsPadreComponent implements OnInit {

  cards: Card[];
  // tslint:disable-next-line: variable-name
  constructor( private _rutaHijo: Router, private menuService: MenuService ) {

  }

  ngOnInit() {
    this.cards = this.menuService.getCardsHijo();
  }

  toChild(id) {
    this._rutaHijo.navigate(['/menu-hijo' + '/' + id]);
  }
}
