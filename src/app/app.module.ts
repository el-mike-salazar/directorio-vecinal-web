import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';


// Servicios
import { MenuService } from './services/menu.service';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CarruselComponent } from './components/login/carrusel/carrusel.component';
import { FormularioComponent } from './components/login/formulario/formulario.component';
import { MenuHijoComponent } from './components/menu/menu-hijo/menu-hijo.component';
import { MenuComponent } from './components/menu/menu-padre/menu-padre.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CardsPadreComponent } from './components/menu/menu-padre/cards-padre/cards-padre.component';
import { CardsHijoComponent } from './components/menu/menu-hijo/cards-hijo/cards-hijo.component';
import { from } from 'rxjs';




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
    CardsHijoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
