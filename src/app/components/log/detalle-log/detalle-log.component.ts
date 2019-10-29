import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-detalle-log',
  templateUrl: './detalle-log.component.html',
  styleUrls: []
})
export class DetalleLogComponent implements OnInit {

  admin: any = {};
  @Output() salida = new EventEmitter();
  @Input() paquetito: any;

  // tslint:disable-next-line: variable-name
  constructor( private _activatedRoute: ActivatedRoute, private _adminsLogService: LogService) {this._activatedRoute.params.subscribe(params => {
    this.admin = _adminsLogService.getOnlyAdminLog(params.id);
    });
  }

  ngOnInit() {
    this.admin = this.paquetito.data;
    this.admin.strRequest = JSON.parse(this.paquetito.data.strRequest);
  }

  ngClick() {
    this.paquetito.expree = false;
    this.salida.emit(this.paquetito.expree);
  }

}
