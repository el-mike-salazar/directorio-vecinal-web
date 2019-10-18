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
    descripcion: 'descripción de oficios',
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
      id: '2',
      nombre: 'Desarrollador',
      font: 'fa fa-code',
      descripcion: 'informacion de oficios',
      mnHi: [

        { // NO HACER CASO POR AHORA...
          nombre: 'Log',
          descripcion: 'informacion de oficios',
          font: 'fa fa-users',
          ruta: '/menu'
        },
      ]
    },
    {
      id: '3',
      nombre: 'Centros Crecer',
      font: 'fa fa-university',
      descripcion: 'informacion centros crecer',
      mnHi: [

        { // NO HACER CASO POR AHORA...
          nombre: 'Catálogo de Centros Crecer',
          descripcion: 'Información específica de los Centros Crecer.',
          font: 'fa fa-list-alt',
          ruta: '/catalogoCentros',
          regresar: '/menu-hijo/3'
        }, {
          nombre: 'Subcategorias',
          descripcion: 'informacion de oficios',
          font: 'fa fa-user-o',
          ruta: '/menu'
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

  constructor() {
    console.log('Servicio listo para usarse!!');
   }

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

