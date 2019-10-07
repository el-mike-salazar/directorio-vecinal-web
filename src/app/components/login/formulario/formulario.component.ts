import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor( private _route: Router ) { }

  ngOnInit() {
    // Swal.fire({
    //   title: 'Error!',
    //   text: 'hola pakito',
    //   type: 'error',
    //   confirmButtonText: 'Cool'
    // });
  }

  toMenu() {
    console.log('boton funcionando');
    this._route.navigate(['/menu']);
  }

}
