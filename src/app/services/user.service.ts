import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, map, tap  } from 'rxjs/operators';

import { LoginForm } from 'src/interfaces/login-form.interface';
import { RegisterForm } from 'src/interfaces/register-form.interface';

import { Router } from '@angular/router';
import { Usuario } from 'src/models/user.model';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user?: Usuario;

  constructor(private http: HttpClient,
              private router:Router,
              private ngZone: NgZone) { }

  get token(){
    return localStorage.getItem('token') || '';
  }

  get uid(){
    return this.user?.uid || '';
  }

  createUser( formData: RegisterForm ){
    
    return this.http.post( `${base_url}/users`, formData)
                      .pipe(
                        tap( (resp:any) => {
                          localStorage.setItem('token', resp.token)
                        })
                      )

  }

  updateUser( data: {  nombre: string, email: string, role: string }){
    data = {
      ...data,
      role: this.user!.role!,
    }
    return this.http.put( `${base_url}/users/${this.uid}`, data, {
      headers: {
        'x-token' : this.token
    }
    }).pipe(
        map( (resp:any) => {
          const { nombre, email, img = '', google, role, uid } = resp.user;
          this.user = new Usuario( nombre, email, '', img, google, role, uid );                    
          return resp;
        }),       
      )
  }

  login( formData: LoginForm ){
    
    return this.http.post( `${base_url}/login`, formData)
                      .pipe(
                        tap( (resp:any) => {
                          localStorage.setItem('token', resp.token)
                        })
                      )

  }


  loginGoogle( token: string ){
      
    return this.http.post( `${base_url}/login/google`, {token})
                      .pipe(
                        tap( (resp:any) => {
                          localStorage.setItem('token', resp.token)
                        })
                      )

  }

  authToken( ){

    return this.http.get( `${base_url}/login/renew`, {
      headers: {
        'x-token' : this.token
    }
    }).pipe(
        map( (resp:any) => {
          const { nombre, email, img = '', google, role, uid } = resp.user;
          this.user = new Usuario( nombre, email, '', img, google, role, uid );          
          localStorage.setItem('token', resp.token);
          return true;
        }),       
      )

  }

  logout(){
    localStorage.removeItem('token');

    google.accounts.id.revoke('mrrobot401@gmail.com', ()=>{
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    })

  }
}
