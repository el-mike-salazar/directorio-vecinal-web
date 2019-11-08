import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RolService } from '../../../services/rol.service';
import Swal from 'sweetalert2';
import { Rol } from 'src/app/models/Rol.model';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-actualizar-rol',
  templateUrl: './actualizar-rol.component.html',
  styleUrls: ['./actualizar-rol.component.css']
})
export class ActualizarRolComponent implements OnInit {

  @Input() paquetito;
  @Output() salirEditar = new EventEmitter();

  rol: Rol = new Rol();
  roles: Rol[];

  @Input() set rolPer(value: any) {

    this.rol = new Rol();
    this.rol.strNombre = value.strNombre;
    this.rol.strDescripcion = value.strDescripcion;
    this.rol.arrApi = value.arrApi;
    this.rol._id = value._id;

  }


  constructor(private rolService: RolService) { }

  ngOnInit() {
  }

  cancelar() {
    this.paquetito.registrarRolComponent = true;
    this.paquetito.tablaRolesComponent = true;
    this.paquetito.apiComponent = false;
    this.paquetito.tablaRolesComponent = true;
  }

  actualizarRoles() {

    this.rolService.obtenerRoles().then(rol => {

      this.roles = rol.cont.roles;
      this.salirEditar.emit(this.roles);
      this.cancelar();
    }).catch(err => {
      const errores = err.error;
      Toast.fire({
        type: 'error',
        title: errores.msg
      });
    });
  }

  actualizarRol() {
    this.rol = {
      _id : this.rol._id,
      strNombre : this.rol.strNombre,
      strDescripcion : this.rol.strDescripcion,
      arrApi : this.rol.arrApi
    };

    this.rolService.modificarRol(this.paquetito.data._id, this.rol).then(data => {
      Toast.fire({
        type: 'success',
        title: `¡La información del ${this.rol.strNombre} actualizado exitosamente!`
      });
      this.actualizarRol();
    }).catch(err => {
      const errores = err.error.cont.err.errors;
      if (errores.strNombre) {
        Toast.fire({
          type: 'error',
          title: errores.strNombre.message
        });
      }
      if (errores.strDescripcion) {
        Toast.fire({
          type: 'error',
          title: errores.strDescripcion.message
        });
      }
    });
  }

}
