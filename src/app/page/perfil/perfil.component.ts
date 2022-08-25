import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public user: Usuario;
  public imagen!: File;
  public imagentemp: string | ArrayBuffer | null = '';

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private fileUploadService: FileUploadService ) {

    this.user = this.userService.user!;

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.user.nombre, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });

  }

  updateProfile(){
    this.userService.updateUser( this.perfilForm.value )
    .subscribe({
      next: (v) => {
        const { nombre, email } = this.perfilForm.value;
        this.user.nombre = nombre;
        this.user.email = email;
      },
      error: (e) => console.log(Swal.fire({
        title: 'Error!',
        text: e.error.msg,
        icon: 'error',
        confirmButtonText: 'Volver'
      })),
      complete: () => Swal.fire({
        title: 'Exito!',
        text: 'El usuario se ha actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      
    })    
  }

  updatePhopto(){
    this.fileUploadService.updatePhoto( this.imagen, 'user', this.user.uid!)
    .then( (res:any) => {      
      this.user.img = res;
      Swal.fire({
        title: 'Exito!',
        text: 'El imagen del usuario se ha actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    }).catch( err => {
      Swal.fire({
        title: 'Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Volver'
      })
    })
  }

  changeImage( event:any ){
    this.imagen = event.target.files[0] || '';

    if(!event.target.files[0])  this.imagentemp = null;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( this.imagen );

    reader.onloadend = () => {
      this.imagentemp = reader.result;
      console.log( reader.result );
    }
  }

}
