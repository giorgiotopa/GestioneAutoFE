import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { iRegister } from '../../Models/i-register';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ){ }

  registrationForm!: FormGroup;
  // registerData: iRegister = {
  //   nome:'',
  //   cognome:'',
  //   email:'',
  //   username:'',
  //   password:''
  // }

  errore: boolean = false;

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  save() {
    if (this.registrationForm.valid) {
      const registerData: iRegister = {
        nome: this.registrationForm.value.nome,
        cognome: this.registrationForm.value.cognome,
        email: this.registrationForm.value.email,
        username: this.registrationForm.value.username,
        password: this.registrationForm.value.password
      };

      this.authService.signUp(registerData).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          console.error(error);
          this.errore = true;
        }
      );
    }
  }

}
