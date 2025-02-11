// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { from } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Externals
import { NgxPaginationModule } from 'ngx-pagination'; // Paginacion de la tabla
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // Filtro de la tabla
// Generales
import { InfoCardComponent } from './components/shared/info-card/info-card.component';
import { CargarImagenComponent } from './components/shared/cargar-imagen/cargar-imagen.component';
import { MostrarImagenComponent } from './components/shared/mostrar-imagen/mostrar-imagen.component';
import { MapaComponent } from './components/shared/mapa/mapa.component';
import { LimitToPipe } from './pipes/limit-to.pipe';

// Modulo Menus
import { MenuService } from './services/menu.service';
import { MenuHijoComponent } from './components/menu/menu-hijo/menu-hijo.component';
import { MenuComponent } from './components/menu/menu-padre/menu-padre.component';
import { CardsPadreComponent } from './components/menu/menu-padre/cards-padre/cards-padre.component';
import { CardsHijoComponent } from './components/menu/menu-hijo/cards-hijo/cards-hijo.component';

// Modulo Login
import { CarruselComponent } from './components/login/carrusel/carrusel.component';

// Navbar y Footer
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

// Modulo Log
import { LogComponent } from './components/log/log.component';
import { TablaLogComponent } from './components/log/tabla-log/tabla-log.component';
import { DetalleLogComponent } from './components/log/detalle-log/detalle-log.component';

// Modulo Centros Crecer
import { CentrosCrecerComponent } from './components/centros-crecer/centros-crecer.component';
import { ActualizarCentroCrecerComponent } from './components/centros-crecer/actualizar-centro-crecer/actualizar-centro-crecer.component';
import { TablaCentrosCrecerComponent } from './components/centros-crecer/tabla-centros-crecer/tabla-centros-crecer.component';
import { RegistrarCentroCrecerComponent } from './components/centros-crecer/registrar-centro-crecer/registrar-centro-crecer.component';

// Modulo Categorias
import { CategoriasComponent } from './components/categorias/categorias.component';
import { TablaCategoriasComponent } from './components/categorias/tabla-categorias/tabla-categorias.component';
import { ActualizarCategoriaComponent } from './components/categorias/actualizar-categoria/actualizar-categoria.component';
import { RegistrarCategoriaComponent } from './components/categorias/registrar-categoria/registrar-categoria.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

// Módulo Oficios
import { OficiosComponent } from './components/oficios/oficios.component';
import { TablaOficioComponent } from './components/oficios/tabla-oficio/tabla-oficio.component';
import { RegistrarOficioComponent } from './components/oficios/registrar-oficio/registrar-oficio.component';
import { ActualizarOficioComponent } from './components/oficios/actualizar-oficio/actualizar-oficio.component';

import { GeolocalizacionComponent } from './components/shared/geolocalizacion/geolocalizacion.component';

// Módulo de Rol
import { RolComponent } from './components/rol/rol.component';
import { ActualizarRolComponent } from './components/rol/actualizar-rol/actualizar-rol.component';
import { RegistrarRolComponent } from './components/rol/registrar-rol/registrar-rol.component';
import { TablaRolesComponent } from './components/rol/tabla-roles/tabla-roles.component';
import { ApiComponent } from './components/api/api.component';

// Modulo Administrador
import { ActualizarAdministradorComponent } from './components/administrador/actualizar-administrador/actualizar-administrador.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { RegistrarAdministradorComponent } from './components/administrador/registrar-administrador/registrar-administrador.component';
import { TablaAdministradorComponent } from './components/administrador/tabla-administrador/tabla-administrador.component';

// Modulo Apis
import { RutasApiComponent } from './components/rutas-api/rutas-api.component';
import { TablaRutasComponent } from './components/rutas-api/tabla-rutas/tabla-rutas.component';
import { RegistrarRutasComponent } from './components/rutas-api/registrar-rutas/registrar-rutas.component';
import { ActualizarRutasComponent } from './components/rutas-api/actualizar-rutas/actualizar-rutas.component';
import { ActualizarCategoriaApiComponent } from './components/categoria-api/actualizar-categoria-api/actualizar-categoria-api.component';
import { TablaCategoriaApiComponent } from './components/categoria-api/tabla-categoria-api/tabla-categoria-api.component';
import { CategoriaApiComponent } from './components/categoria-api/categoria-api.component';
import { PrestadorServiciosComponent } from './components/prestador-servicios/prestador-servicios.component';
import { ActualizarPrestadorServiciosComponent } from './components/prestador-servicios/actualizar-prestador-servicios/actualizar-prestador-servicios.component';
import { RegistrarPrestadorServiciosComponent } from './components/prestador-servicios/registrar-prestador-servicios/registrar-prestador-servicios.component';
import { TablaPrestadorServiciosComponent } from './components/prestador-servicios/tabla-prestador-servicios/tabla-prestador-servicios.component';
import { NegocioComponent } from './components/negocio/negocio.component';
import { ActualizarNegocioComponent } from './components/negocio/actualizar-negocio/actualizar-negocio.component';
import { RegistrarNegocioComponent } from './components/negocio/registrar-negocio/registrar-negocio.component';
import { TablaNegociosComponent } from './components/negocio/tabla-negocios/tabla-negocios.component';
import { CargarImagenesComponent } from './components/shared/cargar-imagenes/cargar-imagenes.component';
import { MostrarImagenesComponent } from './components/shared/mostrar-imagenes/mostrar-imagenes.component';
import { RecuperarContraComponent } from './components/recuperar-contra/recuperar-contra.component';
@NgModule({
  declarations: [
    AppComponent,
    LimitToPipe,

    // LoginComponent,
    CarruselComponent,
    // FormularioComponent,

    NavbarComponent,
    FooterComponent,

    MenuComponent,
    MenuHijoComponent,
    CardsPadreComponent,
    CardsHijoComponent,

    LogComponent,
    TablaLogComponent,
    DetalleLogComponent,

    CentrosCrecerComponent,
    ActualizarCentroCrecerComponent,
    RegistrarCentroCrecerComponent,
    TablaCentrosCrecerComponent,

    CategoriasComponent,
    TablaCategoriasComponent,
    ActualizarCategoriaComponent,
    RegistrarCategoriaComponent,

    OficiosComponent,
    TablaOficioComponent,
    RegistrarOficioComponent,
    ActualizarOficioComponent,

    InfoCardComponent,
    CargarImagenComponent,
    MostrarImagenComponent,
    MapaComponent,
    LimitToPipe,
    PageNotFoundComponent,
    GeolocalizacionComponent,

    RolComponent,
    ActualizarRolComponent,
    RegistrarRolComponent,
    TablaRolesComponent,
    ApiComponent,

    ActualizarAdministradorComponent,
    AdministradorComponent,
    RegistrarAdministradorComponent,
    TablaAdministradorComponent,

    RutasApiComponent,
    TablaRutasComponent,
    RegistrarRutasComponent,
    ActualizarRutasComponent,
    
    ActualizarCategoriaApiComponent,
    TablaCategoriaApiComponent,
    CategoriaApiComponent,

    PrestadorServiciosComponent,
    ActualizarPrestadorServiciosComponent,
    RegistrarPrestadorServiciosComponent,
    TablaPrestadorServiciosComponent,

    NegocioComponent,
    ActualizarNegocioComponent,
    RegistrarNegocioComponent,
    TablaNegociosComponent,

    CargarImagenesComponent,
    MostrarImagenesComponent,
    RecuperarContraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
    // apiKey: 'AIzaSyDHAZMu3dpAcCGB_RmkziqnIeNWolVNwwE'
    }),
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
