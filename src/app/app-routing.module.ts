import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu-padre/menu-padre.component';
import { MenuHijoComponent } from './components/menu/menu-hijo/menu-hijo.component';
import { AgregarCentroCrecerComponent } from './components/catalogo-centros-crecer/agregar-centro-crecer/agregar-centro-crecer.component';
import { CatalogoCentrosCrecerComponent } from './components/catalogo-centros-crecer/catalogo-centros-crecer.component';
import { EditarCentroCrecerComponent } from './components/catalogo-centros-crecer/editar-centro-crecer/editar-centro-crecer.component';

const APP_ROUTES: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu-hijo/:id', component: MenuHijoComponent },
  { path: 'agregarCentro', component: AgregarCentroCrecerComponent },
  { path: 'catalogoCentros', component: CatalogoCentrosCrecerComponent},
  { path: 'editarCentro', component: EditarCentroCrecerComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
