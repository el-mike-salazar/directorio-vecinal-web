import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MapAgregarCentroComponent } from './map-agregar-centro/map-agregar-centro.component';
import { CCrecerModel } from '../../../../models/cCrecer.model';
import { CentrosCrecerService } from '../../../../services/centros-crecer.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-agregar-centro-crecer',
  templateUrl: './agregar-centro-crecer.component.html',
  styleUrls: ['./agregar-centro-crecer.component.css']
})

export class AgregarCentroCrecerComponent implements OnInit, AfterViewInit {

   @ViewChild(MapAgregarCentroComponent, {static: true}) child: MapAgregarCentroComponent;
   lng: number;
   lat: number;
  forma: FormGroup;
  cCrecer: CCrecerModel;
  img: any;
  selectedFile: File = null;

  constructor( private _router: Router,  private _centrosCrecerService: CentrosCrecerService, private http: HttpClient) {
  }

  // Obtiene los datos del formulario, si el formulario no es valido con sus campos no puede guardar los datos(boton GUARDAR)
  agregarCC(forma: NgForm) {

    this.cCrecer = {
      strNombre: this.forma.controls.nombre.value,
      fltAltitud: this.forma.controls.longitud.value,
      fltLatitud: this.forma.controls.latitud.value,
      strImagen: this.forma.controls.img.value,
      strDireccion: this.forma.controls.direccion.value,
      strColonia: this.forma.controls.colonia.value,
      strDelegacion: this.forma.controls.delegacion.value,
      strTelefono: this.forma.controls.telefono.value,
      intCodigoPostal: this.forma.controls.codigoPostal.value,
      blnActivo: true
    };

    console.log(this.cCrecer);
    this._centrosCrecerService.postCentroCrecer(this.cCrecer)
    .subscribe(resp => {
      this.resetForm(forma);
      console.log(resp);
      Toast.fire({
        type: 'success',
        title: `Guardado Exitosamente`
      });
    });
  }

  ngOnInit(): void {
    this.lng = this.child.lng;
    this.lat = this.child.lat;
    this.forma = new FormGroup({
      'nombre' : new FormControl( '', Validators.required ),
      'telefono' : new FormControl( '', Validators.required ),
      'direccion': new FormControl( '', Validators.required ),
      'colonia': new FormControl( '', Validators.required ),
      'delegacion': new FormControl( '', Validators.required ),
      'codigoPostal': new FormControl( '', Validators.required ),
      'latitud': new FormControl( this.lat, Validators.required),
      'longitud': new FormControl(  this.lng, Validators.required),
      'img': new FormControl()
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck(): void {
    this.forma.controls.latitud.setValue(this.child.lat);
    this.forma.controls.longitud.setValue(this.child.lng);
    this.forma.controls.img.setValue(this.img);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
  }


// Regresa al catalogo de   Centros Crecer (boton CANCELAR)
  regresarCatalogo() {
    this._router.navigate(['/catalogoCentros']);
  }

  resetForm( form?: NgForm ) {
    if (form) {
      form.reset();
      this._centrosCrecerService.selectCCrecer = new CCrecerModel();
    }
  }

  onFileSelected(event) {
    this.selectedFile = null;
    this.selectedFile = event.target.files[0] as File;
    console.log('object', this.selectedFile );
    this.forma.controls.img.setValue(this.selectedFile);
    console.log(this.forma.controls);
    this.ngDoCheck();
  }

  onUpload() {
    const fd = new FormData();
    fd.append('img', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/api/registrarCentroCrecer', fd)
    .subscribe(resp => {
      console.log(resp);
    });
  }

  // guardarCC() {
  //   this._centrosCrecerService.postCentroCrecer()
  // }
}
