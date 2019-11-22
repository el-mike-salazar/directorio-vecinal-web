import { Component, OnInit, Input } from '@angular/core';
import { AdministradorService } from '../../../services/administrador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../../models/usuario.model';

@Component({
  selector: 'app-tabla-administrador',
  templateUrl: './tabla-administrador.component.html',
  styleUrls: ['./tabla-administrador.component.css']
})
export class TablaAdministradorComponent implements OnInit {

  admins: UsuarioModel[] = [];
  @Input() paquetito: any;

  constructor( private adminService: AdministradorService,  private router: Router) { }

  ngOnInit() {
    this.adminService.getAdmin().subscribe((datos: any) => {
      this.paquetito.arrayAdmin = datos.cont.persona;
    });
  }

  mostrarAct(admin) {
    this.paquetito.data = admin;
    this.paquetito.actualizarAdministradorComponent = true;
    this.paquetito.tablaAdministradorComponent = false;
  }

  // tslint:disable-next-line: variable-name
  eliminarAdmin(_id: string, strNombre: string) {
    // tslint:disable-next-line: no-shadowed-variable
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000
     });
    console.log(_id);
    Swal.fire({
      title: 'Estas a punto de eliminar un Administrador',
      text: `¿Estas realmente seguro que quieres eliminar ${strNombre}?`,
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    });
    Toast.fire({
      type: 'success',
      title: `Se ha eliminado exitosamente a ${strNombre}`
    });
}



}
