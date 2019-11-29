import { Component, OnInit, Input} from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../../models/usuario.model';
import { SummaryResolver } from '@angular/compiler';
import { CentrosCrecerService } from '../../../services/centros-crecer.service';
import { AdministradorService } from 'src/app/services/administrador.service';
import { CCrecerModel } from 'src/app/models/CentroCrecer.model';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000
});

@Component({
  selector: 'app-registrar-administrador',
  templateUrl: './registrar-administrador.component.html',
  styleUrls: ['./registrar-administrador.component.css']
})
export class RegistrarAdministradorComponent implements OnInit {

 centros: CCrecerModel;

  constructor(private router: Router, private centrosCrecerSevice: CentrosCrecerService, private adminService: AdministradorService) { }

  forma: FormGroup;
  selectedFile: File = null;

  admin: any = {
    strNombre: null,
    strPrimerApellido: null,
    strSegundoApellido: null,
    strTelefono: null,
    strCorreo: null,
    strPassword: null,
    strPasswordConfirm: null,
    strColonia: null,
    nmbCodigoPostal: null,
    strCalle: null,
    strCentroCrecer: null
  };

  onFileSelected(event) {
    this.selectedFile = event;
  }

  ngOnInit() {
    this.centrosCrecerSevice.getCentrosCrecer().then((datos: any) => {
     console.log(datos);

     this.centros = datos.cont.ccDB;
     }).catch(err => {
      Toast.fire({
        type: 'error',
        title: `Servicio de Centros Crecer no Encontrado`,
      });
     });

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
    fd.append('numCodigoPostal', this.admin.nmbCodigoPostal);
    fd.append('strCentroCrecer', this.admin.strCentoCrecer);
    if (this.selectedFile !== null) {
      fd.append('strImagen', this.selectedFile, this.selectedFile.name);
    }

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
      console.log(fd);
      this.adminService.postAdmin(fd).then(resp => {
        console.log('----------------------->>>>>>>>>');
        console.log(resp);
        if (resp.resp === 200) {
          this.adminService.putArrAdmin(this.admin.strCentroCrecer, resp.cont.persona._id).then(resps => {
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
      });
    }
  }

  regresarAdministrador() {
    this.router.navigate(['administrador']);
  }
}

