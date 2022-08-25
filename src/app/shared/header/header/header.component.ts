import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public imgUrl;
  public user;

  constructor(private userService: UserService) { 
    this.imgUrl = userService.user!.imageUrl || '';
    this.user = userService.user;    
  }

    logout(){
      this.userService.logout();
    }

}
