import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { iRegister } from '../../Models/i-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private authService: AuthService){ }

  registerData: iRegister = {
    nome:'',
    cognome:'',
    email:'',
    username:'',
    password:''
  }

  nome:string = '';

  save(){
    this.authService.signUp(this.registerData)
    .subscribe(data =>{
        console.log(data)
        this.nome = data.user.nome
    })
  }

}
