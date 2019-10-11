import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CentrosCrecerService } from '../../../../services/centros-crecer.service';
import { CCrecerModel } from '../../../../models/cCrecer.model';

@Component({
  selector: 'app-editar-centro-crecer',
  templateUrl: './editar-centro-crecer.component.html',
  styleUrls: ['./editar-centro-crecer.component.css']
})
export class EditarCentroCrecerComponent implements OnInit {

  @Input() paquetito: any;
  
  forma: FormGroup;

  constructor( private _router: Router, private _centrosCrecerService: CentrosCrecerService) {

    
  }

  ngOnInit() {
    this.forma = new FormGroup({
      'nombre' : new FormControl( this.paquetito.data.strNombre, Validators.required),
      'telefono' : new FormControl( this.paquetito.data.strTelefono, Validators.required),
      'direccion': new FormControl ( this.paquetito.data.strDireccion, Validators.required),
      'colonia': new FormControl( this.paquetito.data.strColonia, Validators.required),
      'delegacion': new FormControl( this.paquetito.data.strDelegacion, Validators.required),
      'codigoPostal': new FormControl( this.paquetito.data.intCodigoPostal, Validators.required),
      'latitud': new FormControl( this.paquetito.data.fltLatitud, Validators.required),
      'longitud': new FormControl( this.paquetito.data.fltAltitud, Validators.required),
    });
  }

  updateData() {
  }

  regresar() {
   this.paquetito.editarCentroCrecerComponent = false;
   this.paquetito.tablaCentrosCrecerComponent = true;
  }

  actualizarCC() {
    this._centrosCrecerService.putCentroCrecer()
  }

}
