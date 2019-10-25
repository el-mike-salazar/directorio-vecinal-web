import { Component, OnInit, Input } from '@angular/core';
import { infoCard, InfoCardService } from '../../../services/info-card.service';


@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {

  @Input() idCard;
  infoCards: infoCard[];

  constructor( private info: InfoCardService) { }

  ngOnInit() {
    this.infoCards = this.info.getInfoCard();
  }

}
