import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CarruselComponent } from './components/login/carrusel/carrusel.component';
import { FormularioComponent } from './components/login/formulario/formulario.component';
import { NavbarComponent } from './components/menu/navbar/navbar.component';
import { CardsComponent } from './components/menu/cards/cards.component';
import { FooterComponent } from './components/menu/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarruselComponent,
    FormularioComponent,
    NavbarComponent,
    CardsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
