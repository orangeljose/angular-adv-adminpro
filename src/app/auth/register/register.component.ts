import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup = this.fb.group({
    nombre: ['orangel', [Validators.required, Validators.minLength(2)]],
    email: ['orangelperez95@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['1234567', Validators.required],
    terms: [false, Validators.required],
  },{ 
    validators: this.passwordsIguales('password','password2')
  });

  public formSubmitted:boolean = false;

  constructor(private router:Router,
              private fb: FormBuilder,
              private userService: UserService) { }

  createUser(){
    this.formSubmitted = true;

    if( this.registerForm.invalid ){
      return;
    }

    this.userService.createUser( this.registerForm.value )
      .subscribe({
        next: (v) => {this.router.navigateByUrl('/')},
        error: (e) => console.log(Swal.fire({
          title: 'Error!',
          text: e.error.msg,
          icon: 'error',
          confirmButtonText: 'Volver'
        })),
        complete: () => Swal.fire({
          title: 'Exito!',
          text: 'El usuario se ha registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      })
  }

  invalidField(field: string): boolean{
    if(this.registerForm.get(field)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }    
  }

  checkTerms(){
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  invalidPassword(){
    const pass  = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( (pass !== pass2) && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales( pass1Name:string, pass2Name:string ){

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors( {notEqual: true} );
      }

    }

  }

}
