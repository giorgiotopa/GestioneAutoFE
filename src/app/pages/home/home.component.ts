import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private authService: AuthService){}

  userName:string|undefined = '';

  ngOnInit(){
    this.authService.user$.subscribe(accessData => {
      this.userName = accessData?.response.username
    })
  }
}
