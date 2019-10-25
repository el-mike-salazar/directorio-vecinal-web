import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admins-log',
  templateUrl: './admins-log.component.html',
  styleUrls: []
})
export class AdminsLogComponent implements OnInit {

  paquetito = {
    expree: false,
    data: Array
  };

  ngClick(event) {
    this.paquetito.expree = event.expree;
  }

  ngClickRegreso(event) {
    this.paquetito.expree = event;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
