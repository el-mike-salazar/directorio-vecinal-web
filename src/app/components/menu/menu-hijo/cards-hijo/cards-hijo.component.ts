import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/services/menu.service';
import { MenuService } from '../../../../services/menu.service';


@Component ({
  selector: 'app-cards-hijo',
  templateUrl: './cards-hijo.component.html',
  styleUrls: ['./cards-hijo.component.css']
})
export class CardsHijoComponent implements OnInit {

  cards: Card[];

  constructor(private route: ActivatedRoute, private menuService: MenuService) {
    this.route.params.subscribe(params => {
      this.cards = this.menuService.getCardsHijo();
      const id = params;
      const menu = this.cards = this.menuService.getCardsHijo();
      this.fnHijo(id, menu);
    });
  }

  ngOnInit() {
  }

  fnHijo(id, menu) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < menu.length; i++) {
      if (id.id === menu[i].id) {
        this.cards = menu[i].mnHi;
      }
    }
  }
}
