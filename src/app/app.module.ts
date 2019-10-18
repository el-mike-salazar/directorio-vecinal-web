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

// Modulo Menus
import { MenuService } from './services/menu.service';
import { MenuHijoComponent } from './components/menu/menu-hijo/menu-hijo.component';
import { MenuComponent } from './components/menu/menu-padre/menu-padre.component';
import { CardsPadreComponent } from './components/menu/menu-padre/cards-padre/cards-padre.component';
import { CardsHijoComponent } from './components/menu/menu-hijo/cards-hijo/cards-hijo.component';


// Modulo Login
import { LoginComponent } from './components/login/login.component';
import { CarruselComponent } from './components/login/carrusel/carrusel.component';
import { FormularioComponent } from './components/login/formulario/formulario.component';

// Navbar y Footer
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

// Modulo Centros Crecer
import { CatalogoCentrosCrecerComponent } from './components/catalogo-centros-crecer/catalogo-centros-crecer.component';
import { AgregarCentroCrecerComponent } from './components/catalogo-centros-crecer/agregar-centro-crecer/agregar-centro-crecer.component';
import { MapAgregarCentroComponent } from './components/catalogo-centros-crecer/agregar-centro-crecer/map-agregar-centro/map-agregar-centro.component';
import { EditarCentroCrecerComponent } from './components/catalogo-centros-crecer/editar-centro-crecer/editar-centro-crecer.component';
import { TablaCentrosCrecerComponent } from './components/catalogo-centros-crecer/tabla-centros-crecer/tabla-centros-crecer.component';
import { MapEditarCentroComponent } from './components/catalogo-centros-crecer/editar-centro-crecer/map-editar-centro/map-editar-centro.component'; // Filtro de la tabla
import { CatalogoPrestadoresServiciosComponent } from './components/catalogo-prestadores-servicios/catalogo-prestadores-servicios.component';
import { TablaPrestadorServiciosComponent } from './components/catalogo-prestadores-servicios/tabla-prestador-servicios/tabla-prestador-servicios.component';
import { EditarPrestadorServiciosComponent } from './components/catalogo-prestadores-servicios/editar-prestador-servicios/editar-prestador-servicios.component';
import { AgregarPrestadorServiciosComponent } from './components/catalogo-prestadores-servicios/agregar-prestador-servicios/agregar-prestador-servicios.component';
import { MapaAgregarPrestadorComponent } from './components/catalogo-prestadores-servicios/agregar-prestador-servicios/mapa-agregar-prestador/mapa-agregar-prestador.component';
import { MapaEditarPrestadorComponent } from './components/catalogo-prestadores-servicios/editar-prestador-servicios/mapa-editar-prestador/mapa-editar-prestador.component';



@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,
    CarruselComponent,
    FormularioComponent,
    
    NavbarComponent,
    FooterComponent,
    
    MenuComponent,
    MenuHijoComponent,
    CardsPadreComponent,
    CardsHijoComponent,
    
    CatalogoCentrosCrecerComponent,
    AgregarCentroCrecerComponent,
    MapAgregarCentroComponent,
    EditarCentroCrecerComponent,
    TablaCentrosCrecerComponent,
    MapEditarCentroComponent,
    CatalogoPrestadoresServiciosComponent,
    TablaPrestadorServiciosComponent,
    EditarPrestadorServiciosComponent,
    AgregarPrestadorServiciosComponent,
    MapaAgregarPrestadorComponent,
    MapaEditarPrestadorComponent
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
