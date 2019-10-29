import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: []
})
export class LogComponent implements OnInit {

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
