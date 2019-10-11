
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CarruselComponent } from './components/login/carrusel/carrusel.component';
import { FormularioComponent } from './components/login/formulario/formulario.component';
import { CatalogoCentrosCrecerComponent } from './components/centrosCrecer/catalogo-centros-crecer/catalogo-centros-crecer.component';
import { AgregarCentroCrecerComponent } from './components/centrosCrecer/catalogo-centros-crecer/agregar-centro-crecer/agregar-centro-crecer.component';
import { MapAgregarCentroComponent } from './components/centrosCrecer/catalogo-centros-crecer/agregar-centro-crecer/map-agregar-centro/map-agregar-centro.component';
import { EditarCentroCrecerComponent } from './components/centrosCrecer/catalogo-centros-crecer/editar-centro-crecer/editar-centro-crecer.component';
import { TablaCentrosCrecerComponent } from './components/centrosCrecer/catalogo-centros-crecer/tabla-centros-crecer/tabla-centros-crecer.component';

// Routes
import { AppRoutingModule } from './app-routing.module';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarruselComponent,
    FormularioComponent,
    CatalogoCentrosCrecerComponent,
    AgregarCentroCrecerComponent,
    MapAgregarCentroComponent,
    EditarCentroCrecerComponent,
    TablaCentrosCrecerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyDHAZMu3dpAcCGB_RmkziqnIeNWolVNwwE'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
