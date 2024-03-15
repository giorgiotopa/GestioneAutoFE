import { iAccessData } from './../Models/i-access-data';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { iUser } from '../Models/i-user';
import { UtenteService } from '../../utente.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  userData: iAccessData | null = null;
  utente!: iUser;

  constructor(
    private authService: AuthService,
    private utenteService: UtenteService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.utente = user.response;
      }
    });
  }

  uploadAvatar(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.utenteService.uploadAvatar(this.utente.id, file).subscribe(response => {
        this.updateUserAvatar(response.response.avatar)
      }, error => {
        console.error('Error uploading avatar:', error);
      });
    }
  }
  updateUserAvatar(avatarUrl: string) {
    this.utente.avatar = avatarUrl;
  }
}
