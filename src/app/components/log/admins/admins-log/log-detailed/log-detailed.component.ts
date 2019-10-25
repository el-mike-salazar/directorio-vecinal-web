import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminsLogService } from 'src/app/services/admins-log.service';

@Component({
  selector: 'app-log-detailed',
  templateUrl: './log-detailed.component.html',
  styleUrls: []
})
export class LogDetailedComponent implements OnInit {

  admin: any = {};
  @Output() salida = new EventEmitter();
  @Input() paquetito: any;

  // tslint:disable-next-line: variable-name
  constructor( private _activatedRoute: ActivatedRoute, private _adminsLogService: AdminsLogService) {
                //  this.admin= this.dataTableAdmins.admins;
                //  console.log(this.admin);
                this._activatedRoute.params.subscribe(params => {
                    this.admin = _adminsLogService.getOnlyAdminLog(params['id']);
                  });
               }

  ngOnInit() {
    this.admin = this.paquetito.data;
    console.log(this.admin);
  }

  ngClick() {
    this.paquetito.expree = false;
    this.salida.emit(this.paquetito.expree);
  }

}
