import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu-padre/menu-padre.component';
import { MenuHijoComponent } from './components/menu/menu-hijo/menu-hijo.component';
import { AgregarCentroCrecerComponent } from './components/catalogo-centros-crecer/agregar-centro-crecer/agregar-centro-crecer.component';
import { CatalogoCentrosCrecerComponent } from './components/catalogo-centros-crecer/catalogo-centros-crecer.component';
import { EditarCentroCrecerComponent } from './components/catalogo-centros-crecer/editar-centro-crecer/editar-centro-crecer.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { AdminsLogComponent } from './components/log/admins/admins-log/admins-log.component';
import { LogDetailedComponent } from './components/log/admins/admins-log/log-detailed/log-detailed.component';

const APP_ROUTES: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu-hijo/:id', component: MenuHijoComponent },

  { path: 'admins-log', component: AdminsLogComponent },
  { path: 'log-detailed/:id', component: LogDetailedComponent },
  { path: 'log-detailed/:termino', component: LogDetailedComponent },

  {path: 'categoria', component: CategoriasComponent},

  { path: 'agregarCentro', component: AgregarCentroCrecerComponent },
  { path: 'catalogoCentros', component: CatalogoCentrosCrecerComponent},
  { path: 'editarCentro', component: EditarCentroCrecerComponent},

  {path: 'categoria', component: CategoriasComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
