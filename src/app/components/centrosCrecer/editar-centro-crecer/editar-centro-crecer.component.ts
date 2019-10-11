import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CentrosCrecerService } from '../../../services/centros-crecer.service';

@Component({
  selector: 'app-editar-centro-crecer',
  templateUrl: './editar-centro-crecer.component.html',
  styleUrls: ['./editar-centro-crecer.component.css']
})
export class EditarCentroCrecerComponent implements OnInit {

  centro: any = {};

  forma: FormGroup;

  constructor( private _router: Router, private _centroscrecerService: CentrosCrecerService  ) {

    this.forma = new FormGroup({
      'nombre' : new FormControl( '', Validators.required),
      'telefono' : new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'colonia': new FormControl('', Validators.required),
      'delegacion': new FormControl('', Validators.required),
      'codigoPostal': new FormControl('', Validators.required),
      'latitud': new FormControl('', Validators.required),
      'longitud': new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  updateData() {
    console.log(this.centro);
  }

  returnToCatalogo() {
    this._router.navigate(['/catalogoCentros']);
  }

}
