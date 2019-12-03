import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu-padre/menu-padre.component';
import { MenuHijoComponent } from './components/menu/menu-hijo/menu-hijo.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CentrosCrecerComponent } from './components/centros-crecer/centros-crecer.component';
import { RegistrarCentroCrecerComponent } from './components/centros-crecer/registrar-centro-crecer/registrar-centro-crecer.component';
import { LogComponent } from './components/log/log.component';
import { GeolocalizacionComponent } from './components/shared/geolocalizacion/geolocalizacion.component';
import { OficiosComponent } from './components/oficios/oficios.component';
import { RolComponent } from './components/rol/rol.component';

// Modulo Administradores Centros Crecer
import { AdministradorComponent } from './components/administrador/administrador.component';
import { RegistrarAdministradorComponent } from './components/administrador/registrar-administrador/registrar-administrador.component';
import { TablaAdministradorComponent } from './components/administrador/tabla-administrador/tabla-administrador.component';

// Modulo Gestion de Api
import { CategoriaApiComponent } from './components/categoria-api/categoria-api.component';
import { RutasApiComponent } from './components/rutas-api/rutas-api.component';
import { PrestadorServiciosComponent } from './components/prestador-servicios/prestador-servicios.component';
import { RegistrarPrestadorServiciosComponent } from './components/prestador-servicios/registrar-prestador-servicios/registrar-prestador-servicios.component';
import { ActualizarPrestadorServiciosComponent } from './components/prestador-servicios/actualizar-prestador-servicios/actualizar-prestador-servicios.component';
import { NegocioComponent } from './components/negocio/negocio.component';
import { RegistrarNegocioComponent } from './components/negocio/registrar-negocio/registrar-negocio.component';
import { ActualizarNegocioComponent } from './components/negocio/actualizar-negocio/actualizar-negocio.component';



const APP_ROUTES: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu-hijo/:id', component: MenuHijoComponent },

  { path: 'log', component: LogComponent },

  {path: 'categoria', component: CategoriasComponent},

  { path: 'centros-crecer', component: CentrosCrecerComponent},
  { path: 'registra-centro', component: RegistrarCentroCrecerComponent },

  {path: 'categoria', component: CategoriasComponent},

  {path: 'oficio/:id', component: OficiosComponent},
  {path: 'rol', component: RolComponent},

  {path: 'geolocalizacion', component: GeolocalizacionComponent},

  {path: 'administrador', component: AdministradorComponent},
  {path: 'registrarAdmin', component: RegistrarAdministradorComponent},
  {path: 'tabla-administrador', component: TablaAdministradorComponent},

  {path: 'categoriasApi', component: CategoriaApiComponent},
  {path: 'rutas/:idCat', component: RutasApiComponent},

  {path: 'prestadores', component: PrestadorServiciosComponent},
  {path: 'registrar-prestador', component: RegistrarPrestadorServiciosComponent},
  {path: 'actualizar-prestador', component: ActualizarPrestadorServiciosComponent},

  {path: 'negocios', component: NegocioComponent},
  {path: 'registrar-negocio', component: RegistrarNegocioComponent},
  {path: 'actualizar-negocio', component: ActualizarNegocioComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'login' }


];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
