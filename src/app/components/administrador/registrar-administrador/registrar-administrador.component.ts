import { Component, OnInit, Input} from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../../models/usuario.model';
import { SummaryResolver } from '@angular/compiler';
import { CentrosCrecerService } from '../../../services/centros-crecer.service';
// import { CCrecerModel } from 'src/app/models/cCrecer.model';
import { AdministradorService } from 'src/app/services/administrador.service';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-registrar-administrador',
  templateUrl: './registrar-administrador.component.html',
  styleUrls: ['./registrar-administrador.component.css']
})
export class RegistrarAdministradorComponent implements OnInit {

// centros: CCrecerModel;

  constructor(private router: Router, private centrosCrecerSevice: CentrosCrecerService, private adminService: AdministradorService) { }

  forma: FormGroup;

  admin: any = {
    strNombre: null,
    strPrimerApellido: null,
    strSegundoApellido: null,
    strTelefono: null,
    strCorreo: null,
    strPassword: null,
    strPasswordConfirm: null,
    strColonia: null,
    strDelegacion: null,
    nmbCodigoPostal: null,
    strCalle: null,
    strCentroCrecer: null
  };

  ngOnInit() {
    // this.centrosCrecerService.getCentrosCrecer().subscribe((datos: any) => {
    //   this.centros = datos.cont.ccDB;
    //  });

  }


  guardarAdmin(forma: any) {

    Swal.fire({
      title: 'Procesando solicitud',
      html: 'Enviando correo...',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const fd = new FormData();
    fd.append('strNombre', this.admin.strNombre);
    fd.append('strPrimerApellido', this.admin.strPrimerApellido);
    fd.append('strSegundoApellido', this.admin.strSegundoApellido);
    fd.append('strTelefono', this.admin.strTelefono);
    fd.append('strCorreo', this.admin.strCorreo);
    fd.append('strPassword', this.admin.strPassword);
    fd.append('strColonia', this.admin.strColonia);
    fd.append('strCalle', this.admin.strCalle);
    fd.append('strDelegacion', this.admin.strDelegacion);
    fd.append('nmbCodigoPostal', this.admin.nmbCodigoPostal);

    // fd.append('strCentroCrecer', this.admin.strCentroCrecer);

    if (forma.invalid) {
       // tslint:disable-next-line: no-shadowed-variable
       const Toast = Swal.mixin({

        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
       Toast.fire({
        type: 'error',
        title: 'Llena todos lo campos para continuar'
      });
    } else {

      this.adminService.postAdmin(fd).then(resp=>{
        Swal.close();
        this.regresarAdministrador();
        Toast.fire({
          type: 'success',
          title: `!se ha registrado a ${ this.admin.strNombre } ${ this.admin.strPrimerApellido } exitosamente!`,
        });
      }).catch(err => {

        console.log(err);
      });
    }
  }

  regresarAdministrador() {
    this.router.navigate(['administrador']);
  }
}

