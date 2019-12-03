import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { RecuperarContraService } from '../../services/recuperar-contra.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.component.html',
  styleUrls: ['./recuperar-contra.component.css']
})
export class RecuperarContraComponent implements OnInit {

  constructor(private recuperarContra: RecuperarContraService, private activeRoute: ActivatedRoute, private router: Router) { }

  id: any;

  ngOnInit() {
    document.body.classList.add('bg-img');
    // Aquí se agregara la fincion que verificara si el token aun es valido para poder acceder a esta pantalla.
    this.recuperarContra.verificarToken(this.activeRoute.snapshot.params.id).then((resp: any) => {
      if (resp.resp === 401) {
        Toast.fire({
          type: 'error',
          title: 'La caducidad del correo expiro.'
        });
        this.router.navigate(['/']);
      }

      this.id = resp.cont.id;
      console.log(this.id);
    }).catch( (err => {
      this.router.navigate(['/']);
      Toast.fire({
        type: 'error',
        title: 'La caducidad del correo expiro.'
      });
    }));
  }


  fnRecuperarPwd(pwd, pwd2) {

    if (!pwd || !pwd2) {
      Toast.fire({
        type: 'warning',
        title: 'Favor de llenar los campos.'
      });
    } else {

      if (pwd !== pwd2) {
        Toast.fire({
          type: 'error',
          title: 'Las contraseñas no coinciden.'
        });
      }

      if (pwd === pwd2) {
        let cPwd: cambioContra = {
          pwd,
          pwd2
        };
        console.log(pwd.length);
        if (pwd.length >= 8 && pwd2.length >= 8) {
          // Logica de cuando las contraseñas coinciden.
          this.recuperarContra.actualizacionPwd(this.id, cPwd).then(resp => {
            Toast.fire({
              type: 'success',
              title: 'La contraseña se modifico correctamente.'
            });
            this.router.navigate(['/']);
          }).catch( (err => {
            Toast.fire({
              type: 'error',
              title: 'Error al actualizar la información.'
            });
          }));
        } else {
          Toast.fire({
            type: 'warning',
            title: 'Las contraseñas deben ser mayor o igual a 8 caracteres.'
          });
        }
      }
    }
  }
}

interface cambioContra {
  pwd: string;
  pwd2: string;
}