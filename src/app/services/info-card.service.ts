import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoCardService {

private infoCard: infoCard[] = [
  {
    id: '1',
    nombre: 'info categoria',
    descripcion: '1 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut velit, earum in sit voluptate officia asumenda hic corrupti? Placeat impedit atque fugiat, accusantium reprehenderit voluptatibus nobis cumque dolorum minima sed?'
  },
  {
    id: '2',
    nombre: 'info log',
    descripcion: '2 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut velit, earum in sit voluptate officia asumenda hic corrupti? Placeat impedit atque fugiat, accusantium reprehenderit voluptatibus nobis cumque dolorum minima sed?'
  },
  {
    id: '3',
    nombre: 'info centro crecer',
    descripcion: '3 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut velit, earum in sit voluptate officia asumenda hic corrupti? Placeat impedit atque fugiat, accusantium reprehenderit voluptatibus nobis cumque dolorum minima sed?'
  }];

  constructor() { }

  getInfoCard() {
    return this.infoCard;
  }
}
// tslint:disable-next-line: class-name
export interface infoCard {
  id: string;
  nombre: string;
  descripcion: string;
}