import { iAccessData } from './../Models/i-access-data';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { iUser } from '../Models/i-user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  userData: iAccessData | null = null;
  utente!: iUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        console.log(user);
        this.utente = user.response;
        console.log(this.utente);
      } else {
        // Gestione nel caso in cui l'utente sia null
      }
    });
  }
}
