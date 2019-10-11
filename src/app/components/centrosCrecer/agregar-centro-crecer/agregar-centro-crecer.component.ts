import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-centro-crecer',
  templateUrl: './agregar-centro-crecer.component.html',
  styleUrls: ['./agregar-centro-crecer.component.css']
})
export class AgregarCentroCrecerComponent implements OnInit {

  forma: FormGroup;

  constructor( private _router: Router) {

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


  //Obtiene los datos del formulario, si el formulario no es valido con sus campos no puede guardar los datos(boton GUARDAR)
  saveData() {
      console.log(this.forma.value);
  }

  ngOnInit() {
  }


//Regresa al catalogo de   Centros Crecer (boton CANCELAR)
  regresarCatalogo() {
    this._router.navigate(['/catalogoCentros']);
  }
}
