import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkThem = document.querySelector('#theme');

  constructor() { 
    
    const url = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css";       
    this.linkThem?.setAttribute('href', url);

  }

  changeTheme( theme:string ){

    const url = `./assets/css/colors/${theme}.css`;
    this.linkThem?.setAttribute('href', url);
    localStorage.setItem('theme', url);      
    
    this.checkCurrentTheme();

  }

  checkCurrentTheme(){

    const links:NodeListOf<Element> = document.querySelectorAll('.selector')
    
      links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkThem?.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        element.classList.add('working');
      }
    });
  }
}
