import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;

  constructor(private router:Router,
              private fb: FormBuilder,
              private userService: UserService,
              private ngZone: NgZone) { }

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: [ , Validators.required],
    remember: [false],
  });
          
  public formSubmitted:boolean = false;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  login(){

    this.formSubmitted = true;

    if( this.loginForm.invalid ){
      return;
    }

    this.userService.login( this.loginForm.value )
    .subscribe({
      next: (v) => {
        if( this.loginForm.get('remember')?.value ){
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        }else{
          localStorage.removeItem('email');
        }
        this.ngZone.run( () => {
          this.router.navigateByUrl('/')
        })
      },
      error: (e) => console.log(Swal.fire({
        title: 'Error!',
        text: e.error.msg,
        icon: 'error',
        confirmButtonText: 'Volver'
      })),
      complete: () => Swal.fire({
        title: 'Exito!',
        text: 'El usuario se ha autenticado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })

    })

  }

  invalidField(field: string): boolean{
    if(this.loginForm.get(field)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }    
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '839272306760-jic9gcrghqibc3iit9ibciuirlb8j1c7.apps.googleusercontent.com',
      callback: (res:any) => this.handleCredentialResponse(res)
    });

    google.accounts.id.renderButton(
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse(response: any){
    this.userService.loginGoogle(response.credential)
    .subscribe({
      next: (v) => {
        this.ngZone.run( () => {
          this.router.navigateByUrl('/')
        })
      },
      error: (e) => console.log(Swal.fire({
        title: 'Error!',
        text: e,
        icon: 'error',
        confirmButtonText: 'Volver'
      })),
      complete: () => Swal.fire({
        title: 'Exito!',
        text: 'El usuario se ha autenticado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })

    })
  }
  
}
