import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { iRegister } from '../../Models/i-register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router
    ){ }

  registerData: iRegister = {
    nome:'',
    cognome:'',
    email:'',
    username:'',
    password:''
  }

  username:string = '';

  save(){
    this.authService.signUp(this.registerData)
    .subscribe(data =>{
        console.log(data)
          this.username = data.response.username;
          this.router.navigate(['/auth/login']);

    })
  }

}
