import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rol } from '../../../models/Rol.model';
import Swal from 'sweetalert2';
import { RolService } from '../../../services/rol.service';
import { HttpClient } from '@angular/common/http';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-registrar-rol',
  templateUrl: './registrar-rol.component.html',
  styleUrls: ['./registrar-rol.component.css']
})
export class RegistrarRolComponent implements OnInit {

  // Creación de Input
  @Input() paquetito: any;
  @Output() salidaReg = new EventEmitter();


  rol: Rol = new Rol();
  roles: Rol[];
  errores: any;



  constructor(private rolService: RolService, private http: HttpClient) { }

  ngOnInit() {
  }


  registrarRol() {
    this.rol = {
      _id: null,
      strNombre : null,
      strDescripcion : null,
      arrApi : null
    };

    this.rolService.registrarRol(this.rol).then(data => {
      Toast.fire({
        type: 'success',
        title: `${this.rol.strNombre} guardado Exitosamente`
      });

    }).catch(err => {
      Toast.fire({
        type: 'error',
        title: err.error.cont.err
      });
    });
  }

  actualizarRol() {
    this.rolService.obtenerRoles().then(rol => {

      this.roles = rol.cont.roles;
      this.salidaReg.emit(this.roles);
      this.paquetito.registrarRolComponent = false;
      setTimeout(() => {

        this.paquetito.registrarRolComponent = true;
      }, 0);
    }).catch(err => {
      const errores = err.error;
      Toast.fire({
        type: 'error',
        title: errores.msg
      });
    });
  }


}

