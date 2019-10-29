import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu-padre/menu-padre.component';
import { MenuHijoComponent } from './components/menu/menu-hijo/menu-hijo.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CentrosCrecerComponent } from './components/centros-crecer/centros-crecer.component';
import { RegistrarCentroCrecerComponent } from './components/centros-crecer/registrar-centro-crecer/registrar-centro-crecer.component';
import { LogComponent } from './components/log/log.component';

const APP_ROUTES: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu-hijo/:id', component: MenuHijoComponent },

  { path: 'log', component: LogComponent },

  {path: 'categoria', component: CategoriasComponent},

  { path: 'centros-crecer', component: CentrosCrecerComponent},
  { path: 'registra-centro', component: RegistrarCentroCrecerComponent },

  {path: 'categoria', component: CategoriasComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
