import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono:  'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', url: '/'},
        {titulo: 'Progreso', url: 'progress'},
        {titulo: 'Grafica 1', url: 'grafica1'},
        {titulo: 'Promesas', url: 'promises'},
        {titulo: 'RXJS', url: 'rxjs'},
        {titulo: 'Mi Perfil', url: 'profile'},
      ]
    }
  ];

  constructor() { }
}
