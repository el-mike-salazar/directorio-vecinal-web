import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private cardsHijo: Card[] = [
    {
    id: '1',
    nombre: 'Oficios',
    font: 'fa fa-briefcase',
    descripcion: 'Información de Oficios',
    mnHi: [

      {
        nombre: 'Catálogo de Categorías',
        descripcion: 'Información de Oficios',
        font: 'fa fa-handshake-o',
        ruta: '/categoria'
      }
    ]
    },
    {
      id: '2',
      nombre: 'Desarrollador',
      font: 'fa fa-code',
      descripcion: 'informacion de oficios',
      mnHi: [

        {
          nombre: 'Log',
          descripcion: 'Información de Actividades(Log)',
          font: 'fa fa-users',
          ruta: '/admins-log'
        },
      ]
    },
    {
      id: '3',
      nombre: 'Centros Crecer',
      font: 'fa fa-university',
      descripcion: 'Información Centros Crecer',
      mnHi: [

        {
          nombre: 'Catálogo de Centros Crecer',
          descripcion: 'Información específica de los Centros Crecer.',
          font: 'fa fa-list-alt',
          ruta: '/catalogoCentros',
          regresar: '/menu-hijo/3'
        }
      ]
  },
  {
    id: '4',
    nombre: 'Prestadores de Servicios',
    font: 'fa fa-user-md',
    descripcion: 'Descripción prestadores',
    mnHi: [

      { // NO HACER CASO POR AHORA...
        nombre: 'Categorias',
        descripcion: 'informacion de oficios',
        font: 'fa fa-users',
        ruta: '/menu'
      }, {
        nombre: 'Subcategorias',
        descripcion: 'informacion de oficios',
        font: 'fa fa-user-o',
        ruta: '/menu-hijo'
      }
    ]
  },
  {
    id: '5',
    nombre: 'Clientes',
    font: 'fa fa-users',
    descripcion: 'Descripcion de clientes',
    mnHi: [

      { // NO HACER CASO POR AHORA...
        nombre: 'Categorias',
        descripcion: 'informacion de oficios',
        font: 'fa fa-users',
        ruta: '/menu'
      }, {
        nombre: 'Subcategorias',
        descripcion: 'informacion de oficios',
        font: 'fa fa-user-o',
        ruta: '/menu-hijo'
      }
    ]
},
{
  id: '6',
  nombre: 'Servicios',
  font: 'fa fa-handshake-o',
  descripcion: 'informacion de servicios',
  mnHi: [

    { // NO HACER CASO POR AHORA...
      nombre: 'Categorias',
      descripcion: 'informacion de oficios',
      font: 'fa fa-users',
      ruta: '/menu'
    }, {
      nombre: 'Subcategorias',
      descripcion: 'informacion de oficios',
      font: 'fa fa-user-o',
      ruta: '/menu-hijo'
    }
  ]
},
{
  id: '7',
  nombre: 'Tickets',
  font: 'fa fa-file-text-o',
  descripcion: 'Descripcion de tickets',
  mnHi: [

    { // NO HACER CASO POR AHORA...
      nombre: 'Categorias',
      descripcion: 'Descripcion categorias',
      font: 'fa fa-users',
      ruta: '/menu'
    }, {
      nombre: 'Subcategorias',
      descripcion: 'Descripcion categorias',
      font: 'fa fa-user-o',
      ruta: '/menu-hijo'
    }
  ]
},
{
  id: '8',
  nombre: 'Administradores',
  font: 'fa fa-cogs',
  descripcion: 'Descripción administradores',
  mnHi: [

    { // NO HACER CASO POR AHORA...
      nombre: 'Categorias',
      descripcion: 'informacion de administradores',
      font: 'fa fa-users',
      ruta: '/menu'
    }, {
      nombre: 'Subcategorias',
      descripcion: 'informacion de administradores',
      font: 'fa fa-user-o',
      ruta: '/menu-hijo'
    }
  ]
}
];

  constructor() {}

   getCardsHijo() {
     return this.cardsHijo;
   }
}


export interface Card {
id: string;
nombre: string;
descripcion: string;
font: string;
mnHi: any;
}

