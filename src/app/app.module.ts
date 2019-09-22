import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormularioComponent } from './components/login/formulario/formulario.component';
import { CarruselComponent } from './components/login/carrusel/carrusel.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    CarruselComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
