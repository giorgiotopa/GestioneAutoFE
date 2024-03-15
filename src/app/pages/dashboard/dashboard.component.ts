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
  userSubscription: Subscription | undefined;

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
    const file = event.target.files[0]; // Ottieni il file dall'evento
    if (file) {
      this.utenteService.uploadAvatar(this.utente.id, file).subscribe(response => {
        console.log('Avatar uploaded successfully:', response);
        // Aggiorna l'utente con i nuovi dati dell'avatar se necessario
      }, error => {
        console.error('Error uploading avatar:', error);
        // Gestisci eventuali errori
      });
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
