import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isLogged: Observable<boolean> | undefined;

  constructor(private authService: AuthService){
    this.isLogged = this.authService.isLoggedIn$
  }

  logout() {
    this.authService.logout();
  }

}
