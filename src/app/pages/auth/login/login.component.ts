import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { iLogin } from '../../Models/i-login';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authService:AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ){}

  loginForm!: FormGroup;
  loginData: iLogin = {
    username:'',
    password: ''
  }

  errore: boolean = false

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value).subscribe(
        (data) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error(error);
          this.errore=true;
          // Gestisci gli errori qui, ad esempio mostrando un messaggio all'utente
        }
      );
    }
  }
}
