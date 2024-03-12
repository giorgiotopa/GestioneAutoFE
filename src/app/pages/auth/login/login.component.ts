import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { iLogin } from '../../Models/i-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authService:AuthService,
    private router: Router
    ){}

  loginData: iLogin = {
    username:'',
    password: ''
  }

  save(){
    this.authService.logIn(this.loginData)
    .subscribe(data =>{
      this.router.navigate(['/dashboard']);
    })
  }

}
