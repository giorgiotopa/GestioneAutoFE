import { iAccessData } from './../Models/i-access-data';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { iUser } from '../Models/i-user';
import { UtenteService } from '../../utente.service';
import { Subscription } from 'rxjs';
import { iAuto } from '../Models/i-auto';
import { AutoService } from '../../auto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iRegisterAuto } from '../Models/i-register-auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  userData: iAccessData | null = null;
  utente!: iUser;
  auto!: iAuto;
  isModificaAttiva = false;

  constructor(
    private authService: AuthService,
    private utenteService: UtenteService,
    private autoService: AutoService,
    private formBuilder: FormBuilder,

    ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.utente = user.response;
        // this.getAutoUtente(this.utente.id);
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

  updateField(field: string, event: any) {
    const newValue = event.target.textContent; // Ottieni il nuovo valore modificato
    switch (field) {
      case 'nome':
        this.utente.nome = newValue;
        break;
      case 'cognome':
        this.utente.cognome = newValue;
        break;
      case 'email':
        this.utente.email = newValue;
        break;
      case 'username':
        this.utente.username = newValue;
        break;
      case 'password':
        this.utente.password = newValue;
        break;
      // Aggiungi altri casi per altri campi se necessario
    }
  }

  updateUtente() {
    // Chiamata al metodo update del servizio UtenteService per aggiornare le informazioni dell'utente
    this.utenteService.update(this.utente).subscribe(
      response => {
        console.log('Utente aggiornato con successo:', response);
        this.isModificaAttiva = false;
      },
      error => {
        console.error("Errore durante l'aggiornamento dell'utente:", error);
        // Gestione degli errori
      }
    );
  }

  attivaModifica(){
    this.isModificaAttiva = true;
    this.utente.password = "";
  }

  getAutoUtente(userId: string): void {
    this.utenteService.getAutoByUtenteId(userId).subscribe(
      (data) => {
        console.log("Risposta di data: " , data);

        this.userData = data;
      },
      (error) => {
        console.error('Errore nel recupero delle auto:', error);
      }
    );
  }

  // createAuto(newAutoData: Partial<iAuto>): void {
  //   this.autoService.create(newAutoData).subscribe(
  //     (autoCreated: iAuto) => {
  //       console.log('Nuova auto creata:', autoCreated);
  //       // Aggiorna la lista delle auto o altre operazioni necessarie dopo la creazione
  //     },
  //     (error) => {
  //       console.error('Errore durante la creazione dell\'auto:', error);
  //       // Gestione dell'errore, ad esempio mostrando un messaggio all'utente
  //     }
  //   );
  // }

}
