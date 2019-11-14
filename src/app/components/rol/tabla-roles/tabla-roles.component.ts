import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RolModel } from '../../../models/Rol.model';
import Swal from 'sweetalert2';
import { RolService } from '../../../services/rol.service';
import { ExportDataService } from 'src/app/services/export-data.service';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';



const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-tabla-roles',
  templateUrl: './tabla-roles.component.html',
  styleUrls: ['./tabla-roles.component.css']
})
export class TablaRolesComponent implements OnInit {


  title = 'Catálogo de Roles';
  @Input() paquetito: any;
  pageActual = 1;
  @Input() roles: RolModel[];
  @Output() salida = new EventEmitter();

  constructor( private rolService: RolService, private excelService: ExportDataService) { }

  ngOnInit() {
    this.obtenerRoles();
  }

  obtenerRoles() {
    this.rolService.obtenerRoles().then( (datos: any) => {
      this.roles = datos.cont.rol;
    }).catch( err => {});
  }

  eliminar(rol: RolModel) {

    Swal.fire({
      title: `Estas a punto de eliminar la categoría: ${rol.strNombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
        this.rolService.eliminarRol(rol._id).then(resp => {
          this.ngOnInit();
          Toast.fire({
            type: 'success',
            title: `${rol.strNombre} eliminado Exitosamente`
          });

        }).catch(err => {
          Toast.fire({
            type: 'error',
            title: err.message
          });
        });
      }

    });

  }

  apis(rol) {
   this.paquetito.apiComponent = true;
   this.paquetito.data = rol;
   this.paquetito.registrarRolComponent = false;
   this.paquetito.actualizarRolComponent = false;
   this.paquetito.tablaRolesComponent = false;
  }


  seleccionar(rol: RolModel) {
    this.paquetito.data = rol;
    this.paquetito.registrarRolComponent = false;
    this.paquetito.actualizarRolComponent = true;
    this.paquetito.tablaRolesComponent = true;
    this.paquetito.apiComponent = false;
  }

  exportAsXLSX(): void {
    if (this.roles.length !== 0) {
      this.excelService.exportAsExcelFile(this.roles, 'Categorías');
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error de exportación',
        text: 'No hay ningún registro que exportar',
      });
    }
  }

    // Exportar PDF
    public exportPDF() {
      if (this.roles.length !== 0) {
        const data = document.getElementById('PDFTable');
        html2canvas(data).then(canvas => {
          const imgWidth = 200;
          const imgHeight = canvas.height * imgWidth / canvas.width;
          const contentDataURL = canvas.toDataURL('image/png');
          const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
          const position = 0;
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          pdf.save(`${this.title}.pdf`);
        });
        } else {
        Swal.fire({
          type: 'error',
          title: 'Error de exportacion',
          text: 'No hay ningun registro que exportar',
        });
      }
    }

}
