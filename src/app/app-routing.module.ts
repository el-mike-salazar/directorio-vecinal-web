import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CatalogoCentrosCrecerComponent } from './components/centrosCrecer/catalogo-centros-crecer/catalogo-centros-crecer.component';
import { AgregarCentroCrecerComponent } from './components/centrosCrecer/catalogo-centros-crecer/agregar-centro-crecer/agregar-centro-crecer.component';
import { EditarCentroCrecerComponent } from './components/centrosCrecer/catalogo-centros-crecer/editar-centro-crecer/editar-centro-crecer.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'agregarCentro', component: AgregarCentroCrecerComponent },
    { path: 'catalogoCentros', component: CatalogoCentrosCrecerComponent},
    { path: 'editarCentro', component: EditarCentroCrecerComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
