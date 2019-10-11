import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuHijoService {

  private hijos:any[] = [
    {
      id: '',
      descripcion: '',
    }

  ];

  constructor() { }
}
