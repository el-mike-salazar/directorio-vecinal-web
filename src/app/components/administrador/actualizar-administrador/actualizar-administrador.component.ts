import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UsuarioModel } from '../../../models/usuario.model';
import { AdministradorService } from '../../../services/administrador.service';
import { Router } from '@angular/router';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });


@Component({
  selector: 'app-actualizar-administrador',
  templateUrl: './actualizar-administrador.component.html',
  styleUrls: ['./actualizar-administrador.component.css']
})
export class ActualizarAdministradorComponent implements OnInit {

  @Input() paquetito: any;

admin: UsuarioModel;

 @Output() salida = new EventEmitter();
 img: any;
 selectedFile: File = null;


 // tslint:disable-next-line: variable-name
 constructor( private _router: Router, private _adminService: AdministradorService) {

 }

 ngOnInit() {
   console.log(this.paquetito.data);
   this.admin  = {
     strNombre: this.paquetito.data.strNombre,
     strPrimerApellido: this.paquetito.data.strPrimerApellido,
     strSegundoApellido: this.paquetito.data.strSegundoApellido,
     strColonia: this.paquetito.data.strColonia,
     strCalle: this.paquetito.data.strCalle,
     strCorreo: this.paquetito.data.strCorreo,
     strTelefono: this.paquetito.data.strTelefono,
     strImagen: this.paquetito.data.strImagen,
     nmbCodigoPostal: this.paquetito.data.nmbCodigoPostal

   };
 }

 updateData() {
 }

 regresarAdmin() {
  this.paquetito.actualizarAdministradorComponent = false;
  this.paquetito.tablaAdministradorComponent = true;
 }

 resetForm( form?: NgForm ) {
   if (form) {
     form.reset();
     this._adminService.selectAdmin = new UsuarioModel();
   }
 }

 onFileSelected(event) {
   this.selectedFile = null;
   this.selectedFile = event.target.files[0] as File;
  //  this.admin.strImagen = this.selectedFile;
 }

 actualizarAdmin() {
   const fd = new FormData();
   fd.append('strNombre', this.admin.strNombre);
   fd.append('strPrimerApellido', this.admin.strPrimerApellido);
   fd.append('strSegundoApellido', this.admin.strSegundoApellido);
   fd.append('strTelefono', this.admin.strTelefono);
   fd.append('strCorreo', this.admin.strCorreo);
   fd.append('strPassword', this.admin.strPassword);
   fd.append('strColonia', this.admin.strColonia);
   fd.append('strCalle', this.admin.strCalle);
   fd.append('nmbCodigoPostal', this.admin.nmbCodigoPostal);
   if (this.selectedFile !== null) {
     fd.append('strImgagen', this.selectedFile, this.selectedFile.name);
   }
   this._adminService.putAdmin(this.paquetito.data._id, fd).then( data => {
       Toast.fire({
         type: 'success',
         title: '¡La información del ${this.administrador.strNombre} actualizado exitosamente!'
       });
       this._adminService.getAdmin().subscribe( admin => {
         this.admin = admin.centroC;
         this.salida.emit(this.admin);
         this.regresarAdmin();
       });
   }).catch( err => {
       const errores = err.error.cont.err.errors;
       if (errores.strNombre) {
         Toast.fire({
           type: 'error',
           title: errores.strNombre.message
         });
       }
       if (errores.strDireccion) {
         Toast.fire({
           type: 'error',
           title: errores.strDireccion.message
         });
       }
       if (errores.strColonia) {
         Toast.fire({
           type: 'error',
           title: errores.strColonia.message
         });
       }
       if (errores.strDelegacion) {
         Toast.fire({
           type: 'error',
           title: errores.strDelegacion.message
         });
       }
       if (errores.strTelefono) {
         Toast.fire({
           type: 'error',
           title: errores.strTelefono.message
         });
       }
       if (errores.nmbCodigoPostal) {
         Toast.fire({
           type: 'error',
           title: errores.nmbCodigoPostal.message
         });
       }
     });
   }

 }


