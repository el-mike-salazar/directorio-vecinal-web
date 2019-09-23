import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Swal.fire({
    //   title: 'Error!',
    //   text: 'hola pakito',
    //   type: 'error',
    //   confirmButtonText: 'Cool'
    // });
  }

  

}
